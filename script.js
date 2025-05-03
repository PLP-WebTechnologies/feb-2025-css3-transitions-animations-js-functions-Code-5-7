document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const animationTarget = document.getElementById('animation-target');
    const spinBtn = document.getElementById('spin-btn');
    const bounceBtn = document.getElementById('bounce-btn');
    const colorBtn = document.getElementById('color-btn');
    const speedSelect = document.getElementById('animation-speed');
    const favColorInput = document.getElementById('fav-color');
    const saveSettingsBtn = document.getElementById('save-settings');
    const statusMessage = document.getElementById('status-message');

    // Load saved settings
    function loadSettings() {
        const settings = JSON.parse(localStorage.getItem('animationSettings')) || {};
        
        if (settings.favColor) {
            favColorInput.value = settings.favColor;
            document.documentElement.style.setProperty('--primary-color', settings.favColor);
        }
        
        if (settings.animationSpeed) {
            speedSelect.value = settings.animationSpeed;
            updateAnimationSpeed();
        }
        
        showStatus('Settings loaded', 'success');
    }

    // Save settings to localStorage
    function saveSettings() {
        const settings = {
            favColor: favColorInput.value,
            animationSpeed: speedSelect.value
        };
        
        localStorage.setItem('animationSettings', JSON.stringify(settings));
        document.documentElement.style.setProperty('--primary-color', settings.favColor);
        updateAnimationSpeed();
        
        showStatus('Settings saved!', 'success');
        
        // Animate the save button
        saveSettingsBtn.textContent = '✓ Saved!';
        setTimeout(() => {
            saveSettingsBtn.textContent = 'Save Settings';
        }, 2000);
    }

    // Update animation speed based on selection
    function updateAnimationSpeed() {
        const speeds = {
            slow: '2s',
            normal: '1s',
            fast: '0.5s'
        };
        document.documentElement.style.setProperty('--animation-duration', speeds[speedSelect.value]);
    }

    // Show status message
    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.style.color = type === 'success' ? 'green' : 'red';
        
        setTimeout(() => {
            statusMessage.textContent = '';
        }, 3000);
    }

    // Trigger animation
    function triggerAnimation(animationClass, colorAnimation = false) {
        // Remove all animation classes first
        animationTarget.classList.remove(
            'animate-spin', 
            'animate-bounce', 
            'animate-color-pulse'
        );
        
        // Force reflow to restart animation
        void animationTarget.offsetWidth;
        
        // Set pulse color if needed
        if (colorAnimation) {
            document.documentElement.style.setProperty('--pulse-color', favColorInput.value);
        }
        
        // Add the new animation class
        animationTarget.classList.add(animationClass);
    }

    // Event Listeners
    spinBtn.addEventListener('click', () => triggerAnimation('animate-spin'));
    bounceBtn.addEventListener('click', () => triggerAnimation('animate-bounce'));
    colorBtn.addEventListener('click', () => triggerAnimation('animate-color-pulse', true));
    speedSelect.addEventListener('change', updateAnimationSpeed);
    saveSettingsBtn.addEventListener('click', saveSettings);

    // Initialize
    loadSettings();
});
