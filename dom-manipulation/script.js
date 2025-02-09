let newQuotButton = document.querySelector('#newQuote');
let categoryFilter = document.querySelector("#categoryFilter");
let addQuoteButton = document.querySelector("#addQuoteButton");
let exportButton = document.querySelector("#export-button");
let importFile = document.querySelector("#importFile");
let onHand = document.querySelector(".onHand");
let newQuoteText = document.querySelector("#newQuoteText");

let quotes = [];

// Fetch quotes from JSONPlaceholder
async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        const data = await response.json();
        quotes = data.map(post => ({ text: post.title, category: "General" }));
        localStorage.setItem("quotes", JSON.stringify(quotes));
        populateCategories();
        filterQuotes();
    } catch (error) {
        console.error("Error fetching quotes:", error);
    }
}

// Sync quotes from local storage to mock API
async function syncQuotes() {
    try {
        for (const quote of quotes) {
            await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({ title: quote.text, body: quote.category, userId: 1 }),
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            });
        }
        console.log("Quotes synced with server!");
    } catch (error) {
        console.error("Error syncing quotes:", error);
    }
}

// Show a random quote
function showRandomQuote() {
    if (quotes.length === 0) return;
    const random = Math.floor(Math.random() * quotes.length);
    let quote = quotes[random];
    let quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `<p>"${quote.text}" <br><strong>Category:</strong> ${quote.category}</p>`;
}

newQuotButton.addEventListener('click', showRandomQuote);

// Populate category dropdown
function populateCategories() {
    let categories = ["All Categories", ...new Set(quotes.map(q => q.category))];
    categoryFilter.innerHTML = categories
        .map(category => `<option value="${category}">${category}</option>`)
        .join("");
}

// Filter quotes by category
function filterQuotes() {
    let selectedCategory = categoryFilter.value;
    onHand.innerHTML = "";
    let filteredQuotes = selectedCategory === "All Categories" ? quotes : quotes.filter(quote => quote.category === selectedCategory);
    filteredQuotes.forEach(quote => {
        onHand.innerHTML += `<p>${quote.text} <br><strong>Category:</strong> ${quote.category}</p>`;
    });
}

// Add new quote and post to mock API
async function addQuote() {
    let newQuoteTextValue = newQuoteText.value;
    let newQuoteCategory = document.getElementById("newQuoteCategory").value;

    if (newQuoteTextValue && newQuoteCategory) {
        const newQuote = { text: newQuoteTextValue, category: newQuoteCategory };
        quotes.push(newQuote);
        localStorage.setItem("quotes", JSON.stringify(quotes));
        populateCategories();
        filterQuotes();

        // Simulate API POST request
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({ title: newQuoteTextValue, body: newQuoteCategory, userId: 1 }),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            });
            const data = await response.json();
            console.log("Posted new quote:", data);
        } catch (error) {
            console.error("Error posting quote:", error);
        }

        newQuoteText.value = "";
        document.getElementById("newQuoteCategory").value = "";
        alert("New quote added successfully!");
    } else {
        alert("Please fill in both fields to add a new quote.");
    }
}

// Export quotes as JSON file
function exportQuotes() {
    let jsonData = JSON.stringify(quotes, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

exportButton.addEventListener("click", exportQuotes);

// Periodic fetching every 10 seconds
setInterval(fetchQuotesFromServer, 10000);

// Periodic syncing every 30 seconds
setInterval(syncQuotes, 30000);

document.addEventListener("DOMContentLoaded", () => {
    fetchQuotesFromServer();
});

addQuoteButton.addEventListener("click", addQuote);
categoryFilter.addEventListener("change", filterQuotes);
