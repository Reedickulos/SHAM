// SHAM v5 Pro - Data Harvesting Module
// Real public data sources for archaeological remote sensing

class DataHarvester {
    constructor() {
        this.harvestManifest = [];
        this.downloadQueue = [];
        this.completedDownloads = [];

        // Real public data source endpoints
        this.dataSources = this.initializeDataSources();
        this.storageConfig = {
            rootFolder: 'SHAM',
            structure: this.initializeFolderStructure()
        };

        this.initialize();
    }

    initialize() {
        console.log('📥 SHAM Data Harvester Initialized');
        console.log('🎯 Ready to pull real satellite and geophysical data');
    }

    initializeDataSources() {
        return {
            // ===== SATELLITE SAR DATA =====
            sentinel1_sar: {
                name: 'Sentinel-1 SAR (C-Band)',
                provider: 'ESA Copernicus',
                type: 'SAR',
                resolution: '10m',
                cost: 'FREE',
                accessUrl: 'https://scihub.copernicus.eu/dhus/',
                alternateUrl: 'https://browser.dataspace.copernicus.eu/',
                searchApi: 'https://catalogue.dataspace.copernicus.eu/odata/v1/',
                gizaCoverage: {
                    pathFrame: 'Track 36, Frame 477',
                    repeatCycle: '12 days',
                    estimatedDataSize: '1-5 GB per scene'
                },
                downloadInstructions: [
                    '1. Create free account at https://dataspace.copernicus.eu/',
                    '2. Navigate to Data Space Browser',
                    '3. Draw AOI around Giza (29.9792°N, 31.1342°E)',
                    '4. Filter: Mission=Sentinel-1, Product Type=GRD',
                    '5. Select date range and download .SAFE files'
                ],
                archaeologicalUse: 'Surface roughness, subsurface moisture, buried structure detection'
            },

            alos_palsar: {
                name: 'ALOS PALSAR (L-Band)',
                provider: 'JAXA',
                type: 'SAR',
                resolution: '12.5-25m',
                cost: 'FREE (archived data)',
                accessUrl: 'https://search.asf.alaska.edu/',
                penetrationDepth: 'Up to 30m in dry sand',
                gizaCoverage: {
                    note: 'Historical data 2006-2011 available',
                    estimatedDataSize: '500 MB - 2 GB per scene'
                },
                downloadInstructions: [
                    '1. Go to Alaska Satellite Facility (ASF): https://search.asf.alaska.edu/',
                    '2. Create free NASA Earthdata account',
                    '3. Search for ALOS-1 PALSAR products',
                    '4. Draw AOI around Giza',
                    '5. Download L1.1 or L1.5 products'
                ],
                archaeologicalUse: 'Deep penetration radar for buried structures in desert environments'
            },

            // ===== THERMAL INFRARED DATA =====
            landsat8_thermal: {
                name: 'Landsat 8/9 TIRS',
                provider: 'NASA/USGS',
                type: 'Thermal',
                resolution: '100m (resampled to 30m)',
                cost: 'FREE',
                accessUrl: 'https://earthexplorer.usgs.gov/',
                alternateUrl: 'https://glovis.usgs.gov/',
                bands: {
                    band10: '10.60-11.19 µm (Thermal 1)',
                    band11: '11.50-12.51 µm (Thermal 2)'
                },
                gizaCoverage: {
                    pathRow: 'Path 174, Row 39',
                    repeatCycle: '16 days',
                    estimatedDataSize: '1-2 GB per scene'
                },
                downloadInstructions: [
                    '1. Register at https://ers.cr.usgs.gov/register',
                    '2. Go to EarthExplorer: https://earthexplorer.usgs.gov/',
                    '3. Enter coordinates: 29.9792, 31.1342',
                    '4. Dataset: Landsat 8-9 C2 L2',
                    '5. Filter for clear scenes (cloud cover < 10%)',
                    '6. Order and download (free)'
                ],
                archaeologicalUse: 'Thermal inertia mapping, underground void detection via temperature anomalies'
            },

            aster_tir: {
                name: 'ASTER TIR',
                provider: 'NASA/METI',
                type: 'Thermal + Multispectral',
                resolution: '90m (TIR), 15-30m (VNIR/SWIR)',
                cost: 'FREE',
                accessUrl: 'https://search.earthdata.nasa.gov/',
                gizaCoverage: {
                    note: 'On-demand tasking + archive',
                    estimatedDataSize: '100-500 MB per scene'
                },
                downloadInstructions: [
                    '1. Register at NASA Earthdata: https://urs.earthdata.nasa.gov/',
                    '2. Search at: https://search.earthdata.nasa.gov/',
                    '3. Collection: ASTER L1T or AST_08',
                    '4. Spatial filter: Giza area',
                    '5. Download via HTTPS or Bulk Download'
                ],
                archaeologicalUse: 'Multi-band thermal for material identification, mineral composition'
            },

            // ===== SEISMIC DATA =====
            iris_seismic: {
                name: 'IRIS Global Seismic Network',
                provider: 'IRIS DMC',
                type: 'Seismic',
                dataType: 'Passive ambient noise',
                cost: 'FREE',
                accessUrl: 'https://ds.iris.edu/ds/nodes/dmc/',
                webServices: 'https://service.iris.edu/',
                nearbyStations: [
                    { code: 'KOWA', name: 'Koweir', distance: '~400km' },
                    { code: 'CSS', name: 'Cyprus', distance: '~500km' }
                ],
                downloadInstructions: [
                    '1. Use IRIS Web Services: https://service.iris.edu/',
                    '2. FDSNWS dataselect for waveform data',
                    '3. Select stations near Egypt region',
                    '4. Time window: at least 1 year for ambient noise tomography',
                    '5. Format: miniSEED'
                ],
                archaeologicalUse: 'Ambient noise tomography for subsurface velocity modeling'
            },

            // ===== GRAVITY DATA =====
            grace_gravity: {
                name: 'GRACE/GRACE-FO Gravity',
                provider: 'NASA/GFZ',
                type: 'Gravity',
                resolution: '~300km native (enhanced via modeling)',
                cost: 'FREE',
                accessUrl: 'https://grace.jpl.nasa.gov/',
                alternateUrl: 'https://podaac.jpl.nasa.gov/',
                downloadInstructions: [
                    '1. Access via PO.DAAC: https://podaac.jpl.nasa.gov/',
                    '2. Search: GRACE-FO Level-2',
                    '3. Download monthly gravity solutions',
                    '4. Use ICGEM for processed models: http://icgem.gfz-potsdam.de/'
                ],
                note: 'Low resolution - use for regional context only',
                archaeologicalUse: 'Large-scale density anomalies (limited resolution for archaeology)'
            },

            egm2008_gravity: {
                name: 'EGM2008 Gravity Model',
                provider: 'NGA',
                type: 'Gravity Model',
                resolution: '~9km',
                cost: 'FREE',
                accessUrl: 'https://earth-info.nga.mil/GandG/wgs84/gravitymod/egm2008/',
                downloadInstructions: [
                    '1. Download from NGA or ICGEM',
                    '2. Extract coefficients for Egypt region',
                    '3. Calculate gravity anomalies using spherical harmonic synthesis'
                ],
                archaeologicalUse: 'Regional gravity baseline for detecting mass anomalies'
            },

            // ===== MAGNETIC FIELD DATA =====
            emag2_magnetic: {
                name: 'EMAG2 Earth Magnetic Anomaly Grid',
                provider: 'NOAA NGDC',
                type: 'Magnetic',
                resolution: '2 arc-minute (~3.7km)',
                cost: 'FREE',
                accessUrl: 'https://www.ngdc.noaa.gov/geomag/emag2.html',
                downloadFormat: 'GeoTIFF, NetCDF',
                downloadInstructions: [
                    '1. Go to: https://www.ngdc.noaa.gov/geomag/emag2.html',
                    '2. Download global or regional grid',
                    '3. Clip to Egypt/Giza region',
                    '4. Convert to analysis format (GeoTIFF/NetCDF)'
                ],
                archaeologicalUse: 'Regional magnetic context, material identification'
            },

            // ===== OPTICAL & MULTISPECTRAL =====
            sentinel2_optical: {
                name: 'Sentinel-2 MSI',
                provider: 'ESA Copernicus',
                type: 'Optical/Multispectral',
                resolution: '10m (RGB/NIR), 20m (RedEdge/SWIR)',
                cost: 'FREE',
                accessUrl: 'https://browser.dataspace.copernicus.eu/',
                bands: '13 spectral bands',
                gizaCoverage: {
                    tile: '36RTV',
                    repeatCycle: '5 days',
                    estimatedDataSize: '800 MB - 1.2 GB per tile'
                },
                downloadInstructions: [
                    '1. Access Copernicus Data Space Browser',
                    '2. Filter: Sentinel-2, Level-2A (atmospherically corrected)',
                    '3. Cloud cover filter: < 5%',
                    '4. Select tiles covering Giza (36RTV)',
                    '5. Download JP2 files'
                ],
                archaeologicalUse: 'Crop marks, soil marks, vegetation stress analysis'
            },

            // ===== ELEVATION DATA =====
            srtm_dem: {
                name: 'SRTM Digital Elevation Model',
                provider: 'NASA/USGS',
                type: 'DEM',
                resolution: '30m (1 arc-second)',
                cost: 'FREE',
                accessUrl: 'https://earthexplorer.usgs.gov/',
                alternateUrl: 'https://dwtkns.com/srtm30m/',
                downloadInstructions: [
                    '1. EarthExplorer > SRTM 1 Arc-Second Global',
                    '2. Or use OpenTopography: https://opentopography.org/',
                    '3. Download HGT or GeoTIFF format'
                ],
                archaeologicalUse: 'Topographic context, micro-depression detection'
            },

            // ===== HISTORICAL ARCHIVES =====
            harvard_giza: {
                name: 'Harvard-MFA Giza Archives',
                provider: 'Harvard University / MFA Boston',
                type: 'Historical Photography',
                cost: 'FREE',
                accessUrl: 'http://giza.fas.harvard.edu/',
                content: '20,000+ photographs, maps, diaries from 1904-1947',
                downloadInstructions: [
                    '1. Browse: http://giza.fas.harvard.edu/',
                    '2. Search by location, date, or expedition',
                    '3. Download high-resolution images (public domain)'
                ],
                archaeologicalUse: 'Historical surface comparisons, excavation documentation'
            }
        };
    }

