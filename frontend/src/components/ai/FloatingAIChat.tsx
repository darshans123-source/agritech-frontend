import React, { useState, useRef, useEffect } from 'react';
import {
  BrainCircuit,
  X,
  Send,
  Sparkles,
  Mic,
  MicOff,
  Bot,
  User as UserIcon,
  RotateCcw,
  Volume2
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useFarmData } from '../../context/FarmDataContext';
import { AIChatMessage } from '../../types';

export const FloatingAIChat: React.FC = () => {
  const { language, t } = useLanguage();
  const { user, crops, weather, financialSummary, isProUnlocked, addXP } = useFarmData();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const initialPrompts: Record<string, string[]> = {
    en: [
      "Should I irrigate my crops today?",
      "Diagnose dark brown circular spots on tomato leaves",
      "When is the most profitable time to sell my harvest?",
      "Am I eligible for PMKSY drip irrigation subsidy?",
      "Summarize my farm net profit and expenses this season"
    ],
    kn: [
      "ಇಂದು ನನ್ನ ಬೆಳೆಗೆ ನೀರು ಹಾಯಿಸಬೇಕೇ?",
      "ಟೊಮ್ಯಾಟೋ ಎಲೆಯ ಮೇಲಿನ ಕಪ್ಪು ಮಚ್ಚೆಗಳಿಗೆ ಚಿಕಿತ್ಸೆ ಏನು?",
      "ನನ್ನ ಬೆಳೆ ಮಾರಾಟ ಮಾಡಲು ಸೂಕ್ತ ಸಮಯ ಯಾವುದು?",
      "ಹನಿ ನೀರಾವರಿ ಸಬ್ಸಿಡಿಗೆ ನಾನು ಅರ್ಹನೇ?",
      "ಈ ಋತುವಿನ ನನ್ನ ಜಮೀನಿನ ಲಾಭ-ಖರ್ಚು ವಿವರ ನೀಡಿ"
    ],
    hi: [
      "क्या मुझे आज अपने खेत में सिंचाई करनी चाहिए?",
      "टमाटर की पत्तियों पर काले धब्बों का क्या इलाज है?",
      "फसल बेचने का सबसे अच्छा और लाभदायक समय क्या है?",
      "क्या मैं ड्रिप सिंचाई सब्सिडी के लिए पात्र हूँ?",
      "इस सीजन में मेरे खेत का कुल मुनाफा और खर्च बताएं"
    ]
  };

  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text:
        language === 'kn'
          ? `ನಮಸ್ಕಾರ ${user?.name || 'ರೈತ ಮಿತ್ರರೆ'}! 🌱 ನಾನು ನಿಮ್ಮ ಕೃಷಿಸ್ಮಾರ್ಟ್ ಎಐ ಸಲಹೆಗಾರ. ಬೆಳೆ ರೋಗಗಳು, ಹವಾಮಾನ, ಮಾರುಕಟ್ಟೆ ದರಗಳು ಅಥವಾ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಕುರಿತು ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ!`
          : language === 'hi'
          ? `नमस्ते ${user?.name || 'किसान भाई'}! 🌱 मैं आपका कृषिज्मार्ट AI सहायक हूँ। फसल सुरक्षा, मौसम सलाह, मंडी भाव या सरकारी योजनाओं के बारे में कुछ भी पूछें!`
          : `Hello ${user?.name || 'Farmer'}! 🌱 I'm your KrishiSmart AI Farm Advisor. Ask me anything about crop diagnosis, weather advisories, mandi selling windows, or government subsidies!`,
      timestamp: 'Just now',
      language
    }
  ]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query) return;

    const userMsg: AIChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Dynamic AI response generation based on live farm state
    setTimeout(() => {
      let reply = '';
      const q = query.toLowerCase();

      if (q.includes('irrigate') || q.includes('ನೀರು') || q.includes('सिंचाई') || q.includes('water')) {
        reply =
          language === 'kn'
            ? `💧 **ನೀರಾವರಿ ಸಲಹೆ:**\nಪ್ರಸ್ತುತ ನಿಮ್ಮ ಮಣ್ಣಿನ ತೇವಾಂಶ **${weather.soilMoisture}%** ನಲ್ಲಿದೆ (ಉತ್ತಮ ಸ್ಥಿತಿ). ಮುಂದಿನ 36 ಗಂಟೆಗಳಲ್ಲಿ **65% ಮಳೆಯಾಗುವ ಮುನ್ಸೂಚನೆ** ಇರುವುದರಿಂದ, ಇಂದು ನೀರಾವರಿ ಮಾಡುವುದನ್ನು ಮುಂದೂಡಲು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ.`
            : language === 'hi'
            ? `💧 **सिंचाई सलाह:**\nवर्तमान में आपके खेत की मिट्टी में नमी **${weather.soilMoisture}%** (पर्याप्त) है। अगले 36 घंटों में **बारिश की 65% संभावना** है, इसलिए आज अतिरिक्त सिंचाई न करने की सलाह दी जाती है।`
            : `💧 **Smart Irrigation Advisory:**\nYour current soil moisture is optimal at **${weather.soilMoisture}%**. With **${weather.rainProbability}% to 65% rain probability** forecasted over the next 36 hours, you can save energy and postpone pump operation for 2 days.`;
      } else if (q.includes('spot') || q.includes('disease') || q.includes('tomato') || q.includes('ರೋಗ') || q.includes('ಇಲಾಜು') || q.includes('मक्के') || q.includes('धब्बे')) {
        reply =
          language === 'kn'
            ? `🔬 **ರೋಗ ತಪಾಸಣೆ:**\nಟೊಮ್ಯಾಟೋ ಎಲೆಯ ಮೇಲಿನ ವೃತ್ತಾಕಾರದ ಕಪ್ಪು ಮಚ್ಚೆಗಳು **Early Blight (ಆಲ್ಟರ್ನೇರಿಯಾ ಸೊಲಾನಿ)** ಶಿಲೀಂಧ್ರ ರೋಗದ ಲಕ್ಷಣಗಳಾಗಿವೆ.\n\n✅ **ಜೈವಿಕ ಚಿಕಿತ್ಸೆ:** ಟ್ರೈಕೋಡರ್ಮ ವಿರಿಡೆ (5g/ಲೀಟರ್) ಸಿಂಪಡಿಸಿ.\n⚠️ **ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆ:** Azoxystrobin 18.2% + Difenoconazole (1 ml/L) ಸಿಂಪಡಿಸಿ.`
            : language === 'hi'
            ? `🔬 **फसल रोग निदान:**\nपत्तियों पर गोल गाढ़े छल्ले **अर्ली ब्लाइट (Early Blight)** कवक के लक्षण हैं।\n\n✅ **जैविक उपचार:** ट्राइकोडर्मा विरिडी 5 ग्राम प्रति लीटर पानी में मिलाकर छिड़कें।\n⚠️ **रासायनिक नियंत्रण:** एज़ोक्सीस्ट्रोबिन + डिफेनोकोनाज़ोल (1 मिली/लीटर) का छिड़काव करें।`
            : `🔬 **AI Pathology Diagnosis:**\nTarget-board concentric dark rings on tomato foliage indicate **Early Blight (Alternaria solani)** with 94% probability.\n\n✅ **Organic Treatment:** Spray Trichoderma viride @ 5g/L or 1% Bordeaux mixture.\n⚠️ **Chemical Remedy:** Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L in the cool evening window.`;
      } else if (q.includes('sell') || q.includes('price') || q.includes('ಮಾರಾಟ') || q.includes('ಮಂಡಿ') || q.includes('भाव') || q.includes('बेचने')) {
        reply =
          language === 'kn'
            ? `📈 **ಕೃಷಿಭವಿಷ್ಯ ಎಐ ಮಾರಾಟ ಮುನ್ಸೂಚನೆ:**\nಟೊಮ್ಯಾಟೋ ದರಗಳು ಪ್ರಸ್ತುತ ₹2,250/ಕ್ವಿಂಟಾಲ್‌ನಿಂದ ಮುಂದಿನ 20-30 ದಿನಗಳಲ್ಲಿ **₹3,120/ಕ್ವಿಂಟಾಲ್** ವರೆಗೆ ಏರುವ ಸಾಧ್ಯತೆ ಇದೆ (+38% ಹೆಚ್ಚುವರಿ ಲಾಭ). ಬೆಂಗಳೂರು ಅಥವಾ ಕೋಲಾರ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಮಾರಾಟ ಮಾಡುವುದು ಅತ್ಯಂತ ಲಾಭದಾಯಕ.`
            : language === 'hi'
            ? `📈 **कृषिभविष्य AI बाजार विश्लेषण:**\nटमाटर के भाव वर्तमान ₹2,250/क्विंटल से अगले 25-30 दिनों में **₹3,120/क्विंटल** तक बढ़ने का अनुमान है (+38% अतिरिक्त लाभ)। निकटतम बेंगलुरु या कोलार APMC में बेचना सबसे फायदेमंद रहेगा।`
            : `📈 **KrishiBhavishya Market Forecast:**\nOur predictive engine projects Tomato prices surging from ₹2,250/qtl to a peak of **₹3,120/qtl in 25–30 days (+38.6% profit lift)**. Best selling window is active during the upcoming festival demand spike at Kolar & Bengaluru APMC.`;
      } else if (q.includes('scheme') || q.includes('subsidy') || q.includes('ಯೋಜನೆ') || q.includes('ಸಬ್ಸಿಡಿ') || q.includes('योजना') || q.includes('सब्सिडी')) {
        reply =
          language === 'kn'
            ? `🏛️ **ಸರ್ಕಾರಿ ಯೋಜನೆ ಮಾಹಿತಿ:**\nನಿಮ್ಮ ${user?.landSize || 6.5} ಎಕರೆ ಜಮೀನಿಗೆ **PMKSY ಹನಿ ನೀರಾವರಿ ಯೋಜನೆ (75% ರಿಂದ 90% ಸಬ್ಸಿಡಿ)** ಮತ್ತು **PM-KISAN (ವರ್ಷಕ್ಕೆ ₹6,000)** ಲಭ್ಯವಿದೆ. ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಟ್ಯಾಬ್‌ನಲ್ಲಿ ನೇರವಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು.`
            : language === 'hi'
            ? `🏛️ **सरकारी योजना पात्रता:**\nआपकी ${user?.landSize || 6.5} एकड़ भूमि के लिए **PMKSY सूक्ष्म सिंचाई (75% से 90% सब्सिडी)** और **PM-किसान सम्मान निधि (₹6,000/वर्ष)** पूरी तरह से लागू है। आप सरकारी योजनाएं टैब से आवेदन प्रक्रिया देख सकते हैं।`
            : `🏛️ **Government Scheme Match:**\nBased on your registered **${user?.landSize || 6.5} acres** in ${user?.district || 'Mandya'}, you are eligible for **PMKSY Micro-Irrigation (up to 75–90% capital subsidy)** and **PM-KISAN (₹6,000/yr DBT)**. You can track paperwork in the Scheme Finder tab!`;
      } else {
        reply =
          language === 'kn'
            ? `🌾 **ಕೃಷಿ ಮಾಹಿತಿ:** ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ನೈಜ ಸಮಯದ ವಿಶ್ಲೇಷಣೆ ಸಿದ್ಧವಾಗಿದೆ. ನಿಮ್ಮ ಜಮೀನಿನ ಆರೋಗ್ಯ ಸ್ಕೋರ್ **94/100** ಆಗಿದೆ ಮತ್ತು ಒಟ್ಟು ನಿವ್ವಳ ಲಾಭ **₹${financialSummary.netProfit.toLocaleString('en-IN')}** ಆಗಿದೆ.`
            : language === 'hi'
            ? `🌾 **कृषि विश्लेषण:** आपके प्रश्न के अनुसार आपका खेत स्वास्थ्य स्कोर **94/100** बहुत अच्छा है, और वर्तमान शुद्ध लाभ **₹${financialSummary.netProfit.toLocaleString('en-IN')}** दर्ज किया गया है।`
            : `🌾 **KrishiSmart AI Insight:** Based on your registered crops (${crops.map((c) => c.name).join(', ')}), your current Farm Health Index is strong at **94/100**, and projected net revenue is **₹${financialSummary.netProfit.toLocaleString('en-IN')}**. Let me know if you want a deeper breakdown!`;
      }

      const aiMsg: AIChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      addXP(15, 'Consulted Krishi AI');
    }, 1000);
  };

  const handleVoiceToggle = () => {
    setIsListening((prev) => !prev);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        const sampleVoicePrompt =
          language === 'kn'
            ? "ಇಂದು ನನ್ನ ಬೆಳೆಗೆ ನೀರು ಹಾಯಿಸಬೇಕೇ?"
            : language === 'hi'
            ? "क्या मुझे आज अपने खेत में सिंचाई करनी चाहिए?"
            : "Should I irrigate my crops today?";
        setInput(sampleVoicePrompt);
        handleSend(sampleVoicePrompt);
      }, 2500);
    }
  };

  const currentSuggestions = initialPrompts[language] || initialPrompts.en;

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-600 text-white shadow-xl shadow-emerald-700/30 hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-emerald-400/40"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
          </span>

          <BrainCircuit className="w-5 h-5 animate-pulse" />
          <span className="font-extrabold text-xs tracking-wide font-heading">
            {t('askAi')}
          </span>
        </button>
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 sm:left-6 z-50 w-[92vw] sm:w-[420px] h-[560px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-800 to-emerald-700 text-white flex items-center justify-between border-b border-emerald-600/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Bot className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm leading-tight font-heading">
                    KrishiSmart AI Assistant
                  </h3>
                  <span className="px-1.5 py-0.2 bg-emerald-500/40 text-emerald-200 text-[9px] font-extrabold rounded-sm uppercase tracking-wider">
                    24/7 Live
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200/80">
                  Multilingual Agronomist & Market Intelligence
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-xs shadow-sm font-medium'
                      : 'bg-white border border-slate-200/90 text-slate-800 rounded-bl-xs shadow-xs whitespace-pre-line'
                  }`}
                >
                  {msg.text}
                  <div
                    className={`text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-emerald-100/70' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <UserIcon className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-500 bg-white p-3 rounded-2xl border border-slate-200 max-w-[140px] shadow-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></div>
                <span className="text-[10px] font-semibold text-slate-400">Analyzing...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 bg-slate-100/70 border-t border-slate-200/80 overflow-x-auto flex gap-1.5 no-scrollbar">
            {currentSuggestions.slice(0, 3).map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 text-[10px] font-medium text-slate-700 hover:text-emerald-800 border border-slate-200 transition-colors shadow-2xs shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <button
              onClick={handleVoiceToggle}
              className={`p-2.5 rounded-xl transition-all ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-800'
              }`}
              title="Voice Input (English, Kannada, Hindi)"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={
                language === 'kn'
                  ? "ಕೃಷಿ ಪ್ರಶ್ನೆ ಕೇಳಿ..."
                  : language === 'hi'
                  ? "कृषि प्रश्न पूछें..."
                  : "Ask about crops, pests, prices, schemes..."
              }
              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all placeholder:text-slate-400"
            />

            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white shadow-md shadow-emerald-600/20 transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
