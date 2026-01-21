// SHAM v5 Pro - AR Anomaly Overlay System
// Augmented reality visualization of subsurface structures

class AROverlay {
    constructor() {
        this.isSupported = this.checkARSupport();
        this.activeSession = null;
        this.anomalyMarkers = [];
        this.subsurfaceModels = [];
        console.log('📱 AR Overlay System initialized');
    }

    checkARSupport() {
        return 'xr' in navigator || 'getVRDisplays' in navigator;
    }

    // Initialize AR session
    async startARSession() {
        if (!this.isSupported) {
            console.warn('WebXR not supported - using fallback mode');
            return this.startFallbackMode();
        }

        try {
            const session = await navigator.xr.requestSession('immersive-ar', {
                requiredFeatures: ['hit-test', 'local-floor'],
                optionalFeatures: ['dom-overlay']
            });

            this.activeSession = session;
            console.log('🥽 AR Session started');
            return session;
        } catch (error) {
            console.error('AR Session failed:', error);
            return this.startFallbackMode();
        }
    }

    // Fallback for non-AR devices - camera overlay
    startFallbackMode() {
        return {
            mode: 'fallback',
            message: 'Using camera overlay mode (full AR requires WebXR-capable device)',
            features: ['GPS overlay', 'Compass direction', 'Distance to anomalies']
        };
    }

    // Place anomaly marker in AR space
    placeAnomalyMarker(anomaly, userPosition) {
        const marker = {
            id: anomaly.id,
            worldPosition: this.gpsToLocal(anomaly.coordinates, userPosition),
            probability: anomaly.probability,
            classification: anomaly.classification,
            depth: anomaly.estimatedDepth || 10,
            visualStyle: this.getVisualStyle(anomaly.probability),
            label: this.generateLabel(anomaly)
        };

        this.anomalyMarkers.push(marker);
        return marker;
    }

    // Convert GPS to local AR coordinates
    gpsToLocal(targetCoords, userPosition) {
        const latDiff = targetCoords[0] - userPosition.lat;
        const lonDiff = targetCoords[1] - userPosition.lon;

        // Approximate meters per degree at this latitude
        const metersPerDegreeLat = 111320;
        const metersPerDegreeLon = 111320 * Math.cos(userPosition.lat * Math.PI / 180);

        return {
            x: lonDiff * metersPerDegreeLon,
            y: 0, // Ground level
            z: latDiff * metersPerDegreeLat,
            distance: Math.sqrt(
                Math.pow(latDiff * metersPerDegreeLat, 2) +
                Math.pow(lonDiff * metersPerDegreeLon, 2)
            )
        };
    }

    getVisualStyle(probability) {
        if (probability > 0.9) return { color: '#ff0000', glow: true, pulse: true, label: 'CRITICAL' };
        if (probability > 0.8) return { color: '#ff8800', glow: true, pulse: false, label: 'HIGH' };
        if (probability > 0.7) return { color: '#ffcc00', glow: false, pulse: false, label: 'MODERATE' };
        return { color: '#00ff88', glow: false, pulse: false, label: 'LOW' };
    }

    generateLabel(anomaly) {
        return {
            title: anomaly.id,
            probability: `${(anomaly.probability * 100).toFixed(0)}%`,
            type: anomaly.classification || 'Unknown',
            depth: `~${anomaly.estimatedDepth || '?'}m below surface`
        };
    }

    // Render subsurface structure visualization
    renderSubsurfaceModel(anomaly) {
        const model = {
            id: `MODEL-${anomaly.id}`,
            type: anomaly.classification,
            geometry: this.generateGeometry(anomaly),
            material: {
                color: this.getVisualStyle(anomaly.probability).color,
                opacity: 0.6,
                wireframe: true
            },
            animation: {
                float: true,
                pulse: anomaly.probability > 0.8
            }
        };

        this.subsurfaceModels.push(model);
        return model;
    }

    generateGeometry(anomaly) {
        const geometries = {
            void: { type: 'sphere', radius: 5, segments: 16 },
            chamber: { type: 'box', width: 10, height: 4, depth: 8 },
            tunnel: { type: 'cylinder', radius: 2, height: 20, radialSegments: 8 },
            pyramid: { type: 'cone', radius: 30, height: 40, radialSegments: 4 },
            wall: { type: 'box', width: 20, height: 3, depth: 1 }
        };

        return geometries[anomaly.classification] || geometries.void;
    }

    // Get direction arrow to anomaly
    getDirectionToAnomaly(anomalyId, userPosition, userHeading) {
        const marker = this.anomalyMarkers.find(m => m.id === anomalyId);
        if (!marker) return null;

        const bearing = Math.atan2(marker.worldPosition.x, marker.worldPosition.z) * 180 / Math.PI;
        const relativeBearing = (bearing - userHeading + 360) % 360;

        return {
            bearing: bearing,
            relativeBearing: relativeBearing,
            distance: marker.worldPosition.distance,
            direction: this.bearingToDirection(relativeBearing),
            arrow: this.getArrowSymbol(relativeBearing)
        };
    }

    bearingToDirection(bearing) {
        const directions = ['Ahead', 'Ahead-Right', 'Right', 'Behind-Right',
            'Behind', 'Behind-Left', 'Left', 'Ahead-Left'];
        return directions[Math.round(bearing / 45) % 8];
    }

    getArrowSymbol(bearing) {
        const arrows = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖'];
        return arrows[Math.round(bearing / 45) % 8];
    }

    // Generate AR HUD overlay data
    generateHUD(userPosition, userHeading, anomalies) {
        const hudData = {
            position: userPosition,
            heading: userHeading,
            nearbyAnomalies: [],
            compass: this.generateCompass(userHeading),
            statusBar: {
                gpsAccuracy: userPosition.accuracy || 5,
                anomaliesInRange: 0,
                closestDistance: Infinity
            }
        };

        anomalies.forEach(anomaly => {
            const direction = this.getDirectionToAnomaly(anomaly.id, userPosition, userHeading);
            if (direction && direction.distance < 500) { // Within 500m
                hudData.nearbyAnomalies.push({
                    id: anomaly.id,
                    ...direction,
                    probability: anomaly.probability,
                    style: this.getVisualStyle(anomaly.probability)
                });

                hudData.statusBar.anomaliesInRange++;
                if (direction.distance < hudData.statusBar.closestDistance) {
                    hudData.statusBar.closestDistance = direction.distance;
                }
            }
        });

        hudData.nearbyAnomalies.sort((a, b) => a.distance - b.distance);

        return hudData;
    }

    generateCompass(heading) {
        return {
            heading: heading,
            cardinal: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.round(heading / 45) % 8],
            degrees: `${heading.toFixed(0)}°`
        };
    }

    // Clean up
    endSession() {
        if (this.activeSession) {
            this.activeSession.end();
            this.activeSession = null;
        }
        this.anomalyMarkers = [];
        this.subsurfaceModels = [];
    }

    getMarkers() { return this.anomalyMarkers; }
    getModels() { return this.subsurfaceModels; }
}

window.AROverlay = AROverlay;
window.arOverlay = new AROverlay();
