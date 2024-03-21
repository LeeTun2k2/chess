from bson import ObjectId
from database.mongodb import get_db
from random import randint
from common.constant import CHESS, XIANGQI, CHESS_FEN, XIANGQI_FEN

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
        game = None
        if mode == 'online':
            game = self.online_games_collection.find_one({'_id': ObjectId(game_id)})
        elif mode == 'friend':
            game = self.friend_games_collection.find_one({'_id': ObjectId(game_id)})
        elif mode == 'offline':
            game = self.offline_games_collection.find_one({'_id': ObjectId(game_id)})
        else:
            raise Exception('Invalid game mode')
    
        if game:
            game["_id"] = str(game["_id"])
            return game
        return None
        
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
        
    def create_online_game(self, lobby, user):
        random = randint(0, 1)
        game = {
            'variant': lobby['variant'],
            'fen': CHESS_FEN if lobby['variant'] == CHESS else XIANGQI_FEN,
            'initial_time': lobby['initial_time'],
            'bonus_time': lobby['bonus_time'],
        }

        if random == 0:
            game['white'] = lobby['player_id']
            game['black'] = user.id
        else:
            game['white'] = user.id
            game['black'] = lobby['player_id']
        
        result = self.online_games_collection.insert_one(game)
        game_data = self.get_game(result.inserted_id, 'online')
        game_data["_id"] = str(game_data["_id"])
        return game_data
