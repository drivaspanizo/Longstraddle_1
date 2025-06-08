// Application Data
const companiesData = [
  {"symbol": "MSFT", "name": "Microsoft Corporation", "market_cap": 3496.12},
  {"symbol": "NVDA", "name": "NVIDIA Corporation", "market_cap": 3457.97},
  {"symbol": "AAPL", "name": "Apple Inc.", "market_cap": 3045.71},
  {"symbol": "AMZN", "name": "Amazon.com, Inc.", "market_cap": 2267.33},
  {"symbol": "GOOG", "name": "Alphabet Inc.", "market_cap": 2114.33},
  {"symbol": "META", "name": "Meta Platforms, Inc.", "market_cap": 1754.27},
  {"symbol": "AVGO", "name": "Broadcom Inc.", "market_cap": 1161.05},
  {"symbol": "BRK.B", "name": "Berkshire Hathaway Inc.", "market_cap": 1064.76},
  {"symbol": "TSLA", "name": "Tesla, Inc.", "market_cap": 950.63},
  {"symbol": "WMT", "name": "Walmart Inc.", "market_cap": 777.85},
  {"symbol": "JPM", "name": "JPMorgan Chase & Co.", "market_cap": 738.49},
  {"symbol": "V", "name": "Visa Inc.", "market_cap": 693.11},
  {"symbol": "LLY", "name": "Eli Lilly and Company", "market_cap": 691.15},
  {"symbol": "MA", "name": "Mastercard Incorporated", "market_cap": 535.86},
  {"symbol": "NFLX", "name": "Netflix, Inc.", "market_cap": 528.34},
  {"symbol": "ORCL", "name": "Oracle Corporation", "market_cap": 487.99},
  {"symbol": "COST", "name": "Costco Wholesale Corporation", "market_cap": 449.75},
  {"symbol": "XOM", "name": "Exxon Mobil Corporation", "market_cap": 449.30},
  {"symbol": "PG", "name": "The Procter & Gamble Company", "market_cap": 384.55},
  {"symbol": "JNJ", "name": "Johnson & Johnson", "market_cap": 373.01}
];

const earningsData = [
  {"symbol": "MSFT", "company": "Microsoft Corporation", "earnings_date": "2025-07-15", "market_cap": 3496.12},
  {"symbol": "NVDA", "company": "NVIDIA Corporation", "earnings_date": "2025-07-18", "market_cap": 3457.97},
  {"symbol": "AAPL", "company": "Apple Inc.", "earnings_date": "2025-07-22", "market_cap": 3045.71},
  {"symbol": "AMZN", "company": "Amazon.com, Inc.", "earnings_date": "2025-07-25", "market_cap": 2267.33},
  {"symbol": "GOOG", "company": "Alphabet Inc.", "earnings_date": "2025-07-29", "market_cap": 2114.33},
  {"symbol": "META", "company": "Meta Platforms, Inc.", "earnings_date": "2025-08-01", "market_cap": 1754.27},
  {"symbol": "AVGO", "company": "Broadcom Inc.", "earnings_date": "2025-08-05", "market_cap": 1161.05},
  {"symbol": "BRK.B", "company": "Berkshire Hathaway Inc.", "earnings_date": "2025-08-08", "market_cap": 1064.76},
  {"symbol": "TSLA", "company": "Tesla, Inc.", "earnings_date": "2025-10-14", "market_cap": 950.63},
  {"symbol": "WMT", "company": "Walmart Inc.", "earnings_date": "2025-10-17", "market_cap": 777.85},
  {"symbol": "JPM", "company": "JPMorgan Chase & Co.", "earnings_date": "2025-10-21", "market_cap": 738.49},
  {"symbol": "V", "company": "Visa Inc.", "earnings_date": "2025-10-24", "market_cap": 693.11},
  {"symbol": "LLY", "company": "Eli Lilly and Company", "earnings_date": "2025-10-28", "market_cap": 691.15},
  {"symbol": "MA", "company": "Mastercard Incorporated", "earnings_date": "2025-10-31", "market_cap": 535.86},
  {"symbol": "NFLX", "company": "Netflix, Inc.", "earnings_date": "2025-11-04", "market_cap": 528.34},
  {"symbol": "ORCL", "company": "Oracle Corporation", "earnings_date": "2025-11-07", "market_cap": 487.99},
  {"symbol": "COST", "name": "Costco Wholesale Corporation", "earnings_date": "2026-01-20", "market_cap": 449.75},
  {"symbol": "XOM", "company": "Exxon Mobil Corporation", "earnings_date": "2026-01-23", "market_cap": 449.30},
  {"symbol": "PG", "company": "The Procter & Gamble Company", "earnings_date": "2026-01-27", "market_cap": 384.55},
  {"symbol": "JNJ", "company": "Johnson & Johnson", "earnings_date": "2026-01-30", "market_cap": 373.01}
];

