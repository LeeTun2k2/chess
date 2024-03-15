from bson import ObjectId
from database.mongodb import get_db

class GameService():
    def __init__(self) -> None:
        self.db = get_db()
        self.online_games_collection = self.db['online_games']
        self.friend_games_collection = self.db['friend_games']
        self.offline_games_collection = self.db['offline_games']

    def create_game(self, game, mode):
        if mode == 'online':
            return self.online_games_collection.insert_one(game)
        elif mode == 'friend':
            return self.friend_games_collection.insert_one(game)
        elif mode == 'offline':
            return self.offline_games_collection.insert_one(game)
        else:
            raise Exception('Invalid game mode')
        
    def get_game(self, game_id, mode):
        if mode == 'online':
            return self.online_games_collection.find_one({'_id': ObjectId(game_id)})
        elif mode == 'friend':
            return self.friend_games_collection.find_one({'_id': ObjectId(game_id)})
        elif mode == 'offline':
            return self.offline_games_collection.find_one({'_id': ObjectId(game_id)})
        else:
            raise Exception('Invalid game mode')
        
    def update_game(self, game_id, game, mode):
        if mode == 'online':
            self.online_games_collection.update_one({'_id': ObjectId(game_id)}, {'$set': game})
        elif mode == 'friend':
            self.friend_games_collection.update_one({'_id': ObjectId(game_id)}, {'$set': game})
        elif mode == 'offline':
            self.offline_games_collection.update_one({'_id': ObjectId(game_id)}, {'$set': game})
        else:
            raise Exception('Invalid game mode')
        
    def delete_game(self, game_id, mode):
        if mode == 'online':
            self.online_games_collection.delete_one({'_id': ObjectId(game_id)})
        elif mode == 'friend':
            self.friend_games_collection.delete_one({'_id': ObjectId(game_id)})
        elif mode == 'offline':
            self.offline_games_collection.delete_one({'_id': ObjectId(game_id)})
        else:
            raise Exception('Invalid game mode')
