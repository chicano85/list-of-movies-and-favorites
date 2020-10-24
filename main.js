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
  showContent = "<ul>";
  for (let i = 0; i < shows.length; i++) {
    showContent += `<li class="js-itemShow" id="${i}">`;
    if (shows[i].show.image != null) {
      let image = shows[i].show.image.medium;
      showContent += `<img src="${image}" alt="image show" title="image show" />`;
    } else {
      image = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
      showContent += `<img src="${image}" alt="image show" title="image show" />`;
    }
    showContent += `<h2>${shows[i].show.name}</h2>`;
    showContent += "</li>";
  }
  showContent += "</ul>";
  listShows.innerHTML += showContent;
}

// Pintar favoritos

const favList = document.querySelector(".js-listFavorites");

function paintFavorites() {
  console.log("Hola, favoritos");

  favContent = "";
  favContent = "<ul>";

  for (let i = 0; i < favorites.lengt; i++) {
    favContent += `<li class="js-favItem" id="${i}">`;
    if (favorites[i].show.image != null) {
      let imageFav = shows[i].show.image.medium;
      favContent += `<img src="${imageFav}" alt="image show" title="image show" />`;
    } else {
      imageFav = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
      favContent += `<img src="${image}" alt="image show" title="image show" />`;
    }
    favContent += `<h2>${shows[i].show.name}</h2>`;
    favContent += "</li>";
  }
  favContent += "</ul>";
  favList.innerHTML += favContent;
}

// Añadir favoritos

function addFavorites(ev) {
  const clicked = parseInt(ev.currentTarget.id);
  const indexFav = favorites.indexOf(clicked);
  const isFavorite = indexFav !== -1;
  console.log(isFavorite);

  if (isFavorite === false) {
    favorites.push(clicked);
    clicked.classList.add("favoriteColor");
  } else {
    favorites.splice(indexFav, 1);
    clicked.classList.remove("favoriteColor");
  }

  listenShows();
}

// Función que escucha el evento

function listenShows() {
  const itemsShow = document.querySelectorAll(".js-itemShow");
  for (const itemShow of itemsShow) {
    itemShow.addEventListener("click", addFavorites);
  }
}
