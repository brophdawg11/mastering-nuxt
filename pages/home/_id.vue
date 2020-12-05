<template>
    <div>
        <div style="display: flex;">
            <img v-for="image in home.images" :key="image" :src="image" width="200" height="150" />
        </div>
        {{ home.title }}<br>
        ${{ home.pricePerNight }} / night<br>
        <img src="/images/marker.svg" width="20" height="20" />
        {{ home.location.street }}
        {{ home.location.city }}
        {{ home.location.state }}
        {{ home.location.country }}<br>
        <img src="/images/star.svg" width="20" height="20" />{{ home.reviewValue }}<br>
        {{ home.guests }} guests,
        {{ home.bedrooms }} rooms,
        {{ home.beds }} beds,
        {{ home.bathrooms }} baths<br>
        {{ home.description }}
        <div style="width:400px; height:400px;" ref="map"></div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: this.home.title,
        };
    },
    async asyncData({ $api, params }) {
        const home = await $api.getHome(params.id)
        return { home };
    },
    mounted() {
        this.showMap();
    },
    methods: {
        showMap() {
            const { lat, lng } = this.home._geoloc;
            this.$maps.showMap(this.$refs.map, lat, lng);
        }
    }
}
</script>