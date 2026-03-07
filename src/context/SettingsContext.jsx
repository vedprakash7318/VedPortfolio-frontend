import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await API.get('/api/settings');
                setSettings(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch settings", error);
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, loading }}>
            {children}
        </SettingsContext.Provider>
    );
};
