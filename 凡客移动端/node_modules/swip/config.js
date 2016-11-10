/**
 * config is a singleton object to store and load config
 */
const fs = require('fs')
const exec = require('child_process').exec

module.exports = {

  path: process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'] + '/' + '.swiprc',

  load: function () {
    try {
      this.configObj = JSON.parse(fs.readFileSync(this.path, 'utf8'))
    } catch (e) {
      this.configObj = {
        proxies: {}
      }
    }
  },

  getProxyList: function () {
    return Object.keys(this.configObj.proxies)
  },

  setProxy: function (name, object) {
    this.configObj.proxies[name] = object
  },

  getProxy: function (name) {
    return this.configObj.proxies[name]
  },

  hasProxy: function (name) {
    return this.configObj.proxies.hasOwnProperty(name)
  },

  save: function () {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.configObj), 'utf8')
    } catch (e) {
      console.log('Unable to write to config file')
      process.exit()
    }
  },

  activateProxy (name) {
    var gitHttpCmd = 'git config --global http.proxy ' + this.configObj.proxies[name]['http-proxy']
    var gitHttpsCmd = 'git config --global https.proxy ' + this.configObj.proxies[name]['https-proxy']
    var npmHttpCmd = 'npm config set proxy' + this.configObj.proxies[name]['http-proxy']
    var npmHttpsCmd = 'npm config set https-proxy' + this.configObj.proxies[name]['https-proxy']

    exec(gitHttpCmd, function (error, stdout, stderr) {
      console.log('Updated Proxy')
    })

    exec(gitHttpsCmd, function (error, stdout, stderr) {
      console.log('Updated Proxy')
    })

    exec(npmHttpCmd, function (error, stdout, stderr) {
      console.log('Updated Proxy')
    })

    exec(npmHttpsCmd, function (error, stdout, stderr) {
      console.log('Updated Proxy')
    })
  },

  deactivateProxy () {
    exec('git config --global --unset core.gitproxy', function (error, stdout, stderr) {
      console.log('Deactivated Git Proxy')
    })

    exec('npm config rm proxy', function (error, stdout, stderr) {
      console.log('Deactivated NPM HTTP Proxy')
    })

    exec('npm config rm https-proxy', function (error, stdout, stderr) {
      console.log('Deactivated NPM HTTPS Proxy')
    })
  }

}
