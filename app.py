import os
from flask import Flask, request, render_template, jsonify, json

app = Flask(__name__)
app.config.from_envvar('FLASHERSETTINGS')

def get_json_data(filename):
    JSON_FOLDER = os.path.join(app.config['ROOT_FOLDER'], "static\\json\\")
    json_file = os.path.join(JSON_FOLDER, filename)

    json_data = json.load(open(json_file))

    return json_data

@app.route('/get_json/<filename>')
def get_json(filename):
    json_data = get_json_data(filename)
    data = jsonify(json_data)
    return data

@app.route('/unit/<unit_num>')
def unit(unit_num):
    return render_template('mockup.html', unum = unit_num)

@app.route('/')
def question():
    return render_template('mockup.html')