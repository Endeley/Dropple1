export const calculatePixelSize = (widthInMM, heightInMM, dpi) => {
    const mmToInch = 0.0393701;
    return {
        width: Math.round(widthInMM * mmToInch * dpi),
        height: Math.round(heightInMM * mmToInch * dpi),
    };
};
