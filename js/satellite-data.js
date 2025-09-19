// SHAM v4 Pro - Real Satellite Data and Sensor Specifications
// Comprehensive database of satellite sensors and archaeological remote sensing data

const SATELLITE_SENSORS = {
    "landsat_8": {
        "name": "Landsat 8 (OLI/TIRS)",
        "operator": "NASA/USGS",
        "launch_date": "February 11, 2013",
        "orbital_characteristics": {
            "altitude": "705 km",
            "inclination": "98.2°",
            "repeat_cycle": "16 days"
        },
        "spectral_bands": {
            "band_1": {
                "name": "Coastal/Aerosol",
                "wavelength": "0.43-0.45 μm",
                "resolution": "30m",
                "archaeological_use": "Coastal site detection, atmospheric correction"
            },
            "band_2": {
                "name": "Blue",
                "wavelength": "0.45-0.51 μm",
                "resolution": "30m",
                "archaeological_use": "Water body mapping, shallow burial detection"
            },
            "band_3": {
                "name": "Green",
                "wavelength": "0.53-0.59 μm",
                "resolution": "30m",
                "archaeological_use": "Vegetation health, crop mark analysis"
            },
            "band_4": {
                "name": "Red",
                "wavelength": "0.64-0.67 μm",
                "resolution": "30m",
                "archaeological_use": "Vegetation stress, soil marks"
            },
            "band_5": {
                "name": "Near Infrared",
                "wavelength": "0.85-0.88 μm",
                "resolution": "30m",
                "archaeological_use": "Vegetation analysis, crop marks, buried features"
            },
            "band_6": {
                "name": "Short-wave Infrared 1",
                "wavelength": "1.57-1.65 μm",
                "resolution": "30m",
                "archaeological_use": "Moisture content, mineral identification"
            },
            "band_7": {
                "name": "Short-wave Infrared 2",
                "wavelength": "2.11-2.29 μm",
                "resolution": "30m",
                "archaeological_use": "Rock/mineral discrimination, soil moisture"
            },
            "band_8": {
                "name": "Panchromatic",
                "wavelength": "0.50-0.68 μm",
                "resolution": "15m",
                "archaeological_use": "High-resolution structural detection"
            },
            "band_10": {
                "name": "Thermal Infrared 1",
                "wavelength": "10.60-11.19 μm",
                "resolution": "100m",
                "archaeological_use": "Thermal anomaly detection, buried structure mapping"
            },
            "band_11": {
                "name": "Thermal Infrared 2",
                "wavelength": "11.50-12.51 μm",
                "resolution": "100m",
                "archaeological_use": "Surface temperature, thermal inertia mapping"
            }
        },
        "archaeological_applications": [
            "Large-scale site prospection",
            "Environmental monitoring",
            "Temporal change detection",
            "Regional landscape analysis"
        ],
        "data_availability": "Free through USGS Earth Explorer",
        "coverage_egypt": "Complete coverage every 16 days"
    },
    "sentinel_2": {
        "name": "Sentinel-2A/2B",
        "operator": "ESA (European Space Agency)",
        "launch_dates": ["June 23, 2015", "March 7, 2017"],
        "orbital_characteristics": {
            "altitude": "786 km",
            "inclination": "98.62°",
            "repeat_cycle": "5 days (combined constellation)"
        },
        "spectral_bands": {
            "band_1": {
                "name": "Coastal aerosol",
                "wavelength": "0.443 μm",
                "resolution": "60m",
                "archaeological_use": "Atmospheric correction"
            },
            "band_2": {
                "name": "Blue",
                "wavelength": "0.490 μm",
                "resolution": "10m",
                "archaeological_use": "High-resolution feature detection"
            },
            "band_3": {
                "name": "Green",
                "wavelength": "0.560 μm",
                "resolution": "10m",
                "archaeological_use": "Vegetation monitoring, crop marks"
            },
            "band_4": {
                "name": "Red",
                "wavelength": "0.665 μm",
                "resolution": "10m",
                "archaeological_use": "Vegetation stress, soil exposure"
            },
            "band_5": {
                "name": "Red Edge 1",
                "wavelength": "0.705 μm",
                "resolution": "20m",
                "archaeological_use": "Vegetation health assessment"
            },
            "band_6": {
                "name": "Red Edge 2",
                "wavelength": "0.740 μm",
                "resolution": "20m",
                "archaeological_use": "Chlorophyll content analysis"
            },
            "band_7": {
                "name": "Red Edge 3",
                "wavelength": "0.783 μm",
                "resolution": "20m",
                "archaeological_use": "Vegetation stress detection"
            },
            "band_8": {
                "name": "Near Infrared",
                "wavelength": "0.842 μm",
                "resolution": "10m",
                "archaeological_use": "Primary archaeological prospection band"
            },
            "band_8A": {
                "name": "Narrow NIR",
                "wavelength": "0.865 μm",
                "resolution": "20m",
                "archaeological_use": "Refined vegetation analysis"
            },
            "band_9": {
                "name": "Water vapour",
                "wavelength": "0.945 μm",
                "resolution": "60m",
                "archaeological_use": "Atmospheric correction"
            },
            "band_11": {
                "name": "SWIR 1",
                "wavelength": "1.610 μm",
                "resolution": "20m",
                "archaeological_use": "Soil moisture, mineral detection"
            },
            "band_12": {
                "name": "SWIR 2",
                "wavelength": "2.190 μm",
                "resolution": "20m",
                "archaeological_use": "Clay mineral mapping, soil analysis"
            }
        },
        "archaeological_applications": [
            "High-resolution site mapping",
            "Detailed crop mark analysis",
            "Rapid change detection",
            "Multi-temporal monitoring"
        ],
        "data_availability": "Free through Copernicus Open Access Hub",
        "coverage_egypt": "Complete coverage every 5 days"
    },
    "worldview_3": {
        "name": "WorldView-3",
        "operator": "Maxar Technologies (formerly DigitalGlobe)",
        "launch_date": "August 13, 2014",
        "orbital_characteristics": {
            "altitude": "617 km",
            "inclination": "97.2°",
            "repeat_cycle": "1-4.5 days"
        },
        "spectral_bands": {
            "panchromatic": {
                "wavelength": "0.45-0.80 μm",
                "resolution": "0.31m",
                "archaeological_use": "Ultra-high resolution structure mapping"
            },
            "multispectral": {
                "coastal": {
                    "wavelength": "0.40-0.45 μm",
                    "resolution": "1.24m",
                    "archaeological_use": "Shallow water archaeology"
                },
                "blue": {
                    "wavelength": "0.45-0.51 μm",
                    "resolution": "1.24m",
                    "archaeological_use": "Fine-scale feature detection"
                },
                "green": {
                    "wavelength": "0.51-0.58 μm",
                    "resolution": "1.24m",
                    "archaeological_use": "Detailed vegetation analysis"
                },
                "yellow": {
                    "wavelength": "0.585-0.625 μm",
                    "resolution": "1.24m",
                    "archaeological_use": "Soil composition analysis"
                },
                "red": {
                    "wavelength": "0.63-0.69 μm",
                    "resolution": "1.24m",
                    "archaeological_use": "Vegetation stress, exposed archaeology"
                },
                "red_edge": {
                    "wavelength": "0.705-0.745 μm",
                    "resolution": "1.24m",
                    "archaeological_use": "Precise vegetation health"
                },
                "nir1": {
                    "wavelength": "0.77-0.895 μm",
                    "resolution": "1.24m",
                    "archaeological_use": "Primary archaeological detection"
                },
                "nir2": {
                    "wavelength": "0.86-1.04 μm",
                    "resolution": "1.24m",
                    "archaeological_use": "Enhanced subsurface detection"
                }
            },
            "shortwave_infrared": {
                "swir1": {
                    "wavelength": "1.195-1.225 μm",
                    "resolution": "3.7m",
                    "archaeological_use": "Mineral identification"
                },
                "swir2": {
                    "wavelength": "1.550-1.590 μm",
                    "resolution": "3.7m",
                    "archaeological_use": "Clay mineral mapping"
                },
                "swir3": {
                    "wavelength": "1.640-1.680 μm",
                    "resolution": "3.7m",
                    "archaeological_use": "Soil moisture analysis"
                },
                "swir4": {
                    "wavelength": "1.710-1.750 μm",
                    "resolution": "3.7m",
                    "archaeological_use": "Rock type discrimination"
                },
                "swir5": {
                    "wavelength": "2.145-2.185 μm",
                    "resolution": "3.7m",
                    "archaeological_use": "Advanced mineral mapping"
                },
                "swir6": {
                    "wavelength": "2.185-2.225 μm",
                    "resolution": "3.7m",
                    "archaeological_use": "Carbonate detection"
                },
                "swir7": {
                    "wavelength": "2.235-2.285 μm",
                    "resolution": "3.7m",
                    "archaeological_use": "Clay and carbonate mapping"
                },
                "swir8": {
                    "wavelength": "2.295-2.365 μm",
                    "resolution": "3.7m",
                    "archaeological_use": "Detailed mineral analysis"
                }
            }
        },
        "archaeological_applications": [
            "Individual building detection",
            "Micro-topographic mapping",
            "Detailed site documentation",
            "Precision excavation planning"
        ],
        "data_availability": "Commercial - high cost",
        "coverage_egypt": "Tasked acquisitions available"
    }
};