    initializeFolderStructure() {
        return {
            'SHAM/': {
                'SAR/': {
                    'Sentinel-1_RAW/': 'Raw .SAFE files from Copernicus',
                    'ALOS_PALSAR/': 'L-band SAR from JAXA/ASF',
                    'Processed/': 'Calibrated and filtered SAR products'
                },
                'Thermal/': {
                    'Landsat8_TIRS/': 'Landsat thermal bands',
                    'ASTER_TIR/': 'ASTER thermal products',
                    'Nighttime/': 'Pre-dawn acquisitions for optimal archaeology'
                },
                'Optical/': {
                    'Sentinel-2/': 'Multispectral imagery',
                    'VegetationIndices/': 'NDVI, SAVI calculations'
                },
                'Seismic/': {
                    'IRIS_Waveforms/': 'miniSEED waveform data',
                    'AmbientNoise/': 'Processed ambient noise tomography'
                },
                'Gravity/': {
                    'GRACE/': 'Satellite gravity data',
                    'EGM2008/': 'Gravity model grids'
                },
                'Magnetic/': {
                    'EMAG2/': 'Magnetic anomaly grids',
                    'LocalSurveys/': 'Digitized historical surveys'
                },
                'Historical/': {
                    'Harvard_MFA/': 'Giza expedition archives',
                    'Aerials/': 'Historical aerial photography'
                },
                'DEM/': {
                    'SRTM/': 'Digital elevation models'
                },
                'Manifest_And_Hashes/': {
                    'Download_Manifest.json': 'Complete download record',
                    'SHA256_Hashes.txt': 'File integrity verification',
                    'Processing_Log.json': 'All operations logged'
                }
            }
        };
    }

