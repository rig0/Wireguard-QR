const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const QRCode = require('qrcode');
const sodium = require('sodium-native');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Add body parser middleware to handle JSON
app.use(express.json()); 

// Route for the main page
app.get('/', (req, res) => {
    res.render('index');
});

// Route to generate the QR code
app.post('/create-qr', async (req, res) => {
    const { PrivateKey, Address, DNS, PublicKey, PreSharedKey, AllowedIPs, PersistentKeepAlive, Endpoint } = req.body;
    const config = `[Interface]
PrivateKey = ${PrivateKey}
Address = ${Address}
DNS = ${DNS}

[Peer]
PublicKey = ${PublicKey}
PreSharedKey = ${PreSharedKey}
AllowedIPs = ${AllowedIPs}
PersistentKeepAlive = ${PersistentKeepAlive}
Endpoint = ${Endpoint}`;

    try {
        const qrCode = await QRCode.toDataURL(config);
        res.json({ qrCode });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate QR code' });
    }
});

app.post('/generate-qr', express.json(), (req, res) => {
    const { config } = req.body;
    if (!config) {
        return res.status(400).json({ error: 'No configuration file content provided.' });
    }

    QRCode.toDataURL(config, (err, url) => {
        if (err) {
            console.error('QR Code generation error:', err);
            return res.status(500).json({ error: 'Failed to generate QR code.' });
        }

        res.json({ qrCode: url });
    });
});

app.post('/generate-keys', (req, res) => {
    const privateKey = Buffer.alloc(sodium.crypto_box_SECRETKEYBYTES);
    const publicKey = Buffer.alloc(sodium.crypto_box_PUBLICKEYBYTES);

    sodium.crypto_box_keypair(publicKey, privateKey);

    res.json({
        privateKey: privateKey.toString('base64'),
        publicKey: publicKey.toString('base64')
    });
});


// Start the server
const PORT = process.env.PORT || 5182;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
