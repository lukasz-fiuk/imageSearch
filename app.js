const auth = "563492ad6f91700001000001061de05f68754498926bbfbe4c93747d";

const gallery = document.querySelector(".gallery");
const formInput = document.querySelector(".form__search");
const form = document.querySelector(".form");
const loadBtn = document.querySelector(".container__loadbtn");
let searchValue;
let i = 1;
let fetchLink;
let currentSearch;

// functions

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await apiFetch(fetchLink);
  imgGenerate(data);
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  const data = await apiFetch(fetchLink);
  imgGenerate(data);
}
async function apiFetch(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

async function imgGenerate(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery__img");
    galleryImg.innerHTML = `<img src=${photo.src.small} alt=${data.photos.photographer}>
    <div class="gallery__text">    
    <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>`;
    gallery.appendChild(galleryImg);
  });
}

async function loadmore() {
  i++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${i}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${i}`;
  }
  const data = await apiFetch(fetchLink);
  imgGenerate(data);
}

function clear() {
  i = 1;
  gallery.innerHTML = "";
  formInput.value = "";
}

//Event Listeners
form.addEventListener("input", inputUpdate);
function inputUpdate(e) {
  searchValue = e.target.value;
}
loadBtn.addEventListener("click", loadmore);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
  console.log(searchValue);
});

curatedPhotos();
