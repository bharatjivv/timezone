document.addEventListener('DOMContentLoaded', function(){

    let latitude;
    let longitude;

    //Here I am checking for location permission.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            const apiUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=69f9453b8282422a900b5913401bd4a0`;

            const requestOptions = {
                method: 'GET',
            };

            fetch(apiUrl, requestOptions)
                .then(response => response.json())
                .then(data => {
                    let main_box1 = document.querySelector('.main_box1');
                    main_box1.innerHTML = ``;

                    const feature = data.features[0];

                    const timezoneName = feature.properties.timezone.name;
                    const offsetSTD = feature.properties.timezone.offset_STD;
                    const offsetSTDSeconds = feature.properties.timezone.offset_STD_seconds;
                    const offsetDST = feature.properties.timezone.offset_DST;
                    const offsetDSTSeconds = feature.properties.timezone.offset_DST_seconds;
                    const country = feature.properties.country;
                    const postcode = feature.properties.postcode;
                    const city = feature.properties.state;

                    main_box1.innerHTML += `
                        <p class="normal_text1">Name Of Time Zone : ${timezoneName}</p>
                        <div class="longi_latitu">
                            <p class="normal_text1 lat">Lat: ${latitude}</p>
                            <p class="normal_text1">Long: ${longitude}</p>
                        </div>
                        <p class="normal_text1">Offset STD: ${offsetSTD}</p>
                        <p class="normal_text1">Offset STD Seconds : ${offsetSTDSeconds}</p>
                        <p class="normal_text1">Offset DST : ${offsetDST}</p>
                        <p class="normal_text1">Offset DST Seconds: ${offsetDSTSeconds}</p>
                        <p class="normal_text1">Country: ${country}</p>
                        <p class="normal_text1">Postcode: ${postcode}</p>
                        <p class="normal_text1">City: ${city}</p>
                    `;
                })
                .catch(error => console.error('Error fetching data:', error));
        },
        (error) => {
            console.error("Error getting user's location:", error.message);
        });
    }
});

function submitAddress() {
    var address = document.getElementById('address').value;
    if(address.length === 0){
        let erroe_txt = document.querySelector('.error_text');
        erroe_txt.style.display = 'block'
    }
    else{
        fetch(`https://api.geoapify.com/v1/geocode/search?text=${address}&lang=en&limit=20&format=json&apiKey=9bce4d721a054b1fb202570fbb83599b`)
        .then(response => response.json())
        .then(result => {
            let erroe_txt = document.querySelector('.error_text');
            erroe_txt.style.display = 'none'

            let timezoneName = result.results[0].timezone.name;
            let lat = result.results[0].lat;
            let long = result.results[0].lon;
            let offset_STD = result.results[0].timezone.offset_STD;
            let offset_STD_seconds = result.results[0].timezone.offset_STD_seconds;
            let offset_DST = result.results[0].timezone.offset_DST;
            let offset_DST_seconds = result.results[0].timezone.offset_DST_seconds;
            let country = result.results[0].country;
            let postcode = result.results[0].state_code;
            let city = result.results[0].city;
            
            let main_box2 = document.querySelector('.main_box2');
            main_box2.style.display = `flex`;

                main_box2.innerHTML = `
                <p class="normal_text2">Name Of Time Zone : ${timezoneName}</p>
                <div class="longi_latitu">
                    <p class="normal_text2 lat">Lat: ${lat}</p>
                    <p class="normal_text2">Long: ${long}</p>
                </div>
                <p class="normal_text2">Offset STD: ${offset_STD}</p>
                <p class="normal_text2">Offset STD Seconds : ${offset_STD_seconds}</p>
                <p class="normal_text2">Offset DST : ${offset_DST}</p>
                <p class="normal_text2">Offset DST Seconds: ${offset_DST_seconds}</p>
                <p class="normal_text2">Country: ${country}</p>
                <p class="normal_text2">Postcode: ${postcode}</p>
                <p class="normal_text2">City:${city}</p>
                `
        })
        .catch(error => console.log('error', error));
      
    }
}

