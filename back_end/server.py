from flask import Flask, request, jsonify
import numpy as np
from PIL import Image
import io
from flask_cors import CORS
from tensorflow.keras.models import load_model
from preprocess import read_images

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024  # Limit file size to 1MB
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg'}

model = load_model('kidney_model.h5')
label_dict = {0: 'Cyst', 1: 'Normal', 2: 'Stone', 3: 'Tumor'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def preprocess_image(image):
    processed_image = read_images(image)
    processed_image = np.expand_dims(processed_image, axis=0)  # Shape becomes (1, 28, 28, 3)
    return processed_image

@app.route('/api/predict', methods=['POST'])
def predict_tumor():
    try:
        print(f"Request files: {request.files}")  # Log the request files
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']

        # Check the file extension
        if not allowed_file(file.filename):
            return jsonify({'error': 'File type not allowed. Only PNG, JPG, JPEG, and GIF are supported.'}), 400

        # Read the image file
        image_data = file.read()
        image = Image.open(io.BytesIO(image_data))

        # Preprocess the image
        processed_image = preprocess_image(image)

        # Pass the processed image to your ML model
        prediction = model.predict(processed_image)
        prediction = np.argmax(prediction)
        prediction = label_dict[prediction]

        response = {
            'message': 'Image processed successfully',
            'image_size': image.size,
            'processed_shape': processed_image.shape,
            'prediction': prediction
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
