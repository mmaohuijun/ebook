const $cookies = {
  set(name, value, expires, path, domain, source) {
    let date
    const cookies = [name + '=' + encodeURIComponent(value)]
    if (expires) {
      date = new Date()
      date.setMinutes(date.getMinutes() + expires)
      cookies.push('expires=' + date.toUTCString())
    }
    cookies.push('path=' + (path || '/'))
    if (domain) {
      cookies.push('domain=' + domain)
    }
    if (source) {
      cookies.push('source')
    }
    document.cookie = cookies.join(';')
  },
  get(name) {
    const cookie = document.cookie.match(new RegExp('' + name + '=([^;]+)'))
    return cookie ? decodeURIComponent(cookie[1]) : null
  },
  setAll(value) {
    document.cookie = value
  },
  getAll() {
    return document.cookie
  },
  remove(name) {
    const value = this.getCookie(name)
    if (value !== null) {
      this.setCookie(name, '', -60)
    }
  }
}

export default $cookies
