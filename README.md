# Wireguard-QR

A self hosted QR code generator for wireguard configs. I'm aware of online solutions but I wanted something simple I could self host. You just never know where your keys might end up when using public websites. This app is intended to run locally preferably behind a reverse proxy and never facing the public internet. 

# Features

#### Create QR code from new config

![Form](https://i.imgur.com/ZTQfy8L.png)

![QR Code](https://i.imgur.com/PdVuMtY.png)


#### Wireguard key generator

![Key Generator](https://i.imgur.com/pl9FjOe.png)


#### Create QR code from file

![File Upload](https://i.imgur.com/b0SDPTP.png)

## Behaviour
- Treats Private Keys and PreShared Keys as sensitive passwords so they aren't shown in the interface and aren't saved by the browser.
- Clears all forms after creating QR code
- Clears all forms on page refresh
- No confgurations or QR codes are saved/logged either client side or server side

## To Do:
- Option to download created config?
