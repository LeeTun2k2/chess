from bson import ObjectId
from database.mongodb import get_db
from datetime import datetime

class LobbyService():
    def __init__(self) -> None:
        self.db = get_db()
        self.lobbies_collection = self.db['lobbies']

    def map_lobby(self, lobby):
        lobby['_id'] = str(lobby['_id'])
        if lobby['created_at']:
            lobby['created_at'] = lobby['created_at'].isoformat()
        return lobby

    def create_lobby(self, lobby, player_id):
        lobby["player_id"] = player_id
        lobby["status"] = "OPEN"
        lobby["created_at"] = datetime.now()
        result = self.lobbies_collection.insert_one(lobby)
        return self.map_lobby(self.lobbies_collection.find_one({'_id': result.inserted_id}))
    
    def get_lobby(self, lobby_id):
        return self.map_lobby(self.lobbies_collection.find_one({'_id': ObjectId(lobby_id)}))
    
    def get_all_open_lobbies(self):
        data = self.lobbies_collection.find({'status': 'OPEN', 'mode': 'ONLINE'}).sort('created_at', 1)
        data = [self.map_lobby(lobby) for lobby in data]
        return data
    
    def close_lobby(self, lobby_id):
        self.lobbies_collection.update_one({'_id': ObjectId(lobby_id)}, {'$set': {'status': 'closed'}})
