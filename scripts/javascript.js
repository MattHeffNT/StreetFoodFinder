if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').then(function (registration) {
      // Registration was successful
      // console.log('ServiceWorker registration successful with scope: ', registration.scope)
    }, function (err) {
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

function streetFood () {
  var url = 'https://open-darwin.opendata.arcgis.com/datasets/6d6453a83bbc4ab8b7591e545dd40d65_0.geojson'

  // Send request to server

  fetch (url)


    // Get JSON object from request
    .then((response) => response.json())
    .then((data) => {

      // should be able to use array map here

      

      for (let i = 0; i < data.features.length; i++) {


        var vendor = data.features[i].properties.BusinessName

        // hacky way of getting rid of duplicate names, need to consider method of fixing the issue with Ken's Crepes Mindil as
        // the ' is incorrect.....

       // console.log(vendor)

            var vendorName = data.features[i].properties.BusinessName
            const inject = document.querySelector('.swiper-wrapper').innerHTML +=

              `   
                  <!-- Card -->
                  <div class = "swiper-slide">
                    <div class="card">
                        <!-- Card image -->
                        <div class="view overlay">
                        <!-- add Onclick add to session storage so as to record value of i for dynamic details page -->
                        <img class="card-img-top" src=https://source.unsplash.com/collection/139608/544x362/?${[i]}" alt="Card image">
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
                  </div>
                    
                        `
          }
        }
      )
    }
