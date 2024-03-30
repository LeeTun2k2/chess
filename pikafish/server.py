from flask import Flask, jsonify, request
from app.game import get_parameters, get_board_visual

app = Flask(__name__)

@app.get('/')
def index():
    try:
        parameters = get_parameters()
        board = get_board_visual()
        return {"parameters": parameters, "board": board}, 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555, debug=False)
