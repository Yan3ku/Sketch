const canvas: HTMLDivElement    = document.querySelector("#canvas"); 
const input:  HTMLInputElement  = document.querySelector("#tile-count-input"); 
const label:  HTMLLabelElement  = document.querySelector("#tile-count-label"); 
const pen:    HTMLButtonElement = document.querySelector("#pen")
const eraser: HTMLButtonElement = document.querySelector("#eraser");
const clear:  HTMLButtonElement = document.querySelector("#clear");
const color:  HTMLInputElement  = document.querySelector("#color");
let isMouseDown = false;

const createTiles = (tileCount: number): HTMLDivElement[] => {
    return Array(tileCount ** 2)
        .fill(100 / tileCount + "%")
        .map((size) => {
            let tile = document.createElement("div")
            tile.style.width = tile.style.height = size;
            tile.onmousedown = tile.onmouseover = (e) => {
                e.preventDefault();
                if (e.type == "mouseover" && !isMouseDown) return false;
                tile.style.backgroundColor =
                    pen.classList.contains("active-mode") ?
                        color.value : canvas.style.backgroundColor;
            }
            return tile;
        })
}


const initCanvas = (input: HTMLInputElement, label: HTMLLabelElement, canvas: HTMLDivElement) => {
    canvas.innerHTML = "";
    label.textContent = `${input.value}x${input.value}`
    let tiles = createTiles(Number(input.value));
    for (let tile of tiles) canvas.appendChild(tile)
}


const changeMode = (selected: HTMLButtonElement, deselected: HTMLButtonElement) => {
    selected.classList.add("active-mode")
    deselected.classList.remove("active-mode")
}


document.body.onmousedown = () => isMouseDown = true;
document.body.onmouseup = () => isMouseDown = false;

color.value = window.localStorage.getItem("color");
initCanvas(input, label, canvas)
color.onchange = () => window.localStorage.setItem("color", color.value)
input.onchange = () => initCanvas(input, label, canvas);

changeMode(pen, eraser);
pen.onclick    = () => changeMode(pen, eraser);
eraser.onclick = () => changeMode(eraser, pen);
clear.onclick  = () => initCanvas(input, label, canvas);
