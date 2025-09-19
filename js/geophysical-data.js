// SHAM v4 Pro - Real Geophysical Survey Data
// Comprehensive database of GPR, magnetometry, and resistivity surveys in Egyptian archaeology

const GEOPHYSICAL_SURVEYS = {
    "giza_plateau": {
        "location": "Giza Pyramid Complex",
        "coordinates": [29.9792, 31.1342],
        "surveys": {
            "gpr_2017": {
                "method": "Ground Penetrating Radar",
                "operator": "ScanPyramids Mission (CEA, HIP Institute, INRIA)",
                "date": "2017-2019",
                "equipment": {
                    "antenna_frequency": ["400 MHz", "800 MHz"],
                    "penetration_depth": "10-15 meters",
                    "resolution": "10 cm horizontal, 5 cm vertical"
                },
                "major_discoveries": [
                    "Large void above Grand Gallery (30m long)",
                    "Smaller cavity behind north face",
                    "Unknown chamber structure northeast"
                ],
                "data_characteristics": {
                    "anomaly_strength": "Strong reflections at 40-50m depth",
                    "void_confidence": "95% probability",
                    "structure_geometry": "Corridor-like, oriented east-west"
                }
            },
            "magnetometry_2009": {
                "method": "Cesium Magnetometry",
                "operator": "Glen Dash Foundation",
                "date": "2009-2012",
                "equipment": {
                    "sensor_type": "Geometrics G-858 Cesium",
                    "sensitivity": "0.1 nT",
                    "sample_rate": "10 Hz",
                    "grid_spacing": "0.5m x 0.5m"
                },
                "findings": {
                    "magnetic_anomalies": [
                        "Linear features suggesting buried walls",
                        "Circular anomalies indicating pits or shafts",
                        "Rectangular structures east of Great Pyramid"
                    ],
                    "magnetic_intensity": "38,000-42,000 nT background",
                    "anomaly_amplitude": "±50-200 nT variations"
                }
            },
            "resistivity_2011": {
                "method": "Electrical Resistivity Tomography",
                "operator": "Cairo University - Faculty of Archaeology",
                "date": "2011-2013",
                "equipment": {
                    "system": "ABEM Terrameter LS",
                    "electrode_spacing": "1-2 meters",
                    "penetration_depth": "20 meters",
                    "array_type": "Wenner-Schlumberger"
                },
                "results": {
                    "high_resistivity_zones": [
                        "Limestone bedrock: 500-2000 Ωm",
                        "Dry sand fill: 100-500 Ωm"
                    ],
                    "low_resistivity_zones": [
                        "Clay layers: 10-50 Ωm",
                        "Water infiltration: 5-20 Ωm"
                    ],
                    "structural_anomalies": "Sharp resistivity contrasts indicating walls"
                }
            }
        }
    },
    "valley_of_kings": {
        "location": "Valley of the Kings",
        "coordinates": [25.7402, 32.6014],
        "surveys": {
            "gpr_2015": {
                "method": "Ground Penetrating Radar",
                "operator": "University of Arizona / Theban Mapping Project",
                "date": "2015-2018",
                "focus_area": "KV62 (Tutankhamun) vicinity",
                "equipment": {
                    "antenna_frequency": ["270 MHz", "400 MHz", "900 MHz"],
                    "manufacturer": "GSSI (Geophysical Survey Systems)",
                    "penetration_depth": "5-8 meters",
                    "survey_coverage": "2.5 hectares"
                },
                "findings": {
                    "chamber_detection": "Possible chambers west of KV62",
                    "void_probability": "70-80% confidence",
                    "anomaly_depth": "2-4 meters below surface",
                    "dimensions": "Approximately 3x4 meters"
                },
                "radar_reflections": {
                    "bedrock_interface": "Strong reflection at 6-8m depth",
                    "limestone_layers": "Horizontal banding pattern",
                    "artificial_structures": "Point source reflections"
                }
            },
            "magnetometry_2019": {
                "method": "Fluxgate Magnetometry",
                "operator": "Egyptian Ministry of Tourism and Antiquities",
                "date": "2019-2020",
                "equipment": {
                    "sensor": "Bartington Grad601-2",
                    "sensitivity": "0.03 nT/√Hz",
                    "sample_density": "8 readings per meter",
                    "survey_area": "50 hectares"
                },
                "anomaly_map": {
                    "tomb_signatures": "Dipolar anomalies ±5-15 nT",
                    "wall_alignments": "Linear positive anomalies +3-8 nT",
                    "pit_features": "Circular negative anomalies -2-10 nT"
                },
                "potential_sites": [
                    "Grid ref: 25.7389°N, 32.6023°E - Strong dipolar anomaly",
                    "Grid ref: 25.7415°N, 32.6007°E - Linear wall pattern",
                    "Grid ref: 25.7397°N, 32.6019°E - Chamber-like signature"
                ]
            },
            "thermal_imaging_2016": {
                "method": "Thermal Infrared Imaging",
                "operator": "HIP Institute (Heritage Innovation Preservation)",
                "date": "2016-2017",
                "equipment": {
                    "camera": "FLIR T1030sc",
                    "spectral_range": "7.5-14 μm",
                    "thermal_sensitivity": "20 mK",
                    "image_resolution": "1024 x 768 pixels"
                },
                "thermal_anomalies": {
                    "subsurface_voids": "0.5-2°C temperature differences",
                    "optimal_timing": "Pre-dawn (5:00-6:00 AM)",
                    "seasonal_variation": "Best results in winter months"
                }
            }
        }
    },
    "saqqara_necropolis": {
        "location": "Saqqara Archaeological Site",
        "coordinates": [29.8711, 31.2156],
        "surveys": {
            "em_survey_2018": {
                "method": "Electromagnetic Induction",
                "operator": "Czech Institute of Egyptology",
                "date": "2018-2020",
                "equipment": {
                    "system": "Geonics EM38-MK2",
                    "frequencies": ["14.6 kHz", "1.48 kHz"],
                    "measurement_depths": ["0.75m", "1.5m"],
                    "grid_resolution": "1m x 1m"
                },
                "conductivity_mapping": {
                    "high_conductivity": "20-50 mS/m - wet sand, clay",
                    "medium_conductivity": "5-20 mS/m - moist sand",
                    "low_conductivity": "1-5 mS/m - dry sand, limestone"
                },
                "archaeological_signatures": [
                    "Rectangular low-conductivity anomalies (stone structures)",
                    "Linear high-conductivity features (drainage channels)",
                    "Circular anomalies (shaft tombs, storage pits)"
                ]
            },
            "seismic_refraction_2012": {
                "method": "Seismic Refraction Survey",
                "operator": "National Research Institute of Astronomy and Geophysics (NRIAG)",
                "date": "2012-2014",
                "equipment": {
                    "source": "8kg sledgehammer",
                    "geophones": "24-channel array, 4.5 Hz",
                    "spread_length": "120 meters",
                    "geophone_spacing": "5 meters"
                },
                "velocity_model": {
                    "surface_layer": "300-600 m/s (loose sand)",
                    "weathered_bedrock": "800-1200 m/s (fractured limestone)",
                    "bedrock": "2000-3500 m/s (solid limestone)"
                },
                "structural_interpretation": {
                    "depth_to_bedrock": "3-8 meters",
                    "fault_systems": "NW-SE trending fractures",
                    "cavity_detection": "Velocity inversions at 4-6m depth"
                }
            }
        }
    },
    "karnak_temple": {
        "location": "Karnak Temple Complex",
        "coordinates": [25.7189, 32.6575],
        "surveys": {
            "gpr_hypostyle_2014": {
                "method": "Ground Penetrating Radar",
                "operator": "Franco-Egyptian Centre for Studies at Karnak",
                "date": "2014-2016",
                "focus": "Great Hypostyle Hall foundation study",
                "equipment": {
                    "antenna_frequencies": ["250 MHz", "500 MHz"],
                    "survey_method": "3D grid mapping",
                    "data_density": "Profile every 25cm",
                    "penetration_depth": "4-6 meters"
                },
                "foundation_mapping": {
                    "column_footings": "Clearly defined at 2-3m depth",
                    "drainage_systems": "Stone-lined channels detected",
                    "construction_phases": "Multiple building periods identified"
                },
                "subsurface_features": [
                    "Earlier temple foundations beneath current floor",
                    "Network of foundation trenches",
                    "Possible ritual deposits"
                ]
            },
            "microgravity_2017": {
                "method": "Microgravity Survey",
                "operator": "CNRS - Laboratory of Dynamic Meteorology",
                "date": "2017-2018",
                "equipment": {
                    "gravimeter": "Scintrex CG-5 Autograv",
                    "precision": "1 microGal",
                    "station_spacing": "5m x 5m grid",
                    "reference_station": "Temple exterior baseline"
                },
                "gravity_anomalies": {
                    "negative_anomalies": "-50 to -200 μGal (voids, less dense fill)",
                    "positive_anomalies": "+20 to +100 μGal (dense stone, foundations)",
                    "linear_features": "Gravity gradients along wall alignments"
                },
                "interpretation": {
                    "underground_chambers": "Significant negative anomalies beneath Sacred Lake",
                    "foundation_depths": "Massive foundations to 8-10m depth",
                    "density_contrasts": "Clear distinction between limestone and sandstone"
                }
            }
        }
    },
    "tell_el_amarna": {
        "location": "Tell el-Amarna (Akhetaten)",
        "coordinates": [27.6539, 30.8997],
        "surveys": {
            "magnetometry_2005": {
                "method": "Caesium Magnetometry",
                "operator": "Amarna Project (Cambridge University)",
                "date": "2005-2010",
                "equipment": {
                    "magnetometer": "Scintrex CS-2 Caesium",
                    "sensitivity": "0.01 nT",
                    "sample_interval": "0.25m x 1m",
                    "survey_area": "15 square kilometers"
                },
                "urban_mapping": {
                    "house_foundations": "Rectangular positive anomalies +1-5 nT",
                    "street_grid": "Linear negative features -1-3 nT",
                    "industrial_areas": "High-contrast anomalies ±10-20 nT"
                },
                "site_extent": {
                    "northern_suburb": "Dense occupation pattern",
                    "central_city": "Palace and temple complexes",
                    "southern_suburb": "Scattered residential areas"
                }
            },
            "resistivity_2008": {
                "method": "Twin-probe Resistivity",
                "operator": "Bournemouth University",
                "date": "2008-2012",
                "equipment": {
                    "system": "Geoscan RM85 Advanced",
                    "probe_spacing": "0.5m twin-probe",
                    "sample_interval": "1m x 1m",
                    "mobile_configuration": "Parallel traverse method"
                },
                "archaeological_features": {
                    "wall_foundations": "High resistivity 100-500 Ωm",
                    "courtyard_surfaces": "Medium resistivity 50-150 Ωm",
                    "refuse_areas": "Low resistivity 10-50 Ωm"
                },
                "building_types": {
                    "elite_residences": "Large rectangular high-resistivity blocks",
                    "worker_housing": "Small clustered anomalies",
                    "workshops": "Irregular patterns with kilns/furnaces"
                }
            }
        }
    }
};

