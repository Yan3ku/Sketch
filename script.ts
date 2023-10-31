const createTiles = (tileCount: number): HTMLDivElement[] => {
    return Array(tileCount ** 2)
        .fill(100 / tileCount + "%")
        .map((size) => {
            let tile = document.createElement("div")
            tile.style.width = tile.style.height = size;
            return tile;
    });
}

const initCanvas = (input: HTMLInputElement, label: HTMLLabelElement, canvas: HTMLDivElement) => {
    canvas.innerHTML = "";
    label.textContent = `${input.value}x${input.value}`
    let tiles = createTiles(Number(input.value));
    for (let tile of tiles) canvas.appendChild(tile)
}

const selectMode = (selected: HTMLButtonElement, deselected: HTMLButtonElement) => {
    selected.classList.add("active-mode")
    deselected.classList.remove("active-mode")
}

const changeColor = (color: HTMLInputElement, div: HTMLDivElement) => {
    div.style.background-color = color.value;
}

const canvas: HTMLDivElement    = document.querySelector("#canvas"); 
const input:  HTMLInputElement  = document.querySelector("#tile-count-input"); 
const label:  HTMLLabelElement  = document.querySelector("#tile-count-label"); 
const pen:    HTMLButtonElement = document.querySelector("#pen")
const eraser: HTMLButtonElement = document.querySelector("#eraser");
const color:  HTMLInputElement  = document.querySelector("#color");
let isMouseDown = false;

window.addEventListener("mousedown", () => isMouseDown = true)
window.addEventListener("mouseup",   () => isMouseDown = false)

initCanvas(input, label, canvas)
input.addEventListener('input', initCanvas.bind(null, input, label, canvas))

selectMode(pen, eraser);
pen.addEventListener("click", selectMode.bind(null, pen, eraser))
eraser.addEventListener("click",  selectMode.bind(null, eraser, pen))

for (const child of canvas.children)
    child.addEventListener("mouseover", (e) => console.log(isMouseDown);)

