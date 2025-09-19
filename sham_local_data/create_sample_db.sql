-- SHAM Archaeological Database Schema
CREATE TABLE sites (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    latitude REAL,
    longitude REAL,
    period TEXT,
    site_type TEXT,
    unesco_status BOOLEAN
);

CREATE TABLE objects (
    id INTEGER PRIMARY KEY,
    site_id INTEGER,
    object_type TEXT,
    material TEXT,
    period TEXT,
    description TEXT,
    museum TEXT,
    inventory_number TEXT,
    FOREIGN KEY (site_id) REFERENCES sites (id)
);

CREATE TABLE surveys (
    id INTEGER PRIMARY KEY,
    site_id INTEGER,
    survey_type TEXT,
    date_conducted DATE,
    results TEXT,
    data_file TEXT,
    FOREIGN KEY (site_id) REFERENCES sites (id)
);

-- Insert sample data
INSERT INTO sites VALUES 
(1, 'Giza Pyramid Complex', 29.9792, 31.1342, 'Old Kingdom', 'Pyramid Complex', 1),
(2, 'Valley of the Kings', 25.7402, 32.6014, 'New Kingdom', 'Royal Cemetery', 1),
(3, 'Karnak Temple', 25.7189, 32.6575, 'New Kingdom', 'Temple Complex', 1),
(4, 'Abydos', 26.1844, 31.9189, 'Early Dynastic', 'Cemetery/Temple', 0),
(5, 'Saqqara', 29.8711, 31.2156, 'Old Kingdom', 'Cemetery', 1);

INSERT INTO objects VALUES
(1, 1, 'Mastaba Block', 'Limestone', 'Old Kingdom', 'Carved relief block from mastaba tomb', 'Boston MFA', 'MFA 13.4331'),
(2, 2, 'Canopic Jar', 'Limestone', 'New Kingdom', 'Jar of Imsety from KV55', 'Cairo Museum', 'JE 39627'),
(3, 3, 'Column Fragment', 'Sandstone', 'New Kingdom', 'Hypostyle hall column drum', 'Karnak Open Air Museum', 'KV 2847'),
(4, 4, 'Stela Fragment', 'Limestone', 'Middle Kingdom', 'Memorial stela with hieroglyphs', 'Abydos Site Museum', 'AB 1847'),
(5, 5, 'Relief Block', 'Limestone', 'Old Kingdom', 'Wall relief from pyramid temple', 'Cairo Museum', 'JE 98234');

INSERT INTO surveys VALUES
(1, 1, 'Ground Penetrating Radar', '2023-03-15', 'Anomalies detected 2.3m depth', 'giza_gpr_2023.dat'),
(2, 1, 'Magnetometry', '2023-03-20', 'Magnetic high indicating buried structures', 'giza_mag_2023.txt'),
(3, 2, 'Electrical Resistivity', '2022-11-08', 'High resistance zones suggest voids', 'vok_ert_2022.dat'),
(4, 3, 'LiDAR Survey', '2023-01-12', '3D model complete, 2cm accuracy', 'karnak_lidar_2023.las'),
(5, 4, 'Photogrammetry', '2023-05-22', 'Temple complex 3D reconstruction', 'abydos_photos_2023.zip');
