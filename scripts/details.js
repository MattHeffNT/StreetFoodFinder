function details() {
    var url = 'http://open-darwin.opendata.arcgis.com/datasets/6d6453a83bbc4ab8b7591e545dd40d65_0.geojson'
        // 'https://opendata.arcgis.com/datasets/f62cbfbf11494495984097ef8ed6a8a9_0.geojson'

    // Send request to server
    fetch(url)
        // Get JSON object from request
        .then((response) => response.json())
        .then((data) => {
            var i = sessionStorage.getItem('key')

            data.features[i].properties.Name
                // if it matches, this specific item should be skipped
            var vendorName = data.features[i].properties.BusinessName
            var vendorLocation = data.features[i].properties.SiteName
            var vendorWeHours = data.features[i].properties.WeekendHours
            var vendorWdHours = data.features[i].properties.WeekdaysHours
            var vendorPhHours = data.features[i].properties.PublicHolHours
            var vendorWeb = data.features[i].properties.Website
            var vendorLat = data.features[i].geometry[1]
            var vendorLong = data.features[i].geometry[0]
            var myLatLng = { lat: vendorLat, lng: vendorLong }

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

            navigator.geolocation.watchPosition(

                // get user location
                function(position) {
                    lat = position.coords.latitude
                    long = position.coords.longitude
                        // console.log(long)

                    // directions API

                    var directionsService = new google.maps.DirectionsService()
                    var directionsRenderer = new google.maps.DirectionsRenderer()

                    var origin = new google.maps.LatLng(lat, long) // place user location here
                    var destination = new google.maps.LatLng(vendorLat, vendorLong) // vendor location

                    var mapOptions = {
                        zoom: 14,
                        center: origin,
                        disableDefaultUI: true
                    }

                    var myLatLng = { lat: lat, lng: long };



                    var map = new google.maps.Map(document.getElementById('map'), mapOptions)
                    directionsRenderer.setMap(map)

                    var marker = new google.maps.Marker({
                        position: myLatLng,
                        map: map,
                        title: 'Hello World!'
                    })


                    // var selectedMode = Driving

                    var request = {
                        origin: origin,
                        destination: destination,
                        // Note that Javascript allows us to access the constant
                        // using square brackets and a string value as its
                        // "property."
                        travelMode: 'DRIVING'
                    };

                    directionsService.route(request, function(response, status) {
                        if (status == 'OK') {
                            directionsRenderer.setDirections(response)
                        }

                    })
                })
        })
}