// Real archaeological site spectral signatures
const SPECTRAL_SIGNATURES = {
    "limestone_blocks": {
        "visible": {
            "reflectance_curve": [0.35, 0.42, 0.48, 0.52],
            "characteristic": "High reflectance, white-grey appearance"
        },
        "near_infrared": {
            "reflectance": 0.55,
            "characteristic": "Consistent high reflectance"
        },
        "shortwave_infrared": {
            "reflectance_1600nm": 0.48,
            "reflectance_2200nm": 0.52,
            "absorption_features": ["1900nm carbonate", "2300nm carbonate"]
        },
        "thermal_infrared": {
            "emissivity": 0.92,
            "thermal_inertia": "High - slow temperature change"
        }
    },
    "sandstone_blocks": {
        "visible": {
            "reflectance_curve": [0.28, 0.35, 0.42, 0.45],
            "characteristic": "Moderate reflectance, tan-brown"
        },
        "near_infrared": {
            "reflectance": 0.48,
            "characteristic": "Iron oxide absorption"
        },
        "shortwave_infrared": {
            "reflectance_1600nm": 0.38,
            "reflectance_2200nm": 0.35,
            "absorption_features": ["2200nm clay minerals"]
        }
    },
    "buried_walls": {
        "crop_marks": {
            "growing_season": "Spring (March-May)",
            "spectral_difference": "5-15% reduction in NIR reflectance",
            "visible_effect": "Stunted growth, yellowing"
        },
        "soil_marks": {
            "dry_season": "Summer (June-September)",
            "spectral_difference": "Darker appearance in visible bands",
            "moisture_retention": "Higher soil moisture over buried features"
        }
    },
    "excavated_areas": {
        "exposed_soil": {
            "reflectance_pattern": "Lower overall reflectance",
            "texture": "Rougher surface, more shadows"
        },
        "spoil_heaps": {
            "spectral_signature": "Mixed soil and rock fragments",
            "geometric_pattern": "Linear or mounded formations"
        }
    }
};

