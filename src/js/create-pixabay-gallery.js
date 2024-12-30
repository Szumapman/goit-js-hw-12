const createGalleryItem = ({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
    const galleryItem = document.createElement("li");
    galleryItem.classList.add("gallery-item");
    galleryItem.innerHTML = `
    <a href="${largeImageURL}" class="gallery-item-link">
        <img class="gallery-item-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <ul class="info">
        <li>
            <p class="info-item-title">Likes</p>
            <p class="info-item-stats">${likes}</p>
        </li>
        <li>
            <p class="info-item-title">Views</p>
            <p class="info-item-stats">${views}</p>
        </li>
        <li>
            <p class="info-item-title">Comments</p>
            <p class="info-item-stats">${comments}</p>
        </li>
        <li>
            <p class="info-item-title">Downloads</p>
            <p class="info-item-stats">${downloads}</p>
        </li>            
    </ul>
    `;
    return galleryItem;
};

export const createGallery = (images) => {
    const imgs = images.map(createGalleryItem);

    const fragment = document.createDocumentFragment();
    fragment.append(...imgs);
    return fragment;
};