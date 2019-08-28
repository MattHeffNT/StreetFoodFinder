
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

window.alert("note to self, make sure to add margin-top: -1px so that the map and the vendor list don't have a weird gap")

// get user location
navigator.geolocation.getCurrentPosition(
  function (position) {
    console.log('Success', position)
    console.log(position.coords.longitude)
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
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  })
}
