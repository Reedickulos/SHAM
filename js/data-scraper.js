// SHAM v5 Pro - Multi-Source Data Scraper
// Automated satellite and geophysical data harvesting

class SHAMDataScraper {
    constructor() {
        this.apis = this.initializeAPIs();
        this.downloadQueue = [];
        this.completedDownloads = [];
        this.scrapeLog = [];
        this.rateLimits = {
            copernicus: { requestsPerMinute: 10, current: 0 },
            usgs: { requestsPerMinute: 5, current: 0 },
            nasa: { requestsPerMinute: 10, current: 0 }
        };
        
        console.log('🕷️ SHAM Data Scraper Initialized');
    }

    initializeAPIs() {
        return {
            // ===== COPERNICUS DATA SPACE (Sentinel-1/2) =====
            copernicus: {
                name: 'Copernicus Data Space',
                baseUrl: 'https://catalogue.dataspace.copernicus.eu/odata/v1/',
                tokenUrl: 'https://identity.dataspace.copernicus.eu/auth/realms/CDSE/protocol/openid-connect/token',
                downloadUrl: 'https://zipper.dataspace.copernicus.eu/odata/v1/',
                collections: {
                    sentinel1_grd: 'SENTINEL-1',
                    sentinel2_l2a: 'SENTINEL-2'
                },
                authRequired: true,
                requiresRegistration: 'https://dataspace.copernicus.eu/',
                searchEndpoint: (collection, bbox, startDate, endDate) => {
                    return `Products?$filter=Collection/Name eq '${collection}' and OData.CSC.Intersects(area=geography'SRID=4326;POLYGON((${bbox}))') and ContentDate/Start gt ${startDate}T00:00:00.000Z and ContentDate/Start lt ${endDate}T23:59:59.999Z&$orderby=ContentDate/Start desc&$top=50`;
                }
            },
            
            // ===== USGS EARTH EXPLORER (Landsat) =====
            usgs: {
                name: 'USGS Earth Explorer',
                baseUrl: 'https://m2m.cr.usgs.gov/api/api/json/stable/',
                loginEndpoint: 'login',
                searchEndpoint: 'scene-search',
                downloadEndpoint: 'download-request',
                datasets: {
                    landsat8_c2_l2: 'landsat_ot_c2_l2',
                    landsat9_c2_l2: 'landsat_ot_c2_l2'
                },
                authRequired: true,
                requiresRegistration: 'https://ers.cr.usgs.gov/register'
            },
            
            // ===== NASA EARTHDATA (ASTER, GRACE) =====
            nasa: {
                name: 'NASA Earthdata',
                baseUrl: 'https://cmr.earthdata.nasa.gov/search/',
                granuleEndpoint: 'granules.json',
                collections: {
                    aster_l1t: 'C1299783579-LPDAAC_ECS',
                    aster_gdem: 'C1711961296-LPCLOUD',
                    grace_fo: 'C1648038187-POCLOUD'
                },
                authRequired: true,
                requiresRegistration: 'https://urs.earthdata.nasa.gov/'
            },
            
            // ===== ALASKA SATELLITE FACILITY (ALOS PALSAR) =====
            asf: {
                name: 'Alaska Satellite Facility',
                baseUrl: 'https://api.daac.asf.alaska.edu/',
                searchEndpoint: 'services/search/param',
                datasets: {
                    alos_palsar: 'ALOS',
                    sentinel1: 'SENTINEL-1'
                },
                authRequired: true,
                requiresRegistration: 'https://urs.earthdata.nasa.gov/'
            },
            
            // ===== IRIS SEISMIC =====
            iris: {
                name: 'IRIS DMC',
                baseUrl: 'https://service.iris.edu/',
                fdsnws: 'fdsnws/dataselect/1/query',
                stationEndpoint: 'fdsnws/station/1/query',
                authRequired: false,
                format: 'miniseed'
            },
            
            // ===== NOAA MAGNETIC =====
            noaa: {
                name: 'NOAA NCEI',
                emag2Url: 'https://www.ngdc.noaa.gov/geomag/data/EMAG2/',
                downloadFiles: [
                    'EMAG2_V3_20170530.tif',
                    'EMAG2_V3_20170530_MF.tif'
                ],
                authRequired: false
            },
            
            // ===== OPEN TOPOGRAPHY (DEM) =====
            openTopo: {
                name: 'OpenTopography',
                baseUrl: 'https://portal.opentopography.org/API/',
                srtmEndpoint: 'globaldem',
                demTypes: ['SRTMGL1', 'SRTMGL3', 'AW3D30'],
                authRequired: true,
                apiKeyUrl: 'https://portal.opentopography.org/requestService'
            }
        };
    }

