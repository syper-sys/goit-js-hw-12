import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { 
    createGallery, 
    appendGallery, 
    clearGallery, 
    showLoader, 
    hideLoader, 
    hideLoadMoreButton, 
    checkStatusLoadMoreButton 
} from "./js/render-functions";
import { getImagesByQuery } from "./js/pixabay-api";

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.loader-btn');
const loadMessage = document.querySelector('.load-message');

const perPage = 15;
let page = 1;
let inputQueryValue = '';
let totalPages = 0;


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
    hideLoadMoreButton();
    showLoader();

    const loadImages = async () => {
        try {
            page = 1;
            inputQueryValue = searchQuery;
            
            const data = await getImagesByQuery(inputQueryValue, page);

            if (!data.hits || data.hits.length === 0) {
                iziToast.error({
                    title: 'Error',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                });
                return;
            }

            createGallery(data.hits);
            
            totalPages = Math.ceil(data.totalHits / perPage);
            checkStatusLoadMoreButton(page, totalPages);
            
            if (page >= totalPages) {
                hideLoadMoreButton();
                iziToast.info({
                    title: 'Info',
                    message: "We're sorry, but you've reached the end of search results."
                });
            }
        } catch (error) {
            console.error(error);
            iziToast.error({
                title: 'Error',
                message: 'Something went wrong while loading images.',
            });
        }
        hideLoader();
    };

    form.reset();
    loadImages();
});

loadMoreBtn.addEventListener('click', async () => {
    if (!inputQueryValue) return;

    showLoader();

    try {
        page += 1;
        const data = await getImagesByQuery(inputQueryValue, page);

        if (!data.hits || data.hits.length === 0) {
            iziToast.error({
                title: 'Error',
                message: 'No more images available. Please try a different query.',
            });
            page -= 1;
            return;
        }

        appendGallery(data.hits);
        
        const galleryItem = document.querySelector('.gallery-item');
        if (galleryItem) {
            const cardHeight = galleryItem.getBoundingClientRect().height;
            window.scrollBy({
                top: cardHeight * 2,
                behavior: 'smooth'
            });
        }

        totalPages = Math.ceil(data.totalHits / perPage);
        
        if (page >= totalPages) {
            hideLoadMoreButton(); 
            iziToast.info({   
                title: 'Info',
                message: "We're sorry, but you've reached the end of search results."
            });
        } else {
            checkStatusLoadMoreButton(page, totalPages);
        }
    } catch (error) {
        console.error(error);
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong while loading images.',
        });
        page -= 1;
    }

    hideLoader();
});