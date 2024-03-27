from flask import Blueprint, request, send_from_directory, jsonify
import os

# Create a blueprint for image-related routes
image_bp = Blueprint('image', __name__)

# Define the upload folder
UPLOAD_FOLDER = 'uploads/images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Function to check if the file extension is allowed
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@image_bp.route('/api/images/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return 'No file part', 400

    file = request.files['file']

    if file.filename == '':
        return 'No selected file', 400

    if file and allowed_file(file.filename):
        filename = file.filename
        file.save(os.path.join(UPLOAD_FOLDER, filename))
        return jsonify({"image": f"/images/{filename}"}), 200
    else:
        return 'Invalid file type', 400

@image_bp.route('/api/images/<filename>', methods=['GET'])
def download_image(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)
