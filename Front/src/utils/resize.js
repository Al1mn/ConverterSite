export function calculateFontSize(targetWidth, targetHeight, windowWidth, windowHeight) {
    if (!targetWidth || !targetHeight) return 12;

    const padding = 20;
    const FONT_ASPECT_RATIO = 0.6;

    const maxFontForWidth = (windowWidth - padding) / (targetWidth * FONT_ASPECT_RATIO);
    const maxFontForHeight = (windowHeight - padding) / targetHeight;

    return Math.min(maxFontForWidth, maxFontForHeight);
}