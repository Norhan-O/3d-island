import React, { useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Island from '../models/Island';
import {
  DirectionalLight,
  AmbientLight,
  HemisphereLight,
} from 'three';
import Sky from '../models/Sky';
import Bird from '../models/Bird';
import Plane from '../models/Plane';
import HomeInfo from '../components/HomeInfo';

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [CurrentStage, setCurrentStage] = useState(1)
  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return { scale: screenScale, position: screenPosition, rotation: rotation };
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return { scale: screenScale, position: screenPosition };
  };

  const { scale: islandScale, position: islandPosition, rotation: islandRotation } = adjustIslandForScreenSize();
  const { scale: planeScale, position: planePosition } = adjustPlaneForScreenSize();

  // Create refs for lights
  const directionalLight = useRef();
  const ambientLight = useRef();
  const hemisphereLight = useRef();

  return (
    <section className={`w-full h-screen relative`}>
        <div className='absolute top-28 left-0 right-0 z-10 flex  items-center justify-center'>
          {CurrentStage && <HomeInfo currentStage={CurrentStage} />}

        </div>

      <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`} camera={{ near: 0.1, far: 1000 }}>
        <Suspense fallback={<Loader />}>
          {/* Directional Light */}
          <directionalLight ref={directionalLight} position={[1, 1, 1]} intensity={2} />

          {/* Ambient Light */}
          <ambientLight ref={ambientLight} intensity={0.5} />

          {/* Hemisphere Light */}
          <hemisphereLight ref={hemisphereLight} skyColor='#b1e1ff' groundColor='#000000' intensity={1} />

          <Bird />
          <Sky isRotating={isRotating}/>
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            isRotating={isRotating}
            planeScale={planeScale}
            planePosition={planePosition}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
