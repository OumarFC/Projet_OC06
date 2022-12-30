const UrlApi = "http://localhost:8000/api/v1/titles/";

function Modal(Id) {
    const modal = document.getElementById("GetModal");
    const span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";

    fetch(UrlApi + Id)
      .then(function(res) {
        if (res.ok) {
            return res.json();
        }
	  })
      .then(function(todo) {

      	//Ouvre la fenêtre modale et copie les informations du film à l'intérieur.
		const ImgModal = document.getElementsByClassName("modal_image")[0];
		ImgModal.innerHTML = "<p><img src='" +  todo.image_url + "'></p>";
		const ContentModal = document.getElementsByClassName("modal_contents");

		const title = document.createElement("li");
		const genres = document.createElement("li");
		const year = document.createElement("li");
		const imdb_score = document.createElement("li");
		const directors = document.createElement("li");
		const actors = document.createElement("li");
		const duration = document.createElement("li");
		const country = document.createElement("li");
		const box_office_results = document.createElement("li");
		const description = document.createElement("li");

		title.innerHTML = "<b>Titre : </b>" + todo.title;
		genres.innerHTML = "<b>Genre(s) : </b>" + todo.genres;
		year.innerHTML = "<b>Date de sortie : </b>" + todo.published;
		imdb_score.innerHTML = "<b>Score IMBD : </b>" + todo.imdb_score;
		directors.innerHTML = "<b>Réalisateur(s) : </b>" + todo.directors;
		actors.innerHTML = "<b>Acteurs : </b>" + todo.actors;
		duration.innerHTML = "<b>Durée : </b>" + todo.duration + " minutes.";
		country.innerHTML = "<b>Pays d'origine : </b>" + todo.country_li;
		box_office_results.innerHTML = "<b>Box-office : </b>" + todo.worldwide_gross_income;
		description.innerHTML = "<b>Résumé : </b>" + todo.description;

		ContentModal[0].appendChild(title);
		ContentModal[0].appendChild(genres);
		ContentModal[0].appendChild(year);
		ContentModal[0].appendChild(imdb_score);
		ContentModal[0].appendChild(directors);
		ContentModal[0].appendChild(actors);
		ContentModal[0].appendChild(duration);
		ContentModal[0].appendChild(country);
		ContentModal[0].appendChild(box_office_results);
		ContentModal[0].appendChild(description);

		// Ferme la fenêtre quand l'utilisateur clique sur "X", et efface les données.
		span.onclick = function() {
		modal.style.display = "none";
		const modal_image = document.getElementsByClassName("modal_image")[0];
		modal_image.innerHTML = "";
		const modal_data = document.getElementsByClassName("modal_contents")[0];
		modal_data.innerHTML = "";

		}

    	// Ferme la fenêtre quand l'utilisateur clique en dehors de la fenêtre, et efface les données.
		window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
			const modal_image = document.getElementsByClassName("modal_image")[0];
			modal_image.innerHTML = "";
			const modal_data = document.getElementsByClassName("modal_contents")[0];
			modal_data.innerHTML = "";
		  	}
	  	}
	})
    .catch(function(error) {
      console.error('Error:', error);
	});
};

// Création d'une image preview pour le caroussel.
function showPreview(Url, indice, contentId) {
fetch(UrlApi + Url)
  .then(function(res) {
    if (res.ok) {
        return res.json();
    }
  })
  .then(function(todo) {
    const CarouselContent = document.getElementsByClassName(contentId)[0];
    const MovieImage = document.createElement("li");

    MovieImage.innerHTML = "<p><img src='" +  todo.results[indice].image_url + "'></p>";
    MovieImage.setAttribute("data-id", todo.results[indice].id);
    MovieImage.setAttribute("class", "imgPreview");
    CarouselContent.appendChild(MovieImage);

    MovieImage.addEventListener("click", function() {
      Modal(MovieImage.dataset.id)
    })
  })
  .then(() => {
	    const carrousel = document.getElementsByClassName(contentId)[0].childNodes;
        carrousel.forEach(function (currentValue, currentIndex) {
			currentValue.setAttribute("data-carousselPlace", currentIndex)
			if (currentIndex < 4) {
				currentValue.style.display = "block"
			} else {
				currentValue.style.display = "none"
			}
		})
  })
  .catch(function(error) {
      console.log(error);
    });
}

