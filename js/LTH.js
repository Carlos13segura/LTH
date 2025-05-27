document.addEventListener('DOMContentLoaded', () => {
    const payButton = document.getElementById("pay-button");
    const changeCardButton = document.getElementById("change-card-button");
    const spinner = document.getElementById('paymentFeedback');
    const successAlert = document.getElementById('successAlert');
    const warningAlert = document.getElementById('warningAlert');
    const dangerAlert = document.getElementById('dangerAlert');
    const downloadReceiptButton = document.getElementById("download-receipt");

    // Función para seleccionar una tarjeta
    function selectCard(selectedButton) {
        document.querySelectorAll(".payment-icon").forEach(button => {
            button.disabled = true;
            button.classList.remove("selected");
        });
        selectedButton.disabled = false;
        selectedButton.classList.add("selected");

        payButton.disabled = false;
        changeCardButton.style.display = "inline-block";
    }

    // Función para reiniciar la selección de tarjeta
    function resetSelection() {
        document.querySelectorAll(".payment-icon").forEach(button => {
            button.disabled = false;
            button.classList.remove("selected");
        });

        payButton.disabled = true;
        changeCardButton.style.display = "none";
    }

    // Función para manejar el pago
    async function handlePayment() {
        const nombre = document.getElementById("customer_name").value.trim();
        const email = document.getElementById("customer_email").value.trim();
        const cantidad = document.getElementById("quantity").value.trim();
        const metodoPago = document.querySelector(".payment-icon.selected")?.getAttribute("data-card");
        const monto = 3020.00; // Monto fijo (puedes calcularlo dinámicamente)

        // Validaciones
        if (!nombre || !email || !cantidad || !metodoPago) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const compraData = { nombre, email, cantidad, monto, metodoPago };
        let apiURL = "";
        let respuestaPago;

        try {
            // Mostrar spinner y deshabilitar botón
            showSpinner();
            payButton.disabled = true;

            if (metodoPago === "amex" || metodoPago === "santander") {
                apiURL = "https://api.fakebank.com/process"; // Simulación de API
                respuestaPago = await fetch(apiURL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(compraData)
                }).then(res => res.json());
            } else if (metodoPago === "paypal") {
                apiURL = "https://api-m.sandbox.paypal.com/v2/checkout/orders";
                const paypalResponse = await fetch(apiURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer TU_SECRET_PAYPAL" // Reemplaza con tu clave
                    },
                    body: JSON.stringify({
                        intent: "CAPTURE",
                        purchase_units: [{ amount: { currency_code: "MXN", value: monto } }]
                    })
                }).then(res => res.json());

                if (paypalResponse.id) {
                    window.location.href = `https://www.paypal.com/checkoutnow?token=${paypalResponse.id}`;
                    return;
                } else {
                    throw new Error("Error al procesar el pago con PayPal");
                }
            }

            // Mostrar mensaje de éxito o advertencia
            if (respuestaPago?.success) {
                showAlert(successAlert);
                guardarCompra(compraData);
            } else {
                showAlert(warningAlert);
            }
        } catch (error) {
            console.error("Error en el pago:", error);
            showAlert(dangerAlert);
        } finally {
            hideSpinner();
            payButton.disabled = false;
        }
    }

    // Función para guardar la compra en la base de datos
    async function guardarCompra({ nombre, email, cantidad, monto, metodoPago }) {
        try {
            const response = await fetch("guardar_compra.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, email, cantidad, monto, metodoPago })
            });

            const result = await response.json();
            console.log("Compra guardada:", result);
        } catch (error) {
            console.error("Error al guardar la compra:", error);
        }
    }

    // Función para mostrar el spinner
    function showSpinner() {
        spinner.style.display = 'block';
    }

    // Función para ocultar el spinner
    function hideSpinner() {
        spinner.style.display = 'none';
    }

    // Función para mostrar una alerta
    function showAlert(alertElement) {
        successAlert.style.display = 'none';
        warningAlert.style.display = 'none';
        dangerAlert.style.display = 'none';
        alertElement.style.display = 'block';
    }

    // Función para descargar el recibo
    function downloadReceipt() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const nombre = document.getElementById("customer_name").value.trim();
        const email = document.getElementById("customer_email").value.trim();
        const cantidad = document.getElementById("quantity").value.trim();
        const metodoPago = document.querySelector(".payment-icon.selected")?.getAttribute("data-card") || "Desconocido";
        const monto = 3020.00;

        if (!nombre || !email || !cantidad || !metodoPago) {
            alert("No hay datos para generar el comprobante.");
            return;
        }

        // Configurar el PDF
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Factura de Compra", 105, 20, { align: "center" });

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Nombre: ${nombre}`, 20, 40);
        doc.text(`Email: ${email}`, 20, 50);
        doc.text(`Cantidad: ${cantidad}`, 20, 60);
        doc.text(`Método de Pago: ${metodoPago}`, 20, 70);
        doc.text(`Total Pagado: $${monto} MXN`, 20, 80);

        doc.text("¡Gracias por su compra!", 105, 100, { align: "center" });

        // Descargar el PDF
        doc.save(`Factura_${nombre}.pdf`);
    }

    // Asignar eventos
    payButton.addEventListener("click", handlePayment);
    changeCardButton.addEventListener("click", resetSelection);
    downloadReceiptButton.addEventListener("click", downloadReceipt);
});
