// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

let lightboxInstance;

export function imageTemplate(image) {
    return `
        <li class="gallery-item">
            <a href="${image.largeImageURL}" class="gallery-link">
                <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image" loading="lazy" />
            </a>
            <ul class="gallery-info">
                <li class="gallery-info-item"><p>Likes</p><span>${image.likes}</span></li>
                <li class="gallery-info-item"><p>Views</p><span>${image.views}</span></li>
                <li class="gallery-info-item"><p>Comments</p><span>${image.comments}</span></li>
                <li class="gallery-info-item"><p>Downloads</p><span>${image.downloads}</span></li>
            </ul>
        </li>
    `;
}

export function imagesTemplate(arr) {
    return arr.map(imageTemplate).join('');
}

function initLightbox() {
    if (!lightboxInstance) {
        lightboxInstance = new SimpleLightbox('.gallery-link', {
            captionsData: 'alt',
            captionDelay: 250,
        });
    }
    return lightboxInstance;
}

export function createGallery(images) {
    const gallery = document.querySelector('.gallery');
    if (!gallery) {
        return;
    }

    gallery.innerHTML = imagesTemplate(images);
    const lightbox = initLightbox();
    lightbox.refresh();
}

export function clearGallery() {
    const gallery = document.querySelector('.gallery');
    if (gallery) {
        gallery.innerHTML = '';
    }
    if (lightboxInstance) {
        lightboxInstance.refresh();
    }
}

export function showLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.remove('is-hidden');
    }
}

export function hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.add('is-hidden');
    }
}