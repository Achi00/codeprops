/* eslint-disable */
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, DepthOfField, Bloom } from '@react-three/postprocessing'

function Shape(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))

  return (
    <mesh
      {...props}
      ref={ref}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
      scale={hovered ? 1.5 : 1}
      >
      <sphereGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'23BBC2'} wireframe />
    </mesh>
  )
}


export default function Three() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Shape position={[-2, 1, 0]} />
      <Shape position={[2, -1, 0]} />
      <Shape position={[-4, -1, 0]} />
      <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={0.7} height={300} />
      </EffectComposer>
    </Canvas>
  )
}
