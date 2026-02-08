// Screen elements
const homeScreen = document.getElementById("homeScreen");
const weatherScreen = document.getElementById("weatherScreen");
const favScreen = document.getElementById("favScreen");
const navTabs = document.querySelectorAll(".nav-tab");

// Update active tab
function updateActiveTab(screen) {
    navTabs.forEach(tab => tab.classList.remove("active"));
    
    if (screen === homeScreen) {
        navTabs[0].classList.add("active");
    } else if (screen === weatherScreen) {
        navTabs[1].classList.add("active");
    } else if (screen === favScreen) {
        navTabs[2].classList.add("active");
    }
}

// Fade-out animation utility
function fadeOutScreen(screen) {
    return new Promise(resolve => {
        screen.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            screen.classList.add("d-none");
            screen.style.animation = '';
            resolve();
        }, 300);
    });
}

// Fade-in animation utility  
function fadeInScreen(screen) {
    screen.classList.remove("d-none");
    screen.style.animation = 'slideUp 0.4s ease-out';
}

// Navigation functions
async function goHome() {
    if (!homeScreen.classList.contains("d-none")) return; // Already on home
    
    await fadeOutScreen(weatherScreen);
    await fadeOutScreen(favScreen);
    fadeInScreen(homeScreen);
    updateActiveTab(homeScreen);
}

async function goWeather() {
    if (!state.currentWeather) {
        showError("🔍 Please search for a city first");
        goHome();
        return;
    }

    document.getElementById("weatherMsg").innerText = "";
    errorText.innerText = "";

    await fadeOutScreen(homeScreen);
    await fadeOutScreen(favScreen);
    fadeInScreen(weatherScreen);
    updateActiveTab(weatherScreen);
}

async function goFavorites() {
    await fadeOutScreen(homeScreen);
    await fadeOutScreen(weatherScreen);
    updateActiveTab(favScreen);
    fadeInScreen(favScreen);
    showFavorites(); // Refresh favorites list
}

// Initialize app
function initApp() {
	showFavorites();
	goHome(); // Start on home screen
}

initApp();
