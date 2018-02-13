const btnXhr = document.getElementById('submit-btn');
const btnFetch = document.getElementById('btn-fetch');
const searchFile = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchForText;


function getNews() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.onreadystatechange = function() {
    if (articleRequest.readyState === 4 && articleRequest.status === 200) {
      const data = JSON.parse(this.responseText);
      const response = data.response.docs;
      articleRequest.onload = addNews(response); // función de ejecución
      articleRequest.onerror = handleError; // funcion de error
    }
  };
  articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForText}&api-key=bce617f873ee4fd8a55646fdab233c69`);
  articleRequest.send();
}

function addNews(array) {
  if (array.length > 0) {
    array.forEach(function(element, index) {
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
    });
  } else {
    alert('No hay noticias sobre este tema');
    searchFile.value = '';
  }
}

function handleError(error) {
  console.log(error);
}

// Eventos
btnXhr.addEventListener('click', function(event) {
  event.preventDefault();
  responseContainer.innerHTML = '';
  searchForText = searchFile.value;
  getNews();
});


btnFetch.addEventListener('click', function() {
  event.preventDefault();
  searchForText = searchFile.value;
  let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForText}&api-key=bce617f873ee4fd8a55646fdab233c69`;
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      const response = data.response.docs;
      addNews(response);
    })
    .catch(function(error) {
      console.log(error);
    });
});
