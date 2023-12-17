from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)

# MySQL configurations
app.config['MYSQL_HOST'] = '15.235.140.8'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'qwerty123'
app.config['MYSQL_DB'] = 'react'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

# Create the users table
with app.app_context():
    cur = mysql.connection.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            occupation VARCHAR(255) NOT NULL
        )
    ''')
    mysql.connection.commit()
    cur.close()

# Routes

####################### USERS ROUTES ############################
@app.route('/users', methods=['GET'])
def get_users():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM users_view')
    result = cur.fetchall()
    cur.close()
    return jsonify(result)

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM users_view WHERE id = %s', (user_id,))
    result = cur.fetchone()
    cur.close()
    return jsonify(result)

@app.route('/users', methods=['POST'])
def add_user():
    new_user = request.get_json()
    cur = mysql.connection.cursor()

    # Check if email already exists
    cur.execute('SELECT * FROM users_view WHERE email = %s', (new_user['email'],))
    result = cur.fetchone()
    if result:
        return jsonify({"message": "Email already exists"}), 400

    # If email doesn't exist, create new user
    cur.execute('''
       CALL create_user(%s, %s, %s, %s, %s) 
    ''', (new_user['firstName'], new_user['lastName'], new_user['email'], new_user['password'], new_user['occupation']))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "User added successfully"})

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    updated_user = request.get_json()
    cur = mysql.connection.cursor()

    cur.execute('SELECT * FROM users_view WHERE email = %s', (updated_user['email'],))
    result = cur.fetchone()
    if result:
        return jsonify({"message": "Email already exists"}), 400

    cur.execute('''
      CALL update_user(%s, %s, %s, %s, %s, %s) 
    ''', (user_id, updated_user['firstName'], updated_user['lastName'], updated_user['email'], updated_user['password'], updated_user['occupation']))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "User updated successfully"})

@app.route('/users/<int:user_id>', methods=['POST'])
def delete_user(user_id):
    cur = mysql.connection.cursor()
    cur.execute('CALL delete_user(%s)', (user_id,))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "User deleted successfully"})

@app.route('/users/login', methods=['POST'])
def login_user():
    if not request.json or not all(key in request.json for key in ['email', 'password']):
        return jsonify({'error': 'Missing email or password'}), 400

    cur = mysql.connection.cursor()

    login_query = 'SELECT * FROM users_view WHERE email = %s AND password = %s'
    login_data = (request.json['email'], request.json['password'])

    cur.execute(login_query, login_data)
    user = cur.fetchone()

    cur.close()

    if user is None:
        return jsonify({'error': 'User not found or invalid credentials'}), 401

    return jsonify(user)



####################### QUIZ ROUTES ############################
@app.route('/quiz', methods=['GET'])
def get_quizzes():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM quiz_view')
    result = cur.fetchall()
    cur.close()
    return jsonify(result)

@app.route('/quiz', methods=['POST'])
def add_quiz():
    new_quiz = request.get_json()
    cur = mysql.connection.cursor()
    cur.execute('''
        INSERT INTO Quizzes (title, description, created_by, date, userID)
        VALUES (%s, %s, %s, %s, %s)
    ''', (new_quiz['title'], new_quiz['description'], new_quiz['created_by'], new_quiz['date'], new_quiz['userID']))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "Quiz added successfully"})

@app.route('/quiz/<int:quiz_id>', methods=['GET'])
def get_quiz(quiz_id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM quiz_view WHERE id = %s', (quiz_id,))
    result = cur.fetchone()
    cur.close()
    return jsonify(result)

@app.route('/quiz/view/<int:user_id>', methods=['GET'])
def get_quiz_view(user_id):
    cur = mysql.connection.cursor()

    cur.execute('''
        SELECT * FROM quiz_view
        WHERE userID = %s
    ''', (user_id,))

    result = cur.fetchall()
    cur.close()

    return jsonify(result)

@app.route('/quiz/view/count/<int:user_id>', methods=['GET'])
def count_quiz_view(user_id):
    cur = mysql.connection.cursor()

    cur.execute('''
        SELECT COUNT(*) as count FROM quiz_view
        WHERE userID = %s
    ''', (user_id,))

    result = cur.fetchone()
    cur.close()

    return jsonify(result)

@app.route('/quiz/<int:quiz_id>', methods=['PUT'])
def update_quiz(quiz_id):
    updated_quiz = request.get_json()
    cur = mysql.connection.cursor()
    cur.execute('''
        UPDATE Quizzes 
        SET title = %s, description = %s
        WHERE id = %s
    ''', (updated_quiz['title'], updated_quiz['description'], quiz_id))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "Quiz updated successfully"})

@app.route('/quiz/<int:quiz_id>', methods=['DELETE'])
def delete_quiz(quiz_id):
    cur = mysql.connection.cursor()
    cur.execute('CALL delete_quiz(%s)', (quiz_id,))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "Quiz deleted successfully"})

@app.route('/quiz/edit/<int:quiz_id>', methods=['PUT'])
def update_quiz_is_active(quiz_id):
    updated_quiz = request.get_json()
    cur = mysql.connection.cursor()
    cur.execute('''
        UPDATE Quizzes 
        SET is_active = %s
        WHERE id = %s
    ''', (updated_quiz['is_active'], quiz_id))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "Quiz updated successfully"})

@app.route('/quizzes/active', methods=['GET'])
def count_active_quizzes():
    cur = mysql.connection.cursor()
    cur.execute('''
        SELECT * FROM active_quizzes
    ''')
    result = cur.fetchone()
    cur.close()
    return jsonify(result)

@app.route('/quiz/complete', methods=['POST'])
def add_quiz_completion():
    data = request.get_json()
    cur = mysql.connection.cursor()

    cur.execute('''
        INSERT INTO QuizCompletions (UserID, QuizID, CompletionDate, Score, Result)
        VALUES (%s, %s, %s, %s, %s)
    ''', (data['UserID'], data['QuizID'], data['CompletionDate'], data['Score'], data['Result']))

    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "Quiz completion added successfully"})

@app.route('/quiz/passingrate/<int:user_id>', methods=['GET'])
def calculate_passing_rate(user_id):
    cur = mysql.connection.cursor()

    # Count the total number of quizzes taken by the user
    cur.execute('''
        SELECT COUNT(*) as total_quizzes
        FROM QuizCompletions
        WHERE UserID = %s
    ''', (user_id,))

    total_quizzes = cur.fetchone()['total_quizzes']

    # Count the number of quizzes passed by the user
    cur.execute('''
        SELECT COUNT(*) as passed_quizzes
        FROM QuizCompletions
        WHERE UserID = %s AND Result = 1
    ''', (user_id,))

    passed_quizzes = cur.fetchone()['passed_quizzes']

    cur.close()

    # Calculate the passing rate
    if total_quizzes > 0:
        passing_rate = (passed_quizzes / total_quizzes) * 100
    else:
        passing_rate = 0

    return jsonify({"passing_rate": passing_rate})

@app.route('/quiz/completions/count', methods=['GET'])
def count_unique_users():
    cur = mysql.connection.cursor()

    cur.execute('''
        SELECT * FROM unique_users 
    ''')

    result = cur.fetchone()
    cur.close()

    return jsonify(result)

@app.route('/quiz/result', methods=['GET'])
def get_quiz_results():
    cur = mysql.connection.cursor()

    cur.execute('''
        SELECT * FROM QuizCompletions_view 
    ''',) 

    results = cur.fetchall()
    cur.close()

    return jsonify(results)

@app.route('/quiz/score/average/<int:UserID>', methods=['GET'])
def get_avg_score(UserID):
    cur = mysql.connection.cursor()

    cur.execute('''
       CALL average_score(%s) 
    ''',(UserID,))

    result = cur.fetchone()
    cur.close()

    return jsonify(result)


@app.route('/quiz/result/<int:quiz_id>', methods=['GET'])
def get_quiz_result(quiz_id):
    cur = mysql.connection.cursor()

    cur.execute('''
        SELECT QuizCompletions.*, users.*
        FROM QuizCompletions
        JOIN users ON QuizCompletions.UserID = users.id
        WHERE QuizCompletions.QuizID = %s
    ''', (quiz_id,))

    results = cur.fetchall()
    cur.close()

    return jsonify(results)

@app.route('/quiz/completions/view/<int:quiz_id>/<int:user_id>', methods=['GET'])
def get_quiz_completion_view(quiz_id, user_id):
    cur = mysql.connection.cursor()

    cur.execute('''
        SELECT * FROM QuizCompletions_view
        WHERE QuizID = %s AND UserID = %s
    ''', (quiz_id, user_id))

    result = cur.fetchall()
    cur.close()

    return jsonify(result)

####################### QUESTIONS ROUTES ############################
@app.route('/questions', methods=['GET'])
def get_questions():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM questions_view')
    result = cur.fetchall()
    cur.close()
    return jsonify(result)


@app.route('/questions', methods=['POST'])
def add_question():
    new_question = request.get_json()
    cur = mysql.connection.cursor()

    # Insert into Question table
    cur.execute('''
        INSERT INTO Questions (question_text, quiz_id)
        VALUES (%s, %s)
    ''', (new_question['question_text'], new_question['quiz_id'])) 

    # Get the last inserted id
    question_id = cur.lastrowid

    # Insert into Choice table
    for choice in new_question['choices']:
        cur.execute('''
            INSERT INTO Question_choices (choice_text, is_correct, question_id)
            VALUES (%s, %s, %s)
        ''', (choice['choice_text'], choice['is_correct'], question_id))

    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "Question and choices added successfully"})


@app.route('/questions/<int:quiz_id>', methods=['GET'])
def get_question(quiz_id):
    cur = mysql.connection.cursor()
    cur.execute('''
        SELECT Questions.question_id, Questions.question_text, Questions.quiz_id, Question_choices.choice_id, Question_choices.choice_text, Question_choices.is_correct
        FROM Questions
        LEFT JOIN Question_choices ON Questions.question_id = Question_choices.question_id
        WHERE Questions.quiz_id = %s
    ''', (quiz_id,))
    result = cur.fetchall()
    cur.close()
    return jsonify(result)

@app.route('/questions/<int:question_id>', methods=['DELETE'])
def delete_question(question_id):
    cur = mysql.connection.cursor()

    # Delete choices associated with the question
    cur.execute('''
        DELETE FROM Question_choices
        WHERE question_id = %s
    ''', (question_id,))

    # Delete the question
    cur.execute('''
        DELETE FROM Questions
        WHERE question_id = %s
    ''', (question_id,))

    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "Question and choices deleted successfully"})

@app.route('/questions/count', methods=['GET'])
def count_questions():
    cur = mysql.connection.cursor()

    cur.execute('''
        SELECT COUNT(*) FROM Questions
    ''',)

    result = cur.fetchone()
    cur.close()

    return jsonify(result)

@app.route('/questions/count/<int:quiz_id>', methods=['GET'])
def count_questions_id(quiz_id):
    cur = mysql.connection.cursor()

    cur.execute('''
        SELECT COUNT(*) FROM Questions
        WHERE quiz_id = %s
    ''', (quiz_id,))

    result = cur.fetchone()
    cur.close()

    return jsonify(result)

@app.route('/questions/submit', methods=['POST'])
def submit_choices():
    data = request.get_json()

    cur = mysql.connection.cursor()

    score = 0

    for question_id, choice_id in data.items():
        # Query the is_correct value for the given choice_id
        cur.execute('''
            SELECT is_correct FROM Question_choices
            WHERE question_id = %s AND choice_id = %s
        ''', (question_id, choice_id))

        result = cur.fetchone()
        is_correct = result['is_correct'] if result else None

        if is_correct == 1:
            score += 1

    mysql.connection.commit()
    cur.close()

    return jsonify(score)



if __name__ == '__main__':
    app.run(debug=True)

