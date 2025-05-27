document.addEventListener("DOMContentLoaded", function () {
    const useLocationBtn = document.querySelector(".use-location");
    const stateSelect = document.getElementById("state-select");
    const centerSelect = document.getElementById("centros-select");
    const searchBtn = document.getElementById("search-btn");

    // Centros de servicio por estado
    const serviceCenters = {
        Puebla: [
            "Centro de servicio LTH Izúcar",
            "CENTRO DE SERVICIO LTH TEHUACAN",
            "Centro de Servicio LTH Cholula",
            "Centro de Servicio LTH",
            "CENTRO DE DISTRIBUCION LTH PUEBLA",
            "Centro de Servicio LTH Diagnóstico, venta e instalación"
        ],
    };

    // Función para obtener ubicación
    useLocationBtn.addEventListener("click", () => {
        if (navigator.geolocation) {
            useLocationBtn.textContent = "Obteniendo ubicación...";
            navigator.geolocation.getCurrentPosition(successLocation, errorLocation);
        } else {
            alert("Tu navegador no soporta geolocalización.");
        }
    });

    // Si la ubicación se obtiene correctamente
    function successLocation(position) {
        const { latitude, longitude } = position.coords;
        console.log("Ubicación obtenida:", latitude, longitude);

        // Simulación de selección basada en coordenadas (esto se puede hacer dinámico con Google Maps API)
        let selectedState = "Puebla"; // Se puede mejorar según coordenadas reales
        let nearestCenter = serviceCenters[selectedState][0]; // Seleccionar el primer centro del estado

        // Autocompletar en los selectores
        stateSelect.value = selectedState;
        centerSelect.innerHTML = serviceCenters[selectedState]
            .map(center => `<option value="${center}">${center}</option>`)
            .join("");

        // Seleccionar el centro más cercano automáticamente
        centerSelect.value = nearestCenter;
        useLocationBtn.textContent = "Ubicación detectada";
    }

    // Si la ubicación falla
    function errorLocation() {
        alert("No se pudo obtener tu ubicación. Asegúrate de dar permisos.");
        useLocationBtn.textContent = "Utiliza tu ubicación";
    }

    // Cambiar centros de servicio según el estado seleccionado
    stateSelect.addEventListener("change", () => {
        const selectedState = stateSelect.value;
        if (selectedState in serviceCenters) {
            centerSelect.innerHTML = serviceCenters[selectedState]
                .map(center => `<option value="${center}">${center}</option>`)
                .join("");
        } else {
            centerSelect.innerHTML = '<option selected>Selecciona un centro de servicio</option>';
        }
    });

    // Redirección con datos seleccionados
    searchBtn.addEventListener("click", () => {
        const selectedState = stateSelect.value;
        const selectedCenter = centerSelect.value;

        if (selectedState && selectedCenter && selectedState !== "Selecciona un estado" && selectedCenter !== "Selecciona un centro de servicio") {
            const url = `centros.html?estado=${encodeURIComponent(selectedState)}&centro=${encodeURIComponent(selectedCenter)}`;
            window.location.href = url;
        } else {
            alert("Selecciona un estado y un centro de servicio antes de continuar.");
        }
    });
});
