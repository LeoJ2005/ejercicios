// --- TRANSLATIONS CONFIG ---
const translations = {
    es: {
        title: "Gym Tracker",
        newExerciseBtn: "Nuevo Ejercicio",
        modalNewTitle: "Nuevo Ejercicio",
        placeholderName: "Nombre (ej. Press Banca)",
        createBtn: "Crear Ejercicio",
        modalEditTitle: "Editar Nombre",
        placeholderEdit: "Nuevo nombre",
        saveChangesBtn: "Guardar Cambios",
        modalDeleteTitle: "¿Eliminar Ejercicio?",
        deleteWarning: "Esta acción no se puede deshacer. Se borrará todo el historial.",
        cancelBtn: "Cancelar",
        deleteBtn: "Eliminar",
        registerTitle: "Registrar",
        placeholderWeight: "100 kg",
        placeholderReps: "12 reps",
        saveRecordBtn: "Guardar",
        historyTitle: "Historial",
        progressTitle: "Progreso",
        noExercises: "No hay ejercicios registrados. ¡Agrega uno nuevo!",
        lastRecord: "Último:",
        noRecords: "Sin registros"
    },
    en: {
        title: "Gym Tracker",
        newExerciseBtn: "New Exercise",
        modalNewTitle: "New Exercise",
        placeholderName: "Name (e.g. Bench Press)",
        createBtn: "Create Exercise",
        modalEditTitle: "Edit Name",
        placeholderEdit: "New name",
        saveChangesBtn: "Save Changes",
        modalDeleteTitle: "Delete Exercise?",
        deleteWarning: "This action cannot be undone. All history will be deleted.",
        cancelBtn: "Cancel",
        deleteBtn: "Delete",
        registerTitle: "Register",
        placeholderWeight: "220 lbs",
        placeholderReps: "12 reps",
        saveRecordBtn: "Save",
        historyTitle: "History",
        progressTitle: "Progress",
        noExercises: "No exercises registered. Add a new one!",
        lastRecord: "Last:",
        noRecords: "No records"
    },
    fr: {
        title: "Gym Tracker",
        newExerciseBtn: "Nouvel Exercice",
        modalNewTitle: "Nouvel Exercice",
        placeholderName: "Nom (ex. Développé Couché)",
        createBtn: "Créer l'Exercice",
        modalEditTitle: "Modifier le Nom",
        placeholderEdit: "Nouveau nom",
        saveChangesBtn: "Enregistrer",
        modalDeleteTitle: "Supprimer l'Exercice ?",
        deleteWarning: "Cette action est irréversible. Tout l'historique sera supprimé.",
        cancelBtn: "Annuler",
        deleteBtn: "Supprimer",
        registerTitle: "Enregistrer",
        placeholderWeight: "100 kg",
        placeholderReps: "12 reps",
        saveRecordBtn: "Enregistrer",
        historyTitle: "Historique",
        progressTitle: "Progrès",
        noExercises: "Aucun exercice enregistré. Ajoutez-en un nouveau !",
        lastRecord: "Dernier :",
        noRecords: "Aucun enregistrement"
    },
    de: {
        title: "Gym Tracker",
        newExerciseBtn: "Neue Übung",
        modalNewTitle: "Neue Übung",
        placeholderName: "Name (z.B. Bankdrücken)",
        createBtn: "Übung erstellen",
        modalEditTitle: "Namen bearbeiten",
        placeholderEdit: "Neuer Name",
        saveChangesBtn: "Änderungen speichern",
        modalDeleteTitle: "Übung löschen?",
        deleteWarning: "Diese Aktion kann nicht rückgängig gemacht werden. Der gesamte Verlauf wird gelöscht.",
        cancelBtn: "Abbrechen",
        deleteBtn: "Löschen",
        registerTitle: "Registrieren",
        placeholderWeight: "100 kg",
        placeholderReps: "12 Wdh",
        saveRecordBtn: "Speichern",
        historyTitle: "Verlauf",
        progressTitle: "Fortschritt",
        noExercises: "Keine Übungen registriert. Füge eine neue hinzu!",
        lastRecord: "Letzte:",
        noRecords: "Keine Aufzeichnungen"
    },
    zh: {
        title: "健身追踪器",
        newExerciseBtn: "新运动",
        modalNewTitle: "新运动",
        placeholderName: "名称 (例如: 卧推)",
        createBtn: "创建运动",
        modalEditTitle: "编辑名称",
        placeholderEdit: "新名称",
        saveChangesBtn: "保存更改",
        modalDeleteTitle: "删除运动？",
        deleteWarning: "此操作无法撤销。所有历史记录将被删除。",
        cancelBtn: "取消",
        deleteBtn: "删除",
        registerTitle: "登记",
        placeholderWeight: "100 公斤",
        placeholderReps: "12 次",
        saveRecordBtn: "保存",
        historyTitle: "历史",
        progressTitle: "进度",
        noExercises: "没有注册的运动。添加一个新的！",
        lastRecord: "最后:",
        noRecords: "无记录"
    }
};

