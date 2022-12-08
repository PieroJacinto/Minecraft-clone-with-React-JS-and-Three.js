import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <>
    <div className="text-center"> Creado por Piero Jacinto </div>
      <Canvas>
      {/* posicion del sol ejes x,y y z */}
        <Sky sunPosition={[100, 100, 20]} />
        {/* para iluminar cada supérficie 3d con props intensity */}
        <ambientLight intensity={0.5} />
       
        {/* improtando de canon  */}
        <Physics>
         
        </Physics>
      </Canvas>       
     
    </>
  );
}

export default App;
