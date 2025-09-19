// SHAM v4 Pro - Museum Collections and API Integration
// Real museum collections data from major institutions

const MUSEUM_COLLECTIONS = {
    "metropolitan_museum": {
        "institution": "The Metropolitan Museum of Art",
        "location": "New York, USA",
        "api_endpoint": "https://collectionapi.metmuseum.org/public/collection/v1",
        "egyptian_collection": {
            "total_objects": "26,000+",
            "digitized_percentage": "85%",
            "notable_collections": [
                "Temple of Dendur (complete temple, 15 BCE)",
                "Meketre Models (Middle Kingdom tomb models)",
                "Canopic equipment from Lisht",
                "Jewelry of Princess Sithathoryunet"
            ]
        },
        "archaeological_expeditions": {
            "mma_egyptian_expedition": {
                "active_period": "1906-1936",
                "directors": ["Albert Lythgoe", "Herbert Winlock", "Ambrose Lansing"],
                "major_sites": [
                    "Lisht (Middle Kingdom pyramid complexes)",
                    "Deir el-Bahri (Hatshepsut and Mentuhotep temples)",
                    "Malqata (Amenhotep III palace)",
                    "Valley of Kings (various tombs)"
                ],
                "significant_discoveries": {
                    "tomb_of_wah": {
                        "date": "1920",
                        "location": "Deir el-Bahri",
                        "significance": "Best preserved Middle Kingdom burial",
                        "mma_accession": "20.3.1-52"
                    },
                    "meketre_tomb": {
                        "date": "1919-1920",
                        "location": "Deir el-Bahri (TT280)",
                        "artifacts": "24 detailed wooden models",
                        "period": "11th Dynasty (c. 2000 BCE)"
                    }
                }
            }
        },
        "digital_resources": {
            "open_access": "400,000+ images freely available",
            "api_features": [
                "Object search by keyword, date, culture",
                "High-resolution image downloads",
                "Detailed provenance information",
                "Exhibition history"
            ],
            "search_parameters": {
                "department": "Egyptian Art (10)",
                "geographic_location": "Egypt",
                "object_types": ["Sculpture", "Relief", "Jewelry", "Furniture", "Papyrus"]
            }
        },
        "sample_objects": {
            "temple_of_dendur": {
                "object_id": "544504",
                "title": "Temple of Dendur",
                "period": "Roman Period",
                "date": "Completed by 10 B.C.",
                "medium": "Aeolian sandstone",
                "provenance": "Dendur, Egypt",
                "acquisition": "Given to the United States by Egypt in 1965"
            },
            "coffinette_of_tutankhamun": {
                "object_id": "544711",
                "title": "Coffinette for Viscera of Tutankhamun",
                "period": "New Kingdom",
                "date": "Dynasty 18, reign of Tutankhamun (ca. 1336–1327 B.C.)",
                "medium": "Gold, carnelian, colored glass",
                "provenance": "Valley of the Kings, Tomb of Tutankhamun (KV 62)"
            }
        }
    },
    "british_museum": {
        "institution": "The British Museum",
        "location": "London, UK",
        "api_endpoint": "https://www.britishmuseum.org/api",
        "egyptian_collection": {
            "total_objects": "100,000+",
            "famous_pieces": [
                "Rosetta Stone (196 BCE)",
                "Colossal granite head of Amenhotep III",
                "Papyrus of Ani (Book of the Dead)",
                "Mummy of Katebet"
            ],
            "departments": [
                "Department of Egypt and Sudan",
                "Department of Greek and Roman Antiquities"
            ]
        },
        "acquisition_history": {
            "early_collectors": [
                "Sir Hans Sloane (founding collection, 1753)",
                "Henry Salt (British Consul-General, 1815-1827)",
                "Giovanni Belzoni (explorer, 1815-1819)"
            ],
            "major_expeditions": {
                "egypt_exploration_society": {
                    "partnership": "1882-present",
                    "sites": ["Tell el-Amarna", "Deir el-Medina", "Saqqara"],
                    "publications": "Egypt Exploration Society memoirs"
                },
                "griffith_institute": {
                    "affiliation": "Oxford University",
                    "focus": "Tutankhamun archive, hieroglyphic texts",
                    "digital_collections": "Howard Carter photographs and notes"
                }
            }
        },
        "research_resources": {
            "online_collection": "2+ million objects searchable",
            "research_tools": [
                "Portable Antiquities Scheme database",
                "Digital learning resources",
                "Virtual reality experiences"
            ],
            "scholarly_access": {
                "study_rooms": "By appointment for researchers",
                "imaging_services": "High-resolution photography",
                "conservation_records": "Treatment histories available"
            }
        },
        "sample_objects": {
            "rosetta_stone": {
                "registration": "EA 24",
                "discovery_date": "1799",
                "discoverer": "Pierre-François Bouchard (Napoleon's expedition)",
                "languages": ["Hieroglyphic", "Demotic", "Ancient Greek"],
                "significance": "Key to deciphering hieroglyphs"
            },
            "younger_memnon": {
                "registration": "EA 19",
                "description": "Colossal bust of Ramesses II",
                "provenance": "Ramesseum, Thebes",
                "acquired": "1816 by Giovanni Belzoni",
                "weight": "7.25 tons"
            }
        }
    },
    "cairo_museum": {
        "institution": "Egyptian Museum, Cairo",
        "location": "Cairo, Egypt",
        "founded": "1902",
        "collection_size": "120,000+ objects",
        "major_collections": {
            "tutankhamun_treasures": {
                "total_objects": "5,398 items",
                "discovery": "Howard Carter, 1922-1931",
                "categories": [
                    "Golden funerary mask",
                    "Nested coffins (3 anthropoid sarcophagi)",
                    "Golden throne",
                    "Jewelry and amulets",
                    "Furniture and personal items",
                    "Chariots and weapons"
                ],
                "future_home": "Grand Egyptian Museum (2024)"
            },
            "royal_mummies": {
                "cache_discoveries": [
                    "Deir el-Bahri Cache (DB320) - 1881",
                    "Valley of Kings Cache (KV35) - 1898"
                ],
                "notable_mummies": [
                    "Ramesses II",
                    "Hatshepsut",
                    "Thutmose III",
                    "Seti I",
                    "Amenhotep II"
                ],
                "current_location": "National Museum of Egyptian Civilization"
            },
            "old_kingdom_statuary": {
                "highlight": "Djoser statue from Step Pyramid",
                "rahotep_nofret": "Pair statues from Meidum",
                "ka_aper": "Sheikh el-Balad statue"
            }
        },
        "digitization_project": {
            "status": "In progress",
            "partners": ["Google Arts & Culture", "Factum Foundation"],
            "online_percentage": "15% (as of 2023)",
            "3d_scanning": "High-priority objects"
        }
    },
    "louvre": {
        "institution": "Musée du Louvre",
        "location": "Paris, France",
        "department": "Egyptian Antiquities Department",
        "collection_origins": {
            "napoleonic_expedition": {
                "date": "1798-1801",
                "key_figures": ["Dominique Vivant Denon", "Commission des Sciences et des Arts"],
                "acquisitions": "Foundation of the collection"
            },
            "champollion_mission": {
                "date": "1828-1829",
                "leader": "Jean-François Champollion",
                "focus": "Systematic collection for Louvre"
            }
        },
        "notable_objects": {
            "great_sphinx_of_tanis": {
                "material": "Pink granite",
                "period": "Middle Kingdom, reused by Ramesses II",
                "dimensions": "Length: 4.8m, Height: 1.8m"
            },
            "seated_scribe": {
                "period": "Old Kingdom, 5th Dynasty",
                "material": "Painted limestone",
                "provenance": "Saqqara"
            },
            "crypts_of_osiris": {
                "description": "Underground galleries",
                "recreation": "Faithful reproduction in Louvre basement",
                "original_location": "Dendera Temple"
            }
        },
        "research_facilities": {
            "c2rmf": "Centre de recherche et de restauration des musées de France",
            "analytical_techniques": [
                "X-ray fluorescence spectroscopy",
                "Infrared reflectography",
                "3D laser scanning"
            ]
        }
    },
    "grand_egyptian_museum": {
        "institution": "Grand Egyptian Museum (GEM)",
        "location": "Giza, Egypt",
        "status": "Opening 2024",
        "area": "120,000 square meters",
        "capacity": "100,000 artifacts",
        "special_features": {
            "tutankhamun_galleries": "Complete collection displayed together",
            "conservation_center": "State-of-the-art facilities",
            "view_of_pyramids": "Direct sightline to Giza complex"
        },
        "technology_integration": {
            "virtual_reality": "Immersive tomb experiences",
            "augmented_reality": "Interactive object exploration",
            "digital_archives": "Complete cataloging system"
        }
    }
};

