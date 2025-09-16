import type { Language } from './constants';

type Translations = {
  [key: string]: {
    [lang in Language]: string;
  };
};

export const translations: Translations = {
  // Header
  dashboard: { en: 'Dashboard', hi: 'डैशबोर्ड' },
  map: { en: 'Map', hi: 'नक्शा' },
  forecast: { en: 'Forecast', hi: 'पूर्वानुमान' },
  conservationTips: { en: 'Conservation Tips', hi: 'संरक्षण युक्तियाँ' },
  selectRole: { en: 'Select Role', hi: 'भूमिका चुनें' },
  
  // Public Dashboard
  groundwaterHealth: { en: 'Groundwater Health', hi: 'भूजल स्वास्थ्य' },
  publicIntro: { en: 'Monitor real-time groundwater levels and health status in your area. Select a level to see detailed information.', hi: 'अपने क्षेत्र में वास्तविक समय में भूजल स्तर और स्वास्थ्य की स्थिति की निगरानी करें। विस्तृत जानकारी देखने के लिए एक स्तर चुनें।'},
  villageLevel: { en: 'Village Level', hi: 'ग्राम स्तर' },
  districtLevel: { en: 'District Level', hi: 'जिला स्तर' },
  status: { en: 'Status', hi: 'स्थिति' },
  normal: { en: 'Normal', hi: 'सामान्य' },
  concerning: { en: 'Concerning', hi: 'चिंताजनक' },
  critical: { en: 'Critical', hi: 'गंभीर' },
  
  // Farmer Dashboard
  farmerDashboard: { en: 'Farmer Dashboard', hi: 'किसान डैशबोर्ड' },
  cropWaterNeeds: { en: 'Crop Water Needs', hi: 'फसल की पानी की जरूरत' },
  irrigationRecs: { en: 'Irrigation Recommendations', hi: 'सिंचाई की सिफारिशें' },
  groundwaterForecast: { en: 'Groundwater Forecast', hi: 'भूजल पूर्वानुमान' },

  // Researcher Dashboard
  researcherDashboard: { en: 'Researcher Dashboard', hi: 'शोधकर्ता डैशबोर्ड' },
  researcherIntro: { en: 'Access advanced data models and forecasting tools.', hi: 'उन्नत डेटा मॉडल और पूर्वानुमान उपकरणों तक पहुंचें।'},

  // Government Dashboard
  governmentDashboard: { en: 'Government Dashboard', hi: 'सरकारी डैशबोर्ड' },
  govIntro: { en: 'Monitor regional water levels and policy impacts.', hi: 'क्षेत्रीय जल स्तर और नीतिगत प्रभावों की निगरानी करें।'},

  // Map Page
  mapDashboard: { en: 'Interactive Geo-Mapped Dashboard', hi: 'इंटरैक्टिव जियो-मैप्ड डैशबोर्ड' },
  mapDescription: { en: 'Visualization of groundwater depth, rainfall, soil, and crop patterns.', hi: 'भूजल की गहराई, वर्षा, मिट्टी और फसल पैटर्न का विज़ुअलाइज़ेशन।' },

  // Forecast Page
  aiForecast: { en: 'AI-Powered Water Forecasting', hi: 'एआई-पावर्ड जल पूर्वानुमान' },
  forecastDescription: { en: 'Predict groundwater availability based on various factors.', hi: 'विभिन्न कारकों के आधार पर भूजल की उपलब्धता की भविष्यवाणी करें।'},
  location: { en: 'Location', hi: 'स्थान' },
  locationPlaceholder: { en: 'e.g., Nagpur, Maharashtra', hi: 'जैसे, नागपुर, महाराष्ट्र' },
  timeHorizon: { en: 'Time Horizon', hi: 'समय सीमा' },
  timeHorizonPlaceholder: { en: 'e.g., Next 3 months', hi: 'जैसे, अगले 3 महीने' },
  weatherPatterns: { en: 'Weather Patterns', hi: 'मौसम के पैटर्न' },
  weatherPlaceholder: { en: 'e.g., Delayed monsoon, higher temperatures', hi: 'जैसे, मानसून में देरी, उच्च तापमान' },
  usageData: { en: 'Usage Data', hi: 'उपयोग डेटा' },
  usagePlaceholder: { en: 'e.g., Increased agricultural demand', hi: 'जैसे, कृषि मांग में वृद्धि' },
  dwlrData: { en: 'DWLR Data', hi: 'DWLR डेटा' },
  dwlrPlaceholder: { en: 'e.g., Water levels dropping faster than average', hi: 'जैसे, जल स्तर औसत से अधिक तेजी से गिर रहा है' },
  getForecast: { en: 'Get Forecast', hi: 'पूर्वानुमान प्राप्त करें' },
  forecastResult: { en: 'Forecast Result', hi: 'पूर्वानुमान परिणाम' },
  aiExplanation: { en: 'AI Explanation', hi: 'एआई स्पष्टीकरण' },
  confidence: { en: 'Confidence', hi: 'आत्मविश्वास' },
  getExplanation: { en: 'Get Detailed Explanation', hi: 'विस्तृत स्पष्टीकरण प्राप्त करें' },

  // Conservation Tips
  tipsTitle: { en: 'Water Conservation Practices', hi: 'जल संरक्षण अभ्यास' },
  dripIrrigation: { en: 'Drip Irrigation', hi: 'ड्रिप सिंचाई' },
  dripIrrigationDesc: { en: 'Use drip irrigation to deliver water directly to the plant roots, minimizing evaporation.', hi: 'पौधों की जड़ों तक सीधे पानी पहुंचाने के लिए ड्रिप सिंचाई का उपयोग करें, जिससे वाष्पीकरण कम हो।' },
  mulching: { en: 'Mulching', hi: 'मल्चिंग' },
  mulchingDesc: { en: 'Apply mulch around plants to retain soil moisture and reduce the need for frequent watering.', hi: 'मिट्टी की नमी बनाए रखने और बार-बार पानी देने की आवश्यकता को कम करने के लिए पौधों के चारों ओर मल्च लगाएं।' },
  rainwaterHarvesting: { en: 'Rainwater Harvesting', hi: 'वर्षा जल संचयन' },
  rainwaterHarvestingDesc: { en: 'Collect and store rainwater for use during dry periods, reducing reliance on groundwater.', hi: 'शुष्क अवधि के दौरान उपयोग के लिए वर्षा जल एकत्र और संग्रहीत करें, जिससे भूजल पर निर्भरता कम हो।' },
  cropSelection: { en: 'Drought-Resistant Crops', hi: 'सूखा प्रतिरोधी फसलें' },
  cropSelectionDesc: { en: 'Choose crop varieties that are well-suited to your region\'s climate and require less water.', hi: 'ऐसी फसल किस्मों का चयन करें जो आपके क्षेत्र की जलवायु के लिए उपयुक्त हों और जिन्हें कम पानी की आवश्यकता हो।' },

  // Footer
  footerText: { en: '© 2024 Jal Drishti. All Rights Reserved.', hi: '© 2024 जल दृष्टि। सर्वाधिकार सुरक्षित।' },
};
