function updateCanvasSize() {
    // Viewportのサイズを取得
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;

    // CanvasサイズをViewportのサイズに設定
    if (viewportWidth * 3 > viewportHeight * 4) {
        let size = (viewportHeight-10) / 480;
        canvas.style.transform = `scale(${size},${size})`;
    } else {
        let size = (viewportWidth-10) / 640;
        canvas.style.transform = `scale(${size},${size})`;
    }
}
updateCanvasSize();
window.addEventListener("resize", updateCanvasSize);