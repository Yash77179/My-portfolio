import React, { useEffect } from 'react';
import Desktop from '../components/os/Desktop';
import { useNavigate } from 'react-router-dom';

const DesktopPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("DesktopPage mounted successfully!");
        // Prevent scrolling on the body when in OS mode
        document.body.style.overflow = 'hidden';
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleShutdown = () => {
        console.log("Shutting down OS...");
        // Navigate back to the main portfolio page
        navigate('/', { replace: true });
    };

    return (
        <div id="windows-desktop" className="h-screen w-screen overflow-hidden bg-black relative">
            <Desktop onShutdown={handleShutdown} />
        </div>
    );
};

export default DesktopPage;