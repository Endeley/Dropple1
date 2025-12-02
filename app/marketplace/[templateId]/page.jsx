import TemplatePreviewPage from '@/marketplace/pages/[templateId]';

export default function MarketplaceTemplatePage({ params }) {
    return <TemplatePreviewPage params={params} />;
}
