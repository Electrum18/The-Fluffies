<template lang="pug">
  v-container
    v-card(outlined)
      v-card-title {{ locale.list[$root.locale] }}
        v-spacer
        v-btn.mx-n2(
          fab
          small
          @click="close()"
          aria-label="Close list"
        )
          v-icon mdi-keyboard-backspace

      v-card(light)
        v-list(two-line)
          v-list-item-group(
            v-model="selected"
            active-class="orange--text"
          )
            template(v-for="(hair, i) in hairs")
              v-list-item(
                @click="setHair(hair.name)"
                :key="nameing(hair)"
              )
                v-list-item-content
                  v-list-item-title {{ nameing(hair) }}
                  v-list-item-subtitle {{ locale.by[$root.locale] }} {{ hair.author }}

              v-divider.light(
                v-if="i + 1 < hairs.length"
                :key="i"
              )
</template>

<script lang="coffee">
  export default
    data: ->
      selected: 0
      hairs: []
      name: ""

      locale:
        list:
          en: "Mane list"
          ru: "Список грив"

        by:
          en: "author: "
          ru: "автор: "

    watch:
      "$root.hair.info": (val) ->
        @hairs = val

        for elem, i in val
          if elem.name is @$root.hair.name
            @selected = if i < 1 then [i] else i

    methods:
      nameing: (hair) ->
        if @hairs.length then return hair.name[@$root.locale]

      setHair: (name) -> @$root.hair.name = name
      close: ->
        @$parent.$parent.$parent.opened.Hairs  = !@$parent.$parent.$parent.opened.Hairs
        @$parent.$parent.$parent.opened.Avatar = !@$parent.$parent.$parent.opened.Avatar
</script>

<style lang="sass">
  .light
    border-color: rgba(0,0,0,.12)!important
</style>