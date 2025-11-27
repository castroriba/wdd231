// scripts/thanks.js

document.addEventListener('DOMContentLoaded', () => {
    // Get the query string from the URL
    const params = new URLSearchParams(window.location.search);
    const dataDisplay = document.getElementById('data-display');
    const welcomeMessage = document.getElementById('welcome-message');
    
    // Check if the form was actually submitted
    if (params.size === 0) {
        welcomeMessage.textContent = "Thank You!";
        dataDisplay.innerHTML = "<p>No recent submission data found.</p>";
        return;
    }

    // Customize the welcome message using the user's name (W06 requirement)
    const fullName = params.get('fullName') || 'Explorer';
    welcomeMessage.textContent = `Thank You, ${fullName}!`;

    // Object to hold user-friendly key-value pairs
    const displayData = {
        'Full Name': params.get('fullName'),
        'Email': params.get('email'),
        'Phone': params.get('phone'),
        'Species Observed': params.get('speciesName'),
        'Location (Park)': params.get('parkName'),
        'Date of Sighting': params.get('sightingDate'),
        'Notes': params.get('sightingNotes') || 'No additional notes provided'
    };

    // Iterate through the collected data and dynamically build the display HTML
    let html = '';
    for (const [key, value] of Object.entries(displayData)) {
        if (value) {
            html += `
                <div class="data-item">
                    <p class="data-label">${key}:</p>
                    <p class="data-value">${value}</p>
                </div>
            `;
        }
    }
    
    // W06 Requirement: DOM Manipulation to display form data
    dataDisplay.innerHTML = html;
});