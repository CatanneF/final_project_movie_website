//api key: b816687edc67d6b0d9bd7c383f188f2f
//link (now playing): https://api.themoviedb.org/3/movie/now_playing?api_key=b816687edc67d6b0d9bd7c383f188f2f&language=en-US&page=1
//xx certifications url: https://api.themoviedb.org/3/certification/movie/list?api_key=b816687edc67d6b0d9bd7c383f188f2f
//xx img link : https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=b816687edc67d6b0d9bd7c383f188f2f&language=en-US
//rating and release: https://api.themoviedb.org/3/movie/${movie.id}/release_dates?api_key=b816687edc67d6b0d9bd7c383f188f2f
    // "iso_3166_1": "US", certification
//cast url: https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=b816687edc67d6b0d9bd7c383f188f2f&language=en-US
//images: https://image.tmdb.org/t/p/w500/${movie.poster-path}

//movies.forEach(movie => { console.log("Movie ISO: " + movie.iso_3166_1); movie.release_dates.forEach(release_date => { console.log("Certification: " + release_date.certification); console.log("Descriptors: " + release_date.descriptors); }); });

// SITE url: https://catannef.github.io/fin  al_project_movie_website/




!(function () {

//Searchbar
    const searchInput = document.querySelector("#query");
    const searchBtn = document.querySelector('#search-btn')
    const genreDropdown = document.querySelector('#genre'); 
    const ratingDropdown = document.querySelector('#rating')
    let movieNames = [];
    let movies;

    

    searchInput.addEventListener("input", (e) => {
        const value = e.target.value 
        movies = movieNames.filter((movie) => {
            return movie.original_title.includes(value)     
        });
        console.log(movies)    
    })
    //  searchBtn.addEventListener("click", (movies) => {
    //      addMovies(movies)
    //  });

     genreDropdown.addEventListener("change", () => {
        let genreResult = genreDropdown.value;
        console.log(genreResult)
        moviesGenre = movieNames.filter((movie) => {
            return movie.genre_ids.includes(genreResult)     
        });
        console.log(moviesGenre)
     });

     ratingDropdown.addEventListener("change", () => {
        let ratingResult = ratingDropdown.value;
        console.log(ratingResult);
     })
    


//Add Movies to Doc
    const addMovies = (movies) => {
        const movieImg = document.querySelector('#movies-container');
        
        movies.map((movie) => {
            let item =
                `<div class = "poster-container" id = "movie-${movie.id}">
                        <img class="movie-poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.original_title} movie poster">
                        <h3 class="movie-name">${movie.original_title}</h3>      
                </div> 
                    <div class="popup-container" id="popup-${movie.id}">
                        <div class="popup-content" id="popupInfo-${movie.id}">
                            <div class= "popup-header">
                                <button class = "close-popup" id = "btn-${movie.id}">
                                    X
                                </button> 
                                <h3 class="popup-title">${movie.original_title}</h3>
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
                            let addCast = document.querySelector(`#popupInfo-${movie.id}`)
                            addCast.insertAdjacentHTML("beforeend", cast);          
                    });                     
                };

                const addMovieRating = (release) => {
                    let cert = `<p class = "cert">Rating: ${release.certification}</p>`
                    let addRating = document.querySelector(`#release-${movie.id}`)
                    addRating.insertAdjacentHTML("afterbegin", cert);
                    
                }

            // INSERT MOVIE POSTERS/ NAME TO DOC
                movieImg.insertAdjacentHTML("beforeend", item);  

            //ADD POPUP BOX OF MOVIE INFO
                let popupBox = document.querySelector(`#popup-${movie.id}`)
                popupBox.style.display = "hidden";
                let posterContainer = document.querySelector(`#movie-${movie.id}`)
                posterContainer.addEventListener("click", () => {
                    //console.log(`clicked! ${movie.id}`)
                    popupBox.style.display = "block";

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
                            return movieR.iso_3166_1.includes("US")   
                        });
                        getMoviesCert.forEach((movieCert) => { 
                            movieCert.release_dates.slice(0,1).forEach((release) => {
                                console.log(release)
                            addMovieRating(release)
                            });

                        });   
                    });
                })
            // CLOSE POPUP
                let closeBtn = document.querySelector(`#btn-${movie.id}`);
                closeBtn.addEventListener("click", () => {
                    //console.log(`close me ${movie.id}`)
                    popupBox.style.display = "none";
                });    
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



         





