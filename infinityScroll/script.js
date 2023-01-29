const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API

const count = 30;
const apiKey = 'JIm6JjA7_t8FN0M1CL7J8VzfDOAkcDeoD59YW_M-dT4'
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded

function imageLoaded() {
    console.log('image loaded');
    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}

// Helper Function to Set Attributes on DOM Element

function setAttribute(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target', '_blank');
        // setAttribute(item, {
        //     href: photo.link.html,
        //     target: '_blank'
        // });
        // Create <img> for Photo
        const img = document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title',photo.alt_description);
        // setAttribute(img, {
        //     src: photo.urls.regular,
        //     alt: photo.alt_description,
        //     title: photo.alt_description
        // });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //  Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos from Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch Errors Here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready) {
        ready = false;
        getPhotos();
    }});


// On Load

getPhotos();