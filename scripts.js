const mainEntryUrl = "http://localhost:8000/api/v1/titles/";
let movie_image_url = "";

function createModal(movieId) {
    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";

    fetch(mainEntryUrl + movieId)
      .then(function(res) {
        if (res.ok) {
            return res.json();
        }
	  })
      .then(function(data) {

      	//Ouvre la fenêtre modale et copie les informations du film à l'intérieur.
		let modal_img_el = document.getElementsByClassName("modal__img")[0];
		modal_img_el.innerHTML = "<p><img src='" +  data.image_url + "'></p>";
		let modal_content_el = document.getElementsByClassName("modal__contents");

		let title_li = document.createElement("li");
		title_li.innerHTML = "<b>Titre : </b>" + data.title;
		modal_content_el[0].appendChild(title_li);

		let genres_li = document.createElement("li");
		genres_li.innerHTML = "<b>Genre(s) : </b>" + data.genres;
		modal_content_el[0].appendChild(genres_li);

		let year_li = document.createElement("li");
		year_li.innerHTML = "<b>Date de sortie : </b>" + data.published;
		modal_content_el[0].appendChild(year_li);

		let imdb_score_li = document.createElement("li");
		imdb_score_li.innerHTML = "<b>Score IMBD : </b>" + data.imdb_score;
		modal_content_el[0].appendChild(imdb_score_li);

		let directors_li = document.createElement("li");
		directors_li.innerHTML = "<b>Réalisateur(s) : </b>" + data.directors;
		modal_content_el[0].appendChild(directors_li);

		let actors_li = document.createElement("li");
		actors_li.innerHTML = "<b>Acteurs : </b>" + data.actors;
		modal_content_el[0].appendChild(actors_li);

		let duration_li = document.createElement("li");
		duration_li.innerHTML = "<b>Durée : </b>" + data.duration + " minutes.";
		modal_content_el[0].appendChild(duration_li);

		let country_li = document.createElement("li");
		country_li.innerHTML = "<b>Pays d'origine : </b>" + data.country_li;
		modal_content_el[0].appendChild(country_li);

		let box_office_results = document.createElement("li");
		box_office_results.innerHTML = "<b>Box-office : </b>" + data.worldwide_gross_income;
		modal_content_el[0].appendChild(box_office_results);

		let description_li = document.createElement("li");
		description_li.innerHTML = "<b>Résumé : </b>" + data.description;
		modal_content_el[0].appendChild(description_li);

		// Ferme la fenêtre quand l'utilisateur clique sur "X", et efface les données.
		span.onclick = function() {
		modal.style.display = "none";
		let modal_img = document.getElementsByClassName("modal__img")[0];
		modal_img.innerHTML = "";
		let modal_data = document.getElementsByClassName("modal__contents")[0];
		modal_data.innerHTML = "";
		}

    	// Ferme la fenêtre quand l'utilisateur clique en dehors de la fenêtre, et efface les données.
		window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
			let modal_img = document.getElementsByClassName("modal__img")[0];
			modal_img.innerHTML = "";
			let modal_data = document.getElementsByClassName("modal__contents")[0];
			modal_data.innerHTML = "";
		  	}
	  	}
	})
    .catch(function(error) {
      console.error('Error:', error);
	});
};


// Création de la fenêtre "meilleur film"
function showPreviewBestMovie(url) {
  fetch(url)
      .then(function(res) {
          if (res.ok) {
              return res.json();
          }
      })
      .then(function(data) {
		  let best_movie_img = document.getElementById("bestMovie__image");

		  best_movie_img.innerHTML = "<p><img src='" +  data.image_url + "' ></p>";
		  best_movie_img.setAttribute("data-id", data.id);

		  let best_movie_contents = document.getElementById("bestMovie__contents");
		  let best_movie_title = document.createElement("h1");
		  let best_movie_description = document.createElement("p");

		  best_movie_title.innerText = data.title;
		  best_movie_contents.appendChild(best_movie_title);

		  best_movie_description.innerText = data.description;
		  best_movie_contents.appendChild(best_movie_description);

		  let btn = document.getElementsByClassName("btn__openModal");
		  btn[0].addEventListener("click", function () {
		  createModal(best_movie_img.dataset.id);
		})
      })
      .catch(function(error) {
        console.error('Error:', error);
    })
  };

function refreshCarrousel(carrousel){
	figures = carrousel.getElementsByClassName('imgPreview')
	for(var i = 0; i < figures.length; i++){
		if(figures[i].dataset['carousselplace'] < 4){
			figures[i].style.display = "block"
		} else {
			figures[i].style.display = "none"
		}
	}
}


  function main() {

    // Bloc meilleur film.
  	fetch (mainEntryUrl + "?sort_by=-imdb_score")
    .then(function(res) {
      if (res.ok) {
          return res.json();
      }
  	})
    .then(function(data) {
      let bestMovieUrl = data.results[0].url
      showPreviewBestMovie(bestMovieUrl);
    });
}

main()