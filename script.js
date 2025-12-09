// GOBLAS AND CONSTANTS

// Array donde guardaremos todas las tareas
let tasks = []



const API_URL = "https://jsonplaceholder.typicode.com";

// Elementos principales del DOM 
// TASK -- PANEL
const taskGrid = document.getElementById("task-grid");
const summaryTotal = document.getElementById("summary-total");
const summaryDone = document.getElementById("summary-done");
const summaryPending = document.getElementById("summary-pending");

// MODAL -- NEW TASK
const modalOverlay = document.getElementById("task-modal");
const btnAddTask = document.getElementById("btn-add-task");
const btnCancelForm = document.getElementById("btn-cancel-form");
const taskForm = document.getElementById("task-form");
const titleInput = document.getElementById("title");
const titleError = document.getElementById("title-error");
const formFeedback = document.getElementById("form-feedback");

// APP INITIALIZATION

/**
 * Función principal que se ejecuta cuando el DOM está listo.
 * - Carga las tareas iniciales desde la API.
 * - Configura los eventos básicos (modal, etc.).
 */
document.addEventListener("DOMContentLoaded", () => {
    setupModalEvents();
    loadInitialTasks();
})

// FETCH TASKS

/**
 * Carga las primeras 10 tareas desde la API usando async/await.
 * Mientras se obtienen los datos, muestra un mensaje de "Loading...".
 */
async function loadInitialTasks(){
    // mostrar loanding
    showLoadingMessage("Loading tasks...");

    try {
        // limitado a 10 obj
        const response = await fetch(`${API_URL}/todos?_limit=10`);

        if (!response.ok) {
            throw new Error("Error fetching tasks from  API")
        }

        // respones to json 
        const data = await response.json();
        // save to array and update data
        tasks = data;
        renderTasks();
        updateSummary();
    } catch (error){
        console.error(error),
        showLoadingMessage("There was a problem loading tasks...");;
    }
}

/**
 * Muestra un mensaje simple dentro del grid de tareas.
 */ 
function showLoadingMessage(message) {
    taskGrid.innerHTML= `<p class="loading-message">${message}</p>`;
}

/**
 * Renderiza todas las tareas en el grid en formato "board".
 */
function renderTasks(){
    if (!tasks || tasks.length === 0) {
        showLoadingMessage("No tasks to show yet.");
        return;
    }
    // limpiamos el grid
    taskGrid.innerHTML= "";

    // Recorremos el array de tasks y creamos una card para cada una
    tasks.forEach((task) => {
        const card = createTaskCard(task);
        taskGrid.appendChild(card);
    });
}

/**
 * Crea y devuelve un elemento <article> que representa
 * una tarjeta de tarea en la vista tipo "bento".
 */
function createTaskCard(task) {
    const article = document.createElement("article");
    article.classList.add("task-card");
    article.dataset.id = task.id;

    if (task.completed) {
        article.classList.add("task-card--completed");
    }

    // basic card
    article.innerHTML=`
    <header class= "task-card_header">
        <h3 class= "task-card_title">
        ${escapeHTML(task.title)} </h3>
        <div class="task-card_actions">
            <button type="button" class="tag-btn">edit</button>
            <button type="button" class="tag-btn tag-btn--danger">remove</button>
        </div>
    </header>
    <p class="task-card_status">
        Status: <span>${task.completed ? "✅ Done" : "⬜ Pending"}</span>
    </p>
    `;

    return article;
}

/**
 * Ayuda para evitar problemas si el título
 * trae caracteres raros. Se encarga de "escapar" texto.
 */
function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}


/**
 * Calcula y actualiza los contadores de:
 * - Total de tareas
 * - Tareas completadas
 * - Tareas pendientes
 */ 
function updateSummary() { 
    const total = tasks.length;
    const done = tasks.filter((task) => task.completed).length;
    const pending = total - done;

    summaryTotal.textContent = total;
    summaryDone.textContent = done;
    summaryPending.textContent = pending;
}

// MODAL -- NEW TAKS
function setupModalEvents(){
    if (!btnAddTask || !modalOverlay || !btnCancelForm) return;

    //open modal
    btnAddTask.addEventListener("click", ()=>{
        openTaskModal();
    });

    //cerrar modal -> btn cancel
    btnCancelForm.addEventListener("click", ()=>{
        closeTaskModal();
    });

    //cerrar si da click fuera del modal
    modalOverlay.addEventListener("click", (event)=>{
        if (event.target === modalOverlay) {
        closeTaskModal();
    }

    });
}

function openTaskModal() {
    modalOverlay.classList.add("is-visible");
    taskForm.reset();
    titleError.textContent = "";
    formFeedback.textContent = "";
    titleInput.focus();
}

function closeTaskModal(){
    modalOverlay.classList.remove("is-visible");
}