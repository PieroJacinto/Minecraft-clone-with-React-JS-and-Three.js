// esto hace un seguimiento del estado del juego
import { CubicInterpolant } from "three";
import create from "zustand";
import { nanoid } from "nanoid";
export const useStore = create((set) => ({
  // hacemos un seguimineto de texture
  texture: "dirt",
  // hacemos un seguimineto de los cubos que el jugador puede crear y ubicar
  cubes: [],
  // declaramos los metodos que vamos a usar para interactuar con los estados
  addCube: (x, y, z) => {
    // cada vez que alguien quiere agregar un CubicInterpolant, llamamos a set que primero llama a un callback nos trae el estado previo
    set((prev) => ({
      cubes: [
        ...prev.cubes,
        // agregamos un nuevo cubo
        {
            key:nanoid(),
            pos: [x,y,z],
            texture: prev.texture,
        }
    ],
    }));
  },
  removeCube: () => {},
  setTexture: () => {},
  saveWorld: () => {},
  resetWorld: () => {},
}));
