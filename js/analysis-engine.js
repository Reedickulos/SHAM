// SHAM v4 Pro - Analysis Engine
// AI-powered archaeological analysis and confidence scoring

class AnalysisEngine {
    constructor() {
        this.confidenceScore = 87;
        this.factorScores = {
            spectral: 92,
            geophysical: 81,
            historical: 89
        };
        this.analysisHistory = [];
        this.initialize();
    }

    initialize() {
        this.updateConfidenceDisplay();
        this.startContinuousAnalysis();
    }

    updateConfidenceScore(site) {
        if (!site) return;

        // Calculate confidence based on site characteristics
        let confidence = 50; // Base confidence

        // Boost confidence based on site type
        const typeBoosts = {
            'pyramid': 25,
            'temple': 20,
            'tomb': 22,
            'tomb_complex': 24,
            'settlement': 15,
            'anomaly': 10
        };

        confidence += typeBoosts[site.type] || 0;

        // Add confidence from excavation history
        if (site.excavation_history) {
            confidence += 15;

            if (site.excavation_history.howard_carter_era) {
                confidence += 10; // Howard Carter adds credibility
            }
        }

        // Add confidence from satellite analysis
        if (site.satellite_analysis) {
            confidence += 8;
        }

        // Add confidence from geophysical surveys
        if (site.geophysical_data) {
            confidence += 12;
        }

        // Use existing AI confidence if available
        if (site.ai_confidence) {
            confidence = Math.max(confidence, site.ai_confidence);
        }

        if (site.confidence_score) {
            confidence = Math.max(confidence, site.confidence_score);
        }

        // Cap at 99%
        this.confidenceScore = Math.min(confidence, 99);

        // Update factor scores based on site
        this.updateFactorScores(site);

        // Update display
        this.updateConfidenceDisplay();

        // Log analysis
        this.logAnalysis(site, confidence);
    }

    updateFactorScores(site) {
        // Spectral anomalies factor
        if (site.satellite_analysis) {
            this.factorScores.spectral = Math.min(95, this.factorScores.spectral + 2);
        }

        // Geophysical signals factor
        if (site.type === 'anomaly' && site.detection_method) {
            if (site.detection_method.includes('radar') || site.detection_method.includes('thermal')) {
                this.factorScores.geophysical = Math.min(95, this.factorScores.geophysical + 3);
            }
        }

        // Historical correlation factor
        if (site.excavation_history) {
            this.factorScores.historical = Math.min(98, this.factorScores.historical + 1);
        }
    }

    updateConfidenceDisplay() {
        // Update main confidence score
        const confidenceElement = document.getElementById('confidence-score');
        if (confidenceElement) {
            confidenceElement.textContent = `${this.confidenceScore}%`;
        }

        // Update confidence circle fill
        const confidenceFill = document.getElementById('confidence-fill');
        if (confidenceFill) {
            const rotation = (this.confidenceScore / 100) * 360;
            confidenceFill.style.background = `conic-gradient(var(--accent-primary) 0deg ${rotation}deg, var(--bg-primary) ${rotation}deg 360deg)`;
        }

        // Update factor scores
        const factors = document.querySelectorAll('.factor-score');
        factors.forEach((factor, index) => {
            const scores = Object.values(this.factorScores);
            if (scores[index]) {
                factor.textContent = `${scores[index]}%`;
            }
        });
    }

    logAnalysis(site, confidence) {
        const analysisEntry = {
            timestamp: new Date().toISOString(),
            site_id: site.id,
            site_name: site.name,
            confidence: confidence,
            factors: { ...this.factorScores },
            analysis_type: 'site_evaluation'
        };

        this.analysisHistory.push(analysisEntry);

        // Keep only last 100 analyses
        if (this.analysisHistory.length > 100) {
            this.analysisHistory.shift();
        }
    }

