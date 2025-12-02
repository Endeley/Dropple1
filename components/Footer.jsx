'use client';

import Link from 'next/link';
import '@/app/footer.css';

const productLinks = [
    { id: 'graphic-design', label: 'Design Studio' },
    { id: 'image-editing', label: 'Image Editor' },
    { id: 'graphic', label: 'Graphic Design' },
    { id: 'ui-ux', label: 'UI/UX Design' },
    { id: 'video-editing', label: 'Video Editor' },
    { id: 'cartoon-animation', label: 'Animation & Cartoons' },
    { id: 'ai-studio', label: 'AI Studio' },
    { id: 'dev-mode', label: 'Developer Mode' },
    { id: 'material-ui', label: 'Material UI Mode' },
    { id: 'icon-mode', label: 'Icon Design Mode' },
    { id: '', label: 'Dropple Pro' },
    { id: '', label: 'Dropple Mobile (soon)' },
    { id: '', label: 'Dropple Desktop (soon)' },
];

const featureLinks = ['Components & Variants', 'Prototyping', 'Export to Code', 'Timeline Editor', 'Keyframes & Easing', 'AI Image Generator', 'AI Mockup Generator', 'Code Export (React/Tailwind)', 'MUI Components', 'Vector Icons', 'SVG Export'];
const modules = ['Flyers', 'Posters', 'Social Media Graphics', 'Resumes & CVs', 'Business Cards', 'Presentations', 'Brand Kits', 'Certificates', 'Background Remover', 'Photo Enhancer', 'AI Upscale', 'Magic Erase', 'Filters & Adjustments', 'Vector Tools', 'Pen Tool', 'Gradients'];

const templateLinks = [
    'Flyer Templates',
    'Poster Templates',
    'Resume Templates',
    'YouTube Thumbnail Templates',
    'Instagram Post Templates',
    'Logo Templates',
    'Business Card Templates',
    'Invoice Templates',
    'Presentation Templates',
    'TikTok Templates',
    'Real Estate Templates',
    'Podcast Cover Templates',
    'Restaurant Menu Templates',
];

const resourceLinks = [
    { href: '/docs', label: 'Docs' },
    { href: '/api', label: 'API Reference' },
    { href: '#', label: 'Tutorials' },
    { href: '#', label: 'Guides' },
    { href: '#', label: 'Changelog' },
    { href: '#', label: 'Community Examples' },
    { href: '#', label: 'Component Library' },
    { href: '#', label: 'Template Library' },
    { href: '#', label: 'Integrations' },
];

const supportLinks = [
    { href: '#', label: 'Help Center' },
    { href: '#', label: 'Contact Support' },
    { href: '#', label: 'Submit a Ticket' },
    { href: '#', label: 'Status Page' },
    { href: '#', label: 'Report a Bug' },
    { href: '#', label: 'Feature Requests' },
    { href: '#', label: 'Keyboard Shortcuts' },
    { href: '#', label: 'Community Forum' },
];

const companyLinks = [
    { href: '/about', label: 'About Us' },
    { href: '#', label: 'Our Mission' },
    { href: '#', label: 'Team' },
    { href: '#', label: 'Careers' },
    { href: '#', label: 'Affiliate Program' },
    { href: '#', label: 'Press & Media' },
    { href: '#', label: 'Partners' },
    { href: '#', label: 'Roadmap' },
];

const legalLinks = [
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms of Service' },
    { href: '#', label: 'Cookie Policy' },
    { href: '#', label: 'Refund Policy' },
    { href: '#', label: 'License Agreement' },
    { href: '#', label: 'DMCA Notice' },
    { href: '#', label: 'User Safety Guidelines' },
];

const toolsLinks = [
    { href: '#', label: 'Dropple API' },
    { href: '#', label: 'Webhooks' },
    { href: '#', label: 'Developer Keys' },
    { href: '#', label: 'OAuth Apps' },
    { href: '#', label: 'Brand Assets' },
    { href: '#', label: 'Design Tokens' },
    { href: '#', label: 'CLI Tools' },
];

