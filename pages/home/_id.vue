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
        <ul>
            <li v-for="review in reviews" :key="review.objectID">
                <img :src="review.reviewer.image" /><br>
                {{ review.reviewer.name }}<br>
                {{ formatDate(review.date) }}<br>
                <ShortText :text="review.comment" :target="50" />
            </li>
        </ul>
        <img :src="user.image" /><br>
        {{ user.name }}<br>
        {{ formatDate(user.joined) }}<br>
        {{ user.reviewCount }}<br>
        {{ user.description }}
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: this.home.title,
        };
    },
    async asyncData({ $api, params, error }) {
        const responses = await Promise.all([
            $api.getHome(params.id),
            $api.getReviewsByHomeId(params.id),
            $api.getUserByHomeId(params.id),
        ]);

        const errResponse = responses.find(r => !r.ok);
        if (errResponse) {
            return error({
                statusCode: errResponse.status,
                message: errResponse.statusText,
            });
        }

        return {
            home: responses[0].data,
            reviews: responses[1].data,
            user: responses[2].data,
        };
    },
    mounted() {
        this.showMap();
    },
    methods: {
        showMap() {
            const { lat, lng } = this.home._geoloc;
            this.$maps.showMap(this.$refs.map, lat, lng);
        },
        formatDate(dateStr) {
            const date = new Date(dateStr);
            return date.toLocaleDateString(undefined, {
                month: 'long',
                year: 'numeric',
            });
        },
    }
}
</script>