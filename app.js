const refresh = document.querySelector('.refresh');
const quoteEl = document.querySelector('.quote-text');
const authorEl = document.querySelector('.author-text');

// refresh.addEventListener('click', renderQuote);

(async function renderQuote() {
  const url = 'http://quotes.stormconsultancy.co.uk/random.json'
  const response = await fetch(url, {});
  const data = await response.json();

  let quote = data.quote;
  let author = data.author;
  let tweet = `"${quote}" - ${author}`;
  console.log(tweet.length);
  if (tweet.length > 200) {
    return renderQuote();
  };
  quoteEl.textContent = `"${quote}"`;
  authorEl.textContent = `- ${author}`;
}());

/* show quote when clicking refresh button */
// target refresh button
// add click listener
// render quote
  // remove previous quote
  // get new quote
  // render new html
  // add animation
