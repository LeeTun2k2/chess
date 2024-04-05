from bson import ObjectId
from database.mongodb import get_db
from datetime import datetime

class PuzzleService():
    def __init__(self) -> None:
        self.db = get_db()
        self.puzzles_collection = self.db['puzzles']

    def map_puzzle(self, puzzle):
        puzzle['_id'] = str(puzzle['_id'])
        if puzzle['created_at']:
            puzzle['created_at'] = puzzle['created_at'].isoformat()
        return puzzle

    def create_puzzle(self, variant, fen, puzzle_type, moves, eval, player_id):
        puzzle = {
            "variant": variant,
            "fen": fen,
            "type": puzzle_type,
            "moves": moves,
            "eval": eval,
            "player_id": str(player_id),
            "created_at": datetime.now()
        }
        result = self.puzzles_collection.insert_one(puzzle)
        return self.map_puzzle(self.puzzles_collection.find_one({'_id': result.inserted_id}))

    def get_puzzle(self, puzzle_id):
        return self.map_puzzle(self.puzzles_collection.find_one({'_id': ObjectId(puzzle_id)}))

    def get_all_open_puzzles(self):
        data = self.puzzles_collection.find({'status': 'OPEN'}).sort('created_at', -1)
        data = [self.map_puzzle(puzzle) for puzzle in data]
        return data

    def close_puzzle(self, puzzle_id):
        self.puzzles_collection.update_one({'_id': ObjectId(puzzle_id)}, {'$set': {'status': 'CLOSED'}})
