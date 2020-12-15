<template>
    <div>
        <header style="background-color: #eee;">
            <NuxtLink to="/">Home</NuxtLink>
            <input ref="search" @selected="onSelected" />
        </header>
        <Nuxt />
    </div>
</template>

<script>
export default {
    mounted() {
        this.autoComplete = this.$maps.initAutoComplete(this.$refs.search, this.onCitySelected);
    },
    methods: {
        onSelected(e) {
            const { place } = e.detail;
            if (!place || !place.geometry) {
                return;
            }
            const { location } = place.geometry;
            this.$router.push({
                name: 'search',
                query: {
                    lat: location.lat(),
                    lng: location.lng(),
                    label: this.$refs.search.value,
                },
            });
        },
    },
}
</script>