const socialLinks = [
    { href: '#', label: 'Twitter / X' },
    { href: '#', label: 'Instagram' },
    { href: '#', label: 'YouTube' },
    { href: '#', label: 'LinkedIn' },
    { href: '#', label: 'Facebook' },
    { href: '#', label: 'TikTok' },
    { href: '#', label: 'Behance' },
    { href: '#', label: 'Dribbble' },
    { href: '#', label: 'GitHub' },
];

export default function Footer() {
    const scrollToSection = (id) => {
        if (!id) return;
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className='footer-container'>
            <div className='footer-inner desktop-row'>
                <div className='footer-brand'>
                    <div className='footer-logo'>
                        <img src='/logo.png' alt='Dropple logo' />
                        <span className='sr-only'>Dropple</span>
                    </div>
                    <div className='footer-badge'>
                        <span className='footer-badge-dot' />
                        <span className='footer-badge-text'>Live studio</span>
                    </div>
                    <h2 className='footer-title'>Dropple</h2>
                    <p className='footer-desc'>Motion-first creative studio for design, video, animation, and AI. Build, animate, and ship from one workspace.</p>
                    <div className='footer-cta-row'>
                        <Link href='#' className='footer-btn-primary'>
                            Start free
                        </Link>
                        <Link href='#' className='footer-btn-secondary'>
                            Watch tour
                        </Link>
                    </div>
                </div>

                <div className='footer-columns single-row'>
                    <div className='footer-col'>
                        <h3 className='footer-heading'>Product</h3>
                        <ul className='footer-list'>
                            {productLinks.map((item) => (
                                <li key={item.label}>
                                    <button onClick={() => scrollToSection(item.id)} className='footer-link'>
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='footer-col'>
                        <h3 className='footer-heading'>Features</h3>
                        <ul className='footer-list'>
                            {featureLinks.map((item) => (
                                <li key={item}>
                                    <span className='footer-link'>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='footer-col'>
                        <h3 className='footer-heading'>Modules</h3>
                        <ul className='footer-list'>
                            {modules.map((item) => (
                                <li key={item}>
                                    <span className='footer-link'>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='footer-col'>
                        <h3 className='footer-heading'>Templates</h3>
                        <ul className='footer-list'>
                            {templateLinks.map((item) => (
                                <li key={item}>
                                    <span className='footer-link'>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='footer-col'>
                        <h3 className='footer-heading'>Resources</h3>
                        <ul className='footer-list'>
                            {resourceLinks.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className='footer-link'>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='footer-col'>
                        <h3 className='footer-heading'>Support</h3>
                        <ul className='footer-list'>
                            {supportLinks.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className='footer-link'>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='footer-col'>
                        <h3 className='footer-heading'>Company</h3>
                        <ul className='footer-list'>
                            {companyLinks.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className='footer-link'>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='footer-col'>
                        <h3 className='footer-heading'>Legal</h3>
                        <ul className='footer-list'>
                            {legalLinks.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className='footer-link'>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='footer-col'>
                        <h3 className='footer-heading'>Tools & API</h3>
                        <ul className='footer-list'>
                            {toolsLinks.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className='footer-link'>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='footer-col'>
                        <h3 className='footer-heading'>Social</h3>
                        <ul className='footer-list'>
                            {socialLinks.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className='footer-link'>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className='footer-bottom'>
                <span className='footer-bottom-text'>© {new Date().getFullYear()} Dropple. All rights reserved.</span>
                <div className='footer-bottom-links'>
                    <Link href='#' className='footer-link'>
                        Privacy
                    </Link>
                    <Link href='#' className='footer-link'>
                        Terms
                    </Link>
                    <Link href='#' className='footer-link'>
                        Security
                    </Link>
                </div>
            </div>
        </footer>
    );
}
