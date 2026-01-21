// SHAM v5 Pro - Archaeological AI Detection Engine
// Machine Learning-based site prediction using multi-sensor signatures

class ArchaeologicalAI {
    constructor() {
        this.model = null;
        this.trainingData = [];
        this.knownSites = this.initializeKnownSites();
        this.featureWeights = this.initializeWeights();
        this.predictions = [];

        console.log('🤖 Archaeological AI Engine initialized');
    }

    // ===== KNOWN ARCHAEOLOGICAL SITES DATABASE =====
    initializeKnownSites() {
        return {
            egypt: [
                // Pyramids
                { id: 'giza_khufu', name: 'Great Pyramid of Khufu', lat: 29.9792, lon: 31.1342, type: 'pyramid', period: 'Old Kingdom', confidence: 100, signatures: { thermal: 0.85, sar: 0.92, magnetic: 0.45, gravity: 0.78 } },
                { id: 'giza_khafre', name: 'Pyramid of Khafre', lat: 29.9756, lon: 31.1308, type: 'pyramid', period: 'Old Kingdom', confidence: 100, signatures: { thermal: 0.82, sar: 0.89, magnetic: 0.42, gravity: 0.75 } },
                { id: 'giza_menkaure', name: 'Pyramid of Menkaure', lat: 29.9722, lon: 31.1281, type: 'pyramid', period: 'Old Kingdom', confidence: 100, signatures: { thermal: 0.78, sar: 0.85, magnetic: 0.38, gravity: 0.70 } },
                { id: 'saqqara_djoser', name: 'Step Pyramid of Djoser', lat: 29.8711, lon: 31.2156, type: 'pyramid', period: 'Old Kingdom', confidence: 100, signatures: { thermal: 0.80, sar: 0.88, magnetic: 0.50, gravity: 0.72 } },
                { id: 'dahshur_bent', name: 'Bent Pyramid', lat: 29.7903, lon: 31.2094, type: 'pyramid', period: 'Old Kingdom', confidence: 100, signatures: { thermal: 0.79, sar: 0.86, magnetic: 0.44, gravity: 0.71 } },
                { id: 'dahshur_red', name: 'Red Pyramid', lat: 29.8086, lon: 31.2061, type: 'pyramid', period: 'Old Kingdom', confidence: 100, signatures: { thermal: 0.81, sar: 0.87, magnetic: 0.46, gravity: 0.73 } },
                { id: 'meidum', name: 'Meidum Pyramid', lat: 29.3883, lon: 31.1569, type: 'pyramid', period: 'Old Kingdom', confidence: 100, signatures: { thermal: 0.75, sar: 0.82, magnetic: 0.40, gravity: 0.68 } },

                // Temples
                { id: 'karnak', name: 'Karnak Temple Complex', lat: 25.7189, lon: 32.6575, type: 'temple', period: 'New Kingdom', confidence: 100, signatures: { thermal: 0.72, sar: 0.78, magnetic: 0.65, gravity: 0.60 } },
                { id: 'luxor_temple', name: 'Luxor Temple', lat: 25.6989, lon: 32.6397, type: 'temple', period: 'New Kingdom', confidence: 100, signatures: { thermal: 0.70, sar: 0.75, magnetic: 0.62, gravity: 0.58 } },
                { id: 'abu_simbel', name: 'Abu Simbel', lat: 22.3372, lon: 31.6258, type: 'temple', period: 'New Kingdom', confidence: 100, signatures: { thermal: 0.88, sar: 0.91, magnetic: 0.55, gravity: 0.65 } },
                { id: 'edfu', name: 'Temple of Edfu', lat: 24.9777, lon: 32.8736, type: 'temple', period: 'Ptolemaic', confidence: 100, signatures: { thermal: 0.68, sar: 0.74, magnetic: 0.58, gravity: 0.55 } },
                { id: 'dendera', name: 'Dendera Temple', lat: 26.1425, lon: 32.6700, type: 'temple', period: 'Ptolemaic', confidence: 100, signatures: { thermal: 0.66, sar: 0.72, magnetic: 0.60, gravity: 0.52 } },
                { id: 'philae', name: 'Temple of Philae', lat: 24.0247, lon: 32.8842, type: 'temple', period: 'Ptolemaic', confidence: 100, signatures: { thermal: 0.64, sar: 0.70, magnetic: 0.56, gravity: 0.50 } },

                // Tombs
                { id: 'valley_kings', name: 'Valley of the Kings', lat: 25.7402, lon: 32.6014, type: 'tomb_complex', period: 'New Kingdom', confidence: 100, signatures: { thermal: 0.90, sar: 0.75, magnetic: 0.70, gravity: 0.82 } },
                { id: 'valley_queens', name: 'Valley of the Queens', lat: 25.7289, lon: 32.5878, type: 'tomb_complex', period: 'New Kingdom', confidence: 100, signatures: { thermal: 0.85, sar: 0.72, magnetic: 0.68, gravity: 0.78 } },
                { id: 'deir_medina', name: 'Deir el-Medina', lat: 25.7281, lon: 32.6017, type: 'settlement', period: 'New Kingdom', confidence: 100, signatures: { thermal: 0.70, sar: 0.68, magnetic: 0.75, gravity: 0.60 } },
                { id: 'kv62', name: 'Tomb of Tutankhamun (KV62)', lat: 25.7406, lon: 32.6011, type: 'tomb', period: 'New Kingdom', confidence: 100, signatures: { thermal: 0.92, sar: 0.70, magnetic: 0.72, gravity: 0.85 } },

                // Cities
                { id: 'amarna', name: 'Tell el-Amarna', lat: 27.6539, lon: 30.8997, type: 'city', period: 'New Kingdom', confidence: 100, signatures: { thermal: 0.55, sar: 0.65, magnetic: 0.80, gravity: 0.45 } },
                { id: 'memphis', name: 'Ancient Memphis', lat: 29.8481, lon: 31.2547, type: 'city', period: 'Old Kingdom', confidence: 100, signatures: { thermal: 0.50, sar: 0.60, magnetic: 0.78, gravity: 0.42 } },
                { id: 'thebes', name: 'Ancient Thebes', lat: 25.7000, lon: 32.6500, type: 'city', period: 'New Kingdom', confidence: 100, signatures: { thermal: 0.58, sar: 0.62, magnetic: 0.76, gravity: 0.48 } },

                // Recent Discoveries
                { id: 'scanpyramids_void', name: 'ScanPyramids Big Void', lat: 29.9793, lon: 31.1343, type: 'void', period: 'Old Kingdom', confidence: 95, signatures: { thermal: 0.95, sar: 0.88, magnetic: 0.30, gravity: 0.92 } },
                { id: 'saqqara_2020', name: 'Saqqara Shaft Tombs (2020)', lat: 29.8705, lon: 31.2148, type: 'tomb', period: 'Late Period', confidence: 100, signatures: { thermal: 0.88, sar: 0.75, magnetic: 0.65, gravity: 0.80 } }
            ],

            global: [
                // Petra
                { id: 'petra_treasury', name: 'Petra Treasury', lat: 30.3228, lon: 35.4492, type: 'temple', period: 'Nabataean', confidence: 100, country: 'Jordan', signatures: { thermal: 0.85, sar: 0.90, magnetic: 0.40, gravity: 0.70 } },
                { id: 'petra_monastery', name: 'Petra Monastery', lat: 30.3117, lon: 35.4383, type: 'temple', period: 'Nabataean', confidence: 100, country: 'Jordan', signatures: { thermal: 0.82, sar: 0.88, magnetic: 0.38, gravity: 0.68 } },

                // Göbekli Tepe
                { id: 'gobekli_tepe', name: 'Göbekli Tepe', lat: 37.2233, lon: 38.9225, type: 'temple', period: 'Neolithic', confidence: 100, country: 'Turkey', signatures: { thermal: 0.75, sar: 0.80, magnetic: 0.85, gravity: 0.65 } },

                // Angkor
                { id: 'angkor_wat', name: 'Angkor Wat', lat: 13.4125, lon: 103.8670, type: 'temple', period: 'Khmer', confidence: 100, country: 'Cambodia', signatures: { thermal: 0.60, sar: 0.85, magnetic: 0.55, gravity: 0.50 } },
                { id: 'angkor_thom', name: 'Angkor Thom', lat: 13.4411, lon: 103.8586, type: 'city', period: 'Khmer', confidence: 100, country: 'Cambodia', signatures: { thermal: 0.58, sar: 0.82, magnetic: 0.52, gravity: 0.48 } },

                // Mesoamerica
                { id: 'teotihuacan', name: 'Teotihuacan', lat: 19.6925, lon: -98.8439, type: 'city', period: 'Classic', confidence: 100, country: 'Mexico', signatures: { thermal: 0.70, sar: 0.78, magnetic: 0.80, gravity: 0.60 } },
                { id: 'chichen_itza', name: 'Chichen Itza', lat: 20.6843, lon: -88.5678, type: 'city', period: 'Maya', confidence: 100, country: 'Mexico', signatures: { thermal: 0.68, sar: 0.75, magnetic: 0.78, gravity: 0.58 } },

                // Machu Picchu
                { id: 'machu_picchu', name: 'Machu Picchu', lat: -13.1631, lon: -72.5450, type: 'city', period: 'Inca', confidence: 100, country: 'Peru', signatures: { thermal: 0.55, sar: 0.72, magnetic: 0.60, gravity: 0.52 } },

                // Stonehenge
                { id: 'stonehenge', name: 'Stonehenge', lat: 51.1789, lon: -1.8262, type: 'monument', period: 'Neolithic', confidence: 100, country: 'UK', signatures: { thermal: 0.45, sar: 0.65, magnetic: 0.88, gravity: 0.55 } },

                // Pompeii
                { id: 'pompeii', name: 'Pompeii', lat: 40.7508, lon: 14.4869, type: 'city', period: 'Roman', confidence: 100, country: 'Italy', signatures: { thermal: 0.72, sar: 0.70, magnetic: 0.82, gravity: 0.65 } }
            ]
        };
    }

