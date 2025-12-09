<div>
  <img style="100%" src="https://capsule-render.vercel.app/api?type=waving&height=70&section=header&reversal=true&fontSize=70&fontColor=FFFFFF&fontAlign=50&fontAlignY=50&stroke=-&descSize=20&descAlign=50&descAlignY=50&textBg=false&theme=gruvbox_light"  />
</div>

###

<br clear="both">

<h1 align="left">🌿 Task Board — Simple & Clean Task Manager 🌿</h1>

###

<br clear="both">

<h6 align="left">Proyecto del curso Web 1. Gestión de Formularios & Fetch API</h6>

###

<h2 align="left">Descripción del Proyecto</h2>

###

<p align="left">Un pequeño gestor de tareas construido con HTML, CSS y JavaScript , pensado para practicar el uso de formularios, validaciones, Fetch API (GET & POST) y la manipulación dinámica del DOM.<br>El diseño utiliza un estilo glassmorphism para lograr tarjetas y paneles con fondos translúcidos, creando un look moderno.</p>

###

<h2 align="left">Acerca del proyecto</h2>

###

<h3 align="left">🛠️ Tecnologías utilizadas</h3>

###

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" alt="html5 logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" alt="css logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" height="40" alt="vscode logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="40" alt="github logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" height="40" alt="figma logo"  />
</div>

###

<h2 align="left">Task Board permite:</h2>

###

<p align="left">🔹Cargar tareas desde una API pública<br><br>🔹Crear tareas nuevas con validación<br><br>🔹Editarlas, eliminarlas y marcarlas como completadas<br><br>🔹Filtrar por estado y buscar en tiempo real<br><br>🔹Trabajar con tarjetas tipo “bento” estilizadas con glassmorphism<br><br>🔹Manejar todo el flujo sin recargar la página<br><br>La aplicación fue construida sin frameworks, para reforzar el entendimiento de HTML, CSS y JS puros.</p>

###

<h2 align="left">Funcionalidades principales</h2>

###

<h3 align="left">1. Carga inicial de tareas (GET)</h3>

###

<p align="left">La app obtiene 10 tareas desde JSONPlaceholder:<br><br>GET https://jsonplaceholder.typicode.com/todos?_limit=10<br><br>Mientras se cargan, aparece un mensaje visual de Loading tasks...</p>

###

<h3 align="left">2. Crear nuevas tareas (POST)</h3>

###

<p align="left">El formulario dentro de un modal permite:<br><br>- Título (requerido, mínimo 3 caracteres)<br><br>- Descripción (opcional)<br><br>- Estado “completed”<br><br>- Envío al endpoint:<br><br>POST https://jsonplaceholder.typicode.com/todos<br><br>Las nuevas tareas aparecen al inicio del tablero.</p>

###

<h3 align="left">3. Editar y eliminar tareas</h3>

###

<p align="left">Cada tarjeta tiene botones edit y remove.<br>La lógica usa event delegation, técnica que evita listeners repetidos y funciona con elementos generados dinámicamente.</p>

###

<h3 align="left">4. Filtros + búsqueda en vivo</h3>

###

<p align="left">Incluye:<br><br> - All<br><br> - Pending<br><br> - Completed<br><br> - Recently added<br><br>Y un buscador que filtra las tareas por título en tiempo real.</p>

###

<h3 align="left">5. UI moderna con glassmorphism</h3>

###

<p align="left">El diseño utiliza:<br><br> - backdrop-filter: blur(...)<br><br> - Transparencias suaves<br><br> - Sombras y bordes neutros<br><br> - Iconos de Bootstrap<br><br> - Estados visuales para tareas completed y pending<br><br>El resultado es un dashboard elegante, claro y ligero, incluso usando imágenes de fondo grandes.</p>

###

<h3 align="left">📁 Estructura del proyecto</h3>

###

<p align="left">mi-gestor-tareas/<br>├── index.html        # Estructura principal<br>├── styles.css        # Estilos del layout y glassmorphism<br>├── script.js         # Fetch API, DOM, validación, acciones del usuario<br>└── README.md         # Documentación del proyecto</p>

###

<h3 align="left">▶️ Instrucciones de Uso</h3>

###

<p align="left">1. Clonar o descargar el repositorio<br><br>2. Abrir index.html en un navegador<br><br>3. Las luces comenzarán a animarse automáticamente<br><br>4. Cada 1.5s cambiarán al siguiente patrón</p>

###

<h3 align="left">🎓 Aprendizajes aplicados</h3>

###

<h6 align="left">Este proyecto permitió practicar conceptos clave:</h6>

###

<h4 align="left">🧠 1. Integración con APIs usando Fetch</h4>

###

<p align="left">🔹GET y POST con manejo básico de errores<br><br>🔹Procesamiento de JSON<br><br>🔹Actualización inmediata del DOM sin recargas</p>

###

<h4 align="left">🧠 2. Validación manual de formularios</h4>

###

<p align="left">🔹Reglas mínimas de contenido<br><br>🔹Retroalimentación visual al usuario<br><br>🔹Control del flujo usando preventDefault()</p>

###

<h4 align="left">🧠 3. Manejo del DOM</h4>

###

<p align="left">🔹Crear y modificar nodos dinámicamente<br><br>🔹Renderizar listas basadas en estado<br><br>🔹Separación de responsabilidades</p>

###

<h4 align="left">🧠 4. Event Delegation</h4>

###

<p align="left">🔹Simplificación del código<br><br>🔹Menor costo de rendimiento<br><br>🔹Ideal para aplicaciones con elementos creados dinámicamente</p>

###

<h4 align="left">🧠 5. Diseño con glassmorphism</h4>

###

<p align="left">🔹Transparencias y efectos blur<br><br>🔹Jerarquía visual moderna<br><br>🔹Uso de iconografía consistente</p>

###

<h2 align="left">👤 Autor</h2>

###

<p align="left">Eduardo Funes<br>Proyecto entregado como parte del curso Web 1 – 2025<br>Fecha de entrega: 10 de diciembre, 2025</p>

###

<div>
  <img style="100%" src="https://capsule-render.vercel.app/api?type=waving&height=70&section=footer&reversal=true&fontSize=70&fontColor=FFFFFF&fontAlign=50&fontAlignY=50&stroke=-&descSize=20&descAlign=50&descAlignY=50&color=gradient"  />
</div>

###
