
function details () {
  // Send request to server
  var url = 'https://open-darwin.opendata.arcgis.com/datasets/6d6453a83bbc4ab8b7591e545dd40d65_0.geojson'



  document.querySelector('#map').style.display = 'block'

  
  history.pushState('details',"details","/details")

    fetch(url)

  // // Get JSON object from request
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

      let state = { 
        innerHTML: `      
        <h1> ${vendorName} </h1>
        <ul style="list-style:none;">
         <li><strong> Location: </strong>${vendorLocation}</li>
          <li><strong> Weekend Hours: </strong>${vendorWeHours}</li>
          <li><strong> Weekday Hours: </strong>${vendorWdHours}</li>
          <li><strong> Public Holidy Hours: </strong>${vendorPhHours}</li>
    
        </ul>`
      };

      
      document.querySelector('#vendors').innerHTML = state.innerHTML


      window.onpopstate = function(event) {
        console.log("Location: " + this.document.location + ", State" + this.JSON.stringify(event.state))
            
            if (event.state) {
              {state.innerHTML = event.state;} 
              console.log(event.state)
            }

            document.querySelector('#vendors').innerHTML = ``
      
            Home();
      
      };
    

                
    }
  )



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
       var lat = position.coords.latitude
       var long = position.coords.longitude

        // directions API

        var userLatLng = {
          lat: lat,
          lng: long
        }

        var origin = new google.maps.LatLng(lat, long); // place user location here


        var destination = new google.maps.LatLng(vendorLat, vendorLong); // vendor location

        var directionsService = new google.maps.DirectionsService();

        // added option to get rid of default markers with directions api

        var directionsRenderer = new google.maps.DirectionsRenderer();


        var mapOptions = {
          zoom: 14,
          center: origin,
          disableDefaultUI: true
        }

        console.log(origin)


        var map = new google.maps.Map(document.querySelector('#map'), mapOptions)
      

        directionsRenderer.setMap(map);

        var origin = new google.maps.LatLng({ // place user location here
          lat: lat,
          lng: long
        }) 
        var destination = new google.maps.LatLng({ // vendor location
          lat: vendorLat,
          lng: vendorLong
        }) 

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

}};



