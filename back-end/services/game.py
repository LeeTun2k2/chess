from bson import ObjectId
from database.mongodb import get_db
from random import randint
from common.constant import CHESS, XIANGQI, CHESS_FEN, XIANGQI_FEN
from datetime import datetime
from services.rating import rate_1vs1

class GameService():
    def __init__(self) -> None:
        self.db = get_db()
        self.users_collection = self.db['users']
        self.online_games_collection = self.db['online_games']
        self.friend_games_collection = self.db['friend_games']
        self.offline_games_collection = self.db['offline_games']

    def map(self, game):
        game["_id"] = str(game["_id"])
        return game

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
    
    def get_by_lobby_id(self, lobby_id):
        return self.online_games_collection.find_one({'lobby_id': ObjectId(lobby_id)})
    
    def get_by_tournament_id(self, tournament_id):
        games = self.online_games_collection.find({'tournament_id': ObjectId(tournament_id)})
        return [self.map(game) for game in games]

    def create_online_game(self, lobby, user):        
        random = randint(0, 1)
        game = {
            'lobby_id': lobby['_id'],
            'variant': lobby['variant'],
            'fen': CHESS_FEN if lobby['variant'] == CHESS else XIANGQI_FEN,
            'initial_time': lobby['initial_time'],
            'bonus_time': lobby['bonus_time'],
            'status': "STARTED",
            'created_at': datetime.now().isoformat(),
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
    
    def get_tv(self):
        # get all user
        users = list(self.users_collection.find())
        # to dictionary
        id_usernames = {}
        for user in users:
            id_usernames[str(user["_id"])] = user["username"]

        # games
        games = self.online_games_collection.find({'status': 'STARTED'}).sort('created_at', -1)
        res = []
        for game in games:
            game['white_username'] = id_usernames[game['white']]
            game['black_username'] = id_usernames[game['black']]
            res.append(self.map(game))
        return res
    
    def get_all(self):
        # get all user
        users = list(self.users_collection.find())
        # to dictionary
        id_usernames = {}
        for user in users:
            id_usernames[str(user["_id"])] = user["username"]

        # games
        games = self.online_games_collection.find().sort('created_at', -1)
        res = []
        for game in games:
            game['white_username'] = id_usernames[game['white']]
            game['black_username'] = id_usernames[game['black']]
            res.append(self.map(game))
        return res
    
    def draw(self, game_id):
        game = self.online_games_collection.find_one({'_id': ObjectId(game_id)})
        if game:
            self.online_games_collection.update_one(
                {'_id': ObjectId(game_id)},
                {'$set': {'status': 'DRAW'}}
            )
            return True
        else:
            return False

    def resign(self, game_id, player_resign_id):
        game = self.online_games_collection.find_one({'_id': ObjectId(game_id)})
        if game:
            # Determine the winner based on the player who didn't resign
            winner_id = game['white'] if str(game['white']) != player_resign_id else game['black']

            # Update game status and winner
            self.online_games_collection.update_one(
                {'_id': ObjectId(game_id)},
                {'$set': {'status': 'RESIGNED', 'winner': winner_id}}
            )
            return True
        else:
            return False

    def timeout(self, game_id, player_timeout_id):
        game = self.online_games_collection.find_one({'_id': ObjectId(game_id)})
        if game:
            # Determine the winner based on the player who didn't resign
            winner_id = game['white'] if str(game['white']) != player_timeout_id else game['black']

            # Update game status and winner
            self.online_games_collection.update_one(
                {'_id': ObjectId(game_id)},
                {'$set': {'status': 'TIMEOUT', 'winner': winner_id}}
            )
            return True
        else:
            return False

    def checkmate(self, game_id, player_win_id):
        # Get the game from the database
        game = self.online_games_collection.find_one({'_id': ObjectId(game_id)})

        # Check if the game exists
        if game:
            # Update game status and winner
            self.online_games_collection.update_one(
                {'_id': ObjectId(game_id)},
                {'$set': {'status': 'CHECKMATE', 'winner': player_win_id}}
            )
            return True  # Return True to indicate successful checkmate
        else:
            return False  # Return False if the game doesn't exist

