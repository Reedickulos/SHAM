// SHAM v5 Pro - Satellite Alert System
// Real-time monitoring for new imagery

class SatelliteAlerts {
    constructor() {
        this.watchAreas = [];
        this.alerts = [];
        this.checkInterval = null;
        this.lastCheck = null;

        // Sentinel-1/2 typical revisit times
        this.revisitTimes = {
            sentinel1: 6, // days
            sentinel2: 5,
            landsat: 16
        };

        console.log('🛰️ Satellite Alert System initialized');
    }

    // Add area to watch list
    addWatchArea(name, bounds, sensors = ['sentinel1', 'sentinel2']) {
        const area = {
            id: `WATCH-${Date.now()}`,
            name: name,
            bounds: bounds, // { north, south, east, west }
            sensors: sensors,
            addedAt: new Date().toISOString(),
            lastImagery: {},
            alertsCount: 0
        };

        this.watchAreas.push(area);
        console.log(`📍 Watching: ${name}`);
        return area;
    }

    // Remove watch area
    removeWatchArea(areaId) {
        this.watchAreas = this.watchAreas.filter(a => a.id !== areaId);
    }

    // Start automated monitoring
    startMonitoring(intervalMinutes = 60) {
        if (this.checkInterval) return;

        this.checkInterval = setInterval(() => {
            this.checkForNewImagery();
        }, intervalMinutes * 60 * 1000);

        // Initial check
        this.checkForNewImagery();
        console.log(`🔄 Monitoring started (checking every ${intervalMinutes} min)`);
    }

    stopMonitoring() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        }
    }

    // Check for new imagery across all watch areas
    async checkForNewImagery() {
        this.lastCheck = new Date().toISOString();

        for (const area of this.watchAreas) {
            for (const sensor of area.sensors) {
                const newImagery = await this.queryNewImagery(area, sensor);

                if (newImagery.length > 0) {
                    this.createAlert(area, sensor, newImagery);
                }
            }
        }
    }

    // Query for new imagery (simulated - would connect to real APIs)
    async queryNewImagery(area, sensor) {
        // Simulate API query delay
        await new Promise(r => setTimeout(r, 100));

        // Calculate if new imagery is expected
        const lastImage = area.lastImagery[sensor];
        const daysSinceLastImage = lastImage
            ? (Date.now() - new Date(lastImage).getTime()) / (1000 * 60 * 60 * 24)
            : 999;

        const revisitTime = this.revisitTimes[sensor] || 10;

        // Simulate new imagery availability
        if (daysSinceLastImage >= revisitTime || Math.random() > 0.8) {
            area.lastImagery[sensor] = new Date().toISOString();

            return [{
                id: `IMG-${Date.now()}`,
                sensor: sensor,
                acquisitionTime: new Date().toISOString(),
                cloudCover: Math.floor(Math.random() * 30),
                bounds: area.bounds,
                downloadUrl: this.getDownloadUrl(sensor, area.bounds)
            }];
        }

        return [];
    }

    getDownloadUrl(sensor, bounds) {
        const urlTemplates = {
            sentinel1: `https://browser.dataspace.copernicus.eu/?bbox=${bounds.west},${bounds.south},${bounds.east},${bounds.north}`,
            sentinel2: `https://browser.dataspace.copernicus.eu/?bbox=${bounds.west},${bounds.south},${bounds.east},${bounds.north}`,
            landsat: `https://earthexplorer.usgs.gov/?bbox=${bounds.west},${bounds.south},${bounds.east},${bounds.north}`
        };
        return urlTemplates[sensor] || '';
    }

    // Create alert for new imagery
    createAlert(area, sensor, imagery) {
        const alert = {
            id: `ALERT-${Date.now()}`,
            areaId: area.id,
            areaName: area.name,
            sensor: sensor,
            imagery: imagery,
            timestamp: new Date().toISOString(),
            acknowledged: false,
            priority: this.calculatePriority(area, imagery)
        };

        this.alerts.push(alert);
        area.alertsCount++;

        // Trigger notification
        this.notify(alert);

        return alert;
    }

    calculatePriority(area, imagery) {
        // Lower cloud cover = higher priority
        const avgCloud = imagery.reduce((sum, i) => sum + i.cloudCover, 0) / imagery.length;
        if (avgCloud < 5) return 'critical';
        if (avgCloud < 15) return 'high';
        if (avgCloud < 30) return 'medium';
        return 'low';
    }

    notify(alert) {
        console.log(`🚨 NEW IMAGERY: ${alert.areaName} (${alert.sensor})`);

        // Browser notification
        if (Notification.permission === 'granted') {
            new Notification('SHAM Satellite Alert', {
                body: `New ${alert.sensor.toUpperCase()} imagery for ${alert.areaName}`,
                icon: '🛰️'
            });
        }

        // Dispatch custom event for UI
        window.dispatchEvent(new CustomEvent('sham-satellite-alert', { detail: alert }));
    }

    // Acknowledge alert
    acknowledgeAlert(alertId) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (alert) alert.acknowledged = true;
    }

    // Get unacknowledged alerts
    getNewAlerts() {
        return this.alerts.filter(a => !a.acknowledged);
    }

    // Get all alerts
    getAllAlerts() { return this.alerts; }

    // Get watch areas
    getWatchAreas() { return this.watchAreas; }

    // Request notification permission
    async requestNotificationPermission() {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        }
        return false;
    }
}

window.SatelliteAlerts = SatelliteAlerts;
window.satelliteAlerts = new SatelliteAlerts();

// Auto-add Giza to watch list
document.addEventListener('DOMContentLoaded', () => {
    if (window.satelliteAlerts) {
        satelliteAlerts.addWatchArea('Giza Plateau', {
            north: 30.05, south: 29.90, east: 31.20, west: 31.05
        });
        satelliteAlerts.addWatchArea('Valley of the Kings', {
            north: 25.78, south: 25.70, east: 32.65, west: 32.55
        });
    }
});
