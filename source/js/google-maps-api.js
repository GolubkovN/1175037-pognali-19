function initMap() {
  var pos = {lat: 59.938891, lng: 30.323126}
  var opt = {
    center: pos,
    zoom: 17,
  };

  var myMap = new google.maps.Map(document.getElementById("map"), opt);

  var marker = new google.maps.Marker({
    position: pos,
    map: myMap,
    title: "Здесь мы находимся",
    icon: {
      url: "../img/map-marker.svg",
      scaledSize: new google.maps.Size(30, 30)
    }
  });

  var infoWindow = new google.maps.infoWindow({
    content: "<h1>Погнали?</h1>"
  });

  marker.addEventListener("click", function() {
    infoWindow.open(myMap, marker);
  });
}
