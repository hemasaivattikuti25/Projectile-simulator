import { Text } from '@react-three/drei';

export const DistanceMarkers = () => {
    const markers = [];

    // Create markers every 50m up to 1000m for extreme distances
    for (let i = 50; i <= 1000; i += 50) {
        markers.push(
            <group key={i} position={[i, 0, 0]}>
                {/* Red vertical line */}
                <mesh position={[0, 5, 0]}>
                    <boxGeometry args={[0.2, 10, 0.2]} />
                    <meshBasicMaterial color="#ef4444" />
                </mesh>

                {/* Distance label */}
                <Text
                    position={[0, 11, 0]}
                    fontSize={1.5}
                    color="#ef4444"
                    anchorX="center"
                    anchorY="middle"
                >
                    {i}m
                </Text>
            </group>
        );
    }

    return <>{markers}</>;
};
