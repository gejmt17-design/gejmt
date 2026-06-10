import sys
import subprocess
from PIL import Image

def crop_watermark(input_path, output_path):
    img = Image.open(input_path)
    width, height = img.size
    
    # The Gemini watermark is typically in the bottom right corner.
    # Cropping 40 pixels off the right and bottom should be enough.
    crop_pixels = 40
    
    # Calculate the new bounding box (left, upper, right, lower)
    box = (0, 0, width - crop_pixels, height - crop_pixels)
    
    cropped_img = img.crop(box)
    cropped_img.save(output_path, quality=95)
    print(f"Image saved to {output_path}")

input_img = r"c:\Users\NTB-02\.gemini\antigravity\brain\f36892b1-00bf-4c85-97fe-da5adda4ec9d\media__1781087013802.jpg"
output_img = r"c:\Users\NTB-02\Desktop\web\img\booking.jpg"

crop_watermark(input_img, output_img)
