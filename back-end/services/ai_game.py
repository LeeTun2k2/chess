from bson import ObjectId
from database.mongodb import get_db
from database.redis import get_redis
from random import randint
import requests
import json

STOCKFISH_URL = 'https://chess.workon.space/stockfish'
class AiGameService():
    def __init__(self) -> None:
        self.db = get_db()
        self.redis = get_redis()
        self.users_collection = self.db['users']
        self.ai_games_collection = self.db['ai_games']

    def map(self, game):
        game["_id"] = str(game["_id"])
        return game

    def create(self, user_id, game):
        game['status'] = "STARTED"
        random = randint(0, 1)
        if random == 0:
            game['white'] = 'ai'
            game['black'] = user_id
        else:
            game['white'] = user_id
            game['black'] = 'ai'
        
        result = self.ai_games_collection.insert_one(game)
        game_data = self.get(result.inserted_id)
        game_data["_id"] = str(game_data["_id"])
        return game_data
        
    def get(self, game_id):
        game = self.ai_games_collection.find_one({'_id': ObjectId(game_id)})
        
        if game:
            game["_id"] = str(game["_id"])
            return game
        return None
    
    def draw(self, game_id):
        game = self.ai_games_collection.find_one({'_id': ObjectId(game_id)})
        if game:
            self.ai_games_collection.update_one(
                {'_id': ObjectId(game_id)},
                {'$set': {'status': 'DRAW'}}
            )

    def resign(self, game_id):
        game = self.ai_games_collection.find_one({'_id': ObjectId(game_id)})
        if game:
            self.ai_games_collection.update_one(
                {'_id': ObjectId(game_id)},
                {'$set': {'status': 'RESIGNED', 'winner': 'ai'}}
            )

    def checkmate(self, game_id, player_win_id):
        game = self.ai_games_collection.find_one({'_id': ObjectId(game_id)})

        if game:
            self.ai_games_collection.update_one(
                {'_id': ObjectId(game_id)},
                {'$set': {'status': 'CHECKMATE', 'winner': player_win_id}}
            )

    def cache_move(self, fen, moves, white_time, black_time):
        pass

    def request_ai_move(self, game_id, fen):
        game = self.ai_games_collection.find_one({'_id': ObjectId(game_id)})
        if game:
            level = game["Ai_level"]
            payload = {
                'fen': fen,
                'depth': level
            }
            response = requests.post(f'{STOCKFISH_URL}/generate-move', json=payload)
            if response.status_code == 200: 
                dict_response = json.loads(response.content)
                return dict_response["best_move"]
            else:
                raise Exception('Fail to generate move')