// Application State
let savedStrategies = [];
let currentCalculation = null;
let currentFilter = 'all';
let currentSort = { field: 'earnings_date', direction: 'asc' };

// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn, .sidebar-btn');
const sections = document.querySelectorAll('.content-section');
const straddleForm = document.getElementById('straddle-form');
const saveStrategyBtn = document.getElementById('save-strategy');
const stockSymbolSelect = document.getElementById('stock-symbol');
const strategiesTableBody = document.getElementById('strategies-tbody');
const calendarTableBody = document.getElementById('calendar-tbody');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInputs = document.querySelectorAll('.search-input');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    populateStockSymbols();
    renderEarningsCalendar();
    updateDashboardStats();
    setupEventListeners();
    
    // Initialize save strategy button as disabled
    if (saveStrategyBtn) {
        saveStrategyBtn.disabled = true;
    }
    
    // Set default earnings date when symbol is selected
    stockSymbolSelect.addEventListener('change', function() {
        const selectedSymbol = this.value;
        if (selectedSymbol) {
            const earning = earningsData.find(e => e.symbol === selectedSymbol);
            if (earning) {
                document.getElementById('earnings-date').value = earning.earnings_date;
            }
        }
    });
});

// Navigation Functions
function initializeNavigation() {
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            if (targetSection) {
                navigateToSection(targetSection);
            }
        });
    });
}

