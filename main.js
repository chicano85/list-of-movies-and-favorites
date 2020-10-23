"use strict";

const sectionSearch = document.querySelector(".js-sectionSearch");

const listShows = document.querySelector(".js-listShows");

const btnSearch = document.querySelector(".js-buttonSearch");

const inputSearch = document.querySelector(".js-inputSearch");

let shows = [];
let favourites = [];

// Conectar con la API

function getData() {
  const nameShow = inputSearch.value;
  fetch(`https://api.tvmaze.com/search/shows?q=${nameShow}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      shows = data;
      paintShows();
      listenShows();
    });
}

// Pintar las series en el HTML

function paintShows() {
  let showContent = "";
  showContent = "<ul>";
  for (let i = 0; i < shows.length; i++) {
    showContent += `<li class="js-itemShow" id="${[shows[i].show.id]}">`;
    showContent += `<h2>${shows[i].show.name}</h2>`;

    showContent += `<img src="${shows[i].show.image.medium}" alt="image show" title="image show" />`;
    showContent += "</li>";

    let image;
    if (shows.image === null) {
      image = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
    } else {
      image = shows[i].show.image.medium;
    }
  }
  showContent += "</ul>";
  listShows.innerHTML += showContent;
}

// Función que marca los favoritos

function favoritesShows(ev) {
  console.log("escucho evento");
  const clicked = ev.currentTarget.id;
  console.log(clicked);
}

// Función que escucha el evento

function listenShows() {
  console.log("listen");
  const itemsShow = document.querySelectorAll(".js-itemShow");
  for (const itemShow of itemsShow) {
    console.log("entrando en for");
    itemShow.addEventListener("click", favoritesShows);
  }
}

// Buscar las series

function searchShows() {
  console.log("buscar serie");
  getData();
}

btnSearch.addEventListener("click", searchShows);
