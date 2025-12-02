export { default as UploadsPanel } from './UploadsPanel';
export { default as UploadDropzone } from './UploadDropzone';
export { default as UploadGrid } from './UploadGrid';
export { default as UploadItem } from './UploadItem';

// Re-export canonical photo panels so legacy imports can keep using the Uploads namespace.
export { default as PhotosAIPanel } from '../Photos/PhotosAIPanel';
export { default as PhotosCollectionsPanel } from '../Photos/PhotosCollectionsPanel';
export { default as PhotosCutoutsPanel } from '../Photos/PhotosCutoutsPanel';
export { default as PhotosStockPanel } from '../Photos/PhotosStockPanel';
