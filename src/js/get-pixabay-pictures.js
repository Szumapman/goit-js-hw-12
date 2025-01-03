"use strict"

import axios from "axios";

const pixabayApiKey = "47865988-0e202f3c070f6317e288e8f49"; // should be f.e. in .env file

export async function getPictures(searchTerm, page = 1, perPage = 40) {
    axios.defaults.baseURL = "https://pixabay.com/api";
    try {
        const response = await axios.get("/", {
            params: {
                key: pixabayApiKey,
                q: searchTerm,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: perPage,
                page: page,
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error during getting images from Pixabay: ", error);
    }
}