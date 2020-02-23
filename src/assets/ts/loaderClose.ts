function loaderClose() {
  const overlay = document.getElementById('overlay') as HTMLElement;
  const style = overlay.style;

  style.opacity = '0';
  style['pointer-events' as any] = 'none';
}

export default loaderClose