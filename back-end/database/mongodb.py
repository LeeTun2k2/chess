from pymongo import MongoClient

class MongoDB:
    def __init__(self, app=None):
        self.client = None

        if app is not None:
            self.init_app(app)

    def init_app(self, app):
        mongo_uri = app.config.get('MONGO_URI', 'mongodb://localhost:27017/')
        self.client = MongoClient(mongo_uri)
        app.mongo = self
        self.db = self.client[app.config.get('MONGO_DB_NAME', 'chess')]

def get_mongo():
    return MongoDB()
