// scripts/main.js

// --- 1. Dynamic Footer Dates (Last Modified & Current Year) ---
const yearElement = document.getElementById('year');
const modifiedElement = document.getElementById('lastModified');

if (yearElement) {
    // Set the current year
    yearElement.textContent = new Date().getFullYear();
}

if (modifiedElement) {
    // Set the last modified date
    modifiedElement.textContent = document.lastModified;
}


// --- 2. Responsive Navigation Toggle (W06 Requirement) ---
const nav = document.querySelector('.main-nav');
const menuButton = document.querySelector('.menu-toggle');

if (menuButton && nav) {
    // Add click listener to the hamburger button
    menuButton.addEventListener('click', () => {
        // Toggle the 'open' class for styling changes
        nav.classList.toggle('open');
        
        // Toggle the ARIA attributes for accessibility (W06 Requirement)
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
        menuButton.setAttribute('aria-expanded', !isExpanded);
    });
}