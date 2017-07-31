import os
from flask import Flask, render_template, request, url_for, redirect
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'C:\\Users\\Charles\\desktop/webdev\\flask\\projectfiles\\images\\uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload/image', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        f = request.files['the_file']
        if f and allowed_file(f.filename):
            filename = secure_filename(f.filename)
            f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            print("testing2")
            return redirect(url_for('index', filename=filename))

    return '''<!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <p><input type=file name=the_file>
         <input type=submit value=Upload>
    </form>'''