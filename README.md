# web-ar

Web AR app for graduation production

## config SSL for development environment

### install mkcert

see [FiloSottile/mkcert](https://github.com/FiloSottile/mkcert)

run `mkcert -install` after install if necessary

### create certificates

assume using `web-ar.test` as custom domain name:

```sh
mkcert -cert-file ./certs/cert.pem -key-file ./certs/key.pem web-ar.test localhost 127.0.0.1 0.0.0.0 ::
```
### edit hosts file

if there is no need to use custom domain name,skip this step.

append `127.0.0.1 web-ar.test` to `/etc/hosts`

### run webpack dev server with ssl

```
npm run dev:ssl
```

open `https://web-ar.test:3000` or `https://0.0.0.0:3000` etc

`NOTE`: http will not work if https is enabled. see [webpack-dev-server/issues/126](https://github.com/webpack/webpack-dev-server/issues/126)

### for iOS and Android devices

see [FiloSottile/mkcert#mobile-devices](https://github.com/FiloSottile/mkcert#mobile-devices)
