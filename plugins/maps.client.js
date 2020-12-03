export default function mapsClientPlugin(ctx, inject) {
    let mapLoaded = false;
    let mapWaiting = null;

    function initMap() {
        mapLoaded = true;
        if (mapWaiting) {
            const { el, lat, lng } = mapWaiting;
            renderMap(el, lat, lng);
            mapWaiting = null;
        }
    }

    function addScript() {
        const scriptId = 'google-map';
        if (document.getElementById(scriptId)) {
            return;
        }
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB60VH0MAvjfVEp8z-LABobagRAUsc5UWc&libraries=places&callback=initMap';
        script.async = true;
        window.initMap = initMap;
        document.head.appendChild(script);
    }

    function renderMap(el, lat, lng) {
        const { maps } = window.google;
        const mapOptions = {
            zoom: 18,
            center: new maps.LatLng(lat, lng),
            disableDefaultUI: true,
            zoomControls: true,
        };
        const map = new maps.Map(el, mapOptions);
        const position = new maps.LatLng(lat, lng);
        const marker = new maps.Marker({ position });
        marker.setMap(map);
    }

    function showMap(el, lat, lng) {
        addScript();
        if (mapLoaded) {
            renderMap(el, lat, lng);
        } else {
            mapWaiting = { el, lat, lng };
        }
    }

    inject('maps', { showMap });
}