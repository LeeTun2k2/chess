import subprocess
import re
from app.stockfish import get_stockfish
from time import sleep

def generate_move(fen, depth=10):
    stockfish = get_stockfish(fen=fen, depth=depth)
    best_move = stockfish.get_best_move()
    return best_move

def generate_top_moves(fen, depth, n):
    stockfish = get_stockfish(fen=fen, depth=depth)
    moves = stockfish.get_top_moves()
    return moves
    
def generate_puzzles():
    with open('./positions.epd', 'w') as file:
      subprocess.run(['python', './app/generator/generator.py', '--engine', './stockfish'], stdout=file)
    sleep(1)
    with open('./puzzles.epd', 'w') as file:
      subprocess.run(['python', './app/generator/puzzler.py', '--engine', './stockfish', './positions.epd'], stdout=file)
    sleep(1)
    with open('./puzzles.pgn', 'w') as file:
      subprocess.run(['python', './app/generator/pgn.py', './puzzles.epd'], stdout=file)
    sleep(1)

    with open('./puzzles.pgn', 'r') as file:
        content = file.read()
    
    moves = []
    fens = []
    fen_pattern = r'\[FEN\s*"([^"]+)"\]'
    move_pattern = r'(\d+\.\s)?([KQRBN]?[a-h]?[1-8]?[x]?[a-h][1-8][+#]?|[O0]-[O0])'
    lines = content.split('\n')
    for line in lines:
        if len(line) < 2:
           continue

        if "FEN" in line:
            fen_match = re.search(move_pattern, line)
            if fen_match:
                fen = fen_match.group(1)
                fens.append(str(fen))
            continue

        if "[" not in line:
            moves.append(line)
            continue
    return moves, fens