// Global variables and constants
const STORAGE_KEYS = {
    HUMAN_RIGHTS_SPEAKER: 'humanRightsSelected',
    SECURITY_SPEAKER: 'securitySelected',
    HUMAN_RIGHTS_VOTE: 'humanRightsVotes',
    SECURITY_VOTE: 'securityVotes'
};

const VOTE_OPTIONS = {
    IN_FAVOUR: 'مؤيد',
    AGAINST: 'معارض',
    ABSTENTION: 'ممتنع عن التصويت'
};

// --- Country Data (Extracted and Re-formatted for Voting) ---
const HR_COUNTRIES = [
    { id: 'hr_albania', name_ar: 'ألبانيا', flag: 'al' },
    { id: 'hr_germany', name_ar: 'ألمانيا', flag: 'de' },
    { id: 'hr_argentina', name_ar: 'الأرجنتين', flag: 'ar' },
    { id: 'hr_spain', name_ar: 'إسبانيا', flag: 'es' },
    { id: 'hr_indonesia', name_ar: 'إندونيسيا', flag: 'id' },
    { id: 'hr_iceland', name_ar: 'أيسلندا', flag: 'is' },
    { id: 'hr_brazil', name_ar: 'البرازيل', flag: 'br' },
    { id: 'hr_bulgaria', name_ar: 'بلغاريا', flag: 'bg' },
    { id: 'hr_belgium', name_ar: 'بلجيكا', flag: 'be' },
    { id: 'hr_panama', name_ar: 'بنما', flag: 'pa' },
    { id: 'hr_bangladesh', name_ar: 'بنغلاديش', flag: 'bd' },
    { id: 'hr_bolivia', name_ar: 'بوليفيا', flag: 'bo' },
    { id: 'hr_burundi', name_ar: 'بوروندي', flag: 'bi' },
    { id: 'hr_thailand', name_ar: 'تايلاند', flag: 'th' },
    { id: 'hr_czech', name_ar: 'التشيك', flag: 'cz' },
    { id: 'hr_chile', name_ar: 'تشيلي', flag: 'cl' },
    { id: 'hr_dominican_republic', name_ar: 'جمهورية الدومينيكان', flag: 'do' },
    { id: 'hr_georgia', name_ar: 'جورجيا', flag: 'ge' },
    { id: 'hr_marshall_islands', name_ar: 'جزر مارشال', flag: 'mh' },
    { id: 'hr_algeria', name_ar: 'الجزائر', flag: 'dz' },
    { id: 'hr_south_korea', name_ar: 'كوريا الجنوبية', flag: 'kr' },
    { id: 'hr_cote_divoire', name_ar: 'كوت ديفوار', flag: 'ci' },
    { id: 'hr_colombia', name_ar: 'كولومبيا', flag: 'co' },
    { id: 'hr_kuwait', name_ar: 'الكويت', flag: 'kw' },
    { id: 'hr_congo_dr', name_ar: 'الكونغو الديمقراطية', flag: 'cd' },
    { id: 'hr_kenya', name_ar: 'كينيا', flag: 'ke' },
    { id: 'hr_netherlands', name_ar: 'هولندا', flag: 'nl' },
    { id: 'hr_india', name_ar: 'الهند', flag: 'in' },
    { id: 'hr_japan', name_ar: 'اليابان', flag: 'jp' },
    { id: 'hr_greece', name_ar: 'اليونان', flag: 'gr' },
    { id: 'hr_mexico', name_ar: 'المكسيك', flag: 'mx' },
    { id: 'hr_malawi', name_ar: 'مالاوي', flag: 'mw' },
    { id: 'hr_morocco', name_ar: 'المغرب', flag: 'ma' },
    { id: 'hr_north_macedonia', name_ar: 'مقدونيا الشمالية', flag: 'mk' },
    { id: 'hr_austria', name_ar: 'النمسا', flag: 'at' },
    { id: 'hr_pakistan', name_ar: 'باكستان', flag: 'pk' },
    { id: 'hr_portugal', name_ar: 'البرتغال', flag: 'pt' },
    { id: 'hr_qatar', name_ar: 'قطر', flag: 'qa' },
    { id: 'hr_romania', name_ar: 'رومانيا', flag: 'ro' },
    { id: 'hr_switzerland', name_ar: 'سويسرا', flag: 'ch' },
    { id: 'hr_china', name_ar: 'الصين', flag: 'cn' },
    { id: 'hr_gambia', name_ar: 'غامبيا', flag: 'gm' },
    { id: 'hr_france', name_ar: 'فرنسا', flag: 'fr' },
    { id: 'hr_cyprus', name_ar: 'قبرص', flag: 'cy' },
    { id: 'hr_kyrgyzstan', name_ar: 'قيرغيزستان', flag: 'kg' },
    { id: 'hr_kazakhstan', name_ar: 'كازاخستان', flag: 'kz' },
    { id: 'hr_costa_rica', name_ar: 'كوستاريكا', flag: 'cr' }
];

