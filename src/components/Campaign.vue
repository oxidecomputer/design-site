<template>
  <main>
    <h3>{{title}}</h3>
    <h1>{{headline}}</h1>
    <p class="lead">{{description}}</p>
    <p>
      Interested? Send a PR with any improvement to
      <a
        href="https://github.com/oxidecomputer/design.oxide.computer"
        target="_blank"
        rel="noreferrer"
      >this repo on GitHub</a>
      or
      <a href="https://oxide.computer/careers/product-engineers/" target="_blank">
        apply
        through our careers page
      </a>.
    </p>
  </main>
</template>

<script>
export default {
  name: 'Campaign',
  props: ['title', 'headline', 'description']
}
</script>

<style scoped>

</style>
