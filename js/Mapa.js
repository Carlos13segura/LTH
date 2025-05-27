// Sample data for service centers
const serviceLocations = [
    {
        id: 1,
        name: "Centro de Servicio LTH suc. Angelópolis",
        address: "Av. de las Torres y Blvd. Atlixco 5320 Local 4",
        city: "Puebla",
        state: "Puebla",
        zip: "72810",
        phone: "222 225 30 82",
        lat: 19.0412,
        lng: -98.2062
    },
    {
        id: 2,
        name: "Centro de Servicio LTH suc. 11 Sur",
        address: "11 Sur y Circunvalación 1108 Local 5",
        city: "Puebla",
        state: "Puebla",
        zip: "72000",
        phone: "222 246 52 54",
        lat: 19.0312,
        lng: -98.1962
    },
    {
        id: 3,
        name: "Centro de Servicio LTH suc. 16 de Septiembre",
        address: "16 de Septiembre 4502 Local 4",
        city: "Puebla",
        state: "Puebla",
        zip: "72090",
        phone: "222 237 12 22",
        lat: 19.0512,
        lng: -98.2162
    },
    {
        id: 4,
        name: "Centro de Servicio LTH suc. Capu",
        address: "Blvd. Norte 4210",
        city: "Puebla",
        state: "Puebla",
        zip: "72050",
        phone: "222 369 85 74",
        lat: 19.0612,
        lng: -98.2262
    },
    {
        id: 5,
        name: "Centro de Servicio LTH suc. La Paz",
        address: "Av. La Paz 1202",
        city: "Puebla",
        state: "Puebla",
        zip: "72160",
        phone: "222 213 45 67",
        lat: 19.0212,
        lng: -98.1862
    }
];

let map;
let markers = [];

// Initialize Google Maps
function initMap() {
    // Center on Puebla
    const puebla = { lat: 19.0414, lng: -98.2063 };
    
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: puebla,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
    });

    // Add markers for each service center
    serviceLocations.forEach(location => {
        addMarker(location);
    });

    // Add event listeners for zoom controls
    document.getElementById('zoom-in').addEventListener('click', () => {
        map.setZoom(map.getZoom() + 1);
    });
    
    document.getElementById('zoom-out').addEventListener('click', () => {
        map.setZoom(map.getZoom() - 1);
    });

    // Add event listeners for service center items
    document.querySelectorAll('.service-center').forEach((center, index) => {
        center.addEventListener('click', () => {
            // Remove active class from all centers
            document.querySelectorAll('.service-center').forEach(c => {
                c.classList.remove('active');
            });
            
            // Add active class to clicked center
            center.classList.add('active');
            
            // Center map on the selected location
            if (index < serviceLocations.length) {
                map.setCenter({
                    lat: serviceLocations[index].lat,
                    lng: serviceLocations[index].lng
                });
                map.setZoom(15);
            }
        });
    });

    // Add event listener for search button
    document.getElementById('search-btn').addEventListener('click', () => {
        const state = document.getElementById('state').value;
        const city = document.getElementById('city').value;
        
        // In a real application, this would filter the results
        alert(`Búsqueda: Estado: ${state}, Ciudad: ${city}`);
    });
}

// Add a marker to the map
function addMarker(location) {
    const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.name,
        icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        }
    });
    
    // Add info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="max-width: 200px">
                <h3 style="color: #1e4b87; font-size: 14px; margin-bottom: 5px;">${location.name}</h3>
                <p style="font-size: 12px; margin-bottom: 3px;">${location.address}</p>
                <p style="font-size: 12px; margin-bottom: 3px;">${location.city}, ${location.state} ${location.zip}</p>
                <p style="font-size: 12px; margin-bottom: 3px;">Tel: ${location.phone}</p>
            </div>
        `
    });
    
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
    
    markers.push(marker);
}

// Initialize the map when the window loads
window.onload = function() {
    // This function will be called by the Google Maps API callback
    if (typeof google !== 'undefined') {
        initMap();
    }
};