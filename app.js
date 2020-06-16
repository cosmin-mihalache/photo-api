const auth = '563492ad6f91700001000001e3ddaf3f2c2445c58e3f9b0fd1b13b3a';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;

// Event Listeners
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    console.log(photo);
    const galleryImg = document.createElement('div');
    galleryImg.classList.add('gallery-img');
    galleryImg.innerHTML = `
          <div class='gallery-info'>
          <a href=${photo.photographer_url} target="_blank">${photo.photographer}</a>
          <a href=${photo.src.original} target="_blank">Download</a> 
          </div>
          <img src=${photo.src.large}></img>
          `;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  const data = await fetchApi(
    'https://api.pexels.com/v1/curated?per_page=15&page=1'
  );

  generatePictures(data);
}

async function searchPhotos(query) {
  clear();
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`
  );
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = '';
  searchInput.value = '';
}
curatedPhotos();