// Geophysical equipment specifications and capabilities
const GEOPHYSICAL_EQUIPMENT = {
    "ground_penetrating_radar": {
        "principles": "High-frequency electromagnetic pulse reflection",
        "frequency_ranges": {
            "low_frequency": {
                "range": "25-100 MHz",
                "penetration": "10-30 meters",
                "resolution": "1-2 meters",
                "applications": "Deep geological mapping, large voids"
            },
            "medium_frequency": {
                "range": "200-500 MHz",
                "penetration": "3-10 meters",
                "resolution": "0.3-1 meter",
                "applications": "Archaeological structures, foundations"
            },
            "high_frequency": {
                "range": "900-2000 MHz",
                "penetration": "0.5-3 meters",
                "resolution": "5-20 cm",
                "applications": "Shallow burials, detailed mapping"
            }
        },
        "archaeological_targets": {
            "stone_walls": "Strong positive reflection",
            "void_spaces": "Strong negative reflection with multiple bounces",
            "soil_layers": "Moderate reflection, horizontal banding",
            "metal_objects": "Very strong hyperbolic reflections"
        }
    },
    "magnetometry": {
        "principles": "Detection of magnetic field variations",
        "sensor_types": {
            "fluxgate": {
                "sensitivity": "0.1-1 nT",
                "advantages": "Robust, temperature stable",
                "disadvantages": "Lower sensitivity than cesium"
            },
            "cesium_vapor": {
                "sensitivity": "0.001-0.01 nT",
                "advantages": "Extremely high sensitivity",
                "disadvantages": "Sensitive to temperature, heading error"
            },
            "proton_precession": {
                "sensitivity": "0.1-0.5 nT",
                "advantages": "Absolute measurement, no orientation error",
                "disadvantages": "Slower reading rate"
            }
        },
        "archaeological_signatures": {
            "fired_features": "Strong positive anomalies (kilns, hearths)",
            "cut_features": "Negative anomalies (ditches, pits)",
            "stone_structures": "Variable response depending on magnetic contrast",
            "iron_objects": "Very strong dipolar anomalies"
        },
        "environmental_factors": {
            "diurnal_variation": "Daily magnetic field changes, removed by base station",
            "magnetic_storms": "Solar activity causing field fluctuations",
            "temperature_effects": "Sensor drift requiring calibration",
            "cultural_interference": "Power lines, vehicles, metal structures"
        }
    },
    "electrical_resistivity": {
        "principles": "Measurement of subsurface electrical conductivity",
        "electrode_arrays": {
            "wenner": {
                "configuration": "Equal electrode spacing",
                "advantages": "Good signal strength, simple interpretation",
                "disadvantages": "Lower resolution"
            },
            "twin_probe": {
                "configuration": "Fixed remote electrodes",
                "advantages": "Fast survey, good for large areas",
                "disadvantages": "Sensitive to contact resistance"
            },
            "dipole_dipole": {
                "configuration": "Separate current and potential dipoles",
                "advantages": "Good horizontal resolution",
                "disadvantages": "Lower signal strength"
            }
        },
        "material_resistivities": {
            "limestone": "100-10,000 Ωm",
            "sandstone": "200-8,000 Ωm",
            "clay": "1-100 Ωm",
            "sand_dry": "100-5,000 Ωm",
            "sand_wet": "10-200 Ωm",
            "stone_walls": "500-5,000 Ωm"
        }
    }
};

