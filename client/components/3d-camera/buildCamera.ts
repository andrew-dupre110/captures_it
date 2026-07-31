import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { makeTextures } from "./textures";

export type CameraRig = {
  root: THREE.Group;
  /** 0 = iris fully open, 1 = fully closed. */
  setIris: (t: number) => void;
  dispose: () => void;
};

/**
 * OM System OM-1 (2022) wearing an adapted vintage OM Zuiko 35mm f/2, built
 * procedurally from primitives — nothing is downloaded at runtime.
 *
 * Modelled facing +Z so the lens points at the viewer. That means the
 * photographer's right — handgrip, shutter button, front and rear dials —
 * lands at NEGATIVE x, and the mode dial at positive x.
 *
 * 1 unit = 50mm. The real body is 134.8 x 91.6 x 72.7mm.
 */

type LensMat = "black" | "chrome" | "inner";

/** A run of the lens profile sharing one material. */
type Run = { mat: LensMat; pts: [number, number][] };

/**
 * Lens profile as [radius, axial] pairs, from the mount outward. Consecutive
 * runs share their boundary point, so the lathed sections meet without seams.
 * The last runs double back inward to form the recessed barrel wall — that
 * depth is what stops the front element reading as a flat lens cap.
 */
const LENS_PROFILE: Run[] = [
  { mat: "chrome", pts: [[0.5, 0.0], [0.5, 0.1]] },
  { mat: "black", pts: [[0.5, 0.1], [0.455, 0.12], [0.455, 0.22]] },
  { mat: "black", pts: [[0.455, 0.22], [0.462, 0.24], [0.462, 0.4], [0.455, 0.42]] },
  { mat: "black", pts: [[0.455, 0.42], [0.43, 0.44], [0.43, 0.47]] },
  { mat: "chrome", pts: [[0.43, 0.47], [0.458, 0.49], [0.458, 0.6], [0.44, 0.62]] },
  { mat: "black", pts: [[0.44, 0.62], [0.44, 0.66]] },
  { mat: "black", pts: [[0.44, 0.66], [0.488, 0.69], [0.488, 0.92], [0.46, 0.95]] },
  { mat: "black", pts: [[0.46, 0.95], [0.45, 0.97], [0.45, 1.0]] },
  { mat: "chrome", pts: [[0.45, 1.0], [0.468, 1.02], [0.468, 1.12], [0.46, 1.14]] },
  // front face annulus, then straight back down the inside of the barrel
  { mat: "chrome", pts: [[0.46, 1.14], [0.33, 1.14]] },
  { mat: "inner", pts: [[0.33, 1.14], [0.32, 1.1], [0.32, 0.9]] },
];

/**
 * A ring with real machined flutes cut into it, rather than a smooth cylinder
 * wearing a normal map. The difference matters at the silhouette: a normal map
 * only shades a round edge, whereas this actually notches the outline, which is
 * what makes a focus ring or a control dial read as knurled metal.
 */
function flutedRing(
  radius: number,
  height: number,
  teeth: number,
  depth: number
): THREE.CylinderGeometry {
  const geo = new THREE.CylinderGeometry(radius, radius, height, teeth * 5, 1);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const cur = Math.hypot(v.x, v.z);
    if (cur < 1e-5) continue; // cap centres have no direction to push along
    const angle = Math.atan2(v.z, v.x);
    const scale = (radius + depth * Math.cos(angle * teeth)) / cur;
    pos.setX(i, v.x * scale);
    pos.setZ(i, v.z * scale);
  }
  geo.computeVertexNormals();
  return geo;
}

