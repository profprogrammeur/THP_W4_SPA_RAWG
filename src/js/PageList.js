const showMore = document.getElementById('show-more')
const pageContent = document.getElementById('pageContent')
const choosePlatform = document.getElementById('platform')
const showmoreDOM = document.querySelector("#show-more");

const apikey = process.env.API_KEY
let page = 1

const PageList = (argument = '') => {
  // const render = () => {
  const preparePage = () => {
    const cleanedArgument = argument.replace(/\s+/g, "-");
  const displayResults = (articles) => {
    const resultsContent = articles.map((article) => (
      `<article class="cardGame">
              <div class="game--details" id="${article.id}">
              <a href="#pagedetail/${article.id}">
                <img class="game--image" src="${article.background_image}" >
                <div class="game--moredetails">
                  <p>${article.released}</p>
                  <p>${article.rating}/5 - ${article.ratings_count} votes</p>

                </div>
              </a>
              </div>
              <a href="#pagedetail/${article.id}"><h2 class="game--title">${article.name}</h2></a>
              <div class="game-platforms"></div>
        </article>`
    ));
    const resultsContainer = document.querySelector(".page-list .articles");
    resultsContainer.innerHTML += resultsContent.join("\n");
    // articles.forEach((e) => {
    //   let gameId = document.getElementById(e.id)
    //   GamePlatforms(e, gameId.nextElementSibling.nextElementSibling)
    // })
  };

  const fetchList = (url, argument, pagenumber) => {
    const finalURL = argument ? `${url}&search=${argument}&page=${pagenumber}` : `${url}&page=${pagenumber}&dates=2021-06-01,2022-12-01&ordering=-added`;
    fetch(finalURL)
      .then((response) => response.json())
      .then((responseData) => {
        displayResults(responseData.results)
      });
  };
      fetchList(`https://api.rawg.io/api/games?key=${apikey}&page_size=9`, cleanedArgument,page);
      console.log(cleanedArgument)
    };


    const render = () => {
      pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles"></div>
      </section>
    `;

    preparePage();
  };

  render();
};

////////////// SEARCH MODULE /////////////////

let submitButton = document.getElementById("search-button")
let searchContent = document.getElementById("site-search")

submitButton.addEventListener('click', () => {
  searchContent.value == "" ? null : changeUrl(searchContent.value)
});
searchContent.addEventListener('keypress', e => e.key === 'Enter' ? changeUrl(searchContent.value) : null)


function changeUrl(value) {
  var queryParams = "#pagelist/"
  let newUrl = queryParams.concat(value + "&ordering=-added");
  window.location.href = newUrl
}

export {PageList} ;
