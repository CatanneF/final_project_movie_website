//my api key: b816687edc67d6b0d9bd7c383f188f2f
//now playing: https://api.themoviedb.org/3/movie/now_playing?api_key=b816687edc67d6b0d9bd7c383f188f2f&language=en-US&page=1
//rating and release: https://api.themoviedb.org/3/movie/${movie.id}/release_dates?api_key=b816687edc67d6b0d9bd7c383f188f2f
//cast: https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=b816687edc67d6b0d9bd7c383f188f2f&language=en-US
//get images: https://image.tmdb.org/t/p/w500/${movie.poster-path}
// SITE: https://catannef.github.io/final_project_movie_website/

!(function () {

//ADD SEARCHBAR AND DROPDOWN FUNCTIONALITY
    const searchInput = document.querySelector("#query");
    const resetBtn = document.querySelector('#reset-btn');
    const genreDropdown = document.querySelector('#genre'); 
    const ratingDropdown = document.querySelector('#rating')
    let movieNames = [];
    let movies;
   
    // RESET FILTERS BUTTON
    resetBtn.addEventListener("click", () => {
        movieNames.forEach((movie) => {
            document.querySelector(`#movie-${movie.id}`).style.display = "block";
        });
    });

    // SEARCH MOVIES
    searchInput.addEventListener("input", (e) => {
        const value = e.target.value.toLowerCase() 
        movieNames.filter((movie) => {
            if (movie.title.toLowerCase().includes(value)) {
                document.querySelector(`#movie-${movie.id}`).style.display = "block";
            } else {
                document.querySelector(`#movie-${movie.id}`).style.display = "none";
            }     
        });   
    });

    // GENRE FILTER
    genreDropdown.addEventListener("change", () => {
        let genreResult = parseInt(genreDropdown.value);
        movieNames.filter((movie) => {
            if(movie.genre_ids.includes(genreResult))  {
                document.querySelector(`#movie-${movie.id}`).style.display = "block";
            } else {
                document.querySelector(`#movie-${movie.id}`).style.display = "none";     
            };   
        });
    });

    // RATING FILTER
    ratingDropdown.addEventListener("change", () => {
        let ratingResult = ratingDropdown.value;
        movieNames.filter((movie) => {
            if(movie.adult === (ratingResult))  {
                document.querySelector(`#movie-${movie.id}`).style.display = "block";
            } else {
                document.querySelector(`#movie-${movie.id}`).style.display = "none";     
            };   
        });
    });
    
    
    


//ADD MOVIES TO DOC
    const addMovies = (movies) => {
        const movieImg = document.querySelector('#movies-container');
        
        movies.map((movie) => {
            let item =
                `<div class = "poster-container" id = "movie-${movie.id}">
                        <img class="movie-poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.original_title} movie poster">
                        <h3 class="movie-name">${movie.title}</h3>      
                </div> 
                    <div class="popup-container" id="popup-${movie.id}">
                        <div class="popup-content" id="popupInfo-${movie.id}">
                            <div class= "popup-header">
                                <button class = "close-popup" id = "btn-${movie.id}">
                                    X
                                </button> 
                                <h3 class="popup-title">${movie.title}</h3>
                            </div>
                            <div class= "popup-info">
                                <div id="release-${movie.id}" class="release">
                                    <p>Release Date: ${movie.release_date}</p>
                                </div>
                                <h4>Overview</h4>
                                <p>${movie.overview}</p>
                                <h4>Cast:</h4>
                            </div>
                    </div>
                </div>`;

                
            // ADD CAST LIST
                const addMovieInfo = (movieInfo) => {  
                    movieInfo.slice(0, 10).forEach((movieCast) => {
                        let cast = 
                            `<p class="cast">${movieCast.character}:   ${movieCast.name}</p>`;
                        let addCast = document.querySelector(`#popupInfo-${movie.id}`);
                        addCast.insertAdjacentHTML("beforeend", cast);          
                    });                     
                };

            // ADD RATING
                const addMovieRating = (release) => {
                    movie.adult = release.certification;
                    let cert = `<p class = "cert">Rating: ${movie.adult}</p>`;
                    let addRating = document.querySelector(`#release-${movie.id}`);
                    addRating.insertAdjacentHTML("afterbegin", cert);  
                               
                };

            // INSERT MOVIE POSTERS & NAME TO DOC
                movieImg.insertAdjacentHTML("beforeend", item);  

            //ADD POPUP BOX OF MOVIE INFO
                let popupBox = document.querySelector(`#popup-${movie.id}`);
                popupBox.style.display = "hidden";
                let posterContainer = document.querySelector(`#movie-${movie.id}`);
                posterContainer.addEventListener("click", () => {
                    popupBox.style.display = "block";
                });

            // GET CAST INFO FOR MOVIE
                    fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=b816687edc67d6b0d9bd7c383f188f2f&language=en-US`)
                        .then((res) => res.json())
                        .then((data) => {
                        const movieInfo = data.cast;
                        addMovieInfo(movieInfo);             
                    });

            // GET MOVIE RATING
                    fetch(`https://api.themoviedb.org/3/movie/${movie.id}/release_dates?api_key=b816687edc67d6b0d9bd7c383f188f2f`)
                        .then((res) => res.json())
                        .then((data) => {
                        const movieRating = data.results;
                        let getMoviesCert = movieRating.filter((movieR) => { 
                            return movieR.iso_3166_1.includes("US");   
                        });
                        getMoviesCert.map((movieCert) => { 
                            movieCert.release_dates.slice(0,1).forEach((release) => {
                                if (release.certification === "") {
                                    movieCert.release_dates.slice(1,2).forEach((release) => {
                                        addMovieRating(release);   
                                    });
                                }else {
                                    addMovieRating(release);   
                                }        
                            });
                        });  
                    });

            // CLOSE POPUP
                let closeBtn = document.querySelector(`#btn-${movie.id}`);
                closeBtn.addEventListener("click", () => {
                    popupBox.style.display = "none";
                });  
            
            // PUSH MOVIE TO ARRAY      
                movieNames.push(movie);
                        
        }); //END OF "MOVIES"
    }; // END OF ADD MOVIE FUNCTION

// GET CURRENTLY PLAYING MOVIES
    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=b816687edc67d6b0d9bd7c383f188f2f&language=en-US&region=US&page=1")
        .then((res) => res.json())
        .then((data) => {
        movies = data.results
        addMovies(movies);
        });
     
})();



         





