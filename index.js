//api key: b816687edc67d6b0d9bd7c383f188f2f
//link (now playing): https://api.themoviedb.org/3/movie/now_playing?api_key=b816687edc67d6b0d9bd7c383f188f2f&language=en-US&page=1
//xx certifications url: https://api.themoviedb.org/3/certification/movie/list?api_key=b816687edc67d6b0d9bd7c383f188f2f
//xx img link : https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=b816687edc67d6b0d9bd7c383f188f2f&language=en-US
//rating and release: https://api.themoviedb.org/3/movie/${movie.id}/release_dates?api_key=b816687edc67d6b0d9bd7c383f188f2f
    // "iso_3166_1": "US", certification
//cast url: https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=b816687edc67d6b0d9bd7c383f188f2f&language=en-US
//images: https://image.tmdb.org/t/p/w500/${movie.poster-path}

//movies.forEach(movie => { console.log("Movie ISO: " + movie.iso_3166_1); movie.release_dates.forEach(release_date => { console.log("Certification: " + release_date.certification); console.log("Descriptors: " + release_date.descriptors); }); });

(async function () {

    try {
        const response = await axios.request({
          method: "GET",
          url: "https://api.themoviedb.org/3/movie/now_playing?api_key=b816687edc67d6b0d9bd7c383f188f2f&language=en-US&page=1",
        });






    } catch (err) {
        console.error(err);
      }
})();




//Popup box
const popupBtn = document.querySelector('.poster-container')

popupBtn.addEventListener("click", () => {
    console.log("clicked")
})


