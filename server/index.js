const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');

const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).send('No file uploaded.');
        }

        const image = req.file.buffer;

        const {data: {text}} = await Tesseract.recognize(
            image,
            'ukr',
        );

        res.send(text);
    } catch (e) {
        console.log(e)
    }
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
