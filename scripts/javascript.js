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

// had this here just for a cool fade effect while elements load in, definitely need to fix up later
setTimeout(Fade, 1000)

function Fade() {
    document.querySelector('body').style.opacity = '1'
}

function streetFood() {
    var url = 'https://open-darwin.opendata.arcgis.com/datasets/6d6453a83bbc4ab8b7591e545dd40d65_0.geojson'

    // Send request to server
    fetch(url)
        // Get JSON object from request
        .then((response) => response.json())
        .then((data) => {

            for (let i = 0; i < data.features.length; i++) {




                var vendor = data.features[i].properties.BusinessName
                // so for some reason it isn't picking up duplicates with an if function, need to check that it's iterating
                //through the data correctly
                
                if (vendor == "Ken’s Crepes Mindil") {
                  
                  //vendor = "Ken's Crepes Mindil"
                  var KCM = [i]
        
                  data.features[KCM].properties.BusinessName = "Ken's Crepes Mindil"
                          
                }
                else {
                  
                  if (vendor == "Noi Pad Thai") {
                    
                    var NPT= [i]
                              
                    data.features[NPT].properties.BusinessName = "Noi Pad Thai"
                    
                  }
                  else {
                    
                    
                    // chuck all the code in here
                    
                  
                // check for and remove duplicates

                    var vendorName = data.features[i].properties.BusinessName
                    document.querySelector('#vendors').innerHTML +=

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
                    </div>
                        `
                }
            }
        }})
}