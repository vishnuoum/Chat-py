from flask import Flask, render_template,request,jsonify
from flask_socketio import SocketIO
import pymysql
import json
from datetime import datetime


app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app)








#client array
users={}


#db connect
hostname = 'localhost'
username = 'root'
password = ''
database = 'test'
myconn = pymysql.connect( host=hostname, user=username, passwd=password, db=database )
conn = myconn.cursor()


@app.route('/')
def sessions():
    return render_template('list.html')

def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')

@socketio.on('connect')
def connect():
    users[request.cookies.get('phone')]=request.sid
    print(users)
    print("user connected : "+request.sid)


@socketio.on('disconnect')
def connect():
    users.pop(request.cookies.get('phone'))
    print("user disconnected")


@socketio.on('send_message')
def send(json, methods=['GET','POST']):
    today = datetime.now()
    if(json['receiver'] in users):
        socketid=users[json['receiver']]
    else:
        socketid=''
    conn.execute("INSERT INTO chat (sname, sender, rname, receiver, message, date, time) VALUES ((SELECT name FROM user WHERE phone='"+json['sender']+"'), '" + json['sender'] + "', (SELECT name FROM user WHERE phone='"+json['receiver']+"'),'" + json['receiver'] + "', '" + json['message'] + "','"+today.strftime("%d/%m/%Y")+"', '"+today.strftime('%I:%M %p')+"')")
    myconn.commit()
    json['date']=today.strftime("%d/%m/%Y")
    json['time']=today.strftime("%I:%M %p")
    print(json)
    socketio.emit('new_message',json,room=socketid)




@socketio.on('user_connected')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('user connected ' + str(json))
    # users[str(json)]=request.sid
    # print(users)
    socketio.emit('user_connected', str(json), callback=messageReceived)

@app.route('/all_users', methods=['POST'])
def postJsonHandler():
    if request.method=="POST":
        phone=request.form.get('phone')
        # print(phone)
        conn.execute("SELECT id,name,phone From user WHERE NOT phone='"+phone+"' ORDER BY name ASC")
        result=conn.fetchall()
        print(json.dumps(result))
    return json.dumps(result)


@app.route('/get_name', methods=['POST'])
def get_name():
    if request.method=="POST":
        phone=request.form.get('phone')
        # print(phone)
        conn.execute("SELECT name From user WHERE phone="+phone)
        result=conn.fetchall()
        print(json.dumps(result))
    return json.dumps(result)


@app.route('/chat_history', methods=['POST'])
def chat_history():
    if request.method=="POST":
        conn.execute("SELECT id,name,phone,(select message from chat WHERE (receiver='"+request.form.get('phone')+"' and sender=user.phone) or (sender='"+request.form.get('phone')+"' and receiver=user.phone) order by id desc limit 1) as message,(select id from chat WHERE (receiver='"+request.form.get('phone')+"' and sender=user.phone) or (sender='"+request.form.get('phone')+"' and receiver=user.phone) order by id desc limit 1) as messageid, (select date from chat WHERE (receiver='"+request.form.get('phone')+"' and sender=user.phone) or (sender='"+request.form.get('phone')+"' and receiver=user.phone) order by id desc limit 1) as date, (select time from chat WHERE (receiver='"+request.form.get('phone')+"' and sender=user.phone) or (sender='"+request.form.get('phone')+"' and receiver=user.phone) order by id desc limit 1) as time from user WHERE phone in (SELECT receiver from chat where sender='"+request.form.get('phone')+"') OR phone in (SELECT sender from chat where receiver='"+request.form.get('phone')+"') ORDER BY messageid DESC")
        result=conn.fetchall()
        print(json.dumps(result))
    return json.dumps(result)


@app.route('/get_messages', methods=['POST'])
def get_messages():
    if request.method=="POST":
        conn.execute("SELECT * FROM chat WHERE (sender = '" + request.form.get('sender') + "' AND receiver = '" + request.form.get('receiver') + "') OR (sender = '" + request.form.get('receiver') + "' AND receiver = '" + request.form.get('sender') + "')")
        result=conn.fetchall()
        print(json.dumps(result))
    return json.dumps(result)




if __name__ == '__main__':
    socketio.run(app, debug=True,host="192.168.42.229")