import { useCallback, useEffect, useState } from "react";

// creamos una funcion para manejar las acciones
function actionByKey(key) {
  const keyActionMap = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    Space: "jump",
    Digit1: "dirt",
    Digit2: "grass",
    Digit3: "glass",
    Digit4: "wood",
    Digit5: "log",
  };
  return keyActionMap[key];
}
export const useKeyboard = () => {
  // creamos un estado inicial
  const [actions, setActions] = useState({
    // mapeamos las teclas
    moveForward: false,
    moveBacward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    texture1: false,
    texture2: false,
    texture3: false,
    texture4: false,
    texture5: false,
  });
  
  // chequeamos para reaccionar solo a las teclas que estamos escuchando
  const handleKeyDown = useCallback((e) => {
    const action = actionByKey(e.code);
    if (action) {
      // establecemos el movimiento previo y seteamos el nuevo
      setActions((prev) => {
        return {
          ...prev,
          [action]: true,
        };
      });
    }
  }, []);

  const handleKeyUp = useCallback((e) => {
    const action = actionByKey(e.code);
    if (action) {
      setActions((prev) => {
        return {
          ...prev,
          [action]: false,
        };
      });
    }
  }, []);

  useEffect(() => {
    // capturamos las teclas y les asignamos una funcion para manejarlas
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    // hacemos un return para q no siga infinitamente y corte
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);
  return actions;
};
