document.addEventListener('DOMContentLoaded', ()=>{
  const newQuotButton = document.querySelector('#newQuote');
  const quoteDisplay = document.querySelector('#quoteDisplay');
  const quotes = [
      { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
      { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Inspiration" },
      { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
    ];
    // localStorage.setItem("quotes", JSON.stringify(quotes));
    
    function showRandomQuote() {   
      const random = Math.floor(Math.random()*quotes.length);
      let quote = quotes[random];
      
      function createAddQuoteForm(){
        const form = document.createElement('form');
        const ul = document.createElement('ul');
        const li = document.createElement('li');
        ul.appendChild(li);
        form.appendChild(ul);
        form.classList.add('quoteContainer')
        li.innerHTML = `"${quote.text}" <br><strong>Category:</strong> ${quote.category}`;
        quoteDisplay.appendChild(form)
        // setTimeout(()=>{
        //     form.style.display = "none"
        // },500)
        }
      createAddQuoteForm()
  }
  newQuotButton.addEventListener('click', showRandomQuote);
  let addQuoteButton = document.querySelector('#addQuoteButton')
  function addQuote() {
    
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    if (newQuoteText && newQuoteCategory) {
      
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      
      localStorage.setItem("quotes", JSON.stringify(quotes));
      
      document.getElementById('newQuoteText').value = '';
      
      document.getElementById('newQuoteCategory').value = '';
      
      alert('New quote added successfully!');
    } 
    else 
    {
      alert('Please fill in both fields to add a new quote.');
    }
  };
  addQuoteButton.addEventListener('click', addQuote);
  function onHand(){
    let text = localStorage.getItem('quotes');
    JSON.stringify(text)
    console.log(text);
    let onHand = document.querySelector('.onHand')
    onHand.innerHTML= `<p>${text.text} <br>category ${text.category}</p>`

  }
  onHand()


  const exportButton = document.querySelector('#export-button');
  exportButton.addEventListener('click',
    function exportQuotes() {
      let jsonData = JSON.stringify(quotes, null, 2);
      const blob = new Blob([jsonData], {type:"application/json"})
      const url = URL.createObjectURL(blob);
      const a = document.querySelector("#a");
      a.href= url;
      a.download="quotes.json";
    }
  );
  function importFromJsonFile(event) {
    const file = event.target.files[0];
    if (!file) return alert("No file selected!");

    const fileReader = new FileReader();

    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);

            if (!Array.isArray(importedQuotes)) {
                throw new Error("Invalid file format. Please upload a valid JSON file.");
            }

            // Ensure quotes array exists
            if (!window.quotes) {
                window.quotes = [];
            }

            // Add new quotes and save
            quotes.push(...importedQuotes);
            localStorage.setItem("quotes", JSON.stringify(quotes));

            alert("Quotes imported successfully!");
        } catch (error) {
            alert("Error importing quotes: " + error.message);
        }
    };

    fileReader.readAsText(file);
}


});