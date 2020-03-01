<template lang="pug">
  #app
    v-app#inspire(:class="dark ? 'theme--dark' : ''")
      v-app-bar(fixed :dark="dark" app)
        v-toolbar-title.title.uppercase {{ lang.about }}
        v-btn.d-none.d-sm-flex(
          large
          depressed
          href="/"
          :title="lang.back"
          :aria-label="lang.back"
        )
          v-icon(left) {{ icons.left }}
          | {{ lang.back }}

        v-btn.d-flex.d-sm-none(
          small
          depressed
          href="/"
          fab
          :title="lang.back"
          :aria-label="lang.back"
        )
          v-icon {{ icons.left }}

      v-content
        v-item-group(:dark="dark")
          v-container(fluid)

            Socials(:dark="dark")

            v-row(justify="center")
              v-col(v-for="(card, i) in lang.content" :key="card + i" cols="12" md="5")
                v-card(class="align-center")
                  v-card-title.gradient
                    | {{ card.title }}

                  v-spacer
                  v-card-text
                    p.font-weight-medium(v-for="(text, j) in card.text" :key="text + j" v-html="format(text)")

              v-col(cols="12" md="10")
                v-card(class="align-center")
                  v-card-title.gradient
                    | {{ lang.contributors }}

                  v-item-group
                    v-container
                      v-row
                        v-col(v-for="(contributor, j) in contributors" :key="contributor + j" cols="12" sm="6" md="4")
                          v-card(outlined)
                            v-list-item(three-line)
                              v-list-item-avatar(
                                tile
                                size="56"
                                color="grey"
                              )
                                img(:src="contributor.avatar_url" :alt="contributor.login + ' avatar'")

                              v-list-item-content
                                v-list-item-title.headline {{ contributor.login }}
                                v-list-item-subtitle {{ lang.contributions }} {{ contributor.contributions }}

                        v-col(cols="12" sm="6" md="4")
                          v-card(outlined)
                            v-list-item(three-line)
                              v-list-item-content
                                v-list-item-title.headline {{ lang.join.title }}
                                v-list-item-subtitle {{ lang.join.subtitle }}


              v-col(cols="12" md="10")
                v-card(class="align-center")
                  v-card-title.gradient
                    | {{ lang.thanks.title }}

                  v-spacer
                  v-card-text
                    p.font-weight-medium(v-for="(text, j) in lang.thanks.list" :key="text + j" v-html="format(text)")

            Socials(:dark="dark")


      v-footer(fixed :dark="dark" app)
        v-btn(
          @click="dark = !dark"
          :dark="!dark"
          absolute
          fab
          top
          right
          aria-label="Dark mode"
        )
          v-icon(large) {{ dark ? icons.sun : icons.moon }}

        div &copy {{ new Date().getFullYear() }} - The Fluffies
</template>

<script lang="ts">
import en from "../../assets/json/locales/en/about.json"
import ru from "../../assets/json/locales/ru/about.json"

import Vue from "vue";
import {
  VApp,
  VAppBar,
  VToolbarTitle,
  VBtn,
  VIcon,
  VContent,
  VItemGroup,
  VContainer,
  VCol,
  VRow,
  VCard,
  VCardTitle,
  VCardText,
  VSpacer,
  VListItem,
  VListItemContent,
  VListItemTitle,
  VListItemSubtitle,
  VListItemAvatar,
  VFooter
} from 'vuetify/lib';

import { ref } from '@vue/composition-api';
import {
  mdiBrightness7,
  mdiMoonWaningCrescent,
  mdiChevronLeft
} from '@mdi/js';

import Socials from "../../components/Socials.vue"

import { getLanguage } from '../../assets/ts/language';
import loaderClose from '../../assets/ts/loaderClose';
import darkMode from '../../assets/ts/darkMode';
import format from '../../assets/ts/format';

// Functions

function parseContributors($http: any) {
  const url = "https://api.github.com/repos/electrum18/the-fluffies/contributors?page=1&?access_token=fff";

  const contributors = ref([]);

  $http
    .get(url)
    .then((res: any) => contributors.value = res.body);

  return {
    contributors
  }
}

export default Vue.extend({
  setup(props, { parent }: any) {
    const { dark } = darkMode();
    const { lang } = getLanguage(en, ru);
    const { contributors } = parseContributors(parent.$http);

    loaderClose();

    const icons = {
      left: mdiChevronLeft,
      sun: mdiBrightness7,
      moon: mdiMoonWaningCrescent
    };

    return {
      dark,
      icons,
      lang,
      format,
      contributors
    }
  },

  components: {
    Socials,

    VApp,
    VAppBar,
    VToolbarTitle,
    VBtn,
    VIcon,
    VContent,
    VItemGroup,
    VContainer,
    VCol,
    VRow,
    VCard,
    VCardTitle,
    VCardText,
    VSpacer,
    VListItem,
    VListItemContent,
    VListItemTitle,
    VListItemSubtitle,
    VListItemAvatar,
    VFooter
  }
});
</script>

<style lang="sass">
  html
    overflow: auto!important

  .title
    width: 100%
    position: absolute
    text-align: center

  .uppercase
    text-transform: uppercase

  .gradient
    background-image: linear-gradient(to right, #fa2, #f64)

  .hide
    opacity: 0!important
    height: 0!important
</style>