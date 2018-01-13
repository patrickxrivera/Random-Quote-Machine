const request = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';

fetch(request)
  .then(response => response.json())
  .then(data => console.log(data));
