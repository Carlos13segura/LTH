document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('customSearchInput');
    const autocompleteList = document.getElementById('customAutocompleteList');
    const searchButton = document.getElementById('searchButton');
    const spinner = document.getElementById('spinner');
    let activeIndex = -1;

    const contentMapping = {
        "inicio": "#inicio",
        "contacto": "#contacto",
        "productos": "#productos",
        "baterías": "Baterias.html",
        "filtros": "Filtros.html",
        "lubricantes": "#",
        "moto-baterías": "Moto-Baterias.html",
        "baterías alcalinas": "Baterias_Alcalinas.html",
        "garantía": "#",
        "blog": "#"
    };

    // Función para actualizar las sugerencias
    const updateAutocomplete = () => {
        if (!searchInput || !autocompleteList) return;

        const query = searchInput.value.toLowerCase().trim();
        autocompleteList.innerHTML = "";
        activeIndex = -1;

        if (query) {
            const matches = Object.keys(contentMapping).filter(keyword => keyword.includes(query));
            if (matches.length) {
                matches.forEach((keyword) => {
                    const listItem = document.createElement("li");
                    listItem.classList.add("list-group-item");
                    listItem.textContent = keyword;
                    listItem.setAttribute("role", "option");
                    listItem.setAttribute("tabindex", "0");

                    listItem.addEventListener("click", () => selectItem(keyword));
                    listItem.addEventListener("keydown", (e) => {
                        if (e.key === "Enter") selectItem(keyword);
                    });

                    autocompleteList.appendChild(listItem);
                });

                autocompleteList.style.display = "block";
                searchInput.setAttribute("aria-expanded", "true");
            } else {
                hideAutocomplete();
            }
        } else {
            hideAutocomplete();
        }
    };

    // Función para ocultar la lista de autocompletado
    const hideAutocomplete = () => {
        autocompleteList.innerHTML = "";
        autocompleteList.style.display = "none";
        searchInput.setAttribute("aria-expanded", "false");
    };

    // Función para manejar la selección de un elemento
    const selectItem = (keyword) => {
        if (contentMapping.hasOwnProperty(keyword)) {
            searchInput.value = keyword;
            hideAutocomplete();
            window.location.href = contentMapping[keyword];  // Redirigir a la URL correspondiente
        } else {
            console.warn("No se encontró una URL para:", keyword);
        }
    };

    // Función para manejar la navegación con el teclado
    const handleKeyDown = (e) => {
        const items = autocompleteList.querySelectorAll("li");
        if (!items.length) return;

        switch (e.key) {
            case "ArrowDown":
                activeIndex = (activeIndex + 1) % items.length;
                break;
            case "ArrowUp":
                activeIndex = (activeIndex - 1 + items.length) % items.length;
                break;
            case "Enter":
                if (activeIndex >= 0) selectItem(items[activeIndex].textContent);
                return;
            case "Escape":
                hideAutocomplete();
                return;
        }

        items.forEach((item, index) => {
            item.classList.toggle("active", index === activeIndex);
        });

        if (activeIndex >= 0) items[activeIndex].focus();
    };

    // Mostrar spinner mientras busca
    const showSpinner = () => spinner.style.display = "block";
    const hideSpinner = () => spinner.style.display = "none";

    // Asignar eventos
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            showSpinner();
            setTimeout(() => {
                updateAutocomplete();
                hideSpinner();
            }, 300);
        });

        searchInput.addEventListener("keydown", handleKeyDown);
    }

    if (searchButton) {
        searchButton.addEventListener("click", () => {
            if (searchInput.value.trim()) {
                showSpinner();
                setTimeout(() => {
                    console.log("Búsqueda realizada:", searchInput.value);
                    hideSpinner();
                }, 500);
            }
        });
    }

    // Ocultar autocompletado cuando se hace clic fuera
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !autocompleteList.contains(e.target)) {
            hideAutocomplete();
        }
    });
});
