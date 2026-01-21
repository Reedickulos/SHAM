// SHAM v5 Pro - Global Archaeological Sites Database
// Expandable database covering major archaeological regions worldwide

const GLOBAL_SITES_DATABASE = {
    regions: {
        egypt: {
            name: 'Ancient Egypt',
            bounds: { north: 31.5, south: 22, east: 35, west: 25 },
            sites: [
                { id: 'giza', name: 'Giza Pyramid Complex', lat: 29.9792, lon: 31.1342, type: 'pyramid', period: '2580-2510 BCE', priority: 'critical' },
                { id: 'saqqara', name: 'Saqqara Necropolis', lat: 29.8711, lon: 31.2156, type: 'necropolis', period: '2700 BCE', priority: 'critical' },
                { id: 'vok', name: 'Valley of the Kings', lat: 25.7402, lon: 32.6014, type: 'tomb_complex', period: '1539-1075 BCE', priority: 'critical' },
                { id: 'karnak', name: 'Karnak Temple', lat: 25.7189, lon: 32.6575, type: 'temple', period: '2055 BCE', priority: 'high' },
                { id: 'abusimbel', name: 'Abu Simbel', lat: 22.3372, lon: 31.6258, type: 'temple', period: '1264 BCE', priority: 'high' },
                { id: 'amarna', name: 'Tell el-Amarna', lat: 27.6539, lon: 30.8997, type: 'city', period: '1353 BCE', priority: 'high' },
                { id: 'dahshur', name: 'Dahshur', lat: 29.8086, lon: 31.2061, type: 'pyramid', period: '2613 BCE', priority: 'high' },
                { id: 'abydos', name: 'Abydos', lat: 26.1850, lon: 31.9189, type: 'temple', period: '3100 BCE', priority: 'medium' }
            ]
        },
        levant: {
            name: 'Levant & Middle East',
            bounds: { north: 37, south: 29, east: 42, west: 34 },
            sites: [
                { id: 'petra', name: 'Petra', lat: 30.3285, lon: 35.4444, type: 'city', period: '300 BCE', priority: 'critical', country: 'Jordan' },
                { id: 'gobekli', name: 'Göbekli Tepe', lat: 37.2233, lon: 38.9225, type: 'temple', period: '9500 BCE', priority: 'critical', country: 'Turkey' },
                { id: 'palmyra', name: 'Palmyra', lat: 34.5503, lon: 38.2691, type: 'city', period: '2000 BCE', priority: 'high', country: 'Syria' },
                { id: 'baalbek', name: 'Baalbek', lat: 34.0069, lon: 36.2039, type: 'temple', period: '9000 BCE', priority: 'high', country: 'Lebanon' },
                { id: 'babylon', name: 'Babylon', lat: 32.5364, lon: 44.4208, type: 'city', period: '2300 BCE', priority: 'high', country: 'Iraq' }
            ]
        },
        asia: {
            name: 'Southeast Asia',
            bounds: { north: 20, south: 8, east: 110, west: 95 },
            sites: [
                { id: 'angkor', name: 'Angkor Wat', lat: 13.4125, lon: 103.8670, type: 'temple', period: '1150 CE', priority: 'critical', country: 'Cambodia' },
                { id: 'bagan', name: 'Bagan', lat: 21.1717, lon: 94.8585, type: 'temple_complex', period: '849 CE', priority: 'high', country: 'Myanmar' },
                { id: 'borobudur', name: 'Borobudur', lat: -7.6079, lon: 110.2038, type: 'temple', period: '800 CE', priority: 'high', country: 'Indonesia' }
            ]
        },
        americas: {
            name: 'Pre-Columbian Americas',
            bounds: { north: 25, south: -15, east: -65, west: -120 },
            sites: [
                { id: 'teotihuacan', name: 'Teotihuacan', lat: 19.6925, lon: -98.8439, type: 'city', period: '100 BCE', priority: 'critical', country: 'Mexico' },
                { id: 'chichenitza', name: 'Chichen Itza', lat: 20.6843, lon: -88.5678, type: 'city', period: '600 CE', priority: 'critical', country: 'Mexico' },
                { id: 'machupicchu', name: 'Machu Picchu', lat: -13.1631, lon: -72.5450, type: 'city', period: '1450 CE', priority: 'critical', country: 'Peru' },
                { id: 'nazca', name: 'Nazca Lines', lat: -14.7350, lon: -75.1300, type: 'geoglyph', period: '500 BCE', priority: 'high', country: 'Peru' },
                { id: 'tikal', name: 'Tikal', lat: 17.2220, lon: -89.6237, type: 'city', period: '400 BCE', priority: 'high', country: 'Guatemala' }
            ]
        },
        europe: {
            name: 'Ancient Europe',
            bounds: { north: 60, south: 35, east: 30, west: -10 },
            sites: [
                { id: 'stonehenge', name: 'Stonehenge', lat: 51.1789, lon: -1.8262, type: 'monument', period: '3000 BCE', priority: 'critical', country: 'UK' },
                { id: 'pompeii', name: 'Pompeii', lat: 40.7508, lon: 14.4869, type: 'city', period: '600 BCE', priority: 'critical', country: 'Italy' },
                { id: 'knossos', name: 'Knossos', lat: 35.2979, lon: 25.1625, type: 'palace', period: '2000 BCE', priority: 'high', country: 'Greece' },
                { id: 'newgrange', name: 'Newgrange', lat: 53.6947, lon: -6.4756, type: 'tomb', period: '3200 BCE', priority: 'high', country: 'Ireland' }
            ]
        },
        mysteries: {
            name: 'Unexplained & Anomalous',
            sites: [
                { id: 'richat', name: 'Richat Structure', lat: 21.1244, lon: -11.4019, type: 'geological_anomaly', period: 'Unknown', priority: 'research', country: 'Mauritania', note: 'Proposed Atlantis location' },
                { id: 'yonaguni', name: 'Yonaguni Monument', lat: 24.4350, lon: 123.0100, type: 'submerged_structure', period: '10000 BCE?', priority: 'research', country: 'Japan', note: 'Underwater megalithic structures' },
                { id: 'gunung_padang', name: 'Gunung Padang', lat: -6.9942, lon: 107.0564, type: 'pyramid', period: '20000 BCE?', priority: 'research', country: 'Indonesia', note: 'Potentially oldest pyramid' },
                { id: 'bosnian_pyramids', name: 'Bosnian Pyramids', lat: 43.9769, lon: 18.1761, type: 'pyramid', period: 'Disputed', priority: 'research', country: 'Bosnia', note: 'Controversial discovery' }
            ]
        }
    },

    getSitesByRegion(regionId) {
        return this.regions[regionId]?.sites || [];
    },

    getSiteById(siteId) {
        for (const region of Object.values(this.regions)) {
            const site = region.sites?.find(s => s.id === siteId);
            if (site) return { ...site, region: region.name };
        }
        return null;
    },

    searchSites(query) {
        const results = [];
        const q = query.toLowerCase();
        for (const [regionId, region] of Object.entries(this.regions)) {
            region.sites?.forEach(site => {
                if (site.name.toLowerCase().includes(q) || site.type.includes(q)) {
                    results.push({ ...site, region: regionId });
                }
            });
        }
        return results;
    },

    getAllSites() {
        const all = [];
        Object.values(this.regions).forEach(r => all.push(...(r.sites || [])));
        return all;
    },

    getStats() {
        let total = 0;
        const byType = {};
        Object.values(this.regions).forEach(r => {
            r.sites?.forEach(s => {
                total++;
                byType[s.type] = (byType[s.type] || 0) + 1;
            });
        });
        return { totalSites: total, byType, regions: Object.keys(this.regions).length };
    }
};

window.GLOBAL_SITES_DATABASE = GLOBAL_SITES_DATABASE;
