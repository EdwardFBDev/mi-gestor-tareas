// GLOBALS AND CONSTANTS

// tasks array global
let tasks = [];

let currentFilter = "all";
// search text state
let searchQuery = ""; 

const API_URL = "https://jsonplaceholder.typicode.com";

// main DOM elements 
// task panel 
const taskGrid = document.getElementById("task-grid");
const summaryTotal = document.getElementById("summary-total");
const summaryDone = document.getElementById("summary-done");
const summaryPending = document.getElementById("summary-pending");

// modal new task 
const modalOverlay = document.getElementById("task-modal");
const btnAddTask = document.getElementById("btn-add-task");
const btnCancelForm = document.getElementById("btn-cancel-form");
const taskForm = document.getElementById("task-form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const completedInput = document.getElementById("completed");
const titleError = document.getElementById("title-error");
const formFeedback = document.getElementById("form-feedback");
const modalTitle = document.getElementById("task-modal-title");

// filter and quick tools 
const filterButtons = document.querySelectorAll(".btn-filter");
const searchInput = document.getElementById("search-task");
const btnClearCompleted = document.getElementById("btn-clear-completed");
const btnResetFilters = document.getElementById("btn-reset-filters");
const btnLoadDemo = document.getElementById("btn-load-demo");

// editing id state
let editingTaskId = null;

// APP INITIALIZATION

/**
 * Función principal que se ejecuta cuando el DOM está listo.
 * - Carga las tareas iniciales desde la API.
 * - Configura los eventos básicos (modal, etc.).
 */
document.addEventListener("DOMContentLoaded", () => {
    // init modal events
    setupModalEvents();
    setupFilterEvents();
    setupSearchEvent();
    setupQuickTools();
    loadInitialTasks();
});

// FETCH TASKS

/**
 * Carga las primeras 10 tareas desde la API usando async/await.
 * muestra un mensaje de "Loading...".
 */
async function loadInitialTasks(){
    // show loading message
    showLoadingMessage("Loading tasks...");

    try {
        // fetch 10 items
        const response = await fetch(`${API_URL}/todos?_limit=10`);

        if (!response.ok) {
            throw new Error("Error fetching tasks from API");
        }

        // response to json 
        const data = await response.json();
        // add local fields (isRecent, description)
        tasks = data.map((task) => ({
            ...task,
            isRecent: false,
            description: ""
        }));
        // render tasks and update summary
        renderTasks();
        updateSummary();
    } catch (error){
        console.error(error);
        showLoadingMessage("There was a problem loading tasks...");
    }
}

/**
 * Muestra un mensaje simple dentro del grid de tareas.
 */ 
function showLoadingMessage(message) {
    // set loading text in grid
    taskGrid.innerHTML= `<p class="loading-message">${message}</p>`;
}

/**
 * Devuelve las tareas que deben mostrarse en pantalla con filtros.
 */
function getVisibleTasks() {
  // normalize search text
  let visible = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // apply filter (all, completed, pending, recent)
  if (currentFilter === "completed") {
    visible = visible.filter((task) => task.completed);
  } else if (currentFilter === "pending") {
    visible = visible.filter((task) => !task.completed);
  } else if (currentFilter === "recent") {
    visible = visible.filter((task) => task.isRecent);
  }

  return visible;
}

/**
 * Renderiza todas las tareas en el grid en formato "board".
 */
function renderTasks(){
    const visibleTasks = getVisibleTasks();

    if (!visibleTasks || visibleTasks.length === 0) {
        showLoadingMessage("No tasks to show.");
        return;
    }

    // clear grid
    taskGrid.innerHTML = "";

    visibleTasks.forEach((task) => {
        // create card for board view
        const card = createTaskCard(task);
        // append card to grid
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

    // card template board
    article.innerHTML=`
    <header class="task-card_header">
        <h3 class="task-card_title">${escapeHTML(task.title)}</h3>
        <div class="task-card_actions">
            <button type="button" class="tag-btn">edit</button>
            <button type="button" class="tag-btn tag-btn--danger">remove</button>
        </div>
    </header>
    <p class="task-card_status">
        Status: <span>${task.completed 
            ? `<i class="bi bi-check-circle-fill status-done"></i> Done` 
            : `<i class="bi bi-circle status-pending"></i> Pending`
        }
            </span>
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

    // update summary texts
    summaryTotal.textContent = total;
    summaryDone.textContent = done;
    summaryPending.textContent = pending;
}

// MODAL -- NEW TASK
function setupModalEvents(){
    if (!btnAddTask || !modalOverlay || !btnCancelForm || !taskForm) return;

    // open modal on add click
    btnAddTask.addEventListener("click", ()=>{
        // reset editing state
        editingTaskId = null;
        openTaskModal();
    });

    // close modal on cancel button
    btnCancelForm.addEventListener("click", ()=>{
        closeTaskModal();
    });

    // close modal on overlay click
    modalOverlay.addEventListener("click", (event)=>{
        if (event.target === modalOverlay) {
            closeTaskModal();
        }
    });

    // handle form submit
    taskForm.addEventListener("submit", handleTaskFormSubmit);
}

function openTaskModal() {
    modalOverlay.classList.add("is-visible");
    // reset form fields
    taskForm.reset();
    titleError.textContent = "";
    formFeedback.textContent = "";
    if (modalTitle) {
      // set modal title for create
      modalTitle.textContent = "Add new task";
    }
    titleInput.focus();
}

function closeTaskModal(){
    modalOverlay.classList.remove("is-visible");
    // reset editing id
    editingTaskId = null;
}

/**
 * Maneja el envío del formulario de nueva tarea:
 * - Valida el campo title.
 * - Hace un POST a la API.
 * - Agrega la tarea al inicio del array y vuelve a renderizar.
 */
async function handleTaskFormSubmit(event) {
    // prevent default submit reload
    event.preventDefault();

    // validate title
    const titleValue = titleInput.value.trim();
    const descriptionValue = descriptionInput.value.trim();
    const completedValue = completedInput.checked;

    if (titleValue.length === 0) {
        titleError.textContent = "Title is required.";
        return;
    }

    if (titleValue.length < 3) {
        titleError.textContent = "Title must have at least 3 characters.";
        return;
    }
    titleError.textContent = "";

    // update existing task if editing
    if (editingTaskId !== null) {
        // update task in array
        updateTask(editingTaskId, titleValue, descriptionValue, completedValue);
        return;
    }

    // create payload and send
    const newTaskPayload = {
        title: titleValue,
        completed: completedValue,
        userId: 1
    };

    try {
        formFeedback.textContent = "Saving task...";

        const response = await fetch(`${API_URL}/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTaskPayload)
        });

        if (!response.ok) {
            throw new Error("Error creating task");
        }

        const createdTask = await response.json();

        // create task object in local array
        const newTask = {
            ...createdTask,
            description: descriptionValue,
            isRecent: true
        };
        // add new task at start of array
        tasks.unshift(newTask);

        // re-render tasks and update summary
        renderTasks();
        updateSummary();

        // clear form and feedback
        taskForm.reset();
        formFeedback.textContent = "Task created successfully!";
    } catch (error) {
        console.error(error);
        formFeedback.textContent = "There was an error creating the task.";
    }
}

