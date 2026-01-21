// SHAM v4 Pro - Map Manager
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
        this.initialize();
    }

    initialize() {
        // Initialize map centered on Egypt
        this.map = L.map('map', {
            center: [26.8206, 30.8025], // Central Egypt
            zoom: 6,
            zoomControl: true,
            attributionControl: true
        });

        // Add base layers
        this.addBaseLayers();

        // Add archaeological sites
        this.addArchaeologicalSites();

        // Add layer controls
        this.addLayerControls();

        // Setup event handlers
        this.setupEventHandlers();

        // Initialize spectral layer toggle
        this.initializeSpectralLayers();
    }

    addBaseLayers() {
        // Satellite imagery (default)
        const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
            maxZoom: 19
        }).addTo(this.map);

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
        // Add pyramids
        ARCHAEOLOGICAL_SITES.pyramids.forEach(site => {
            this.addSiteMarker(site, 'pyramids');
        });

        // Add temples
        ARCHAEOLOGICAL_SITES.temples.forEach(site => {
            this.addSiteMarker(site, 'temples');
        });

        // Add tombs
        ARCHAEOLOGICAL_SITES.tombs.forEach(site => {
            this.addSiteMarker(site, 'tombs');
        });

        // Add settlements
        ARCHAEOLOGICAL_SITES.settlements.forEach(site => {
            this.addSiteMarker(site, 'settlements');
        });

        // Add AI detected anomalies
        ARCHAEOLOGICAL_SITES.ai_detected_anomalies.forEach(site => {
            this.addSiteMarker(site, 'anomalies');
        });

        // Add all layer groups to map
        Object.values(this.layerGroups).forEach(group => {
            group.addTo(this.map);
        });
    }

    addSiteMarker(site, category) {
        const config = SITE_CONFIGS[site.type] || SITE_CONFIGS[category];

        // Create custom icon
        const iconHtml = `
            <div class="site-marker ${site.type}" style="background-color: ${config.color}">
                <i class="${config.icon}"></i>
            </div>
        `;

        const customIcon = L.divIcon({
            html: iconHtml,
            className: 'custom-marker',
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            popupAnchor: [0, -12]
        });

        // Create marker
        const marker = L.marker(site.coordinates, { icon: customIcon });

        // Create popup content
        const popupContent = this.createPopupContent(site);
        marker.bindPopup(popupContent, {
            maxWidth: 400,
            className: 'site-popup'
        });

        // Add click handler for info panel
        marker.on('click', () => {
            this.showSiteInfo(site);
            this.updateCoordinates(site.coordinates);
        });

        // Store marker reference
        this.markers[site.id] = marker;

        // Add to appropriate layer group
        this.layerGroups[category].addLayer(marker);

        // Add pulsing animation for anomalies
        if (site.type === 'anomaly') {
            marker.getElement().classList.add('pulse-animation');
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
            this.map.setView([26.8206, 30.8025], 6);
        });

        // Zoom to Giza button
        document.getElementById('zoom-giza')?.addEventListener('click', () => {
            this.map.setView([29.9792, 31.1342], 13);
        });

        // Zoom to Valley of Kings button
        document.getElementById('zoom-valley-kings')?.addEventListener('click', () => {
            this.map.setView([25.7402, 32.6014], 15);
        });

        // Satellite view toggle
        document.getElementById('satellite-view')?.addEventListener('click', () => {
            this.toggleSatelliteView();
        });
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

    highlightSite(siteId) {
        const marker = this.markers[siteId];
        if (marker) {
            // Add highlight effect
            marker.getElement().classList.add('highlighted');

            // Pan to site
            this.map.setView(marker.getLatLng(), 12);

            // Open popup
            marker.openPopup();

            // Remove highlight after 3 seconds
            setTimeout(() => {
                marker.getElement().classList.remove('highlighted');
            }, 3000);
        }
    }

    exportMapData() {
        const mapData = {
            center: this.map.getCenter(),
            zoom: this.map.getZoom(),
            bounds: this.map.getBounds(),
            visible_layers: Object.keys(this.layerGroups).filter(key =>
                this.map.hasLayer(this.layerGroups[key])
            ),
            active_spectral_layers: Object.keys(this.spectralLayers).filter(key =>
                this.spectralLayers[key] && this.map.hasLayer(this.spectralLayers[key])
            ),
            current_site: this.currentSite?.id || null,
            timestamp: new Date().toISOString()
        };

        return mapData;
    }
}

// Initialize map manager when DOM is loaded
let mapManager;
document.addEventListener('DOMContentLoaded', () => {
    mapManager = new MapManager();
    window.mapManager = mapManager; // Make globally accessible
});