// Satellite coverage and acquisition data for Egypt
const EGYPT_SATELLITE_COVERAGE = {
    "landsat_8": {
        "path_row_coverage": [
            {"path": 174, "row": 38, "covers": "Northern Delta"},
            {"path": 174, "row": 39, "covers": "Cairo, Giza Pyramids"},
            {"path": 174, "row": 40, "covers": "Fayum, Meidum"},
            {"path": 175, "row": 40, "covers": "Eastern Desert"},
            {"path": 175, "row": 41, "covers": "Red Sea Coast"},
            {"path": 174, "row": 41, "covers": "Middle Egypt"},
            {"path": 174, "row": 42, "covers": "Abydos, Dendera"},
            {"path": 174, "row": 43, "covers": "Luxor, Valley of Kings"},
            {"path": 174, "row": 44, "covers": "Edfu, Kom Ombo"},
            {"path": 174, "row": 45, "covers": "Aswan, Abu Simbel"}
        ],
        "cloud_coverage": {
            "annual_average": "5%",
            "best_months": ["October", "November", "December", "January", "February"]
        },
        "acquisition_frequency": "Every 16 days",
        "data_volume_egypt": "~2.5 GB per scene"
    },
    "sentinel_2": {
        "tile_coverage": [
            {"tile": "36RUU", "covers": "Alexandria, Nile Delta"},
            {"tile": "36RTV", "covers": "Cairo, Giza, Saqqara"},
            {"tile": "36RUV", "covers": "Eastern Desert"},
            {"tile": "36QWF", "covers": "Fayum Depression"},
            {"tile": "36QWG", "covers": "Middle Egypt"},
            {"tile": "36QVG", "covers": "Western Desert"},
            {"tile": "36QVH", "covers": "Abydos region"},
            {"tile": "36QWH", "covers": "Luxor, Karnak, Valley of Kings"},
            {"tile": "36QWJ", "covers": "Edfu, Kom Ombo"},
            {"tile": "36QWK", "covers": "Aswan, Philae"}
        ],
        "acquisition_frequency": "Every 5 days (combined constellation)",
        "data_volume_egypt": "~1.2 GB per tile"
    }
};

