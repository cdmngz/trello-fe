<template>
<div class="grey darken-4">
    <video ref="videoRef" src="" alt="Video de Evgenia Kirpichnikova en Pexels" muted loop></video>
</div>
</template>

<script>
export default {
    name: 'Video',
    mounted() {
        this.vamos()
    },
    methods: {
        vamos() {
            this.$refs.videoRef.src = require('@/assets/video.mp4');
            this.$refs.videoRef.play();
        }
    }
}
</script>

<style scoped>
    video {
        margin: 0;
        padding: 0;
        width: 100%;
        position: relative;
        box-sizing: border-box;
    }
</style>