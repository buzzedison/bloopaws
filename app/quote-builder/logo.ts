/** Normalize browser-decodable raster logos for PDFKit and local storage. */
export async function prepareLogo(file: File): Promise<string> {
  if (file.size > 10 * 1024 * 1024)
    throw new Error("Choose a logo under 10 MB.");
  if (
    !["image/png", "image/jpeg", "image/webp"].includes(file.type) &&
    !(file.type === "" && /\.(png|jpe?g|webp)$/i.test(file.name))
  ) {
    throw new Error(
      "Choose a PNG, JPG or WebP image. Export other formats as PNG first.",
    );
  }
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    try {
      await image.decode();
    } catch {
      throw new Error(
        "This image could not be opened. Try another PNG, JPG or WebP file.",
      );
    }
    if (!image.naturalWidth || !image.naturalHeight)
      throw new Error("This image is empty. Try another logo.");
    const canvas = document.createElement("canvas");
    const ratio = Math.min(
      1,
      600 / Math.max(image.naturalWidth, image.naturalHeight),
    );
    canvas.width = Math.max(1, Math.round(image.naturalWidth * ratio));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * ratio));
    const context = canvas.getContext("2d");
    if (!context)
      throw new Error(
        "This browser could not prepare your logo. Try another browser.",
      );
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    let result = canvas.toDataURL("image/png");
    // Preserve transparency. Smaller raster dimensions also cap the PDF payload.
    while (result.length > 390000 && canvas.width > 1 && canvas.height > 1) {
      canvas.width = Math.max(1, Math.floor(canvas.width * 0.75));
      canvas.height = Math.max(1, Math.floor(canvas.height * 0.75));
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      result = canvas.toDataURL("image/png");
    }
    if (result.length > 390000)
      throw new Error("This logo could not be resized. Try a smaller image.");
    return result;
  } finally {
    URL.revokeObjectURL(url);
  }
}
