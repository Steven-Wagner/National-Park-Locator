

function clickSubmit () {
    $('form').submit(event => {
        event.preventDefault();
        let locations = $('#states').val();
        let max = $('#max').val();
        let locationsArray = parseLocations(locations)
        fetchData (locationsArray, max);

    })
}

function parseLocations (locations) {
    let locationsArray = locations.split(',');
    console.log(locationsArray);
    return locationsArray;
}

function fetchData (locationsArray, max) {
    let url = makeUrl(locationsArray, max);
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
              }
              throw new Error(response.statusText);
        })
        .then(responseJson=> {
            displayResults(responseJson);
        })
        .catch(err => {alert(`${err.message}`)
        })
}

function makeUrl (locationsArray, max=10) {
    let url = 'https://api.nps.gov/api/v1/parks?api_key=zYesSDaABpfAzyeNFT0QL85npASdkIGCP4mDfib2&stateCode=';
    url += encodeURIComponent(locationsArray.join(','))
    url += `&limit=${max-1}`;
    console.log(url);
    return url;
}

function displayResults (responseJson) {
    parkList = responseJson.data;
    htmlChanges = '';

    for (i=0; i<parkList.length; i++) {
        let fullName = responseJson.data[i]['name'];
        let description = responseJson.data[i]["description"];
        let website = responseJson.data[i]["url"];
        htmlChanges += `<li><h3>${fullName}</h3><p>${description}</p><a href=${website}>${website}</a>`;
    }
    console.log(htmlChanges);
    $('.results').html(htmlChanges);
}

/*function getLatLong(responseJson) {
    latLongArray = [];
    parkList = responseJson.data
    for (i=0; i<parkList.length; i++) {
        let latLong = responseJson.data[i]["latLong"];
        if (latLong == '') {
            latLongArray.push(['30.610487','-96.327766']); this is just to test must change
            break;
        }
        let arrayCord = latLong.split(', ')
        let lat = arrayCord[0].slice(4);
        console.log(lat);
        let long = arrayCord[1].slice(5);
        latLongArray.push([lat,long])
        console.log(latLongArray);
    }
    return (latLongArray);
}

function fetchAddress (latLongArray, parkData) {
    console.log(`fetchAddressStart ${parkData}`);
    latLongArray.forEach((cord, index) => {
        let lat = cord[0];
        let long = cord[1];
        let address = getAddress (lat, long, responseJson, index);
        urlAddress = `http://geoservices.tamu.edu/Services/ReverseGeocoding/WebService/v04_01/HTTP/default.aspx?apiKey=b440b0b90d2642b3abd1885ae2b7fcca&version=4.10&lat=${lat}&lon=${long}&format=json`;
        console.log(cord);
        fetch(urlAddress)
            .then(response => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJson => {
                console.log(`then address ${responseJson}`);
                let address = responseJson.StreetAddresses.StreetAddress;
                return address += ` ${responseJson.StreetAddresses.City}, ${responseJson.StreetAddresses.State}, ${responseJson.StreetAddresses.Zip}`;
            })
            .then((parkData,address) => {
                parkData.data[index]["address"] = address;

            })
            .catch(err => {alert(`${err.message}`)
            })
    })
}*/

$(clickSubmit);