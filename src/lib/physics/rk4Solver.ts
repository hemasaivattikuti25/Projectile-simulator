export interface State {
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
}

interface Derivative {
    dx: number;
    dy: number;
    dz: number;
    dvx: number;
    dvy: number;
    dvz: number;
}

export const solveRK4 = (
    initialState: State,
    gravity: number,
    wind: { x: number; y: number; z: number },
    dragCoeff: number,
    mass: number = 1,
    dt: number = 0.05,
    maxSteps: number = 500
): State[] => {
    const trajectory: State[] = [initialState];
    let currentState = { ...initialState };

    const getDerivatives = (state: State): Derivative => {
        // Relative velocity (ball velocity - wind velocity)
        const relVx = state.vx - wind.x;
        const relVy = state.vy - wind.y;
        const relVz = state.vz - wind.z;

        const speed = Math.sqrt(relVx * relVx + relVy * relVy + relVz * relVz);

        // Drag force: Fd = 1/2 * rho * v^2 * Cd * A (simplified to k * v^2)
        // Here we use dragCoeff as the simplified k
        const dragForceX = -dragCoeff * speed * relVx;
        const dragForceY = -dragCoeff * speed * relVy;
        const dragForceZ = -dragCoeff * speed * relVz;

        return {
            dx: state.vx,
            dy: state.vy,
            dz: state.vz,
            dvx: dragForceX / mass,
            dvy: (dragForceY / mass) - gravity,
            dvz: dragForceZ / mass,
        };
    };

    for (let i = 0; i < maxSteps; i++) {
        if (currentState.y < 0 && i > 0) break;

        const k1 = getDerivatives(currentState);

        const k2State: State = {
            x: currentState.x + k1.dx * dt * 0.5,
            y: currentState.y + k1.dy * dt * 0.5,
            z: currentState.z + k1.dz * dt * 0.5,
            vx: currentState.vx + k1.dvx * dt * 0.5,
            vy: currentState.vy + k1.dvy * dt * 0.5,
            vz: currentState.vz + k1.dvz * dt * 0.5,
        };
        const k2 = getDerivatives(k2State);

        const k3State: State = {
            x: currentState.x + k2.dx * dt * 0.5,
            y: currentState.y + k2.dy * dt * 0.5,
            z: currentState.z + k2.dz * dt * 0.5,
            vx: currentState.vx + k2.dvx * dt * 0.5,
            vy: currentState.vy + k2.dvy * dt * 0.5,
            vz: currentState.vz + k2.dvz * dt * 0.5,
        };
        const k3 = getDerivatives(k3State);

        const k4State: State = {
            x: currentState.x + k3.dx * dt,
            y: currentState.y + k3.dy * dt,
            z: currentState.z + k3.dz * dt,
            vx: currentState.vx + k3.dvx * dt,
            vy: currentState.vy + k3.dvy * dt,
            vz: currentState.vz + k3.dvz * dt,
        };
        const k4 = getDerivatives(k4State);

        currentState = {
            x: currentState.x + (dt / 6) * (k1.dx + 2 * k2.dx + 2 * k3.dx + k4.dx),
            y: currentState.y + (dt / 6) * (k1.dy + 2 * k2.dy + 2 * k3.dy + k4.dy),
            z: currentState.z + (dt / 6) * (k1.dz + 2 * k2.dz + 2 * k3.dz + k4.dz),
            vx: currentState.vx + (dt / 6) * (k1.dvx + 2 * k2.dvx + 2 * k3.dvx + k4.dvx),
            vy: currentState.vy + (dt / 6) * (k1.dvy + 2 * k2.dvy + 2 * k3.dvy + k4.dvy),
            vz: currentState.vz + (dt / 6) * (k1.dvz + 2 * k2.dvz + 2 * k3.dvz + k4.dvz),
        };

        trajectory.push({ ...currentState });
    }

    return trajectory;
};
