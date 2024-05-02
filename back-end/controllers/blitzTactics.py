from flask import Blueprint, jsonify, redirect
from flask_jwt_extended import jwt_required

blitztactic_bp = Blueprint('blitztactics', __name__)

BLITZ_TACTICS_URL = "blitz-tactics:3000"

@blitztactic_bp.route('/api/blitz-tactics/haste', methods=['GET'])
def pass_haste():
    try:
        return redirect(f"{BLITZ_TACTICS_URL}/haste")
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
@blitztactic_bp.route('/api/blitz-tactics/three', methods=['GET'])
def pass_three():
    try:
        return redirect(f"{BLITZ_TACTICS_URL}/three")
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
@blitztactic_bp.route('/api/blitz-tactics/countdown', methods=['GET'])
def pass_countdown():
    try:
        return redirect(f"{BLITZ_TACTICS_URL}/countdown")
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
@blitztactic_bp.route('/api/blitz-tactics/speedrun', methods=['GET'])
def pass_speedrun():
    try:
        return redirect(f"{BLITZ_TACTICS_URL}/speedrun")
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
@blitztactic_bp.route('/api/blitz-tactics/rated', methods=['GET'])
def pass_rated():
    try:
        return redirect(f"{BLITZ_TACTICS_URL}/rated")
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
@blitztactic_bp.route('/api/blitz-tactics/infinity', methods=['GET'])
def pass_infinity():
    try:
        return redirect(f"{BLITZ_TACTICS_URL}/infinity")
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
@blitztactic_bp.route('/api/blitz-tactics/repetition', methods=['GET'])
def pass_repetition():
    try:
        return redirect(f"{BLITZ_TACTICS_URL}/repetition")
    except Exception as e:
        return jsonify({"message": str(e)}), 500