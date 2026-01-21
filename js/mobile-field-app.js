// SHAM v5 Pro - Mobile Field App Support
// GPS-guided ground-truth investigation system

class MobileFieldApp {
    constructor() {
        this.currentPosition = null;
        this.targetAnomalies = [];
        this.fieldNotes = [];
        this.photos = [];
        this.watchId = null;
        console.log('📱 Mobile Field App initialized');
    }

    // Start GPS tracking
    startTracking() {
        if (!navigator.geolocation) {
            console.error('Geolocation not supported');
            return false;
        }

        this.watchId = navigator.geolocation.watchPosition(
            (pos) => this.updatePosition(pos),
            (err) => console.error('GPS Error:', err),
            { enableHighAccuracy: true, maximumAge: 5000 }
        );

        console.log('📍 GPS tracking started');
        return true;
    }

    stopTracking() {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
    }

    updatePosition(position) {
        this.currentPosition = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            timestamp: new Date().toISOString()
        };

        // Check proximity to target anomalies
        this.checkProximity();
    }

    // Load anomalies from fusion results
    loadTargetAnomalies(anomalies) {
        this.targetAnomalies = anomalies.map(a => ({
            id: a.id,
            lat: a.coordinates?.[0] || a.lat,
            lon: a.coordinates?.[1] || a.lon,
            probability: a.probability,
            classification: a.classification,
            investigated: false
        }));

        console.log(`📍 Loaded ${this.targetAnomalies.length} target anomalies`);
    }

    // Check if near any anomaly
    checkProximity() {
        if (!this.currentPosition) return;

        this.targetAnomalies.forEach(anomaly => {
            const distance = this.calculateDistance(
                this.currentPosition.lat, this.currentPosition.lon,
                anomaly.lat, anomaly.lon
            );

            anomaly.distance = distance;

            if (distance < 50 && !anomaly.notified) { // Within 50 meters
                this.onAnomalyNearby(anomaly);
                anomaly.notified = true;
            }
        });
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371000; // Earth radius in meters
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    onAnomalyNearby(anomaly) {
        console.log(`🎯 APPROACHING ANOMALY: ${anomaly.id}`);

        // Vibrate if available
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);

        // Notify user
        if (Notification.permission === 'granted') {
            new Notification('SHAM Field Alert', {
                body: `Approaching anomaly ${anomaly.id} (${anomaly.probability}% probability)`,
                icon: '🎯'
            });
        }
    }

    // Get navigation to nearest anomaly
    navigateToNearest() {
        if (!this.currentPosition || this.targetAnomalies.length === 0) return null;

        const sorted = [...this.targetAnomalies]
            .map(a => ({
                ...a,
                distance: this.calculateDistance(
                    this.currentPosition.lat, this.currentPosition.lon,
                    a.lat, a.lon
                )
            }))
            .sort((a, b) => a.distance - b.distance);

        const nearest = sorted[0];

        return {
            target: nearest,
            bearing: this.calculateBearing(
                this.currentPosition.lat, this.currentPosition.lon,
                nearest.lat, nearest.lon
            ),
            distance: nearest.distance,
            directions: this.getCardinalDirection(this.calculateBearing(
                this.currentPosition.lat, this.currentPosition.lon,
                nearest.lat, nearest.lon
            ))
        };
    }

    calculateBearing(lat1, lon1, lat2, lon2) {
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const y = Math.sin(dLon) * Math.cos(lat2 * Math.PI / 180);
        const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
            Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos(dLon);
        return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
    }

    getCardinalDirection(bearing) {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        return directions[Math.round(bearing / 45) % 8];
    }

    // Add field note
    addFieldNote(anomalyId, note, photos = []) {
        const entry = {
            id: `NOTE-${Date.now()}`,
            anomalyId: anomalyId,
            timestamp: new Date().toISOString(),
            position: this.currentPosition,
            note: note,
            photos: photos,
            conditions: {
                time: new Date().toLocaleTimeString(),
                // Could add weather API integration
            }
        };

        this.fieldNotes.push(entry);
        console.log('📝 Field note added');
        return entry;
    }

    // Mark anomaly as investigated
    markInvestigated(anomalyId, findings) {
        const anomaly = this.targetAnomalies.find(a => a.id === anomalyId);
        if (anomaly) {
            anomaly.investigated = true;
            anomaly.investigationDate = new Date().toISOString();
            anomaly.findings = findings;
        }
    }

    // Export field data
    exportFieldData() {
        return {
            exportedAt: new Date().toISOString(),
            fieldNotes: this.fieldNotes,
            investigatedAnomalies: this.targetAnomalies.filter(a => a.investigated),
            pendingAnomalies: this.targetAnomalies.filter(a => !a.investigated),
            totalPhotos: this.photos.length
        };
    }

    // Generate GPX track
    generateGPX(trackPoints) {
        let gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="SHAM Field App">
  <trk>
    <name>SHAM Field Investigation</name>
    <trkseg>`;

        trackPoints.forEach(pt => {
            gpx += `
      <trkpt lat="${pt.lat}" lon="${pt.lon}">
        <time>${pt.timestamp}</time>
      </trkpt>`;
        });

        gpx += `
    </trkseg>
  </trk>
</gpx>`;

        return gpx;
    }
}

window.MobileFieldApp = MobileFieldApp;
window.mobileFieldApp = new MobileFieldApp();
