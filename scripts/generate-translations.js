const fs = require('fs').promises
const dotenv = require('dotenv')
// const axios = require('axios')
dotenv.config()
const translate = require('./translate')
const basePath = __dirname + "/.."
const languages = [
    { id: 'en', icon: '🇬🇧', name: 'English' },
    { id: 'ca', icon: '🐎', name: 'Català' },
    { id: 'es', icon: '🇪🇸', name: 'Español' },
    { id: 'de', icon: '🇩🇪', name: 'Deutsch' },
    { id: 'nl', icon: '🇳🇱', name: 'Nederlands' },
    { id: 'ms', icon: '🇲🇾', name: 'Melayu' },
    { id: 'pt', icon: '🇵🇹', name: 'Português' },
    { id: 'fi', icon: '🇫🇮', name: 'Suomeksi' },
    { id: 'it', icon: '🇮🇹', name: 'Italiano' },
    { id: 'th', icon: '🇹🇭', name: 'ไทย' },
]

const translations_en = [
    'Pledge',
    'Saturation',
    'Margin',
    'Pledge',
    'Fixed cost',
    'Member since',
    'Blocks',
    'Delegators',
    'About',
    'Issues',
    'Hardware',
    'Annual',
    'Monthly',
    'Calculate your rewards',
    'Staking rewards',
    'Living off rewards',
    'Rewards to retire',
    'ADA You Own',
    'Income goal',
    'Required ADA price',
    'A group of single stake pool operators',
    'Blocks minted',
    'The Armada alliance was formed in efforts to build a sustainable community of decentralized, low-cost, and energy-efficient stake pool operations on the Cardano blockchain 🌍🌿 All Stake Pools in this alliance run on either Raspberry Pis exclusively or on other low power consuming ARM-based machines with an average pool energy consumption of less than 40 Watts💡',
    'Live stake',
    'Joined',
    'Delegators',
    'Stake pools',
    'Learn',
    'Returns per month',
    'Returns per year',
    'Average returns per epoch',
    'Final balance',
    'Total rewards earned',
    'How long will you HODL',
    'APY (Average 5% - 5.5%)',
    'Required ADA price',
    'ADA Price to reach your Income Goal',
    'Enter total ADA you own, your target income and find out what ADA price you could retire at',
    'Enter your ADA target Price, Income Goal, Staking APY and find out how much ADA you need to own',
    'Enter total ADA you own and find out how much ADA you will earn per year, per month and per epoch',
]



// async function translate(source, sourceLanguage, targetLanguage) {

//     const url =
//         "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
//         sourceLanguage +
//         "&tl=" +
//         targetLanguage +
//         "&dt=t&q=" +
//         encodeURI(source);

//     const { data } = await axios.get(url);

//     try {
//         return data[0][0][0];
//     } catch (error) {
//         return error.message;
//     }
// }

async function main() {

    let result = {}

    await Promise.all(
        languages.map(async language => {

            const translations = {
                language: language.name
            }

            await Promise.all(
                translations_en.map(async key => {

                    const source = key

                    if (language.id === 'en') {
                        translations[key] = source
                    }

                    translations[key] = await translate(source, 'en', language.id)
                })
            )

            result[language.id] = translations
        })
    )

    await fs.writeFile(basePath + `/services/website/src/translations.json`, JSON.stringify(result, null, 2))
}

main()