
import * as THREE from 'three';

export const GRAVITY_EARTH = 9.81;

/**
 * Calculates the position of the projectile at a specific time t.
 * @param t Time in seconds
 * @param v0 Initial velocity (m/s)
 * @param theta Launch angle in degrees
 * @param g Gravity (m/s^2)
 * @param startPos Starting position [x, y, z]
 * @returns [x, y, z] position array
 */
export const getProjectilePosition = (
    t: number,
    v0: number,
    theta: number,
    g: number,
    startPos: [number, number, number] = [0, 0, 0],
    isAntiGravity: boolean = false,
    windSpeed: number = 0,
    mass: number = 1
): [number, number, number] => {
    const rad = (theta * Math.PI) / 180;
    const vx0 = v0 * Math.cos(rad);
    const vy0 = v0 * Math.sin(rad);

    // Wind effect: lighter objects affected more
    // Drag coefficient simplified: effect inversely proportional to mass
    const windEffect = (windSpeed * t) / Math.max(mass, 0.1);

    const x = startPos[0] + vx0 * t + windEffect;

    // vertical motion: y = y0 + vy*t - 0.5*g*t^2 (or + if anti-gravity)
    const y = isAntiGravity
        ? startPos[1] + vy0 * t + 0.5 * g * t * t
        : startPos[1] + vy0 * t - 0.5 * g * t * t;

    const z = startPos[2];

    return [x, Math.max(0, y), z]; // Clamp y to 0 (floor)
};

/**
 * Generates trajectory points for rendering the prediction line.
 * @param v0 Initial velocity
 * @param theta Launch angle
 * @param g Gravity
 * @param steps Number of points
 * @param timeStep Time interval between points
 * @returns Array of Vector3 points
 */
export const getTrajectoryPoints = (
    v0: number,
    theta: number,
    g: number,
    startPos: [number, number, number] = [0, 0, 0],
    isAntiGravity: boolean = false,
    totalTime: number = 10,
    windSpeed: number = 0,
    mass: number = 1
): THREE.Vector3[] => {
    const points: THREE.Vector3[] = [];
    const steps = 100;
    const dt = totalTime / steps;

    for (let i = 0; i <= steps; i++) {
        const t = i * dt;
        const [x, y, z] = getProjectilePosition(t, v0, theta, g, startPos, isAntiGravity, windSpeed, mass);
        points.push(new THREE.Vector3(x, y, z));
        if (y <= 0 && !isAntiGravity) break;
        if (x > 1000) break; // Stop at 1000m limit
    }
    return points;
};
