/**
 * dnaSensorField — Authentic simulation of electrokinetic DNA preconcentration & biosensing.
 *
 * Scientific Concept (MNBE Lab Biosensing Research):
 * - Free DNA strands (flexible polymers undergoing thermal Brownian fluctuations)
 *   are diluted and scattered in microfluidic buffer.
 * - The cursor acts as a micro/nanoscale biosensor electrode:
 *   - Emits a high-frequency alternating electric field (dielectrophoresis / ion concentration polarization).
 *   - Generates an electrokinetic gradient that draws scattered, negatively-charged DNA strands
 *     out of the bulk solution and concentrates them at the sensor tip.
 * - Concentration & Fluorescence Detection:
 *   - When concentrated DNA reaches critical density at the probe, fluorophore intercalators
 *     (e.g. SYBR Green / Quantum dots) light up with bright fluorescence emission.
 *   - Concentrated DNA strands align along field lines and form a tight preconcentrated focal plug.
 * - Clicking creates an electrokinetic pulse (sample flush / injection) that disperses fresh DNA fragments.
 */

export interface DnaSensorOptions {
  strandCount?: number;
  background?: string;
  dnaColor?: string;
  fluorophoreColor?: string;
  sensorColor?: string;
  interactive?: boolean;
}

export interface DnaSensor {
  pulse(x: number, y: number): void;
  destroy(): void;
}

interface DnaNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface DnaStrand {
  nodes: DnaNode[];
  length: number;
  baseLength: number;
  excitation: number; // 0..1 fluorescence
  bound: boolean;
  baseHue: number;
}

interface FlushPulse {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
}

interface Zone {
  x: number;
  y: number;
  w: number;
  h: number;
}

const TAU = Math.PI * 2;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const rand = (a: number, b: number) => a + Math.random() * (b - a);

