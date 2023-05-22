//api key: b816687edc67d6b0d9bd7c383f188f2f
//link (now playing): https://api.themoviedb.org/3/movie/now_playing?api_key=b816687edc67d6b0d9bd7c383f188f2f&language=en-US&page=1
//xx certifications url: https://api.themoviedb.org/3/certification/movie/list?api_key=b816687edc67d6b0d9bd7c383f188f2f
//xx img link : https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=b816687edc67d6b0d9bd7c383f188f2f&language=en-US
//rating and release: https://api.themoviedb.org/3/movie/${movie.id}/release_dates?api_key=b816687edc67d6b0d9bd7c383f188f2f
    // "iso_3166_1": "US", certification
//cast url: https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=b816687edc67d6b0d9bd7c383f188f2f&language=en-US
//images: https://image.tmdb.org/t/p/w500/${movie.poster-path}

//movies.forEach(movie => { console.log("Movie ISO: " + movie.iso_3166_1); movie.release_dates.forEach(release_date => { console.log("Certification: " + release_date.certification); console.log("Descriptors: " + release_date.descriptors); }); });









    
    



// const addMovieInfo = (movies) => {
//     const movieInfo = document.querySelector('.popup-content');
//     movies.forEach((movie) => {
//         let itemPopup = 
//             `<div id="popup-${movie.id}">
//             <button class="close-popup">
//             X
//       </button>
//                 <div class= "popup-header">
//                     <h3>${movie.title}</h3>
//                 </div>
//             </div>`;
//     movieInfo.insertAdjacentHTML("beforeend", itemPopup);

//     });
    
// }


!(function () {
    //Add Movies to Doc
const addMovies = (movies) => {
    const movieImg = document.querySelector('#movies-container');
    
    movies.forEach((movie, movieCast) => {
        let item =
            `<div class = "poster-container" id = "movie-${movie.id}">
                    <img class="movie-poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.original_title} movie poster">
                    <h3 class="movie-name">${movie.original_title}</h3>      
                </div> 
                <div class="popup-container" id="popup-${movie.id}">
                    <div class="popup-content" id="popupInfo-${movie.id}">
                        <button class = "close-popup" id = "btn-${movie.id}">
                            X
                        </button> 
                        <h3 class="popup-title">${movie.original_title}</h3>
                        <p>Release Date: ${movie.release_date}</p>
                        <h4>Overview</h4>
                        <p>${movie.overview}</p>
                        <h4>Cast:</h4>

                    </div>
            </div>`;

            const addMovieInfo = (movieInfo) => {  
                movieInfo.slice(0, 10).forEach((movieCast) => {
                    
                        let cast = 
                            `<p>${movieCast.character}:   ${movieCast.name}</p>`;
                            let addCast = document.querySelector(`#popupInfo-${movie.id}`)
                            addCast.insertAdjacentHTML("beforeend", cast);
                    
                });                     
            };
    
            movieImg.insertAdjacentHTML("beforeend", item);  
            let popupBox = document.querySelector(`#popup-${movie.id}`)
            popupBox.style.display = "hidden";
            let posterContainer = document.querySelector(`#movie-${movie.id}`)
            posterContainer.addEventListener("click", () => {
                //console.log(`clicked! ${movie.id}`)
                popupBox.style.display = "block";

                fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=b816687edc67d6b0d9bd7c383f188f2f&language=en-US`)
                    .then((res) => res.json())
                    .then((data) => {
                    const movieInfo = data.cast;
                    addMovieInfo(movieInfo);
                    
                });
            })
            let closeBtn = document.querySelector(`#btn-${movie.id}`);
            closeBtn.addEventListener("click", () => {
                //console.log(`close me ${movie.id}`)
                popupBox.style.display = "none";
            });

            

            
            

    });
};


    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=b816687edc67d6b0d9bd7c383f188f2f&language=en-US&region=US&page=1")
    .then((res) => res.json())
    .then((data) => {
      const movies = data.results
      addMovies(movies);
    });

     
})();

/* <div id = "popup-box${movie.id}" class="popup-box">
            <div class="popup-content">
                <button id="close-popup">
                      X
                </button>
                <div id="movie-header">
                    <h3>${movie.original_title}</h3>
                    <p>Rating: PG</p>
                    <p>Release Date: ${movie.release_date}</p>
                </div>
                <div id="movie-info">
                    <h4>Overview: </h4>
                    <p>${movie.overview}</p>
                    <h4>Director:</h4>
                    <h4>Cast:</h4>
                </div>
            </div>
        </div> */

         





