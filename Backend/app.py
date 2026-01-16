# Run Flask Server




import flask
from flask_socketio import SocketIO, emit
import os



App = flask.Flask(__name__)
Websocket = SocketIO(App)



def ServerMessage(Status : str):
    emit("ServerMessage",{"Status":Status})




@Websocket.on("Ping")
def Ping():
    ServerMessage("Server is healthy")
    

@App.route("/")
def Debug():
    return "Server is up!"





Websocket.run(App)




