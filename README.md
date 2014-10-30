# peerca-keychain

Keychain integration for [peerca](https://github.com/substack/peerca).
Currently only OSX is supported but patches are welcome.

```
npm install -g peerca-keychain
```

## Usage

Running `peerca-keychain` will print an interactive selection box where you can
select which peerca certificates to add to your keychain

```
peerca-keychain
[x] my-domain.com
[ ] other-domain.com
```

## Why

Adding peerca certificates to your keychain will allow browsers like Google Chrome
to seamlessly access your secure websites.

It might still prompt your for a certificate to use. In that case the first one in the
prompt should be the correct one.

## License

MIT
