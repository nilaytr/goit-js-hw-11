import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = "48383034-506c7f8ffe99ad1c3f13eb63b";
const BASE_URL = "https://pixabay.com/api/?";

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

form.addEventListener("submit", e => {
    e.preventDefault();
    loader.classList.add("loader");
    searchParams.set('q', e.currentTarget.elements.query.value.trim());
    const url = `${BASE_URL}${searchParams.toString()}`;

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
            loader.classList.remove('loader');
            
            const lightbox = new SimpleLightbox(".gallery a", {
                captionsData: "alt",
                captionDelay: 250,
            });
            lightbox.refresh();
        })

        .catch(error => {
            iziToast.error({
                message: `${error}`,
                position: 'topRight',
            });

        gallery.innerHTML = "";
        loader.classList.remove('loader');
    });
    form.reset();
});

