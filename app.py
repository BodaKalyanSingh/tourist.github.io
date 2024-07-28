from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/quiz')
def quiz():
    return render_template('interactive_quiz.html')

@app.route('/explore')
def explore():
    return render_template('explore.html')

@app.route('/static/data/<path:filename>')
def serve_file(filename):
    return send_from_directory('static/data', filename)

if __name__ == '__main__':
    app.run(debug=True)
