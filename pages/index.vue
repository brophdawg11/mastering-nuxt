<template>
    <div>
        <div v-for="home in homes" :key="home.objectID" style="float: left; margin: 10px;">
            <NuxtLink :to="`/home/${home.objectID}`" prefetch>
                <HomeCard :home="home" />
            </NuxtLink>
        </div>
    </div>
</template>

<script>
import homes from '~/data/homes.json';

export default {
    head() {
        return {
            title: 'Homepage',
            meta: [{
                hid: 'description',
                name: 'description',
                content: 'This is a homepage',
            }],
        };
    },
    async asyncData({ $api, params, error }) {
        const response = await $api.getHomes();
        const { ok, status, statusText, data } = response;

        if (!ok) {
            return error({
                statusCode: status,
                message: statusText,
            });
        }

        return {
            homes: data,
        };
    },
}
</script>