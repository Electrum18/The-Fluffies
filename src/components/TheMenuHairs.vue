<template lang="pug">
  v-container
    v-card(outlined)
      v-card-title Mane list
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
                :key="hair.name"
              )
                v-list-item-content
                  v-list-item-title {{ hair.name }}
                  v-list-item-subtitle by {{ hair.author }}

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

    watch:
      "$root.hair.info": (val) ->
        @hairs = val

        for elem, i in val
          if elem.name is @$root.hair.name
            @selected = if i < 1 then [i] else i

    methods:
      setHair: (name) -> @$root.hair.name = name
      close: ->
        @$parent.$parent.$parent.opened.Hairs  = !@$parent.$parent.$parent.opened.Hairs
        @$parent.$parent.$parent.opened.Avatar = !@$parent.$parent.$parent.opened.Avatar
</script>

<style lang="sass">
  .light
    border-color: rgba(0,0,0,.12)!important
</style>