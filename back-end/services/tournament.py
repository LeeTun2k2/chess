from bson import ObjectId
from database.mongodb import get_db
from datetime import datetime

class TournamentService():
    def __init__(self) -> None:
        self.db = get_db()
        self.tournaments_collection = self.db['tournaments']

    def map(self, tournament):
        tournament['_id'] = str(tournament['_id'])
        if tournament['created_at']:
            tournament['created_at'] = tournament['created_at'].isoformat()
        if tournament['updated_at']:
            tournament['updated_at'] = tournament['updated_at'].isoformat()
        return tournament

    def get_all(self):
        data = self.tournaments_collection.find({}).sort('updated_at', -1)
        data = [self.map(tournament) for tournament in data]
        return data
    
    def get(self, _id):
        return self.map(self.tournaments_collection.find_one({'_id': ObjectId(_id)}))

    def create(self, tournament):
        if '_id' in tournament:
            raise ValueError("Cannot create a tournament with an existing _id")

        tournament["created_at"] = datetime.now()
        tournament["updated_at"] = datetime.now()
        result = self.tournaments_collection.insert_one(tournament)
        return self.map(self.tournaments_collection.find_one({'_id': result.inserted_id}))
    
    def update(self, _id, tournament):
        existing_tournament = self.tournaments_collection.find_one({'_id': ObjectId(_id)})
        if not existing_tournament:
            return None  

        if '_id' in tournament:
            del tournament['_id'] 

        tournament["updated_at"] = datetime.now()

        result = self.tournaments_collection.update_one({'_id': ObjectId(_id)}, {'$set': tournament})
        if result.modified_count == 0:
            return False
        return True

    def delete(self, tournament_id):
        result = self.tournaments_collection.delete_one({'_id': ObjectId(tournament_id)})
        return result.deleted_count > 0