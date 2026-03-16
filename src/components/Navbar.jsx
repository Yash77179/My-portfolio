import React from 'react';
import StaggeredMenu from './ui/StaggeredMenu';
import { navLinks } from '../data/portfolioData';
import ScrollLogo from './ScrollLogo';

const Navbar = () => {
    // Map existing navLinks
    const menuItems = navLinks.map(link => ({
        label: link.label,
        link: link.href,
        ariaLabel: link.label
    }));

    // Placeholder social items from footer
    const socialItems = [
        { label: 'LinkedIn', link: '#' },
        { label: 'GitHub', link: '#' },
        { label: 'Behance', link: '#' },
        { label: 'Dribbble', link: '#' }
    ];

    return (
        <>
            <ScrollLogo />
            <StaggeredMenu
                items={menuItems}
                socialItems={socialItems}
                displaySocials={true}
                logo={<div className="w-[120px] md:w-[150px]"></div>} 
                isFixed={true}
                position="right"
                menuButtonColor="#ffffff"
                openMenuButtonColor="#ffffff"
                accentColor="#ffffff"
                colors={['#1c1c2e', '#11111c', '#050508']}
            />
        </>
    );
};

export default Navbar;