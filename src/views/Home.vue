<template>
  <div>
    <Circuit></Circuit>
    <div class="parent">
      <OxideLogo></OxideLogo>
      <Main></Main>
      <Theme></Theme>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Circuit from '@/components/Circuit.vue'
import OxideLogo from '@/components/OxideLogo.vue'
import Main from '@/components/Main.vue'
import Theme from '@/components/Theme.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Circuit,
    OxideLogo,
    Main,
    Theme,
    Footer
  }
}
</script>

<style scoped>
</style>