const SC_COUNTRIES = [
    { id: 'sc_algeria', name_ar: 'الجزائر', flag: 'dz' },
    { id: 'sc_denmark', name_ar: 'الدنمارك', flag: 'dk' },
    { id: 'sc_russia', name_ar: 'روسيا', flag: 'ru' },
    { id: 'sc_slovenia', name_ar: 'سلوفينيا', flag: 'si' },
    { id: 'sc_sierra_leone', name_ar: 'سيراليون', flag: 'sl' },
    { id: 'sc_china', name_ar: 'الصين', flag: 'cn' },
    { id: 'sc_somalia', name_ar: 'الصومال', flag: 'so' },
    { id: 'sc_france', name_ar: 'فرنسا', flag: 'fr' },
    { id: 'sc_guyana', name_ar: 'غيانا', flag: 'gy' },
    { id: 'sc_qatar', name_ar: 'قطر', flag: 'qa' },
    { id: 'sc_south_korea', name_ar: 'كوريا الجنوبية', flag: 'kr' },
    { id: 'sc_uk', name_ar: 'المملكة المتحدة', flag: 'gb' },
    { id: 'sc_usa', name_ar: 'الولايات المتحدة', flag: 'us' },
    { id: 'sc_greece', name_ar: 'اليونان', flag: 'gr' },
    { id: 'sc_pakistan', name_ar: 'باكستان', flag: 'pk' }
];

// --- Utility Functions ---
function debugLog(message, data = null) {
    console.log(`[DEBUG] ${message}`, data || '');
}

function getCouncilTypeFromURL() {
    const currentPage = window.location.pathname.toLowerCase();
    if (currentPage.includes('human_rights')) {
        return 'human_rights';
    } else if (currentPage.includes('security')) {
        return 'security';
    }
    return null;
}

function getCountryList(councilType) {
    return councilType === 'human_rights' ? HR_COUNTRIES : SC_COUNTRIES;
}

// --- Local Storage Functions ---
function getStorageKey(councilType, isVoting = false) {
    if (isVoting) {
        return councilType === 'human_rights' ? STORAGE_KEYS.HUMAN_RIGHTS_VOTE : STORAGE_KEYS.SECURITY_VOTE;
    } else {
        return councilType === 'human_rights' ? STORAGE_KEYS.HUMAN_RIGHTS_SPEAKER : STORAGE_KEYS.SECURITY_SPEAKER;
    }
}

function getSelectedCountries(councilType) {
    try {
        const key = getStorageKey(councilType, false);
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        debugLog('Error getting selected countries:', error);
        return [];
    }
}

function saveSelectedCountries(councilType, countries) {
    try {
        const key = getStorageKey(councilType, false);
        localStorage.setItem(key, JSON.stringify(countries));
    } catch (error) {
        debugLog('Error saving selected countries:', error);
    }
}

