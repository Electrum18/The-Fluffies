<template lang="pug">
  v-chip {{ $t('index.version') }}
    v-chip.version.v-avatar--right(dark) elderberry
</template>

<style lang="sass">
span.version
  background-image: linear-gradient(to right, #a4e, #426)!important
  margin-right: -12px!important
</style>
