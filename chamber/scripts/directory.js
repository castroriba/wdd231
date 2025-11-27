// scripts/directory.js

import { members } from '../data/members.mjs'; // <-- CORRECTED: Use import instead of fetch

const cards = document.querySelector('#directory-cards');
const gridButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');

// --- Helper Function: Create Card HTML ---
const createMemberCard = (member) => {
    let card = document.createElement('section');
    let h2 = document.createElement('h2');
    let address = document.createElement('p');
    let phone = document.createElement('p');
    let website = document.createElement('a');
    let logo = document.createElement('img');
    let level = document.createElement('p');

    // Populate content
    h2.textContent = member.name;
    address.textContent = member.address;
    address.classList.add('member-address');
    
    phone.textContent = `Phone: ${member.phone}`;
    phone.classList.add('member-phone');
    
    website.textContent = member.website.replace(/(^\w+:|^)\/\//, ''); // Clean URL display
    website.href = member.website;
    website.target = '_blank';
    website.classList.add('member-website');
    
    level.textContent = member.membership_level; 
    level.classList.add('membership-level');

    // Build Image attributes
    logo.setAttribute('src', member.imageurl);
    logo.setAttribute('alt', `Logo of ${member.name}`);
    logo.setAttribute('loading', 'lazy');
    logo.classList.add('member-logo');

    // Append to the card
    card.appendChild(logo);
    card.appendChild(h2);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);
    card.appendChild(level);

    return card;
}

// --- Display Function: Build HTML Cards ---
const displayMembers = (membersArray) => {
    cards.innerHTML = ''; 
    membersArray.forEach((member) => {
        const card = createMemberCard(member);
        cards.appendChild(card);
    });
}

// --- View Control Logic (Grid/List Switch) ---
function setView(viewType) {
    if (viewType === 'list') {
        cards.classList.remove('grid');
        cards.classList.add('list');
        listButton.classList.add('active-view');
        gridButton.classList.remove('active-view');
    } else { // Grid View (Default)
        cards.classList.remove('list');
        cards.classList.add('grid');
        gridButton.classList.add('active-view');
        listButton.classList.remove('active-view');
    }
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Display data directly from the imported 'members' array
    try {
        if (members && members.length > 0) {
            displayMembers(members);
        } else {
             throw new Error("Imported members array is empty or undefined.");
        }
    } catch (e) {
        console.error('Error displaying member data:', e);
        cards.innerHTML = `<p class="error">Failed to load member directory. Check console for details.</p>`;
    }
    
    // 2. Set default view to grid
    setView('grid'); 

    // 3. Attach listeners
    if (gridButton) gridButton.addEventListener('click', () => setView('grid'));
    if (listButton) listButton.addEventListener('click', () => setView('list'));
});