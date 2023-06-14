import { movies } from "./db.js";
const ul = document.querySelector(".promo__interactive-list")
const promo_bg = document.querySelector(".promo__bg")
const promo_genre = document.querySelector(".promo__genre")
const promo__title = document.querySelector(".promo__title")
const promo__descr = document.querySelector(".promo__descr")
const imdb = document.querySelector(".imdb")
const metascore = document.querySelector(".metascore")

let watched = [...movies]

reload(watched.sort((a, b) => a.Title > b.Title ? 1 : -1))
function reload(data) {
    ul.innerHTML = ""

        for (const item of data) {
            const li = document.createElement("li")
            const li_delete = document.createElement("div")

            li.classList.add("promo__interactive-item")
            li_delete.classList.add("delete")

            li.innerHTML = item.Title

            ul.append(li)
            li.append(li_delete)

            li.onclick = () => {
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


            li_delete.onclick = () => {
                watched = watched.filter(el => el.ID !== item.ID)
                reload(watched.sort((a, b) => a.Title > b.Title ? 1 : -1))
            }
        }
    }

