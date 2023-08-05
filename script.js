var map = L.map('map').setView([51.505, -0.09], 1);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 10,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Search functionality
const searchInput = document.getElementById('searchInput');

function searchLocation() {
  const searchString = searchInput.value;

  // Make a request to the Nominatim API to get the location details
  fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchString)}&format=json`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        map.setView([lat, lon], 13);

        // Add a marker on the map
        const marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup(searchString).openPopup();
      } else {
        alert('Location not found');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Add event listener to trigger search on user input
searchInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    searchLocation();
  }
});
