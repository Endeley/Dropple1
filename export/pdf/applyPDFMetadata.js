export const applyPDFMetadata = (pdfDoc, meta) => {
    pdfDoc.setTitle(meta.title || 'Dropple Document');
    pdfDoc.setCreator('Dropple Editor');
    pdfDoc.setProducer('Dropple Export Engine');
};
