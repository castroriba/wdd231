// scripts/index.js

// --- Local Storage Configuration (W06 Requirement) ---
const VISITS_KEY = 'atlas_sighting_count';
const LAST_VISIT_KEY = 'atlas_last_visit';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

// --- DOM Selector ---
const messageElement = document.getElementById('visit-message');

// --- W06 Requirement: Local Storage Implementation ---
function trackAndDisplayVisits() {
    if (!messageElement) {
        // Essential check for robustness
        return; 
    }
    
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    const now = Date.now();
    let sightingsCount = parseInt(localStorage.getItem(VISITS_KEY)) || 0;

    // 1. Check for the last visit time
    if (!lastVisit) {
        // First visit: Initialize count and message
        sightingsCount = 1;
        messageElement.textContent = "This is your first entry into the Wildlife Atlas! Time to log your first sighting.";
    } else {
        const lastVisitTime = parseFloat(lastVisit);
        const timeDifference = now - lastVisitTime;

        // 2. Determine and display message based on time difference
        if (timeDifference < ONE_DAY_MS) {
            // Less than a day since last visit
            messageElement.textContent = `Welcome back so soon! You've logged ${sightingsCount} total sightings.`;
        } else {
            // More than a day
            const daysDifference = Math.floor(timeDifference / ONE_DAY_MS);
            const dayString = daysDifference === 1 ? 'day' : 'days';
            messageElement.textContent = `It's been ${daysDifference} ${dayString} since your last log. Total sightings logged: ${sightingsCount}.`;
        }
        
        // Only increment the count if it's been more than a short period (e.g., 5 seconds)
        if (timeDifference > 5000) {
             sightingsCount += 1;
        }
    }

    // 3. Always update the total sightings count and the last visit timestamp
    localStorage.setItem(VISITS_KEY, sightingsCount);
    localStorage.setItem(LAST_VISIT_KEY, now.toString());
}


// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    trackAndDisplayVisits();
});