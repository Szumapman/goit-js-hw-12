"use strict"

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import toastErrorIcon from "../img/toast-error.svg";
import toastInfoIcon from "../img/toast-info-bell.svg";

// to use a different image source, just create new functions getPictures and createGallery and change these two imports
import { getPictures } from "./get-pixabay-pictures"; 
import { createGallery } from "./create-pixabay-gallery";

const form = document.querySelector(".image-search-form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader-container");
const loadMoreButton = document.querySelector(".load-more-btn");
const modalLightbox = new SimpleLightbox(".gallery-item-link", {
    captions: true,
    captionsData: "alt",
    captionDelay: 250,  
});

let searchTerm = null;
let page = 1;
let imagesPerPage = 40;

function noMatchingResults() {
    iziToast.show({
        iconUrl: toastErrorIcon,
        message: "Sorry, there are no images matching<br>your search query. Please try again!",
        position: "topRight",
        backgroundColor: "#EF4040",
        messageColor: "white",
        progressBarColor: "#B51B1B",
        theme: "dark",
    });
    loader.classList.add("hidden");
}

function endSearchResults() {
    iziToast.show({
        iconUrl: toastInfoIcon,
        message: "We're sorry, but you've reached<br>the end of search results.",
        position: "topRight",
        backgroundColor: "#0099FF",
        messageColor: "white",
        progressBarColor: "#0071BD",
        theme: "dark",
    });
    loadMoreButton.classList.add("hidden");
}

async function loadImages() {
    try {
        const response = await getPictures(searchTerm, page, imagesPerPage);
        if (response.totalHits === 0) {
            noMatchingResults();
        } else {
            gallery.appendChild(createGallery(response.hits));
            if (response.totalHits > imagesPerPage) {
                loadMoreButton.classList.remove("hidden");
            } else {
                endSearchResults();
            }
            modalLightbox.refresh();
            gallery.classList.remove("hidden");
            loader.classList.add("hidden");
        }
    } catch (error) {
        console.log("Error:", error)
    }
}

function prepareElements() {
    loader.classList.remove("hidden");
    gallery.classList.add("hidden");
    loadMoreButton.classList.add("hidden");
    page = 1;
    gallery.innerHTML = "";
    const toast = document.querySelector('.iziToast');
    if (toast) {
        iziToast.hide({
            transitionOut: 'fadeOutUp'
        }, toast);
    }
}

form.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    prepareElements();
    searchTerm = form.elements.searchTerm.value.trim();
    await loadImages();
    form.reset(); 
});

loadMoreButton.addEventListener("click", async () => {
    loader.classList.remove("hidden");
    loadMoreButton.classList.add("hidden");
    page++;
    await loadImages();
    const galleryItemHeight = gallery.lastChild.getBoundingClientRect().height;
    window.scrollBy({
        top: galleryItemHeight * 2,
        behavior: "smooth",
    });
});
