import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
export const Player = () => {
  const { camera } = useThree();

//   creamos una esfera con gravedad y movimiento, el segundo valor de position hace que se cree a 1 de distancia del ground para no collapsar
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 1, 0],
  }));

// creamos posicion de ref
  const pos = useRef([0, 0, 0]);
//   hacemos que esa posicion de referencia siga a la esfera
  useEffect(() => {
    api.position.subscribe((p) => (pos.current = p));
  }, [api.position]);
// hacemos que la camara siga a la posicion de referencia
  useFrame(() => {
    camera.position.copy(
      new Vector3(pos.current[0], pos.current[1], pos.current[2])
    );
  });
  return <mesh ref={ref}></mesh>;
};
