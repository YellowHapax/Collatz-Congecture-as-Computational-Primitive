/**
 * §8.4 Jacobian flow and Routh–Hurwitz stability for the coupled baseline system.
 */

export type Vec3 = [number, number, number];
export type Mat3 = [Vec3, Vec3, Vec3];

export function jacobian(
  a1: number,
  a2: number,
  a3: number,
  k1: number,
  k2: number,
  k3: number,
): Mat3 {
  return [
    [-a1, 0, -k1],
    [-k2, -a2, 0],
    [0, -k3, -a3],
  ];
}

export function routhHurwitzBound(
  a1: number,
  a2: number,
  a3: number,
  k1: number,
  k2: number,
  k3: number,
) {
  const left = k1 * k2 * k3;
  const right = (a1 + a2) * (a2 + a3) * (a1 + a3);
  const A = a1 + a2 + a3;
  const B = a1 * a2 + a2 * a3 + a1 * a3;
  const C = a1 * a2 * a3 + k1 * k2 * k3;
  const routhOk = A > 0 && B > 0 && C > 0 && A * B > C;
  return { left, right, stable: left < right && routhOk, A, B, C };
}

function matVec(M: Mat3, v: Vec3): Vec3 {
  return [
    M[0][0] * v[0] + M[0][1] * v[1] + M[0][2] * v[2],
    M[1][0] * v[0] + M[1][1] * v[1] + M[1][2] * v[2],
    M[2][0] * v[0] + M[2][1] * v[1] + M[2][2] * v[2],
  ];
}

function matMul(A: Mat3, B: Mat3): Mat3 {
  const cols: Vec3[] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (let c = 0; c < 3; c++) {
    const col: Vec3 = [B[0][c], B[1][c], B[2][c]];
    const r0 = matVec(A, col);
    cols[c] = r0;
  }
  return [
    [cols[0][0], cols[1][0], cols[2][0]],
    [cols[0][1], cols[1][1], cols[2][1]],
    [cols[0][2], cols[1][2], cols[2][2]],
  ];
}

function matAdd(A: Mat3, B: Mat3): Mat3 {
  return [
    [A[0][0] + B[0][0], A[0][1] + B[0][1], A[0][2] + B[0][2]],
    [A[1][0] + B[1][0], A[1][1] + B[1][1], A[1][2] + B[1][2]],
    [A[2][0] + B[2][0], A[2][1] + B[2][1], A[2][2] + B[2][2]],
  ];
}

function matScale(A: Mat3, s: number): Mat3 {
  return [
    [A[0][0] * s, A[0][1] * s, A[0][2] * s],
    [A[1][0] * s, A[1][1] * s, A[1][2] * s],
    [A[2][0] * s, A[2][1] * s, A[2][2] * s],
  ];
}

const IDENTITY: Mat3 = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

/** Matrix exponential exp(J·μ) via Taylor series (3×3) */
export function expm(J: Mat3, mu: number): Mat3 {
  const Jmu = matScale(J, mu);
  let sum = IDENTITY;
  let term = IDENTITY;
  for (let n = 1; n <= 24; n++) {
    term = matMul(term, Jmu);
    term = matScale(term, 1 / n);
    sum = matAdd(sum, term);
  }
  return sum;
}

/** Roots of λ³ + Aλ² + Bλ + C (eigenvalues of J) */
export function cubicRoots(A: number, B: number, C: number): number[] {
  // Depressed cubic via substitution — numeric Cardano for real parts display
  const p = B - A * A / 3;
  const q = (2 * A * A * A) / 27 - (A * B) / 3 + C;
  const disc = (q * q) / 4 + (p * p * p) / 27;

  if (disc >= 0) {
    const sqrtD = Math.sqrt(disc);
    const u = Math.cbrt(-q / 2 + sqrtD);
    const v = Math.cbrt(-q / 2 - sqrtD);
    const y1 = u + v;
    return [y1 - A / 3];
  }

  const r = Math.sqrt((-p * p * p) / 27);
  const phi = Math.acos(Math.max(-1, Math.min(1, (-q / (2 * r)))));
  const m = 2 * Math.cbrt(r);
  const y1 = m * Math.cos(phi / 3);
  const y2 = m * Math.cos((phi + 2 * Math.PI) / 3);
  const y3 = m * Math.cos((phi + 4 * Math.PI) / 3);
  return [y1 - A / 3, y2 - A / 3, y3 - A / 3];
}

export function eigenvaluesFromJacobian(J: Mat3): number[] {
  const A = -(J[0][0] + J[1][1] + J[2][2]);
  const B =
    J[0][0] * J[1][1] +
    J[1][1] * J[2][2] +
    J[0][0] * J[2][2] -
    J[0][1] * J[1][0] -
    J[1][2] * J[2][1] -
    J[0][2] * J[2][0];
  const C = -(
    J[0][0] * J[1][1] * J[2][2] +
    J[0][1] * J[1][2] * J[2][0] +
    J[0][2] * J[1][0] * J[2][1] -
    J[0][2] * J[1][1] * J[2][0] -
    J[0][1] * J[1][0] * J[2][2] -
    J[0][0] * J[1][2] * J[2][1]
  );
  return cubicRoots(A, B, C);
}

/** Dominant eigenvalue real part (Rayleigh power iteration) */
export function maxRealEigenvalue(J: Mat3): number {
  let v: Vec3 = [1, 0.3, -0.5];
  for (let i = 0; i < 48; i++) {
    const Jv = matVec(J, v);
    const norm = Math.hypot(Jv[0], Jv[1], Jv[2]) || 1;
    v = [Jv[0] / norm, Jv[1] / norm, Jv[2] / norm];
  }
  const Jv = matVec(J, v);
  const denom = v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
  return (v[0] * Jv[0] + v[1] * Jv[1] + v[2] * Jv[2]) / denom;
}

export type FlowPoint = {
  mu: number;
  theta_h: number;
  beta: number;
  gamma: number;
};

/**
 * Linearized RG flow near Θ*: dξ/dμ = Jξ, ξ = Θ − Θ*.
 * State components map to [θ_h, β, Γ] deviations.
 */
export function integrateJacobianFlow(
  J: Mat3,
  xi0: Vec3,
  muMax: number,
  steps: number,
): FlowPoint[] {
  const pts: FlowPoint[] = [];
  for (let i = 0; i <= steps; i++) {
    const mu = (muMax * i) / steps;
    const E = expm(J, mu);
    const xi = matVec(E, xi0);
    pts.push({ mu, theta_h: xi[0], beta: xi[1], gamma: xi[2] });
  }
  return pts;
}
