//Configuration file containing translation

import i18n from "i18next";
import {initReactI18next} from "react-i18next";

i18n.use(initReactI18next).init({
    resources:{
        //English Translation
        en:{
            translation:{
               "Hotels":"Hotels",
               "Register":"Register",
               "Sign in":"Sign in",
               "English":"English",
               "Tamil":"Tamil",
               "Chinese":"Chinese",
               "Search":"Search",
               "Find places to stay on Grand Vista":"Find places to stay on Grand Vista",
               "Discover hotels and rooms perfect for any trip":" Discover hotels and rooms perfect for any trip",
               "Location":"Location",
               "Check-in":"Check-in",
               "Check-out":"Check-out",
               "Adults" :"Adults",
               "Children":"Children"
            }
        },
        //Tamil Translation
        ta:{
            translation:{
                "Hotels":"ஹோட்டல்கள்",
                "Register":"பதிவு",
                "Sign in":"உள்நுழையவும்",
                "English":"ஆங்கிலம்",
                "Tamil":"தமிழ்",
                "Chinese":"சீனம்",
                "Search":"தேடல்",
                "Find places to stay on Grand Vista":"கிராண்ட் விஸ்டாவில் தங்குவதற்கான இடங்களைக் கண்டறியவும்",
                "Discover hotels and rooms perfect for any trip":"எந்தவொரு பயணத்திற்கும் ஏற்ற ஹோட்டல்கள் மற்றும் அறைகளைக் கண்டறியவும்",
                "Location":"இடம்",
                "Check-in":"நுழைவு தேதி",
                "Check-out":"வெளியேறும் தேதி",
                "Adults" :"பெரியவர்கள்",
                "Children":"குழந்தைகள்"
            }
         },
         // //Chinese Translation
         zh:{
            translation:{

            }
         }
    },
    // Set the default language
    lng: 'en', 
     // Fallback language if translation is missing
    fallbackLng: 'en',
    
});
export default i18n;


