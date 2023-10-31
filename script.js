const canvas = document.querySelector("#canvas");
const input = document.querySelector("#tile-count-input");
const label = document.querySelector("#tile-count-label");
const pen = document.querySelector("#pen");
const eraser = document.querySelector("#eraser");
const clear = document.querySelector("#clear");
const color = document.querySelector("#color");
let isMouseDown = false;
const createTiles = (tileCount) => {
    return Array(tileCount ** 2)
        .fill(100 / tileCount + "%")
        .map((size) => {
        let tile = document.createElement("div");
        tile.style.width = tile.style.height = size;
        tile.onmousedown = tile.onmouseover = (e) => {
            e.preventDefault();
            if (e.type == "mouseover" && !isMouseDown)
                return false;
            tile.style.backgroundColor =
                pen.classList.contains("active-mode") ?
                    color.value : canvas.style.backgroundColor;
        };
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
const changeMode = (selected, deselected) => {
    selected.classList.add("active-mode");
    deselected.classList.remove("active-mode");
};
document.body.onmousedown = () => isMouseDown = true;
document.body.onmouseup = () => isMouseDown = false;
initCanvas(input, label, canvas);
input.onchange = () => initCanvas(input, label, canvas);
changeMode(pen, eraser);
pen.onclick = () => changeMode(pen, eraser);
eraser.onclick = () => changeMode(eraser, pen);
clear.onclick = () => initCanvas(input, label, canvas);
