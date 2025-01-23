import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { API_KEY, BASE_URL } from "./config.js";

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const searchParams = new URLSearchParams({
    key: API_KEY,
    q: "",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true"
});

function showLoader() {
    loader.style.display = "block";
}

function hideLoader() {
    loader.style.display = "none";
}

    document.querySelector('form').addEventListener("submit", e => {
    e.preventDefault();
    gallery.innerHTML = "";
    searchParams.set('q', e.currentTarget.elements.query.value.trim());
    const url = `${BASE_URL}${searchParams.toString()}`;

    showLoader(); 

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then((images) => {
            if (images.hits.length <= 0) {
                throw new Error("Sorry, there are no images matching your search query. Please try again!");
            }

            const galleryMarkup = images.hits.map(({
                webformatURL,
                largeImageURL,
                tags,
                likes,
                views,
                comments,
                downloads }) => {
                return `<li class= "gallery-list">
                <div class="gallery-div">
                   <a class= "gallery-link" href="${largeImageURL}">
                     <img src="${webformatURL}"  alt="${tags}" class="gallery-image"/>
                   </a>
                </div>
                <ul class="card-info">
                <li class="info-item">
                   <h3>Likes</h3>
                   <p>${likes}</p>
                </li>
                <li class="info-item">
                  <h3>Views</h3>
                  <p>${views}</p>
                </li>
                <li class="info-item">
                  <h3>Comments</h3>
                  <p>${comments}</p>
                </li>
                <li class="info-item">
                   <h3>Downloads</h3>
                   <p>${downloads}</p>
                </li>
                </ul>
                </li>`;
            }).join("");

            gallery.innerHTML = galleryMarkup;
            
            const lightbox = new SimpleLightbox(".gallery a", {
                captionsData: "alt",
                captionDelay: 250,
            });
            lightbox.refresh();
        })

        .catch(error => {
            iziToast.error({
                message: `${error.message}`,
                position: 'topRight',
            })
        })
        
        .finally(() => {
            hideLoader();
            form.reset();
        });
});

