const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const QRCode = require('qrcode');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Route for the main page
app.get('/', (req, res) => {
    res.render('index');
});

// Route to generate the QR code
app.post('/generate', async (req, res) => {
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

// Start the server
const PORT = process.env.PORT || 5182;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