    initializeWeights() {
        // Learned weights from "training" on known sites
        return {
            pyramid: { thermal: 0.30, sar: 0.35, magnetic: 0.15, gravity: 0.20, seismic: 0.15 },
            temple: { thermal: 0.25, sar: 0.30, magnetic: 0.25, gravity: 0.20, seismic: 0.10 },
            tomb: { thermal: 0.35, sar: 0.20, magnetic: 0.20, gravity: 0.30, seismic: 0.20 },
            tomb_complex: { thermal: 0.35, sar: 0.20, magnetic: 0.25, gravity: 0.30, seismic: 0.15 },
            void: { thermal: 0.40, sar: 0.15, magnetic: 0.05, gravity: 0.35, seismic: 0.25 },
            city: { thermal: 0.15, sar: 0.25, magnetic: 0.35, gravity: 0.15, seismic: 0.10 },
            settlement: { thermal: 0.20, sar: 0.25, magnetic: 0.30, gravity: 0.15, seismic: 0.10 },
            unknown: { thermal: 0.25, sar: 0.25, magnetic: 0.20, gravity: 0.20, seismic: 0.15 }
        };
    }

    // ===== SIGNATURE EXTRACTION =====

    extractSignatures(sensorData) {
        // Extract normalized signatures from multi-sensor data
        const signatures = {};

        if (sensorData.sar) {
            signatures.sar = this.normalizeSARSignature(sensorData.sar);
        }

        if (sensorData.thermal) {
            signatures.thermal = this.normalizeThermalSignature(sensorData.thermal);
        }

        if (sensorData.seismic) {
            signatures.seismic = this.normalizeSeismicSignature(sensorData.seismic);
        }

        if (sensorData.gravity) {
            signatures.gravity = this.normalizeGravitySignature(sensorData.gravity);
        }

        if (sensorData.magnetic) {
            signatures.magnetic = this.normalizeMagneticSignature(sensorData.magnetic);
        }

        return signatures;
    }

