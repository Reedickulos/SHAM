// SHAM v4 Pro - Map Manager (Fixed Version)
// Interactive Leaflet.js map with archaeological sites and multispectral layers

class MapManager {
    constructor() {
        this.map = null;
        this.markers = {};
        this.layerGroups = {
            pyramids: L.layerGroup(),
            temples: L.layerGroup(),
            tombs: L.layerGroup(),
            settlements: L.layerGroup(),
            anomalies: L.layerGroup()
        };
        this.spectralLayers = {};
        this.currentSite = null;
    }

    async initialize() {
        console.log('🗺️ Initializing Map Manager...');

        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }

            // Wait for archaeological data to be available
            if (typeof ARCHAEOLOGICAL_SITES === 'undefined') {
                console.log('⏳ Waiting for archaeological data...');
                await this.waitForData();
            }

            console.log('📍 Creating map...');
            this.createMap();

            console.log('🏺 Loading archaeological sites...');
            this.addArchaeologicalSites();

            console.log('🎛️ Setting up controls...');
            this.addLayerControls();
            this.setupEventHandlers();
            this.initializeSpectralLayers();

            console.log('✅ Map Manager initialized successfully!');
        } catch (error) {
            console.error('❌ Error initializing Map Manager:', error);
        }
    }

    async waitForData() {
        let attempts = 0;
        const maxAttempts = 50;

        while (typeof ARCHAEOLOGICAL_SITES === 'undefined' && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (typeof ARCHAEOLOGICAL_SITES === 'undefined') {
            throw new Error('Archaeological data failed to load');
        }
    }

    createMap() {
        // Initialize map centered on Egypt
        this.map = L.map('map', {
            center: [26.8206, 30.8025], // Central Egypt
            zoom: 6,
            zoomControl: true,
            attributionControl: true
        });

        console.log('📍 Map created at:', this.map.getCenter());

        // Add base layers
        this.addBaseLayers();
    }

    addBaseLayers() {
        // Satellite imagery (default)
        const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
            maxZoom: 19
        }).addTo(this.map);

        console.log('🛰️ Satellite base layer added');

        // OpenStreetMap
        const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        });

        // Terrain
        const terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18
        });

        // Store base layers
        this.baseLayers = {
            "Satellite": satellite,
            "OpenStreetMap": osm,
            "Terrain": terrain
        };
    }

    addArchaeologicalSites() {
        console.log('🏺 Loading archaeological sites...', ARCHAEOLOGICAL_SITES);

        let totalSites = 0;

        try {
            // Add pyramids
            if (ARCHAEOLOGICAL_SITES.pyramids) {
                console.log('🔺 Adding pyramids:', ARCHAEOLOGICAL_SITES.pyramids.length);
                ARCHAEOLOGICAL_SITES.pyramids.forEach(site => {
                    this.addSiteMarker(site, 'pyramids');
                    totalSites++;
                });
            }

            // Add temples
            if (ARCHAEOLOGICAL_SITES.temples) {
                console.log('🏛️ Adding temples:', ARCHAEOLOGICAL_SITES.temples.length);
                ARCHAEOLOGICAL_SITES.temples.forEach(site => {
                    this.addSiteMarker(site, 'temples');
                    totalSites++;
                });
            }

            // Add tombs
            if (ARCHAEOLOGICAL_SITES.tombs) {
                console.log('⚱️ Adding tombs:', ARCHAEOLOGICAL_SITES.tombs.length);
                ARCHAEOLOGICAL_SITES.tombs.forEach(site => {
                    this.addSiteMarker(site, 'tombs');
                    totalSites++;
                });
            }

            // Add settlements
            if (ARCHAEOLOGICAL_SITES.settlements) {
                console.log('🏙️ Adding settlements:', ARCHAEOLOGICAL_SITES.settlements.length);
                ARCHAEOLOGICAL_SITES.settlements.forEach(site => {
                    this.addSiteMarker(site, 'settlements');
                    totalSites++;
                });
            }

            // Add AI detected anomalies
            if (ARCHAEOLOGICAL_SITES.ai_detected_anomalies) {
                console.log('🤖 Adding anomalies:', ARCHAEOLOGICAL_SITES.ai_detected_anomalies.length);
                ARCHAEOLOGICAL_SITES.ai_detected_anomalies.forEach(site => {
                    this.addSiteMarker(site, 'anomalies');
                    totalSites++;
                });
            }

            // Add all layer groups to map
            Object.values(this.layerGroups).forEach(group => {
                group.addTo(this.map);
            });

            console.log(`✅ Total archaeological sites loaded: ${totalSites}`);
            console.log(`📍 Total markers created: ${Object.keys(this.markers).length}`);

        } catch (error) {
            console.error('❌ Error loading archaeological sites:', error);
        }
    }

    addSiteMarker(site, category) {
        try {
            console.log(`📍 Adding marker for ${site.name} at [${site.coordinates}]`);

            const config = SITE_CONFIGS[site.type] || SITE_CONFIGS[category] || {
                color: '#e6b36a',
                icon: 'fas fa-map-marker-alt',
                size: 'medium'
            };

            // Create simple circular marker instead of complex HTML
            const marker = L.circleMarker(site.coordinates, {
                radius: 8,
                fillColor: config.color,
                color: '#ffffff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            });

            // Create popup content
            const popupContent = this.createPopupContent(site);
            marker.bindPopup(popupContent, {
                maxWidth: 400,
                className: 'site-popup'
            });

            // Add click handler for info panel
            marker.on('click', () => {
                console.log(`🔍 Site clicked: ${site.name}`);
                this.showSiteInfo(site);
                this.updateCoordinates(site.coordinates);
            });

            // Store marker reference
            this.markers[site.id] = marker;

            // Add to appropriate layer group
            this.layerGroups[category].addLayer(marker);

            console.log(`✅ Marker added for ${site.name}`);

        } catch (error) {
            console.error(`❌ Error adding marker for ${site.name}:`, error);
        }
    }

    createPopupContent(site) {
        let content = `
            <div class="popup-content">
                <h3>${site.name}</h3>
                <div class="popup-info">
                    <p><strong>Type:</strong> ${site.type.replace('_', ' ').toUpperCase()}</p>
                    <p><strong>Coordinates:</strong> ${site.coordinates[0].toFixed(4)}°N, ${site.coordinates[1].toFixed(4)}°E</p>
        `;

        if (site.period) {
            content += `<p><strong>Period:</strong> ${site.period}</p>`;
        }

        if (site.date) {
            content += `<p><strong>Date:</strong> ${site.date}</p>`;
        }

        if (site.ai_confidence) {
            content += `<p><strong>AI Confidence:</strong> ${site.ai_confidence}%</p>`;
        }

        if (site.confidence_score) {
            content += `<p><strong>Detection Confidence:</strong> ${site.confidence_score}%</p>`;
        }

        content += `
                    <button class="popup-btn" onclick="mapManager.showSiteInfo('${site.id}')">
                        <i class="fas fa-info-circle"></i> View Details
                    </button>
                </div>
            </div>
        `;

        return content;
    }

    addLayerControls() {
        // Archaeological site layers
        const overlayMaps = {
            "Pyramids": this.layerGroups.pyramids,
            "Temples": this.layerGroups.temples,
            "Tombs": this.layerGroups.tombs,
            "Settlements": this.layerGroups.settlements,
            "AI Anomalies": this.layerGroups.anomalies
        };

        // Add layer control
        L.control.layers(this.baseLayers, overlayMaps, {
            position: 'topright',
            collapsed: false
        }).addTo(this.map);

        console.log('🎛️ Layer controls added');
    }

    setupEventHandlers() {
        // Map click handler for coordinates display
        this.map.on('click', (e) => {
            this.updateCoordinates([e.latlng.lat, e.latlng.lng]);
        });

        // Map move handler for real-time coordinate updates
        this.map.on('mousemove', (e) => {
            this.updateCoordinates([e.latlng.lat, e.latlng.lng]);
        });

        // Zoom to Egypt button
        document.getElementById('zoom-egypt')?.addEventListener('click', () => {
            console.log('🔍 Zooming to Egypt');
            this.map.setView([26.8206, 30.8025], 6);
        });

        // Zoom to Giza button
        document.getElementById('zoom-giza')?.addEventListener('click', () => {
            console.log('🔍 Zooming to Giza');
            this.map.setView([29.9792, 31.1342], 13);
        });

        // Zoom to Valley of Kings button
        document.getElementById('zoom-valley-kings')?.addEventListener('click', () => {
            console.log('🔍 Zooming to Valley of Kings');
            this.map.setView([25.7402, 32.6014], 15);
        });

        // Satellite view toggle
        document.getElementById('satellite-view')?.addEventListener('click', () => {
            this.toggleSatelliteView();
        });

        console.log('🎮 Event handlers set up');
    }

    initializeSpectralLayers() {
        // Initialize spectral layer overlays (simulated)
        this.spectralLayers = {
            vis: null,
            nir: null,
            swir: null,
            tir: null
        };

        // Set up layer toggle event handlers
        this.setupSpectralToggleHandlers();
    }

    setupSpectralToggleHandlers() {
        const layerToggles = ['vis', 'nir', 'swir', 'tir'];

        layerToggles.forEach(layer => {
            const toggle = document.getElementById(`${layer}-layer`);
            if (toggle) {
                toggle.addEventListener('change', (e) => {
                    console.log(`🛰️ ${layer.toUpperCase()} layer toggled:`, e.target.checked);
                    this.toggleSpectralLayer(layer, e.target.checked);
                });
            }
        });
    }

    toggleSpectralLayer(layerType, enabled) {
        if (enabled) {
            // Add spectral layer overlay (simulated with different opacity satellite layers)
            const overlayUrl = this.getSpectralLayerUrl(layerType);
            const layer = L.tileLayer(overlayUrl, {
                opacity: 0.6,
                attribution: `SHAM v4 Pro - ${layerType.toUpperCase()} Layer`
            });

            this.spectralLayers[layerType] = layer;
            layer.addTo(this.map);

            // Update UI status
            this.updateSpectralLayerStatus(layerType, true);
        } else {
            // Remove layer
            if (this.spectralLayers[layerType]) {
                this.map.removeLayer(this.spectralLayers[layerType]);
                this.spectralLayers[layerType] = null;
            }

            this.updateSpectralLayerStatus(layerType, false);
        }
    }

    getSpectralLayerUrl(layerType) {
        // Return appropriate satellite layer URL based on spectral band
        const baseUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

        // In a real implementation, these would be different spectral band compositions
        switch (layerType) {
            case 'vis': return baseUrl;
            case 'nir': return 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}';
            case 'swir': return 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png';
            case 'tir': return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            default: return baseUrl;
        }
    }

    updateSpectralLayerStatus(layerType, enabled) {
        // Update visual indicators
        const statusElement = document.querySelector(`#${layerType}-layer`).closest('.layer-item');
        if (statusElement) {
            statusElement.classList.toggle('active', enabled);
        }
    }

    updateCoordinates(coords) {
        const coordElement = document.getElementById('current-coordinates');
        if (coordElement) {
            coordElement.textContent = `${coords[0].toFixed(4)}°N, ${coords[1].toFixed(4)}°E`;
        }
    }

    showSiteInfo(siteIdOrObject) {
        let site;

        if (typeof siteIdOrObject === 'string') {
            // Find site by ID
            site = this.findSiteById(siteIdOrObject);
        } else {
            site = siteIdOrObject;
        }

        if (!site) return;

        this.currentSite = site;
        console.log('📖 Showing site info for:', site.name);

        // Update info panel
        if (window.uiManager) {
            window.uiManager.showSiteDetails(site);
        }

        // Update AI confidence display
        if (window.analysisEngine) {
            window.analysisEngine.updateConfidenceScore(site);
        }
    }

    findSiteById(siteId) {
        // Search through all site categories
        const allSites = [
            ...ARCHAEOLOGICAL_SITES.pyramids,
            ...ARCHAEOLOGICAL_SITES.temples,
            ...ARCHAEOLOGICAL_SITES.tombs,
            ...ARCHAEOLOGICAL_SITES.settlements,
            ...ARCHAEOLOGICAL_SITES.ai_detected_anomalies
        ];

        return allSites.find(site => site.id === siteId);
    }

    highlightSite(siteId) {
        const marker = this.markers[siteId];
        if (marker) {
            console.log(`✨ Highlighting site: ${siteId}`);

            // Pan to site
            this.map.setView(marker.getLatLng(), 12);

            // Open popup
            marker.openPopup();

            // Add temporary highlight effect
            const originalStyle = {
                radius: marker.getRadius(),
                fillColor: marker.options.fillColor
            };

            marker.setStyle({
                radius: 12,
                fillColor: '#f6e05e'
            });

            // Remove highlight after 3 seconds
            setTimeout(() => {
                marker.setStyle(originalStyle);
            }, 3000);
        }
    }

    toggleSatelliteView() {
        // Implementation for satellite view toggle
        const button = document.getElementById('satellite-view');
        const isActive = button.classList.contains('active');

        if (isActive) {
            button.classList.remove('active');
            // Switch to terrain or OSM
            this.map.removeLayer(this.baseLayers.Satellite);
            this.baseLayers.Terrain.addTo(this.map);
        } else {
            button.classList.add('active');
            // Switch to satellite
            this.map.eachLayer(layer => {
                if (layer instanceof L.TileLayer && this.baseLayers.Satellite !== layer) {
                    this.map.removeLayer(layer);
                }
            });
            this.baseLayers.Satellite.addTo(this.map);
        }
    }
}

