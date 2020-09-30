<template lang="pug">
  v-chip {{ $t('index.version') }}
    v-chip.version.v-avatar--right(dark) grapefruit
</template>

<style lang="sass">
span.version
  background-image: linear-gradient(to right, #fc4, #f44)!important
  margin-right: -12px!important
</style>