    normalizeSARSignature(data) {
        // Normalize SAR backscatter to 0-1 range
        const sigma0 = data.sigma0 || -15;
        const normalized = (sigma0 + 30) / 40; // -30 to +10 dB range
        return Math.max(0, Math.min(1, normalized));
    }

    normalizeThermalSignature(data) {
        // Normalize thermal anomaly
        const temp = data.surfaceTemp || 25;
        const ambient = data.ambientTemp || 25;
        const anomaly = Math.abs(temp - ambient);
        return Math.min(1, anomaly / 5); // 5°C = max anomaly
    }

    normalizeSeismicSignature(data) {
        // Normalize seismic velocity anomaly
        const vpRatio = data.vpVelocity / 2500; // Normalize to expected limestone
        const anomaly = Math.abs(1 - vpRatio);
        return Math.min(1, anomaly * 2);
    }

    normalizeGravitySignature(data) {
        // Normalize gravity anomaly
        const anomaly = Math.abs(data.bouguerAnomaly || 0);
        return Math.min(1, anomaly / 200); // 200 µGal = max
    }

    normalizeMagneticSignature(data) {
        // Normalize magnetic anomaly
        const anomaly = Math.abs(data.anomaly || 0);
        return Math.min(1, anomaly / 100); // 100 nT = max
    }