function getCountryVotes(councilType) {
    try {
        const key = getStorageKey(councilType, true);
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : {};
    } catch (error) {
        debugLog('Error getting country votes:', error);
        return {};
    }
}

function saveCountryVotes(councilType, votes) {
    try {
        const key = getStorageKey(councilType, true);
        localStorage.setItem(key, JSON.stringify(votes));
    } catch (error) {
        debugLog('Error saving country votes:', error);
    }
}

// --- Speaker List Functions (Modified) ---
function addCountryToSelection(councilType, countryData) {
    const selected = getSelectedCountries(councilType);
    const existingIndex = selected.findIndex(country => country.id === countryData.id);
    
    if (existingIndex === -1) {
        const countryWithOrder = {
            ...countryData,
            timestamp: Date.now(),
            order: selected.length + 1
        };
        selected.push(countryWithOrder);
        saveSelectedCountries(councilType, selected);
    }
}

function removeCountryFromSelection(councilType, countryId) {
    const selected = getSelectedCountries(councilType);
    const filtered = selected.filter(country => country.id !== countryId);
    
    const reordered = filtered.map((country, index) => ({
        ...country,
        order: index + 1
    }));
    
    saveSelectedCountries(councilType, reordered);
}

function resetAllCheckboxes(councilType) {
    const key = getStorageKey(councilType, false);
    localStorage.removeItem(key);
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    showNotification('تم إعادة تعيين جميع اختيارات قائمة المتحدثين', 'success');
}

function initializeCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const councilType = getCouncilTypeFromURL();
    if (!councilType) return;
    
    checkboxes.forEach(checkbox => {
        const selected = getSelectedCountries(councilType);
        const isSelected = selected.some(country => country.id === checkbox.id);
        checkbox.checked = isSelected;
        
        checkbox.addEventListener('change', function() {
            const countryData = {
                id: this.id,
                name_ar: this.value,
                flag: this.dataset.flag,
            };
            
            if (this.checked) {
                addCountryToSelection(councilType, countryData);
                showNotification(`تم إضافة ${countryData.name_ar} إلى قائمة المتحدثين`, 'success');
            } else {
                removeCountryFromSelection(councilType, countryData.id);
                showNotification(`تم إزالة ${countryData.name_ar} من قائمة المتحدثين`, 'info');
            }
        });
    });
}

function loadSpeakerList() {
    const councilType = getCouncilTypeFromURL();
    if (!councilType) return;
    
    const selected = getSelectedCountries(councilType);
    const speakerListContainer = document.getElementById('speaker-list');
    
    if (!speakerListContainer) return;
    
    const sortedCountries = selected.sort((a, b) => a.timestamp - b.timestamp);
    
    let speakerListHTML = '';
    if (sortedCountries.length > 0) {
        sortedCountries.forEach((country, index) => {
            speakerListHTML += `
                <div class="speaker-item">
                    <div class="speaker-order">${index + 1}</div>
                    <span class="flag-icon flag-icon-${country.flag}"></span>
                    <div class="speaker-name">${country.name_ar}</div>
                </div>
            `;
        });
    } else {
        speakerListHTML = `
            <div class="no-speakers" id="no-speakers">
                <p>لا يوجد متحدثون محددون حاليًا.</p>
                <p>يرجى العودة إلى صفحة المجلس لتحديد الدول المتحدثة.</p>
            </div>
        `;
    }
    
    speakerListContainer.innerHTML = speakerListHTML;
    
    const speakerCountElement = document.getElementById('speaker-count');
    if (speakerCountElement) {
        speakerCountElement.textContent = `عدد المتحدثين: ${selected.length}`;
    }
}

