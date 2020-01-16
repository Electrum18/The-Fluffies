<template lang="pug">
  v-container
    v-card(outlined)
      v-card-title {{ locale.list[$root.locale] }}
        v-spacer
        v-btn.mx-n2.transition(
          fab
          small
          :color="warnColor"
          @click="close()"
          aria-label="Close list"
        )
          v-icon mdi-keyboard-backspace

      BarList(target="hair" :list="$root.hair.info")
</template>

<script lang="coffee">
  import BarList from "./BarLists.vue"

  export default
    data: ->
      locale:
        list:
          en: "Mane list"
          ru: "Список грив"

        by:
          en: "author: "
          ru: "автор: "

    computed:
      warnColor: ->
        if @$root.warning.close
          return "red"

    methods:
      close: ->
        @$parent.$parent.$parent.opened.Hairs  = !@$parent.$parent.$parent.opened.Hairs
        @$parent.$parent.$parent.opened.Avatar = !@$parent.$parent.$parent.opened.Avatar

    components: {
      BarList
    }
</script>

<style lang="sass">
  button.transition
    transition: background 200ms linear

  .light
    border-color: rgba(0,0,0,.12)!important
</style>