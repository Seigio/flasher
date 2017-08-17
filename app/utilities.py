import os
from app import app
from flask import json

def get_json_data(filename):
    JSON_FOLDER = os.path.join(app.config['ROOT_FOLDER'], "test_json\\")
    json_file = os.path.join(JSON_FOLDER, filename)

    json_data = json.load(open(json_file))

    return json_data