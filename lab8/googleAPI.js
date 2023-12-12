let autocomplete;

function initAutocomplete(){
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('city-input'),
      {
        types: ['(cities)', ],
        fields: ['address_component', 'geometry']
        
      }
    );
    autocomplete.addListener('place_changed', onPlaceChanged)
  }

  function onPlaceChanged(){
    var place = autocomplete.getPlace()
    if (!place.geometry){
      // User did not select a prediction; reset the input field
      document.getElementById('city-input').placeholder = 'Enter a place'
      alert(`Couldn't find "${place.name}". Please enter a valid city name or select from the suggested list.`)
    } 
    else{
      // Display details about the valid place
        getCityInfoAsync(place.name)
    }
  }