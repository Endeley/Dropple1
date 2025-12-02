import Image from 'next/image';
import './landing.css'; 
import Link from 'next/link';
import Footer from '@/components/Footer';
import Hero from '@/components/landing/Hero';
import GraphicDesign from '@/components/landing/GraphicDesign';
import UiUx from '@/components/landing/UiUx';
import CartoonAnimation from '@/components/landing/CartoonAnimation';
import VideoEditing from '@/components/landing/VideoEditing';
import AiStudio from '@/components/landing/AiStudio';
import PodcastStudio from '@/components/landing/PodcastStudio';
import Branding from '@/components/landing/Branding';
import Education from '@/components/landing/Education';
import DevMode from '@/components/landing/DevMode';
import DocsApis from '@/components/landing/DocsApis';
import IconMode from '@/components/landing/IconMode';
import MaterialUi from '@/components/landing/MaterialUi';

export default function Home() {
    return (
        <>
            <header className='landing-topbar'>
                <div className='landing-container topbar-inner'>
                    <Link href='/' className='topbar-brand'>
                        <Image src='/logo.png' alt='Dropple logo' className='topbar-logo' width={40} height={40} priority />
                        <span className='topbar-name'>Dropple</span>
                    </Link>
                </div>
            </header>

            <main className='landing-main'>
                <Hero />
                <GraphicDesign />
                <UiUx />
                <CartoonAnimation />
                <VideoEditing />
                <AiStudio />
                <PodcastStudio />
                <Branding />
                <Education />
                <DevMode />
                <DocsApis />
                <IconMode />
                <MaterialUi />
            </main>
            <Footer />
        </>
    );
}
