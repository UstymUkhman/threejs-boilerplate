!!window.navigator.userAgent.match(/Trident\//i) ||
!!window.navigator.userAgent.match(/MSIE /i)
  ? document.documentElement.className += ' ms-ie'
  : document.documentElement.className = '';
