
function streetFood () {
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
};

// get user location
navigator.geolocation.getCurrentPosition(
  function (position) {
    console.log('Success', position)
  },
  function (err) {
    console.error('Error', err)
  }
)

// now i can write some code  below to extract vendor long/lat then code to work out distance between user, thinking that
// I may need to import the arcgis map into Google Maps API though.

// google map api key AIzaSyBmtHVjZc_Jh5Jx8WWQqZKKhbu90KwrqgE
var map
function initMap () {
  // The location of Uluru
  var uluru = { lat: -25.344, lng: 131.036 }
  // The map, centered at Uluru
  var map = new google.maps.Map(
    document.getElementById('map'), { zoom: 4, center: uluru })
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({ position: uluru, map: map })
}