// update existing task
function updateTask(id, newTitle, newDescription, newCompleted) {
    // find task index
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return;

    // update fields
    tasks[index].title = newTitle;
    tasks[index].description = newDescription;
    tasks[index].completed = newCompleted;
    tasks[index].isRecent = false;

    // re-render
    renderTasks();
    updateSummary();

    // reset editing and close modal
    editingTaskId = null;
    closeTaskModal();
}

// EVENT DELEGATION FOR CARD BUTTONS
taskGrid.addEventListener("click", (event) => {
    const target = event.target;
    // find closest card
    const card = target.closest(".task-card");
    if (!card) return;

    // get id from dataset
    const taskId = Number(card.dataset.id);

    if (target.classList.contains("tag-btn--danger")) {
        // remove by id
        removeTask(taskId);
        return;
    }

    if (target.classList.contains("tag-btn")) {
        // start editing
        startEditingTask(taskId);
        return;
    }
});

// remove task by id
function removeTask(id) {
    // filter array without id
    tasks = tasks.filter((task) => task.id !== id);
    // re-render and update summary
    renderTasks();
    updateSummary();
}

// start edit mode
function startEditingTask(id) {
    // find task object
    const taskToEdit = tasks.find((task) => task.id === id);
    if (!taskToEdit) return;

    // set editing id
    editingTaskId = id;

    // fill fields with task data
    titleInput.value = taskToEdit.title;
    descriptionInput.value = taskToEdit.description || "";
    completedInput.checked = taskToEdit.completed;

    titleError.textContent = "";
    formFeedback.textContent = "";
    if (modalTitle) {
      // set modal title for edit
      modalTitle.textContent = "Edit task";
    }

    // open modal
    modalOverlay.classList.add("is-visible");
}


/**
 * Configura los eventos de los botones de filtro.
 */
function setupFilterEvents() {

    if (!filterButtons || filterButtons.length === 0) return;

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            // set current filter from data attribute
            currentFilter = btn.dataset.filter || "all";

            // update active filter button style
            filterButtons.forEach((b) => b.classList.remove("is-active"));
            btn.classList.add("is-active");

            // re-render with filter
            renderTasks();
        });
    });
}

/**
 * Configura el evento del input de búsqueda.
 * Filtra en tiempo real por título.
 */
function setupSearchEvent() {
    if (!searchInput) return;

    searchInput.addEventListener("input", () => {
        // update search text and rerender
        searchQuery = searchInput.value;
        renderTasks();
    });
}


// QUICK TOOLS

function setupQuickTools() {
    if (btnClearCompleted) {
        btnClearCompleted.addEventListener("click", () => {
            // remove completed tasks
            tasks = tasks.filter((task) => !task.completed);
            renderTasks();
            updateSummary();
        });
    }

    if (btnResetFilters) {
        btnResetFilters.addEventListener("click", () => {
            // reset filter and search
            currentFilter = "all";
            searchQuery = "";
            if (searchInput) searchInput.value = "";

            // reset active filter button style
            filterButtons.forEach((btn) => {
                btn.classList.toggle("is-active", btn.dataset.filter === "all");
            });

            renderTasks();
            updateSummary();
        });
    }

    if (btnLoadDemo) {
        btnLoadDemo.addEventListener("click", () => {
            // reload initial tasks
            loadInitialTasks();
        });
    }
}
