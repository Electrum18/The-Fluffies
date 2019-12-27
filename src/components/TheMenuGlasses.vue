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

      v-card(light)
        v-list(two-line)
          v-list-item-group(
            v-model="selected"
            active-class="orange--text"
          )
            template(v-for="(glass, i) in glasses")
              v-list-item(
                @click="setGlasses(glass.name)"
                :key="nameing(glass)"
              )
                v-list-item-content
                  v-list-item-title {{ nameing(glass) }}
                  v-list-item-subtitle {{ locale.by[$root.locale] }} {{ glass.author }}

              v-divider.light(
                v-if="i + 1 < glass.length"
                :key="i"
              )
</template>

<script lang="coffee">
  export default
    data: ->
      selected: [2]
      glasses: []
      name: ""

      locale:
        list:
          en: "Glasses list"
          ru: "Список очков"

        by:
          en: "author: "
          ru: "автор: "

    watch:
      "$root.glasses.info": (val) ->
        @glasses = val

        for elem, i in val
          if elem.name is @$root.glasses.name
            @selected = if i < 1 then i else i

    computed:
      warnColor: ->
        if @$root.warning.close
          return "red"

    methods:
      nameing: (glasses) ->
        if @glasses.length then return glasses.name[@$root.locale]

      setGlasses: (name) -> @$root.glasses.name = name
      close: ->
        @$parent.$parent.$parent.opened.Glasses = !@$parent.$parent.$parent.opened.Glasses
        @$parent.$parent.$parent.opened.Avatar  = !@$parent.$parent.$parent.opened.Avatar
</script>

<style lang="sass">
  button.transition
    transition: background 200ms linear

  .light
    border-color: rgba(0,0,0,.12)!important
</style>