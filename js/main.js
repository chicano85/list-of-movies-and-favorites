"use strict";

const listShows = document.querySelector(".js-listShows");

const btnSearch = document.querySelector(".js-buttonSearch");

const inputSearch = document.querySelector(".js-inputSearch");

const resetBtn = document.querySelector(".js-reset");

let shows = [];
let favorites = [];

// Conectar con la API

function getData() {
  const nameShow = inputSearch.value;
  const apiUrl = "https://api.tvmaze.com/search/shows?q=";
  fetch(`${apiUrl} + ${nameShow}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      shows = data;
      paintShows();
      listenShows();
      paintFavorites();
    });
}

btnSearch.addEventListener("click", getData);

getData();

// Pintar las series en el HTML

function paintShows() {
  let showContent = "";
  for (let i = 0; i < shows.length; i++) {
    let classFav;
    const indexClass = favorites.findIndex((fav) => {
      if (fav.show.id === shows[i].show.id) {
        return true;
      } else {
        return false;
      }
    });

    if (indexClass !== -1) {
      classFav = "fav__show";
    } else {
      classFav = "";
    }

    showContent += `<li class="js-itemShow list__Shows--item ${classFav}" id="${shows[i].show.id}">`;
    if (shows[i].show.image !== null) {
      let image = shows[i].show.image.medium;
      showContent += `<img src="${image}" alt="image show" title="image show" />`;
    } else {
      let image = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
      showContent += `<img src="${image}" alt="image show" title="image show" />`;
    }
    showContent += `<h2>${shows[i].show.name}</h2>`;
    showContent += "</li>";
  }
  listShows.innerHTML = showContent;
}

// Añadir favoritos

function addFavorites(ev) {
  const clicked = parseInt(ev.currentTarget.id);

  const indexFav = favorites.findIndex((click) => {
    if (parseInt(click.show.id) === clicked) return click;
  });
  if (indexFav === -1) {
    const foundFav = shows.find((click) => {
      if (parseInt(click.show.id) === clicked) {
        return click;
      }
    });
    favorites.push(foundFav);
  } else {
    favorites.splice(indexFav, 1);
  }
  paintShows();
  listenShows();
  paintFavorites();
  setLocalStorage();
}

/* function addFavorites(ev) {
  console.log(ev.currentTarget);
  const clicked = parseInt(ev.currentTarget.id);
  const indexFav = favorites.indexOf(clicked);
  const isFavorite = indexFav !== -1;
  console.log(isFavorite);

  if (isFavorite === false) {
    for (const item of shows) {
      console.log(clicked);
      if (parseInt(item.show.id) === clicked) {
        favorites.push(item);
        console.log(favorites);
      }
    }
  } else {
    const index = favorites.findIndex((click) => {
      if (parseInt(item.show.id) === clicked) {
        return click;
      }
    });
    favorites.splice(index, 1);
  }
  paintShows();
  //paintFavorites();
  listenShows();
} */

// Pintar favoritos

function paintFavorites() {
  const favList = document.querySelector(".js-listFavorites");
  let favContent = "";
  for (let i = 0; i < favorites.length; i++) {
    favContent += `<li class="js-itemShow list__Shows--item " id="${favorites[i].show.id}">`;
    if (favorites[i].show.image !== null) {
      let image = favorites[i].show.image.medium;
      favContent += `<img src="${image}" alt="image show" title="image show" />`;
    } else {
      let image = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
      showContent += `<img src="${image}" alt="image show" title="image show" />`;
    }
    favContent += `<h2>${favorites[i].show.name}</h2>`;

    favContent += "</li>";
  }
  favList.innerHTML = favContent;
}

// Función que escucha el evento

function listenShows() {
  const itemsShow = document.querySelectorAll(".js-itemShow");
  for (const itemShow of itemsShow) {
    itemShow.addEventListener("click", addFavorites);
  }
}

// Local Storage

// Guardar datos

const setLocalStorage = () => {
  const stringFav = JSON.stringify(favorites);
  localStorage.setItem("fav", stringFav);
};

// Leer Datos

const getLocalStorage = () => {
  const localStorageFav = localStorage.getItem("fav");
  if (localStorageFav !== null) {
    favorites = JSON.parse(localStorageFav);
    paintFavorites();
  }
};

getLocalStorage();

// Reset

/* function resetFav() {
  favorites.splice(1, favorites.length);
  favorites = [];
  localStorage.clear();
  paintFavorites();
}

function resetItemFavorites(ev) {
  /* favorites.splice(indexItemFav, 1);
  paintFavorites();
  setLocalStorage(); */
/*   paintFavorites();
  setLocalStorage();
}
resetItemFavorites();

resetBtn.addEventListener("click", resetFav);

function trashItem() {
  const resetItems = document.querySelectorAll(".js-reset-items");
  // console.log(resetItems);
  for (const resetItem of resetItems) {
    resetItem.addEventListener("click", resetItemFavorites);
  }
}
 */
