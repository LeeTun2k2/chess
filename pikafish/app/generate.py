from app.pikafish import get_pikafish

def generate_move(fen, depth=10):
    pikafish = get_pikafish(fen=fen, depth=depth)
    best_move = pikafish.get_best_move()
    return best_move

def generate_top_moves(fen, depth, n):
    pikafish = get_pikafish(fen=fen, depth=depth)
    moves = pikafish.get_top_moves()
    return moves
    