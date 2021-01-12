<template>
    <div>
        Results for {{ label }}, {{ lat }}, {{ lng }}<br>
        <ul>
            <li v-for="home in homes" :key="home.objectID">
                {{ home.title }}
            </li>
        </ul>
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
};
</script>
