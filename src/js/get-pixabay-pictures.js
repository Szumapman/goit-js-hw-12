"use strict"

const pixabayApiKey = "47865988-0e202f3c070f6317e288e8f49"; // should be f.e. in .env file

export function getPictures(searchTerm) {
    const searchParams = new URLSearchParams({
        key: pixabayApiKey,
        q: searchTerm,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
    });

    return fetch(`https://pixabay.com/api/?${searchParams}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        }).catch(error => {
            console.error(error);
        });
}