openssl x509 -in "$HOME/.config/peerca/localhost/saved/$HOST/cert.pem" -sha1 -noout -fingerprint
openssl x509 -in "$HOME/.config/peerca/localhost/saved/$HOST/ca.pem" -sha1 -noout -fingerprint