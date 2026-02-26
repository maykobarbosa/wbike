import urllib.request
import io
import os
from PIL import Image
import numpy as np

# Download the logo from the blob URL
url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_00000000897071f59e325b5bf6295766-2o8DjrptIRIeGj4AIPL46WpmFCq7U3.png"
print("Downloading logo...")
response = urllib.request.urlopen(url)
img_data = response.read()
print(f"Downloaded {len(img_data)} bytes")

img = Image.open(io.BytesIO(img_data)).convert("RGBA")
print(f"Image size: {img.size}")
data = np.array(img)

r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]

# White and near-white pixels (threshold 230+)
white_mask = (r > 230) & (g > 230) & (b > 230)

# Set alpha to 0 for white pixels
data[white_mask, 3] = 0

# For light gray border pixels, create a smooth fade
light_mask = (r > 200) & (g > 200) & (b > 200) & ~white_mask
brightness = (r.astype(float) + g.astype(float) + b.astype(float)) / 3.0
alpha_values = np.clip((255 - brightness) * 4, 0, 255).astype(np.uint8)
data[light_mask, 3] = alpha_values[light_mask]

result = Image.fromarray(data)

# Save to current working directory
output_path = "logo-nobg.png"
result.save(output_path, "PNG")
print(f"Saved to: {os.path.abspath(output_path)}")
print(f"File size: {os.path.getsize(output_path)} bytes")