    // ===== SEARCH FUNCTIONS =====
    
    async searchCopernicus(collection, bbox, startDate, endDate, credentials) {
        this.log(`Searching Copernicus ${collection}...`, 'search');
        
        const query = this.apis.copernicus.searchEndpoint(collection, bbox, startDate, endDate);
        const url = this.apis.copernicus.baseUrl + query;
        
        try {
            // Get access token first
            const token = await this.getCopernicusToken(credentials);
            
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            const products = data.value || [];
            
            this.log(`Found ${products.length} products`, 'success');
            
            return products.map(p => ({
                id: p.Id,
                name: p.Name,
                date: p.ContentDate?.Start,
                size: p.ContentLength,
                downloadUrl: `${this.apis.copernicus.downloadUrl}Products(${p.Id})/$value`,
                collection: collection
            }));
        } catch (error) {
            this.log(`Copernicus search failed: ${error.message}`, 'error');
            return [];
        }
    }
    
    async getCopernicusToken(credentials) {
        const response = await fetch(this.apis.copernicus.tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'password',
                username: credentials.username,
                password: credentials.password,
                client_id: 'cdse-public'
            })
        });
        
        if (!response.ok) throw new Error('Authentication failed');
        
        const data = await response.json();
        return data.access_token;
    }
    
    async searchUSGS(dataset, bbox, startDate, endDate, apiKey) {
        this.log(`Searching USGS ${dataset}...`, 'search');
        
        const url = this.apis.usgs.baseUrl + this.apis.usgs.searchEndpoint;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': apiKey
                },
                body: JSON.stringify({
                    datasetName: dataset,
                    spatialFilter: {
                        filterType: 'mbr',
                        lowerLeft: { latitude: bbox.south, longitude: bbox.west },
                        upperRight: { latitude: bbox.north, longitude: bbox.east }
                    },
                    temporalFilter: {
                        startDate: startDate,
                        endDate: endDate
                    },
                    maxResults: 50
                })
            });
            
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            const scenes = data.data?.results || [];
            
            this.log(`Found ${scenes.length} scenes`, 'success');
            
            return scenes.map(s => ({
                id: s.entityId,
                name: s.displayId,
                date: s.acquisitionDate,
                cloudCover: s.cloudCover,
                browseUrl: s.browse?.[0]?.browsePath
            }));
        } catch (error) {
            this.log(`USGS search failed: ${error.message}`, 'error');
            return [];
        }
    }
    
    async searchNASA(collectionId, bbox, startDate, endDate) {
        this.log(`Searching NASA Earthdata...`, 'search');
        
        const url = `${this.apis.nasa.baseUrl}${this.apis.nasa.granuleEndpoint}`;
        
        try {
            const params = new URLSearchParams({
                collection_concept_id: collectionId,
                bounding_box: `${bbox.west},${bbox.south},${bbox.east},${bbox.north}`,
                temporal: `${startDate},${endDate}`,
                page_size: 50
            });
            
            const response = await fetch(`${url}?${params}`);
            
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            const granules = data.feed?.entry || [];
            
            this.log(`Found ${granules.length} granules`, 'success');
            
            return granules.map(g => ({
                id: g.id,
                title: g.title,
                time: g.time_start,
                links: g.links?.filter(l => l.rel === 'http://esipfed.org/ns/fedsearch/1.1/data#')
            }));
        } catch (error) {
            this.log(`NASA search failed: ${error.message}`, 'error');
            return [];
        }
    }
    
    async searchASF(platform, bbox, startDate, endDate) {
        this.log(`Searching ASF ${platform}...`, 'search');
        
        const url = this.apis.asf.baseUrl + this.apis.asf.searchEndpoint;
        
        try {
            const params = new URLSearchParams({
                platform: platform,
                bbox: `${bbox.west},${bbox.south},${bbox.east},${bbox.north}`,
                start: startDate,
                end: endDate,
                output: 'json',
                maxResults: 50
            });
            
            const response = await fetch(`${url}?${params}`);
            
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            
            this.log(`Found ${data.length || 0} products`, 'success');
            
            return data;
        } catch (error) {
            this.log(`ASF search failed: ${error.message}`, 'error');
            return [];
        }
    }
    
    // ===== SEISMIC DATA (IRIS) =====
    
    async searchIRISStations(lat, lon, radius = 500) {
        this.log(`Searching IRIS stations near ${lat}, ${lon}...`, 'search');
        
        const url = `${this.apis.iris.baseUrl}${this.apis.iris.stationEndpoint}`;
        
        try {
            const params = new URLSearchParams({
                latitude: lat,
                longitude: lon,
                maxradius: radius / 111, // Convert km to degrees
                format: 'text',
                level: 'station'
            });
            
            const response = await fetch(`${url}?${params}`);
            
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const text = await response.text();
            const lines = text.split('\n').filter(l => l && !l.startsWith('#'));
            
            this.log(`Found ${lines.length} stations`, 'success');
            
            return lines.map(line => {
                const parts = line.split('|');
                return {
                    network: parts[0],
                    station: parts[1],
                    latitude: parseFloat(parts[2]),
                    longitude: parseFloat(parts[3]),
                    elevation: parseFloat(parts[4]),
                    siteName: parts[5]
                };
            });
        } catch (error) {
            this.log(`IRIS search failed: ${error.message}`, 'error');
            return [];
        }
    }
    
    buildIRISDataUrl(network, station, startDate, endDate) {
        const params = new URLSearchParams({
            net: network,
            sta: station,
            loc: '*',
            cha: 'BH*',
            start: startDate,
            end: endDate,
            format: 'miniseed'
        });
        
        return `${this.apis.iris.baseUrl}${this.apis.iris.fdsnws}?${params}`;
    }
    
    // ===== BATCH OPERATIONS =====
    
    async searchAllSources(targetArea, dateRange) {
        const bbox = this.getTargetBbox(targetArea);
        const results = {
            timestamp: new Date().toISOString(),
            targetArea: targetArea,
            dateRange: dateRange,
            sources: {}
        };
        
        this.log(`Starting comprehensive search for ${targetArea}...`, 'batch');
        
        // Search each source (these would need credentials in production)
        results.sources.sentinel1 = {
            source: 'Copernicus',
            note: 'Requires authentication',
            searchUrl: this.buildSearchUrl('copernicus', 'SENTINEL-1', bbox, dateRange)
        };
        
        results.sources.landsat = {
            source: 'USGS',
            note: 'Requires authentication',
            searchUrl: this.buildSearchUrl('usgs', 'landsat', bbox, dateRange)
        };
        
        results.sources.aster = {
            source: 'NASA Earthdata',
            note: 'Requires authentication',
            searchUrl: this.buildSearchUrl('nasa', 'aster', bbox, dateRange)
        };
        
        // IRIS doesn't require auth
        results.sources.seismic = await this.searchIRISStations(
            (bbox.north + bbox.south) / 2,
            (bbox.east + bbox.west) / 2,
            500
        );
        
        this.log('Comprehensive search complete', 'success');
        
        return results;
    }
    
    getTargetBbox(targetArea) {
        const areas = {
            giza: { north: 30.05, south: 29.90, east: 31.20, west: 31.05 },
            saqqara: { north: 29.92, south: 29.82, east: 31.25, west: 31.18 },
            valleyOfKings: { north: 25.78, south: 25.70, east: 32.65, west: 32.55 },
            karnak: { north: 25.75, south: 25.68, east: 32.70, west: 32.62 },
            abuSimbel: { north: 22.38, south: 22.30, east: 31.68, west: 31.58 },
            egypt: { north: 31.5, south: 22.0, east: 35.0, west: 25.0 }
        };
        
        return areas[targetArea] || areas.giza;
    }
    
    buildSearchUrl(source, collection, bbox, dateRange) {
        const apis = this.apis;
        
        switch(source) {
            case 'copernicus':
                const bboxStr = `${bbox.west} ${bbox.south}, ${bbox.east} ${bbox.south}, ${bbox.east} ${bbox.north}, ${bbox.west} ${bbox.north}, ${bbox.west} ${bbox.south}`;
                return `${apis.copernicus.baseUrl}Products?$filter=Collection/Name eq '${collection}' and OData.CSC.Intersects(area=geography'SRID=4326;POLYGON((${bboxStr}))')&$top=20`;
            
            case 'usgs':
                return `https://earthexplorer.usgs.gov/scene-search?bbox=${bbox.west},${bbox.south},${bbox.east},${bbox.north}`;
            
            case 'nasa':
                return `https://search.earthdata.nasa.gov/search?q=ASTER&sb[0]=${bbox.west},${bbox.south},${bbox.east},${bbox.north}`;
            
            default:
                return '';
        }
    }
    
    // ===== DOWNLOAD QUEUE MANAGEMENT =====
    
    addToQueue(item) {
        this.downloadQueue.push({
            ...item,
            status: 'pending',
            addedAt: new Date().toISOString()
        });
        this.log(`Added to queue: ${item.name}`, 'queue');
    }
    
    async processQueue(credentials) {
        this.log(`Processing ${this.downloadQueue.length} items...`, 'batch');
        
        for (const item of this.downloadQueue) {
            if (item.status === 'pending') {
                try {
                    item.status = 'downloading';
                    this.log(`Downloading: ${item.name}`, 'download');
                    
                    // In production, this would actually download the file
                    // For now, we simulate with a delay
                    await new Promise(r => setTimeout(r, 500));
                    
                    item.status = 'complete';
                    item.completedAt = new Date().toISOString();
                    this.completedDownloads.push(item);
                    
                    this.log(`Complete: ${item.name}`, 'success');
                } catch (error) {
                    item.status = 'failed';
                    item.error = error.message;
                    this.log(`Failed: ${item.name} - ${error.message}`, 'error');
                }
            }
            
            // Rate limiting
            await new Promise(r => setTimeout(r, 1000));
        }
        
        this.log('Queue processing complete', 'success');
    }
    
    // ===== DOWNLOAD MANIFEST GENERATOR =====
    
    generateWgetManifest(searchResults) {
        let manifest = `# SHAM Data Download Manifest
# Generated: ${new Date().toISOString()}
# Target: Giza Plateau Archaeological Analysis
# 
# INSTRUCTIONS:
# 1. Install wget: https://eternallybored.org/misc/wget/
# 2. Set your credentials as environment variables
# 3. Run: wget -i manifest.txt -P ./SHAM/
#
# ==================================================

`;
        
        Object.entries(searchResults.sources).forEach(([source, data]) => {
            manifest += `# === ${source.toUpperCase()} ===\n`;
            
            if (Array.isArray(data)) {
                data.forEach(item => {
                    if (item.downloadUrl) {
                        manifest += `${item.downloadUrl}\n`;
                    }
                });
            } else if (data.searchUrl) {
                manifest += `# Manual download required: ${data.searchUrl}\n`;
            }
            
            manifest += '\n';
        });
        
        return manifest;
    }
    
    generatePowerShellScript(searchResults) {
        return `
# SHAM Automated Data Scraper - PowerShell Version
# Generated: ${new Date().toISOString()}

param(
    [string]$ShamRoot = "D:\\SHAM",
    [string]$CopernicusUser = "",
    [string]$CopernicusPass = "",
    [string]$NasaToken = ""
)

# Create directory structure
$folders = @(
    "$ShamRoot\\SAR\\Sentinel-1",
    "$ShamRoot\\SAR\\ALOS",
    "$ShamRoot\\Thermal\\Landsat",
    "$ShamRoot\\Thermal\\ASTER",
    "$ShamRoot\\Seismic\\IRIS",
    "$ShamRoot\\Gravity",
    "$ShamRoot\\Magnetic",
    "$ShamRoot\\Logs"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Path $folder -Force | Out-Null
}

Write-Host "SHAM Data Scraper initialized" -ForegroundColor Green

# Function to get Copernicus token
function Get-CopernicusToken {
    param($User, $Pass)
    
    $body = @{
        grant_type = "password"
        username = $User
        password = $Pass
        client_id = "cdse-public"
    }
    
    $response = Invoke-RestMethod -Uri "https://identity.dataspace.copernicus.eu/auth/realms/CDSE/protocol/openid-connect/token" -Method Post -Body $body
    return $response.access_token
}

# Function to search Copernicus
function Search-Copernicus {
    param($Token, $Collection, $Bbox)
    
    $url = "https://catalogue.dataspace.copernicus.eu/odata/v1/Products?\$filter=Collection/Name eq '$Collection'&\$top=20"
    
    $headers = @{
        "Authorization" = "Bearer $Token"
    }
    
    $response = Invoke-RestMethod -Uri $url -Headers $headers
    return $response.value
}

# Main execution
if ($CopernicusUser -and $CopernicusPass) {
    Write-Host "Authenticating with Copernicus..." -ForegroundColor Yellow
    $token = Get-CopernicusToken -User $CopernicusUser -Pass $CopernicusPass
    
    Write-Host "Searching for Sentinel-1 data..." -ForegroundColor Yellow
    $sentinel1 = Search-Copernicus -Token $token -Collection "SENTINEL-1" -Bbox "31.05,29.90,31.20,30.05"
    
    Write-Host "Found $($sentinel1.Count) Sentinel-1 products" -ForegroundColor Green
    
    # Download each product
    foreach ($product in $sentinel1) {
        $downloadUrl = "https://zipper.dataspace.copernicus.eu/odata/v1/Products($($product.Id))/\$value"
        $outputFile = "$ShamRoot\\SAR\\Sentinel-1\\$($product.Name).zip"
        
        Write-Host "Downloading: $($product.Name)" -ForegroundColor Cyan
        
        Invoke-WebRequest -Uri $downloadUrl -OutFile $outputFile -Headers @{"Authorization"="Bearer $token"}
    }
}

Write-Host "Download complete!" -ForegroundColor Green
`;
    }
    
    // ===== LOGGING =====
    
    log(message, type = 'info') {
        const entry = {
            timestamp: new Date().toISOString(),
            type: type,
            message: message
        };
        this.scrapeLog.push(entry);
        console.log(`[SCRAPER:${type.toUpperCase()}] ${message}`);
    }
    
    // ===== EXPORT =====
    
    exportLog() {
        return JSON.stringify(this.scrapeLog, null, 2);
    }
    
    exportQueueStatus() {
        return {
            pending: this.downloadQueue.filter(i => i.status === 'pending').length,
            downloading: this.downloadQueue.filter(i => i.status === 'downloading').length,
            complete: this.completedDownloads.length,
            failed: this.downloadQueue.filter(i => i.status === 'failed').length,
            items: this.downloadQueue
        };
    }
}

// Initialize global scraper
let dataScraper;
document.addEventListener('DOMContentLoaded', () => {
    dataScraper = new SHAMDataScraper();
    window.dataScraper = dataScraper;
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SHAMDataScraper;
}
