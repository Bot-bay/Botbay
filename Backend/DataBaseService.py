from dotenv import load_dotenv
import supabase
import os

SERVER = False




if SERVER == False:
    load_dotenv("Backend\.env") # So it can work on Virtual Environment




URL : str = os.environ.get("DBURL")
KEY : str =  os.environ.get("DBKEY")



DbClient = supabase.create_client(URL,KEY)