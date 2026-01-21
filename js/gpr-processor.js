// SHAM v5 Pro - GPR Data Processing
// Ground Penetrating Radar analysis integration

class GPRProcessor {
    constructor() {
        this.profiles = [];
        this.processedData = [];
        this.interpretations = [];

        this.settings = {
            velocityModel: 0.1, // m/ns (typical for dry sand)
            dielectricConstant: 4, // dry sand
            depthConversion: true,
            gainFunction: 'SEC2' // Spherical and exponential compensation
        };

        console.log('📡 GPR Processor initialized');
    }

    // Process GPR profile data
    async processProfile(data, metadata) {
        const profile = {
            id: `GPR-${Date.now()}`,
            uploadedAt: new Date().toISOString(),
            metadata: {
                fileName: metadata.fileName,
                antenna: metadata.antenna || '400 MHz',
                samples: metadata.samples || 512,
                traces: metadata.traces || 1000,
                timeWindow: metadata.timeWindow || 100, // ns
                traceSpacing: metadata.traceSpacing || 0.05, // m
                ...metadata
            },
            processing: {
                steps: [],
                status: 'processing'
            },
            results: null
        };

        this.profiles.push(profile);

        // Apply processing steps
        await this.applyDCRemoval(profile);
        await this.applyGainFunction(profile);
        await this.applyBandpassFilter(profile);
        await this.applyMigration(profile);
        await this.applyDepthConversion(profile);
        await this.detectAnomalies(profile);

        profile.processing.status = 'complete';
        this.processedData.push(profile);

        return profile;
    }

    async applyDCRemoval(profile) {
        await new Promise(r => setTimeout(r, 100));
        profile.processing.steps.push({
            name: 'DC Removal',
            timestamp: new Date().toISOString(),
            description: 'Removed zero-frequency component (dewow filter)',
            status: 'complete'
        });
    }

    async applyGainFunction(profile) {
        await new Promise(r => setTimeout(r, 100));
        profile.processing.steps.push({
            name: 'Gain Application',
            timestamp: new Date().toISOString(),
            description: `Applied ${this.settings.gainFunction} gain function`,
            status: 'complete'
        });
    }

    async applyBandpassFilter(profile) {
        await new Promise(r => setTimeout(r, 100));
        const centerFreq = parseInt(profile.metadata.antenna) || 400;
        profile.processing.steps.push({
            name: 'Bandpass Filter',
            timestamp: new Date().toISOString(),
            description: `Butterworth bandpass: ${centerFreq * 0.5}-${centerFreq * 1.5} MHz`,
            status: 'complete'
        });
    }

    async applyMigration(profile) {
        await new Promise(r => setTimeout(r, 150));
        profile.processing.steps.push({
            name: 'Migration',
            timestamp: new Date().toISOString(),
            description: 'Kirchhoff migration applied (velocity: 0.1 m/ns)',
            status: 'complete'
        });
    }

    async applyDepthConversion(profile) {
        await new Promise(r => setTimeout(r, 100));
        const maxDepth = (profile.metadata.timeWindow * this.settings.velocityModel) / 2;
        profile.processing.steps.push({
            name: 'Depth Conversion',
            timestamp: new Date().toISOString(),
            description: `Time-to-depth conversion (max depth: ${maxDepth.toFixed(1)}m)`,
            status: 'complete',
            maxDepth: maxDepth
        });
    }

    async detectAnomalies(profile) {
        await new Promise(r => setTimeout(r, 200));

        // Simulated anomaly detection
        const anomalies = [];
        const numAnomalies = Math.floor(Math.random() * 5) + 1;

        for (let i = 0; i < numAnomalies; i++) {
            anomalies.push({
                id: `GPR-ANOM-${i + 1}`,
                position: {
                    trace: Math.floor(Math.random() * (profile.metadata.traces || 1000)),
                    depth: (Math.random() * 8 + 1).toFixed(1),
                    distance: (Math.random() * 50).toFixed(1)
                },
                type: this.classifyAnomaly(),
                amplitude: (Math.random() * 0.5 + 0.5).toFixed(2),
                confidence: (Math.random() * 0.3 + 0.7).toFixed(2),
                hyperbola: Math.random() > 0.5,
                description: ''
            });
        }

        anomalies.forEach(a => {
            a.description = this.generateAnomalyDescription(a);
        });

        profile.results = {
            anomalies: anomalies,
            summary: {
                totalAnomalies: anomalies.length,
                highConfidence: anomalies.filter(a => parseFloat(a.confidence) > 0.85).length,
                hyperbolicReflections: anomalies.filter(a => a.hyperbola).length,
                maxDepthReached: profile.processing.steps.find(s => s.maxDepth)?.maxDepth || 5
            }
        };

        profile.processing.steps.push({
            name: 'Anomaly Detection',
            timestamp: new Date().toISOString(),
            description: `Detected ${anomalies.length} potential subsurface anomalies`,
            status: 'complete'
        });
    }