    // ===== DOWNLOAD MANIFEST GENERATION =====

    generateDownloadManifest(targetArea = 'giza') {
        const manifest = {
            projectName: 'SHAM - Secret History and Archaeology Mission',
            targetArea: targetArea,
            coordinates: {
                giza: { lat: 29.9792, lon: 31.1342, radius: '10km' },
                saqqara: { lat: 29.8711, lon: 31.2156, radius: '5km' },
                valleyOfKings: { lat: 25.7402, lon: 32.6014, radius: '5km' }
            },
            generatedAt: new Date().toISOString(),
            datasets: []
        };

        // Add all data sources to manifest
        Object.entries(this.dataSources).forEach(([key, source]) => {
            manifest.datasets.push({
                id: key,
                name: source.name,
                provider: source.provider,
                type: source.type,
                cost: source.cost,
                accessUrl: source.accessUrl,
                instructions: source.downloadInstructions,
                estimatedSize: source.gizaCoverage?.estimatedDataSize || 'Variable',
                archaeologicalUse: source.archaeologicalUse,
                priority: this.determineDataPriority(source.type)
            });
        });

        // Sort by priority
        manifest.datasets.sort((a, b) => a.priority - b.priority);

        return manifest;
    }

    determineDataPriority(type) {
        const priorities = {
            'SAR': 1,
            'Thermal': 2,
            'Seismic': 3,
            'Gravity': 4,
            'Magnetic': 5,
            'Optical/Multispectral': 6,
            'DEM': 7,
            'Historical Photography': 8
        };
        return priorities[type] || 10;
    }

