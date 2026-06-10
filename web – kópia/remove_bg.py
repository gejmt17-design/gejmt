import sys
import subprocess

try:
    from PIL import Image
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow"])
    from PIL import Image

def remove_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        r, g, b, a = item
        
        # The logo is blue. The fake checkerboard is white/gray.
        # Blue has a high B value compared to R and G.
        # Also let's keep some anti-aliasing if possible, or just a hard threshold for now.
        if b > r + 15 and b > g + 15:
            # It's blueish, keep it
            newData.append(item)
        else:
            # It's background, make it transparent
            newData.append((255, 255, 255, 0))
            
    img.putdata(newData)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_background(r"c:\Users\NTB-02\Desktop\web\img\logo.jpg", r"c:\Users\NTB-02\Desktop\web\img\logo.png")
    print("Background removed and saved to logo.png")
