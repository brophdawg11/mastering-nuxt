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
export default {
    async asyncData({ $api, error }) {
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
};
</script>
