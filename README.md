# 🏠 3D Interactive Room (Vite + Three.js)
![Demo](https://github.com/user-attachments/assets/29e02ec9-0c4c-406b-9609-d3a59c2cb8d6)


This project is a fully interactive **3D room** built with **Vite** and **Three.js**.  
Everything is textured, dynamic, and feels alive — from the wooden floors and walls to the furniture, lights, and even a little cat! 🐱✨  
**Note: Models and textures are not included to keep the repository lightweight.**


## 🚀 Features

- **High-quality textures** for floor, walls, furniture, and decorations.  
- **Interactive lighting**: click the light switch to turn the room’s lamp **on/off**. The whole atmosphere changes instantly 💡🕹️.  
- **Custom 3D models**: bed 🛏️, books 📚, sofa 🛋️, cat 🐱, and more — imported via `GLTFLoader`.  
- **Wall lamp that reacts**: visually switches between glowing 🌟 and turned off ⚫.  
- **Keyboard controls**:
  - `W / S` → Move forward/backward 🏃‍♂️  
  - `A / D` → Move left/right ↔️  
  - `Q` → Rotate around the scene 🔄  
  - `R` → Reset camera to default view 🔁  
- **OrbitControls** for smooth camera navigation.  
- **Dynamic 3D text** with beveled edges and metallic shading ✨.  
- **Ceiling, walls, and flooring** fully modeled with realistic PBR maps (color, roughness, normal, displacement).  
- **Animated objects**: rotating 3D text and other interactive elements 🎢.  


## 🛠️ Tech Stack
- [Three.js](https://threejs.org/) — 3D rendering engine 🌌  
- [Vite](https://vitejs.dev/) — blazing fast build tool ⚡  
- `GLTFLoader`, `FontLoader`, `TextGeometry` for custom models and fonts 🖋️  
- PBR textures for realistic surfaces 🎨  

## 🌌 Preview
Even without the original textures and models, the code handles:
Camera movement and rotation 🏃‍♂️
Interactive lighting logic 💡
3D text and basic scene setup 🪵

## 📌 Notes*
Models and textures are not included. To see the full experience, add your own .glb files and textures or use the links provided in the original project.
This lightweight version is perfect for reviewing the code, learning the implementation, or showing off logic and structure without large files.
✨ Built for learning, portfolio, and fun with Three.js magic ✨

## 🎮 How to Run

```bash
# Clone the repo
git clone https://github.com/elunedfaezeh/3Droom.git

# Install dependencies
npm install

# Start the dev server
npm run dev