export function buildCamera(): CameraRig {
  const disposables: Array<{ dispose: () => void }> = [];
  const track = <T extends { dispose: () => void }>(x: T) => {
    disposables.push(x);
    return x;
  };

  const tex = makeTextures();
  disposables.push(tex);

  // ---- materials --------------------------------------------------------
  const bodyBlack = track(
    new THREE.MeshStandardMaterial({
      color: 0x121216,
      roughness: 0.6,
      metalness: 0.45,
    })
  );
  const rubber = track(
    new THREE.MeshStandardMaterial({
      color: 0x0f0f12,
      roughness: 0.93,
      metalness: 0.06,
      normalMap: tex.grainBody,
      normalScale: new THREE.Vector2(0.5, 0.5),
    })
  );
  const gripRubber = track(
    new THREE.MeshStandardMaterial({
      color: 0x0e0e11,
      roughness: 0.93,
      metalness: 0.06,
      normalMap: tex.grainGrip,
      normalScale: new THREE.Vector2(0.6, 0.6),
    })
  );
  const dialMetal = track(
    new THREE.MeshStandardMaterial({
      color: 0x33333a,
      roughness: 0.36,
      metalness: 0.95,
      normalMap: tex.knurlDial,
      normalScale: new THREE.Vector2(1.1, 1.1),
    })
  );
  const plainMetal = track(
    new THREE.MeshStandardMaterial({
      color: 0x33333a,
      roughness: 0.34,
      metalness: 0.95,
    })
  );
  const chrome = track(
    new THREE.MeshStandardMaterial({
      color: 0xc9cbd2,
      roughness: 0.14,
      metalness: 1,
      side: THREE.DoubleSide,
    })
  );
  const lensBlack = track(
    new THREE.MeshStandardMaterial({
      color: 0x141418,
      roughness: 0.4,
      metalness: 0.7,
      side: THREE.DoubleSide,
    })
  );
  const lensInner = track(
    new THREE.MeshStandardMaterial({
      color: 0x08080a,
      roughness: 0.85,
      metalness: 0.2,
      side: THREE.DoubleSide,
    })
  );
  const knurlCoarseMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x0d0d10,
      roughness: 0.68,
      metalness: 0.55,
      normalMap: tex.knurlAperture,
      normalScale: new THREE.Vector2(1.6, 1.6),
      side: THREE.DoubleSide,
    })
  );
  const knurlFineMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x0d0d10,
      roughness: 0.66,
      metalness: 0.55,
      normalMap: tex.knurlFocus,
      normalScale: new THREE.Vector2(1.5, 1.5),
      side: THREE.DoubleSide,
    })
  );
  const bladeMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x2a2a32,
      roughness: 0.3,
      metalness: 0.95,
      side: THREE.DoubleSide,
    })
  );
  // Coated glass: a dark mirror with a clearcoat sheen. The blue lives here
  // and nowhere else on the model.
  const glassMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0x05070f,
      roughness: 0.03,
      metalness: 0.9,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      emissive: 0x1b2a5e,
      emissiveIntensity: 0.1,
    })
  );
  const badgeMat = (map: THREE.Texture) =>
    track(
      new THREE.MeshStandardMaterial({
        map,
        transparent: true,
        roughness: 0.6,
        metalness: 0,
      })
    );

  const lensMats: Record<LensMat, THREE.Material> = {
    black: lensBlack,
    chrome,
    inner: lensInner,
  };

  const root = new THREE.Group();

  // ---- body --------------------------------------------------------------
  const W = 2.7;
  const H = 1.83;
  const D = 1.34;

  const body = new THREE.Mesh(
    track(new RoundedBoxGeometry(W, H, D, 5, 0.15)),
    bodyBlack
  );
  root.add(body);

  // rubberised front panel, standing just proud of the shell
  const covering = new THREE.Mesh(
    track(new RoundedBoxGeometry(W - 0.1, H - 0.34, D + 0.02, 4, 0.12)),
    rubber
  );
  covering.position.set(0, -0.14, 0.01);
  root.add(covering);

  // parting line where the top cover meets the body shell
  const seam = new THREE.Mesh(
    track(new THREE.BoxGeometry(W - 0.16, 0.03, 0.016)),
    track(new THREE.MeshStandardMaterial({ color: 0x050506, roughness: 1 }))
  );
  seam.position.set(0, 0.68, D / 2 + 0.026);
  root.add(seam);

  // ---- handgrip (photographer's right = -x) ------------------------------
  const grip = new THREE.Mesh(
    track(new RoundedBoxGeometry(0.58, H - 0.04, 1.74, 6, 0.26)),
    gripRubber
  );
  grip.position.set(-0.98, -0.02, 0.26);
  root.add(grip);

  // contour channel where the fingertips sit
  const gripChannel = new THREE.Mesh(
    track(new THREE.CylinderGeometry(0.1, 0.1, H - 0.5, 16)),
    track(new THREE.MeshStandardMaterial({ color: 0x08080a, roughness: 0.98 }))
  );
  gripChannel.position.set(-1.18, -0.06, 0.72);
  root.add(gripChannel);

  // fairing blending the grip up into the top plate
  const gripShoulder = new THREE.Mesh(
    track(new RoundedBoxGeometry(0.66, 0.44, 1.2, 4, 0.18)),
    bodyBlack
  );
  gripShoulder.position.set(-0.94, 0.84, 0.1);
  root.add(gripShoulder);

  // ---- EVF hump ----------------------------------------------------------
  const hump = new THREE.Mesh(
    track(new RoundedBoxGeometry(1.22, 0.46, 1.02, 4, 0.11)),
    bodyBlack
  );
  hump.position.set(0.04, 1.0, -0.06);
  root.add(hump);

  // slanted front face carrying the brand plate
  const humpFace = new THREE.Mesh(
    track(new RoundedBoxGeometry(1.2, 0.5, 0.16, 3, 0.05)),
    bodyBlack
  );
  humpFace.position.set(0.04, 0.98, 0.4);
  humpFace.rotation.x = -0.36;
  root.add(humpFace);

  const olympusBadge = new THREE.Mesh(
    track(new THREE.PlaneGeometry(0.82, 0.2)),
    badgeMat(tex.olympus)
  );
  olympusBadge.position.set(0.04, 1.0, 0.5);
  olympusBadge.rotation.x = -0.36;
  root.add(olympusBadge);

  // OM-1 on the body front, beside the hump
  const om1Badge = new THREE.Mesh(
    track(new THREE.PlaneGeometry(0.44, 0.11)),
    badgeMat(tex.om1)
  );
  om1Badge.position.set(0.62, 0.6, D / 2 + 0.02);
  root.add(om1Badge);

  // shoulders either side of the hump
  for (const sx of [-1, 1]) {
    const shoulder = new THREE.Mesh(
      track(new RoundedBoxGeometry(0.48, 0.26, 1.0, 3, 0.1)),
      bodyBlack
    );
    shoulder.position.set(0.04 + sx * 0.8, 0.9, -0.06);
    root.add(shoulder);
  }

  // hot shoe
  const shoe = new THREE.Mesh(
    track(new RoundedBoxGeometry(0.44, 0.09, 0.36, 2, 0.02)),
    plainMetal
  );
  shoe.position.set(0.04, 1.26, -0.1);
  root.add(shoe);

  // ---- top controls ------------------------------------------------------
  // mode dial with its centre lock, photographer's left
  const modeDial = new THREE.Mesh(
    track(flutedRing(0.3, 0.19, 30, 0.011)),
    dialMetal
  );
  modeDial.position.set(0.86, 1.0, -0.12);
  root.add(modeDial);

  const modeLock = new THREE.Mesh(
    track(new THREE.CylinderGeometry(0.11, 0.11, 0.08, 24)),
    bodyBlack
  );
  modeLock.position.set(0.86, 1.11, -0.12);
  root.add(modeLock);

  // rear control dial on the grip shoulder
  const rearDial = new THREE.Mesh(
    track(flutedRing(0.25, 0.16, 26, 0.01)),
    dialMetal
  );
  rearDial.position.set(-0.74, 1.0, -0.36);
  root.add(rearDial);

  // shutter release, raised on a plinth
  const plinth = new THREE.Mesh(
    track(new THREE.CylinderGeometry(0.21, 0.23, 0.12, 28)),
    bodyBlack
  );
  plinth.position.set(-0.98, 1.02, 0.2);
  root.add(plinth);

  const shutterBtn = new THREE.Mesh(
    track(new THREE.CylinderGeometry(0.13, 0.14, 0.09, 28)),
    plainMetal
  );
  shutterBtn.position.set(-0.98, 1.11, 0.2);
  root.add(shutterBtn);

  // front control dial, tucked into the grip shoulder
  const frontDial = new THREE.Mesh(
    track(flutedRing(0.2, 0.17, 22, 0.009)),
    dialMetal
  );
  frontDial.rotation.x = Math.PI / 2;
  frontDial.position.set(-0.98, 0.82, 0.8);
  root.add(frontDial);

  // two small function buttons
  for (const dx of [0, 0.28]) {
    const btn = new THREE.Mesh(
      track(new THREE.CylinderGeometry(0.07, 0.07, 0.07, 20)),
      plainMetal
    );
    btn.position.set(-0.52 + dx, 1.0, -0.1);
    root.add(btn);
  }

  // strap lug
  const lug = new THREE.Mesh(
    track(new RoundedBoxGeometry(0.16, 0.12, 0.1, 2, 0.03)),
    plainMetal
  );
  lug.position.set(-1.22, 0.86, -0.2);
  root.add(lug);

  // ---- front details -----------------------------------------------------
  // stacked pair of buttons beside the mount
  for (const dy of [0.17, -0.17]) {
    const btn = new THREE.Mesh(
      track(new THREE.CylinderGeometry(0.075, 0.075, 0.08, 20)),
      plainMetal
    );
    btn.rotation.x = Math.PI / 2;
    btn.position.set(0.92, -0.22 + dy, D / 2 + 0.02);
    root.add(btn);
  }

  // ---- lens ---------------------------------------------------------------
  const lens = new THREE.Group();
  lens.position.set(0.04, -0.13, D / 2 - 0.02);
  root.add(lens);

  // chrome mount ring on the body itself
  const mountRing = new THREE.Mesh(
    track(new THREE.CylinderGeometry(0.53, 0.53, 0.06, 48)),
    chrome
  );
  mountRing.rotation.x = Math.PI / 2;
  mountRing.position.z = 0.02;
  lens.add(mountRing);

  // Lathe each material run of the profile. LatheGeometry revolves around Y,
  // so rotate the result to aim down +Z.
  for (const run of LENS_PROFILE) {
    const pts = run.pts.map(([r, z]) => new THREE.Vector2(r, z));
    const geo = track(new THREE.LatheGeometry(pts, 64));
    geo.rotateX(Math.PI / 2); // lathe runs along +Y; aim it down +Z
    lens.add(new THREE.Mesh(geo, lensMats[run.mat]));
  }

  // machined flutes standing proud of the recessed lathe sections
  const apertureFlutes = new THREE.Mesh(
    track(flutedRing(0.474, 0.18, 46, 0.009)),
    knurlCoarseMat
  );
  apertureFlutes.rotation.x = Math.PI / 2;
  apertureFlutes.position.z = 0.32;
  lens.add(apertureFlutes);

  const focusFlutes = new THREE.Mesh(
    track(flutedRing(0.5, 0.235, 64, 0.0085)),
    knurlFineMat
  );
  focusFlutes.rotation.x = Math.PI / 2;
  focusFlutes.position.z = 0.805;
  lens.add(focusFlutes);

  // engraved lettering wrapped around the chrome band
  const engraving = new THREE.Mesh(
    track(new THREE.CylinderGeometry(0.4595, 0.4595, 0.11, 96, 1, true)),
    track(
      new THREE.MeshStandardMaterial({
        map: tex.engraving,
        transparent: true,
        roughness: 0.3,
        metalness: 0.9,
        side: THREE.DoubleSide,
      })
    )
  );
  engraving.rotation.x = Math.PI / 2;
  engraving.position.z = 0.545;
  lens.add(engraving);

  // ---- front element ------------------------------------------------------
  // A shallow spherical cap, not a disc: a flat mirror facing the viewer has
  // nothing to reflect and reads as a lens cap, whereas the curve sweeps the
  // environment into a real highlight.
  const capR = 0.3;
  const sphereR = 0.52;
  const glassGeo = track(
    new THREE.SphereGeometry(
      sphereR,
      64,
      32,
      0,
      Math.PI * 2,
      0,
      Math.asin(capR / sphereR)
    )
  );
  glassGeo.rotateX(Math.PI / 2); // pole faces +Z
  const glass = new THREE.Mesh(glassGeo, glassMat);
  glass.position.z = 1.0 - sphereR;
  lens.add(glass);

  // faint concentric rings suggesting the elements behind the front group
  for (const [r, z, op, col] of [
    [0.17, 1.006, 0.55, 0x7f92e8],
    [0.12, 1.015, 0.38, 0x8f6fc4],
    [0.07, 1.024, 0.26, 0x4a5fbe],
  ] as const) {
    const ring = new THREE.Mesh(
      track(new THREE.TorusGeometry(r, 0.009, 8, 64)),
      track(
        new THREE.MeshStandardMaterial({
          color: col,
          roughness: 0.22,
          metalness: 1,
          transparent: true,
          opacity: op,
        })
      )
    );
    ring.position.z = z;
    lens.add(ring);
  }

  const coating = new THREE.Mesh(
    track(new THREE.TorusGeometry(0.206, 0.009, 10, 72)),
    track(
      new THREE.MeshStandardMaterial({
        color: 0x9fb0f0,
        roughness: 0.12,
        metalness: 1,
        transparent: true,
        opacity: 0.6,
      })
    )
  );
  coating.position.z = 1.004;
  lens.add(coating);

  // ---- iris ---------------------------------------------------------------
  //
  // The opening is the intersection of six half-planes, one per blade. Each
  // blade hinges at PIVOT_R and presents a straight working edge sitting EDGE_H
  // from its own hinge, so the edge stands off the axis by
  //
  //     d(phi) = PIVOT_R * cos(phi) - EDGE_H
  //
  // which is the inradius of the hexagon the viewer actually sees. Sweeping phi
  // to `acos(EDGE_H / PIVOT_R)` drives d to zero — fully shut.
  //
  // The blade outline is a disc of radius BLADE_R centred on the hinge, cut off
  // at the working edge. Clipping to a circle *about the hinge* is what keeps
  // this honest: rotating about that same point leaves the arc invariant, so a
  // blade can never swing outside PIVOT_R + BLADE_R however far it travels, and
  // needs no masking geometry.
  //
  // Two sizing rules keep it honest. BLADE_R > PIVOT_R, so each leaf's disc
  // contains the axis and the iris can genuinely shut instead of leaving a
  // pinhole. And the edge chord 2*sqrt(BLADE_R^2 - EDGE_H^2) = 0.50 comfortably
  // exceeds the widest hexagon side it has to span (2*d*tan30 = 0.22 at full
  // aperture), so neighbouring leaves always overlap rather than parting into a
  // radiating star. The margin only grows as the iris closes.
  const BLADES = 6;
  const PIVOT_R = 0.22;
  const BLADE_R = 0.25;
  const EDGE_H = 0.03;
  const SHUT_PHI = Math.acos(EDGE_H / PIVOT_R) * 1.06; // overshoot slightly

  const half = Math.sqrt(BLADE_R * BLADE_R - EDGE_H * EDGE_H);
  const edgeAngle = Math.acos(-EDGE_H / BLADE_R);
  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(-EDGE_H, -half);
  bladeShape.absarc(0, 0, BLADE_R, -edgeAngle, edgeAngle, false);
  bladeShape.lineTo(-EDGE_H, -half); // the working edge, closing the outline

  const bladeGeo = track(new THREE.ShapeGeometry(bladeShape, 24));
  const bladePivots: THREE.Group[] = [];

  for (let i = 0; i < BLADES; i++) {
    const a = (i / BLADES) * Math.PI * 2;
    const pivot = new THREE.Group();
    pivot.position.set(
      Math.cos(a) * PIVOT_R,
      Math.sin(a) * PIVOT_R,
      // stagger to avoid coplanar z-fighting where blades overlap
      1.05 + i * 0.0022
    );
    pivot.userData.baseAngle = a;
    // rotation.z = a puts local -x toward the axis, so the working edge at
    // local x = -EDGE_H faces the centre.
    pivot.add(new THREE.Mesh(bladeGeo, bladeMat));
    lens.add(pivot);
    bladePivots.push(pivot);
  }

  const setIris = (t: number) => {
    const phi = SHUT_PHI * t;
    for (const pivot of bladePivots) {
      pivot.rotation.z = (pivot.userData.baseAngle as number) + phi;
    }
  };
  setIris(0);

  return {
    root,
    setIris,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}
