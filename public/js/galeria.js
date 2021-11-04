"use strict";

const clearElement = (element) => {
    while(element.firstChild) element.removeChild(element.lastChild)
}

const getImages = (breed) => fetch(`https://dog.ceo/api/breed/${breed}/images/random/25`);

const searchImages = async (event) => {
    if(event.key == 'Enter') {
        const breed = event.target.value;
        const response = await getImages(breed);
        const images = await response.json();
        
        clearElement(document.querySelector('.galery-container'))
        clearElement(document.querySelector('.slide-container'))

        loadGalery(images.message);
        loadSlide(images.message);
    }
}

const replacePath = (imagePath) => {
    let lastSlash = imagePath.lastIndexOf('/');
    return imagePath.substring(lastSlash+1).replace(' ', '-').split('.')[0];
}

const createItem = (image) => {
    const galeryContainer = document.querySelector(".galery-container");
    const imageName = replacePath(image);

    let galeryItem = document.createElement("a");
    galeryItem.href = `#${imageName}`;
    galeryItem.classList.add("galery-item");
    galeryItem.innerHTML = `<img src="${image}" alt="${imageName}">`;

    galeryContainer.appendChild(galeryItem);
};

const createSlide = (image, index, imagesArray) => {
    const slideContainer = document.querySelector(".slide-container");
    const imageName = replacePath(image);

    const nextImage = imagesArray.length-1 < index+1 ? 0 : index+1;
    const previousImage = index == 0 ? imagesArray.length-1 : index-1;

    let slideItem = document.createElement("div");
    slideItem.id = imageName;
    slideItem.classList.add("slide");
    slideItem.innerHTML = `
        <div class="image-container">
            <a href="#" class="icon close">&#10006</a>
            <a href="#${replacePath(imagesArray[previousImage])}" class="icon previous">&#171</a>
            <img src="${image}" alt="">
            <a href="#${replacePath(imagesArray[nextImage])}" class="icon next">&#187</a>
        </div>
    `

    slideContainer.appendChild(slideItem);
}

const loadGalery = (imagesUrl) => imagesUrl.forEach(createItem);
const loadSlide = (imagesUrl) => imagesUrl.forEach(createSlide);

document.querySelector('.search-container').addEventListener('keypress', searchImages)