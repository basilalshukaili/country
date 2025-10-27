// Global variables and constants
const STORAGE_KEYS = {
    HUMAN_RIGHTS: 'humanRightsSelected',
    SECURITY: 'securitySelected'
};

// Debug function
function debugLog(message, data = null) {
    console.log(`[DEBUG] ${message}`, data || '');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    debugLog('DOM Content Loaded');
    initializeCheckboxes();
    setupEventListeners();
});

// Navigation functions
function navigateToCouncil(councilType) {
    debugLog('Navigating to council:', councilType);
    if (councilType === 'human_rights') {
        window.location.href = 'human_rights_council.html';
    } else if (councilType === 'security') {
        window.location.href = 'security_council.html';
    }
}

function goToSpeakerList(councilType) {
    debugLog('Going to speaker list:', councilType);
    if (councilType === 'human_rights') {
        window.location.href = 'speaker_list_human_rights.html';
    } else if (councilType === 'security') {
        window.location.href = 'speaker_list_security_council.html';
    }
}

function goBack() {
    debugLog('Going back to home');
    window.location.href = 'index.html';
}

function goBackToCouncil(councilType) {
    debugLog('Going back to council:', councilType);
    if (councilType === 'human_rights') {
        window.location.href = 'human_rights_council.html';
    } else if (councilType === 'security') {
        window.location.href = 'security_council.html';
    }
}

// Local storage functions
function getStorageKey(councilType) {
    return councilType === 'human_rights' ? STORAGE_KEYS.HUMAN_RIGHTS : STORAGE_KEYS.SECURITY;
}

function getSelectedCountries(councilType) {
    try {
        const key = getStorageKey(councilType);
        const stored = localStorage.getItem(key);
        const result = stored ? JSON.parse(stored) : [];
        debugLog(`Retrieved ${result.length} countries for ${councilType}`, result);
        return result;
    } catch (error) {
        debugLog('Error getting selected countries:', error);
        return [];
    }
}

function saveSelectedCountries(councilType, countries) {
    try {
        const key = getStorageKey(councilType);
        localStorage.setItem(key, JSON.stringify(countries));
        debugLog(`Saved ${countries.length} countries for ${councilType}`, countries);
    } catch (error) {
        debugLog('Error saving selected countries:', error);
    }
}

function addCountryToSelection(councilType, countryData) {
    debugLog('Adding country to selection:', countryData);
    const selected = getSelectedCountries(councilType);
    
    // Check if country is already selected
    const existingIndex = selected.findIndex(country => country.value === countryData.value);
    
    if (existingIndex === -1) {
        // Add country with timestamp for ordering
        const countryWithOrder = {
            ...countryData,
            timestamp: Date.now(),
            order: selected.length + 1
        };
        selected.push(countryWithOrder);
        saveSelectedCountries(councilType, selected);
        debugLog('Country added successfully');
    } else {
        debugLog('Country already exists in selection');
    }
}

function removeCountryFromSelection(councilType, countryValue) {
    debugLog('Removing country from selection:', countryValue);
    const selected = getSelectedCountries(councilType);
    const filtered = selected.filter(country => country.value !== countryValue);
    
    // Reorder the remaining countries
    const reordered = filtered.map((country, index) => ({
        ...country,
        order: index + 1
    }));
    
    saveSelectedCountries(councilType, reordered);
    debugLog('Country removed successfully');
}

function resetAllCheckboxes(councilType) {
    debugLog('Resetting all checkboxes for:', councilType);
    // Clear from localStorage
    const key = getStorageKey(councilType);
    localStorage.removeItem(key);
    
    // Uncheck all checkboxes on the page
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Show confirmation message
    showNotification('تم إعادة تعيين جميع الاختيارات', 'success');
}

// Checkbox management
function initializeCheckboxes() {
    debugLog('Initializing checkboxes');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    debugLog(`Found ${checkboxes.length} checkboxes`);
    
    checkboxes.forEach((checkbox, index) => {
        // Determine council type from page URL or checkbox ID
        const councilType = determineCouncilType(checkbox);
        const selected = getSelectedCountries(councilType);
        
        debugLog(`Checkbox ${index}:`, {
            id: checkbox.id,
            value: checkbox.value,
            flag: checkbox.dataset.flag,
            councilType: councilType
        });
        
        // Check if this country is already selected
        const isSelected = selected.some(country => country.value === checkbox.value);
        checkbox.checked = isSelected;
        
        // Add event listener
        checkbox.addEventListener('change', function(event) {
            debugLog('Checkbox changed:', {
                checked: this.checked,
                value: this.value,
                councilType: councilType
            });
            handleCheckboxChange(this, councilType);
        });
    });
}

