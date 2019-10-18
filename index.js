if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    await navigator.serviceWorker.register("/sw.js");
  });
}

const API_KEY = "200d811316a34fe68d038e487bc3db78";
async function getNews() {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=bitcoin&from=2019-09-17&sortBy=publishedAt&apiKey=${API_KEY}`
  );
  const results = await response.json();
  renderNews({ news: results.articles });
}

function renderCard({ title, imgLink, date }) {
  /*html*/
  return `
    <div class="card">
      <img src=${imgLink} alt="" class="card-img-top"/>
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text"><small class="text-muted">${date}</small></p>
      </div>
    </div>
  `;
}

function renderNews({ news }) {
  const cols = document.getElementById("cardContainer");
  news.map(article => {
    return (cols.innerHTML += renderCard({
      title: article.title,
      imgLink: article.urlToImage,
      date: new Date(article.publishedAt)
    }));
  });
}

getNews();
