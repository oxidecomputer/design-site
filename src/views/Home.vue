<template>
  <div>
    <Circuit></Circuit>
    <div class="campaign">
      <OxideLogo></OxideLogo>
      <Campaign
        :title="campaign.title"
        :headline="campaign.headline"
        :description="campaign.description"
      ></Campaign>
      <ThemeToggle></ThemeToggle>
      <Contributors></Contributors>
    </div>
  </div>
</template>

<script>
import Circuit from '@/components/Circuit.vue'
import OxideLogo from '@/components/OxideLogo.vue'
import Campaign from '@/components/Campaign.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import Contributors from '@/components/Contributors.vue'

export default {
  name: 'Home',
  components: {
    Circuit,
    OxideLogo,
    Campaign,
    ThemeToggle,
    Contributors
  },
  data: () => ({
    campaign: {
      title: 'Oxide Computer Company',
      headline: 'We want you',
      description: 'Oxide Computer Company is looking for designers and engineers who design and code to help build a new user experience for computing!'
    }
  })
}
</script>

<style scoped>
.campaign {
  width: 100vw;
  height: 100vh;
  min-height: 460px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: none;
}
.canvas {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--font-color);
}
</style>
