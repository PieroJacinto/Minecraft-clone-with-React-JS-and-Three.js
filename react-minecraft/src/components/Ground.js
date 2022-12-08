import { usePlane } from "@react-three/cannon"
import { groundTexture } from "../images/textures"
import { useStore } from '../hooks/useStore'

export const Ground = () => {
	const [ref] = usePlane(() => ({
		// -Math.PI / 2 es para rotar la vista a 90 grados, ya que PI Es 180 grados y el menos es para invertirlo
		rotation: [-Math.PI / 2, 0, 0], position: [0, -0.5, 0]
	}))

	// para que el terreno se repita y no se expanda
	groundTexture.repeat.set(100, 100)

	return (
		<mesh ref={ref}>
		{/* gemoetry, args son las 2 dimensiones */}
			<planeBufferGeometry attach='geometry' args={[100, 100]} />
			<meshStandardMaterial attach='material' map={groundTexture} />
		</mesh>
	)
}