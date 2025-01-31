document.addEventListener('DOMContentLoaded', ()=>{
    const newQuotButton = document.querySelector('#newQuote');
    const quoteDisplay = document.querySelector('#quoteDisplay');
    const child = document.getElementsByClassName('child');
    const quotes = [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
        { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Inspiration" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
      ];
    newQuotButton.addEventListener('click', function displayRandomQuotes(){
       
      
        const random = Math.floor(Math.random()*quotes.length);
        let quote = quotes[random];
        const p = document.createElement('p');
        p.classList.add('child')
        p.innerHTML = `"${quote.text}" <br><strong>Category:</strong> ${quote.category}`;
        quoteDisplay.appendChild(p)
        // setTimeout(()=>{
        //     p.style.display = "none"
        // },500)
    });
    let addQuoteButton = document.querySelector('#addQuoteButton')
    function addQuote() {
        const newQuoteText = document.getElementById('newQuoteText').value;
        const newQuoteCategory = document.getElementById('newQuoteCategory').value;
      
        if (newQuoteText && newQuoteCategory) {
          quotes.push({ text: newQuoteText, category: newQuoteCategory });
          
          
          document.getElementById('newQuoteText').value = '';
          document.getElementById('newQuoteCategory').value = '';
          
          alert('New quote added successfully!');
        } else {
          alert('Please fill in both fields to add a new quote.');
        }
      };
      addQuoteButton.addEventListener('click', addQuote);
   
});