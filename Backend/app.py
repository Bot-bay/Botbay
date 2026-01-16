# Run Flask Server




import flask
import supabase
import os
from dotenv import load_dotenv


load_dotenv() # So it can work on Virtual Environment





URL : str = os.environ.get("DBURL")
KEY : str =  os.environ.get("DBKEY")



DbClient = supabase.create_client(URL,KEY)


App = flask.Flask("BotBayBackend")














