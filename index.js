// Importa el módulo Express
const express = require('express');

// Crea una instancia de una aplicación Express
const app = express();

// Define el puerto en el que el servidor escuchará
const PORT = 3000;

// Middleware para procesar datos JSON en las solicitudes
app.use(express.json());

// Ruta principal que responde con un mensaje de bienvenida
app.get('/', (req, res) => {
    res.send('¡Bienvenido a LTH Mejorado!');
});

// Ruta de ejemplo para manejar datos enviados por POST
app.post('/data', (req, res) => {
    const data = req.body; // Obtiene los datos enviados en el cuerpo de la solicitud
    res.json({ message: 'Datos recibidos', data });
});

// Inicia el servidor y lo pone a escuchar en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});