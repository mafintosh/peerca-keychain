# peerca-keychain

Keychain integration for [peerca](https://github.com/substack/peerca).
Currently only OSX is supported but patches are welcome for Windows, Linux support.

```
npm install -g peerca-keychain
```

## Usage

Running `peerca-keychain` will print an interactive selection box where you can
select which peerca certificates to add to your keychain

```
$ peerca-keychain
Select which certificates to add to your keychain:

> [x] my-domain.com
  [ ] other-domain.com
```

## Programmatic usage

``` js
var keychain = require('peerca-keychain') 
var k = keychain()

k.list(function(err, certs) {
  // will print a list of available certs and whether they are enabled
  console.log(certs)
})

k.enable('my-domain.com', function(err) {
  // might open op a prompt
  // my-domain.com should be enabled now
})

k.disable('other-domain.com', function(err) {
  // other-domain.com should now be disabled
})
```

## Why

Adding peerca certificates to your keychain will allow browsers like Google Chrome
to seamlessly access your secure websites.

It might still prompt you for a certificate to use. In that case the first one in the
prompt should be the correct one.

## License

MIT
