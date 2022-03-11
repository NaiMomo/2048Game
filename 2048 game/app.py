import pymysql
from flask import Flask, render_template, request, url_for, flash, redirect

from user import User

app = Flask(__name__)
app.config['SECRET_KEY'] = 'ifT-3225@#'
app.validate_session = False
app.role = 'User'
app.current = ''


def get_data_connexion(type):
    connection = pymysql.connect(host='localhost',
                                 user='ift3225',
                                 password='ift3225',
                                 db='flask_ift3225',
                                 charset='utf8mb4',
                                 cursorclass=pymysql.cursors.DictCursor)
    connexion = connection.cursor()

    if type == "delete" or type == "edit" or type == "create":
        connexion = connection

    return connexion


# Queries
sql_select_all = "SELECT * from `users`"
exist = 'SELECT * FROM `users` where `nickname`= %s'
create_user = 'INSERT INTO `users`(`nickname`, `passwd`, `role`, `online`) VALUES(%s,%s,%s,%s)'
select_some = 'SELECT `nickname`, `passwd`, `role` from `users` where ( `nickname` = %s and `passwd` = %s )'
get_global_min = 'select MIN(NULLIF(`score`, -1)) from `users`'
# get_global_min = 'SELECT MIN(`score`) from `users`'
get_current_score = 'SELECT `score` from `users` where ( `nickname` = %s)'
online_status = 'update `users` set `online` = %s where ( `nickname` = %s )'
select_by_score = 'SELECT * FROM `users` order by `score` ASC'
select_by_inscription = 'SELECT * FROM `users` order by `created`'
count_online_users = 'SELECT COUNT(online) FROM `users` where (`online` = %s )'
count_online_all_users = 'SELECT COUNT(id) FROM `users`'
update_score = 'update `users` set `score` = %s where ( `nickname` = %s )'
current_score = 'select `score` from `users` where ( `nickname` = %s )'


@app.route('/update_best', methods=["POST", "GET"])
def update_best():
    if request.method == "POST":
        value = request.form.get('text')
        conns = get_data_connexion("select")
        conns.execute(current_score, app.current)
        temp = conns.fetchone()
        conns.close()
        if int(temp['score']) > int(value) or int(temp['score']) == -1:
            connexion = get_data_connexion('edit')
            connexion.cursor().execute(update_score, (value, app.current))
            connexion.commit()
            connexion.close()
            return value
    else:
        return ''


@app.route('/', methods=('GET', 'POST'))
def index():
    if request.method == 'POST':
        n_name = request.form['nickname']
        p_word = request.form['password']

        if not n_name or not p_word:
            flash('Some fields are missing')

        else:
            connection = get_data_connexion("selectall")
            connection.execute(select_some,
                               (n_name, p_word))
            data = connection.fetchone()
            connection.close()

            if data is None:
                flash('Verify your information or try making an account')
            elif data['role'] == 'Admin':

                app.validate_session = True
                app.current = n_name
                status(app.current, 'Yes')
                return render_template('adminView.html')
            else:
                app.validate_session = True
                app.current = n_name
                status(app.current, 'Yes')
                return redirect(url_for('game'))

    return render_template('login.html')


@app.route('/addAdmin', methods=('GET', 'POST'))
def add_admin():
    app.role = 'Admin'
    return redirect(url_for('signup'))


@app.route('/signup', methods=('GET', 'POST'))
def signup(online='No'):
    if request.method == 'POST':
        nickname = request.form['nickname']
        password = request.form['password']

        if not nickname or not password:
            flash('Some fields are missing')
        else:
            connection = get_data_connexion("selectall")
            exists = connection.execute(exist, (nickname,))
            connection.close()

            if not exists:
                connection = get_data_connexion("create")
                connection.cursor().execute(create_user,
                                            (nickname, password, app.role, online))
                connection.commit()
                connection.close()
                flash('Account created successfully, please fill the form to log in')
                return redirect(url_for('index'))
            else:
                flash('That nickname already exists')
            connection.close()
    return render_template('signup.html')


@app.route('/adminView', methods=('GET', 'POST'))
def admin_view():
    if not app.validate_session:
        flash("You're not an admin, log in as admin to display the admin page")
        return redirect(url_for('index'))
    else:
        if request.method == 'POST':
            order_by = request.form.get('orderBy')
            if order_by == 'score':
                connection = get_data_connexion("selectall")
                connection.execute(select_by_score)
                users = connection.fetchall()
                connection.close()
                return render_template('adminView.html', users=users)
            elif order_by == 'inscription':
                connection = get_data_connexion("selectall")
                connection.execute(select_by_inscription)
                users = connection.fetchall()
                connection.close()
                return render_template('adminView.html', users=users)
            else:
                flash("Please make a choice to sort the table")

    return render_template('adminView.html')


@app.route('/game')
def game():
    if app.validate_session:
        return render_template('game.html')
    else:
        flash("Fill the form to log into the 2048 🔥")
        return redirect(url_for('index'))


@app.route('/livesearch_online_users', methods=["POST", "GET"])
def livesearch_online_users():
    connexion = get_data_connexion('select')
    connexion.execute(count_online_users, 'Yes')
    data = connexion.fetchone()
    connexion.close()
    return str(data['COUNT(online)'])


@app.route('/livesearch_all_db', methods=["POST", "GET"])
def livesearch_all_db():
    connexion = get_data_connexion('select')
    connexion.execute(count_online_all_users)
    data = connexion.fetchone()
    connexion.close()

    return str(data['COUNT(id)'])


@app.route('/livesearch_global', methods=["POST", "GET"])
def livesearch_global():
    connexion = get_data_connexion('select')
    connexion.execute(get_global_min)
    data = connexion.fetchone()
    connexion.close()

    return str(data['MIN(NULLIF(`score`, -1))'])


@app.route('/logout')
def logout():
    status(app.current, 'No')
    app.validate_session = False
    return redirect(url_for('index'))


@app.route('/livesearch_myscore', methods=["POST", "GET"])
def livesearch_myscore():
    connexion = get_data_connexion('select')
    connexion.execute(get_current_score, (str(app.current),))
    data = connexion.fetchone()
    connexion.close()
    print(str(data['score']))
    return str(data['score'])


if __name__ == '__main__':
    app.run()


def status(user, inp):
    connection = get_data_connexion("edit")
    connection.cursor().execute(online_status, (inp, user))
    connection.commit()
    connection.close()