let currentLang = localStorage.getItem('gymTrackerLang') || 'es';

function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('gymTrackerLang', lang);
    applyTranslations();
    renderGrid(); 
}

function t(key) {
    return translations[currentLang][key] || key;
}

function applyTranslations() {
    const tr = translations[currentLang];
    
    // Header
    const titleEl = document.querySelector('header h1');
    if(titleEl) titleEl.innerHTML = `<i class="ph-fill ph-barbell"></i> ${tr.title}`;
    
    const btnAdd = document.getElementById('btn-add-exercise');
    if(btnAdd) btnAdd.innerHTML = `<i class="ph-bold ph-plus"></i> ${tr.newExerciseBtn}`;

    // Modals
    const mNewH2 = document.querySelector('#modal-new-exercise h2');
    if(mNewH2) mNewH2.innerHTML = `<i class="ph-duotone ph-plus-circle"></i> ${tr.modalNewTitle}`;

    const mEditH2 = document.querySelector('#modal-edit-exercise h2');
    if(mEditH2) mEditH2.innerHTML = `<i class="ph-duotone ph-pencil-simple"></i> ${tr.modalEditTitle}`;

    const mDelH2 = document.querySelector('#modal-delete-confirm h2');
    if(mDelH2) mDelH2.innerHTML = `<i class="ph-duotone ph-warning"></i> ${tr.modalDeleteTitle}`;

    // Details Titles
    const regSection = document.querySelector('.new-record-section h3');
    if(regSection) regSection.innerHTML = `<i class="ph-duotone ph-pencil-simple"></i> ${tr.registerTitle}`;

    const histSection = document.querySelector('.history-section h3');
    if(histSection) histSection.innerHTML = `<i class="ph-duotone ph-clock-counter-clockwise"></i> ${tr.historyTitle}`;

    const progSection = document.querySelector('.modal-right h3');
    if(progSection) progSection.innerHTML = `<i class="ph-duotone ph-chart-line-up"></i> ${tr.progressTitle}`;

    // Placeholders
    const impName = document.getElementById('input-exercise-name');
    if(impName) impName.placeholder = tr.placeholderName;
    const impEdit = document.getElementById('input-edit-name');
    if(impEdit) impEdit.placeholder = tr.placeholderEdit;
    const impW = document.getElementById('input-weight');
    if(impW) impW.placeholder = tr.placeholderWeight;
    const impR = document.getElementById('input-reps');
    if(impR) impR.placeholder = tr.placeholderReps;

    // Buttons
    const btnCreate = document.querySelector('#form-new-exercise button');
    if(btnCreate) btnCreate.textContent = tr.createBtn;
    const btnSaveEdit = document.querySelector('#form-edit-exercise button');
    if(btnSaveEdit) btnSaveEdit.textContent = tr.saveChangesBtn;
    const btnSaveRecord = document.querySelector('#form-add-weight button');
    if(btnSaveRecord) btnSaveRecord.innerHTML = `<i class="ph-bold ph-check"></i> ${tr.saveRecordBtn}`;
    
    const btnCancel = document.getElementById('btn-cancel-delete');
    if(btnCancel) btnCancel.textContent = tr.cancelBtn;
    const btnDel = document.getElementById('btn-confirm-delete');
    if(btnDel) btnDel.textContent = tr.deleteBtn;

    // Warning
    const warnP = document.querySelector('#modal-delete-confirm p');
    if(warnP) warnP.textContent = tr.deleteWarning;

    // Toggle Btn Text
    const langBtn = document.getElementById('btn-lang-toggle');
    if (langBtn) langBtn.textContent = currentLang.toUpperCase();
}


// --- APP LOGIC ---

let exercises = [];
let currentExerciseId = null;
let weightChart = null;
let deleteIdTarget = null;

