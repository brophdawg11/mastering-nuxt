export default function mapsClientPlugin(ctx, inject) {

    function addScript() {
        window.initMapPromise = new Promise((resolve, reject) => {
            const scriptId = 'google-map';
            if (document.getElementById(scriptId)) {
                return window.initMapPromise.then(resolve, reject);
            }
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDSa2UMyIWLF5VlmG7w2lmq3UtxCj5Ic8A&libraries=places&callback=initMap';
            script.async = true;
            script.onerror = (e) => {
                script.parentNode.removeChild(script);
                reject(e);
            };
            window.initMap = resolve;
            document.head.appendChild(script);
        });
        return window.initMapPromise;
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

    async function showMap(el, lat, lng) {
        await addScript();
        renderMap(el, lat, lng);
    }

    async function initAutoComplete(inputEl, placeChangedCb) {
        await addScript();
        const autoComplete = new window.google.maps.places.Autocomplete(inputEl, {
            types: ['(cities)'],
        });
        autoComplete.addListener('place_changed', () => {
            const place = autoComplete.getPlace();
            inputEl.dispatchEvent(new CustomEvent('selected', {
                detail: { place }
            }));
        });
        return autoComplete;
    }

    inject('maps', {
        showMap,
        initAutoComplete,
    });
}