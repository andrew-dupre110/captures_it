"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { buildCamera } from "./buildCamera";

/** A desaturated cousin of the site accent — full #607AFB blows out on chrome. */
const RIM = 0x9fb0e0;

/**
 * Timeline, in seconds.
 *
 * The handoff is built around one rule: the bloom reaches FULL white before
 * anything else changes. Everything underneath — the canvas, the black
 * backdrop — is swapped while it is completely hidden, so the viewer never
 * sees the camera dissolving over the page. From `swap` onward there is only
 * one thing on screen: a white veil easing off the site.
 */
const T = {
  fadeIn: 0.35,
  approach: 1.15, // camera settles
  irisStart: 1.15,
  irisEnd: 1.45, // blades fully shut
  bloomStart: 1.47,
  bloomPeak: 1.54, // opaque white — nothing below is visible
  swap: 1.55, // canvas off, backdrop off, page mounts, all under the white
  bloomHold: 1.63, // stay opaque long enough to cover React mounting the page
  bloomEnd: 2.15, // white has eased away entirely
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const span = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));

type Props = {
  /** Shutter fires: mount the page content underneath. */
  onCapture: () => void;
  /** Overlay is fully transparent: safe to unmount. */
  onComplete: () => void;
};

const Camera = ({ onCapture, onComplete }: Props) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef(onCapture);
  const completeRef = useRef(onComplete);
  captureRef.current = onCapture;
  completeRef.current = onComplete;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion, or no WebGL: skip straight to a short fade.
    let renderer: THREE.WebGLRenderer | null = null;
    if (!reduced) {
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        renderer = null;
      }
    }

    if (!renderer) {
      const a = setTimeout(() => captureRef.current(), 150);
      const b = setTimeout(() => completeRef.current(), 500);
      return () => {
        clearTimeout(a);
        clearTimeout(b);
      };
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
    const canvasEl = renderer.domElement;
    host.appendChild(canvasEl);

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    cam.position.set(0, 0, 9.5);

    // Polished metal has nothing to reflect in an empty scene and renders
    // black, so give it a generated studio environment (no asset download).
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;
    scene.environmentIntensity = 0.6;

    const rig = buildCamera();

    // Centre the model on its own bounds inside a holder, and derive the
    // framing distance from its size — tweaking the model then can't silently
    // break the shot. The holder carries the animation; rig.root carries the
    // centring offset.
    const bounds = new THREE.Box3().setFromObject(rig.root);
    const centre = bounds.getCenter(new THREE.Vector3());
    rig.root.position.sub(centre);
    const radius = bounds.getSize(new THREE.Vector3()).length() / 2;

    const holder = new THREE.Group();
    holder.add(rig.root);
    scene.add(holder);

    // Key from upper-front-left, cool accent rim from the right rear.
    const key = new THREE.DirectionalLight(0xffffff, 3.1);
    key.position.set(-3, 3.5, 5);
    scene.add(key);

    const rim = new THREE.DirectionalLight(RIM, 1.5);
    rim.position.set(4.5, 1.5, -3);
    scene.add(rim);

    const fill = new THREE.DirectionalLight(0xffffff, 0.6);
    fill.position.set(2.5, -2, 3);
    scene.add(fill);

    // Distances the approach animates between, recomputed whenever the
    // viewport changes so the model fills the frame the same way everywhere.
    let settleZ = 6;
    let startZ = 9;

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      const aspect = w / h;
      renderer!.setSize(w, h, false);
      cam.aspect = aspect;
      cam.fov = aspect < 0.9 ? 50 : 38;
      cam.updateProjectionMatrix();

      // fit the bounding sphere, allowing for the horizontal limit on
      // portrait viewports where the vertical FOV is not the binding one
      const vFov = THREE.MathUtils.degToRad(cam.fov);
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
      settleZ = (radius / Math.sin(Math.min(vFov, hFov) / 2)) * 0.82;
      startZ = settleZ * 1.55;
      cam.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let raf = 0;
    let start = 0;
    let captured = false;
    let completed = false;

    const tick = (now: number) => {
      if (!start) start = now;
      const t = (now - start) / 1000;

      // approach: swing in from a three-quarter angle and settle head-on
      const p = easeOutCubic(span(t, 0, T.approach));
      holder.rotation.y = -0.9 + 0.62 * p;
      holder.rotation.x = 0.34 - 0.29 * p;
      holder.position.y = 0.2 - 0.2 * p;
      cam.position.z = startZ + (settleZ - startZ) * p;

      // slow drift after settling, so the frame never feels frozen
      const drift = Math.max(0, t - T.approach);
      holder.rotation.y += Math.sin(drift * 0.9) * 0.035;
      holder.rotation.x += Math.cos(drift * 0.7) * 0.018;

      rig.setIris(easeInOutCubic(span(t, T.irisStart, T.irisEnd)));

      const swapped = t >= T.swap;

      // Black backdrop: fades up at the start, then cuts out under the bloom.
      // It must not cross-fade with the bloom or the two mix into flat grey.
      host.style.opacity = swapped ? "0" : String(span(t, 0, T.fadeIn));

      // The camera has done its job once the shutter fires; hide it outright
      // rather than letting it dissolve on top of the page.
      canvasEl.style.opacity = swapped ? "0" : "1";

      if (flashRef.current) {
        // Rise into full white, then a fast-then-gentle ease off the site.
        const opacity =
          t < T.bloomPeak
            ? span(t, T.bloomStart, T.bloomPeak)
            : 1 - easeOutCubic(span(t, T.bloomHold, T.bloomEnd));
        flashRef.current.style.opacity = String(opacity);
      }

      if (!captured && swapped) {
        captured = true;
        captureRef.current();
      }

      // Nothing below the bloom is visible after the swap, so stop drawing.
      if (!swapped) renderer!.render(scene, cam);

      if (t >= T.bloomEnd) {
        if (!completed) {
          completed = true;
          completeRef.current();
        }
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      envRT.texture.dispose();
      pmrem.dispose();
      rig.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <>
      <div
        ref={hostRef}
        aria-hidden
        className="fixed inset-0 z-50 bg-black opacity-0"
        style={{ transition: "none" }}
      />
      <div
        ref={flashRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-50 bg-white opacity-0"
      />
    </>
  );
};

export default Camera;
