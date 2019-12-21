<template>
  <section id="theme-toggle-container">
    <label class="theme-toggle" for="checkbox" aria-label="Switch the theme">
      <input @change=switchTheme(theme) type="checkbox" id="checkbox" />
      <div class="slider"></div>
    </label>
  </section>
</template>

<script>
export default {
  name: 'ThemeToggle',
  data: () => ({
    theme: localStorage.getItem('theme') || 'dark'
  }),
  mounted () {
    // Set the color scheme to persisted value, no need to persist if using default
    document.documentElement.setAttribute('data-theme', this.theme)
  },
  methods: {
    switchTheme: function (theme) {
      if (theme === 'dark') {
        this.theme = 'light'
      } else {
        this.theme = 'dark'
      }

      document.documentElement.setAttribute('data-theme', this.theme)
      localStorage.setItem('theme', this.theme)
    }
  }
}
</script>

<style scoped>
</style>
