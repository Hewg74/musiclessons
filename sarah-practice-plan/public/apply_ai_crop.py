import shutil
from PIL import Image
import os

def apply_ai_icon():
    base_dir = "c:/Users/hewg7/Documents/GitHub/musiclessons/sarah-practice-plan/public"
    # Wait, the tool response gives the exact path
    ai_img_path = r"C:\Users\hewg7\.gemini\antigravity\brain\d22fd789-4a2c-4ebc-9710-1f7de79e04f5\white_background_icon_1773365626955.png"
    
    img_path = f"{base_dir}/icon-jungle.png"
    
    # Open the AI generated image
    if not os.path.exists(ai_img_path):
        print("AI image not found.")
        return
        
    img = Image.open(ai_img_path).convert("RGBA")
    
    # Save the main icon
    img.resize((512, 512), Image.Resampling.LANCZOS).save(img_path)
    
    # Save the manifest icons
    manifest_192 = f"{base_dir}/manifest-icon-192.maskable.png"
    manifest_512 = f"{base_dir}/manifest-icon-512.maskable.png"
    apple_180 = f"{base_dir}/apple-icon-180.png"
    
    img.resize((192, 192), Image.Resampling.LANCZOS).save(manifest_192)
    img.resize((512, 512), Image.Resampling.LANCZOS).save(manifest_512)
    img.resize((180, 180), Image.Resampling.LANCZOS).save(apple_180)
    
    print("Successfully replaced icons with AI generated white background version.")

if __name__ == "__main__":
    apply_ai_icon()
