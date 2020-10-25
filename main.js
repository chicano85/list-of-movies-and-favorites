"use strict";

const listShows = document.querySelector(".js-listShows");

const btnSearch = document.querySelector(".js-buttonSearch");

const inputSearch = document.querySelector(".js-inputSearch");

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
    /*  let classFav;
    const indexClass = shows.find((click) => {
      if (parseInt(click.show.id) === shows[i].show.id) return click;
    });
    if (indexClass === false) {
      classFav = "favoriteColor";
    } else {
      classFav = "";
    } */
    showContent += `<li class="js-itemShow listShow__item" id="${shows[i].show.id}">`;
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
}
//Itziar

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
    favContent += `<li class="js-itemShow" id="${favorites[i].show.id}">`;
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
