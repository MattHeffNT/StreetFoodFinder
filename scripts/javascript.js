if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope)
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err)
        })
    })
}

// This function pulls in the JSON file from Darwin City council then gives each business object a variable ooh and I just figured out template literals too so now they displaying data
// dynamically.

function streetFood() {
    var url = 'https://opendata.arcgis.com/datasets/f62cbfbf11494495984097ef8ed6a8a9_0.geojson'
        // Send request to server
    fetch(url)
        // Get JSON object from request
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.features.length; i++) {
                // check for and remove duplicates

                if (data.features[i].properties.Name == data.features[i + 1].properties.Name) {
                    // if it matches, this specific item should be skipped

                } else {



                    // put code in here.
                    var vendorName = data.features[i].properties.Name
                    document.querySelector('.container').innerHTML +=

                        // Append vendors as card view with placeholder images in container

                        `<div class = "row"
                              <div class="col-sm">
                      <!-- Card -->
                      <div class="card">

                        <!-- Card image -->
                        <div class="view overlay">

                        <!-- add Onclick add to session storage so as to record value of i for dynamic details page -->

                          <img class="card-img-top" src="https://source.unsplash.com/collection/139608/544x362/?${[i]}" alt="Card image">
                          <a href="#" onclick = " sessionStorage.setItem('key', '${[i]}'); console.log('success')">
                            <div class="mask rgba-white-slight"></div>
                          </a>
                        </div>

                        <!-- Card content -->
                        <div class="card-body">

                          <!-- Title -->
                          <h4 class="card-title">${vendorName}</h4>
                          <!-- Text -->
                          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                        </div>

                      </div>`



                }


            }


        })
}



// get user location
// navigator.geolocation.getCurrentPosition(
//     function(position) {
//         console.log('Success', position)
//         console.log(position.coords.longitude)
//     },
//     function(err) {
//         console.error('Error', err)
//     }
// )

// now i can write some code  below to extract vendor long/lat then code to work out distance between user, thinking that
// I may need to import the arcgis map into Google Maps API though.

// google map api key AIzaSyBmtHVjZc_Jh5Jx8WWQqZKKhbu90KwrqgE
// var map
// function initMap () {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8
//   })
// }