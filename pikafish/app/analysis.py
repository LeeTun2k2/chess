from app.pikafish import get_pikafish

def get_evaluation(fen):
    pikafish = get_pikafish(fen=fen)
    return pikafish.get_evaluation()

def get_evaluation_pgn(pgn):
    pikafish = get_pikafish()
    moves = pgn.split()
    evaluations = []
    for move in moves:
        pikafish.make_moves_from_current_position([move])
        evaluation = pikafish.get_evaluation()
        evaluations.append(evaluation)
    return evaluations