security delete-certificate -Z "$HASH_CERT"
security delete-certificate -Z "$HASH_CA"
security set-identity-preference -n -s "https://$HOST"