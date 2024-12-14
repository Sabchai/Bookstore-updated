
const translate = require('translate-google-api');

/**
 * Traduce un texto a múltiples idiomas especificados.
 * @param {string} text - Texto que deseas traducir.
 * @param {string[]} targetLangs - Lista de códigos de idiomas (por ejemplo: ['en', 'es', 'fr']).
 * @returns {Promise<object>} - Objeto con las traducciones, donde la clave es el idioma y el valor es el texto traducido.
 */
const translateToMultipleLanguages = async (text, targetLangs) => {
    try {
        const translations = {};
        for (const lang of targetLangs) {
            const translated = await translate(text, { to: lang });
            translations[lang] = translated;
        }
        return translations;
    } catch (error) {
        console.error('Error al traducir:', error.message);
        return {}; // Devuelve un objeto vacío si ocurre un error.
    }
};

module.exports = { translateToMultipleLanguages };