// Archaeological remote sensing processing workflows
const PROCESSING_WORKFLOWS = {
    "crop_mark_detection": {
        "optimal_timing": "Late spring (April-May)",
        "required_bands": ["Red", "NIR", "SWIR1"],
        "vegetation_indices": {
            "NDVI": "(NIR - Red) / (NIR + Red)",
            "SAVI": "((NIR - Red) / (NIR + Red + 0.5)) * 1.5",
            "MSAVI": "0.5 * (2*NIR + 1 - sqrt((2*NIR + 1)^2 - 8*(NIR - Red)))"
        },
        "threshold_values": {
            "healthy_vegetation": "NDVI > 0.3",
            "stressed_vegetation": "NDVI 0.1-0.3",
            "bare_soil": "NDVI < 0.1"
        }
    },
    "soil_mark_detection": {
        "optimal_timing": "Late summer (August-September)",
        "required_bands": ["Blue", "Green", "Red", "NIR"],
        "analysis_methods": [
            "Principal Component Analysis (PCA)",
            "Minimum Noise Fraction (MNF)",
            "Independent Component Analysis (ICA)"
        ],
        "moisture_indices": {
            "NDMI": "(NIR - SWIR1) / (NIR + SWIR1)",
            "MNDWI": "(Green - SWIR1) / (Green + SWIR1)"
        }
    },
    "thermal_anomaly_detection": {
        "acquisition_time": "Pre-dawn (thermal infrared)",
        "processing_steps": [
            "Atmospheric correction",
            "Land surface temperature derivation",
            "Background temperature modeling",
            "Anomaly threshold calculation"
        ],
        "typical_anomalies": {
            "buried_stone": "+2-5°C temperature difference",
            "underground_chambers": "-1-3°C temperature difference",
            "moisture_retention": "-2-4°C temperature difference"
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SATELLITE_SENSORS,
        SPECTRAL_SIGNATURES,
        EGYPT_SATELLITE_COVERAGE,
        PROCESSING_WORKFLOWS
    };
}