// Referencias DOM
const gridContainer = document.getElementById('exercises-grid');
const modalNewExercise = document.getElementById('modal-new-exercise');
const modalDetails = document.getElementById('modal-details');
const modalEditExercise = document.getElementById('modal-edit-exercise');
const modalDeleteConfirm = document.getElementById('modal-delete-confirm');

const btnAddExercise = document.getElementById('btn-add-exercise');
const closeButtons = document.querySelectorAll('.close-modal');
const formNewExercise = document.getElementById('form-new-exercise');
const formEditExercise = document.getElementById('form-edit-exercise');
const formAddWeight = document.getElementById('form-add-weight');
const detailsTitle = document.getElementById('details-title');
const historyList = document.getElementById('weight-history-list');
const btnDeleteExercise = document.getElementById('btn-delete-exercise');
const btnEditExercise = document.getElementById('btn-edit-exercise');
const btnConfirmDelete = document.getElementById('btn-confirm-delete');
const btnCancelDelete = document.getElementById('btn-cancel-delete');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations(); 
    loadExercises();
    setupEventListeners();
});

function loadExercises() {
    const stored = localStorage.getItem('gymTrackerData');
    if (stored) {
        try { exercises = JSON.parse(stored); } catch (e) { exercises = []; }
    } else {
        exercises = [];
    }
    renderGrid();
}

function saveExercises() {
    localStorage.setItem('gymTrackerData', JSON.stringify(exercises));
    renderGrid();
}

