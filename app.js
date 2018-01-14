const refreshBtn = document.querySelector('.refresh');
const twitterBtn = document.querySelector('.twitter');
let currentColor;

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
  renderQuoteHTML(quote);
  renderAuthorHTML(author);
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
  const colors = {
    'Nephritis': '#27ae60',
    'Belize Hole': '#2980b9',
    'Wisteria': '#8e44ad',
    'Carrot': '#e67e22',
    'Alizarian': '#e74c3c',
    'Pomegranate': '#c0392b',
    'Pumpkin': '#d35400'
  }
  const max = Object.keys(colors).length - 1;
  const min = 0;
  const randomNum = Math.floor(Math.random() * (max - min) + min)
  const newColor = colors[Object.keys(colors)[randomNum]];

  if (currentColor === newColor) {
    return setNewColor();
  }

  currentColor = newColor;
  document.documentElement.style.setProperty('--primary-color', newColor)
}

function createTweetUrl(tweet) {
  const tweetElement = document.querySelector('.twitter-link');
  tweetElement.href = `https://twitter.com/intent/tweet?text=${tweet}`;
}

function renderQuoteHTML(quote) {
  const quoteEl = document.querySelector('.quote-text');
  quoteEl.textContent = `"${quote}"`;
  quoteEl.classList.add('quote-fade-in-animation');
  quoteEl.addEventListener('animationend', () => {
    quoteEl.classList.remove('quote-fade-in-animation');
  })
}

function renderAuthorHTML(author) {
  const authorEl = document.querySelector('.author-text');
  authorEl.textContent = `- ${author}`;
  renderAuthorAreaAnimation()
}

function renderAuthorAreaAnimation() {
  const authorArea = document.querySelector('.author-area');
  authorArea.classList.add('author-area-fade-in-animation');
  authorArea.addEventListener('animationend', () => {
    authorArea.classList.remove('author-area-fade-in-animation');
  })
}

refreshBtn.addEventListener('click', handleQuoteRefresh);

handleQuoteRefresh();
