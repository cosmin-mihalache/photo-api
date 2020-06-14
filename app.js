const auth = '563492ad6f91700001000001e3ddaf3f2c2445c58e3f9b0fd1b13b3a';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const submitButton = document.querySelector('.submit-btn');
let searchValue;

async function curatedPhotos() {
  const dataFetch = await fetch('https://api.pexels.com/v1/curated', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  data.photos.forEach((photo) => {
    console.log(photo);
    const galleryImg = document.createElement('div');
    galleryImg.classList.add('gallery-img');
    galleryImg.innerHTML = `<img src=${photo.src.medium}></img>
    <p>${photo.photographer}</p
    `;
    // AppendChild
    gallery.appendChild(galleryImg);
  });
}

curatedPhotos();
