<template>
    <div style="text-align: center;">
        <h1>{{ error.statusCode }} - {{ error.message }}</h1>
    </div>
</template>

<script>
export default {
    head(){
        return {
            title: 'Oops!',
        };
    },
    props: {
        error: {
            type: Object,
            required: true,
        },
    },
};
</script>