import json
import os
import time
from flask import Flask, Response, request

app = Flask(__name__, static_url_path='', static_folder='')
app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))


@app.route('/answers', methods=['GET', 'POST'])
def answers_handler():
    with open('answers.json', 'r') as f:
        answers = json.loads(f.read())
    if request.method == 'POST':
        request.get_data()
        answers['answers'].append(request.data)
        with open('answers.json', 'w') as f:
            f.write(json.dumps(answers))
    return 'Done'

@app.route('/questions', methods=['GET', 'POST'])
def questions_handler():
    history = []
    with open('answers.json', 'r') as f:
        answers = json.loads(f.read())
    with open('questions.json', 'r') as f:
        questions = json.loads(f.read())
    if "Yes" in answers['answers'][0]:
        for i in range (0, len(answers['answers'])):
            history.append('\n'+answers['answers'][i])
            history.append('\n'+questions['questions_yes'][i])
            if i == len(questions['questions_yes'])-1:
                print (i)
                answers['answers'] = []
    elif "No" in answers['answers'][0]:
        for i in range (0, len(answers['answers'])):
            history.append("\n"+answers['answers'][i])
            history.append("\n"+questions['questions_no'][i])
            if i == len(questions['questions_no'])-1:
                print (i)
                answers['answers'] = []
    with open('answers.json', 'w') as f:
        f.write(json.dumps(answers))
    return Response(
        json.dumps(history),
        mimetype='application/json',
        headers={
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'
            }
        )        

if __name__ == '__main__':
    app.run(port=int(os.environ.get("PORT", 3000)))
