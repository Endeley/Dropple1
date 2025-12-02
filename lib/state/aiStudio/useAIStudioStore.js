import { create } from "zustand";

export const useAIStudioStore = create((set) => ({
  mode: "image",
  setMode: (mode) => set({ mode }),

  history: [],
  addHistory: (item) => set((s) => ({ history: [item, ...s.history] })),

  selectedResult: null,
  setSelectedResult: (r) => set({ selectedResult: r }),

  isGenerating: false,
  setGenerating: (v) => set({ isGenerating: v }),

  // Smart Edit Mode
  editMode: "remove",
  setEditMode: (m) => set({ editMode: m }),

  brushSize: 20,
  setBrushSize: (value) => set({ brushSize: value, maskBrushSize: value }),

  maskBrushSize: 20,
  maskSoftness: 0.5,
  setMaskBrushSize: (value) => set({ maskBrushSize: value }),
  setMaskSoftness: (value) => set({ maskSoftness: value }),

  maskCanvas: null,
  setMaskCanvas: (canvas) => set({ maskCanvas: canvas }),

  // Mockup Mode
  mockupType: "tshirt-front",
  setMockupType: (mockupType) => set({ mockupType }),

  mockupStyle: "studio",
  setMockupStyle: (mockupStyle) => set({ mockupStyle }),

  uploadedDesign: null,
  setUploadedDesign: (file) => set({ uploadedDesign: file }),

  // Video AI mode
  videoSource: null,
  setVideoSource: (file) => set({ videoSource: file }),

  videoPreview: null,
  setVideoPreview: (url) => set({ videoPreview: url }),

  videoModel: "svd",
  setVideoModel: (videoModel) => set({ videoModel }),

  videoDuration: 4,
  setVideoDuration: (videoDuration) => set({ videoDuration }),

  videoMotion: "camera-pan",
  setVideoMotion: (videoMotion) => set({ videoMotion }),

  // Audio AI mode
  audioSource: null,
  setAudioSource: (file) => set({ audioSource: file }),

  audioPreview: null,
  setAudioPreview: (url) => set({ audioPreview: url }),

  voiceStyle: "narrator",
  setVoiceStyle: (voiceStyle) => set({ voiceStyle }),

  audioModel: "elevenlabs",
  setAudioModel: (audioModel) => set({ audioModel }),

  audioMusicStyle: "cinematic",
  setAudioMusicStyle: (audioMusicStyle) => set({ audioMusicStyle }),

  // Template Generator Mode
  templateCategory: "poster",
  setTemplateCategory: (templateCategory) => set({ templateCategory }),

  templateSize: "1080x1350",
  setTemplateSize: (templateSize) => set({ templateSize }),

  generatedTemplateJSON: null,
  setGeneratedTemplateJSON: (generatedTemplateJSON) =>
    set({ generatedTemplateJSON }),

  // Dev Mode
  devSelectedLayer: null,
  setDevSelectedLayer: (devSelectedLayer) => set({ devSelectedLayer }),

  devGeneratedCode: "",
  setDevGeneratedCode: (devGeneratedCode) => set({ devGeneratedCode }),

  devExportType: "react",
  setDevExportType: (devExportType) => set({ devExportType }),
}));
