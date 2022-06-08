import socketio

socket = socketio.Client()
socket.connect('http://localhost:8084')

@socket.event
def connect():
    print('Connected')