// API Integration Functions and Data Structures
const API_CONFIGURATIONS = {
    "met_museum_api": {
        "base_url": "https://collectionapi.metmuseum.org/public/collection/v1",
        "endpoints": {
            "search": "/search?hasImages=true&q=egypt",
            "object": "/objects/{objectID}",
            "departments": "/departments"
        },
        "rate_limits": "None specified",
        "authentication": "None required",
        "sample_queries": {
            "egyptian_sculptures": "/search?departmentId=10&q=sculpture",
            "tutankhamun_objects": "/search?q=tutankhamun",
            "new_kingdom_jewelry": "/search?departmentId=10&q=jewelry&dateBegin=1550&dateEnd=1070"
        }
    },
    "british_museum_api": {
        "base_url": "https://www.britishmuseum.org/api/search",
        "parameters": {
            "museum_number": "Object registration number",
            "object_name": "Type of object",
            "culture": "Ancient Egyptian",
            "material": "stone, gold, wood, etc."
        },
        "response_format": "JSON with object details and image URLs"
    },
    "europeana_api": {
        "base_url": "https://api.europeana.eu/record/v2",
        "coverage": "European museums with Egyptian collections",
        "api_key_required": true,
        "search_filters": {
            "provider": "british_museum",
            "type": "IMAGE",
            "subject": "ancient egypt"
        }
    }
};

