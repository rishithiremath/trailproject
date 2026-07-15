import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
}

interface Shape {
  type: 'cube' | 'octahedron' | 'icosahedron';
  x: number;
  y: number;
  z: number;
  scale: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  color: string;
}

const PHI = (1 + Math.sqrt(5)) / 2;

const ICOSAHEDRON_VERTICES = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1]
];

const ICOSAHEDRON_FACES = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
];

const CUBE_VERTICES = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1, 1],  [1, -1, 1],  [1, 1, 1],  [-1, 1, 1]
];

const CUBE_FACES = [
  [0, 1, 2, 3], // Back
  [4, 5, 6, 7], // Front
  [0, 1, 5, 4], // Bottom
  [2, 3, 7, 6], // Top
  [0, 3, 7, 4], // Left
  [1, 2, 6, 5]  // Right
];

const OCTAHEDRON_VERTICES = [
  [0, 1, 0],   // Top
  [1, 0, 0],   // Right
  [0, 0, -1],  // Back
  [-1, 0, 0],  // Left
  [0, 0, 1],   // Front
  [0, -1, 0]   // Bottom
];

const OCTAHEDRON_FACES = [
  [0, 1, 4], [0, 4, 3], [0, 3, 2], [0, 2, 1],
  [5, 1, 2], [5, 2, 3], [5, 3, 4], [5, 4, 1]
];

const LIGHT_DIR = { x: 0.577, y: 0.577, z: -0.577 }; // Normalized lighting direction

