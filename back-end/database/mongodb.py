from pymongo import MongoClient

MONGO_URI = 'mongodb://localhost:27017/'
MONGO_URI_ATLAS = 'mongodb+srv://admin:admin@db.sraixjh.mongodb.net/?retryWrites=true&w=majority&appName=DB'
MONGO_DB_NAME = 'chess'

def get_mongo():
    return MongoClient(MONGO_URI_ATLAS)

def get_db():
    client = MongoClient(MONGO_URI_ATLAS)
    return client[MONGO_DB_NAME]
