import { movies } from "./db.js";
const ul = document.querySelector(".promo__interactive-list")
const promo_bg = document.querySelector(".promo__bg")
const promo_genre = document.querySelector(".promo__genre")
const promo__title = document.querySelector(".promo__title")
const promo__descr = document.querySelector(".promo__descr")
const imdb = document.querySelector(".imdb")
const metascore = document.querySelector(".metascore")
const searchInput = document.querySelector("#search-input")
const nav = document.querySelector(".promo__menu-list ul")
const modalTitle = document.getElementById("modalTitle")
const modalDirector = document.getElementById("modalDirector")
const modalYear = document.getElementById("modalYear")
const modalCountry = document.getElementById("modalCountry")
const modalGenre = document.getElementById("modalGenre")
const modalReleased = document.getElementById("modalReleased")
const modalRuntime = document.getElementById("modalRuntime")
const modalAwards = document.getElementById("modalAwards")
const modalPoster = document.getElementById("modalPoster")
const modalRating = document.getElementById("modalRating")
const writer = document.getElementById("writer")
const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close");
let watched = [...movies]


searchInput.oninput = () => {
    let query = searchInput.value.toLocaleLowerCase().trim()

    let filtred = movies.filter(item => {
        let title = item.Title.toLowerCase()
        if (title.includes(query)) {
            return item
        }
    })
    reload(filtred.sort((a, b) => a.Title > b.Title ? 1 : -1))
}

let ganres = watched.map(item => item.Genre)
ganres = ["All", ...new Set(ganres)];


let genInd = 0
function reloadGenres(arr) {
    nav.innerHTML = ""
    for (const el of arr) {
        const li = document.createElement("li")
        const a = document.createElement("p")

        li.classList.add("promo__menu-item")
        a.textContent = el
        a.href = "#"

        nav.append(li)
        li.append(a)

        if (arr.indexOf(el) === genInd) {
            li.classList.add("promo__menu-item_active")
        }

        a.onclick = () => {
            console.log(ganres);
            if (el.toLowerCase() === "all") {
                reload(watched.sort((a, b) => a.Title > b.Title ? 1 : -1))
                return
            }

            genInd = arr.indexOf(el)
            let filtred = watched.filter(item => {
                if (el === item.Genre) {
                    return item
                }
            })

            reload(filtred.sort((a, b) => a.Title > b.Title ? 1 : -1))
            reloadGenres(ganres)
        }
    }
}


reload(watched.sort((a, b) => a.Title > b.Title ? 1 : -1))

function reload(data) {
    ul.innerHTML = ""
    if (data.length >= 1 ) {
        setPromoData(data[0])
    }
    

    for (const item of data) {
        const li = document.createElement("li")
        const li_delete = document.createElement("div")
        const p = document.createElement("p")
        const more = document.createElement("div")

        li.classList.add("promo__interactive-item")
        li_delete.classList.add("delete")
        more.classList.add("more")


        p.innerHTML = item.Title
        more.textContent = "more"

        ul.append(li)
        li.append(p, li_delete, more)

        p.onclick = () => {
            if (data.length >= 1 ) {
                setPromoData(item)
            }
        }

        li_delete.onclick = () => {
            watched = watched.filter(el => el.ID !== item.ID)
            reload(watched.sort((a, b) => a.Title > b.Title ? 1 : -1))
        }

        more.onclick = function () {
            modal.classList.add('fade-in');
            modal.style.display = "block";

            setMovieData(item)
        };
        reloadGenres(ganres)
    }
}

function generateStar(rating) {
    const totalStars = 10;
    const filledStars = Math.round((rating / 10) * totalStars);
    const emptyStars = totalStars - filledStars;
    const starRating = '★'.repeat(filledStars) + '☆'.repeat(emptyStars);
    return starRating;
}

function closeModal() {
    modal.classList.remove('fade-in');
    modal.classList.add('fade-out');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('fade-out');
    }, 300);
}

span.onclick = function () {
    closeModal();
};
window.onclick = (event) => {
    if (event.target === modal) {
        closeModal();
    }
};

function setMovieData(item) {
    modalRating.innerHTML = ""

    let ratingElement = document.createElement('span');
    let filmRating = parseFloat(item.imdbRating);
    let starRating = generateStar(filmRating);

    modalTitle.textContent = item.Title
    modalGenre.textContent = item.Genre
    modalYear.textContent = item.Year
    modalDirector.textContent = item.Director
    modalCountry.textContent = item.Country
    modalReleased.textContent = item.Released
    modalRuntime.textContent = item.Runtime
    modalAwards.textContent = item.Awards
    modalPoster.src = item.Poster
    writer.innerText = item.Plot

    ratingElement.textContent = starRating;
    modalRating.appendChild(ratingElement);
}

function setPromoData(item) {
    promo_bg.style.backgroundImage = `url( ${item.Poster} )`;
    promo_bg.classList.add("fade")
    promo_genre.textContent = item.Genre
    promo__title.textContent = item.Title
    promo__descr.textContent = item.Plot
    imdb.textContent = item.imdbRating
    metascore.textContent = item.Metascore
    setTimeout(() => {
        promo_bg.classList.remove("fade")
    }, 700);
}
