const requestURL = "http://localhost:5000/api/posts/";
const grid = document.querySelector(".grid-colors");
let formatColor = "HEX#";
let colors = 0;

const sendRequest = (method, url, body = null) => {
  return fetch(url).then((response) => {
    return response.json();
  });
};

const setColor = (element, color) => {
  const luminance = chroma(color).luminance();
  element.style.color = luminance > 0.5 ? "black" : "white";
};

const openMenu = () => {
  document.querySelector(".header__select-format").classList.toggle("show");
};

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;
  if (type === "copy") {
    copyToClickboard(event.target.textContent);
  }
});

const copyToClickboard = (text) => {
  return navigator.clipboard.writeText(text.toLowerCase());
};
document.querySelector(".footer__container").innerHTML =
  "Palette #" + localStorage.getItem("Number");

document.onclick = (event) => {
  select = event.target.textContent.trim();
  selectColorButtonText = document
    .querySelector(".header__button-select-color")
    .querySelector("span");

  downArrow = `<i class="fa-sharp fa-solid fa-sort-down"></i>`;

  if (select === "HEX (#AA1234)") {
    selectColorButtonText.innerHTML = `Copy Format: HEX (#AA1234)` + downArrow;
    formatColor = "HEX#";
    document.querySelector(".header__select-format").classList.remove("show");
    setFormatText();
  }

  if (select === "HEX (AA1234)") {
    selectColorButtonText.innerHTML = `Copy Format: HEX (AA1234)` + downArrow;
    formatColor = "HEX";
    document.querySelector(".header__select-format").classList.remove("show");
    setFormatText();
  }

  if (select === "RGB - (1, 2, 3)") {
    selectColorButtonText.innerHTML =
      `Copy Format: RGB - (1, 2, 3)` + downArrow;
    formatColor = "RGB";
    document.querySelector(".header__select-format").classList.remove("show");
    setFormatText();
  }

  if (select === "RGBA - (1, 2, 3, 0.4)") {
    selectColorButtonText.innerHTML =
      `Copy Format: RGBA - (1, 2, 3, 0.4)` + downArrow;
    formatColor = "RGBA";
    document.querySelector(".header__select-format").classList.remove("show");
    setFormatText();
  }
};

const setFormatText = () => {
  grid.innerHTML = "";
  sendRequest("GET", requestURL)
    .then((data) => {
      data.map((card) => {
        if (card.number == localStorage.getItem("Number")) {
          card.color.map((el) => {
            const c = document.createElement("div");
            c.classList = "grid-colors__item";
            c.innerHTML += `
          <div class="item">
          </div>`;

            let itemText = document.createElement("div");
            itemText.classList = "item__text";
            itemText.setAttribute("data-type", "copy");
            setColor(itemText, el);
            console.log(formatColor);
            if (formatColor === "HEX#") {
              itemText.innerHTML += `${el.toUpperCase()}`;
            }
            if (formatColor === "HEX") {
              itemText.innerHTML += `${el.toUpperCase().replace("#", "")}`;
            }
            if (formatColor === "RGB") {
              itemText.innerHTML += `${hexToRgb(
                el
                  .toUpperCase()
                  .replace("#", "")
                  .match(/.{1,2}/g)
              )}`;
            }
            if (formatColor === "RGBA") {
              itemText.innerHTML += `${hexToRgb(
                el
                  .toUpperCase()
                  .replace("#", "")
                  .match(/.{1,2}/g)
              )}`;
            }

            c.style.background = el;
            c.querySelector(".item").appendChild(itemText);
            grid.appendChild(c);
          });
        }
      });
    })
    .catch((err) => console.log(err));
};

const hexToRgb = (hex) => {
  console.log(hex);
  return (
    "RGB(" +
    parseInt(hex[0], 16) +
    ", " +
    parseInt(hex[1], 16) +
    ", " +
    parseInt(hex[2], 16) +
    ")"
  );
};

const hexToRgba = (hex) => {
  return (
    "RGBA(" +
    parseInt(hex[0], 16) +
    ", " +
    parseInt(hex[1], 16) +
    ", " +
    parseInt(hex[2], 16) +
    ", 1.0)"
  );
};


setFormatText();