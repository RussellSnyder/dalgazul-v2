import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "name": "name",
      "name_placeholder": "John Doe",
      "message": "message",
      "message_placeholder": "We have a great gig for you!",
      "email": "email",
      "email_placeholder": "john@gmail.com",
      "send": "send",
    }
  },
  de: {
    translation: {
      "name": "name",
      "name_placeholder": "Hans Meyer",
      "message": "nachricht",
      "message_placeholder": "Wir haben einen tollen Auftritt für euch!",
      "email": "email",
      "email_placeholder": "hans@gmail.com",
      "send": "abschicken",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "de",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;