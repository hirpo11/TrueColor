const requestURL = "http://localhost:5000/api/posts/";
grid = document.querySelector(".main__grid");

const sendRequest = (method, url, body = null) => {
  return fetch(url).then((response) => {
    return response.json();
  });
};
 
sendRequest("GET", requestURL)
  .then((data) => {
    data.map((card, index) => {
      let cardInHtml = document.createElement("div");
      cardInHtml.classList = "main__color-card";
      cardInHtml.setAttribute("index", `${index}`);
      cardInHtml.innerHTML += `<a class="color-card" onclick="openPalette(${index})">
      <div class="color-card__container">
        <div class="color-card__grid">
        </div>
        <div class="color-card__text">
          <div class="color-card__title">
          Palette #${index + 1}
          </div>
          <img
            src="../image/heart-regular.svg"
            alt=""
            class="color-card-img"
          />
        </div>
      </div>
    </a>`;

      cardGrid = cardInHtml.querySelector(".color-card__grid");
      card.color.map((c) => {
        let colorInHtml = document.createElement("div");
        colorInHtml.classList = "color-card__color";
        colorInHtml.style.background = c;
        cardGrid.appendChild(colorInHtml);
      });
      grid.appendChild(cardInHtml);
    });
  })
  .catch((err) => console.log(err));

const openPalette = (index) => {
  window.location.href = "colorSet.html";
  localStorage.setItem("Number", index + 1);
};


