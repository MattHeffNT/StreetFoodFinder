if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

<<<<<<< HEAD
// This function pulls in the JSON file from Darwin City council then gives each business object a variable

function streetFood () {
  var url = 'https://opendata.arcgis.com/datasets/f62cbfbf11494495984097ef8ed6a8a9_0.geojson'
  // Send request to server
  fetch(url)
    // Get JSON object from request
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.features.length; i++) {
        // Append vendors to container-fluid list
        this['vendor' + [i]] = [data.features[i].properties]
        document.querySelector('.carousel-caption d-none d-md-block').innerHTML += this.vendor[i].properties.Name
      }
    })
=======
function streetFood() {
    var url = 'https://opendata.arcgis.com/datasets/f62cbfbf11494495984097ef8ed6a8a9_0.geojson'
        // Send request to server
    fetch(url)
        // Get JSON object from request
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.features.length; i++) {
                // Append vendors to container-fluid list
                document.querySelector('.container-fluid').innerHTML += `<ul><li>` + (data.features[i].properties.Name) + `</ul>`
            }
        })
>>>>>>> 06f3663c5b4b64391f68bb30819d6c30d826f634
};

// get user location
navigator.geolocation.getCurrentPosition(
<<<<<<< HEAD
  function (position) {
    console.log('Success', position)
    console.log(position.coords.longitude)
  },
  function (err) {
    console.error('Error', err)
  }
=======
    function(position) {
        console.log('Success', position)
    },
    function(err) {
        console.error('Error', err)
    }
>>>>>>> 06f3663c5b4b64391f68bb30819d6c30d826f634
)

// now i can write some code  below to extract vendor long/lat then code to work out distance between user, thinking that
// I may need to import the arcgis map into Google Maps API though.

// google map api key AIzaSyBmtHVjZc_Jh5Jx8WWQqZKKhbu90KwrqgE
var map
<<<<<<< HEAD
function initMap () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  })
}
=======

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    })
}

// Service worker
>>>>>>> 06f3663c5b4b64391f68bb30819d6c30d826f634
