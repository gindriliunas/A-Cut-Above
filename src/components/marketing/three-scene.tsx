"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// Builds a wireframe scissors Group from basic Three.js primitives.
// - Two tapered cylinder blades crossing at a pivot
// - Two torus handle loops
function makeScissors(color: THREE.Color, opacity: number, open = 0.28): THREE.Group {
  const mat = () =>
    new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity });

  const group = new THREE.Group();

  // Blade 1 — upper-left
  const b1 = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.004, 1.5, 6), mat());
  b1.rotation.z = open;
  b1.position.set(-Math.sin(open) * 0.38, Math.cos(open) * 0.2, 0);
  group.add(b1);

  // Blade 2 — upper-right (mirror)
  const b2 = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.004, 1.5, 6), mat());
  b2.rotation.z = -open;
  b2.position.set(Math.sin(open) * 0.38, Math.cos(open) * 0.2, 0);
  group.add(b2);

  // Pivot screw
  const pivot = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), mat());
  pivot.position.set(0, 0.28, 0);
  group.add(pivot);

  // Handle 1 — finger loop (smaller)
  const h1 = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.038, 6, 14), mat());
  h1.position.set(-Math.sin(open) * 0.62, -Math.cos(open) * 0.55, 0);
  h1.rotation.z = open * 0.5;
  group.add(h1);

  // Handle 2 — thumb loop (slightly larger)
  const h2 = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.038, 6, 14), mat());
  h2.position.set(Math.sin(open) * 0.62, -Math.cos(open) * 0.55, 0);
  h2.rotation.z = -open * 0.5;
  group.add(h2);

  return group;
}

// Collect all geometries/materials in a Group for disposal
function disposeGroup(group: THREE.Group) {
  group.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.geometry.dispose();
      (obj.material as THREE.Material).dispose();
    }
  });
}

// ── For DARK sections (gallery, pricing, CTA) ────────────────────────────────
// Floating particle field + several wireframe scissors drifting in 3D space.
export function ThreeDarkBg({ accent = "#C4936A", count = 1200 }: { accent?: string; count?: number }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const W = mount.clientWidth, H = mount.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.zIndex = "0";
    mount.appendChild(renderer.domElement);

    const col = new THREE.Color(accent);

    // Particle field
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 22;
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const ptMat = new THREE.PointsMaterial({ color: col, size: 0.028, transparent: true, opacity: 0.4 });
    const particles = new THREE.Points(ptGeo, ptMat);
    scene.add(particles);

    // Scattered scissors
    const scissorDefs = [
      { pos: [-2.4,  1.2, -1.5], rot: [0.3, 0.6, 0.2], scale: 0.9, open: 0.32, opacity: 0.12 },
      { pos: [ 2.6, -0.8, -2.0], rot: [0.1, 1.2, 0.5], scale: 0.7, open: 0.18, opacity: 0.10 },
      { pos: [-0.5, -2.2, -1.0], rot: [0.8, 0.3, 1.1], scale: 0.5, open: 0.40, opacity: 0.09 },
      { pos: [ 1.8,  2.0, -2.5], rot: [0.2, 0.9, 0.4], scale: 1.0, open: 0.25, opacity: 0.08 },
    ] as const;

    const scissorGroups = scissorDefs.map(({ pos: p, rot, scale, open, opacity }) => {
      const g = makeScissors(col, opacity, open);
      g.position.set(p[0], p[1], p[2]);
      g.rotation.set(rot[0], rot[1], rot[2]);
      g.scale.setScalar(scale);
      scene.add(g);
      return g;
    });

    let mx = 0, my = 0;
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / W - 0.5) * 0.4;
      my = (e.clientY / H - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      particles.rotation.y += (mx * 0.5 - particles.rotation.y) * 0.02;
      particles.rotation.x += (my * 0.5 - particles.rotation.x) * 0.02;
      particles.rotation.z += 0.0003;
      scissorGroups.forEach((g, i) => {
        g.rotation.y += 0.004 + i * 0.001;
        g.rotation.z += 0.003 - i * 0.0005;
        g.rotation.x += 0.002 + i * 0.0008;
      });
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      const nW = mount.clientWidth, nH = mount.clientHeight;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      ptGeo.dispose();
      ptMat.dispose();
      scissorGroups.forEach(disposeGroup);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [accent, count]);

  return <div ref={mountRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

// ── For LIGHT/WHITE sections (hero) ──────────────────────────────────────────
// Several wireframe scissors floating at very low opacity — safe on white backgrounds.
// Hero content wrapper MUST have position:"relative" zIndex:2 to sit above canvas.
export function ThreeHeroAccent({ accent = "#C4936A" }: { accent?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const W = mount.clientWidth, H = mount.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.z = 7;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.zIndex = "0";
    mount.appendChild(renderer.domElement);

    const col = new THREE.Color(accent);

    // Five scissors scattered across the hero canvas
    const defs = [
      { pos: [ 3.2,  1.5, -1.0], rot: [0.2, 0.4, 0.1], scale: 1.1, open: 0.30, opacity: 0.15 },
      { pos: [-3.4,  0.8, -1.5], rot: [0.5, 0.2, 0.8], scale: 0.8, open: 0.22, opacity: 0.12 },
      { pos: [ 1.0, -2.4, -0.5], rot: [0.1, 0.7, 0.3], scale: 0.6, open: 0.38, opacity: 0.10 },
      { pos: [-1.2,  2.8, -2.0], rot: [0.9, 0.1, 0.6], scale: 0.7, open: 0.26, opacity: 0.09 },
      { pos: [ 4.0, -1.2, -2.5], rot: [0.3, 0.8, 0.4], scale: 0.9, open: 0.20, opacity: 0.08 },
    ] as const;

    const groups = defs.map(({ pos: p, rot, scale, open, opacity }) => {
      const g = makeScissors(col, opacity, open);
      g.position.set(p[0], p[1], p[2]);
      g.rotation.set(rot[0], rot[1], rot[2]);
      g.scale.setScalar(scale);
      scene.add(g);
      return g;
    });

    let mx = 0;
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / W - 0.5) * 0.3;
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      groups.forEach((g, i) => {
        // Slow drift + mouse parallax on each scissor independently
        g.rotation.y += 0.005 + i * 0.001;
        g.rotation.z += (i % 2 === 0 ? 0.003 : -0.004);
        g.rotation.x += (mx * 0.15 - g.rotation.x) * 0.025;
        // Gentle float up/down using sine
        g.position.y += Math.sin(Date.now() * 0.0006 + i * 1.4) * 0.0008;
      });
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      const nW = mount.clientWidth, nH = mount.clientHeight;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      groups.forEach(disposeGroup);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [accent]);

  return <div ref={mountRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}
