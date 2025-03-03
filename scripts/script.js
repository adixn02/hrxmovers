// Hamburger Menu Toggle
let ham = document.querySelector('.hamburger');
let nav = document.querySelector('.nav-menu');
ham.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Function to automatically fetch location when the page loads
window.onload = function () {
    getLocation();
};

// Get the user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            showPosition,
            showError,
            { enableHighAccuracy: true }
        );
    } else {
        document.getElementById("location").innerText = "Geolocation is not supported by your browser.";
    }
}

// Display the position (latitude and longitude)
function showPosition(position) {
    const latitude = position.coords.latitude.toFixed(2); // Fixed to 2 decimal points
    const longitude = position.coords.longitude.toFixed(2); // Fixed to 2 decimal points
    document.getElementById("coordinates").innerText = `Lat: ${latitude}, Long: ${longitude}`;

    // Reverse geocoding to get city and country
    getCityAndCountry(position.coords.latitude, position.coords.longitude);
}

// Handle errors
function showError(error) {
    let message = "";
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "User denied location access.";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Location information unavailable.";
            break;
        case error.TIMEOUT:
            message = "Request to get location timed out.";
            break;
        default:
            message = "An unknown error occurred.";
    }
    document.getElementById("location").innerText = message;
}

// Reverse geocoding to get city and country
function getCityAndCountry(latitude, longitude) {
    const apiKey = "ed28d1b8a7504e73a200f2db25f65cf5"; // Replace with your OpenCage API key
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const city = data.results[0].components.city || data.results[0].components.town || "Unknown City";
                const country = data.results[0].components.country || "Unknown Country";
                document.getElementById("city-country").innerText = `${city}, ${country}`;
            } else {
                document.getElementById("city-country").innerText = "City and country not found.";
            }
        })
        .catch(error => {
            console.error("Error fetching city and country:", error);
            document.getElementById("city-country").innerText = "Failed to fetch city and country.";
        });
}

// dark mode satarts here
// Theme Toggle Script
const toggleButton = document.getElementById('toggle');
const body = document.body;

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    toggleButton.checked = savedTheme === 'dark-mode';
}

// Toggle Theme
toggleButton.addEventListener('change', () => {
    if (toggleButton.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light-mode');
    }
});

// two men in card
// Add some hover effect to the logo
document.querySelector('.logo-circle').addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.05)';
    this.style.transition = 'transform 0.3s ease';
  });
  
  document.querySelector('.logo-circle').addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
  });