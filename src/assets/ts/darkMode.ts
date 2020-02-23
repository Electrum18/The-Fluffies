import { ref } from '@vue/composition-api'

function darkMode() {
  const hour = new Date().getHours();

  const dark = ref(hour > 17 || hour < 9);

  return {
    dark
  }
}

export default darkMode