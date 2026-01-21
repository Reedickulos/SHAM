// SHAM v5 Pro - Historical Image Time Machine
// Compare modern satellite imagery with declassified historical photography

class HistoricalTimeMachine {
    constructor() {
        this.archives = this.initArchives();
        this.comparisons = [];
        console.log('🕰️ Historical Time Machine initialized');
    }

    initArchives() {
        return {
            corona: {
                name: 'CORONA Spy Satellite',
                provider: 'USGS/NRO',
                years: '1960-1972',
                resolution: '2-8m',
                accessUrl: 'https://earthexplorer.usgs.gov/',
                collection: 'Declassified Data Collection 1',
                coverage: 'Global (including Egypt)',
                note: 'Shows sites BEFORE modern development',
                downloadSteps: [
                    '1. Go to EarthExplorer',
                    '2. Dataset: Declassified > Declass 1 (1960-1972)',
                    '3. Draw AOI around target site',
                    '4. Download scanned film strips'
                ]
            },
            aerial_egypt: {
                name: 'RAF Aerial Photography',
                provider: 'Various Archives',
                years: '1940-1950s',
                coverage: 'Nile Valley, Giza, Luxor',
                sources: [
                    'Aerial Photographic Archive for Archaeology (Cambridge)',
                    'APAAME Jordan Flying Programme',
                    'Institut français d\'archéologie orientale'
                ],
                note: 'Pre-tourism development of major sites'
            },
            harvard_giza: {
                name: 'Harvard-MFA Giza Archives',
                provider: 'Harvard University',
                years: '1902-1947',
                accessUrl: 'http://giza.fas.harvard.edu/',
                content: '48,000+ photographs, maps, diaries',
                note: 'Original excavation documentation'
            },
            spy_kh7: {
                name: 'GAMBIT/HEXAGON (KH-7/KH-9)',
                provider: 'USGS/NRO',
                years: '1963-1984',
                resolution: '0.6-9m',
                accessUrl: 'https://earthexplorer.usgs.gov/',
                collection: 'Declassified Data Collection 2 & 3',
                note: 'Higher resolution than CORONA'
            }
        };
    }

    // Generate comparison data structure
    createComparison(siteId, modernData, historicalData) {
        const comparison = {
            id: `COMP-${Date.now()}`,
            siteId: siteId,
            createdAt: new Date().toISOString(),
            modern: {
                source: modernData.source || 'Sentinel-2',
                date: modernData.date,
                imageUrl: modernData.url
            },
            historical: {
                source: historicalData.source || 'CORONA',
                date: historicalData.date,
                imageUrl: historicalData.url
            },
            changes: [],
            analysis: null
        };

        this.comparisons.push(comparison);
        return comparison;
    }

    // Detect changes between epochs
    analyzeChanges(comparison) {
        // Simulated change detection results
        const changes = [
            { type: 'urban_expansion', severity: 'high', description: 'Modern development encroaching on archaeological zone' },
            { type: 'vegetation_change', severity: 'medium', description: 'Agricultural patterns differ from historical' },
            { type: 'feature_loss', severity: 'critical', description: 'Visible structures in 1965 no longer present' },
            { type: 'new_excavations', severity: 'info', description: 'Archaeological work visible in modern imagery' }
        ];

        comparison.changes = changes;
        comparison.analysis = {
            totalChanges: changes.length,
            criticalFindings: changes.filter(c => c.severity === 'critical').length,
            recommendation: changes.some(c => c.severity === 'critical')
                ? 'Historical imagery reveals features now destroyed - prioritize archive analysis'
                : 'Monitor for continued changes'
        };

        return comparison;
    }

    // Get direct download links for CORONA data
    getCoronaSearchUrl(lat, lon) {
        return `https://earthexplorer.usgs.gov/scene-search?lat=${lat}&lng=${lon}&dataset=declassifiedcollection1`;
    }

    // Generate report
    generateReport(siteId) {
        const siteComparisons = this.comparisons.filter(c => c.siteId === siteId);

        return {
            siteId: siteId,
            generatedAt: new Date().toISOString(),
            comparisonsCount: siteComparisons.length,
            historicalSources: Object.keys(this.archives),
            findings: siteComparisons.flatMap(c => c.changes),
            archives: this.archives
        };
    }

    getArchives() { return this.archives; }
}

window.HistoricalTimeMachine = HistoricalTimeMachine;
window.historicalTimeMachine = new HistoricalTimeMachine();
