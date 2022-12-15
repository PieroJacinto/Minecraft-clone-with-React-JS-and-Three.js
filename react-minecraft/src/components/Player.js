import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";

const JUMP_FORCE = 10;
export const Player = () => {
  const actions = useKeyboard();
  // log para ver las teclas que presionamos en consola
  console.log(
    "actions",
    Object.entries(actions).filter(([k, v]) => v)
  );
  const { camera } = useThree();

  //   creamos una esfera con gravedad y movimiento, el segundo valor de position hace que se cree a 1 de distancia del ground para no collapsar
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 1, 0],
  }));

  //   velocidad de movimiento
  // creamos velocidad de referencia
  const vel = useRef([0, 0, 0]);

  //   hacemos que esa velocidad de referencia siga a la esfera
  useEffect(() => {
    api.velocity.subscribe((v) => (vel.current = v));
  }, [api.velocity]);

  // creamos posicion de ref
  const pos = useRef([0, 0, 0]);
  //   hacemos que esa posicion de referencia siga a la esfera
  useEffect(() => {
    api.position.subscribe((p) => (pos.current = p));
  }, [api.position]);

  useFrame(() => {
    // hacemos que la camara siga a la posicion de referencia
    camera.position.copy(
      new Vector3(pos.current[0], pos.current[1], pos.current[2])
    );
    // seteamos la velocidad
    if (actions.jump) {
      api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
    }
  });

  return <mesh ref={ref}></mesh>;
};
