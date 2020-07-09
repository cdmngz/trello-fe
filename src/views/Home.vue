<template>
  <div>
      <HelloWorld/>
      <Video />
      <Footer/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld';
import Video from '@/components/Video';
import Footer from '@/components/Footer';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Video,
    Footer
  },
}
</script>
