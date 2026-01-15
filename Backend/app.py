import flask
import supabase
import os

URL : str = os.environ.get("DBURL")
KEY : str =  os.environ.get("DBKEY")

DbClient = supabase.create_client(URL,KEY)


App = flask.Flask("BotBayBackend")






