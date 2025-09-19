#!/usr/bin/env python3
"""
SHAM Data Testing Script
Verify all downloaded data can be loaded and processed
"""

import json
import csv
import sqlite3
import os
from pathlib import Path

def test_json_data():
    """Test JSON data files"""
    json_files = ['museum/met_egyptian_objects.json', 'museum/global_egyptian_objects.json', 'excavation/papyrus_samples.json']
    
    for file_path in json_files:
        if os.path.exists(file_path):
            try:
                with open(file_path, 'r') as f:
                    data = json.load(f)
                print(f"✅ {file_path}: {len(data) if isinstance(data, list) else 'Valid JSON'}")
            except Exception as e:
                print(f"❌ {file_path}: {e}")
        else:
            print(f"⚠️  {file_path}: File not found")

def test_csv_data():
    """Test CSV data files"""
    csv_files = ['excavation/egypt_archaeology_sample.csv', 'geophysical/magnetometry_survey.csv']
    
    for file_path in csv_files:
        if os.path.exists(file_path):
            try:
                with open(file_path, 'r') as f:
                    reader = csv.DictReader(f)
                    rows = list(reader)
                print(f"✅ {file_path}: {len(rows)} rows loaded")
            except Exception as e:
                print(f"❌ {file_path}: {e}")
        else:
            print(f"⚠️  {file_path}: File not found")

def test_database():
    """Test SQLite database"""
    if os.path.exists('sham_test.db'):
        try:
            conn = sqlite3.connect('sham_test.db')
            cursor = conn.cursor()
            
            cursor.execute("SELECT COUNT(*) FROM sites")
            sites_count = cursor.fetchone()[0]
            
            cursor.execute("SELECT COUNT(*) FROM objects") 
            objects_count = cursor.fetchone()[0]
            
            cursor.execute("SELECT COUNT(*) FROM surveys")
            surveys_count = cursor.fetchone()[0]
            
            print(f"✅ Database: {sites_count} sites, {objects_count} objects, {surveys_count} surveys")
            conn.close()
        except Exception as e:
            print(f"❌ Database: {e}")
    else:
        print("⚠️  Database: sham_test.db not found")

def test_images():
    """Test downloaded image files"""
    image_files = ['satellite/egypt_landsat_sample.tif', 'maps/napoleon_egypt_map.jpg', 'maps/roberts_temple_karnak.jpg']
    
    for file_path in image_files:
        if os.path.exists(file_path):
            size = os.path.getsize(file_path)
            print(f"✅ {file_path}: {size} bytes")
        else:
            print(f"⚠️  {file_path}: File not found")

if __name__ == "__main__":
    print("🏺 Testing SHAM Archaeological Data...")
    print("\n📊 JSON Data Files:")
    test_json_data()
    print("\n📈 CSV Data Files:")  
    test_csv_data()
    print("\n🗄️  Database:")
    test_database()
    print("\n🖼️  Image Files:")
    test_images()
    print("\n✅ Data testing complete!")