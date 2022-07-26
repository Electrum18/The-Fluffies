<template>
  <div>
    <v-app id="editor-background">
      <nuxt></nuxt>
    </v-app>

    <div id="canvas">
      <canvas ref="avatar"></canvas>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/composition-api";

export default {
  setup(_, { refs, root }) {
    onMounted(() => (root.$refs.avatar = refs.avatar));
  },
};
</script>

<style>
#editor-background {
  background: #666 url("~assets/img/background.png?webp") repeat;
}

#canvas {
  position: fixed;
  width: 80vw;
  height: 45vw;
  left: 50%;
  bottom: 50%;
  border-radius: 16px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFFmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0MzUyLCAyMDIwLzAxLzMwLTE1OjUwOjM4ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA5LTIyVDE1OjU0OjA0KzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wOS0yMlQxNTo1NjowOCswMzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0wOS0yMlQxNTo1NjowOCswMzowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiMTVlYTJmMi02YmMwLTEwNDgtOGRhYS01N2YzZGNlYjUzYTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6YjE1ZWEyZjItNmJjMC0xMDQ4LThkYWEtNTdmM2RjZWI1M2ExIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YjE1ZWEyZjItNmJjMC0xMDQ4LThkYWEtNTdmM2RjZWI1M2ExIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiMTVlYTJmMi02YmMwLTEwNDgtOGRhYS01N2YzZGNlYjUzYTEiIHN0RXZ0OndoZW49IjIwMjAtMDktMjJUMTU6NTQ6MDQrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4xIChXaW5kb3dzKSIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6W5vuQAAAAGElEQVQYlWN4igr+owKGgZRG46OpHkhpAMBDG6il9PcHAAAAAElFTkSuQmCC)
    repeat;
  background-size: 16px;
  transform: translate(-50%, 50%);
  transition: width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
    height 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
    bottom 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

#canvas canvas {
  width: 80vw;
  border-radius: 16px;
  z-index: 0;
}
</style>
