var startLoc = $("#startloc").val();
var endLoc = $("#endloc").val();
var startLat = 27.0238;
var startLng = 74.2179;

if ((startLoc).trim() !== "") {
    var startLocArr = startLoc.split(",");
    startLat = parseFloat(startLocArr[0]);
    startLng = parseFloat(startLocArr[1]);

}

//let directionsService;
//let path;
//let poly;



function initMap() {
    console.log("initmap");
    var options = {
        zoom: 16,
        center: { lat: startLat, lng: startLng },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("map"), options);
    var tripid = $("#tripid").val();
    $.post('/Trip/AjaxTriplogFromTripid/', { tripid: tripid }, function (dataStr) {
        if (dataStr !== "") {
            var logData = JSON.parse(dataStr);
            if (logData.length > 0) {
                var startdata = logData[0];
                addMarker({ lat: startdata.lat, lng: startdata.lng }, "S");

                var enddata = logData[logData.length - 1];
                addMarker({ lat: enddata.lat, lng: enddata.lng }, "E");
            }
            //path = new google.maps.MVCArray();
            var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7', path: logData });
        }

    });

    function addMarker(coords,label) {
        var marker = new google.maps.Marker({
            position: coords,
            map: map,
            label:label
        });
    }
}




//function initMap() {
//    console.log("initmap");
//    var options = {
//        zoom: 16,
//        center: { lat: startLat, lng: startLng }
        
//    }
//    let map = new google.maps.Map(document.getElementById("map"), options);
//    //var myLatlng = new google.maps.LatLng(startLat, startLng);
//    //console.log(myLatlng);

//    var tripid = $("#tripid").val();
//    $.post('/Trip/AjaxTriplogFromTripid/', { tripid: tripid }, function (dataStr) {
//        var logData = JSON.parse(dataStr);
//        //var lat_lng = new Array();
//        //for (i = 0; i < logData.length; i++) {
//        //    var data = logData[i];
//        //    var myLatlng = new google.maps.LatLng(data.lat, data.lng);
//        //    lat_lng.push(myLatlng);
//        //}
//        if (logData.length > 0) {
//            debugger
//            var data = logData[0];
//            addMarker({ lat: data.lat, lng: data.lng });
//        }

//         path = new google.maps.MVCArray();
//         poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7', path: logData });

        
//         function addMarker(coords) {
//             var marker = new google.maps.Marker({
//                 position: coords,
//                 map: map
//             });
//         }
//         //directionsService = new google.maps.DirectionsService();
//         ////directionsDisplay = new google.maps.DirectionsRenderer();
//         ////directionsDisplay.setMap(map);

//         //for (var i = 0; i < lat_lng.length; i++) {
//         //    if ((i + 1) < lat_lng.length) {
//         //        var src =lat_lng[i];
//         //        var des =lat_lng[i + 1];
//         //        console.log("src:" + src);
//         //        console.log("des:" + des);
//         //        path.push(src);
//         //        poly.setPath(path)
//         //        calcRoute(src,des);
//         //    }
//         //}
        
//    });
//}



//function calcRoute(start,destination) {
//    let request = {
//        origin: start,
//        destination: destination,
//        travelMode: google.maps.TravelMode.DRIVING
//    };
//    directionsService.route(request, function (result, status) {
//        if (status=="OK") {
//             //directionsDisplay.setDirections(result);
//            for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
//                path.push(result.routes[0].overview_path[i]);
//            }
//        }
//    })
//}