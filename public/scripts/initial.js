!!window.navigator.userAgent.match(/Edge/) ||
!!window.navigator.userAgent.match(/MSIE /i) ||
!!window.navigator.userAgent.match(/Trident\//i)
  ? document.documentElement.className += ' ms-ie'
  : document.documentElement.className = '';
