"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type PhysicalMesh = THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>;
type StandardMesh = THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;
type BasicMesh = THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;

const QuantumCollectorGame = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const objectsRef = useRef<PhysicalMesh[]>([]); // clickable objects (qubits + noise)
  const frameRef = useRef(0);
  const [score, setScore] = useState(0);
  const [running] = useState(true); // game is always running

  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene + Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
    camera.position.set(0, 0, 18);
    cameraRef.current = camera;

    // Renderer with enhanced settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced lighting setup
    const ambient = new THREE.AmbientLight(0x1a1a2e, 0.3);
    scene.add(ambient);

    // Main key light
    const keyLight = new THREE.DirectionalLight(0x4a90e2, 1.5);
    keyLight.position.set(8, 10, 12);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 50;
    scene.add(keyLight);

    // Rim lighting
    const rimLight = new THREE.DirectionalLight(0xff6b9d, 0.8);
    rimLight.position.set(-8, -5, 8);
    scene.add(rimLight);

    // Dynamic point lights
    const lights: THREE.PointLight[] = [];
    for (let i = 0; i < 3; i++) {
      const light = new THREE.PointLight(
        new THREE.Color().setHSL(0.6 + i * 0.15, 0.8, 0.6), 
        2, 
        15
      );
      light.position.set(
        rand(-10, 10), 
        rand(-6, 6), 
        rand(2, 8)
      );
      lights.push(light);
      scene.add(light);
    }

    // Enhanced background particles with glow
    const particleGroup = new THREE.Group();
    const pGeom = new THREE.SphereGeometry(0.08, 12, 12);
    
    for (let i = 0; i < 400; i++) {
      const hue = 0.6 + Math.random() * 0.25;
      const pMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(hue, 0.7, rand(0.4, 0.8)),
        emissive: new THREE.Color().setHSL(hue, 0.5, rand(0.1, 0.3)),
        roughness: 0.2,
        metalness: 0.8,
        transparent: true,
        opacity: rand(0.3, 0.7),
      });
      const p = new THREE.Mesh(pGeom, pMat);
      p.position.set(rand(-25, 25), rand(-15, 15), rand(-12, 8));
      p.userData = {
        originalY: p.position.y,
        floatSpeed: rand(0.5, 1.5),
        rotSpeed: rand(0.01, 0.03)
      };
      particleGroup.add(p);
    }
    scene.add(particleGroup);

    // Enhanced orbital rings with glassmorphism
    const ringGroup = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(7 + i * 1.8, 0.08, 24, 128),
        new THREE.MeshPhysicalMaterial({
          color: new THREE.Color().setHSL(0.7 + i * 0.08, 0.8, 0.6),
          transparent: true,
          opacity: 0.4,
          roughness: 0.1,
          metalness: 0.9,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          transmission: 0.3,
          thickness: 0.5,
        })
      );
      torus.rotation.set(
        Math.random() * Math.PI, 
        Math.random() * Math.PI, 
        Math.random() * Math.PI
      );
      torus.userData = {
        rotSpeedX: rand(0.002, 0.008),
        rotSpeedY: rand(0.002, 0.008),
        rotSpeedZ: rand(0.002, 0.008)
      };
      ringGroup.add(torus);
    }
    scene.add(ringGroup);

    // Spawn fields with enhanced materials
    const clickables: PhysicalMesh[] = [];
    objectsRef.current = clickables;

    const spawnQubit = () => {
      const g = new THREE.IcosahedronGeometry(0.5, 1);
      const m = new THREE.MeshPhysicalMaterial({
        color: 0x00d4ff,
        emissive: 0x0066cc,
        roughness: 0.1,
        metalness: 0.3,
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
        transmission: 0.2,
        thickness: 0.3,
      });
      const s = new THREE.Mesh(g, m);
      s.castShadow = true;
      s.receiveShadow = true;
      s.userData = { 
        type: "qubit", 
        vx: rand(-0.04, 0.04), 
        vy: rand(-0.04, 0.04),
        pulseSpeed: rand(1.5, 2.5),
        originalScale: 1
      };
      s.position.set(rand(-8, 8), rand(-5, 5), rand(-3, 3));
      scene.add(s);
      clickables.push(s);
    };

    const spawnNoise = () => {
      const g = new THREE.OctahedronGeometry(0.45, 0);
      const m = new THREE.MeshPhysicalMaterial({
        color: 0xff4466,
        emissive: 0x660011,
        roughness: 0.8,
        metalness: 0.2,
        clearcoat: 0.3,
        clearcoatRoughness: 0.7,
      });
      const s = new THREE.Mesh(g, m);
      s.castShadow = true;
      s.receiveShadow = true;
      s.userData = { 
        type: "noise", 
        vx: rand(-0.03, 0.03), 
        vy: rand(-0.03, 0.03),
        pulseSpeed: rand(1.8, 3.2),
        originalScale: 1
      };
      s.position.set(rand(-8, 8), rand(-5, 5), rand(-3, 3));
      scene.add(s);
      clickables.push(s);
    };

    // Initial population
    for (let i = 0; i < 12; i++) spawnQubit();
    for (let i = 0; i < 7; i++) spawnNoise();

    // Resize
    const resize = () => {
      if (!mountRef.current) return;
      const { clientWidth, clientHeight } = mountRef.current;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    // Pointer tracking
    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    renderer.domElement.addEventListener("pointermove", onPointerMove);

    const popAndRemove = (obj: PhysicalMesh, colorHex: THREE.ColorRepresentation) => {
      // Enhanced explosion effect
      const explosionGroup = new THREE.Group();
      
      // Main flash
      const mat = new THREE.MeshBasicMaterial({ 
        color: colorHex, 
        transparent: true, 
        opacity: 1.0 
      });
      const flash = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), mat);
      flash.position.copy(obj.position);
      explosionGroup.add(flash);
      
      // Particle burst
      for (let i = 0; i < 12; i++) {
        const particle = new THREE.Mesh(
          new THREE.SphereGeometry(0.08, 8, 8),
          new THREE.MeshBasicMaterial({ 
            color: colorHex, 
            transparent: true, 
            opacity: 0.8 
          })
        );
        particle.position.copy(obj.position);
        const direction = new THREE.Vector3(
          rand(-1, 1),
          rand(-1, 1),
          rand(-1, 1)
        ).normalize();
        particle.userData = { 
          velocity: direction.multiplyScalar(rand(0.1, 0.3)),
          life: 1.0
        };
        explosionGroup.add(particle);
      }
      
      scene.add(explosionGroup);

      const idx = objectsRef.current.indexOf(obj);
      if (idx >= 0) objectsRef.current.splice(idx, 1);
      scene.remove(obj);
      obj.geometry?.dispose?.();
      if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
      else obj.material?.dispose?.();

      let t = 0;
      const animate = () => {
        t += 0.04;
        
        // Animate main flash
        flash.scale.setScalar(1 + t * 2.5);
        const flashMaterial = flash.material as THREE.MeshBasicMaterial;
        flashMaterial.opacity = Math.max(0, 1.0 - t * 1.2);
        
        // Animate particles
        explosionGroup.children.forEach((child) => {
          if (child === flash) return;
          if (!(child instanceof THREE.Mesh)) return;
          const mesh = child as THREE.Mesh;
          const userData = child.userData as { velocity?: THREE.Vector3; life?: number };
          if (userData.velocity) {
            child.position.add(userData.velocity);
            userData.velocity.multiplyScalar(0.95);
            userData.life = (userData.life ?? 1) - 0.05;
            const particleMaterial = mesh.material as THREE.MeshBasicMaterial | THREE.MeshBasicMaterial[];
            if (Array.isArray(particleMaterial)) {
              particleMaterial.forEach((mat) => {
                mat.opacity = Math.max(0, userData.life ?? 0);
              });
            } else if (particleMaterial) {
              particleMaterial.opacity = Math.max(0, userData.life ?? 0);
            }
          }
        });
        
        if (t < 1.0) {
          requestAnimationFrame(animate);
        } else {
          scene.remove(explosionGroup);
          explosionGroup.children.forEach((child) => {
            if (!(child instanceof THREE.Mesh)) return;
            const mesh = child as THREE.Mesh;
            mesh.geometry?.dispose();
            const material = mesh.material;
            if (Array.isArray(material)) {
              material.forEach((entry) => entry.dispose());
            } else {
              material?.dispose();
            }
          });
        }
      };
      animate();
    };

    const onClick = () => {
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const hits = raycasterRef.current.intersectObjects(objectsRef.current, false);
      if (!hits.length) return;
      const hit = hits[0].object as PhysicalMesh;

      if (hit.userData.type === "qubit") {
        setScore((s) => s + 1);
        popAndRemove(hit, 0x00d4ff);
        setTimeout(spawnQubit, 800);
      } else if (hit.userData.type === "noise") {
        setScore((s) => Math.max(0, s - 1));
        popAndRemove(hit, 0xff4466);
        setTimeout(spawnNoise, 1200);
      }
    };
    renderer.domElement.addEventListener("click", onClick);

    // Enhanced game loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = frameRef.current * 0.01;
      frameRef.current++;

      // Animate rings with individual rotation speeds
      ringGroup.children.forEach((ring, i) => {
        ring.rotation.x += ring.userData.rotSpeedX;
        ring.rotation.y += ring.userData.rotSpeedY;
        ring.rotation.z += ring.userData.rotSpeedZ;
      });

      // Animate background particles with floating motion
      particleGroup.children.forEach((p, i) => {
        p.position.y = p.userData.originalY + Math.sin(time * p.userData.floatSpeed + i) * 0.5;
        p.rotation.x += p.userData.rotSpeed;
        p.rotation.y += p.userData.rotSpeed * 0.7;
      });
      
      particleGroup.rotation.x = Math.sin(time * 0.3) * 0.1;
      particleGroup.rotation.y += 0.001;

      // Animate dynamic lights
      lights.forEach((light, i) => {
        light.position.x = Math.cos(time * 0.5 + i * 2) * 8;
        light.position.z = Math.sin(time * 0.3 + i * 2) * 6 + 5;
        light.intensity = 1.5 + Math.sin(time * 2 + i) * 0.5;
      });

      // Animate clickable objects with enhanced effects
      objectsRef.current.forEach((o, i) => {
        // Movement
        o.position.x += o.userData.vx || 0;
        o.position.y += o.userData.vy || 0;
        if (o.position.x > 9 || o.position.x < -9) o.userData.vx *= -1;
        if (o.position.y > 6 || o.position.y < -6) o.userData.vy *= -1;
        
        // Enhanced rotation and pulsing
        o.rotation.x += 0.015;
        o.rotation.y += 0.012;
        o.rotation.z += 0.008;
        
        // Pulsing effect
        const pulse = 1 + Math.sin(time * o.userData.pulseSpeed + i) * 0.15;
        o.userData.originalScale = pulse;
        
        // Enhanced emissive pulsing
        const material = o.material as THREE.MeshPhysicalMaterial;
        if (o.userData.type === "qubit") {
          const emissiveIntensity = 0.3 + Math.sin(time * 3 + i) * 0.2;
          material.emissive.setHSL(0.55, 0.8, emissiveIntensity);
        } else if (o.userData.type === "noise") {
          const emissiveIntensity = 0.1 + Math.sin(time * 4 + i) * 0.15;
          material.emissive.setHSL(0.95, 0.9, emissiveIntensity);
        }
      });

      // Enhanced hover effects
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const hits = raycasterRef.current.intersectObjects(objectsRef.current, false);
      objectsRef.current.forEach((o) => {
        const isHovered = hits.find((h) => h.object === o);
        const targetScale = isHovered ? o.userData.originalScale * 1.4 : o.userData.originalScale;
        o.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
        
        // Enhanced hover glow
        if (isHovered) {
          const glowIntensity = o.userData.type === "qubit" ? 0.6 : 0.3;
          const material = o.material as THREE.MeshPhysicalMaterial;
          material.emissive.multiplyScalar(1 + glowIntensity);
        }
      });

      // Camera subtle movement
      camera.position.x = Math.sin(time * 0.1) * 0.5;
      camera.position.y = Math.cos(time * 0.15) * 0.3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("click", onClick);

      objectsRef.current.forEach((o) => {
        o.geometry?.dispose?.();
        if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
        else o.material?.dispose?.();
        scene.remove(o);
      });

      ringGroup.children.forEach((r) => {
        if (!(r instanceof THREE.Mesh)) return;
        const mesh = r as THREE.Mesh;
        mesh.geometry.dispose();
        const material = mesh.material;
        if (Array.isArray(material)) {
          material.forEach((entry) => entry.dispose());
        } else {
          material?.dispose();
        }
      });
      particleGroup.children.forEach((p) => {
        if (!(p instanceof THREE.Mesh)) return;
        const mesh = p as THREE.Mesh;
        mesh.geometry.dispose();
        const material = mesh.material;
        if (Array.isArray(material)) {
          material.forEach((entry) => entry.dispose());
        } else {
          material?.dispose();
        }
      });

      renderer.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-120 overflow-hidden">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="flex justify-between items-start p-4">
          <div className="pointer-events-auto">
            <h2 className="text-xl font-bold text-white mb-1 tracking-wide">Quantum Collector</h2>
            <p className="text-xs text-cyan-300/80">Neural Interface Active</p>
          </div>
          <div className="pointer-events-auto text-right">
            <div className="text-sm px-4 py-2 rounded-xl bg-black/30 backdrop-blur-md border border-cyan-400/20 shadow-lg">
              <div className="text-cyan-300/70 text-xs mb-1">SCORE</div>
              <div className="text-2xl font-bold text-cyan-300 tabular-nums">{score.toString().padStart(3, '0')}</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="text-center text-xs text-white/60">
            <span className="text-cyan-300">Click blue qubits</span> <span className="text-white/40">+1</span> • <span className="text-red-300">Avoid red noise</span> <span className="text-white/40">-1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumCollectorGame;
