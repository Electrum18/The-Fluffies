<template lang="pug">
  v-row(justify="center")
    .py-2

    v-card.mx-2
      Language(:dark="dark")

    v-card.mx-2(:dark="dark")
      v-btn(
        icon
        large
        tile
        target="_blank"
        title="Github"
        href="https://github.com/Electrum18/The-Fluffies"
        rel="noopener"
        aria-label="Github"
      )
        v-icon mdi-github-circle

      v-btn(
        icon
        large
        tile
        target="_blank"
        title="Twitter"
        href="https://twitter.com/TFluffies"
        rel="noopener"
        aria-label="Twitter"
      )
        v-icon mdi-twitter

      v-btn(
        icon
        large
        tile
        target="_blank"
        title="Patreon"
        href="https://www.patreon.com/the_fluffies"
        rel="noopener"
        aria-label="Patreon"
      )
        v-icon mdi-patreon
</template>

<script lang="coffee">
  import Language from "./Languages.vue"

  export default
    props: ["dark"]

    components: {
      Language
    }
</script>