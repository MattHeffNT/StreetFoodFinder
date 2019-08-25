// fetch('https://opendata.arcgis.com/datasets/f62cbfbf11494495984097ef8ed6a8a9_0.geojson')
//   .then(response => {
//     return response.json()
//   })
//   .then(data => {
//     // Work with JSON data here
//     // i can start looping through all the names and stuff to then display it
//     console.log(data.features[0].properties.Name)
//   })

function streetFood () {
  var url = 'https://opendata.arcgis.com/datasets/f62cbfbf11494495984097ef8ed6a8a9_0.geojson'
  // Send request to server
  fetch(url)
    // Get JSON object from request
    .then((response) => response.json())
    .then((data) => {
      // Get our target element
    //   const list = document.querySelector('ul')
      // Clear old results
    //   list.innerText = ''
      // Iterate through each row
    //   console.log(data.features)
      // console.log(data.features.length)
      for (let i = 0; i < data.features.length; i++) {
        // Create HTML from row data
        // const listRow = (data.features[i].properties.Name)

        console.log(data.features[i].properties.Name)

        // Append HTML to  table HTML
        // list.innerText += listRow
      }
    })
};
