const apiKey = process.env.GOOGLE_MAPS_API_KEY;

export default function mapsClientPlugin(ctx, inject) {
    function addScript() {
        window.initMapPromise = new Promise((resolve, reject) => {
            const scriptId = 'google-map';
            if (document.getElementById(scriptId)) {
                window.initMapPromise.then(resolve, reject);
                return;
            }
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
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

    function renderMap(el, lat, lng, markers) {
        const { maps } = window.google;
        const mapOptions = {
            zoom: 18,
            center: new maps.LatLng(lat, lng),
            disableDefaultUI: true,
            zoomControls: true,
        };
        const map = new maps.Map(el, mapOptions);

        if (markers) {
            const bounds = new window.google.maps.LatLngBounds();
            markers.forEach((home) => {
                const position = new maps.LatLng(home.lat, home.lng);
                const marker = new maps.Marker({ position });
                marker.setMap(map);
                bounds.extend(position);
            });
            map.fitBounds(bounds);
        } else {
            const position = new maps.LatLng(lat, lng);
            const marker = new maps.Marker({ position });
            marker.setMap(map);
        }
    }

    async function showMap(el, lat, lng, markers) {
        await addScript();
        renderMap(el, lat, lng, markers);
    }

    async function initAutoComplete(inputEl) {
        await addScript();
        const autoComplete = new window.google.maps.places.Autocomplete(inputEl, {
            types: ['(cities)'],
        });
        autoComplete.addListener('place_changed', () => {
            const place = autoComplete.getPlace();
            inputEl.dispatchEvent(new CustomEvent('selected', {
                detail: { place },
            }));
        });
        return autoComplete;
    }

    inject('maps', {
        showMap,
        initAutoComplete,
    });
}