// Archaeological Artifact Classification System
const ARTIFACT_CLASSIFICATION = {
    "pottery_ceramics": {
        "subcategories": [
            "Storage jars", "Cooking vessels", "Serving dishes",
            "Ritual vessels", "Funerary equipment", "Oil lamps"
        ],
        "dating_methods": ["Typological analysis", "Stratigraphic context"],
        "information_content": "Daily life, trade connections, chronology"
    },
    "stone_objects": {
        "subcategories": [
            "Statuary", "Relief sculpture", "Architectural elements",
            "Tools", "Vessels", "Inscription stones"
        ],
        "materials": ["Limestone", "Sandstone", "Granite", "Basalt", "Quartzite"],
        "analysis_techniques": ["Petrographic analysis", "3D scanning", "Photogrammetry"]
    },
    "metalwork": {
        "subcategories": [
            "Jewelry", "Tools", "Weapons", "Religious objects",
            "Furniture fittings", "Vessels"
        ],
        "materials": ["Gold", "Silver", "Copper", "Bronze", "Iron"],
        "analysis_methods": ["X-ray fluorescence", "Lead isotope analysis"]
    },
    "organic_materials": {
        "subcategories": [
            "Papyri", "Textiles", "Wood objects", "Leather goods",
            "Basketry", "Mummies and human remains"
        ],
        "preservation_challenges": "Climate control, conservation treatment",
        "analysis_techniques": ["Radiocarbon dating", "DNA analysis", "Fiber identification"]
    }
};

// Museum Data Integration for SHAM Platform
const SHAM_MUSEUM_INTEGRATION = {
    "data_correlation": {
        "site_to_artifacts": "Link excavation sites to museum collections",
        "provenance_tracking": "Archaeological context preservation",
        "digital_reunification": "Virtual reconstruction of dispersed collections"
    },
    "visualization_features": {
        "3d_models": "Interactive artifact examination",
        "scale_comparison": "Size relationships with site features",
        "material_analysis": "Spectral data correlation with artifact composition"
    },
    "research_tools": {
        "comparative_analysis": "Cross-collection object comparison",
        "style_dating": "Artistic and typological chronologies",
        "trade_networks": "Material source analysis and distribution patterns"
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MUSEUM_COLLECTIONS,
        API_CONFIGURATIONS,
        ARTIFACT_CLASSIFICATION,
        SHAM_MUSEUM_INTEGRATION
    };
}