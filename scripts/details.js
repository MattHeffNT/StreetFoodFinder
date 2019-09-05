function details() {
    var url = 'https://opendata.arcgis.com/datasets/f62cbfbf11494495984097ef8ed6a8a9_0.geojson'
        // Send request to server
    fetch(url)
        // Get JSON object from request
        .then((response) => response.json())
        .then((data) => {
            var i = sessionStorage.getItem('key')

            data.features[i].properties.Name
                // if it matches, this specific item should be skipped
            var vendorName = data.features[i].properties.Name
            var vendorLocation = data.features[i].properties.Location
            var vendorHours = data.features[i].properties.Open_Times_Description
            var vendorWeb = data.features[i].properties.Website
            var vendorLat = data.features[i].properties.CENTROID_Y
            var vendorLong = data.features[i].properties.CENTROID_X

            document.querySelector('.display-4').innerHTML = `
                ${vendorName}
                `
            document.getElementById('body-container').innerHTML = `<ul style="list-style:none;">
               <li><strong> Location: </strong>${vendorLocation}</li>
                <li><strong> Opening Hours: </strong>${vendorHours}</li>
                <li><strong>Website: </strong><a href=${vendorWeb}>${vendorWeb}</a></li>
                </ul>
                `



            navigator.geolocation.getCurrentPosition(
                    // get user location
                    function(position) {


                        latlng = new L.LatLng(position.coords.latitude, position.coords.longitude)
                        console.log(vendorLat)
                            //console.log('this is the user poisiton ' + latlng)


                        // leaflet Map
                        var mymap = L.map('mapid').setView([vendorLat, vendorLong], 13);
                        var markerUser = L.marker(latlng).addTo(mymap)
                        var markerVendor = L.marker([vendorLat, vendorLong]).addTo(mymap)
                            .bindPopup(`${vendorName}`).openPopup();

                        const attribution =
                            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
                        const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
                        const tiles = L.tileLayer(tileUrl, { attribution });

                        tiles.addTo(mymap)

                    },
                    function(err) {
                        console.error('Error', err)
                    }
                )
                // leaflet Map
                //   console.log('vendor location: ' + vendorLat + ' ' + vendorLong)
                //   console.log('this is the user poisiton ' + latlng)

            //   var mymap = L.map('mapid').setView(vendorLat, vendorLong, 13)

            //   var markerUser = L.marker(latlng).addTo(mymap)

            //   var markerVendor = L.marker(vendorLat, vendorLong)

            //   L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            //     maxZoom: 18,
            //     id: 'mapbox.streets',
            //     accessToken: 'pk.eyJ1IjoibWF0dGhlZmZudCIsImEiOiJjazA2YmM4bGowMmg4M21xcWVzb2Y3eW8wIn0.1ukk1zb7tzGLn7v6hfbF5g'
            //   }).addTo(mymap)
        })
}