export function createDnaSensorField(
  canvas: HTMLCanvasElement,
  container: HTMLElement,
  options: DnaSensorOptions = {}
): DnaSensor {
  const opts = {
    background: '#06020e',
    dnaColor: '#c084fc',         // purple DNA backbone
    fluorophoreColor: '#38bdf8', // radiant cyan fluorescent emission when concentrated
    sensorColor: '#a855f7',      // sensor electrode field
    ...options,
  };

  const ctx = canvas.getContext('2d')!;
  let W = 0;
  let H = 0;
  let dpr = 1;

  let strands: DnaStrand[] = [];
  let pulses: FlushPulse[] = [];
  let zones: Zone[] = [];
  const sensor = { x: -1000, y: -1000, active: false, concentration: 0, fieldPulse: 0 };

  let raf = 0;
  let running = false;
  let visible = true;
  let destroyed = false;

  function measureZones() {
    const cr = container.getBoundingClientRect();
    zones = Array.from(container.querySelectorAll<HTMLElement>('[data-sensor-avoid]')).map((el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left - cr.left, y: r.top - cr.top, w: r.width, h: r.height };
    });
  }

  function inZone(x: number, y: number, margin = 15) {
    for (const z of zones) {
      if (x > z.x - margin && x < z.x + z.w + margin && y > z.y - margin && y < z.y + z.h + margin) {
        return z;
      }
    }
    return null;
  }

  function spawnStrand(originX?: number, originY?: number): DnaStrand {
    const nodeCount = Math.floor(rand(6, 12)); // flexible polymer segments
    const segmentLength = rand(4, 7);
    const startX = originX ?? Math.random() * (W || 800);
    const startY = originY ?? Math.random() * (H || 600);

    const nodes: DnaNode[] = [];
    let curX = startX;
    let curY = startY;
    let angle = rand(0, TAU);

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: curX,
        y: curY,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
      });
      angle += (Math.random() - 0.5) * 0.8;
      curX += Math.cos(angle) * segmentLength;
      curY += Math.sin(angle) * segmentLength;
    }

    return {
      nodes,
      length: nodeCount * segmentLength,
      baseLength: segmentLength,
      excitation: 0,
      bound: false,
      baseHue: Math.random() > 0.4 ? 275 : 200,
    };
  }

  function resize() {
    const r = container.getBoundingClientRect();
    const nw = Math.max(1, Math.round(r.width));
    const nh = Math.max(1, Math.round(r.height));
    if (nw === W && nh === H) return;

    W = nw;
    H = nh;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    measureZones();

    const targetCount = opts.strandCount ?? Math.round(clamp((W * H) / 14000, 35, 75));
    while (strands.length < targetCount) strands.push(spawnStrand());
    while (strands.length > targetCount) strands.pop();
  }

  function pulse(x: number, y: number) {
    pulses.push({ x, y, r: 8, maxR: Math.min(W, H) * 0.38, alpha: 1 });
    // Flush out new DNA strands into sample
    for (let i = 0; i < 5; i++) {
      const ang = Math.random() * TAU;
      strands.push(spawnStrand(x + Math.cos(ang) * 20, y + Math.sin(ang) * 20));
      if (strands.length > 85) strands.shift();
    }
  }

  function tick() {
    if (!running) return;

    ctx.clearRect(0, 0, W, H);
    sensor.fieldPulse += 0.08;

    // Ambient microfluidic background gradient
    const bgGrad = ctx.createRadialGradient(
      sensor.active ? sensor.x : W * 0.5,
      sensor.active ? sensor.y : H * 0.5,
      0,
      W * 0.5,
      H * 0.5,
      Math.hypot(W, H) * 0.65
    );
    bgGrad.addColorStop(0, 'rgba(168, 85, 247, 0.09)');
    bgGrad.addColorStop(0.5, 'rgba(20, 8, 38, 0.65)');
    bgGrad.addColorStop(1, 'rgba(6, 2, 14, 0.98)');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    const CONCENTRATION_RADIUS = 280;
    let concentratedStrandCount = 0;

    // 1. SENSOR PROBE & ELECTRIC PRECONCENTRATION FIELD
    if (sensor.active) {
      // Count strands concentrated inside sensor field
      for (const s of strands) {
        const head = s.nodes[0];
        if (Math.hypot(head.x - sensor.x, head.y - sensor.y) < CONCENTRATION_RADIUS * 0.7) {
          concentratedStrandCount++;
        }
      }

      // Preconcentration factor (0..1)
      const targetFactor = clamp(concentratedStrandCount / 7, 0, 1);
      sensor.concentration += (targetFactor - sensor.concentration) * 0.18;

      // Draw dielectrophoretic electric field lines towards sensor
      const fieldCount = 8;
      for (let i = 0; i < fieldCount; i++) {
        const angle = (i / fieldCount) * TAU + Math.sin(sensor.fieldPulse * 0.5) * 0.2;
        const innerR = 25 + Math.sin(sensor.fieldPulse + i) * 6;
        const outerR = CONCENTRATION_RADIUS * 0.85;

        ctx.beginPath();
        ctx.moveTo(sensor.x + Math.cos(angle) * outerR, sensor.y + Math.sin(angle) * outerR);
        ctx.lineTo(sensor.x + Math.cos(angle) * innerR, sensor.y + Math.sin(angle) * innerR);
        ctx.strokeStyle = `rgba(168, 85, 247, ${0.08 + sensor.concentration * 0.15})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 7]);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Concentric sensor focus rings
      ctx.beginPath();
      ctx.arc(sensor.x, sensor.y, CONCENTRATION_RADIUS * 0.65, 0, TAU);
      ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 + sensor.concentration * 0.35})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Sensor focal core (preconcentration plug glow)
      const plugGlow = ctx.createRadialGradient(
        sensor.x,
        sensor.y,
        0,
        sensor.x,
        sensor.y,
        40 + sensor.concentration * 75
      );
      plugGlow.addColorStop(0, `rgba(56, 189, 248, ${0.5 + sensor.concentration * 0.5})`);
      plugGlow.addColorStop(0.4, `rgba(168, 85, 247, ${0.25 + sensor.concentration * 0.35})`);
      plugGlow.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = plugGlow;
      ctx.beginPath();
      ctx.arc(sensor.x, sensor.y, 130, 0, TAU);
      ctx.fill();

      // Microfluidic readout label
      if (sensor.concentration > 0.08) {
        ctx.fillStyle = `rgba(56, 189, 248, ${0.8 + sensor.concentration * 0.2})`;
        ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.textAlign = 'center';
        const enrichment = (1 + sensor.concentration * 99).toFixed(0);
        ctx.fillText(
          `PRECONCENTRATION: ${enrichment}x (${concentratedStrandCount} DNA STRANDS)`,
          sensor.x,
          sensor.y - CONCENTRATION_RADIUS * 0.75
        );
      }
    }

    // 2. INJECTION SHOCKWAVES
    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i];
      p.r += (p.maxR - p.r) * 0.12 + 3.0;
      p.alpha *= 0.92;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, TAU);
      ctx.strokeStyle = `rgba(192, 132, 252, ${p.alpha * 0.6})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      if (p.alpha < 0.02) pulses.splice(i, 1);
    }

    // 3. DNA POLYMER DYNAMICS & CONCENTRATION PULL
    for (const strand of strands) {
      const nodes = strand.nodes;
      const head = nodes[0];

      // A. Thermal Brownian random-walk micro-jitter on head node
      head.vx += (Math.random() - 0.5) * 0.6;
      head.vy += (Math.random() - 0.5) * 0.6;
      head.vx *= 0.94;
      head.vy *= 0.94;

      // B. Electric concentration pull towards the sensor
      let beingPulledBySensor = false;
      if (sensor.active) {
        const dx = sensor.x - head.x;
        const dy = sensor.y - head.y;
        const dist = Math.hypot(dx, dy);

        if (dist < CONCENTRATION_RADIUS && dist > 5) {
          beingPulledBySensor = true;
          // Powerful dielectrophoretic preconcentration force
          const pullForce = (1 - dist / CONCENTRATION_RADIUS) * 6.5;
          head.vx += (dx / dist) * pullForce;
          head.vy += (dy / dist) * pullForce;

          // Propagate pull along the flexible DNA strand
          for (let i = 1; i < nodes.length; i++) {
            nodes[i].vx += (dx / dist) * pullForce * 0.4;
            nodes[i].vy += (dy / dist) * pullForce * 0.4;
          }

          // Fluorescent excitation turns on
          strand.excitation = Math.min(1, strand.excitation + 0.25);
          strand.bound = dist < 50;
        } else {
          strand.excitation *= 0.94;
          strand.bound = false;
        }
      } else {
        strand.excitation *= 0.94;
        strand.bound = false;
      }

      // C. Deflect around headline text blocks ONLY if NOT being pulled by sensor
      if (!beingPulledBySensor) {
        const z = inZone(head.x + head.vx * 8, head.y + head.vy * 8, 10);
        if (z) {
          const cx = z.x + z.w / 2;
          const cy = z.y + z.h / 2;
          const pushX = head.x - cx;
          const pushY = head.y - cy;
          const pLen = Math.hypot(pushX, pushY) || 1;
          head.vx += (pushX / pLen) * 0.7;
          head.vy += (pushY / pLen) * 0.7;
        }
      }

      // Move head
      head.x += head.vx;
      head.y += head.vy;

      // Bounce bounds
      if (head.x < 15) { head.x = 15; head.vx *= -0.8; }
      else if (head.x > W - 15) { head.x = W - 15; head.vx *= -0.8; }
      if (head.y < 15) { head.y = 15; head.vy *= -0.8; }
      else if (head.y > H - 15) { head.y = H - 15; head.vy *= -0.8; }

      // D. Realistic polymer chain kinematics (Verlet / Spring relaxation along strand)
      for (let i = 1; i < nodes.length; i++) {
        const prev = nodes[i - 1];
        const curr = nodes[i];

        // Thermal jitter for interior monomer
        curr.vx += (Math.random() - 0.5) * 0.4;
        curr.vy += (Math.random() - 0.5) * 0.4;
        curr.vx *= 0.93;
        curr.vy *= 0.93;

        curr.x += curr.vx;
        curr.y += curr.vy;

        // Keep monomer segment distance constrained (flexible DNA polymer backbone)
        const segDx = curr.x - prev.x;
        const segDy = curr.y - prev.y;
        const segDist = Math.hypot(segDx, segDy) || 0.001;
        const targetLen = strand.baseLength;
        const diff = (segDist - targetLen) / segDist;

        curr.x -= segDx * diff * 0.65;
        curr.y -= segDy * diff * 0.65;
      }

      // E. Render DNA Strand (Worm-like polymer chain with fluorescent base nodes)
      const isExcited = strand.excitation > 0.15;
      const strandAlpha = 0.5 + strand.excitation * 0.5;

      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      for (let i = 1; i < nodes.length; i++) {
        // Smooth bezier through DNA strand nodes
        const xc = (nodes[i].x + nodes[i - 1].x) / 2;
        const yc = (nodes[i].y + nodes[i - 1].y) / 2;
        ctx.quadraticCurveTo(nodes[i - 1].x, nodes[i - 1].y, xc, yc);
      }
      ctx.lineTo(nodes[nodes.length - 1].x, nodes[nodes.length - 1].y);

      if (isExcited) {
        // Glowing fluorescent emission (SYBR/intercalating dye activated)
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.7 + strand.excitation * 0.3})`;
        ctx.lineWidth = 2.2 + strand.excitation * 1.5;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 14 * strand.excitation;
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else {
        ctx.strokeStyle = `rgba(192, 132, 252, ${strandAlpha * 0.6})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // Draw nucleotide / base-pair beads along strand
      for (let i = 0; i < nodes.length; i += 2) {
        const n = nodes[i];
        ctx.beginPath();
        ctx.arc(n.x, n.y, isExcited ? 2.5 : 1.6, 0, TAU);
        ctx.fillStyle = isExcited ? '#38bdf8' : 'rgba(236, 72, 153, 0.7)';
        ctx.fill();
      }
    }

    raf = requestAnimationFrame(tick);
  }

  function handlePointer(clientX: number, clientY: number) {
    const r = container.getBoundingClientRect();
    if (
      clientX >= r.left &&
      clientX <= r.right &&
      clientY >= r.top &&
      clientY <= r.bottom
    ) {
      sensor.x = clientX - r.left;
      sensor.y = clientY - r.top;
      sensor.active = true;
    } else {
      sensor.active = false;
    }
  }

  function onMove(e: MouseEvent | PointerEvent) {
    handlePointer(e.clientX, e.clientY);
  }

  function onDown(e: MouseEvent | PointerEvent) {
    const r = container.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    ) return;

    const target = e.target as HTMLElement | null;
    if (target?.closest?.('a, button, input, [data-sensor-avoid]')) return;
    sensor.x = e.clientX - r.left;
    sensor.y = e.clientY - r.top;
    pulse(sensor.x, sensor.y);
  }

  const ro = new ResizeObserver(() => resize());
  ro.observe(container);

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !running && !destroyed) {
      running = true;
      raf = requestAnimationFrame(tick);
    } else if (!visible && running) {
      running = false;
      cancelAnimationFrame(raf);
    }
  });
  io.observe(container);

  if (opts.interactive) {
    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mousedown', onDown);
  }

  resize();
  running = true;
  raf = requestAnimationFrame(tick);

  return {
    pulse,
    destroy() {
      destroyed = true;
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('mousedown', onDown);
    },
  };
}
