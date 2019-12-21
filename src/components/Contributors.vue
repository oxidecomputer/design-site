<template>
  <footer>
    <p class="footer-piece footer-piece--separate">
      Created by
      <a
        href="https://github.com/oxidecomputer/design.oxide.computer/graphs/contributors"
        target="_blank"
        rel="noreferrer"
        id="contributors"
        title="Contributors to the GitHub repository design.oxide.computer by the oxidecomputer organization"
      >{{contributors}}</a>
      contributors
      on
      <a
        href="https://github.com/oxidecomputer/design.oxide.computer/"
        target="_blank"
        rel="noreferrer"
        title="GitHub repository design.oxide.computer by the oxidecomputer organization"
      >GitHub</a>.
    </p>
  </footer>
</template>

<script>
export default {
  name: 'Contributors',
  data: () => ({
    contributors: 0
  }),
  mounted () {
    fetch('https://api.github.com/repos/oxidecomputer/design.oxide.computer/stats/contributors')
      .then(response => {
        if (response.status !== 200) {
          throw new Error(`status code = ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        if (data) {
          this.contributors = data.length
        }
      })
      .catch(err => console.log('Unable to retrieve number of contributors from github', err))
  }
}
</script>

<style scoped>
</style>
