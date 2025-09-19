// SHAM v4 Pro - UI Manager
// Handles user interface interactions and site information display

class UIManager {
    constructor() {
        this.infoPanelVisible = false;
        this.loadingScreen = document.getElementById('loading-screen');
        this.app = document.getElementById('app');
        this.infoPanel = document.getElementById('info-panel');
        this.sitesList = document.getElementById('sites-list');

        this.initialize();
    }

    initialize() {
        this.setupEventHandlers();
        this.populateSitesList();
        this.startLoadingSequence();
    }

    setupEventHandlers() {
        // Close info panel
        document.getElementById('close-info')?.addEventListener('click', () => {
            this.hideInfoPanel();
        });

        // Export data button
        document.getElementById('export-data')?.addEventListener('click', () => {
            this.exportApplicationData();
        });

        // Theme toggle
        document.getElementById('theme-toggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Analysis tool buttons
        document.getElementById('anomaly-detection')?.addEventListener('click', () => {
            this.runAnomalyDetection();
        });

        document.getElementById('predictive-analysis')?.addEventListener('click', () => {
            this.runPredictiveAnalysis();
        });

        document.getElementById('temporal-analysis')?.addEventListener('click', () => {
            this.runTemporalAnalysis();
        });

        document.getElementById('geophysical-overlay')?.addEventListener('click', () => {
            this.toggleGeophysicalOverlay();
        });

        // Escape key to close panels
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideInfoPanel();
            }
        });
    }

    startLoadingSequence() {
        const progressBar = document.getElementById('progress-bar');
        const loadingStatus = document.getElementById('loading-status');

        const loadingSteps = [
            { progress: 20, text: 'Loading satellite data...' },
            { progress: 40, text: 'Processing archaeological sites...' },
            { progress: 60, text: 'Initializing AI analysis engine...' },
            { progress: 80, text: 'Loading geophysical surveys...' },
            { progress: 100, text: 'Platform ready!' }
        ];

        let currentStep = 0;

        const updateLoading = () => {
            if (currentStep < loadingSteps.length) {
                const step = loadingSteps[currentStep];
                progressBar.style.width = `${step.progress}%`;
                loadingStatus.textContent = step.text;
                currentStep++;
                setTimeout(updateLoading, 800);
            } else {
                // Complete loading
                setTimeout(() => {
                    this.loadingScreen.classList.add('hidden');
                    this.app.classList.add('visible');
                }, 500);
            }
        };

        updateLoading();
    }

    populateSitesList() {
        if (!this.sitesList) return;

        // Clear existing content
        this.sitesList.innerHTML = '';

        // Add all archaeological sites to the list
        const allSites = [
            ...ARCHAEOLOGICAL_SITES.pyramids,
            ...ARCHAEOLOGICAL_SITES.temples,
            ...ARCHAEOLOGICAL_SITES.tombs,
            ...ARCHAEOLOGICAL_SITES.settlements,
            ...ARCHAEOLOGICAL_SITES.ai_detected_anomalies
        ];

        allSites.forEach(site => {
            const siteItem = this.createSiteListItem(site);
            this.sitesList.appendChild(siteItem);
        });
    }

    createSiteListItem(site) {
        const item = document.createElement('div');
        item.className = 'site-item';
        item.setAttribute('data-site-id', site.id);

        const config = SITE_CONFIGS[site.type];
        const iconColor = config ? config.color : '#e6b36a';

        item.innerHTML = `
            <div class="site-name">
                <i class="${config?.icon || 'fas fa-map-marker-alt'}" style="color: ${iconColor}"></i>
                ${site.name}
            </div>
            <div class="site-coordinates">
                ${site.coordinates[0].toFixed(4)}°N, ${site.coordinates[1].toFixed(4)}°E
            </div>
        `;

        // Add click handler
        item.addEventListener('click', () => {
            this.selectSite(site);
        });

        return item;
    }

    selectSite(site) {
        // Update visual selection in sites list
        this.sitesList.querySelectorAll('.site-item').forEach(item => {
            item.classList.remove('selected');
        });

        const selectedItem = this.sitesList.querySelector(`[data-site-id="${site.id}"]`);
        if (selectedItem) {
            selectedItem.classList.add('selected');
        }

        // Show site details
        this.showSiteDetails(site);

        // Highlight on map
        if (window.mapManager) {
            window.mapManager.highlightSite(site.id);
        }
    }

    showSiteDetails(site) {
        const infoTitle = document.getElementById('site-title');
        const infoContent = document.getElementById('info-content');

        if (!infoTitle || !infoContent) return;

        // Update title
        infoTitle.textContent = site.name;

        // Create detailed content
        const content = this.createSiteDetailsContent(site);
        infoContent.innerHTML = content;

        // Show info panel
        this.showInfoPanel();
    }

    createSiteDetailsContent(site) {
        let content = `
            <div class="info-section">
                <h4>Basic Information</h4>
                <div class="info-grid">
                    <div class="info-item">
                        <strong>Type</strong>
                        <span>${site.type.replace('_', ' ').toUpperCase()}</span>
                    </div>
                    <div class="info-item">
                        <strong>Coordinates</strong>
                        <span>${site.coordinates[0].toFixed(6)}°N<br>${site.coordinates[1].toFixed(6)}°E</span>
                    </div>
        `;

        if (site.period) {
            content += `
                    <div class="info-item">
                        <strong>Period</strong>
                        <span>${site.period}</span>
                    </div>
            `;
        }

        if (site.date) {
            content += `
                    <div class="info-item">
                        <strong>Date</strong>
                        <span>${site.date}</span>
                    </div>
            `;
        }

        content += `</div></div>`;

        // Add excavation history if available
        if (site.excavation_history) {
            content += `
                <div class="info-section">
                    <h4>Excavation History</h4>
            `;

            if (site.excavation_history.howard_carter_era) {
                const carter = site.excavation_history.howard_carter_era;
                content += `
                    <div class="info-subsection">
                        <h5>Howard Carter Era</h5>
                        <p><strong>Active Period:</strong> ${carter.years_active}</p>
                        <p><strong>Major Discovery:</strong> ${carter.major_discovery}</p>
                        <p><strong>Sponsor:</strong> ${carter.sponsor}</p>
                    </div>
                `;
            }

            if (site.excavation_history.modern_excavations) {
                content += `
                    <div class="info-subsection">
                        <h5>Modern Excavations</h5>
                        <ul>
                `;
                site.excavation_history.modern_excavations.forEach(excavation => {
                    content += `<li>${excavation}</li>`;
                });
                content += `</ul></div>`;
            }

            content += `</div>`;
        }

        // Add satellite analysis if available
        if (site.satellite_analysis) {
            content += `
                <div class="info-section">
                    <h4>Satellite Analysis</h4>
            `;

            Object.entries(site.satellite_analysis).forEach(([key, value]) => {
                const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                content += `<p><strong>${label}:</strong> ${value}</p>`;
            });

            content += `</div>`;
        }

        // Add AI confidence if available
        if (site.ai_confidence || site.confidence_score) {
            const confidence = site.ai_confidence || site.confidence_score;
            content += `
                <div class="info-section">
                    <h4>AI Analysis</h4>
                    <div class="confidence-display">
                        <div class="confidence-bar">
                            <div class="confidence-fill" style="width: ${confidence}%"></div>
                        </div>
                        <span class="confidence-value">${confidence}% Confidence</span>
                    </div>
            `;

            if (site.characteristics) {
                content += `
                    <h5>Detection Characteristics</h5>
                    <ul>
                `;
                site.characteristics.forEach(char => {
                    content += `<li>${char}</li>`;
                });
                content += `</ul>`;
            }

            content += `</div>`;
        }

        // Add museum collections if available
        if (site.museum_collections) {
            content += `
                <div class="info-section">
                    <h4>Museum Collections</h4>
            `;

            Object.entries(site.museum_collections).forEach(([museum, items]) => {
                const museumName = museum.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                content += `<p><strong>${museumName}:</strong> ${items}</p>`;
            });

            content += `</div>`;
        }

        return content;
    }

    showInfoPanel() {
        if (this.infoPanel) {
            this.infoPanel.classList.add('visible');
            this.infoPanelVisible = true;
        }
    }

    hideInfoPanel() {
        if (this.infoPanel) {
            this.infoPanel.classList.remove('visible');
            this.infoPanelVisible = false;
        }
    }

    runAnomalyDetection() {
        const button = document.getElementById('anomaly-detection');
        button.classList.add('active');

        // Simulate anomaly detection process
        this.showAnalysisStatus('Running anomaly detection algorithm...');

        setTimeout(() => {
            button.classList.remove('active');
            this.showAnalysisStatus('Anomaly detection complete. 3 new potential sites identified.');

            // Highlight anomaly markers on map
            if (window.mapManager) {
                ARCHAEOLOGICAL_SITES.ai_detected_anomalies.forEach(anomaly => {
                    window.mapManager.highlightSite(anomaly.id);
                });
            }
        }, 3000);
    }

    runPredictiveAnalysis() {
        const button = document.getElementById('predictive-analysis');
        button.classList.add('active');

        this.showAnalysisStatus('Running AI predictive analysis...');

        setTimeout(() => {
            button.classList.remove('active');
            this.showAnalysisStatus('Predictive analysis complete. Updated confidence scores.');

            // Update confidence display
            if (window.analysisEngine) {
                window.analysisEngine.updateGlobalConfidence();
            }
        }, 4000);
    }

    runTemporalAnalysis() {
        const button = document.getElementById('temporal-analysis');
        button.classList.add('active');

        this.showAnalysisStatus('Analyzing temporal changes in satellite data...');

        setTimeout(() => {
            button.classList.remove('active');
            this.showAnalysisStatus('Temporal analysis complete. Change detection results available.');
        }, 3500);
    }

    toggleGeophysicalOverlay() {
        const button = document.getElementById('geophysical-overlay');
        const isActive = button.classList.contains('active');

        if (isActive) {
            button.classList.remove('active');
            this.showAnalysisStatus('GPR overlay disabled.');
        } else {
            button.classList.add('active');
            this.showAnalysisStatus('GPR overlay enabled. Showing geophysical survey data.');
        }
    }

    showAnalysisStatus(message) {
        // Update AI status indicator
        const aiStatus = document.getElementById('ai-status');
        if (aiStatus) {
            const statusText = aiStatus.querySelector('span');
            if (statusText) {
                statusText.textContent = `AI: ${message}`;
            }
        }

        // Reset status after 5 seconds
        setTimeout(() => {
            if (aiStatus) {
                const statusText = aiStatus.querySelector('span');
                if (statusText) {
                    statusText.textContent = 'AI: Processing';
                }
            }
        }, 5000);
    }

    exportApplicationData() {
        const exportData = {
            timestamp: new Date().toISOString(),
            map_state: window.mapManager ? window.mapManager.exportMapData() : null,
            archaeological_sites: ARCHAEOLOGICAL_SITES,
            satellite_sensors: SATELLITE_SENSORS,
            geophysical_surveys: GEOPHYSICAL_SURVEYS,
            museum_collections: MUSEUM_COLLECTIONS,
            application_version: 'SHAM v4 Pro',
            export_format: 'JSON'
        };

        // Create download
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `sham_v4_export_${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        URL.revokeObjectURL(url);

        this.showAnalysisStatus('Data export complete.');
    }

    toggleTheme() {
        // Toggle between light and dark themes
        document.body.classList.toggle('light-theme');

        const themeButton = document.getElementById('theme-toggle');
        const icon = themeButton.querySelector('i');

        if (document.body.classList.contains('light-theme')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    updateDataStatus() {
        // Update data status indicators
        const dataStatus = document.getElementById('data-status');
        if (dataStatus) {
            const totalSites = Object.values(ARCHAEOLOGICAL_SITES).reduce((sum, category) => {
                return sum + (Array.isArray(category) ? category.length : 0);
            }, 0);

            const statusText = dataStatus.querySelector('span');
            if (statusText) {
                statusText.textContent = `Data: ${totalSites} Sites`;
            }
        }
    }
}

// Initialize UI manager when DOM is loaded
let uiManager;
document.addEventListener('DOMContentLoaded', () => {
    uiManager = new UIManager();
    window.uiManager = uiManager; // Make globally accessible
});