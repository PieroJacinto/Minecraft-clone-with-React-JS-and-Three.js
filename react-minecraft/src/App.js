import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Ground } from "./components/Ground";
import { Player } from "./components/Player";
import {FPV} from "./components/FPV"

function App() {
  return (
    <>
      <div className="text-center"> Creado por Piero Jacinto </div>
      <Canvas>
        {/* posicion del sol ejes x,y y z */}
        <Sky sunPosition={[100, 100, 20]} />
        {/* para iluminar cada supérficie 3d con props intensity */}
        <ambientLight intensity={0.5} />
        {/* agregamos la vista del jugador */}
        <FPV /> 

        {/* importando de canon  */}
        <Physics>
          <Ground />
          <Player />
        </Physics>
      </Canvas>
      {/* agregamos un marcador que centre la vista de lo que el player ve */}
      <div className="absolute centered cursor">+</div>
    </>
  );
}

export default App;
