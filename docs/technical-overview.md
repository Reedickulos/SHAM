# SHAM Technical Overview

## Architecture
**SHAM v4 Pro** is a Progressive Web Application (PWA) built with:
- **Frontend**: Vue.js 3 with Composition API
- **Mapping**: Leaflet.js with custom archaeological layers
- **Styling**: TailwindCSS for responsive design
- **Data**: CSV-based datasets with Papa Parse
- **AI**: Client-side machine learning predictions
- **Offline**: Service Worker for field deployment

## Key Modalities
- **VIS**: Visible Spectrum (RGB imagery)
- **NIR**: Near Infrared (vegetation, water detection)
- **SWIR**: Short-Wave Infrared (mineralogy, moisture)
- **TIR**: Thermal Infrared (heat loss, buried voids)
- **RAD**: Radar (SAR, InSAR for surface deformation)
- **GRAV**: Gravity anomalies (subsurface mass differences)
- **MAG**: Magnetics (archaeological soils, bedrock)
- **ARCH**: Archaeological records (maps, excavation notes)
- **ENV**: Environmental (hydrology, erosion, vegetation cover)
- **SOC**: Sociohistorical overlays (ancient texts, site use)

## Implementation Status
- ✅ Core application structure (PDFs 1-6)
- ✅ Supporting datasets (6 CSV files)
- 🔄 Code extraction and organization
- 🔄 Data integration pipeline
- 🔄 Collaborative development setup

## Deployment
PWA-ready for offline field use with service worker caching.
