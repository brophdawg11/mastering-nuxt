<template>
    <div style="text-align: center;">
        <h1>{{ error.statusCode }} - {{ error.message }}</h1>
    </div>
</template>

<script>
export default {
    props: {
        error: {
            type: Object,
            required: true,
        },
    },
    head() {
        return {
            title: 'Oops!',
        };
    },
};
</script>
