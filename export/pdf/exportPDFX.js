import { PDFDocument } from 'pdf-lib';
import { applyPDFMetadata } from './applyPDFMetadata';

export const exportPDFX = async (pages, colorProfile) => {
    const pdfDoc = await PDFDocument.create();

    for (const page of pages) {
        if (!page.preview) continue;
        const pngBytes = await fetch(page.preview).then((r) => r.arrayBuffer());

        const img = await pdfDoc.embedPng(pngBytes);
        const pageWidth = img.width;
        const pageHeight = img.height;

        const pdfPage = pdfDoc.addPage([pageWidth, pageHeight]);
        pdfPage.drawImage(img, {
            x: 0,
            y: 0,
            width: pageWidth,
            height: pageHeight,
        });
    }

    applyPDFMetadata(pdfDoc, { title: 'Dropple Document', colorProfile });

    const pdfBytes = await pdfDoc.save();
    downloadBlob(pdfBytes, 'dropple-print.pdf');
};

const downloadBlob = (data, name) => {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
};