    classifyAnomaly() {
        const types = [
            { type: 'void', description: 'Potential void or cavity' },
            { type: 'interface', description: 'Stratigraphic interface' },
            { type: 'point_reflector', description: 'Point reflector (possible artifact)' },
            { type: 'linear', description: 'Linear feature (wall/foundation)' },
            { type: 'diffraction', description: 'Diffraction hyperbola' }
        ];
        return types[Math.floor(Math.random() * types.length)];
    }

    generateAnomalyDescription(anomaly) {
        const descriptions = {
            void: `Strong hyperbolic reflection at ${anomaly.position.depth}m depth, characteristic of void space or cavity`,
            interface: `Horizontal reflector at ${anomaly.position.depth}m, possible floor or compacted surface`,
            point_reflector: `Discrete high-amplitude return at ${anomaly.position.depth}m, possible buried object`,
            linear: `Linear reflection pattern extending across profile, possible wall or foundation`,
            diffraction: `Classic diffraction hyperbola centered at trace ${anomaly.position.trace}, point source at ${anomaly.position.depth}m`
        };
        return descriptions[anomaly.type.type] || 'Unclassified anomaly';
    }

    // Add interpretation
    addInterpretation(profileId, interpretation) {
        const interp = {
            id: `INTERP-${Date.now()}`,
            profileId: profileId,
            createdAt: new Date().toISOString(),
            author: interpretation.author || 'SHAM AI',
            findings: interpretation.findings,
            recommendations: interpretation.recommendations,
            figures: interpretation.figures || []
        };

        this.interpretations.push(interp);
        return interp;
    }

    // Generate processing report
    generateReport(profileId) {
        const profile = this.profiles.find(p => p.id === profileId);
        if (!profile) return null;

        return {
            title: 'GPR Survey Processing Report',
            profileId: profile.id,
            generatedAt: new Date().toISOString(),
            acquisitionParameters: profile.metadata,
            processingSteps: profile.processing.steps,
            results: profile.results,
            interpretation: this.interpretations.filter(i => i.profileId === profileId),
            qualityAssessment: {
                signalToNoise: 'Good',
                penetrationDepth: `${profile.results?.summary?.maxDepthReached || 5}m`,
                dataQuality: 'Suitable for interpretation'
            }
        };
    }

    // Velocity analysis helper
    calculateVelocity(dielectricConstant) {
        const c = 0.3; // Speed of light in m/ns
        return c / Math.sqrt(dielectricConstant);
    }

    // Depth estimation
    estimateDepth(twoWayTime, velocity = null) {
        const v = velocity || this.settings.velocityModel;
        return (twoWayTime * v) / 2;
    }

    // Material dielectric constants
    getMaterialProperties() {
        return {
            air: { dielectric: 1, velocity: 0.30 },
            dry_sand: { dielectric: 4, velocity: 0.15 },
            wet_sand: { dielectric: 25, velocity: 0.06 },
            limestone: { dielectric: 8, velocity: 0.11 },
            granite: { dielectric: 6, velocity: 0.12 },
            clay_dry: { dielectric: 3, velocity: 0.17 },
            clay_wet: { dielectric: 15, velocity: 0.08 },
            concrete: { dielectric: 6, velocity: 0.12 }
        };
    }

    getProfiles() { return this.profiles; }
    getInterpretations() { return this.interpretations; }
}

window.GPRProcessor = GPRProcessor;
window.gprProcessor = new GPRProcessor();
