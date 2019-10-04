let dist;
let first_dist;

function success(pos) {
    let crd = pos.coords;

    let start_pos = { latitude: crd.latitude, longitude: crd.longitude };
    let end_pos;

    var req = new XMLHttpRequest();
    req.open("GET", "http://localhost:3000/api/test?latitude=" + crd.latitude + "&longitude=" + crd.longitude + "&time=" + 30, true);

    req.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            let res = JSON.parse(req.response);
            let base = res.target[0];
            end_pos = { latitude: base.t_latitude, longitude: base.t_longitude };
            console.log(end_pos);

            dist = window.geolib.getDistance(start_pos, end_pos);

            if (first_dist === undefined) {
                first_dist = dist;
            }

            let crd_div = document.getElementById("coords");
            let dist_div = document.getElementById("dist");

            crd_div.innerHTML
                = `Lat: ${crd.latitude} Long: ${crd.longitude} ${crd.accuracy}m`;
            dist_div.innerHTML
                = `Distance: ${dist}`;
        }
    }
    req.send();
}

function error(err) {
    alert(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
});