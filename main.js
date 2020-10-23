"use strict";

const sectionSearch = document.querySelector(".js-sectionSearch");

const listShows = document.querySelector(".js-listShows");

const btnSearch = document.querySelector(".js-buttonSearch");

const inputSearch = document.querySelector(".js-inputSearch");

let shows = [];

// Conectar con la API

function getData() {
  fetch("https://api.tvmaze.com/search/shows?q=tronos")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      shows = data;
      paintShows();
    });
}

function paintShows() {
  let showContent = "";
  showContent = "<ul>";
  for (let i = 0; i < shows.length; i++) {
    showContent += "<li>";
    showContent += `<h2>${shows[i].show.name}</h2>`;

    showContent += `<img src="${shows[i].show.image.medium}" alt="image show" title="image show" />`;
    showContent += "</li>";
  }
  showContent += "</ul>";
  listShows.innerHTML += showContent;
}

// Buscar las series

function searchShows() {
  console.log("buscar serie");
  const nameShow = inputSearch.value;
  getData();
}

btnSearch.addEventListener("click", searchShows);

// Pintar las series en el HTML

/* function paintShows() {
  let showContent = "";
  for (const item of shows) {
    showContent += "<li>";
    showContent += "<h2>${item.show.name}</h2>";
  }
  showContent += "</li>";
  listShows.innerHTML = showContent;
}

getData(); */