function navigateToSection(sectionId) {
    // Update active navigation button
    navButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll(`[data-section="${sectionId}"]`).forEach(btn => {
        btn.classList.add('active');
    });

    // Show target section
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Populate Stock Symbols - Sort alphabetically
function populateStockSymbols() {
    stockSymbolSelect.innerHTML = '<option value="">Select a company...</option>';
    
    // Sort companies alphabetically by symbol
    const sortedCompanies = [...companiesData].sort((a, b) => a.symbol.localeCompare(b.symbol));
    
    sortedCompanies.forEach(company => {
        const option = document.createElement('option');
        option.value = company.symbol;
        option.textContent = `${company.symbol} - ${company.name}`;
        stockSymbolSelect.appendChild(option);
    });
}

// Straddle Calculation Functions
function calculateStraddle(strikePrice, callPremium, putPremium) {
    const totalPremium = parseFloat(callPremium) + parseFloat(putPremium);
    const strike = parseFloat(strikePrice);
    
    return {
        maxLoss: totalPremium,
        maxGain: 'Unlimited',
        upperBreakeven: strike + totalPremium,
        lowerBreakeven: strike - totalPremium,
        totalPremium: totalPremium
    };
}

function displayCalculationResults(results) {
    document.getElementById('max-loss').textContent = `$${results.maxLoss.toFixed(2)}`;
    document.getElementById('max-gain').textContent = results.maxGain;
    document.getElementById('upper-breakeven').textContent = `$${results.upperBreakeven.toFixed(2)}`;
    document.getElementById('lower-breakeven').textContent = `$${results.lowerBreakeven.toFixed(2)}`;
    
    currentCalculation = results;
    
    // Enable save strategy button
    if (saveStrategyBtn) {
        saveStrategyBtn.disabled = false;
    }
}

// Strategy Management Functions
function saveStrategy() {
    if (!currentCalculation) {
        alert('Please calculate a strategy first');
        return;
    }

    const formData = new FormData(straddleForm);
    const company = companiesData.find(c => c.symbol === formData.get('stock-symbol'));
    
    const strategy = {
        id: Date.now(),
        symbol: formData.get('stock-symbol'),
        companyName: company ? company.name : '',
        earningsDate: formData.get('earnings-date'),
        strikePrice: parseFloat(formData.get('strike-price')),
        callPremium: parseFloat(formData.get('call-premium')),
        putPremium: parseFloat(formData.get('put-premium')),
        notes: formData.get('notes') || '',
        ...currentCalculation,
        createdAt: new Date().toISOString(),
        status: getStrategyStatus(formData.get('earnings-date'))
    };

    savedStrategies.push(strategy);
    renderStrategiesTable();
    updateDashboardStats();
    addActivityItem(`Saved strategy for ${strategy.symbol}`, `Strike: $${strategy.strikePrice}, Max Loss: $${strategy.maxLoss.toFixed(2)}`);
    
    alert('Strategy saved successfully!');
    
    // Reset form and disable save button
    straddleForm.reset();
    currentCalculation = null;
    saveStrategyBtn.disabled = true;
    
    // Clear calculation results
    document.getElementById('max-loss').textContent = '-';
    document.getElementById('max-gain').textContent = 'Unlimited';
    document.getElementById('upper-breakeven').textContent = '-';
    document.getElementById('lower-breakeven').textContent = '-';
}

function getStrategyStatus(earningsDate) {
    const today = new Date();
    const earnings = new Date(earningsDate);
    return earnings >= today ? 'active' : 'expired';
}

function deleteStrategy(id) {
    if (confirm('Are you sure you want to delete this strategy?')) {
        savedStrategies = savedStrategies.filter(s => s.id !== id);
        renderStrategiesTable();
        updateDashboardStats();
        addActivityItem('Deleted strategy', 'Strategy removed from portfolio');
    }
}

function editStrategy(id) {
    const strategy = savedStrategies.find(s => s.id === id);
    if (!strategy) return;

    // Navigate to calculator and populate form
    navigateToSection('calculator');
    document.getElementById('stock-symbol').value = strategy.symbol;
    document.getElementById('earnings-date').value = strategy.earningsDate;
    document.getElementById('strike-price').value = strategy.strikePrice;
    document.getElementById('call-premium').value = strategy.callPremium;
    document.getElementById('put-premium').value = strategy.putPremium;
    document.getElementById('notes').value = strategy.notes;

    // Calculate and display results
    const results = calculateStraddle(strategy.strikePrice, strategy.callPremium, strategy.putPremium);
    displayCalculationResults(results);

    // Remove the old strategy
    savedStrategies = savedStrategies.filter(s => s.id !== id);
    renderStrategiesTable();
}

function renderStrategiesTable() {
    if (savedStrategies.length === 0) {
        strategiesTableBody.innerHTML = '<tr class="empty-state"><td colspan="8">No saved strategies yet. Use the calculator to create your first strategy.</td></tr>';
        return;
    }

    strategiesTableBody.innerHTML = savedStrategies.map(strategy => `
        <tr>
            <td><span class="company-symbol">${strategy.symbol}</span></td>
            <td><span class="earnings-date">${new Date(strategy.earningsDate).toLocaleDateString()}</span></td>
            <td>$${strategy.strikePrice.toFixed(2)}</td>
            <td>$${strategy.totalPremium.toFixed(2)}</td>
            <td>$${strategy.maxLoss.toFixed(2)}</td>
            <td>$${strategy.lowerBreakeven.toFixed(2)} - $${strategy.upperBreakeven.toFixed(2)}</td>
            <td><span class="status-badge status-${strategy.status}">${strategy.status}</span></td>
            <td>
                <div class="strategy-actions">
                    <button class="btn btn--outline btn-small" onclick="editStrategy(${strategy.id})">Edit</button>
                    <button class="btn btn--outline btn-small" onclick="deleteStrategy(${strategy.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Earnings Calendar Functions
function renderEarningsCalendar() {
    let filteredData = [...earningsData];

    // Apply date filter
    if (currentFilter !== 'all') {
        filteredData = filterByDateRange(filteredData, currentFilter);
    }

    // Apply search filter
    const searchElement = document.getElementById('calendar-search');
    const searchTerm = searchElement ? searchElement.value.toLowerCase() : '';
    if (searchTerm) {
        filteredData = filteredData.filter(item => 
            item.symbol.toLowerCase().includes(searchTerm) ||
            item.company.toLowerCase().includes(searchTerm)
        );
    }

    // Apply sorting
    filteredData.sort((a, b) => {
        let aVal = a[currentSort.field];
        let bVal = b[currentSort.field];

        if (currentSort.field === 'earnings_date') {
            aVal = new Date(aVal);
            bVal = new Date(bVal);
        } else if (currentSort.field === 'market_cap') {
            aVal = parseFloat(aVal);
            bVal = parseFloat(bVal);
        }

        if (currentSort.direction === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });

    calendarTableBody.innerHTML = filteredData.map(item => `
        <tr>
            <td><span class="company-symbol">${item.symbol}</span></td>
            <td>${item.company}</td>
            <td><span class="earnings-date">${new Date(item.earnings_date).toLocaleDateString()}</span></td>
            <td><span class="market-cap">$${item.market_cap.toFixed(2)}B</span></td>
            <td>
                <button class="use-strategy-btn" onclick="useForStrategy('${item.symbol}', '${item.earnings_date}')">
                    Use for Strategy
                </button>
            </td>
        </tr>
    `).join('');
}

function filterByDateRange(data, range) {
    const today = new Date();
    const oneWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const oneMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    const oneQuarter = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);

    return data.filter(item => {
        const earningsDate = new Date(item.earnings_date);
        switch (range) {
            case 'next-week':
                return earningsDate >= today && earningsDate <= oneWeek;
            case 'next-month':
                return earningsDate >= today && earningsDate <= oneMonth;
            case 'next-quarter':
                return earningsDate >= today && earningsDate <= oneQuarter;
            default:
                return true;
        }
    });
}

function useForStrategy(symbol, earningsDate) {
    navigateToSection('calculator');
    document.getElementById('stock-symbol').value = symbol;
    document.getElementById('earnings-date').value = earningsDate;
    addActivityItem(`Selected ${symbol} for strategy`, `Earnings date: ${new Date(earningsDate).toLocaleDateString()}`);
}

// Dashboard Functions
function updateDashboardStats() {
    const totalStrategies = savedStrategies.length;
    const activeStrategies = savedStrategies.filter(s => s.status === 'active').length;
    const totalPremium = savedStrategies.reduce((sum, s) => sum + s.totalPremium, 0);

    document.getElementById('total-strategies').textContent = totalStrategies;
    document.getElementById('active-strategies').textContent = activeStrategies;
    document.getElementById('total-premium').textContent = `$${totalPremium.toFixed(2)}`;
    document.getElementById('upcoming-earnings').textContent = earningsData.length;
}

function addActivityItem(title, description) {
    const activityList = document.getElementById('activity-list');
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.innerHTML = `
        <span class="activity-time">${title}</span>
        <span class="activity-desc">${description}</span>
    `;
    
    activityList.insertBefore(activityItem, activityList.firstChild);
    
    // Keep only last 5 activities
    while (activityList.children.length > 5) {
        activityList.removeChild(activityList.lastChild);
    }
}

// Event Listeners Setup
function setupEventListeners() {
    // Straddle form submission
    straddleForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const strikePrice = formData.get('strike-price');
        const callPremium = formData.get('call-premium');
        const putPremium = formData.get('put-premium');

        if (!strikePrice || !callPremium || !putPremium) {
            alert('Please fill in all required fields');
            return;
        }

        const results = calculateStraddle(strikePrice, callPremium, putPremium);
        displayCalculationResults(results);
        addActivityItem('Calculated straddle strategy', `Strike: $${strikePrice}, Total Premium: $${results.totalPremium.toFixed(2)}`);
    });

    // Save strategy button
    saveStrategyBtn.addEventListener('click', saveStrategy);

    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = this.getAttribute('data-filter');
            renderEarningsCalendar();
        });
    });

    // Search functionality
    const calendarSearch = document.getElementById('calendar-search');
    if (calendarSearch) {
        calendarSearch.addEventListener('input', function() {
            renderEarningsCalendar();
        });
    }

    const strategiesSearch = document.getElementById('strategies-search');
    if (strategiesSearch) {
        strategiesSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filteredStrategies = savedStrategies.filter(strategy =>
                strategy.symbol.toLowerCase().includes(searchTerm) ||
                strategy.companyName.toLowerCase().includes(searchTerm)
            );
            
            // Temporarily replace strategies for rendering
            const originalStrategies = [...savedStrategies];
            savedStrategies = filteredStrategies;
            renderStrategiesTable();
            savedStrategies = originalStrategies;
        });
    }

    // Table sorting
    document.querySelectorAll('.sortable').forEach(header => {
        header.addEventListener('click', function() {
            const field = this.getAttribute('data-sort');
            
            if (currentSort.field === field) {
                currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
            } else {
                currentSort.field = field;
                currentSort.direction = 'asc';
            }

            // Update header classes
            document.querySelectorAll('.sortable').forEach(h => {
                h.classList.remove('sort-asc', 'sort-desc');
            });
            this.classList.add(`sort-${currentSort.direction}`);

            renderEarningsCalendar();
        });
    });

    // Export functionality
    const exportBtn = document.getElementById('export-strategies');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            if (savedStrategies.length === 0) {
                alert('No strategies to export');
                return;
            }

            const csvContent = convertToCSV(savedStrategies);
            downloadCSV(csvContent, 'straddle_strategies.csv');
            addActivityItem('Exported strategies', `Exported ${savedStrategies.length} strategies to CSV`);
        });
    }
}

// Utility Functions
function convertToCSV(data) {
    const headers = ['Symbol', 'Company', 'Earnings Date', 'Strike Price', 'Call Premium', 'Put Premium', 'Total Premium', 'Max Loss', 'Upper Breakeven', 'Lower Breakeven', 'Status', 'Notes'];
    const csvRows = [headers.join(',')];

    data.forEach(strategy => {
        const row = [
            strategy.symbol,
            `"${strategy.companyName}"`,
            strategy.earningsDate,
            strategy.strikePrice,
            strategy.callPremium,
            strategy.putPremium,
            strategy.totalPremium,
            strategy.maxLoss,
            strategy.upperBreakeven,
            strategy.lowerBreakeven,
            strategy.status,
            `"${strategy.notes}"`
        ];
        csvRows.push(row.join(','));
    });

    return csvRows.join('\n');
}

function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Make functions globally available for onclick handlers
window.useForStrategy = useForStrategy;
window.editStrategy = editStrategy;
window.deleteStrategy = deleteStrategy;