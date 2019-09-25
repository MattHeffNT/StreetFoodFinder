if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js').then(function(registration) {
            // Registration was successful
            // console.log('ServiceWorker registration successful with scope: ', registration.scope)
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err)
        })
    })
}


// google maps code.....make sure to put placeholder here
// for if the browser app is offline.
function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -12.4634, lng: 130.8456 },
        zoom: 13,
        mapTypeId: 'roadmap',
        disableDefaultUI: true
    });

    navigator.geolocation.watchPosition(
        // get user location
        function(position) {
            lat = position.coords.latitude
            long = position.coords.longitude
        })

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

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
                    document.querySelector('#VendorList').innerHTML +=

                        // Append vendors as card view with placeholder images in container

                        `
                        <div class = "row"
                              <div class="col-sm">
                      <!-- Card -->
                      <div class="card">
                        <!-- Card image -->
                        <div class="view overlay">

                        <!-- add Onclick add to session storage so as to record value of i for dynamic details page -->

                          <img class="card-img-top" src="https://source.unsplash.com/collection/139608/544x362/?${[i]}" alt="Card image">
                          <a href="./details.html" onclick = " sessionStorage.setItem('key', '${[i]}'); ">
                            <div class="mask rgba-white-slight"></div>
                          
                        </div>

                        <!-- Card content -->
                        <div class="card-body">

                          <!-- Title -->
                          <h4 class="card-title">${vendorName}</h4>
                          <!-- Text -->
                          <p class="card-text"></p>

                        </div>
                        </a>
                      </div>`
                }
            }
        })
}