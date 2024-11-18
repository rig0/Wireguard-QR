# Wireguard-QR

A self hosted QR code generator for wireguard configuartions. I'm aware of online solutions but I wanted something simple that I could self host. You just never know where your keys might end up when using public websites. This app is intended to run locally preferably behind a reverse proxy. 


# Features

#### Create QR code from new config

![Form](https://i.imgur.com/ZTQfy8L.png)

![QR Code](https://i.imgur.com/PdVuMtY.png)


#### Wireguard key generator

![Key Generator](https://i.imgur.com/pl9FjOe.png)


#### Create QR code from file

![File Upload](https://i.imgur.com/b0SDPTP.png)

# Setup

### Option 1: Docker Compose

##### Clone repo
```bash
git clone https://rigslab.com/Rambo/Wireguard-QR.git
```

##### Go to directory
```bash
cd ./Wireguard-QR
```

##### Build docker image
```bash
docker-compose up -d
```

***To Do: upload docker image to a repo for easier setup***

### Option 2: Natively using Node.js

##### Install dependancies
```bash
sudo apt update && sudo apt dist-upgrade -y && sudo apt install nodejs npm git -y
```

##### Clone repo
```bash
git clone https://rigslab.com/Rambo/Wireguard-QR.git
```

##### Go to directory
```bash
cd ./Wireguard-QR
```

##### Install
```bash
npm install
```

##### Run app
```bash
node app.js
```

## Behaviour
- Treats Private Keys and PreShared Keys as sensitive passwords so they aren't shown in the interface and aren't saved by the browser.
- Clears all forms after creating QR code
- Clears all forms on page refresh
- No confgurations or QR codes are saved/logged either client side or server side

## To Do:
- Host docker image for easier docker install
- Validate configs before creating QR code
- Option to download created config?
