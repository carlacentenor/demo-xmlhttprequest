const form = document.getElementById('search-form');
const searchFile = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchForText;

form.addEventListener('submit', function (e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchForText = searchFile.value;
  getNews();

})

function getNews() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForText}&api-key=bce617f873ee4fd8a55646fdab233c69`);
  //articleRequest.open('GET',`https://newsapi.org/v2/everything?q=${searchForText}&apiKey=1d7878902e204c3584de5f06d2510bc9`);  other api
  articleRequest.onload = addNews; // función de ejecución
  articleRequest.onerror = handleError; // funcion de error
  articleRequest.send();
}

function handleError() {
  console.log('error');
}

function addNews() {
  const data = JSON.parse(this.responseText);
  console.log(data);
  const response = data.response.docs;

  response.forEach(function (element, index) {
    console.log(element);
    if (element.document_type === 'article') {


      const template = `<div class="card  container justify-content-center ma-f">
      <div class="card-body row ">
      <div class = "col-12 col-lg-3">
      <img class="w100" src="https://static01.nyt.com/${element.multimedia[0].url}">
      </div>
      <div class = "col-12 col-lg-9">
      <h3 class="title">${element.headline.main}</h3>
      <p class="card-text">${element.snippet}</p>
      <a  class="card-link" href=${element.web_url}>View more</a>
      </div>
      </div>
      </div>`;
      responseContainer.innerHTML += template;
    }
  })

}