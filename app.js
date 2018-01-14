const refreshBtn = document.querySelector('.refresh');
const twitterBtn = document.querySelector('.twitter');
let currentColor;

async function handleQuoteRefresh() {
  const data = await getData();
  const {quote, author} = {quote: data.quote, author: data.author};
  renderHTML(quote, author);
};

async function getData() {
  const url = 'http://quotes.stormconsultancy.co.uk/random.json'
  const response = await fetch(url, {});
  const data = await response.json();
  return data;
}

function renderHTML(quote, author) {
  const tweet = `"${quote}" - ${author}`;

  if (isTooLong(tweet)) {
    return handleQuoteRefresh();
  }

  renderNewColor();
  renderQuoteHTML(quote);
  renderAuthorHTML(author);
  setTweetUrl(tweet)
}

function renderNewColor() {
  let newColor = getNewColor();

  if (currentColor === newColor) {
    return renderNewColor();
  }

  document.documentElement.style.setProperty('--primary-color', newColor);
  currentColor = newColor;
}

function getNewColor() {
  const colors = {
    'Nephritis': '#27ae60',
    'Belize Hole': '#2980b9',
    'Wisteria': '#8e44ad',
    'Carrot': '#e67e22',
    'Alizarian': '#e74c3c',
    'Pomegranate': '#c0392b',
    'Pumpkin': '#d35400'
  }
  const min = 0;
  const max = Object.keys(colors).length - 1;
  const randomNum = Math.floor(Math.random() * (max - min) + min)
  let newColor = colors[Object.keys(colors)[randomNum]];
  return newColor;
}

function renderQuoteHTML(quote) {
  const quoteEl = document.querySelector('.quote-text');
  quoteEl.textContent = `"${quote}"`;
  renderQuoteAnimation(quoteEl);
}

function renderQuoteAnimation(quoteEl) {
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

function isTooLong(tweet) {
  return tweet.length > 200;
}

function setTweetUrl(tweet) {
  const tweetElement = document.querySelector('.twitter-link');
  tweetElement.href = `https://twitter.com/intent/tweet?text=${tweet}`;
}

refreshBtn.addEventListener('click', handleQuoteRefresh);

handleQuoteRefresh();
