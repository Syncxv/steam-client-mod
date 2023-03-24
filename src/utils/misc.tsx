import { useState } from '@webpack/common';

export function useForceUpdater() {
    const [, set] = useState(0);
    return () => set(s => s + 1);
}
