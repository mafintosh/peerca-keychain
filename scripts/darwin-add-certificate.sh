security import "$HOME/.config/peerca/localhost/self-key.pem" -k "$HOME/Library/Keychains/login.keychain"
security import "$HOME/.config/peerca/localhost/saved/$HOST/cert.pem" -k "$HOME/Library/Keychains/login.keychain"
security add-trusted-cert -r trustRoot -k "$HOME/Library/Keychains/login.keychain" "$HOME/.config/peerca/localhost/saved/$HOST/ca.pem"
security set-identity-preference -Z "$HASH_CERT" -s "https://$HOST" 
