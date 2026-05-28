import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://pixabay.com/api/',
});

export const getImagesByQuery = (searchQuery) => {
    return axiosInstance.get('', {
        params: {
            key: '55965686-0954e8ecbc9e6337c09710879',
            q: searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        }
    })
    .then(res => res.data);
}