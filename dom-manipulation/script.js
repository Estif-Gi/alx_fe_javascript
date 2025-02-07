// document.addEventListener('DOMContentLoaded',()=>{
//   const newQuotButton = document.querySelector('#newQuote');
//   const quoteDisplay = document.querySelector('#quoteDisplay');
  
//   const quotes = [
//       { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
//       { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Inspiration" },
//       { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
//     ];
//     // localStorage.setItem("quotes", JSON.stringify(quotes));
    
//     function showRandomQuote() {   
//       const random = Math.floor(Math.random()*quotes.length);
//       let quote = quotes[random];
      
//       function createAddQuoteForm(){
//         const form = document.createElement('form');
//         const ul = document.createElement('ul');
//         const li = document.createElement('li');
//         ul.appendChild(li);
//         form.appendChild(ul);
//         form.classList.add('quoteContainer')
//         li.innerHTML = `"${quote.text}" <br><strong>Category:</strong> ${quote.category}`;
//         quoteDisplay.appendChild(form)
//         // setTimeout(()=>{
//         //     form.style.display = "none"
//         // },500)
//         }
//       createAddQuoteForm()
//   }
// let categoryFilter = document.querySelector('#categoryFilter');
//   newQuotButton.addEventListener('click', showRandomQuote);
//   let addQuoteButton = document.querySelector('#addQuoteButton')
  
//   function addQuote() {
//     let newQuoteText = document.getElementById('newQuoteText').value;
//     let newQuoteCategory = document.getElementById('newQuoteCategory').value;

//     if (newQuoteText && newQuoteCategory) {
//         let storedQuotes = localStorage.getItem("quotes");
//         let quotes = storedQuotes ? JSON.parse(storedQuotes) : [];

//         quotes.push({ text: newQuoteText, category: newQuoteCategory });
//         localStorage.setItem("quotes", JSON.stringify(quotes));

//         document.getElementById('newQuoteText').value = '';
//         document.getElementById('newQuoteCategory').value = '';

//         alert('New quote added successfully!');
//         populateCategories(); // Update the dropdown with the new category
//     } else {
//         alert('Please fill in both fields to add a new quote.');
//     }
// }
//   addQuoteButton.addEventListener('click', addQuote);

  
  
  
//   // console.log(options[0].text);
//   const exportButton = document.querySelector('#export-button');
//   exportButton.addEventListener('click',
//     function exportQuotes() {
//       let jsonData = JSON.stringify(quotes, null, 2);
//       const blob = new Blob([jsonData], {type:"application/json"})
//       const url = URL.createObjectURL(blob);
//       const a = document.querySelector("#a");
//       a.href= url;
//       a.download="quotes.json";
//     });
    
    
    
    
//     let importFile = document.querySelector('#importFile');
//   importFile.addEventListener('change',function importFromJsonFile(event) {
//     const file = event.target.files[0];
//     if(!file){return;}
//     const fileReader = new FileReader();
//     fileReader.onload = function(event) {
//       try{
//         const importedQuotes = JSON.parse(event.target.result);
//         quotes.push(...importedQuotes);
//         alert('Quotes imported successfully!');
//       }catch(error){
//         alert('invalid')
//       }
//     };
    
//     fileReader.readAsText(file);
//   })

// })

//   function populateCategories() {
//     let categoryFilter = document.querySelector("#categoryFilter");
//     let categories = ["All Categories", ...new Set(quotes.map(q => q.category))]; // Unique categories

//     categoryFilter.innerHTML = categories
//         .map(category => `<option value="${category}">${category}</option>`)
//         .join("");
//   }

// function filterQuotes() {
//   let quotes = localStorage.getItem('quotes');
//   let jsQuotes = JSON.parse(quotes);
//   let categoryFilter = document.querySelector("#categoryFilter");
//   let selectedText = categoryFilter.value;
//   let onHand = document.querySelector('.onHand');
//   onHand.innerHTML="";
//   let filteredQuotes =
//     selectedText === "All Categories"
//     ? jsQuotes
//     : jsQuotes.filter(quote => quote.category === selectedText);
//     filteredQuotes.forEach(quote => {
//       onHand.innerHTML += `<p>${quote.text} <br><strong>Category:</strong> ${quote.category}</p>`;
      
//     });


let categoryFilter = document.querySelector("#categoryFilter");
let addQuoteButton = document.querySelector("#addQuoteButton");
let exportButton = document.querySelector("#export-button");
let importFile = document.querySelector("#importFile");
let onHand = document.querySelector(".onHand");
let newQuoteText =document.querySelector("#newQuoteText");
// Load quotes from localStorage or initialize an empty array
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "Life is beautiful.", category: "Life" },
    { text: "Never give up.", category: "Motivation" },
    { text: "Success is a journey.", category: "Success" },
    { text: "Happiness is a choice.", category: "Life" },
    { text: "Keep pushing forward.", category: "Motivation" }
];


function populateCategories() {
    let categories = ["All Categories", ...new Set(quotes.map(q => q.category))]; // Unique categories

    categoryFilter.innerHTML = categories
        .map(category =>` <option value="${category}">${category}</option>`)
        .join("");
        
}

// Filter quotes based on selected category
function filterQuotes() {
    let selectedCategory = categoryFilter.value;
    onHand.innerHTML = ""; // Clear previous quotes

    let filteredQuotes =
        selectedCategory === "All Categories"
            ? quotes
            : quotes.filter(quote => quote.category === selectedCategory);

    filteredQuotes.forEach(quote => {
        onHand.innerHTML += `<p>${quote.text} <br><strong>Category:</strong> ${quote.category}</p>`;
        
    });
}


function addQuote() {
    let newQuoteText = document.getElementById("newQuoteText").value;
    let newQuoteCategory = document.getElementById("newQuoteCategory").value;

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        localStorage.setItem("quotes", JSON.stringify(quotes));

        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
        alert("New quote added successfully!");

        populateCategories(); 
    } else {
        alert("Please fill in both fields to add a new quote.");
        newQuoteText.textContent = "";
    }
}

// Export quotes to JSON file
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

// Import quotes from a JSON file
importFile.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            quotes.push(...importedQuotes);
            localStorage.setItem("quotes", JSON.stringify(quotes));
            alert("Quotes imported successfully!");
            populateCategories(); // Refresh categories after import
        } catch (error) {
            alert("Invalid file format");
        }
    };

    fileReader.readAsText(file);
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    populateCategories(); // Populate categories on page load
    filterQuotes(); // Show all quotes initially
});

// Event listeners
addQuoteButton.addEventListener("click", addQuote);
exportButton.addEventListener("click", exportQuotes);
categoryFilter.addEventListener("change", filterQuotes)