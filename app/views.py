import os
from app import app
from flask import request, render_template, jsonify, json
from .utilities import get_json_data


@app.route('/get_json/<filename>')
def get_json(filename):
    json_data = get_json_data(filename)
    data = jsonify(json_data)
    return data

@app.route('/')
def question():
    return render_template('index.html')