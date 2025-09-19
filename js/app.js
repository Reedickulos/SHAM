// SHAM v4 Pro - Main Application Controller
// Coordinates all modules and handles global application state

class SHAMApplication {
    constructor() {
        this.version = '4.0.0';
        this.initialized = false;
        this.modules = {};
        this.eventBus = new EventTarget();

        this.initialize();
    }

    initialize() {
        console.log('🏺 SHAM v4 Pro - Archaeological Intelligence Platform');
        console.log('Initializing application modules...');

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeModules();
            });
        } else {
            this.initializeModules();
        }
    }

    initializeModules() {
        // Initialize modules in dependency order
        setTimeout(() => {
            this.checkModuleAvailability();
            this.setupGlobalEventHandlers();
            this.initializeFeatureIntegration();
            this.startApplicationSystems();
            this.initialized = true;

            console.log('✅ SHAM v4 Pro fully initialized');
            this.emitEvent('app:initialized');
        }, 1000);
    }

    checkModuleAvailability() {
        const requiredModules = [
            'mapManager',
            'uiManager',
            'analysisEngine'
        ];

        requiredModules.forEach(module => {
            if (window[module]) {
                this.modules[module] = window[module];
                console.log(`✅ ${module} loaded successfully`);
            } else {
                console.warn(`⚠️ ${module} not available`);
            }
        });
    }

    setupGlobalEventHandlers() {
        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleWindowResize();
        });

        // Handle visibility changes (tab switching)
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });

        // Global error handler
        window.addEventListener('error', (e) => {
            this.handleError(e);
        });
    }

    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + E: Export data
        if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
            e.preventDefault();
            if (this.modules.uiManager) {
                this.modules.uiManager.exportApplicationData();
            }
        }

        // Ctrl/Cmd + M: Focus on map
        if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
            e.preventDefault();
            document.getElementById('map')?.focus();
        }

        // F: Toggle fullscreen map
        if (e.key === 'f' && !e.ctrlKey && !e.metaKey) {
            this.toggleFullscreenMap();
        }

        // H: Show help
        if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
            this.showKeyboardShortcuts();
        }
    }

    handleWindowResize() {
        // Trigger map resize if available
        if (this.modules.mapManager && this.modules.mapManager.map) {
            setTimeout(() => {
                this.modules.mapManager.map.invalidateSize();
            }, 100);
        }

        // Update responsive breakpoints
        this.updateResponsiveState();
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Pause intensive operations when tab is hidden
            this.pauseBackgroundProcessing();
        } else {
            // Resume operations when tab becomes visible
            this.resumeBackgroundProcessing();
        }
    }

    handleError(error) {
        console.error('SHAM Application Error:', error);

        // Show user-friendly error message
        this.showErrorNotification('An error occurred. Please refresh the page if problems persist.');
    }

    initializeFeatureIntegration() {
        // Cross-module feature integration
        this.setupMapAnalysisIntegration();
        this.setupUIDataBinding();
        this.setupRealTimeUpdates();
    }

    setupMapAnalysisIntegration() {
        // When a site is selected on map, trigger analysis
        this.eventBus.addEventListener('site:selected', (e) => {
            if (this.modules.analysisEngine) {
                this.modules.analysisEngine.updateConfidenceScore(e.detail.site);
            }
        });

        // When analysis completes, update map visualization
        this.eventBus.addEventListener('analysis:complete', (e) => {
            this.updateMapVisualization(e.detail);
        });
    }

    setupUIDataBinding() {
        // Bind UI controls to data updates
        const spectralToggles = ['vis', 'nir', 'swir', 'tir'];

        spectralToggles.forEach(band => {
            const toggle = document.getElementById(`${band}-layer`);
            if (toggle) {
                toggle.addEventListener('change', (e) => {
                    this.emitEvent('spectral:toggled', {
                        band: band,
                        enabled: e.target.checked
                    });
                });
            }
        });
    }

    setupRealTimeUpdates() {
        // Simulate real-time satellite data updates
        setInterval(() => {
            if (this.initialized && !document.hidden) {
                this.updateSatelliteStatus();
            }
        }, 45000); // Every 45 seconds

        // Update data statistics
        setInterval(() => {
            if (this.initialized) {
                this.updateDataStatistics();
            }
        }, 60000); // Every minute
    }

    startApplicationSystems() {
        // Start background systems
        this.startDataValidation();
        this.startPerformanceMonitoring();
        this.enableProgressiveFeatures();
    }

    startDataValidation() {
        // Validate archaeological data integrity
        const validationResults = this.validateArchaeologicalData();
        console.log('📊 Data validation:', validationResults);
    }

    validateArchaeologicalData() {
        let totalSites = 0;
        let validCoordinates = 0;
        let sitesWithDetails = 0;

        Object.values(ARCHAEOLOGICAL_SITES).forEach(category => {
            if (Array.isArray(category)) {
                category.forEach(site => {
                    totalSites++;

                    // Validate coordinates
                    if (site.coordinates &&
                        Array.isArray(site.coordinates) &&
                        site.coordinates.length === 2 &&
                        typeof site.coordinates[0] === 'number' &&
                        typeof site.coordinates[1] === 'number') {
                        validCoordinates++;
                    }

                    // Check for detailed information
                    if (site.excavation_history || site.satellite_analysis || site.museum_collections) {
                        sitesWithDetails++;
                    }
                });
            }
        });

        return {
            total_sites: totalSites,
            valid_coordinates: validCoordinates,
            detailed_sites: sitesWithDetails,
            data_quality: Math.round((validCoordinates / totalSites) * 100)
        };
    }

    startPerformanceMonitoring() {
        // Monitor application performance
        if ('performance' in window) {
            const navigationTiming = performance.getEntriesByType('navigation')[0];
            if (navigationTiming) {
                console.log('⚡ Page load time:', Math.round(navigationTiming.loadEventEnd), 'ms');
            }
        }

        // Monitor memory usage (if available)
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
                    console.warn('⚠️ High memory usage detected');
                }
            }, 300000); // Every 5 minutes
        }
    }

    enableProgressiveFeatures() {
        // Enable features based on browser capabilities

        // Check for WebGL support (advanced visualizations)
        if (this.checkWebGLSupport()) {
            console.log('🎮 WebGL supported - enabling advanced visualizations');
            document.body.classList.add('webgl-supported');
        }

        // Check for Geolocation API
        if ('geolocation' in navigator) {
            console.log('📍 Geolocation supported - enabling location features');
            this.enableLocationFeatures();
        }

        // Check for offline capabilities
        if ('serviceWorker' in navigator) {
            this.enableOfflineCapabilities();
        }
    }

    checkWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
        } catch (e) {
            return false;
        }
    }

    enableLocationFeatures() {
        // Add current location button to map controls
        const locationButton = document.createElement('button');
        locationButton.className = 'map-btn location-btn';
        locationButton.innerHTML = '<i class="fas fa-location-arrow"></i> My Location';
        locationButton.addEventListener('click', () => {
            this.getCurrentLocation();
        });

        const mapControls = document.querySelector('.map-controls');
        if (mapControls) {
            mapControls.appendChild(locationButton);
        }
    }

    getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                if (this.modules.mapManager) {
                    this.modules.mapManager.map.setView([latitude, longitude], 10);

                    // Add temporary marker
                    const locationMarker = L.marker([latitude, longitude])
                        .addTo(this.modules.mapManager.map)
                        .bindPopup('Your current location')
                        .openPopup();

                    // Remove marker after 10 seconds
                    setTimeout(() => {
                        this.modules.mapManager.map.removeLayer(locationMarker);
                    }, 10000);
                }
            },
            (error) => {
                console.error('Geolocation error:', error);
                this.showErrorNotification('Unable to get your location');
            }
        );
    }

    enableOfflineCapabilities() {
        // Register service worker for offline functionality
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('📱 Service Worker registered for offline capabilities');
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }

    updateSatelliteStatus() {
        const statuses = ['Active', 'Acquiring', 'Processing', 'Standby'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

        const satelliteStatus = document.getElementById('satellite-status');
        if (satelliteStatus) {
            const statusText = satelliteStatus.querySelector('span');
            if (statusText) {
                statusText.textContent = `Satellite: ${randomStatus}`;
            }
        }
    }

    updateDataStatistics() {
        if (this.modules.uiManager) {
            this.modules.uiManager.updateDataStatus();
        }
    }

    updateMapVisualization(analysisData) {
        // Update map based on analysis results
        if (this.modules.mapManager && analysisData) {
            // Implementation for visual updates based on analysis
            console.log('🗺️ Updating map visualization with analysis data');
        }
    }

    toggleFullscreenMap() {
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            mapContainer.classList.toggle('fullscreen');

            // Trigger map resize
            setTimeout(() => {
                if (this.modules.mapManager && this.modules.mapManager.map) {
                    this.modules.mapManager.map.invalidateSize();
                }
            }, 300);
        }
    }

    showKeyboardShortcuts() {
        const shortcuts = `
SHAM v4 Pro Keyboard Shortcuts:

Ctrl/Cmd + E: Export data
Ctrl/Cmd + M: Focus on map
F: Toggle fullscreen map
H: Show this help
Esc: Close panels

Map Navigation:
+/-: Zoom in/out
Arrow keys: Pan map
`;

        alert(shortcuts);
    }

    updateResponsiveState() {
        const width = window.innerWidth;

        document.body.classList.remove('mobile', 'tablet', 'desktop');

        if (width < 768) {
            document.body.classList.add('mobile');
        } else if (width < 1200) {
            document.body.classList.add('tablet');
        } else {
            document.body.classList.add('desktop');
        }
    }

    pauseBackgroundProcessing() {
        // Pause non-critical background operations
        console.log('⏸️ Pausing background processing');
    }

    resumeBackgroundProcessing() {
        // Resume background operations
        console.log('▶️ Resuming background processing');
    }

    showErrorNotification(message) {
        // Create temporary error notification
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--error);
            color: white;
            padding: 1rem;
            border-radius: 6px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    emitEvent(eventName, data = null) {
        const event = new CustomEvent(eventName, { detail: data });
        this.eventBus.dispatchEvent(event);
    }

    getApplicationState() {
        return {
            version: this.version,
            initialized: this.initialized,
            modules: Object.keys(this.modules),
            timestamp: new Date().toISOString()
        };
    }

    exportFullApplicationData() {
        const appData = {
            application_state: this.getApplicationState(),
            map_data: this.modules.mapManager ? this.modules.mapManager.exportMapData() : null,
            analysis_data: this.modules.analysisEngine ? this.modules.analysisEngine.exportAnalysisData() : null,
            archaeological_sites: ARCHAEOLOGICAL_SITES,
            satellite_sensors: SATELLITE_SENSORS,
            geophysical_surveys: GEOPHYSICAL_SURVEYS,
            museum_collections: MUSEUM_COLLECTIONS
        };

        return appData;
    }
}

// Initialize the application
const shamApp = new SHAMApplication();
window.shamApp = shamApp;

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    .map-container.fullscreen {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 9999 !important;
        background: black;
    }

    .error-notification {
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        font-weight: 500;
    }
`;
document.head.appendChild(style);