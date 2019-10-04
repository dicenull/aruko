let dist;
let first_dist;
let end_pos;

window.onload = function () {
    let res = JSON.parse(req.response);
    let bindings = res.results.bindings;

    let base = bindings[Math.random() * Object.keys(bindings).length | 0];
    console.log(base);
    end_pos = { latitude: base.lat.value, longitude: base.lng.value };
};

function success(pos) {
    let crd = pos.coords;

    let start_pos = { latitude: crd.latitude, longitude: crd.longitude };

    var req = new XMLHttpRequest();
    req.open("GET", "https://ea9e0fcb.ngrok.io/api/test?latitude=" + crd.latitude + "&longitude=" + crd.longitude + "&time=" + 30, true);

    req.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            dist = window.geolib.getDistance(start_pos, end_pos);

            if (first_dist === undefined) {
                first_dist = dist;
            }

            // 緯度経度と距離をデバック表示
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