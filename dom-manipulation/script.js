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
  let addQuoteButton = document.querySelector('#addQuoteButton')
  function addQuote() {
    
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    if (newQuoteText && newQuoteCategory) {
      
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
            
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
  newQuotButton.addEventListener('click', showRandomQuote);
});