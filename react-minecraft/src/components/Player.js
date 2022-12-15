import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";

const JUMP_FORCE = 4;
const SPEED = 4;
export const Player = () => {
  const { moveBackward, moveForward, moveRight, moveLeft, jump } =
    useKeyboard();

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
    // seteamos para movernos en una direccion 
    const direction = new Vector3()
    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );

    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    direction
      .subVectors(frontVector,sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation)

    // ahora aplicamos el vector de velocidad a la esfera, el eje y se queda igual porq estamos moviendonos solo atras y adelante
    api.velocity.set(direction.x,vel.current[1],direction.z)
    // seteamos la velocidad y nos fijamos que el personaje este en el suelo para no volver a saltar en el aire indefinidamente
    if (jump && Math.abs(vel.current[1] < 0.05 )) {
      api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
    }
  });

  return <mesh ref={ref}></mesh>;
};