    // ===== DOWNLOAD SCRIPT GENERATION =====

    generatePowerShellDownloadScript() {
        return `
# SHAM Data Harvest Script for Windows PowerShell
# Project: Secret History and Archaeology Mission
# Target: Giza Plateau Archaeological Data
# Generated: ${new Date().toISOString()}

# ===== CONFIGURATION =====
$SHAM_ROOT = "D:\\SHAM"  # Change to your external drive letter
$GIZA_LAT = 29.9792
$GIZA_LON = 31.1342

# Create folder structure
$folders = @(
    "$SHAM_ROOT\\SAR\\Sentinel-1_RAW",
    "$SHAM_ROOT\\SAR\\ALOS_PALSAR",
    "$SHAM_ROOT\\SAR\\Processed",
    "$SHAM_ROOT\\Thermal\\Landsat8_TIRS",
    "$SHAM_ROOT\\Thermal\\ASTER_TIR",
    "$SHAM_ROOT\\Optical\\Sentinel-2",
    "$SHAM_ROOT\\Seismic\\IRIS_Waveforms",
    "$SHAM_ROOT\\Gravity\\GRACE",
    "$SHAM_ROOT\\Gravity\\EGM2008",
    "$SHAM_ROOT\\Magnetic\\EMAG2",
    "$SHAM_ROOT\\Historical\\Harvard_MFA",
    "$SHAM_ROOT\\DEM\\SRTM",
    "$SHAM_ROOT\\Manifest_And_Hashes"
)

foreach ($folder in $folders) {
    if (!(Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force
        Write-Host "Created: $folder" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   SHAM FOLDER STRUCTURE READY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Register at: https://dataspace.copernicus.eu/ (Sentinel-1/2)" -ForegroundColor White
Write-Host "2. Register at: https://urs.earthdata.nasa.gov/ (NASA Earthdata)" -ForegroundColor White
Write-Host "3. Register at: https://ers.cr.usgs.gov/register (USGS EarthExplorer)" -ForegroundColor White
Write-Host ""
Write-Host "Download Portals:" -ForegroundColor Yellow
Write-Host "- Sentinel: https://browser.dataspace.copernicus.eu/" -ForegroundColor Cyan
Write-Host "- Landsat: https://earthexplorer.usgs.gov/" -ForegroundColor Cyan
Write-Host "- ALOS: https://search.asf.alaska.edu/" -ForegroundColor Cyan
Write-Host "- Harvard Giza: http://giza.fas.harvard.edu/" -ForegroundColor Cyan
Write-Host ""
`;
    }

