import os
from flask import Flask, request, render_template, jsonify, json

ROOT_FOLDER = "C:\\Users\\Charles\\desktop\\webdev\\flask\\"
app = Flask(__name__)
app.config['ROOT_FOLDER'] = ROOT_FOLDER

def get_json_data(filename):
    JSON_FOLDER = os.path.join(app.config['ROOT_FOLDER'], "projectfiles\\test_json\\")
    json_file = os.path.join(JSON_FOLDER, filename)

    json_data = json.load(open(json_file))

    return json_data

'''
@app.route('/update_question/')
def update():
    print('test')
    filename = "testq_1.json"
    JSON_FOLDER = os.path.join(app.config['ROOT_FOLDER'], "projectfiles\\test_json\\")
    json_file = os.path.join(JSON_FOLDER, filename)

    json_data = json.load(open(json_file))

    question_header = request.args.get('question_header', 'Question blank', type = str)
    direction = request.args.get('direction', 'next', type = str)

    question_header.replace(" ", "_").lower()

    index = int(question_header[-1])

    print(question_header)
    if(direction.lower() == 'next'):
        print("testnig")
        data = jsonify(question_header = 'Question ' + str(index + 1),\
                question = json_data.get('question_' + str(index + 1)))
        return data
    elif(direction.lower() == 'previous'):
        data = jsonify(question_header = 'Question ' + str(index - 1),\
                question = json_data.get('question_' + str(index - 1)))
        return data
'''

@app.route('/get_json/<filename>')
def get_json(filename):
    json_data = get_json_data(filename)
    data = jsonify(json_data)
    return data

@app.route('/')
def question():
    filename = "testq_1.json"
    JSON_FOLDER = os.path.join(app.config['ROOT_FOLDER'], "projectfiles\\test_json\\")
    json_file = os.path.join(JSON_FOLDER, filename)

    json_data = json.load(open(json_file))

    return render_template('index.html', data=json_data)