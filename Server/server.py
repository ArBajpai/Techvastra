from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import base64
from io import BytesIO
from PIL import Image

app = Flask(__name__)
CORS(app)

def overlay_fabric(dress_img, fabric_img):
    # Convert images to NumPy arrays
    dress_img_np = np.array(dress_img)
    fabric_img_np = np.array(fabric_img)

    # Ensure both images are 3-channel (if color images)
    if len(dress_img_np.shape) != 3 or dress_img_np.shape[2] != 3:
        raise ValueError("Input dress image must be a 3-channel color image (BGR or RGB)")

    if len(fabric_img_np.shape) != 3 or fabric_img_np.shape[2] != 3:
        raise ValueError("Input fabric image must be a 3-channel color image (BGR or RGB)")

    # Resize fabric image to match dress image size
    fabric_resized = cv2.resize(fabric_img_np, (dress_img_np.shape[1], dress_img_np.shape[0]))

    # Convert dress image to grayscale and create mask
    dress_gray = cv2.cvtColor(dress_img_np, cv2.COLOR_BGR2GRAY)
    _, dress_mask = cv2.threshold(dress_gray, 1, 255, cv2.THRESH_BINARY)

    # Invert dress mask to get area outside the dress
    dress_mask_inv = cv2.bitwise_not(dress_mask)

    # Apply dress mask to fabric image
    fabric_with_dress_color = cv2.bitwise_and(fabric_resized, fabric_resized, mask=dress_mask)

    # Add the fabric with the dress color
    dress_with_fabric = cv2.bitwise_or(dress_img_np, fabric_with_dress_color)

    return dress_with_fabric

@app.route('/apply-fabric', methods=['POST'])
def apply_fabric():
    dress_image = request.files.get('dressImage')
    fabric_image = request.files.get('fabricImage')

    if not dress_image or not fabric_image:
        return 'Missing images', 400

    dress_image = Image.open(dress_image).convert('RGB')
    fabric_image = Image.open(fabric_image).convert('RGB')

    result_image = overlay_fabric(dress_image, fabric_image)

    # Convert result image to JPEG format for sending as response
    _, buffer = cv2.imencode('.jpg', result_image)
    result_image_str = base64.b64encode(buffer).decode('utf-8')

    return jsonify({'resultImage': result_image_str})

if __name__ == '__main__':
    app.run(debug=True)
