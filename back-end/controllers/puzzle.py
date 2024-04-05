from flask import Blueprint, jsonify, request
from services.puzzle import PuzzleService
from flask_jwt_extended import jwt_required, get_jwt_identity

puzzle_bp = Blueprint('puzzle', __name__)
puzzle_service = PuzzleService()

@puzzle_bp.get('/api/puzzle/generate-chess')
def generate_chess_puzzles_api():
    try:
        moves, fens = puzzle_service.generate_chess_puzzles()
        no_records = puzzle_service.save_puzzles("CHESS", moves, fens)
        return jsonify({
            "message": "Success",
            "no_records": no_records
        }), 200
    except Exception as e:
        return str(e), 500