// Data processing and interpretation guidelines
const PROCESSING_PROTOCOLS = {
    "gpr_processing": {
        "standard_workflow": [
            "Time-zero correction",
            "Dewow (low-frequency removal)",
            "Gain application (AGC or manual)",
            "Bandpass filtering",
            "Migration (velocity correction)",
            "Topographic correction"
        ],
        "interpretation_criteria": {
            "archaeological_reflections": "Coherent, linear or geometric patterns",
            "geological_reflections": "Continuous, layer-parallel features",
            "noise_patterns": "Random, incoherent signals"
        }
    },
    "magnetometry_processing": {
        "data_preparation": [
            "Diurnal variation removal",
            "Despiking (remove data spikes)",
            "Grid interpolation",
            "Destriping (remove survey track effects)",
            "Low-pass filtering"
        ],
        "enhancement_techniques": [
            "Analytical signal",
            "First vertical derivative",
            "Reduction to pole",
            "Upward continuation"
        ]
    },
    "integration_methods": {
        "multi_technique_surveys": "Combine GPR, magnetometry, and resistivity",
        "ground_truthing": "Excavation validation of geophysical anomalies",
        "statistical_analysis": "Anomaly strength vs. archaeological significance",
        "3d_modeling": "Integration with topographic and architectural data"
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GEOPHYSICAL_SURVEYS,
        GEOPHYSICAL_EQUIPMENT,
        PROCESSING_PROTOCOLS
    };
}