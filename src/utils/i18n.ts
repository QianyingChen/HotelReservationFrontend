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
         cn:{
            translation:{
                "Hotels":"酒店",
                "Register":"注册",
                "Sign in":"登录",
                "English":"英语",
                "Tamil":"泰米尔语",
                "Chinese":"中文",
                "Search":"搜索",
                "Find places to stay on Grand Vista":"在远景上找到住宿地点",
                "Discover hotels and rooms perfect for any trip":"探索适合任何旅行的完美酒店和客房",
                "Location":"目的地",
                "Check-in":"入住日期",
                "Check-out":"退房日期",
                "Adults" :"成人",
                "Children":"儿童"

            }
         }
    },
    // Set the default language
    lng: 'en', 
     // Fallback language if translation is missing
    fallbackLng: 'en',
    
});
export default i18n;


