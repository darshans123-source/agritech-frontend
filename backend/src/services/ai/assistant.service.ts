import { db } from '../../models/database.js';
import { Language } from '../../types/index.js';

export class AssistantService {
  public static async generateResponse(query: string, language: Language = 'en', userContext?: any) {
    const q = query.toLowerCase();
    const weather = db.weather;
    const user = db.users.get('usr-001');

    let reply = '';
    const suggestions: string[] = [];

    if (q.includes('irrigate') || q.includes('water') || q.includes('ನೀರು') || q.includes('सिंचाई')) {
      if (language === 'kn') {
        reply = `💧 **ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ ಸಲಹೆ:**\nನಿಮ್ಮ ಮಣ್ಣಿನ ತೇವಾಂಶ **${weather.soilMoisture}%** ನಲ್ಲಿದೆ (ಉತ್ತಮ ಮಟ್ಟ). ಮುಂದಿನ 36 ಗಂಟೆಗಳಲ್ಲಿ **${weather.rainProbability}% ಮಳೆಯಾಗುವ ಮುನ್ಸೂಚನೆ** ಇರುವುದರಿಂದ, ಇಂದು ನೀರಾವರಿ ಮಾಡುವುದನ್ನು ಮುಂದೂಡಲು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ. ಇದರಿಂದ ವಿದ್ಯುತ್ ಮತ್ತು ನೀರು ಎರಡೂ ಉಳಿತಾಯವಾಗುತ್ತದೆ.`;
      } else if (language === 'hi') {
        reply = `💧 **स्मार्ट सिंचाई सलाह:**\nवर्तमान में आपके खेत की मिट्टी में नमी **${weather.soilMoisture}%** (पर्याप्त) है। अगले 36 घंटों में **बारिश की ${weather.rainProbability}% संभावना** है, इसलिए आज अतिरिक्त पंप चलाने की आवश्यकता नहीं है।`;
      } else {
        reply = `💧 **Smart Irrigation Advisory:**\nYour current soil moisture is optimal at **${weather.soilMoisture}%**. With a **${weather.rainProbability}% rain forecast** over the next 36 hours, postpone pump operation to conserve ground water and power.`;
      }
      suggestions.push('Check Smart Pump status', 'View 7-day rainfall forecast', 'Soil sensor readings');
    } else if (q.includes('spot') || q.includes('disease') || q.includes('blight') || q.includes('ರೋಗ') || q.includes('ಇಲಾಜು') || q.includes('धब्बे') || q.includes('doctor')) {
      if (language === 'kn') {
        reply = `🔬 **ಕೃಷಿ ಎಐ ಡಾಕ್ಟರ್ ರೋಗ ತಪಾಸಣೆ:**\nಟೊಮ್ಯಾಟೋ ಎಲೆಗಳ ಮೇಲಿನ ವೃತ್ತಾಕಾರದ ಕಪ್ಪು-ಕಂದು ಮಚ್ಚೆಗಳು **ಅರ್ಲಿ ಬ್ಲೈಟ್ (Early Blight - Alternaria solani)** ರೋಗದ ಲಕ್ಷಣಗಳಾಗಿವೆ.\n\n✅ **ಜೈವಿಕ ಚಿಕಿತ್ಸೆ:** ಟ್ರೈಕೋಡರ್ಮಾ ವಿರಿಡೆ (Trichoderma viride) 5 ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.\n⚠️ **ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆ:** ಮ್ಯಾಂಕೋಜೆಬ್ 75% WP @ 2.5g/L ನೀರಿನಲ್ಲಿ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.`;
      } else if (language === 'hi') {
        reply = `🔬 **AI क्रॉप डॉक्टर निदान:**\nटमाटर की निचली पत्तियों पर भूरे गोल छल्लेदार धब्बे **अगेती झुलसा (Early Blight)** के लक्षण हैं।\n\n✅ **जैविक उपाय:** ट्राइकोडर्मा विरिडी 5 ग्राम प्रति लीटर पानी में मिलाकर छिड़कें।\n⚠️ **रासायनिक उपाय:** मैंकोजेब 75% WP @ 2.5 ग्राम प्रति लीटर तुरंत स्प्रे करें।`;
      } else {
        reply = `🔬 **AI Crop Doctor Diagnosis:**\nConcentric dark brown circular lesions on lower leaves indicate **Early Blight (Alternaria solani)**.\n\n✅ **Organic Treatment:** Spray Trichoderma viride bio-fungicide @ 5g/L of water.\n⚠️ **Chemical Remedy:** Spray Mancozeb 75% WP @ 2.5g/L or Azoxystrobin SC @ 1ml/L.`;
      }
      suggestions.push('Order Trichoderma Bio-Fungicide', 'Schedule Drone Spray', 'View disease pathology');
    } else if (q.includes('mandi') || q.includes('price') || q.includes('sell') || q.includes('ಮಾರುಕಟ್ಟೆ') || q.includes('ದರ') || q.includes('भाव') || q.includes('मंडी')) {
      if (language === 'kn') {
        reply = `📈 **ಕೃಷಿಭವಷ್ಯ ಮಾರುಕಟ್ಟೆ ಬುದ್ಧಿಮತ್ತೆ:**\nಕೋಲಾರ ಮಂಡಿಯಲ್ಲಿ ಟೊಮ್ಯಾಟೋ ದರ ಕ್ವಿಂಟಾಲ್‌ಗೆ **₹2,450 (+12.4%)** ಏರಿಕೆಯಾಗಿದೆ. ಉತ್ತರ ಭಾರತದ ಪ್ರವಾಹದಿಂದಾಗಿ ಮುಂದಿನ 15-25 ದಿನಗಳಲ್ಲಿ ದರ ಗರಿಷ್ಠ ಮಟ್ಟ ತಲುಪಲಿದೆ. **ಸೆಪ್ಟೆಂಬರ್ 20-28 ರ ಅವಧಿಯಲ್ಲಿ ಮಾರಾಟ ಮಾಡಲು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ.**`;
      } else if (language === 'hi') {
        reply = `📈 **कृषिभविष्य मंडी पूर्वानुमान:**\nकोलार APMC मंडी में टमाटर का भाव **₹2,450 प्रति क्विंटल (+12.4%)** चल रहा है। आवक कम होने के कारण अगले 15-25 दिनों में कीमतें peak पर होंगी। **सर्वोत्तम बिक्री समय: 20 से 28 सितंबर के बीच है।**`;
      } else {
        reply = `📈 **KrishiBhavishya Mandi Intelligence:**\nTomato prices in Kolar Mandi are currently trending upward at **₹2,450 / Qtl (+12.4%)**. Supply deficits indicate a peak selling window in **15 to 25 days (Sep 20 - Sep 28)** with up to 70% profit gains.`;
      }
      suggestions.push('Open KrishiBhavishya Price Forecaster', 'Compare nearby Mandi rates', 'Calculate transport cost');
    } else if (q.includes('scheme') || q.includes('subsidy') || q.includes('pmksy') || q.includes('ಯೋಜನೆ') || q.includes('ಸಬ್ಸಿಡಿ') || q.includes('योजना') || q.includes('सब्सिडी')) {
      if (language === 'kn') {
        reply = `🏛️ **ಸರ್ಕಾರಿ ಯೋಜನೆ ಮಾಹಿತಿ:**\nನಿಮ್ಮ 6.5 ಎಕರೆ ಜಮೀನಿಗೆ ನೀವು **PMKSY ಹನಿ ನೀರಾವರಿ 90% ಸಬ್ಸಿಡಿ** ಮತ್ತು **ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ (KCC) 4% ಬಡ್ಡಿದರದ ಸಾಲ**ಕ್ಕೆ ಅರ್ಹರಾಗಿದ್ದೀರಿ! ಅರ್ಜಿ ಸಲ್ಲಿಕೆ ಗಡುವು ಸೆಪ್ಟೆಂಬರ್ 30 ರಂದು ಮುಕ್ತಾಯವಾಗಲಿದೆ.`;
      } else if (language === 'hi') {
        reply = `🏛️ **सरकारी योजना पात्रता:**\nआप अपनी जोत के आधार पर **PMKSY ड्रिप सिंचाई 90% सब्सिडी** और **किसान क्रेडिट कार्ड (KCC) 4% ब्याज ऋण** के लिए पात्र हैं! राज्य कोटा आवेदन 30 सितंबर को बंद हो रहा है।`;
      } else {
        reply = `🏛️ **Government Subsidy Advisory:**\nYou are eligible for the **PMKSY 90% Micro-Irrigation (Drip) Subsidy** and **KCC 4% Interest Subvention Loan**. The state quota window closes on September 30, 2026.`;
      }
      suggestions.push('Apply for PMKSY Drip Subsidy', 'Check KCC Loan Eligibility', 'View required documents');
    } else {
      if (language === 'kn') {
        reply = `🌱 **ಕೃಷಿಸ್ಮಾರ್ಟ್ ಎಐ ಮಾರ್ಗದರ್ಶನ:**\nನಾನು ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಲು ಸಿದ್ಧನಿದ್ದೇನೆ. ಬೆಳೆ ರೋಗ ತಪಾಸಣೆ, ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ, ಮಂಡಿ ಬೆಲೆ ಭವಿಷ್ಯ, ಸ್ಮಾರ್ಟ್ ಪಂಪ್ ಮತ್ತು ಸರ್ಕಾರಿ ಸಬ್ಸಿಡಿಗಳ ಕುರಿತು ಯಾವುದೇ ಮಾಹಿತಿ ಕೇಳಬಹುದು.`;
      } else if (language === 'hi') {
        reply = `🌱 **कृषिज्मार्ट AI सहायता:**\nमैं आपकी खेती की समस्याओं के समाधान के लिए 24/7 तैयार हूँ। फसल सुरक्षा, मौसम, खाद की मात्रा, मंडी भाव या सरकारी योजनाओं के बारे में कोई भी प्रश्न पूछें।`;
      } else {
        reply = `🌱 **KrishiSmart AI Assistant:**\nI am ready to assist you with precision crop diagnosis, live weather advisories, KrishiBhavishya harvest pricing, smart pump automation, and government subsidy applications. How can I help you today?`;
      }
      suggestions.push('Should I irrigate crops today?', 'Tomato early blight treatment', 'When to sell my harvest?');
    }

    return {
      query,
      reply,
      language,
      timestamp: new Date().toISOString(),
      suggestions
    };
  }
}
