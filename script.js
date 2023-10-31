const createTiles = (tileCount) => {
    return Array(tileCount ** 2)
        .fill(100 / tileCount + "%")
        .map((size) => {
        let tile = document.createElement("div");
        tile.style.width = tile.style.height = size;
        return tile;
    });
};
const initCanvas = (input, label, canvas) => {
    canvas.innerHTML = "";
    label.textContent = `${input.value}x${input.value}`;
    let tiles = createTiles(Number(input.value));
    for (let tile of tiles)
        canvas.appendChild(tile);
};
const selectMode = (selected, deselected) => {
    selected.classList.add("active-mode");
    deselected.classList.remove("active-mode");
};
const changeColor = (color, div) => {
    div.style.background - color;
    color.value;
};
const canvas = document.querySelector("#canvas");
const input = document.querySelector("#tile-count-input");
const label = document.querySelector("#tile-count-label");
const pen = document.querySelector("#pen");
const eraser = document.querySelector("#eraser");
const color = document.querySelector("#color");
let isMouseDown = false;
window.addEventListener("mousedown", () => isMouseDown = true);
window.addEventListener("mouseup", () => isMouseDown = false);
initCanvas(input, label, canvas);
input.addEventListener('input', initCanvas.bind(null, input, label, canvas));
selectMode(pen, eraser);
pen.addEventListener("click", selectMode.bind(null, pen, eraser));
eraser.addEventListener("click", selectMode.bind(null, eraser, pen));
for (const child of canvas.children)
    child.addEventListener("mouseover", (e) => console.log(isMouseDown));
