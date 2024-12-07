from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
# Set a secret key for session encryption
app.secret_key = 'your_secret_key_here'

# Predefined username and password
USERNAME = 'test'
PASSWORD = 'test123'

# Login Page


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Check if the entered credentials are correct
        if username == USERNAME and password == PASSWORD:
            session['logged_in'] = True
            return redirect(url_for('game'))
        else:
            error = 'Invalid username or password!'
            return render_template('login.html', error=error)

    return render_template('login.html')

# Game Page (Protected)


@app.route('/game')
def game():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    return render_template('game.html')

# Reveal Page (Protected)


@app.route('/reveal')
def reveal():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    choice = request.args.get('choice')
    return render_template('reveal.html', choice=choice)

# Logout Route


@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True)
