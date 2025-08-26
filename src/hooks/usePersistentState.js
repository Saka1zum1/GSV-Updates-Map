import { useState, useEffect } from 'react';

export default function usePersistentState(key, defaultValue) {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key);
        if (stored !== null) {
            try {
                return JSON.parse(stored);
            } catch {
                return stored;
            }
        }
        return defaultValue;
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}
