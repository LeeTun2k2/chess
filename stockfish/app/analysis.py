from app.stockfish import get_stockfish

def get_evaluation(fen):
    stockfish = get_stockfish(fen=fen)
    return stockfish.get_evaluation()

def get_evaluation_pgn(pgn):
    stockfish = get_stockfish()
    moves = pgn.split()
    evaluations = []
    for move in moves:
        stockfish.make_moves_from_current_position([move])
        evaluation = stockfish.get_evaluation()
        evaluations.append(evaluation)
    return evaluations