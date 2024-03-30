from app.stockfish import get_stockfish

def generate_move(fen, depth=10):
    stockfish = get_stockfish(fen=fen, depth=depth)
    best_move = stockfish.get_best_move()
    return best_move

def generate_top_moves(fen, depth, n):
    stockfish = get_stockfish(fen=fen, depth=depth)
    moves = stockfish.get_top_moves()
    return moves
    