// Initialize map manager when all scripts are loaded
let mapManager;

// Enhanced initialization with better error handling
function initializeMapManager() {
    console.log('🚀 Starting Map Manager initialization...');

    try {
        mapManager = new MapManager();
        mapManager.initialize();
        window.mapManager = mapManager; // Make globally accessible

        console.log('🎉 Map Manager ready!');
    } catch (error) {
        console.error('💥 Failed to initialize Map Manager:', error);

        // Show user-friendly error
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #1a1f2e; color: white; text-align: center; padding: 2rem;">
                    <div>
                        <h3>🗺️ Map Loading Error</h3>
                        <p>Please refresh the page to reload the archaeological sites.</p>
                        <button onclick="location.reload()" style="background: #e6b36a; color: #1a1f2e; border: none; padding: 0.5rem 1rem; border-radius: 4px; margin-top: 1rem; cursor: pointer;">Refresh Page</button>
                    </div>
                </div>
            `;
        }
    }
}

// Multiple initialization attempts
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMapManager);
} else {
    // Try immediate initialization
    setTimeout(initializeMapManager, 100);
}

// Fallback initialization
setTimeout(() => {
    if (!window.mapManager) {
        console.log('🔄 Fallback initialization...');
        initializeMapManager();
    }
}, 2000);