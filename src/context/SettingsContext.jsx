import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const SettingsContext = createContext();

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

export const SettingsProvider = ({ children }) => {
    const user = useSelector(state => state.auth.user);
    
    // Default settings
    const defaultSettings = {
        // Account Settings
        email: user?.emailId || '',
        twoFactor: false,
        twoFactorSecret: '',
        socialAccounts: {
            github: {
                connected: false,
                username: '',
                url: ''
            },
            linkedin: {
                connected: false,
                username: '',
                url: ''
            },
            google: {
                connected: false,
                email: ''
            }
        },
        
        // Editor Settings
        fontSize: 14,
        fontFamily: 'JetBrains Mono',
        tabSize: 4,
        wordWrap: true,
        minimap: true,
        lineNumbers: true,
        autoSave: true,
        bracketMatching: true,
        
        // Notification Settings
        emailNotifications: true,
        pushNotifications: true,
        soundEnabled: true,
        desktopNotifications: false,
        contestReminders: true,
        problemRecommendations: true,
        
        // Privacy Settings
        profileVisibility: 'public',
        showEmail: true,
        showStats: true,
        showSolvedProblems: true,
        showContestHistory: true,
        allowDirectMessages: true
    };

    const [settings, setSettings] = useState(defaultSettings);
    const [isLoading, setIsLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null); // 'saving', 'saved', 'error'

    // Load settings from localStorage on mount
    useEffect(() => {
        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings);
                setSettings(prev => ({ ...prev, ...parsed }));
            } catch (error) {
                console.error('Error loading settings:', error);
            }
        }
    }, []);

    // Update email when user changes
    useEffect(() => {
        if (user?.emailId) {
            setSettings(prev => ({ ...prev, email: user.emailId }));
        }
    }, [user?.emailId]);

    // Apply editor settings to the site
    useEffect(() => {
        applyEditorSettings();
    }, [settings.fontSize, settings.fontFamily, settings.tabSize]);

    const applyEditorSettings = () => {
        const root = document.documentElement;
        
        // Apply font size
        root.style.setProperty('--editor-font-size', `${settings.fontSize}px`);
        
        // Apply font family
        root.style.setProperty('--editor-font-family', settings.fontFamily);
        
        // Apply tab size
        root.style.setProperty('--editor-tab-size', settings.tabSize);
        
        // Apply to code elements
        const codeElements = document.querySelectorAll('code, pre, .code-editor');
        codeElements.forEach(el => {
            el.style.fontSize = `${settings.fontSize}px`;
            el.style.fontFamily = settings.fontFamily;
            el.style.tabSize = settings.tabSize;
        });
    };

    const updateSetting = (category, key, value) => {
        console.log('updateSetting called:', { category, key, value });
        setSettings(prev => {
            const newSettings = { ...prev };
            
            // If it's a nested category (like socialAccounts), handle it specially
            if (category === 'socialAccounts') {
                newSettings.socialAccounts = {
                    ...prev.socialAccounts,
                    [key]: value
                };
            } else {
                // For flat properties, update directly
                newSettings[key] = value;
            }
            
            console.log('Updated settings:', newSettings);
            
            // Save to localStorage immediately
            localStorage.setItem('userSettings', JSON.stringify(newSettings));
            
            return newSettings;
        });
    };

    const updateSocialAccount = (platform, updates) => {
        setSettings(prev => ({
            ...prev,
            socialAccounts: {
                ...prev.socialAccounts,
                [platform]: {
                    ...prev.socialAccounts[platform],
                    ...updates
                }
            }
        }));
    };

    const saveSettings = async () => {
        setIsLoading(true);
        setSaveStatus('saving');
        
        try {
            // Save to localStorage
            localStorage.setItem('userSettings', JSON.stringify(settings));
            
            // Here you would typically send to your backend API
            // await axiosClient.put('/api/user/settings', settings);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus(null), 3000);
            
            console.log('Settings saved successfully:', settings);
        } catch (error) {
            console.error('Error saving settings:', error);
            setSaveStatus('error');
            setTimeout(() => setSaveStatus(null), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    const resetSettings = () => {
        setSettings(defaultSettings);
        localStorage.setItem('userSettings', JSON.stringify(defaultSettings));
        applyEditorSettings();
        setSaveStatus('reset');
        setTimeout(() => setSaveStatus(null), 3000);
    };

    const changeEmail = async (newEmail, currentPassword, confirmPassword) => {
        if (currentPassword !== confirmPassword) {
            throw new Error('Passwords do not match');
        }
        
        setIsLoading(true);
        try {
            // Here you would validate password and update email via API
            // await axiosClient.put('/api/user/email', { newEmail, password: currentPassword });
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            setSettings(prev => ({ ...prev, email: newEmail }));
            localStorage.setItem('userSettings', JSON.stringify(settings));
            
            return { success: true, message: 'Email updated successfully' };
        } catch (error) {
            throw new Error(error.message || 'Failed to update email');
        } finally {
            setIsLoading(false);
        }
    };

    const enableTwoFactor = async (password, confirmPassword) => {
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }
        
        setIsLoading(true);
        try {
            // Here you would generate 2FA secret and QR code
            // const response = await axiosClient.post('/api/user/2fa/enable', { password });
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const mockSecret = 'JBSWY3DPEHPK3PXP';
            setSettings(prev => ({ 
                ...prev, 
                twoFactor: true,
                twoFactorSecret: mockSecret
            }));
            
            return { 
                success: true, 
                message: 'Two-factor authentication enabled',
                secret: mockSecret,
                qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
            };
        } catch (error) {
            throw new Error(error.message || 'Failed to enable two-factor authentication');
        } finally {
            setIsLoading(false);
        }
    };

    const disableTwoFactor = async (password) => {
        setIsLoading(true);
        try {
            // await axiosClient.post('/api/user/2fa/disable', { password });
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setSettings(prev => ({ 
                ...prev, 
                twoFactor: false,
                twoFactorSecret: ''
            }));
            
            return { success: true, message: 'Two-factor authentication disabled' };
        } catch (error) {
            throw new Error(error.message || 'Failed to disable two-factor authentication');
        } finally {
            setIsLoading(false);
        }
    };

    const connectSocialAccount = async (platform, username, password) => {
        setIsLoading(true);
        try {
            // Here you would connect to the social platform
            // await axiosClient.post(`/api/user/connect/${platform}`, { username, password });
            
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const url = platform === 'github' 
                ? `https://github.com/${username}`
                : `https://linkedin.com/in/${username}`;
            
            updateSocialAccount(platform, {
                connected: true,
                username,
                url
            });
            
            return { success: true, message: `${platform} account connected successfully` };
        } catch (error) {
            throw new Error(error.message || `Failed to connect ${platform} account`);
        } finally {
            setIsLoading(false);
        }
    };

    const disconnectSocialAccount = async (platform) => {
        setIsLoading(true);
        try {
            // await axiosClient.delete(`/api/user/connect/${platform}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            updateSocialAccount(platform, {
                connected: false,
                username: '',
                url: ''
            });
            
            return { success: true, message: `${platform} account disconnected` };
        } catch (error) {
            throw new Error(error.message || `Failed to disconnect ${platform} account`);
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        settings,
        isLoading,
        saveStatus,
        updateSetting,
        updateSocialAccount,
        saveSettings,
        resetSettings,
        changeEmail,
        enableTwoFactor,
        disableTwoFactor,
        connectSocialAccount,
        disconnectSocialAccount
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};
