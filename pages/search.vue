<template>
    <div>
        Results for {{ label }}<br>
        <div ref="map" style="flost: right; width:400px; height:400px;" />
        <ul v-if="homes.length > 0">
            <li v-for="home in homes" :key="home.objectID">
                <HomeRow :home="home" />
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
        showMap() {
            this.$maps.showMap(this.$refs.map, this.lat, this.lng);
        },
    },
};
</script>
