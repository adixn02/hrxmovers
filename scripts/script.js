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
// service cards

const servicesData = [
    {
        title: "JUNK REMOVAL",
        img:"https://img.freepik.com/free-vector/cartoon-street-cleaners-working-near-road-city-landscape-with-janitors-sweepers-gathering-trash-into-bags-garbage-bin-flat-vector-illustration-cleaning-service-concept-banner_74855-24019.jpg?t=st=1740989541~exp=1740993141~hmac=d1ed1e3e862cba90002faa8cb4adda1d1a0d72fd9d089bcbd48b0afcdf204169&w=2000",
        description: "Our professional movers are trained to handle your items with care and precision, ensuring your local move is smooth and stress-free."
    },
    {
        title: "LOCAL MOVING",
        img:"https://img.freepik.com/free-vector/house-moving-couple-wearing-yellow-shirt_52683-47238.jpg?t=st=1740990096~exp=1740993696~hmac=8e6e72dc8501315a98bd27bb278c12fd1e6e0bd25dd594b8fadea4d70526f229&w=2000",
        description: "Our professional movers are trained to handle your items with care and precision, ensuring your local move is smooth and stress-free."
    },
    {
        title: "LONG DISTANCE MOVING",
        img:"https://img.freepik.com/free-vector/courier-delivered-boxes-businessman_74855-6333.jpg?t=st=1740990184~exp=1740993784~hmac=a5af3e8674bb570dd0cdb123cb9fedee100bedfce4ba64ac26452d58266432da&w=2000",
        description: "Moving long distance? Our teams provide seamless moves across state lines with efficiency and professionalism."
    },
    {
        title: "PACKING SERVICES",
        img:"https://img.freepik.com/free-vector/flat-design-house-moving-illustration-with-charaters_23-2148655568.jpg?t=st=1740990274~exp=1740993874~hmac=10661533638187cf2fe6562daac920689c1f5d5c3c9b7dd634c83a42f0613224&w=2000",
        description: "Need help packing? Our teams can provide professional packing services to ensure your items are safe and secure."
    },
    {
        title: "STORAGE SERVICES",
        img:"https://img.freepik.com/free-vector/delivery-logistics-shipment-isometric-composition-with-faceless-human-characters-two-male-workers-parcel-rack-illustration_1284-29116.jpg?t=st=1740990373~exp=1740993973~hmac=9b0ec568af1c16505b7661cd2bdf1ef4038338f3a80f9c4d2b37cf7939483dfe&w=1800",
        description: "Need storage? We provide secure, climate-controlled storage options for short or long-term needs."
    },
    {
        title: "BUSINESS MOVING",
        img:"https://img.freepik.com/free-vector/house-moving-concept_23-2148676926.jpg?t=st=1740990434~exp=1740994034~hmac=4eddf1347b2f9d44d52a3f8bf7b4bca4a073afb91988bc294c77c91f467e57f0&w=2000",
        description: "We offer commercial moving services for offices, retail stores, and other businesses to relocate with minimal downtime."
    }
];


const serviceCardsContainer = document.getElementById('servicecards');

// servicesData.forEach(service => {
//     console.log(service)
//     const cardHTML = `
//         <div class="col">
//             <div class="servicecard">
//                 <div class="logo-container">
//                     <div class="logo-circle">
//                         <svg class="truck-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
//                             <path d="M1 3h15v13H1z" fill="#222" />
//                             <path d="M16 8h4l3 3v5h-7V8z" fill="#222" />
//                             <circle cx="5.5" cy="18.5" r="2.5" fill="white" />
//                             <circle cx="18.5" cy="18.5" r="2.5" fill="white" />
//                             <path d="M15 16H1V3h15" stroke-width="1" stroke="#FFD700" />
//                         </svg>
//                     </div>
//                 </div>
//                 <div class="servicetitle">${service.title}</div>
//                 <div class="wave">
//                     <svg width="300" height="50" viewBox="0 0 300 50">
//                         <path d="M0,25 Q25,0 50,25 Q75,50 100,25 Q125,0 150,25 Q175,50 200,25 Q225,0 250,25 Q275,50 300,25"
//                               fill="none" stroke="#FF0000" stroke-width="3" style="--i: 0"/>
//                     </svg>
//                 </div>
//                 <div class="description">${service.description}</div>
//             </div>
//         </div>
//     `;

//     serviceCardsContainer.insertAdjacentHTML('beforeend', cardHTML);
// });

servicesData.forEach(service => {
    console.log(service)
    const cardHTML = `
        <div class="col">
            <div class="servicecard">
                <div class="logo-container">
                   <img class="serviceimg" src="${service.img}"/>
                </div>
                <div class="servicetitle">${service.title}</div>
                <div class="wave">
                    <svg width="300" height="50" viewBox="0 0 300 50">
                        <path d="M0,25 Q25,0 50,25 Q75,50 100,25 Q125,0 150,25 Q175,50 200,25 Q225,0 250,25 Q275,50 300,25"
                              fill="none" stroke="#FF0000" stroke-width="3" style="--i: 0"/>
                    </svg>
                </div>
                <div class="description">${service.description}</div>
            </div>
        </div>
    `;

    serviceCardsContainer.insertAdjacentHTML('beforeend', cardHTML);
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

// eror scrren
// Function to check internet connection
function checkInternet() {
    if (navigator.onLine) {
        // If online, hide the TV container
        document.getElementById('tvContainer').style.display = 'none';
    } else {
        // If offline, show the TV container
        document.getElementById('tvContainer').style.display = 'block';
    }
}

// Event listeners for online/offline status
window.addEventListener('online', checkInternet);
window.addEventListener('offline', checkInternet);

// Initial check when the page loads
window.onload = checkInternet;



