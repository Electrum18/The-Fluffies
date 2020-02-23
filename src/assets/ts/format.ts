function format(text: string) {
  return text
    .replace(/\[/g, "<span class='font-weight-black'>")
    .replace(/\]/g, "</span>");
}

export default format;