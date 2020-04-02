<template lang="pug">
  v-chip {{ $t('index.version') }}
    v-chip.version.v-avatar--right(dark) dragon fruit
</template>

<style lang="sass">
span.version
  background-image: linear-gradient(to right, #f46, #f2a)!important
  margin-right: -12px!important
</style>
