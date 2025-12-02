import PreviewHero from '../components/PreviewHero';
import PreviewActions from '../components/PreviewActions';

export default function TemplatePreviewPage({ params }) {
    const { templateId } = params;

    return (
        <div className='text-white'>
            <PreviewHero templateId={templateId} />
            <PreviewActions templateId={templateId} />
        </div>
    );
}
