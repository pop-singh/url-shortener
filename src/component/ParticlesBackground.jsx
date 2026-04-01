import { useEffect, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const PARTICLE_OPTIONS = {
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" },
      resize: { enable: true },
    },
    modes: {
      repulse: { distance: 120, duration: 0.5 },
      push: { quantity: 3 },
    },
  },
  particles: {
    color: { value: "#ffffff" },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.15,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: { default: "bounce" },
      random: false,
      speed: 0.9,
      straight: false,
    },
    number: {
      density: { enable: true },
      value: 75,
    },
    opacity: {
      value: { min: 0.08, max: 0.4 },
      animation: { enable: true, speed: 0.6, sync: false },
    },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
};

export default function ParticlesBackground() {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const onLoaded = useCallback(async () => {}, []);

  if (!engineReady) return null;

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={onLoaded}
      options={PARTICLE_OPTIONS}
    />
  );
}
