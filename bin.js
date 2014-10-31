#!/usr/bin/env node

var keychain = require('./')
var log = require('single-line-log').stdout
var keypress = require('keypress')

var k = keychain()

var onerror = function(err) {
  if (err) throw err
}

k.list(function(err, keys) {
  if (err) return onerror(err)
  if (!keys.length) return console.log('No keys available')

  console.log('Select which certificates to add to your keychain:\n')

  var pointer = 0
  var print = function() {
    var lines = keys
      .map(function(k, i) {
        return (pointer === i ? '> ' : '  ')+(k.enabled ? '[x]' : '[ ]')+' '+k.host+'\n'
      })
      .join('')

    log(lines+'\n')
  }

  print()

  keypress(process.stdin)
  process.stdin.on('keypress', function(ch, key) {
    if (key.name === 'c' && key.ctrl || key.name === 'd' && key.ctrl) return process.exit(0)

    var selected = keys[pointer]

    switch (key.name) {
      case 'q':
      process.exit()
      return

      case 'down': 
      pointer = Math.min(keys.length-1, pointer+1)
      print()
      return

      case 'up':
      pointer = Math.max(0, pointer-1)
      print()
      return
      
      case 'space':
      if (selected.enabled) {      
        k.disable(selected.host, function(err) {
          if (err) return onerror(err)
          selected.enabled = false
          print()
        })
      } else {
        k.enable(selected.host, function(err) {
          if (err) return onerror(err)
          selected.enabled = true
          print()
        })
      }
      return

      default:
      return
    }
  })
  process.stdin.setRawMode(true)
  process.stdin.resume()
})