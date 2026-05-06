const columns = document.querySelectorAll(".col-color")

const LOCK_OPEN_SVG = `<svg width="64px" height="64px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 2C10.6716 2 10 2.67157 10 3.5V6H13V16H1V6H8V3.5C8 1.567 9.567 0 11.5 0C13.433 0 15 1.567 15 3.5V4H13V3.5C13 2.67157 12.3284 2 11.5 2ZM9 10H5V12H9V10Z" fill="#333"/>
</svg>`;

const LOCK_CLOSED_SVG = `<svg width="64px" height="64px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 6V4C4 1.79086 5.79086 0 8 0C10.2091 0 12 1.79086 12 4V6H14V16H2V6H4ZM6 4C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4V6H6V4ZM7 13V9H9V13H7Z" fill="#333"/>
</svg>`;

function updateHash() {
    const colors = [...columns].map((col) => {
      const hex = col.querySelector(".hex").textContent.trim(); 
      return hex.substring(1);
    });
  
    location.hash = colors.join("-");
  }

  function applyHashOnLoad() {
    const hash = location.hash.replace("#", "");
    if (!hash) return;
  
    const colors = hash.split("-");
    columns.forEach((col, i) => {
      const value = colors[i];
      if (!value) return;
  
      const color = `#${value}`;
      col.style.backgroundColor = color;
      col.querySelector(".hex").textContent = color;
    });
  }


function getRandomColor() {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');;
    return color;
}

function changeBackgroundColor(col) {
    if (col.classList.contains("locked")) return;

    const color = getRandomColor();
    col.style.backgroundColor = color;

    const hexEl = col.querySelector(".hex");
    if (hexEl) {
        hexEl.textContent = color;
    }
}

function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = "toast";
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 1000);
}

columns.forEach((col) => {
    const colButton = col.querySelector(".lock")
    const colText = col.querySelector(".hex")

    colButton.innerHTML = LOCK_OPEN_SVG;

    //col.addEventListener(`click`, () => changeBackgroundColor(col))
    document.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
            const tag = document.activeElement?.tagName;
            if (tag === "BUTTON" || tag === "INPUT" || tag === "TEXTAREA") return;
            columns.forEach((cok) => {
                changeBackgroundColor(col)
            })
            updateHash()
        }
    })

    colButton.addEventListener("click", (e) => {
        e.stopPropagation();
        const isLocked = col.classList.toggle("locked");
        colButton.innerHTML = isLocked ? LOCK_CLOSED_SVG : LOCK_OPEN_SVG;
        colButton.blur();
    })

    colText.addEventListener("click", async (e) => {
        e.stopPropagation();

        const textToCopy = colText.textContent.trim();

        try {
            await navigator.clipboard.writeText(textToCopy);
            showToast("Текст успешно скопирован")
        } catch (err) {
            showToast("Ошибка при копировании")
        }
    });
})



applyHashOnLoad();