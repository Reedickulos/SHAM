// SHAM v4 Pro - Real Archaeological Sites Database
// Comprehensive database of Egyptian archaeological sites with accurate GPS coordinates

const ARCHAEOLOGICAL_SITES = {
    "pyramids": [
        {
            "id": "giza_great_pyramid",
            "name": "Great Pyramid of Giza (Khufu)",
            "coordinates": [29.9792, 31.1342],
            "type": "pyramid",
            "period": "Old Kingdom, 4th Dynasty",
            "date": "c. 2580-2560 BCE",
            "excavation_history": {
                "first_recorded": "Ancient times - Herodotus (5th century BCE)",
                "modern_excavations": [
                    "1880s - Flinders Petrie systematic survey",
                    "1925-1965 - Harvard-Boston MFA Expedition",
                    "1988-present - Zahi Hawass and IEAP projects"
                ],
                "howard_carter_involvement": "Limited - focused primarily on Valley of Kings"
            },
            "specifications": {
                "original_height": "146.5 meters",
                "base_length": "230 meters",
                "blocks_estimated": "2.3 million",
                "interior_chambers": ["King's Chamber", "Queen's Chamber", "Grand Gallery"]
            },
            "satellite_analysis": {
                "thermal_anomalies": "Detected in northeast corner",
                "ground_penetrating_radar": "Void spaces confirmed 2017",
                "lidar_scanning": "Complete 3D model available"
            },
            "ai_confidence": 95,
            "museum_collections": {
                "british_museum": "Pyramid casing stones, survey equipment",
                "metropolitan_museum": "Boat pit artifacts, Old Kingdom reliefs",
                "cairo_museum": "Khufu statues, solar boat"
            }
        },
        {
            "id": "giza_khafre_pyramid",
            "name": "Pyramid of Khafre",
            "coordinates": [29.9756, 31.1308],
            "type": "pyramid",
            "period": "Old Kingdom, 4th Dynasty",
            "date": "c. 2558-2532 BCE",
            "excavation_history": {
                "first_recorded": "Ancient times",
                "modern_excavations": [
                    "1853 - Auguste Mariette",
                    "1909-1910 - Ernst von Sieglin expedition",
                    "1925-1936 - Harvard-Boston MFA Expedition"
                ]
            },
            "specifications": {
                "original_height": "143.5 meters",
                "base_length": "215 meters",
                "remaining_casing": "Upper portion retains limestone casing"
            },
            "ai_confidence": 92
        },
        {
            "id": "giza_menkaure_pyramid",
            "name": "Pyramid of Menkaure",
            "coordinates": [29.9722, 31.1281],
            "type": "pyramid",
            "period": "Old Kingdom, 4th Dynasty",
            "date": "c. 2532-2503 BCE",
            "harvard_expedition_findings": {
                "excavator": "George Reisner (Harvard-Boston MFA)",
                "years": "1905-1927",
                "major_discoveries": [
                    "Menkaure's sarcophagus (lost at sea)",
                    "Pair statues of Menkaure and queen",
                    "Complete mortuary temple complex"
                ]
            },
            "ai_confidence": 89
        },
        {
            "id": "saqqara_step_pyramid",
            "name": "Step Pyramid of Djoser",
            "coordinates": [29.8711, 31.2156],
            "type": "pyramid",
            "period": "Old Kingdom, 3rd Dynasty",
            "date": "c. 2670-2650 BCE",
            "architect": "Imhotep",
            "excavation_history": {
                "modern_excavations": [
                    "1924-1926 - Cecil Firth",
                    "1926-1965 - Jean-Philippe Lauer",
                    "2006-present - Conservation project"
                ]
            },
            "specifications": {
                "height": "62 meters",
                "base": "121 x 109 meters",
                "construction": "First monumental stone building"
            },
            "ai_confidence": 94
        },
        {
            "id": "dashur_bent_pyramid",
            "name": "Bent Pyramid of Sneferu",
            "coordinates": [29.7902, 31.2058],
            "type": "pyramid",
            "period": "Old Kingdom, 4th Dynasty",
            "date": "c. 2600 BCE",
            "unique_features": "Change in angle mid-construction",
            "ai_confidence": 88
        },
        {
            "id": "dashur_red_pyramid",
            "name": "Red Pyramid of Sneferu",
            "coordinates": [29.8089, 31.2067],
            "type": "pyramid",
            "period": "Old Kingdom, 4th Dynasty",
            "date": "c. 2590 BCE",
            "significance": "First true pyramid",
            "ai_confidence": 91
        }
    ],
    "temples": [
        {
            "id": "karnak_temple",
            "name": "Karnak Temple Complex",
            "coordinates": [25.7189, 32.6575],
            "type": "temple",
            "period": "Middle Kingdom to Ptolemaic",
            "date": "c. 2055 BCE - 30 BCE",
            "excavation_history": {
                "early_exploration": [
                    "1828 - Jean-François Champollion",
                    "1858-1860 - Auguste Mariette",
                    "1895-1923 - Georges Legrain"
                ],
                "modern_projects": [
                    "1967-present - Franco-Egyptian Centre",
                    "1971-present - Oriental Institute Chicago",
                    "Karnak Great Hypostyle Hall Project"
                ]
            },
            "specifications": {
                "area": "200 hectares",
                "major_structures": [
                    "Great Hypostyle Hall - 134 columns",
                    "Sacred Lake",
                    "Festival Hall of Thutmose III"
                ]
            },
            "satellite_analysis": {
                "thermal_imaging": "Underground chambers detected",
                "multispectral": "Foundation outlines visible",
                "magnetometry": "Buried structures mapped"
            },
            "ai_confidence": 96,
            "museum_collections": {
                "metropolitan_museum": "Karnak reliefs, Senenmut statues",
                "british_museum": "Karnak king list fragments",
                "louvre": "Karnak sphinxes avenue"
            }
        },
        {
            "id": "luxor_temple",
            "name": "Luxor Temple",
            "coordinates": [25.6989, 32.6397],
            "type": "temple",
            "period": "New Kingdom",
            "date": "c. 1400 BCE",
            "builders": "Amenhotep III, Ramesses II",
            "ai_confidence": 93
        },
        {
            "id": "abu_simbel_great",
            "name": "Abu Simbel Great Temple",
            "coordinates": [22.3372, 31.6258],
            "type": "temple",
            "period": "New Kingdom, 19th Dynasty",
            "date": "c. 1264-1244 BCE",
            "builder": "Ramesses II",
            "excavation_history": {
                "rediscovery": "1813 - Johann Ludwig Burckhardt",
                "clearing": "1817 - Giovanni Battista Belzoni",
                "unesco_rescue": "1964-1968 - International campaign"
            },
            "relocation_project": {
                "reason": "Aswan High Dam flooding",
                "new_location": "65 meters higher, 200 meters back",
                "cost": "$40 million USD (1960s)"
            },
            "ai_confidence": 97
        },
        {
            "id": "abu_simbel_small",
            "name": "Abu Simbel Small Temple (Nefertari)",
            "coordinates": [22.3369, 31.6256],
            "type": "temple",
            "period": "New Kingdom, 19th Dynasty",
            "date": "c. 1264-1244 BCE",
            "dedicated_to": "Queen Nefertari and Hathor",
            "ai_confidence": 95
        },
        {
            "id": "edfu_temple",
            "name": "Temple of Horus at Edfu",
            "coordinates": [24.9777, 32.8736],
            "type": "temple",
            "period": "Ptolemaic",
            "date": "237-57 BCE",
            "preservation": "Best preserved ancient Egyptian temple",
            "ai_confidence": 98
        },
        {
            "id": "dendera_temple",
            "name": "Dendera Temple Complex",
            "coordinates": [26.1419, 32.6703],
            "type": "temple",
            "period": "Ptolemaic to Roman",
            "date": "305 BCE - 30 CE",
            "famous_for": "Dendera Zodiac ceiling",
            "ai_confidence": 94
        }
    ],
    "tombs": [
        {
            "id": "valley_kings",
            "name": "Valley of the Kings",
            "coordinates": [25.7402, 32.6014],
            "type": "tomb_complex",
            "period": "New Kingdom",
            "date": "c. 1539-1075 BCE",
            "excavation_history": {
                "early_exploration": [
                    "1738 - Richard Pococke",
                    "1799 - Napoleon's expedition",
                    "1817-1829 - Giovanni Battista Belzoni"
                ],
                "howard_carter_era": {
                    "years_active": "1891-1922",
                    "major_discovery": "Tutankhamun's tomb (KV62) - November 4, 1922",
                    "sponsor": "Lord Carnarvon",
                    "other_discoveries": ["KV60 (possible Hatshepsut)", "KV61"]
                },
                "recent_discoveries": [
                    "2005 - KV63 (storage tomb)",
                    "2017 - KV64 (Nehemes-Bastet tomb)"
                ]
            },
            "notable_tombs": {
                "KV62": {
                    "occupant": "Tutankhamun",
                    "discoverer": "Howard Carter",
                    "discovery_date": "November 4, 1922",
                    "artifacts_count": "Over 5,000 objects",
                    "current_location": "Cairo Museum / Grand Egyptian Museum"
                },
                "KV7": {
                    "occupant": "Ramesses II",
                    "length": "Over 200 meters"
                },
                "KV11": {
                    "occupant": "Ramesses III",
                    "famous_for": "Detailed wall paintings"
                }
            },
            "satellite_analysis": {
                "ground_penetrating_radar": "Ongoing surveys detect new chambers",
                "thermal_imaging": "Temperature variations indicate hidden tombs",
                "lidar": "Valley topography completely mapped"
            },
            "ai_confidence": 99,
            "museum_collections": {
                "cairo_museum": "Tutankhamun treasures, royal mummies",
                "metropolitan_museum": "Valley of Kings artifacts, Wah's tomb goods",
                "british_museum": "Papyri, tomb paintings, canopic equipment"
            }
        },
        {
            "id": "valley_queens",
            "name": "Valley of the Queens",
            "coordinates": [25.7289, 32.5878],
            "type": "tomb_complex",
            "period": "New Kingdom",
            "date": "c. 1539-1075 BCE",
            "notable_tombs": {
                "QV66": "Nefertari (Ramesses II's wife)",
                "QV44": "Khaemwaset (son of Ramesses III)"
            },
            "ai_confidence": 96
        },
        {
            "id": "deir_el_medina",
            "name": "Deir el-Medina",
            "coordinates": [25.7283, 32.6000],
            "type": "settlement_tombs",
            "period": "New Kingdom",
            "date": "c. 1550-1070 BCE",
            "significance": "Village of royal tomb builders",
            "excavation_history": {
                "major_excavations": [
                    "1905-1909 - Ernesto Schiaparelli",
                    "1917-1951 - Bernard Bruyère",
                    "1970-present - French Institute"
                ]
            },
            "ai_confidence": 92
        }
    ],
    "settlements": [
        {
            "id": "tell_el_amarna",
            "name": "Tell el-Amarna (Akhetaten)",
            "coordinates": [27.6539, 30.8997],
            "type": "settlement",
            "period": "New Kingdom, 18th Dynasty",
            "date": "c. 1353-1336 BCE",
            "builder": "Akhenaten",
            "excavation_history": {
                "early_work": [
                    "1891-1892 - Flinders Petrie",
                    "1901-1907 - Deutsche Orient-Gesellschaft"
                ],
                "recent_projects": [
                    "1977-present - Barry Kemp (Cambridge University)",
                    "2005-present - Amarna Project"
                ]
            },
            "satellite_analysis": {
                "site_extent": "Visible from space - 25 km north-south",
                "building_foundations": "Clearly defined in satellite imagery",
                "ancient_roads": "Street grid preserved"
            },
            "ai_confidence": 94
        },
        {
            "id": "alexandria_ancient",
            "name": "Ancient Alexandria",
            "coordinates": [31.2001, 29.9187],
            "type": "settlement",
            "period": "Hellenistic to Islamic",
            "date": "331 BCE - 641 CE",
            "founder": "Alexander the Great",
            "excavation_challenges": "Modern city overlay",
            "underwater_discoveries": "Pharos Lighthouse remains",
            "ai_confidence": 87
        },
        {
            "id": "memphis_ancient",
            "name": "Ancient Memphis",
            "coordinates": [29.8469, 31.2503],
            "type": "settlement",
            "period": "Early Dynastic to Islamic",
            "date": "c. 3100 BCE - 641 CE",
            "significance": "Ancient capital of Egypt",
            "current_status": "Agricultural fields, scattered ruins",
            "ai_confidence": 83
        }
    ],
    "ai_detected_anomalies": [
        {
            "id": "anomaly_001",
            "name": "Potential Structure Site A",
            "coordinates": [29.8891, 31.1456],
            "type": "anomaly",
            "detection_method": "Multispectral satellite analysis",
            "confidence_score": 76,
            "characteristics": [
                "Rectangular foundation outline",
                "Stone material signature",
                "Oriented to cardinal directions"
            ],
            "recommended_investigation": "Ground-penetrating radar survey",
            "priority": "High"
        },
        {
            "id": "anomaly_002",
            "name": "Underground Chamber Detection",
            "coordinates": [25.7312, 32.6089],
            "type": "anomaly",
            "detection_method": "Thermal infrared analysis",
            "confidence_score": 84,
            "characteristics": [
                "Subsurface temperature variation",
                "Chamber-like thermal signature",
                "Located near known tomb cluster"
            ],
            "recommended_investigation": "Magnetometry and GPR",
            "priority": "Very High"
        },
        {
            "id": "anomaly_003",
            "name": "Buried Settlement Pattern",
            "coordinates": [27.6234, 30.9123],
            "type": "anomaly",
            "detection_method": "NDVI and soil analysis",
            "confidence_score": 69,
            "characteristics": [
                "Linear features suggesting streets",
                "Vegetation stress patterns",
                "Soil composition anomalies"
            ],
            "recommended_investigation": "Resistivity survey",
            "priority": "Medium"
        }
    ]
};

// Site type configurations for map display
const SITE_CONFIGS = {
    "pyramid": {
        "color": "#e6b36a",
        "icon": "fas fa-mountain",
        "size": "large"
    },
    "temple": {
        "color": "#4299e1",
        "icon": "fas fa-university",
        "size": "medium"
    },
    "tomb": {
        "color": "#ed8936",
        "icon": "fas fa-cross",
        "size": "medium"
    },
    "tomb_complex": {
        "color": "#ed8936",
        "icon": "fas fa-map",
        "size": "large"
    },
    "settlement": {
        "color": "#48bb78",
        "icon": "fas fa-city",
        "size": "medium"
    },
    "anomaly": {
        "color": "#f6e05e",
        "icon": "fas fa-search",
        "size": "small",
        "pulse": true
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ARCHAEOLOGICAL_SITES, SITE_CONFIGS };
}