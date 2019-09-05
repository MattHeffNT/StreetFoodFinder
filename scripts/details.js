function details() {
    var url = 'https://opendata.arcgis.com/datasets/f62cbfbf11494495984097ef8ed6a8a9_0.geojson'
        // Send request to server
    fetch(url)
        // Get JSON object from request
        .then((response) => response.json())
        .then((data) => {
            var i = localStorage.getItem('key');


            data.features[i].properties.Name
                // if it matches, this specific item should be skipped
            var vendorName = data.features[i].properties.Name
            document.querySelector('.display-4').innerHTML = `${vendorName}`

            // Append vendors as card view with placeholder images in container
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