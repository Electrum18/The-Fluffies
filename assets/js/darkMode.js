import { ref, watch } from '@vue/composition-api'

function darkMode({ theme }) {
  const hour = new Date().getHours()
  const dark = ref(hour > 17 || hour < 8)

  watch(dark, () => (theme.dark = dark.value))

  setTimeout(() => (theme.dark = dark.value)) // First loading css fix

  return { dark }
}

export default darkMode
