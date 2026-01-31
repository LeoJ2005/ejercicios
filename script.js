// Estado de la aplicación
let exercises = [];
let currentExerciseId = null;
let weightChart = null; // Instancia global del gráfico

// Referencias DOM
const gridContainer = document.getElementById('exercises-grid');
const modalNewExercise = document.getElementById('modal-new-exercise');
const modalDetails = document.getElementById('modal-details');
const btnAddExercise = document.getElementById('btn-add-exercise');
const closeButtons = document.querySelectorAll('.close-modal');
const formNewExercise = document.getElementById('form-new-exercise');
const formAddWeight = document.getElementById('form-add-weight');
const detailsTitle = document.getElementById('details-title');
const historyList = document.getElementById('weight-history-list');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadExercises();
    setupEventListeners();
    setupEventListeners();
});

// Cargar ejercicios desde LocalStorage
function loadExercises() {
    const stored = localStorage.getItem('gymTrackerData');
    if (stored) {
        exercises = JSON.parse(stored);
    } else {
        // Datos de ejemplo iniciales si está vacío
        exercises = [];
    }
    renderGrid();
}

// Guardar en LocalStorage
function saveExercises() {
    localStorage.setItem('gymTrackerData', JSON.stringify(exercises));
    renderGrid();
}

// Renderizar la cuadrícula de tarjetas
function renderGrid() {
    gridContainer.innerHTML = '';
    
    if (exercises.length === 0) {
        gridContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No hay ejercicios registrados. ¡Agrega uno nuevo!</p>';
        return;
    }

    exercises.forEach(ex => {
        const lastRecord = ex.history.length > 0 ? ex.history[ex.history.length - 1] : null;
        
        const card = document.createElement('div');
        card.className = 'exercise-card';
        card.onclick = () => openDetails(ex.id);
        
        card.innerHTML = `
            <div class="card-header">
                <span class="exercise-name">${ex.name}</span>
                <i class="ph-duotone ph-caret-right" style="color:var(--text-secondary)"></i>
            </div>
            <div class="last-weight">
                <i class="ph ph-barbell"></i> <span>${lastRecord ? `${lastRecord.weight} kg <span style="font-size:0.8em; color:var(--text-secondary)">x ${lastRecord.reps || 0}</span>` : '-'}</span>
            </div>
            <div class="last-weight" style="margin-top: 0.5rem; font-size: 0.8rem;">
                <i class="ph ph-calendar-blank"></i> ${lastRecord ? formatDate(lastRecord.date) : 'Sin registros'}
            </div>
        `;
        
        gridContainer.appendChild(card);
    });
}

