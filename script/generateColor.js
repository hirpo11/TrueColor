const columns = document.querySelectorAll(".column");

let formatColor = "HEX#";

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() === "space") {
    setRandomColor();
  }
});

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;
  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];

    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyToClickboard(event.target.textContent);
  }
});

const copyToClickboard = (text) => {
  return navigator.clipboard.writeText(text.toLowerCase());
};

const setRandomColor = (isInitial) => {
  const colors = isInitial ? getColorsFromHash() : [];
  columns.forEach((column, index) => {
    const isLocked = column.querySelector("i").classList.contains("fa-lock");
    const text = column.querySelector("h2");
    if (isLocked) {
      colors.push(
        rgbToHex(
          column.style.background
            .replace("rgb(", "")
            .replace(")", "")
            .split(", ")
        )
      );
      text.textContent = convertColorFormat(colors[index]);
      return;
    }

    const button = column.querySelector("i");

    color = isInitial
      ? colors[index]
        ? colors[index]
        : generateRandomColor()
      : generateRandomColor();

    if (!isInitial) colors.push(color);

    text.textContent = color;
    column.style.background = color;

    setColor(text, color);
    setColor(button, color);
    text.textContent = convertColorFormat(color);
  });

  updateColorsHash(colors);
};

const generateRandomColor = () => {
  const hexCodes = "0123456789ABCDEF";
  let color = "";

  for (let i = 0; i < 6; i++)
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];

  return "#" + color;
};

const setColor = (element, color) => {
  const luminance = chroma(color).luminance();
  element.style.color = luminance > 0.5 ? "black" : "white";
};

const updateColorsHash = (colors = []) => {
  document.location.hash = colors
    .map((col) => {
      return col.substring(1);
    })
    .join("-");
};

const getColorsFromHash = () => {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
};

const openMenu = () => {
  document.querySelector(".header__select-format").classList.toggle("show");
};

const selectFormat = (event, element) => {
  select = element.textContent.trim();

  selectColorButtonText = document
    .querySelector(".header__button-select-color")
    .querySelector("span");

  downArrow = `<i class="fa-sharp fa-solid fa-sort-down"></i>`;

  if (select === "HEX (#AA1234)") {
    selectColorButtonText.innerHTML = `HEX (#AA1234)` + downArrow;

    formatColor = "HEX#";
    document.querySelector(".header__select-format").classList.toggle("show");
    console.log(document.querySelector(".header__select-format"));
    setRandomColor(true);
  }

  if (select === "HEX (AA1234)") {
    selectColorButtonText.innerHTML = `HEX (AA1234)` + downArrow;
    formatColor = "HEX";
    document.querySelector(".header__select-format").classList.remove("show");
    setRandomColor(true);
  }

  if (select === "RGB - (1, 2, 3)") {
    selectColorButtonText.innerHTML = `RGB - (1, 2, 3)` + downArrow;
    formatColor = "RGB";
    document.querySelector(".header__select-format").classList.remove("show");
    setRandomColor(true);
  }

  if (select === "RGBA - (1, 2, 3, 0.4)") {
    selectColorButtonText.innerHTML = `RGBA - (1, 2, 3, 0.4)` + downArrow;
    formatColor = "RGBA";
    document.querySelector(".header__select-format").classList.remove("show");
    setRandomColor(true);
  }
};

const convertColorFormat = (color) => {
  let colorFormat = "";
  if (formatColor === "HEX#") colorFormat = color;

  if (formatColor === "HEX") colorFormat = color.replace("#", "");

  if (formatColor === "RGB")
    colorFormat = hexToRgb(color.replace("#", "").match(/.{1,2}/g));

  if (formatColor === "RGBA")
    colorFormat = hexToRgba(color.replace("#", "").match(/.{1,2}/g));

  return colorFormat;
};

const rgbToHex = (rgb) => {
  return (
    "#" +
    componentToHex(parseInt(rgb[0])) +
    componentToHex(parseInt(rgb[1])) +
    componentToHex(parseInt(rgb[2]))
  );
};

const hexToRgb = (hex) => {
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

const componentToHex = (c) => {
  let hex = c.toString(16);
  return hex.length == 1 ? ("0" + hex).toUpperCase() : hex.toUpperCase();
};

setRandomColor(true);