function CreateCarouselSelect(url1, url2, ContentId) {

    // Création des sections d'images
    for (let movie = 0; movie < 5; movie++) {
      showPreview(url1, movie, ContentId)
    }
    for (let movie = 0; movie < 2; movie++) {
      showPreview(url2, movie, ContentId)
    }
}

var ArrowRight = document.getElementsByClassName('arrow-right')
var ArrowLeft = document.getElementsByClassName('arrow-left')

for(var i=0; i < ArrowRight.length; i++){
	ArrowRight[i].addEventListener('click', function() {
		turn_right(this)
	})
	ArrowLeft[i].addEventListener('click', function() {
		turn_left(this)
	})
}

function turn_right(arrow_right){
    const divParent = arrow_right.parentElement
	const divCarrousel = divParent.getElementsByTagName('div')[0]
	const figures = divParent.getElementsByClassName('imgPreview')
	for(var i = 0; i < figures.length; i++){
		figures[i].dataset['carousselplace'] = (figures[i].dataset['carousselplace'] + 6 ) % 7
	}
	actualizeCarrousel(divCarrousel)
}

function turn_left(arrow_left){
    const divParent = arrow_left.parentElement
	const divCarrousel = divParent.getElementsByTagName('div')[0]
	const figures = divParent.getElementsByClassName('imgPreview')
	for(var i = 0; i < figures.length; i++){
		figures[i].dataset['carousselplace'] = (figures[i].dataset['carousselplace'] + 1) % 7
	}
	actualizeCarrousel(divCarrousel)
}

// Création de la fenêtre "meilleur film"
function ShowBestMovie(url) {
  fetch(url)
      .then(function(res) {
          if (res.ok) {
              return res.json();
          }
      })
      .then(function(todo) {
		  const BestMovieImage = document.getElementById("BestMovie_image");

		  BestMovieImage.innerHTML = "<p><img src='" +  todo.image_url + "' ></p>";
		  BestMovieImage.setAttribute("data-id", todo.id);

		  const BestMovieContent = document.getElementById("BestMovie_content");
		  const BestMovieTitle = document.createElement("h1");
		  const BestMovieDesc = document.createElement("p");

		  BestMovieTitle.innerText = todo.title;
		  BestMovieContent.appendChild(BestMovieTitle);

		  BestMovieDesc.innerText = todo.description;
		  BestMovieContent.appendChild(BestMovieDesc);

		  const btn = document.getElementsByClassName("btn_openModal");
		  btn[0].addEventListener("click", function () {
		  Modal(BestMovieImage.dataset.id);
		})
      })
      .catch(function(error) {
        console.error('Error:', error);
    })
  };

function actualizeCarrousel(carrousel){
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
  	fetch (UrlApi + "?sort_by=-imdb_score")
    .then(function(res) {
      if (res.ok) {
          return res.json();
      }
  	})
    .then(function(todo) {
      const MovieUrl = todo.results[0].url
      ShowBestMovie(MovieUrl);
    });

    CreateCarouselSelect("?sort_by=-imdb_score&page_size=7 ", "?sort_by=-imdb_score&page=2", "images_BM") // Meilleurs films
	CreateCarouselSelect("?genre_contains=Drama&sort_by=-imdb_score", "?genre_contains=Drama&sort_by=-imdb_score&page=2", "images_AM") // caroussel de meilleurs films Dramatiques
	CreateCarouselSelect("?genre_contains=Adventure&sort_by=-imdb_score", "?genre_contains=Adventure&sort_by=-imdb_score&page=2", "images_T") // caroussel de meilleurs films d'Aventures
	CreateCarouselSelect("?genre_contains=Fantasy&sort_by=-imdb_score", "?genre_contains=Fantasy&sort_by=-imdb_score&page=2", "images_H") //caroussel de meilleur films Fantastiques
}

main()