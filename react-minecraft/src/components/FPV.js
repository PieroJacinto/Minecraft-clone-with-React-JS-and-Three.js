import { PointerLockControls } from "@react-three/drei";
import { useThree } from "react-three-fiber";

// First Player View con react-three-fiber
export const FPV = () => {
// conectamos a la camara
    const {camera, gl} = useThree()

    return (<PointerLockControls args ={[camera, gl.domElement]} />)
}   