// Abrir modal de detalles
function openDetails(id) {
    currentExerciseId = id;
    const exercise = exercises.find(e => e.id === id);
    if (!exercise) return;

    detailsTitle.textContent = exercise.name;
    renderHistory(exercise.history);
    
    detailsTitle.textContent = exercise.name;
    
    // Invertir orden explícitamente: Lo más nuevo primero
    const historySorted = [...exercise.history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    renderHistory(historySorted);
    renderChart(exercise.history); // El gráfico usa orden cronológico (viejo -> nuevo)
    
    // Limpiar inputs
    document.getElementById('input-weight').value = '';
    document.getElementById('input-reps').value = '';
    
    openModal(modalDetails);
}

// Renderizar historial en el modal
function renderHistory(historySorted) {
    historyList.innerHTML = '';
    // Ordenar por fecha descendente (más reciente primero) para mostrar
    // const sortedHistory = [...history].sort((a, b) => new Date(b.date) - new Date(a.date)); // This sorting is now done in openDetails

    if (historySorted.length === 0) {
        historyList.innerHTML = '<li class="history-item" style="justify-content: center;">Sin historial previo</li>';
        return;
    }

        historySorted.forEach(record => {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.innerHTML = `
            <span class="history-date"><i class="ph ph-calendar-blank"></i> ${formatDate(record.date)}</span>
            <span class="history-weight">
                ${record.weight} <span style="font-size:0.8em; color:var(--text-secondary);">x ${record.reps || 0}</span>
            </span>
        `;
        historyList.appendChild(li);
    });
}

// Manejadores de eventos
function setupEventListeners() {
    // Abrir modal nuevo ejercicio
    btnAddExercise.addEventListener('click', () => {
        openModal(modalNewExercise);
        document.getElementById('input-exercise-name').focus();
    });

    // Cerrar modales (X)
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(modalNewExercise);
            closeModal(modalDetails);
        });
    });

    // Cerrar al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === modalNewExercise) closeModal(modalNewExercise);
        if (e.target === modalDetails) closeModal(modalDetails);
    });

    // Formulario Crear Ejercicio
    formNewExercise.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('input-exercise-name').value.trim();
        if (name) {
            addNewExercise(name);
            closeModal(modalNewExercise);
            formNewExercise.reset();
        }
    });

    // Formulario Agregar Peso
    // Formulario Agregar Peso
    formAddWeight.addEventListener('submit', (e) => {
        e.preventDefault();
        const weight = parseFloat(document.getElementById('input-weight').value);
        const reps = parseInt(document.getElementById('input-reps').value);
        const date = new Date().toISOString(); // Auto fecha y hora exacta
        
        if (currentExerciseId !== null && weight && reps) {
            addWeightRecord(currentExerciseId, weight, reps, date);
        }
    });

    // Escape key para cerrar
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(modalNewExercise);
            closeModal(modalDetails);
        }
    });
}

// Lógica de Negocio

function addNewExercise(name) {
    const newExercise = {
        id: Date.now().toString(), // Simple ID único
        name: name,
        history: []
    };
    exercises.push(newExercise);
    saveExercises();
}

function addWeightRecord(exerciseId, weight, reps, date) {
    const exerciseIndex = exercises.findIndex(e => e.id === exerciseId);
    if (exerciseIndex !== -1) {
        exercises[exerciseIndex].history.push({
            weight: weight,
            reps: reps,
            date: date
        });
        
        // Ordenar historial cronológicamente al guardar (opcional, pero útil para obtener el "último" correctamente)
        exercises[exerciseIndex].history.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        saveExercises();
        
        // Actualizar vista del modal (Mostrar más reciente primero)
        const historySorted = [...exercises[exerciseIndex].history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        renderHistory(historySorted);
        renderChart(exercises[exerciseIndex].history); // Update chart too which uses chrono order
        document.getElementById('input-weight').value = ''; // Reset solo campos de datos
        document.getElementById('input-reps').value = '';
    }
}

// Utilidades UI
function openModal(modal) {
    modal.classList.add('show');
}

function closeModal(modal) {
    modal.classList.remove('show');
}

// Chart Logic
function renderChart(history) {
    const ctx = document.getElementById('weightChart').getContext('2d');
    
    // Destruir gráfico previo si existe
    if (weightChart) {
        weightChart.destroy();
    }

    // Ordenar cronológicamente para el gráfico (izq a der)
    const chronoHistory = [...history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const labels = chronoHistory.map(h => formatDate(h.date));
    const data = chronoHistory.map(h => h.weight);

    weightChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Peso (kg)',
                data: data,
                borderColor: '#FFD000',
                    backgroundColor: 'rgba(255, 208, 0, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#FFD000',
                    pointRadius: 4,
                    tension: 0.3, // Curva suave
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#1E1E1E',
                        titleColor: '#FFF',
                        bodyColor: '#AAA',
                        borderColor: '#333',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                            borderColor: 'transparent'
                        },
                        ticks: {
                            color: '#888'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                             borderColor: 'transparent'
                        },
                        ticks: {
                            color: '#888'
                        },
                        beginAtZero: false
                    }
                }
            }
        });
}

function formatDate(dateString) {
    const options = { year: '2-digit', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}