    // ===== PREDICTION ENGINE =====

    predict(coordinates, sensorData) {
        const signatures = this.extractSignatures(sensorData);
        const nearestSites = this.findNearestKnownSites(coordinates, 5);

        // Calculate similarity to each site type
        const typeScores = {};
        const siteTypes = ['pyramid', 'temple', 'tomb', 'void', 'city', 'settlement'];

        siteTypes.forEach(type => {
            typeScores[type] = this.calculateTypeSimilarity(signatures, type);
        });

        // Find best matching type
        const bestType = Object.entries(typeScores)
            .sort((a, b) => b[1] - a[1])[0];

        // Calculate overall archaeological probability
        const probability = this.calculateArchaeologicalProbability(signatures, nearestSites);

        // Generate prediction
        const prediction = {
            id: `PRED_${Date.now()}`,
            coordinates: coordinates,
            probability: probability,
            predictedType: bestType[0],
            typeConfidence: bestType[1],
            typeScores: typeScores,
            signatures: signatures,
            nearestKnownSites: nearestSites.slice(0, 3),
            evidenceFactors: this.generateEvidenceFactors(signatures),
            recommendation: this.generateRecommendation(probability, bestType[0]),
            timestamp: new Date().toISOString()
        };

        this.predictions.push(prediction);
        return prediction;
    }

    calculateTypeSimilarity(signatures, type) {
        const weights = this.featureWeights[type] || this.featureWeights.unknown;
        let similarity = 0;
        let totalWeight = 0;

        // Get average signature for this type from known sites
        const typeSites = [...this.knownSites.egypt, ...this.knownSites.global]
            .filter(s => s.type === type);

        if (typeSites.length === 0) return 0;

        const avgSignatures = {};
        ['thermal', 'sar', 'magnetic', 'gravity'].forEach(sensor => {
            avgSignatures[sensor] = typeSites.reduce((sum, s) =>
                sum + (s.signatures[sensor] || 0), 0) / typeSites.length;
        });

        // Calculate weighted similarity
        Object.entries(weights).forEach(([sensor, weight]) => {
            if (signatures[sensor] !== undefined && avgSignatures[sensor] !== undefined) {
                const diff = Math.abs(signatures[sensor] - avgSignatures[sensor]);
                similarity += weight * (1 - diff);
                totalWeight += weight;
            }
        });

        return totalWeight > 0 ? similarity / totalWeight : 0;
    }

    calculateArchaeologicalProbability(signatures, nearestSites) {
        let baseProbability = 0.1; // 10% base

        // Boost from signature strength
        const avgSignature = Object.values(signatures).reduce((a, b) => a + b, 0) /
            Object.values(signatures).length;
        baseProbability += avgSignature * 0.4;

        // Boost from proximity to known sites
        if (nearestSites.length > 0) {
            const nearestDist = nearestSites[0].distance;
            if (nearestDist < 1) baseProbability += 0.3; // Within 1km
            else if (nearestDist < 5) baseProbability += 0.2; // Within 5km
            else if (nearestDist < 10) baseProbability += 0.1; // Within 10km
        }

        // Boost from multi-sensor agreement
        const signatureValues = Object.values(signatures);
        const variance = this.calculateVariance(signatureValues);
        if (variance < 0.1) baseProbability += 0.15; // Sensors agree

        return Math.min(0.99, Math.max(0.01, baseProbability));
    }

    calculateVariance(arr) {
        if (arr.length === 0) return 0;
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        return arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
    }

