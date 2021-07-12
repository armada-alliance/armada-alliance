
const apiKey = process.env.GOOGLE_API_KEY;
const googleTranslate = require("google-translate")(apiKey);

const translate = (source, sourceLanguage, targetLanguage) => new Promise((resolve, reject) => {

    googleTranslate.translate(source, targetLanguage, function (err, translation) {
        if (err) {
            reject(err)
            return
        }
        resolve(translation.translatedText);
    });
})

module.exports = translate