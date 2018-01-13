const colors = {
  'Turqoise': '#1abc9c',
  'Emerald': '#2ecc71',
  'Peter River': '#3498db',
  'Amethyst': '#9b59b6',
  'Green Sea': '#16a085',
  'Nephritis': '#27ae60',
  'Belize Hole': '#2980b9'
}

const refreshBtn = document.querySelector('.refresh');
const twitterBtn = document.querySelector('.twitter');

async function handleQuoteRefresh() {
  const data = await getData();
  const quote = data.quote;
  const author = data.author;
  const tweet = `"${quote}" - ${author}`;

  if (isTooLong(tweet)) {
    return handleQuoteRefresh();
  };

  setNewColor();
  createTweetUrl(tweet);
  renderQuoteHTML(quote)
  renderAuthorHTML(author)
};

async function getData() {
  const url = 'http://quotes.stormconsultancy.co.uk/random.json'
  const response = await fetch(url, {});
  const data = await response.json();
  return data;
}

function isTooLong(tweet) {
  return tweet.length > 200;
}

function setNewColor() {
  const max = Object.keys(colors).length - 1;
  const min = 0;
  const randomNum = Math.floor(Math.random() * (max - min) + min)
  const newColor = colors[Object.keys(colors)[randomNum]];
  document.documentElement.style.setProperty('--primary-color', newColor)
}

function createTweetUrl(tweet) {
  const tweetElement = document.querySelector('.twitter-link');
  tweetElement.href = `https://twitter.com/intent/tweet?text=${tweet}`;
}

function renderQuoteHTML(quote) {
  const quoteEl = document.querySelector('.quote-text');
  quoteEl.textContent = `"${quote}"`;
}

function renderAuthorHTML(author) {
  const authorEl = document.querySelector('.author-text');
  authorEl.textContent = `- ${author}`;
}

refreshBtn.addEventListener('click', handleQuoteRefresh);

handleQuoteRefresh();
