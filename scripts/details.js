
function details () {
  // Send request to server
  var url = 'https://open-darwin.opendata.arcgis.com/datasets/6d6453a83bbc4ab8b7591e545dd40d65_0.geojson'
  fetch(url)

  // Get JSON object from request

    .then((response) => response.json())
    .then((data) => {
      var i = sessionStorage.getItem('key')

      // put JSON properties into variables for easier use
      var vendorName = data.features[i].properties.BusinessName
      var vendorLocation = data.features[i].properties.SiteName
      var vendorWeHours = data.features[i].properties.WeekendHours
      var vendorWdHours = data.features[i].properties.WeekdaysHours
      var vendorPhHours = data.features[i].properties.PublicHolHours
      var vendorWeb = data.features[i].properties.Website
      var vendorLat = data.features[i].geometry.coordinates[1]
      var vendorLong = data.features[i].geometry.coordinates[0]

      var vendorLatLng = { lat: vendorLat, lng: vendorLong }


      document.querySelector('.display-4').innerHTML = `
                ${vendorName}
                `
      document.getElementById('body-container').innerHTML = `<ul style="list-style:none;">
               <li><strong> Location: </strong>${vendorLocation}</li>
                <li><strong> Weekend Hours: </strong>${vendorWeHours}</li>
                <li><strong> Weekday Hours: </strong>${vendorWdHours}</li>
                <li><strong> Public Holidy Hours: </strong>${vendorPhHours}</li>            
                <li style="text-align:center;"><a class="btn btn-primary" href=${vendorWeb} role="button">Website</a></li>
                
                </ul>
                `
    })
  }

function initMap() {


  var url = 'https://open-darwin.opendata.arcgis.com/datasets/6d6453a83bbc4ab8b7591e545dd40d65_0.geojson'

  // Send request to server
  fetch(url)
    // Get JSON object from request
    .then((response) => response.json())
    .then((data) => {
      var i = sessionStorage.getItem('key')

      // put JSON properties into variables for easier use
      var vendorLat = data.features[i].geometry.coordinates[1]
      var vendorLong = data.features[i].geometry.coordinates[0]
      var vendorLatLng = {
        lat: vendorLat,
        lng: vendorLong
      }

      var navOptions = {
        enableHighAccuracy: true,
        timeout: 5000
      }

      function nothing() {
        console.log('literally nothing')
      }
      navigator.geolocation.getCurrentPosition(Position, nothing, navOptions)

      // get user location
      function Position(position) {
        lat = position.coords.latitude
        long = position.coords.longitude

        // directions API

        var userLatLng = {
          lat: lat,
          lng: long
        }

        var origin = new google.maps.LatLng(lat, long) // place user location here
        var destination = new google.maps.LatLng(vendorLat, vendorLong) // vendor location

        var directionsService = new google.maps.DirectionsService()

        // added option to get rid of default markers with directions api
        var directionsRenderer = new google.maps.DirectionsRenderer();

 


        var mapOptions = {
          zoom: 14,
          center: origin,
          disableDefaultUI: true
        }



        var map = new google.maps.Map(document.getElementById('map'), mapOptions)
        //console.log("added map")

        directionsRenderer.setMap(map)

        var origin = new google.maps.LatLng({
          lat: lat,
          lng: long
        }) // place user location here
        var destination = new google.maps.LatLng({
          lat: vendorLat,
          lng: vendorLong
        }) // vendor location

        calcRoute()

        function calcRoute() {
          var request = {
            origin: origin,
            destination: destination,
            travelMode: 'DRIVING'
          }
          directionsService.route(request, function (result, status) {
            if (status == 'OK') {
              directionsRenderer.setDirections(result)
            }
          })
        }
      }

    })
}
