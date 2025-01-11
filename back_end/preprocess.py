import cv2
import numpy as np

def read_images(img):
    # Convert PIL image to NumPy array
    img = np.array(img)
    # Resize image to 28x28
    img = cv2.resize(img, (28, 28))
    # Check if image is grayscale (2D array), and convert to 3 channels if necessary
    if len(img.shape) == 2:  # Grayscale image
        img = np.dstack([img, img, img])
    elif img.shape[2] == 1:  # If it's a single channel image (e.g., BGRA)
        img = np.dstack([img, img, img])
    
    # Convert from BGR to RGB
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    # Normalize pixel values to [0, 1]
    img = img / 255.0
    return img