    findNearestKnownSites(coordinates, count = 5) {
        const allSites = [...this.knownSites.egypt, ...this.knownSites.global];

        return allSites
            .map(site => ({
                ...site,
                distance: this.haversineDistance(coordinates, [site.lat, site.lon])
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, count);
    }

    haversineDistance(coord1, coord2) {
        const R = 6371; // Earth radius in km
        const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
        const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    generateEvidenceFactors(signatures) {
        const factors = [];

        if (signatures.thermal > 0.7) {
            factors.push({ type: 'thermal_anomaly', strength: 'strong', description: 'Significant thermal differential detected' });
        }
        if (signatures.sar > 0.7) {
            factors.push({ type: 'sar_reflection', strength: 'strong', description: 'Strong radar backscatter anomaly' });
        }
        if (signatures.gravity > 0.6) {
            factors.push({ type: 'gravity_anomaly', strength: 'moderate', description: 'Mass deficit/excess detected' });
        }
        if (signatures.magnetic > 0.6) {
            factors.push({ type: 'magnetic_anomaly', strength: 'moderate', description: 'Magnetic field disturbance' });
        }
        if (signatures.seismic > 0.5) {
            factors.push({ type: 'seismic_anomaly', strength: 'moderate', description: 'Velocity anomaly in subsurface' });
        }

        return factors;
    }

    generateRecommendation(probability, type) {
        if (probability > 0.85) {
            return {
                priority: 'CRITICAL',
                action: 'Immediate ground-truth investigation recommended',
                confidence: 'Very High',
                suggestedSurveys: ['Detailed GPR survey', 'Drone LiDAR', 'Core sampling']
            };
        } else if (probability > 0.70) {
            return {
                priority: 'HIGH',
                action: 'Schedule field investigation',
                confidence: 'High',
                suggestedSurveys: ['GPR transects', 'Magnetometry grid']
            };
        } else if (probability > 0.50) {
            return {
                priority: 'MODERATE',
                action: 'Add to monitoring list, acquire more satellite passes',
                confidence: 'Moderate',
                suggestedSurveys: ['Multi-temporal analysis', 'Higher resolution imagery']
            };
        } else {
            return {
                priority: 'LOW',
                action: 'Continue passive monitoring',
                confidence: 'Low',
                suggestedSurveys: ['Seasonal thermal analysis']
            };
        }
    }

    // ===== BATCH PREDICTION =====

    async scanRegion(bounds, resolution = 0.01) {
        const predictions = [];
        const { north, south, east, west } = bounds;

        console.log(`🔍 Scanning region: ${south},${west} to ${north},${east}`);

        for (let lat = south; lat <= north; lat += resolution) {
            for (let lon = west; lon <= east; lon += resolution) {
                // Generate synthetic sensor data for demo
                const sensorData = this.generateSyntheticSensorData([lat, lon]);
                const prediction = this.predict([lat, lon], sensorData);

                if (prediction.probability > 0.5) {
                    predictions.push(prediction);
                }
            }
        }

        console.log(`✅ Scan complete. Found ${predictions.length} potential sites.`);
        return predictions.sort((a, b) => b.probability - a.probability);
    }

    generateSyntheticSensorData(coordinates) {
        // Generate realistic synthetic sensor data based on proximity to known sites
        const nearestSites = this.findNearestKnownSites(coordinates, 3);
        const nearestDist = nearestSites[0]?.distance || 100;

        // Base values with some randomness
        let thermal = 0.2 + Math.random() * 0.3;
        let sar = 0.2 + Math.random() * 0.3;
        let gravity = 0.1 + Math.random() * 0.2;
        let magnetic = 0.1 + Math.random() * 0.2;
        let seismic = 0.1 + Math.random() * 0.2;

        // Boost if near known sites
        if (nearestDist < 2) {
            const boost = (2 - nearestDist) / 2;
            thermal += boost * 0.5;
            sar += boost * 0.4;
            gravity += boost * 0.4;
            magnetic += boost * 0.3;
            seismic += boost * 0.3;
        }

        return {
            sar: { sigma0: -15 + sar * 10 },
            thermal: { surfaceTemp: 28 + thermal * 5, ambientTemp: 28 },
            seismic: { vpVelocity: 2500 - seismic * 500 },
            gravity: { bouguerAnomaly: gravity * 150 },
            magnetic: { anomaly: magnetic * 80 }
        };
    }

    // ===== EXPORT =====

    exportPredictions() {
        return {
            generatedAt: new Date().toISOString(),
            model: 'SHAM Archaeological AI v1.0',
            totalPredictions: this.predictions.length,
            predictions: this.predictions,
            knownSitesCount: this.knownSites.egypt.length + this.knownSites.global.length
        };
    }

    getKnownSites(region = 'all') {
        if (region === 'egypt') return this.knownSites.egypt;
        if (region === 'global') return this.knownSites.global;
        return [...this.knownSites.egypt, ...this.knownSites.global];
    }
}

// Initialize
let archaeologicalAI;
document.addEventListener('DOMContentLoaded', () => {
    archaeologicalAI = new ArchaeologicalAI();
    window.archaeologicalAI = archaeologicalAI;
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArchaeologicalAI;
}
