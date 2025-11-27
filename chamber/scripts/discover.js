// scripts/discover.js
import { places } from '../data/places.mjs'; // Import data source (Criterion 10)

const placesGrid = document.getElementById('places-grid');
const messageElement = document.getElementById('visitor-message');

// --- A. LocalStorage Visit Message Logic (Criterion 8) ---
const LAST_VISIT_KEY = 'chamber_last_visit';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function displayVisitMessage() {
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    const now = Date.now();

    if (!lastVisit) {
        // First visit
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitTime = parseFloat(lastVisit);
        const timeDifference = now - lastVisitTime;

        if (timeDifference < ONE_DAY_MS) {
            // Less than a day
            messageElement.textContent = "Back so soon! Awesome!";
        } else {
            // More than a day
            const daysDifference = Math.floor(timeDifference / ONE_DAY_MS);
            const dayString = daysDifference === 1 ? 'day' : 'days';
            messageElement.textContent = `You last visited ${daysDifference} ${dayString} ago.`;
        }
    }

    // Always update localStorage with the current time (in milliseconds)
    localStorage.setItem(LAST_VISIT_KEY, now.toString());
}


// --- B. Dynamic Card Generation (Criterion 11) ---

function createPlaceCard(place) {
    // Build the Card using semantic elements
    const card = document.createElement('div');
    card.classList.add('place-card');
    
    // Set the ID to match the grid-area name in CSS (Criterion 12)
    card.id = place.id; 

    // Card Content (Title, Image, Address, Description, Button)
    card.innerHTML = `
        <h2>${place.name}</h2>
        
        <figure>
            <img src="images/${place.image}" 
                 alt="${place.name}" 
                 loading="lazy"
                 width="300" 
                 height="200">
            <figcaption>${place.name}</figcaption>
        </figure>

        <address>${place.address}</address>
        <p>${place.description}</p>
        <button class="learn-more-btn">Learn More</button>
    `;
    
    placesGrid.appendChild(card);
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Display the visitor message
    displayVisitMessage();

    // 2. Generate the 8 cards
    places.forEach(place => {
        createPlaceCard(place);
    });
});