import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions";
import { getImagesByQuery } from "./js/pixabay-api";

const form = document.querySelector('.form');
const loader = document.querySelector('.loader');

form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);
    const searchQuery = formData.get('search-text')?.trim();
    
    if (!searchQuery) {
        iziToast.warning({
            title: 'Warning',
            message: 'Please enter a search term!',
        });
        return;
    }
    
    clearGallery();
    showLoader();
    
    getImagesByQuery(searchQuery)
        .then(data => {
            if (data.hits.length === 0) {
                iziToast.error({
                    title: 'Error',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                });
                return;
            }
            
            createGallery(data.hits);
        })
        .catch(error => {
            console.error(error);
            iziToast.error({
                title: 'Error',
                message: 'Something went wrong while loading images.',
            });
        })
        .finally(() => {
            hideLoader();
        });
});