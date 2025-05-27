document.addEventListener('DOMContentLoaded', () => {
    const payButton = document.getElementById('pay-button');
    const feedback = document.getElementById('paymentFeedback');
    const successAlert = document.getElementById('successAlert');
    const warningAlert = document.getElementById('warningAlert');
    const dangerAlert = document.getElementById('dangerAlert');
    const downloadButton = document.getElementById('download-receipt');

    let selectedCard = null;

    window.selectCard = function(button) {
        document.querySelectorAll('.payment-icon').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        selectedCard = button.getAttribute('data-card');
        document.getElementById('change-card-button').style.display = 'inline-block';
    }

    window.resetSelection = function () {
        document.querySelectorAll('.payment-icon').forEach(btn => {
            btn.classList.remove('active');
        });
        selectedCard = null;
        document.getElementById('change-card-button').style.display = 'none';
    }

    payButton.addEventListener('click', (e) => {
        e.preventDefault();

        const cardName = document.getElementById('cardName').value.trim();
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const cardDate = document.getElementById('cardDate').value.trim();
        const cardCVV = document.getElementById('cardCVV').value.trim();

        if (!cardName || !cardNumber || !cardDate || !cardCVV || !selectedCard) {
            warningAlert.style.display = 'block';
            successAlert.style.display = 'none';
            dangerAlert.style.display = 'none';
            feedback.style.display = 'none';
            return;
        }

        warningAlert.style.display = 'none';
        dangerAlert.style.display = 'none';
        successAlert.style.display = 'none';
        feedback.style.display = 'block';

        setTimeout(() => {
            feedback.style.display = 'none';

            const isSuccess = true; // Puedes usar Math.random() < 0.85 para simular errores
            if (isSuccess) {
                successAlert.style.display = 'block';
                generatePDFReceipt(); // 🔽 Generar PDF al pagar con éxito
                downloadButton.style.display = 'inline-block';
            } else {
                dangerAlert.style.display = 'block';
            }
        }, 2000);
    });

    document.addEventListener('DOMContentLoaded', () => {
        const { jsPDF } = window.jspdf;
    
        const payButton = document.getElementById('pay-button');
        const downloadButton = document.getElementById('download-receipt');
    
        let selectedCard = null;
    
        window.selectCard = function(button) {
            document.querySelectorAll('.payment-icon').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedCard = button.getAttribute('data-card');
            document.getElementById('change-card-button').style.display = 'inline-block';
        }
    
        window.resetSelection = function () {
            document.querySelectorAll('.payment-icon').forEach(btn => btn.classList.remove('active'));
            selectedCard = null;
            document.getElementById('change-card-button').style.display = 'none';
        }
    
        payButton.addEventListener('click', (e) => {
            e.preventDefault();
    
            // Validaciones
            const cardName = document.getElementById('cardName').value.trim();
            const cardNumber = document.getElementById('cardNumber').value.trim();
            const cardDate = document.getElementById('cardDate').value.trim();
            const cardCVV = document.getElementById('cardCVV').value.trim();
    
            if (!cardName || !cardNumber || !cardDate || !cardCVV || !selectedCard) {
                document.getElementById('warningAlert').style.display = 'block';
                return;
            }
    
            document.getElementById('warningAlert').style.display = 'none';
            document.getElementById('paymentFeedback').style.display = 'block';
    
            setTimeout(() => {
                document.getElementById('paymentFeedback').style.display = 'none';
                document.getElementById('successAlert').style.display = 'block';
                downloadButton.style.display = 'inline-block';
                generatePDFReceipt(); // Genera automáticamente el PDF
            }, 2000);
        });
    
        downloadButton.addEventListener('click', generatePDFReceipt);
    
        async function generatePDFReceipt() {
            const doc = new jsPDF();
    
            const customerName = document.getElementById('customer_name').value;
            const customerEmail = document.getElementById('customer_email').value;
            const quantity = document.getElementById('quantity').value;
    
            const date = new Date().toLocaleDateString();
            const card = selectedCard.toUpperCase();
    
            const logoURL = 'https://www.lth.com.mx/etc.clientlibs/lth/clientlibs/clientlib-base/resources/images/logo.png';
    
            const img = await loadImageBase64(logoURL);
    
            // Borde decorativo
            doc.setDrawColor(0, 0, 255);
            doc.setLineWidth(1.5);
            doc.rect(10, 10, 190, 270);
    
            // Logo
            doc.addImage(img, 'PNG', 75, 15, 60, 20);
    
            doc.setFontSize(16);
            doc.setTextColor(0, 0, 0);
            doc.text('Comprobante de Compra', 70, 45);
    
            doc.setFontSize(12);
            doc.setTextColor(40, 40, 40);
            doc.text(`Fecha: ${date}`, 150, 50);
    
            doc.setFontSize(12);
            doc.text('Datos del Cliente:', 20, 65);
            doc.setTextColor(80, 80, 80);
            doc.text(`Nombre: ${customerName}`, 20, 75);
            doc.text(`Correo: ${customerEmail}`, 20, 83);
    
            doc.setTextColor(0, 0, 0);
            doc.text('Detalle del Pedido:', 20, 100);
            doc.setTextColor(80, 80, 80);
            doc.text(`Producto: L-22-F-450`, 20, 110);
            doc.text(`Cantidad: ${quantity}`, 20, 118);
            doc.text(`Método de Pago: ${card}`, 20, 126);
    
            // Totales
            doc.setTextColor(0, 0, 0);
            doc.text('Resumen de Pago:', 20, 145);
            doc.setTextColor(20, 100, 20);
            doc.text('Subtotal: $3000.00 MXN', 20, 155);
            doc.text('Envío: $20.00 MXN', 20, 163);
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 150);
            doc.text('Total: $3020.00 MXN', 20, 175);
    
            // Pie de página
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.5);
            doc.line(20, 260, 190, 260);
            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text('Gracias por confiar en LTH. Visita www.lth.com.mx', 60, 267);
    
            doc.save("comprobante_compra_LTH.pdf");
        }
    
        async function loadImageBase64(url) {
            const response = await fetch(url);
            const blob = await response.blob();
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
        }
    });
});