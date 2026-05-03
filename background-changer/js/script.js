const title = document.getElementById("title");

function getRandomColor() {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');;
    return color;
}

function setNewBackground() {
    color = getRandomColor();
    document.body.style.backgroundColor = color;
}

function setNewTextColor() {
    color = getRandomColor();
    title.style.color = color;
}

setInterval(() => {
    setNewBackground();
    setNewTextColor();
}, 1500);