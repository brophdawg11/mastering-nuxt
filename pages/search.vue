<template>
    <div>
        Results for {{ label }}<br>
        <div ref="map" style="flost: right; width:400px; height:400px;" />
        <ul v-if="homes.length > 0">
            <li v-for="home in homes" :key="home.objectID">
                <NuxtLink :to="`/home/${home.objectID}`">
                    <HomeRow
                        :home="home"
                        @mouseover="highlightMarker(home.objectID, true)"
                        @mouseout="highlightMarker(home.objectID, false)" />
                </NuxtLink>
            </li>
        </ul>
        <div v-else>
            No results found
        </div>
    </div>
</template>

<script>
async function loadResults($api, query) {
    const { label, lat, lng } = query;
    const { data } = await $api.getHomesByLocation(lat, lng);
    return {
        label,
        lat,
        lng,
        homes: data,
    };
}

export default {
    async beforeRouteUpdate(to, from, next) {
        try {
            const { label, lat, lng, homes } = await loadResults(this.$api, to.query);
            this.label = label;
            this.lat = lat;
            this.lng = lng;
            this.homes = homes;
            this.showMap();
            next();
        } catch (e) {
            next(e);
        }
    },
    async asyncData({ query, $api }) {
        const { label, lat, lng, homes } = await loadResults($api, query);
        return {
            label,
            lat,
            lng,
            homes,
        };
    },
    head() {
        return {
            title: `Homes around ${this.label}`,
        };
    },
    mounted() {
        this.showMap();
    },
    methods: {
        highlightMarker(homeId, isHighlighted) {
            const el = document.getElementsByClassName(`home-${homeId}`)[0];
            el?.classList.toggle('marker-highlight', isHighlighted);
        },
        showMap() {
            const markers = this.homes.map((home) => ({
                // eslint-disable-next-line no-underscore-dangle
                ...home._geoloc,
                pricePerNight: home.pricePerNight,
                id: home.objectID,
            }));
            this.$maps.showMap(this.$refs.map, this.lat, this.lng, markers);
        },
    },
};
</script>

<style>
.marker {
    background: white;
    border: 1px solid lightgrey;
    border-radius: 20px;
    font-weight: bold;
    padding: 5px 8px;
}

.marker-highlight {
    color: white !important;
    background: black;
    border: 1px solid black;
}
</style>
