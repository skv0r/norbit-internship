const STORAGE_KEY = "todo-list-state";

const state = {
    tasks: [],
    filter: "active"
};

const tasksList = document.querySelector(".todo__tasks");
const filterTask = document.querySelector(".todo__filter");
const form = document.querySelector(".todo__form");
const input = document.querySelector(".todo__input");

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/"/g, "&quot;");
}

function findTaskById(id) {
    return state.tasks.find((t) => t.id === id);
}

function getFilteredTasks(state) {
    return state.tasks.reduce((acc, task) => {
        if (state.filter === task.status) {
            acc.push(task);
        }
        return acc;
    }, []);
}

function render(tasks) {
    let html = "";
    tasks.forEach((task) => {
        const safeText = escapeHtml(task.text);
        html += `
        <li class="todo__task todo__task--${task.status}" data-task-id="${task.id}">
            <p class="todo__task-text">${safeText}</p>
            <div class="todo__task-actions">
                <button type="button" class="todo__btn todo__btn--del" aria-label="В корзину">🗑️</button>
                <button type="button" class="todo__btn todo__btn--approve" aria-label="Завершить">✅</button>
                <button type="button" class="todo__btn todo__btn--restore" aria-label="Восстановить">↩️</button>
            </div>
        </li>`;
    });
    tasksList.innerHTML = html;
}

function addTask(text) {
    const trimmed = String(text).trim();
    if (!trimmed) return;

    state.tasks.push({
        id: Date.now(),
        text: trimmed,
        status: "active"
    });

    state.filter = "active";
    filterTask.value = "active";

    render(getFilteredTasks(state));
    saveState();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask(input.value);
    input.value = "";
});

function completeTask(task) {
    task.status = "completed";
}

tasksList.addEventListener("click", (e) => {
    const row = e.target.closest(".todo__task");
    if (!row) return;

    const id = Number(row.dataset.taskId);
    const taskItem = findTaskById(id);
    if (!taskItem) return;

    if (e.target.closest(".todo__btn--approve")) {
        if (taskItem.status !== "active") return;
        completeTask(taskItem);
    } else if (e.target.closest(".todo__btn--del")) {
        if (taskItem.status === "deleted") {
            deleteTask(taskItem.id);
        } else {
            moveToTrash(taskItem);
        }
    } else if (e.target.closest(".todo__btn--restore")) {
        if (taskItem.status !== "deleted" && taskItem.status !== "completed") return;
        restoreTask(taskItem);
    } else {
        return;
    }

    render(getFilteredTasks(state));
    saveState();
});

function moveToTrash(task) {
    if (task.status === "active" || task.status === "completed") {
        task.status = "deleted";
    }
}

function restoreTask(task) {
    if (task.status === "deleted" || task.status === "completed") {
        task.status = "active";
    }
}

function deleteTask(taskId) {
    state.tasks = state.tasks.filter((t) => t.id !== taskId);
}

function saveState() {
    try {
        const payload = {
            tasks: state.tasks,
            filter: state.filter
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
        /* storage недоступен */
    }
}

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return false;

        const data = JSON.parse(raw);
        if (!data || !Array.isArray(data.tasks)) return false;

        state.tasks = data.tasks;
        const allowed = ["active", "completed", "deleted"];
        if (typeof data.filter === "string" && allowed.includes(data.filter)) {
            state.filter = data.filter;
        }

        return true;
    } catch {
        return false;
    }
}

filterTask.addEventListener("change", () => {
    state.filter = filterTask.value;
    render(getFilteredTasks(state));
    saveState();
});

const testTasks = [
    { id: 1, text: "Купить молоко", status: "active" },
    { id: 2, text: "Сделать домашку", status: "completed" },
    { id: 3, text: "Старую задачу в корзину", status: "deleted" }
];

if (!loadState()) {
    state.tasks = testTasks;
}

filterTask.value = state.filter;

render(getFilteredTasks(state));
