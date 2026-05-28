import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://pixabay.com/api/',
});

export const getImagesByQuery = async (query, page) => {
    const response = await axiosInstance.get('', {
        params: {
            key: '55965686-0954e8ecbc9e6337c09710879',
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: page,
            per_page: 15,
        }
    });
    return response.data;
}