const accessKey = "4VJKLxXHJcX9MFIGl4x9yH_zuqgw5Ehx9a678e58E0I";
const inputForm = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const imagesContainer = document.querySelector(".image-container");
const searchMore = document.getElementById("search-more");


let dataInput = "";
let page = 1;

async function dataResults() {
  dataInput = searchInput.value;
  console.log(dataInput);
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${dataInput}&client_id=${accessKey}`
  const responce = await fetch(url);
  const data = await responce.json();

  const results = data.results;

  if(page==1){
    imagesContainer.innerHTML= "";
  }

  results.map((result)=>{
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-item');
    const image = document.createElement('img');
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageDescription = document.createElement('div');
    imageDescription.classList.add('image-description');
    const imageLink = document.createElement('a');
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageContainer.appendChild(image);
    imageDescription.appendChild(imageLink);
    imageContainer.appendChild(imageDescription);
    imagesContainer.appendChild(imageContainer);
  });

    page++;
    if(page>1){
      searchMore.style.display = 'block';
    }

}



searchBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  dataResults();
  searchInput.value = "";
});

searchMore.addEventListener("click", (e)=>{
  e.preventDefault();
  searchInput.value = dataInput;
  dataResults();
  searchInput.value = "";
});