    generateBatchDownloadScript() {
        return `@echo off
REM SHAM Data Harvest Script for Windows CMD
REM Project: Secret History and Archaeology Mission
REM Generated: ${new Date().toISOString()}

SET SHAM_ROOT=D:\\SHAM

echo.
echo ========================================
echo    SHAM DIRECTORY SETUP
echo ========================================
echo.

REM Create folder structure
mkdir "%SHAM_ROOT%\\SAR\\Sentinel-1_RAW" 2>nul
mkdir "%SHAM_ROOT%\\SAR\\ALOS_PALSAR" 2>nul
mkdir "%SHAM_ROOT%\\SAR\\Processed" 2>nul
mkdir "%SHAM_ROOT%\\Thermal\\Landsat8_TIRS" 2>nul
mkdir "%SHAM_ROOT%\\Thermal\\ASTER_TIR" 2>nul
mkdir "%SHAM_ROOT%\\Optical\\Sentinel-2" 2>nul
mkdir "%SHAM_ROOT%\\Seismic\\IRIS_Waveforms" 2>nul
mkdir "%SHAM_ROOT%\\Gravity" 2>nul
mkdir "%SHAM_ROOT%\\Magnetic\\EMAG2" 2>nul
mkdir "%SHAM_ROOT%\\Historical\\Harvard_MFA" 2>nul
mkdir "%SHAM_ROOT%\\DEM\\SRTM" 2>nul
mkdir "%SHAM_ROOT%\\Manifest_And_Hashes" 2>nul

echo Folder structure created at %SHAM_ROOT%
echo.
echo ========================================
echo    REGISTRATION REQUIRED
echo ========================================
echo.
echo 1. Copernicus: https://dataspace.copernicus.eu/
echo 2. NASA Earthdata: https://urs.earthdata.nasa.gov/
echo 3. USGS: https://ers.cr.usgs.gov/register
echo.
pause
`;
    }

    // ===== DATA SOURCE INFO DISPLAY =====

    getDataSourceInfo(sourceKey) {
        return this.dataSources[sourceKey] || null;
    }

    getAllDataSources() {
        return this.dataSources;
    }

    getDownloadInstructions(sourceKey) {
        const source = this.dataSources[sourceKey];
        if (!source) return null;

        return {
            name: source.name,
            url: source.accessUrl,
            instructions: source.downloadInstructions,
            archaeologicalUse: source.archaeologicalUse
        };
    }

    // ===== EXPORT FUNCTIONS =====

    exportManifestJSON() {
        const manifest = this.generateDownloadManifest();
        return JSON.stringify(manifest, null, 2);
    }

    exportFolderStructure() {
        return JSON.stringify(this.storageConfig.structure, null, 2);
    }
}

// Initialize
let dataHarvester;
document.addEventListener('DOMContentLoaded', () => {
    dataHarvester = new DataHarvester();
    window.dataHarvester = dataHarvester;
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataHarvester;
}