    runMultispectralAnalysis(coordinates, spectralBands) {
        // Simulate multispectral analysis
        return new Promise((resolve) => {
            setTimeout(() => {
                const analysis = {
                    coordinates: coordinates,
                    spectral_signatures: this.generateSpectralSignatures(spectralBands),
                    anomalies_detected: this.detectSpectralAnomalies(spectralBands),
                    confidence: this.calculateSpectralConfidence(spectralBands),
                    recommendations: this.generateRecommendations(spectralBands)
                };

                resolve(analysis);
            }, 2000);
        });
    }

    generateSpectralSignatures(bands) {
        const signatures = {};

        bands.forEach(band => {
            signatures[band] = {
                mean_reflectance: Math.random() * 0.8 + 0.1,
                std_deviation: Math.random() * 0.1,
                anomaly_threshold: Math.random() * 0.2 + 0.1
            };
        });

        return signatures;
    }

    detectSpectralAnomalies(bands) {
        const anomalies = [];

        bands.forEach(band => {
            if (Math.random() > 0.7) { // 30% chance of anomaly
                anomalies.push({
                    band: band,
                    type: this.getAnomalyType(),
                    strength: Math.random() * 0.5 + 0.5,
                    archaeological_potential: Math.random() > 0.5 ? 'high' : 'medium'
                });
            }
        });

        return anomalies;
    }

    getAnomalyType() {
        const types = [
            'vegetation_stress',
            'soil_moisture_variation',
            'thermal_differential',
            'mineral_composition_change',
            'surface_roughness_anomaly'
        ];

        return types[Math.floor(Math.random() * types.length)];
    }

    calculateSpectralConfidence(bands) {
        // Base confidence on number of bands and simulated anomaly strength
        let confidence = 50 + (bands.length * 5);

        // Add random variation
        confidence += (Math.random() - 0.5) * 20;

        return Math.max(10, Math.min(95, Math.round(confidence)));
    }

    generateRecommendations(bands) {
        const recommendations = [];

        if (bands.includes('nir')) {
            recommendations.push('Vegetation stress analysis recommended');
        }

        if (bands.includes('swir')) {
            recommendations.push('Soil moisture mapping suggested');
        }

        if (bands.includes('tir')) {
            recommendations.push('Thermal anomaly investigation advised');
        }

        recommendations.push('Ground-truthing survey recommended');
        recommendations.push('Multi-temporal analysis suggested');

        return recommendations;
    }

    runGeophysicalCorrelation(siteId) {
        // Correlate with geophysical survey data
        return new Promise((resolve) => {
            setTimeout(() => {
                const correlation = {
                    site_id: siteId,
                    gpr_correlation: Math.random() * 0.8 + 0.2,
                    magnetometry_correlation: Math.random() * 0.7 + 0.3,
                    resistivity_correlation: Math.random() * 0.6 + 0.4,
                    overall_correlation: Math.random() * 0.75 + 0.25,
                    confidence_boost: Math.round((Math.random() * 15) + 5)
                };

                // Update confidence with correlation boost
                this.confidenceScore = Math.min(99, this.confidenceScore + correlation.confidence_boost);
                this.updateConfidenceDisplay();

                resolve(correlation);
            }, 1500);
        });
    }

    performTemporalAnalysis(siteId, timeRange) {
        // Analyze changes over time
        return new Promise((resolve) => {
            setTimeout(() => {
                const analysis = {
                    site_id: siteId,
                    time_range: timeRange,
                    changes_detected: Math.random() > 0.6,
                    change_magnitude: Math.random() * 0.5,
                    change_type: this.getChangeType(),
                    archaeological_significance: this.assessArchaeologicalSignificance()
                };

                resolve(analysis);
            }, 2500);
        });
    }

    getChangeType() {
        const types = [
            'vegetation_growth',
            'soil_exposure',
            'construction_activity',
            'erosion_pattern',
            'moisture_change'
        ];

        return types[Math.floor(Math.random() * types.length)];
    }