function determineCouncilType(checkbox) {
    // First try to determine from checkbox ID prefix
    if (checkbox.id.startsWith('hr_')) {
        return 'human_rights';
    } else if (checkbox.id.startsWith('sc_')) {
        return 'security';
    }
    
    // Fallback: check current page URL
    const currentPage = window.location.pathname.toLowerCase();
    if (currentPage.includes('human_rights')) {
        return 'human_rights';
    } else if (currentPage.includes('security')) {
        return 'security';
    }
    
    debugLog('Could not determine council type, defaulting to human_rights');
    return 'human_rights'; // Default fallback
}

function handleCheckboxChange(checkbox, councilType) {
    const countryData = {
        value: checkbox.value,
        flag: checkbox.dataset.flag,
        index: checkbox.dataset.index
    };
    
    debugLog('Handling checkbox change:', {
        checked: checkbox.checked,
        countryData: countryData,
        councilType: councilType
    });
    
    if (checkbox.checked) {
        addCountryToSelection(councilType, countryData);
        showNotification(`تم إضافة ${countryData.value} إلى قائمة المتحدثين`, 'success');
    } else {
        removeCountryFromSelection(councilType, countryData.value);
        showNotification(`تم إزالة ${countryData.value} من قائمة المتحدثين`, 'info');
    }
}

// Speaker list functions
function loadSpeakerList(councilType) {
    debugLog('Loading speaker list for:', councilType);
    const selected = getSelectedCountries(councilType);
    const speakerListContainer = document.getElementById('speaker-list');
    const noSpeakersDiv = document.getElementById('no-speakers');
    const speakerCountElement = document.getElementById('speaker-count');
    
    debugLog('Speaker list elements:', {
        container: !!speakerListContainer,
        noSpeakers: !!noSpeakersDiv,
        counter: !!speakerCountElement,
        selectedCount: selected.length
    });
    
    if (!speakerListContainer) {
        debugLog('Speaker list container not found');
        return;
    }
    
    // Update speaker count
    if (speakerCountElement) {
        speakerCountElement.textContent = `عدد المتحدثين: ${selected.length}`;
    }
    
    if (selected.length === 0) {
        // Show no speakers message
        if (noSpeakersDiv) {
            noSpeakersDiv.style.display = 'block';
        }
        // Clear any existing speaker items
        const existingSpeakers = speakerListContainer.querySelectorAll('.speaker-item');
        existingSpeakers.forEach(item => item.remove());
        debugLog('No speakers to display');
        return;
    }
    
    // Hide no speakers message
    if (noSpeakersDiv) {
        noSpeakersDiv.style.display = 'none';
    }
    
    // Sort by selection order (timestamp)
    const sortedCountries = selected.sort((a, b) => a.timestamp - b.timestamp);
    debugLog('Sorted countries:', sortedCountries);
    
    // Generate speaker list HTML
    let speakerListHTML = '';
    sortedCountries.forEach((country, index) => {
        speakerListHTML += `
            <div class="speaker-item">
                <div class="speaker-order">${index + 1}</div>
                <span class="flag-icon flag-icon-${country.flag}"></span>
                <div class="speaker-name">${country.value}</div>
            </div>
        `;
    });
    
    // Clear existing content and add new speakers
    const existingSpeakers = speakerListContainer.querySelectorAll('.speaker-item');
    existingSpeakers.forEach(item => item.remove());
    
    speakerListContainer.insertAdjacentHTML('beforeend', speakerListHTML);
    debugLog('Speaker list updated with HTML');
}

// Event listeners setup
function setupEventListeners() {
    debugLog('Setting up event listeners');
    
    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key to go back
        if (e.key === 'Escape') {
            const currentPage = window.location.pathname;
            if (currentPage.includes('speaker_list')) {
                // Go back to respective council page
                if (currentPage.includes('human_rights')) {
                    goBackToCouncil('human_rights');
                } else if (currentPage.includes('security')) {
                    goBackToCouncil('security');
                }
            } else if (!currentPage.includes('index.html') && currentPage !== '/') {
                // Go back to home page
                goBack();
            }
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '600',
        fontSize: '14px',
        zIndex: '10000',
        maxWidth: '300px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out'
    });
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
            break;
        case 'info':
        default:
            notification.style.background = 'linear-gradient(135deg, #2196F3, #1976D2)';
            break;
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global access (if needed)
window.navigateToCouncil = navigateToCouncil;
window.goToSpeakerList = goToSpeakerList;
window.goBack = goBack;
window.goBackToCouncil = goBackToCouncil;
window.resetAllCheckboxes = resetAllCheckboxes;
window.loadSpeakerList = loadSpeakerList;

