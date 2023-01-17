const apikey = "563492ad6f91700001000001105c28a4817f424caa482e0f4c0aee27";

const fetchImages = (query) => fetch("https://api.pexels.com/v1/search?query=" + query, {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + apikey,
    }
})
.then(response => response.json())
.then(json => {
    return json.photos;
})
.catch(err => {
    console.error('error:' + err)
    let alert = document.querySelector(".alert");
    alert.classList.remove("alert-success");
    alert.classList.add("alert-danger")
})

const renderImages = (query) => {
    let row = document.querySelector(".album .row");
    let result = [];
    row.innerHTML = "";    
    fetchImages(query).then((photos) => {
        result = photos;
        for (p of photos) {
            row.innerHTML += `            <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <img src="${p.src.medium}" alt="${p.alt}" class="card-img-top">
              <div class="card-body">
                <p class="card-text">
                  Photo by: ${p.photographer}
                </p>
                <div
                  class="d-flex justify-content-between align-items-center"
                >
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                      onclick="view(this)" 
                      data-toggle="modal" data-target="#modal"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                      onclick="hideCard(this)">
                      Hide
                    </button>
                  </div>
                  <small class="text-muted">ID: ${p.id}</small>
                </div>
              </div>
            </div>
          </div>`
        }
    })
    .catch(err => console.error('error:' + err))
    .finally(() => {
        let alert = document.querySelector(".alert");
        alert.innerHTML = `Found ${result.length} images.`
        alert.style.opacity = 1;
        setInterval(() => {
            alert.style.opacity = 0;
        }, 5000)
    });
}

const hideCard = (elem) => {
    elem.closest(".card").remove()
}

const search = () => {
    let query = document.getElementById("searchField").value;
    renderImages(query);
}

const view = (btn) => {
    let img = btn.closest(".card").querySelector("img").src;
    document.querySelector(".modal-body").innerHTML = `<img src="${img}">`;
}

window.onload = () => {
    let carousel = document.getElementById("carousel")
    fetchImages("forest").then((photos) => {
        console.log(photos)
        for (let i = 0; i < photos.length; i++) {
            if (i === 0) {
                carousel.firstElementChild.innerHTML += `<div class="carousel-item active"><img class="d-block w-100" src="${photos[i].src.original}" alt="${photos[i].alt}"></div>`
            } else {
                carousel.firstElementChild.innerHTML += `<div class="carousel-item"><img class="d-block w-100" src="${photos[i].src.original}" alt="${photos[i].alt}"></div>`
            }
        }
    }).catch(err => console.error('error' + err))
}