function renderGrid() {
    if (!gridContainer) return;
    gridContainer.innerHTML = '';
    
    if (exercises.length === 0) {
        gridContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">${t('noExercises')}</p>`;
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
                <i class="ph ph-calendar-blank"></i> ${lastRecord ? formatDate(lastRecord.date) : t('noRecords')}
            </div>
        `;
        gridContainer.appendChild(card);
    });
}

function openDetails(id) {
    currentExerciseId = id;
    const exercise = exercises.find(e => e.id === id);
    if (!exercise) return;

    if (detailsTitle) detailsTitle.textContent = exercise.name;
    
    const historySorted = [...exercise.history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    renderHistory(historySorted);
    renderChart(exercise.history);
    
    const inputW = document.getElementById('input-weight');
    const inputR = document.getElementById('input-reps');
    if(inputW) inputW.value = '';
    if(inputR) inputR.value = '';
    
    openModal(modalDetails);
}

function renderHistory(historySorted) {
    if (!historyList) return;
    historyList.innerHTML = '';

    if (historySorted.length === 0) {
        historyList.innerHTML = '<li class="history-item" style="justify-content: center; color: var(--text-secondary);">Sin historial</li>';
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

function setupEventListeners() {
    // --- LANG DROPDOWN ---
    const langBtn = document.getElementById('btn-lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    
    if (langBtn && langDropdown) {
        langBtn.onclick = (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('hidden');
        };

        const items = document.querySelectorAll('.lang-dropdown li');
        items.forEach(item => {
            item.onclick = (e) => {
                e.stopPropagation();
                const ln = item.getAttribute('data-lang');
                if (ln) {
                    setLanguage(ln);
                    langDropdown.classList.add('hidden');
                }
            };
        });

        window.onclick = (e) => {
            if (!langDropdown.classList.contains('hidden') && e.target !== langBtn) {
                langDropdown.classList.add('hidden');
            }
            // Close modals if clicked outside
            if (e.target === modalNewExercise) closeModal(modalNewExercise);
            if (e.target === modalDetails) closeModal(modalDetails);
            if (e.target === modalEditExercise) closeModal(modalEditExercise);
            if (e.target === modalDeleteConfirm) closeModal(modalDeleteConfirm);
        };
    } else {
        // Fallback for modal closing if lang btn missing
        window.onclick = (e) => {
            if (e.target === modalNewExercise) closeModal(modalNewExercise);
            if (e.target === modalDetails) closeModal(modalDetails);
            if (e.target === modalEditExercise) closeModal(modalEditExercise);
            if (e.target === modalDeleteConfirm) closeModal(modalDeleteConfirm);
        };
    }

    // --- BTNS ---
    if (btnAddExercise) {
        btnAddExercise.onclick = () => {
            openModal(modalNewExercise);
            const i = document.getElementById('input-exercise-name');
            if(i) i.focus();
        };
    }

    if (closeButtons) {
        closeButtons.forEach(btn => {
            btn.onclick = () => {
                closeModal(modalNewExercise);
                closeModal(modalDetails);
                closeModal(modalEditExercise);
                closeModal(modalDeleteConfirm);
            };
        });
    }

    // --- FORMS ---
    if (formNewExercise) {
        formNewExercise.onsubmit = (e) => {
            e.preventDefault();
            const inp = document.getElementById('input-exercise-name');
            if (inp && inp.value.trim()) {
                addNewExercise(inp.value.trim());
                closeModal(modalNewExercise);
                formNewExercise.reset();
            }
        };
    }

    if (formAddWeight) {
        formAddWeight.onsubmit = (e) => {
            e.preventDefault();
            const w = parseFloat(document.getElementById('input-weight').value);
            const r = parseInt(document.getElementById('input-reps').value);
            if (!isNaN(w) && !isNaN(r) && currentExerciseId) {
                addWeightRecord(currentExerciseId, w, r, new Date().toISOString());
            }
        };
    }

    // --- DELETE/EDIT ---
    if (btnDeleteExercise) {
        btnDeleteExercise.onclick = () => {
            if (currentExerciseId) {
                deleteIdTarget = currentExerciseId;
                openModal(modalDeleteConfirm);
            }
        };
    }

    if (btnConfirmDelete) {
        btnConfirmDelete.onclick = () => {
            if (deleteIdTarget) {
                deleteExercise(deleteIdTarget);
                closeModal(modalDeleteConfirm);
                closeModal(modalDetails);
            }
        };
    }

    if (btnCancelDelete) {
        btnCancelDelete.onclick = () => closeModal(modalDeleteConfirm);
    }

    if (btnEditExercise) {
        btnEditExercise.onclick = () => {
            const ex = exercises.find(e => e.id === currentExerciseId);
            if (ex) {
                const inp = document.getElementById('input-edit-name');
                if (inp) {
                    inp.value = ex.name;
                    openModal(modalEditExercise);
                    inp.focus();
                }
            }
        };
    }

    if (formEditExercise) {
        formEditExercise.onsubmit = (e) => {
            e.preventDefault();
            const inp = document.getElementById('input-edit-name');
            if (inp && inp.value.trim() && currentExerciseId) {
                updateExerciseName(currentExerciseId, inp.value.trim());
                if (detailsTitle) detailsTitle.textContent = inp.value.trim();
                closeModal(modalEditExercise);
            }
        };
    }

    document.onkeydown = (e) => {
        if (e.key === 'Escape') {
            closeModal(modalNewExercise);
            closeModal(modalDetails);
            closeModal(modalEditExercise);
            closeModal(modalDeleteConfirm);
        }
    };
}

// Logic Functions
function addNewExercise(name) {
    exercises.push({ id: Date.now().toString(), name: name, history: [] });
    saveExercises();
}

function addWeightRecord(id, w, r, date) {
    const ex = exercises.find(e => e.id === id);
    if (ex) {
        ex.history.push({ weight: w, reps: r, date: date });
        ex.history.sort((a, b) => new Date(a.date) - new Date(b.date));
        saveExercises();
        if (currentExerciseId === id) {
            openDetails(id); // Re-render logic
        }
    }
}

function deleteExercise(id) {
    exercises = exercises.filter(e => e.id !== id);
    saveExercises();
}

function updateExerciseName(id, name) {
    const ex = exercises.find(e => e.id === id);
    if (ex) {
        ex.name = name;
        saveExercises();
    }
}

function openModal(m) { if(m) m.classList.add('show'); }
function closeModal(m) { if(m) m.classList.remove('show'); }

function renderChart(history) {
    if (typeof Chart === 'undefined') return;
    const ctx = document.getElementById('weightChart')?.getContext('2d');
    if (!ctx) return;
    if (weightChart) weightChart.destroy();
    
    const h = [...history].sort((a, b) => new Date(a.date) - new Date(b.date));
    weightChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: h.map(x => formatDate(x.date)),
            datasets: [{
                label: 'Weight',
                data: h.map(x => x.weight),
                borderColor: '#FFD000',
                backgroundColor: 'rgba(255, 208, 0, 0.1)',
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#FFD000',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#888' } },
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#888' } }
            }
        }
    });
}

function formatDate(d) {
    return new Date(d).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: '2-digit' });
}