    assessArchaeologicalSignificance() {
        const significance = Math.random();

        if (significance > 0.8) return 'high';
        if (significance > 0.5) return 'medium';
        return 'low';
    }

    predictUndiscoveredSites(region) {
        // AI prediction for potential archaeological sites
        return new Promise((resolve) => {
            setTimeout(() => {
                const predictions = [];
                const numPredictions = Math.floor(Math.random() * 5) + 1;

                for (let i = 0; i < numPredictions; i++) {
                    predictions.push({
                        id: `prediction_${Date.now()}_${i}`,
                        coordinates: this.generateRandomCoordinates(region),
                        confidence: Math.round(Math.random() * 40 + 60),
                        site_type_prediction: this.predictSiteType(),
                        evidence_factors: this.generateEvidenceFactors(),
                        priority: this.calculatePriority()
                    });
                }

                resolve(predictions);
            }, 3000);
        });
    }

    generateRandomCoordinates(region) {
        // Generate coordinates within Egypt bounds
        const egyptBounds = {
            north: 31.5,
            south: 22.0,
            east: 35.0,
            west: 25.0
        };

        const lat = Math.random() * (egyptBounds.north - egyptBounds.south) + egyptBounds.south;
        const lng = Math.random() * (egyptBounds.east - egyptBounds.west) + egyptBounds.west;

        return [lat, lng];
    }

    predictSiteType() {
        const types = ['tomb', 'settlement', 'temple', 'industrial'];
        const weights = [0.4, 0.3, 0.2, 0.1]; // Higher probability for tombs

        const random = Math.random();
        let cumulative = 0;

        for (let i = 0; i < types.length; i++) {
            cumulative += weights[i];
            if (random <= cumulative) {
                return types[i];
            }
        }

        return types[0];
    }

    generateEvidenceFactors() {
        const factors = [];
        const possibleFactors = [
            'spectral_anomaly',
            'topographic_feature',
            'proximity_to_known_site',
            'historical_reference',
            'geophysical_signature',
            'vegetation_pattern'
        ];

        const numFactors = Math.floor(Math.random() * 4) + 2;
        const selectedFactors = possibleFactors.sort(() => 0.5 - Math.random()).slice(0, numFactors);

        selectedFactors.forEach(factor => {
            factors.push({
                type: factor,
                strength: Math.random() * 0.8 + 0.2,
                reliability: Math.random() * 0.7 + 0.3
            });
        });

        return factors;
    }

    calculatePriority() {
        const priority = Math.random();

        if (priority > 0.8) return 'very_high';
        if (priority > 0.6) return 'high';
        if (priority > 0.4) return 'medium';
        return 'low';
    }

    updateGlobalConfidence() {
        // Simulate global confidence update
        const variations = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
        const change = variations[Math.floor(Math.random() * variations.length)];

        this.confidenceScore = Math.max(70, Math.min(99, this.confidenceScore + change));

        // Update factor scores with small variations
        Object.keys(this.factorScores).forEach(factor => {
            const factorChange = Math.floor((Math.random() - 0.5) * 6);
            this.factorScores[factor] = Math.max(60, Math.min(98, this.factorScores[factor] + factorChange));
        });

        this.updateConfidenceDisplay();
    }

    startContinuousAnalysis() {
        // Simulate continuous background analysis
        setInterval(() => {
            // Small random fluctuations to simulate real-time processing
            if (Math.random() > 0.7) {
                this.updateGlobalConfidence();
            }
        }, 30000); // Update every 30 seconds
    }

    exportAnalysisData() {
        return {
            current_confidence: this.confidenceScore,
            factor_scores: this.factorScores,
            analysis_history: this.analysisHistory,
            timestamp: new Date().toISOString()
        };
    }
}

// Initialize analysis engine when DOM is loaded
let analysisEngine;
document.addEventListener('DOMContentLoaded', () => {
    analysisEngine = new AnalysisEngine();
    window.analysisEngine = analysisEngine; // Make globally accessible
});