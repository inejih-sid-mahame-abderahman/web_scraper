// Load quotes when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadAllQuotes();
    loadTags();
});

// Load all quotes
async function loadAllQuotes() {
    const container = document.getElementById('quoteContainer');
    container.innerHTML = '<div class="loading">Loading magical quotes</div>';
    
    try {
        const response = await fetch('/api/quotes');
        const quotes = await response.json();
        displayQuotes(quotes);
    } catch (error) {
        container.innerHTML = '<div class="error">✨ Oops! Something went wrong ✨</div>';
    }
}

// Load random quote
async function loadRandomQuote() {
    const container = document.getElementById('quoteContainer');
    container.innerHTML = '<div class="loading">Finding wisdom...</div>';
    
    try {
        const response = await fetch('/api/quotes/random');
        const quote = await response.json();
        displayQuotes([quote]);
    } catch (error) {
        container.innerHTML = '<div class="error">✨ Failed to get random quote ✨</div>';
    }
}

// Filter by tag
async function filterByTag() {
    const tag = document.getElementById('tagSelect').value;
    if (!tag) {
        loadAllQuotes();
        return;
    }
    
    const container = document.getElementById('quoteContainer');
    container.innerHTML = `<div class="loading">Finding ${tag} quotes...</div>`;
    
    try {
        const response = await fetch(`/api/quotes/tag/${tag}`);
        const quotes = await response.json();
        displayQuotes(quotes);
    } catch (error) {
        container.innerHTML = '<div class="error">✨ Failed to filter quotes ✨</div>';
    }
}

// Load all available tags for dropdown
async function loadTags() {
    try {
        const response = await fetch('/api/quotes');
        const quotes = await response.json();
        
        // Extract unique tags
        const allTags = new Set();
        quotes.forEach(quote => {
            quote.tags.forEach(tag => allTags.add(tag));
        });
        
        // Populate select dropdown
        const select = document.getElementById('tagSelect');
        const sortedTags = Array.from(allTags).sort();
        
        sortedTags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Failed to load tags:', error);
    }
}

// Display quotes with beautiful cards
function displayQuotes(quotes) {
    const container = document.getElementById('quoteContainer');
    
    if (!quotes || quotes.length === 0) {
        container.innerHTML = '<div class="loading">✨ No quotes found ✨</div>';
        return;
    }
    
    let html = '';
    
    quotes.forEach(quote => {
        const tagsHtml = quote.tags.map(tag => 
            `<span class="tag" onclick="filterByTagName('${tag}')">${tag}</span>`
        ).join('');
        
        html += `
            <div class="quote-card">
                <div class="quote-text">${quote.text}</div>
                <div class="quote-author">${quote.author}</div>
                <div class="quote-tags">
                    ${tagsHtml}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Helper function to filter by clicking on tags
function filterByTagName(tag) {
    document.getElementById('tagSelect').value = tag;
    filterByTag();
}

// Add some interactive sparkle effect
document.addEventListener('mousemove', (e) => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = e.pageX + 'px';
    sparkle.style.top = e.pageY + 'px';
    sparkle.style.position = 'absolute';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.width = '5px';
    sparkle.style.height = '5px';
    sparkle.style.background = 'white';
    sparkle.style.borderRadius = '50%';
    sparkle.style.boxShadow = '0 0 10px white';
    sparkle.style.animation = 'sparkleFade 1s ease-out';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
});

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFade {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(0); opacity: 0; }
    }
`;
document.head.appendChild(style);