// Datos de modelos y motores
const modelEngineMap = {
    "GOLF": ["1.8L TSI", "2.0L TDI", "1.4L TSI"],
    "POLO": ["1.6L", "1.2L TSI"],
    "JETTA": ["2.0L TSI", "1.4L TSI", "2.0L TDI"],
    "PASSAT": ["2.0L TSI", "2.0L TDI", "1.8L TSI"]
};

// Base de datos de baterías (simulada)
const batteriesDatabase = {
    "VOLKSWAGEN": {
        "GOLF": {
            "1.8L TSI": [
                {
                    id: 1,
                    model: "L-47(LN2)-660 AGM",
                    price: 6300.00,
                    image: "https://via.placeholder.com/200x150",
                    badge: { type: "new", text: "NUEVO" },
                    inStock: true,
                    warranty: "30 meses de garantía",
                    installation: "12 meses de instalación sin costo"
                }
            ]
        }
    }
};

// Función para actualizar los motores según el modelo seleccionado
function updateEngines() {
    const modelSelect = document.getElementById('model');
    const engineSelect = document.getElementById('engine');
    const selectedModel = modelSelect.value;

    // Limpiar opciones actuales
    engineSelect.innerHTML = '';

    // Obtener motores para el modelo seleccionado
    const engines = modelEngineMap[selectedModel] || [];

    // Agregar nuevas opciones
    engines.forEach(engine => {
        const option = document.createElement('option');
        option.value = engine;
        option.textContent = engine;
        engineSelect.appendChild(option);
    });
}

// Función para renderizar las baterías
function renderBatteries(batteries) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = ''; // Limpiar contenedor

    if (!batteries || batteries.length === 0) {
        container.innerHTML = '<div class="col-12 text-center py-5"><p>No se encontraron baterías para este vehículo.</p></div>';
        return;
    }

    // Crear tarjeta para cada batería
    batteries.forEach(battery => {
        const productCard = document.createElement('div');
        productCard.className = 'col-12 col-md-4';
        productCard.innerHTML = `
            <div class="product-card">
                <div class="product-image-container">
                    <span class="product-badge badge-${battery.badge.type}">${battery.badge.text}</span>
                    <img src="${battery.image}" alt="${battery.model}" class="img-fluid">
                </div>
                <div class="p-3 text-center">
                    <h5>${battery.model}</h5>
                    <p class="product-price mt-2">$${battery.price.toLocaleString('es-MX')}</p>
                    <div class="product-divider"></div>
                    <div class="product-info d-flex justify-content-center mb-3">
                        <div class="d-flex align-items-center">
                            <span class="stock-indicator"></span>
                            <span>No Disponible</span>
                        </div>
                        <span class="mx-2">|</span>
                        <span>${battery.warranty}</span>
                        <span class="mx-2">|</span>
                        <span>${battery.installation}</span>
                    </div>
                    <div class="row g-2">
                        <div class="col-6">
                            <button class="btn action-button w-100" onclick="showDetails(${battery.id})">Detalles</button>
                        </div>
                        <div class="col-6">
                            <button class="btn action-button w-100" onclick="addToCart(${battery.id})">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Función para buscar baterías según los criterios seleccionados
function searchBatteries() {
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const engine = document.getElementById('engine').value;
    const year = document.getElementById('year').value;

    // Validar que todos los campos estén llenos
    if (!make || !model || !engine || !year) {
        alert("Por favor, complete todos los campos antes de buscar.");
        return;
    }

    // Buscar baterías que coincidan con los criterios
    let batteries = [];
    try {
        batteries = batteriesDatabase[make]?.[model]?.[engine] || [];
    } catch (error) {
        console.error("Error al buscar baterías:", error);
    }

    // Renderizar las baterías encontradas
    renderBatteries(batteries);
}

// Funciones para los botones de acción
function showDetails(batteryId) {
    alert(`Detalles de la batería ID: ${batteryId}`);
}

function addToCart(batteryId) {
    alert(`Batería ID: ${batteryId} agregada al carrito`);
}

// Evento para actualizar motores cuando cambia el modelo
document.getElementById('model').addEventListener('change', updateEngines);

// Evento para el botón de búsqueda
document.getElementById('searchButton').addEventListener('click', searchBatteries);

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    updateEngines(); // Inicializar motores
});