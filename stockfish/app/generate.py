import subprocess
from app.stockfish import get_stockfish

def generate_move(fen, depth=10):
    stockfish = get_stockfish(fen=fen, depth=depth)
    best_move = stockfish.get_best_move()
    return best_move

def generate_top_moves(fen, depth, n):
    stockfish = get_stockfish(fen=fen, depth=depth)
    moves = stockfish.get_top_moves()
    return moves
    
def generate_puzzles():
    subprocess.run(['python', './app/generator/generator.py', '--engine', './stockfish'])
    subprocess.run(['python', './app/generator/puzzler.py', '--engine', './stockfish', './positions.epd'])
    subprocess.run(['python', './app/generator/pgn.py', './puzzles.epd'])
    with open('./puzzles.pgn', 'r') as file:
        file_content = file.read()
    pgns = file_content.split('\n\n')
    return pgns