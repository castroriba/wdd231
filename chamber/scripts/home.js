// scripts/home.js

import { members } from '../data/members.mjs'; // <-- CORRECTED: Use import for member data

// --- Configuration ---
// !!! IMPORTANT: REPLACE "YOUR_API_KEY_HERE" WITH YOUR ACTUAL KEY !!!
const WEATHER_API_KEY = "5588c195e6b3a730fe86594ef81462d8"; 
const KAMPALA_LAT = 0.3476;
const KAMPALA_LON = 32.5825;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${KAMPALA_LAT}&lon=${KAMPALA_LON}&units=imperial&appid=${WEATHER_API_KEY}`;

// --- DOM Selectors ---
const currentTemp = document.querySelector('#current-temp');
const weatherDesc = document.querySelector('#weather-desc');
const weatherIcon = document.querySelector('#weather-icon');
const currentConditionsContainer = document.querySelector('#current-weather');
const forecastOutput = document.querySelector('#forecast-output');
const spotlightsContainer = document.querySelector('#spotlights-container');

// --- Helper Functions ---
const capitalize = (s) => s.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
const toDayOfWeek = (timestamp) => new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'short' });


// --- 1. Weather Fetch & Display (Retained fetch logic) ---
async function getWeatherData() {
    try {
        const response = await fetch(FORECAST_URL);
        if (!response.ok) {
            // Updated error message for clarity
            throw new Error(`HTTP error! status: ${response.status} (Check API Key and URL)`);
        }
        const data = await response.json();
        
        // --- Current Weather ---
        const currentData = data.list[0];
        currentTemp.textContent = `${currentData.main.temp.toFixed(0)}°F`;
        
        const desc = currentData.weather[0].description;
        weatherDesc.textContent = capitalize(desc);
        const iconCode = currentData.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.alt = capitalize(desc);

        // --- 3-Day Forecast ---
        const forecastList = data.list;
        let uniqueDays = [];
        let threeDayForecast = [];
        const today = new Date().getDay();

        for (const entry of forecastList) {
            const entryDate = new Date(entry.dt * 1000);
            const day = entryDate.getDay();

            if (day !== today && !uniqueDays.includes(day)) {
                uniqueDays.push(day);
                threeDayForecast.push({
                    date: entryDate,
                    temp: entry.main.temp.toFixed(0),
                    icon: entry.weather[0].icon,
                });
            }
            if (threeDayForecast.length === 3) break;
        }

        // Render the forecast HTML
        forecastOutput.innerHTML = `<div class="forecast-container">` + threeDayForecast.map(f => `
            <div class="forecast-day">
                <p><strong>${toDayOfWeek(f.date.getTime() / 1000)}</strong></p>
                <img src="https://openweathermap.org/img/wn/${f.icon}.png" alt="Forecast icon" width="50" height="50">
                <p>${f.temp}°F</p>
            </div>
        `).join('') + `</div>`;

    } catch (error) {
        console.error("Weather data failed to load:", error);
        currentConditionsContainer.innerHTML = '<p>Weather service is unavailable. Check API key.</p>';
        forecastOutput.innerHTML = '';
    }
}

// --- 2. Spotlight Display (Uses imported 'members' array) ---
function displaySpotlights() {
    try {
        if (!members || members.length === 0) {
            throw new Error('Imported members array is empty or undefined.');
        }

        // 1. Filter for Gold or Silver members
        let eligibleMembers = members.filter(member => 
            member.membership_level === 'Gold' || member.membership_level === 'Silver'
        );

        // 2. Randomly select 3 members (or fewer if less are eligible)
        let spotlights = [];
        const numSpotlights = Math.min(3, eligibleMembers.length); 

        for (let i = 0; i < numSpotlights; i++) {
            const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
            spotlights.push(eligibleMembers.splice(randomIndex, 1)[0]); 
        }

        // 3. Render the spotlight cards
        spotlightsContainer.innerHTML = spotlights.map(member => `
            <section class="spotlight-card">
                <h3>${member.name}</h3>
                <img src="${member.imageurl}" alt="Logo of ${member.name}" loading="lazy">
                <p class="spotlight-address">${member.address}</p>
                <p class="spotlight-phone">${member.phone}</p>
                <a href="${member.website}" target="_blank" class="spotlight-website">${member.website.replace(/(^\w+:|^)\/\//, '')}</a>
                <p class="level-tag">${member.membership_level} Member</p>
            </section>
        `).join('');

    } catch (error) {
        console.error("Spotlight data failed to load:", error);
        spotlightsContainer.innerHTML = '<p>Member spotlights failed to load. Check console for details.</p>';
    }
}

// --- Initialize Page ---
document.addEventListener('DOMContentLoaded', () => {
    getWeatherData();
    displaySpotlights();
});