// --- Voting Functions (NEW) ---
function generateVotingList(councilType) {
    const countries = getCountryList(councilType);
    const currentVotes = getCountryVotes(councilType);
    const container = document.getElementById(`${councilType}_countries`);
    if (!container) return;

    let html = '';
    countries.forEach(country => {
        const currentVote = currentVotes[country.id];
        const isDisabled = currentVote ? 'disabled' : '';
        const isSelectedInFavour = currentVote === VOTE_OPTIONS.IN_FAVOUR ? 'selected' : '';
        const isSelectedAgainst = currentVote === VOTE_OPTIONS.AGAINST ? 'selected' : '';
        const isSelectedAbstention = currentVote === VOTE_OPTIONS.ABSTENTION ? 'selected' : '';
        
        html += `
            <div class="country-vote-item" data-country-id="${country.id}">
                <div class="country-name">
                    <span class="flag-icon flag-icon-${country.flag}"></span>
                    ${country.name_ar}
                </div>
                <div class="vote-options">
                    <button class="vote-btn in-favour ${isSelectedInFavour}" 
                            data-vote-type="${VOTE_OPTIONS.IN_FAVOUR}" 
                            onclick="recordVote('${councilType}', '${country.id}', '${VOTE_OPTIONS.IN_FAVOUR}', this)"
                            ${isDisabled}>
                        <i class="fa-solid fa-plus"></i> مؤيد
                    </button>
                    <button class="vote-btn against ${isSelectedAgainst}" 
                            data-vote-type="${VOTE_OPTIONS.AGAINST}" 
                            onclick="recordVote('${councilType}', '${country.id}', '${VOTE_OPTIONS.AGAINST}', this)"
                            ${isDisabled}>
                        <i class="fa-solid fa-minus"></i> معارض
                    </button>
                    <button class="vote-btn abstention ${isSelectedAbstention}" 
                            data-vote-type="${VOTE_OPTIONS.ABSTENTION}" 
                            onclick="recordVote('${councilType}', '${country.id}', '${VOTE_OPTIONS.ABSTENTION}', this)"
                            ${isDisabled}>
                        <i class="fa-solid fa-xmark"></i> ممتنع
                    </button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function recordVote(councilType, countryId, voteType, buttonElement) {
    const currentVotes = getCountryVotes(councilType);
    
    // Record the new vote
    currentVotes[countryId] = voteType;
    
    // Update local storage
    saveCountryVotes(councilType, currentVotes);
    
    // Update the UI for the current country: select the button and disable all buttons
    const countryItem = buttonElement.closest('.country-vote-item');
    const allButtons = countryItem.querySelectorAll('.vote-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('selected');
        btn.disabled = true; // Disable all buttons for this country after a vote
    });
    
    buttonElement.classList.add('selected');
}

function resetVoting(councilType) {
    const key = getStorageKey(councilType, true);
    localStorage.removeItem(key);
    
    // Clear all 'selected' classes
    const buttons = document.querySelectorAll('.vote-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    
    showVotingResult(councilType);
    showNotification('تم إعادة تعيين جميع الأصوات', 'success');
}

function showVotingResult(councilType) {
    // This function now only handles navigation to the results page
    if (councilType === 'human_rights') {
        window.location.href = 'human_rights_voting_results.html';
    } else if (councilType === 'security') {
        window.location.href = 'security_council_voting_results.html';
    }
}

function displayVotingResults(councilType) {
    const countries = getCountryList(councilType);
    const currentVotes = getCountryVotes(councilType);
    const resultsContainer = document.getElementById(`${councilType}_results_grid`);
    const summaryContainer = document.getElementById(`${councilType}_summary_large`);
    
    if (!resultsContainer || !summaryContainer) return;

    let resultsHTML = '';
    const voteCounts = {
        [VOTE_OPTIONS.IN_FAVOUR]: 0,
        [VOTE_OPTIONS.AGAINST]: 0,
        [VOTE_OPTIONS.ABSTENTION]: 0
    };
    
    // Generate result list for the grid layout
    countries.forEach(country => {
        const vote = currentVotes[country.id];
        let voteClass = 'no-vote';
        let voteIcon = '';
        let voteText = 'لم يصوت';

        if (vote === VOTE_OPTIONS.IN_FAVOUR) {
            voteClass = 'in-favour';
            voteIcon = '<i class="fa-solid fa-plus"></i>';
            voteText = 'مؤيد';
            voteCounts[VOTE_OPTIONS.IN_FAVOUR]++;
        } else if (vote === VOTE_OPTIONS.AGAINST) {
            voteClass = 'against';
            voteIcon = '<i class="fa-solid fa-minus"></i>';
            voteText = 'معارض';
            voteCounts[VOTE_OPTIONS.AGAINST]++;
        } else if (vote === VOTE_OPTIONS.ABSTENTION) {
            voteClass = 'abstention';
            voteIcon = '<i class="fa-solid fa-xmark"></i>';
            voteText = 'ممتنع';
            voteCounts[VOTE_OPTIONS.ABSTENTION]++;
        }

        resultsHTML += `
            <div class="result-grid-item ${voteClass}">
                <div class="result-country-name">${country.name_ar}</div>
                <div class="result-vote-status">${voteIcon}</div>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = resultsHTML;

    // Generate summary
    summaryContainer.innerHTML = `
        <div class="summary-item-large in-favour">
            <i class="fa-solid fa-plus"></i>
            <span>مؤيد:</span>
            <span class="count">${voteCounts[VOTE_OPTIONS.IN_FAVOUR]}</span>
        </div>
        <div class="summary-item-large against">
            <i class="fa-solid fa-minus"></i>
            <span>معارض:</span>
            <span class="count">${voteCounts[VOTE_OPTIONS.AGAINST]}</span>
        </div>
        <div class="summary-item-large abstention">
            <i class="fa-solid fa-xmark"></i>
            <span>ممتنع:</span>
            <span class="count">${voteCounts[VOTE_OPTIONS.ABSTENTION]}</span>
        </div>
    `;
}

// --- Initialization and Event Handling ---
document.addEventListener('DOMContentLoaded', function() {
    const councilType = getCouncilTypeFromURL();
    
    if (window.location.pathname.includes('council.html') && !window.location.pathname.includes('voting.html')) {
        initializeCheckboxes();
    } else if (window.location.pathname.includes('_voting.html')) {
        // Only generate the list if the container is present
        if (document.getElementById(`${councilType}_countries`)) {
            generateVotingList(councilType);
        }
    } else if (window.location.pathname.includes('speaker_list')) {
        loadSpeakerList();
    } else if (window.location.pathname.includes('_voting_results.html')) {
        // Results page initialization is handled by inline script in the HTML
    }
    
    setupEventListeners();
});

// --- Navigation functions (Modified) ---
function goBack() {
    const councilType = getCouncilTypeFromURL();
    if (councilType === 'human_rights') {
        window.location.href = 'human_rights_options.html';
    } else if (councilType === 'security') {
        window.location.href = 'security_options.html';
    } else {
        window.history.back(); // Fallback for other pages
    }
}

function goToSpeakerList(councilType) {
    if (councilType === 'human_rights') {
        window.location.href = 'speaker_list_human_rights.html';
    } else if (councilType === 'security') {
        window.location.href = 'speaker_list_security_council.html';
    }
}

function goBackToCouncil(councilType) {
    window.history.back();
}

// --- Event listeners setup (Simplified) ---
function setupEventListeners() {
    // No need for complex event listeners here, as navigation is now handled by direct links.
}

// --- Notification system (Unchanged) ---
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

// Export functions for global access
window.goBack = goBack;
window.goToSpeakerList = goToSpeakerList;
window.resetAllCheckboxes = resetAllCheckboxes;
window.loadSpeakerList = loadSpeakerList;
window.recordVote = recordVote;
window.resetVoting = resetVoting;
window.showVotingResult = showVotingResult;
