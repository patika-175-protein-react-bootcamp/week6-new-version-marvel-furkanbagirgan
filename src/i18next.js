import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next).init({
	fallbackLng: "tr",
	lng: "tr",
	resources:{
		en: {
			translation: require("./constants/languages/en.json")
		},
        fr: {
			translation: require("./constants/languages/fr.json")
		},
		tr: {
			translation: require("./constants/languages/tr.json")
		}
	},
	debug: true,
	interpolation: {
		escapeValue: false,
	}
});

export default i18n;