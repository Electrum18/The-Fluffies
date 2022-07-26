<template>
  <v-chip>
    {{ $t("index.version") }}
    <v-chip class="version v-avatar--right" dark="dark">grapefruit</v-chip>
  </v-chip>
</template>

<style>
span.version {
  background-image: linear-gradient(to right, #fc4, #f44) !important;
  margin-right: -12px !important;
}
</style>
