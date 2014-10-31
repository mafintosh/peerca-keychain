var proc = require('child_process')
var path = require('path')
var xtend = require('xtend')
var peerca = require('peerca')

var FINGERPRINT_SH = path.join(__dirname, 'scripts', 'fingerprint.sh')
var ADD = path.join(__dirname, 'scripts', 'darwin-add-certificate.sh')
var HAS = path.join(__dirname, 'scripts', 'darwin-has-certificate.sh')
var REMOVE = path.join(__dirname, 'scripts', 'darwin-remove-certificate.sh')

var noop = function() {}

var fingerprint = function(host, cb) {
  proc.exec(FINGERPRINT_SH, {env:xtend(process.env, {HOST:host})}, function(err, out) {
    if (err) return cb(err)
    out = out.trim().split('\n').map(function(hash) {
      return hash.split('=').pop().trim().replace(/:/g, '')
    })
    cb(null, {cert:out[0], ca:out[1]})
  }) 
}

var has = function(hash, cb) {
  proc.exec(HAS, {env:xtend(process.env, {HASH_CA:hash.ca, HASH_CERT:hash.cert})}, function(err) {
    cb(!err)
  })
}

var Keychain = function() {
  if (!(this instanceof Keychain)) return new Keychain()
  this.ca = peerca()
}

Keychain.prototype.enable = function(host, cb) {
  if (!cb) cb = noop
  fingerprint(host, function(err, hash) {
    if (err) return cb(err)
    proc.exec(ADD, {env:xtend(process.env, {HOST:host, HASH_CERT:hash.cert})}, function(err) {
      cb(err)
    })
  })
}

Keychain.prototype.disable = function(host, cb) {
  if (!cb) cb = noop
  fingerprint(host, function(err, hash) {
    if (err) return cb(err)
    proc.exec(REMOVE, {env:xtend(process.env, {HASH_CERT:hash.cert, HASH_CA:hash.ca, HOST:host})}, function(err) {
      cb(err)
    })
  })
}

Keychain.prototype.list = function(cb) {
  this.ca.list('saved', function(err, list) {
    if (err) return cb(err)

    var result = []
    var loop = function() {
      var host = list.shift()
      if (!host) return cb(null, result)

      fingerprint(host, function(err, hash) {
        if (err) return cb(err)
        has(hash, function(enabled) {
          result.push({
            host: host,
            enabled: enabled,
            hash: hash
          })
          loop()
        })
      })
    }

    loop()
  })
}

module.exports = Keychain