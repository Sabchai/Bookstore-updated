

const express = require('express');
const { translateToMultipleLanguages } = require('./translator'); 

const router = express.Router();


router.post('/multiple', async (req, res) => {
    const { text, targetLangs } = req.body;

    if (!text || !targetLangs || !Array.isArray(targetLangs)) {
        return res.status(400).json({ error: 'Texto o idiomas no proporcionados correctamente.' });
    }

    try {
        const translations = await translateToMultipleLanguages(text, targetLangs);
        res.json({ translations });
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar las traducciones.' });
    }
});

module.exports = router;