export default function ScrollBackground3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track inputs
  const scrollRef = useRef({ current: 0, target: 0 });
  const mouseRef = useRef({ currentX: 0, currentY: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current.target = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize 3D particles
    const particlesCount = 140;
    const particles: Particle[] = [];
    const colors = [
      'rgba(124, 58, 237, ', // Violet
      'rgba(79, 70, 229, ',  // Indigo
      'rgba(168, 85, 247, ', // Purple
      'rgba(6, 182, 212, '   // Cyan
    ];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 1400,
        y: (Math.random() - 0.5) * 1400,
        z: Math.random() * 1000,
        size: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Initialize 3D Floating Shapes
    const shapes: Shape[] = [
      {
        type: 'icosahedron',
        x: -250,
        y: -150,
        z: 350,
        scale: 35,
        rotX: Math.random(),
        rotY: Math.random(),
        rotZ: Math.random(),
        rotSpeedX: 0.003,
        rotSpeedY: 0.005,
        rotSpeedZ: 0.002,
        color: '124, 58, 237', // Violet
      },
      {
        type: 'cube',
        x: 300,
        y: 200,
        z: 500,
        scale: 28,
        rotX: Math.random(),
        rotY: Math.random(),
        rotZ: Math.random(),
        rotSpeedX: 0.004,
        rotSpeedY: 0.003,
        rotSpeedZ: 0.006,
        color: '6, 182, 212', // Cyan
      },
      {
        type: 'octahedron',
        x: -300,
        y: 250,
        z: 700,
        scale: 30,
        rotX: Math.random(),
        rotY: Math.random(),
        rotZ: Math.random(),
        rotSpeedX: 0.005,
        rotSpeedY: 0.004,
        rotSpeedZ: 0.003,
        color: '79, 70, 229', // Indigo
      },
      {
        type: 'icosahedron',
        x: 250,
        y: -250,
        z: 850,
        scale: 40,
        rotX: Math.random(),
        rotY: Math.random(),
        rotZ: Math.random(),
        rotSpeedX: 0.002,
        rotSpeedY: 0.006,
        rotSpeedZ: 0.004,
        color: '168, 85, 247', // Purple
      },
    ];

    const maxDepth = 1000;
    const focalLength = 450;

    // Helper functions for 3D rotation
    const rotateX = (x: number, y: number, z: number, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x,
        y: y * cos - z * sin,
        z: y * sin + z * cos,
      };
    };

    const rotateY = (x: number, y: number, z: number, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: x * cos + z * sin,
        y,
        z: -x * sin + z * cos,
      };
    };

    const rotateZ = (x: number, y: number, z: number, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: x * cos - y * sin,
        y: x * sin + y * cos,
        z,
      };
    };

    // Render loop
    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Smooth interpolation for inputs
      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * 0.05;
      mouseRef.current.currentX += (mouseRef.current.targetX - mouseRef.current.currentX) * 0.05;
      mouseRef.current.currentY += (mouseRef.current.targetY - mouseRef.current.currentY) * 0.05;

      const camZ = scrollRef.current.current * 0.35;
      const pitch = mouseRef.current.currentY * 0.08 + (scrollRef.current.current * 0.00015); // Mouse tilt + subtle scroll tilt
      const yaw = mouseRef.current.currentX * 0.08;

      const cosPitch = Math.cos(pitch);
      const sinPitch = Math.sin(pitch);
      const cosYaw = Math.cos(yaw);
      const sinYaw = Math.sin(yaw);

      const centerX = width / 2;
      const centerY = height / 2;

      // Project particles
      const projectedParticles: { sx: number; sy: number; size: number; color: string; zDepth: number }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Infinite loop wrap for Z axis
        let z_rel = (p.z - camZ) % maxDepth;
        if (z_rel < 0) z_rel += maxDepth;

        // Apply camera yaw (around Y) and pitch (around X)
        // Yaw
        const x1 = p.x * cosYaw - z_rel * sinYaw;
        const z1 = p.x * sinYaw + z_rel * cosYaw;

        // Pitch
        const y2 = p.y * cosPitch - z1 * sinPitch;
        const z2 = p.y * sinPitch + z1 * cosPitch;

        if (z2 < 10) continue;

        const scale = focalLength / z2;
        const sx = centerX + x1 * scale;
        const sy = centerY + y2 * scale;

        // Fade based on depth
        const opacity = (1 - z2 / maxDepth) * 0.7;

        if (sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
          projectedParticles.push({
            sx,
            sy,
            size: p.size * scale * 0.75,
            color: `${p.color}${opacity})`,
            zDepth: z2,
          });
        }
      }

      // Draw particle plexus lines first (very faint)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedParticles.length; i++) {
        const p1 = projectedParticles[i];
        for (let j = i + 1; j < projectedParticles.length; j++) {
          const p2 = projectedParticles[j];
          
          // Calculate distance on screen
          const dx = p1.sx - p2.sx;
          const dy = p1.sy - p2.sy;
          const distSq = dx * dx + dy * dy;

          // Connect if close on screen and not too different in depth
          if (distSq < 7000 && Math.abs(p1.zDepth - p2.zDepth) < 80) {
            const dist = Math.sqrt(distSq);
            const lineOpacity = (1 - dist / 83) * 0.11 * (1 - p1.zDepth / maxDepth);
            ctx.strokeStyle = `rgba(139, 92, 246, ${lineOpacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < projectedParticles.length; i++) {
        const p = projectedParticles[i];
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, Math.max(0.2, Math.min(p.size, 4)), 0, Math.PI * 2);
        ctx.fill();
      }

      // Render 3D Shapes
      // Array to store all faces of all shapes for depth-sorting
      interface RenderFace {
        points: { x: number; y: number }[];
        avgDepth: number;
        strokeColor: string;
        fillColor: string;
      }

      const facesToRender: RenderFace[] = [];

      shapes.forEach((shape) => {
        // Wrap Z coordinates infinitely as well
        let z_rel = (shape.z - camZ) % maxDepth;
        if (z_rel < 0) z_rel += maxDepth;

        // Animate local rotation
        shape.rotX += shape.rotSpeedX;
        shape.rotY += shape.rotSpeedY;
        shape.rotZ += shape.rotSpeedZ;

        // Select shape type data
        let verts: number[][] = [];
        let faces: number[][] = [];

        if (shape.type === 'icosahedron') {
          verts = ICOSAHEDRON_VERTICES;
          faces = ICOSAHEDRON_FACES;
        } else if (shape.type === 'cube') {
          verts = CUBE_VERTICES;
          faces = CUBE_FACES;
        } else if (shape.type === 'octahedron') {
          verts = OCTAHEDRON_VERTICES;
          faces = OCTAHEDRON_FACES;
        }

        // Project and rotate all vertices of this shape
        const transformedVerts = verts.map((v) => {
          // 1. Scale
          let px = v[0] * shape.scale;
          let py = v[1] * shape.scale;
          let pz = v[2] * shape.scale;

          // 2. Rotate locally around X, Y, Z
          let rot = rotateX(px, py, pz, shape.rotX);
          rot = rotateY(rot.x, rot.y, rot.z, shape.rotY);
          rot = rotateZ(rot.x, rot.y, rot.z, shape.rotZ);

          // 3. Translate to shape's world coordinates relative to camera
          let dx = rot.x + shape.x;
          let dy = rot.y + shape.y;
          let dz = rot.z + z_rel;

          // 4. Apply camera yaw (around Y) and pitch (around X)
          const rx = dx * cosYaw - dz * sinYaw;
          const rz1 = dx * sinYaw + dz * cosYaw;

          const ry = dy * cosPitch - rz1 * sinPitch;
          const rz2 = dy * sinPitch + rz1 * cosPitch;

          return { x: rx, y: ry, z: rz2 };
        });

        // Loop over faces to compute projection and light shading
        faces.forEach((faceIdx) => {
          const faceVerts = faceIdx.map((idx) => transformedVerts[idx]);

          // Skip if any vertex is behind the camera
          if (faceVerts.some((v) => v.z < 10)) return;

          // Calculate face normal in camera-space for lighting
          // Using 3 vertices of the face: v0, v1, v2
          const v0 = faceVerts[0];
          const v1 = faceVerts[1];
          const v2 = faceVerts[2];

          const poolUx = v1.x - v0.x;
          const poolUy = v1.y - v0.y;
          const poolUz = v1.z - v0.z;

          const poolVx = v2.x - v0.x;
          const poolVy = v2.y - v0.y;
          const poolVz = v2.z - v0.z;

          // Cross product
          let nx = poolUy * poolVz - poolUz * poolVy;
          let ny = poolUz * poolVx - poolUx * poolVz;
          let nz = poolUx * poolVy - poolUy * poolVx;

          // Normalize normal vector
          const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
          if (len > 0) {
            nx /= len;
            ny /= len;
            nz /= len;
          }

          // Shading intensity using dot product with light source direction
          const dot = nx * LIGHT_DIR.x + ny * LIGHT_DIR.y + nz * LIGHT_DIR.z;
          const intensity = Math.max(0.15, Math.min(1, (dot + 1) / 2)); // Shift dot from [-1,1] to [0,1]

          // Project vertices to 2D screen
          const screenPoints = faceVerts.map((v) => {
            const scale = focalLength / v.z;
            return {
              x: centerX + v.x * scale,
              y: centerY + v.y * scale,
            };
          });

          // Calculate average depth of face
          const avgDepth = faceVerts.reduce((sum, v) => sum + v.z, 0) / faceVerts.length;

          // Opacity decreases as the shape goes deeper in space
          const depthFade = 1 - avgDepth / maxDepth;
          if (depthFade <= 0) return;

          const fillColor = `rgba(${shape.color}, ${0.03 + intensity * 0.1 * depthFade})`;
          const strokeColor = `rgba(${shape.color}, ${0.15 + intensity * 0.3 * depthFade})`;

          facesToRender.push({
            points: screenPoints,
            avgDepth,
            strokeColor,
            fillColor,
          });
        });
      });

      // Sort faces by depth (Painters Algorithm: draw furthest faces first)
      facesToRender.sort((a, b) => b.avgDepth - a.avgDepth);

      // Render faces
      facesToRender.forEach((face) => {
        ctx.beginPath();
        ctx.moveTo(face.points[0].x, face.points[0].y);
        for (let i = 1; i < face.points.length; i++) {
          ctx.lineTo(face.points[i].x, face.points[i].y);
        }
        ctx.closePath();

        // Fill face
        ctx.fillStyle = face.fillColor;
        ctx.fill();

        // Stroke outline
        ctx.lineWidth = 1;
        ctx.strokeStyle = face.strokeColor;
        ctx.stroke();
      });

      // Keep animation running
      animationFrameId = requestAnimationFrame(render);
    };

    // Start render
    render();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen', opacity: 0.85 }}
    />
  );
}
