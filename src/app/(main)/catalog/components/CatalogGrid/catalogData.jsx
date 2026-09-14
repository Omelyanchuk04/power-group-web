import React from "react";

// --- ГОЛОВНІ SVG ІКОНКИ ---
export const IconPanel = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <line x1="15" y1="3" x2="15" y2="21" />
  </svg>
);
export const IconInverter = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);
export const IconStorage = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="6" width="20" height="12" rx="2" ry="2" />
    <path d="M6 12h4" />
    <path d="M14 12h4" />
  </svg>
);
export const IconPower = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);
export const IconTool = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);
export const IconBattery = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
    <line x1="22" y1="11" x2="22" y2="13" />
    <polyline points="6 11 8 13 12 9" />
  </svg>
);
export const IconArrowRight = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
export const IconCheck = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
export const TagIconBrand = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

// --- КОНФІГ КАТЕГОРІЙ ---
export const CATEGORIES = [
  { id: "solar_panels", label: "Сонячні панелі", icon: <IconPanel /> },
  {
    id: "hybrid_inverters",
    label: "Гібридні інвертори",
    icon: <IconInverter />,
  },
  { id: "inverters", label: "Мережеві інвертори", icon: <IconInverter /> },
  { id: "batteries", label: "Акумулятори", icon: <IconBattery /> },
  { id: "storage", label: "Системи накопичення", icon: <IconStorage /> },
  { id: "power_equipment", label: "Силове обладнання", icon: <IconPower /> },
  { id: "components", label: "Комплектуючі для монтажу", icon: <IconTool /> },
];

// --- КОНФІГ ФІЛЬТРІВ ДЛЯ КОЖНОЇ КАТЕГОРІЇ ---
export const FILTER_CONFIG = {
  solar_panels: [
    {
      key: "brand",
      title: "Виробник",
      type: "checkbox",
      options: ["Jinko", "Longi", "Trina", "Risen", "Ja Solar"],
    },
    {
      key: "powerRange",
      title: "Потужність",
      type: "checkbox",
      options: ["до 400 Вт", "400-500 Вт", "500-600 Вт", "понад 600 Вт"],
    },
  ],
  hybrid_inverters: [
    {
      key: "brand",
      title: "Виробник",
      type: "checkbox",
      options: ["Deye", "Solis", "Sungrow", "Huawei"],
    },
    {
      key: "phase",
      title: "Кількість фаз",
      type: "checkbox",
      options: ["1 фаза", "3 фази"],
    },
    {
      key: "powerNum",
      title: "Потужність інвертора",
      type: "slider",
      min: 0,
      max: 150,
      step: 5,
    },
  ],
  inverters: [
    {
      key: "brand",
      title: "Виробник",
      type: "checkbox",
      options: ["Deye", "Solis", "Sungrow", "Huawei"],
    },
    {
      key: "phase",
      title: "Кількість фаз",
      type: "checkbox",
      options: ["1 фаза", "3 фази"],
    },
    {
      key: "powerNum",
      title: "Потужність СЕС",
      type: "slider",
      min: 0,
      max: 150,
      step: 5,
    },
  ],
  batteries: [
    {
      key: "brand",
      title: "Виробник",
      type: "checkbox",
      options: ["Deye", "Dyness", "GSL ENERGY", "FoxESS"],
    },
    {
      key: "batType",
      title: "Тип батареї",
      type: "checkbox",
      options: ["Низьковольтна", "Високовольтна"],
    },
  ],
  storage: [
    {
      key: "brand",
      title: "Виробник",
      type: "checkbox",
      options: ["Deye", "Dyness", "GSL ENERGY", "FoxESS"],
    },
  ],
  power_equipment: [
    {
      key: "type",
      title: "Тип виконання",
      type: "checkbox",
      options: [
        "для гібридних інверторів",
        "для мережевих інверторів",
        "для установок зберігання енергії",
        "для дизельних генераторів АВР",
      ],
    },
    {
      key: "powerNum",
      title: "Потужність",
      type: "slider",
      min: 0,
      max: 150,
      step: 5,
    },
  ],
  components: [
    {
      key: "type",
      title: "Розділ",
      type: "checkbox",
      options: ["Кабель", "Конектори МС-4", "Кріплення", "Лічильники", "Інше"],
    },
  ],
};

// --- ВЕЛИКА БАЗА ТОВАРІВ ---
export const MOCK_PRODUCTS = [
  // ================= СОНЯЧНІ ПАНЕЛІ =================
  {
    id: 101,
    category: "solar_panels",
    brand: "Jinko",
    powerRange: "500-600 Вт",
    name: "Сонячна панель Jinko Solar Tiger Neo N-type 550W",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 102,
    category: "solar_panels",
    brand: "Longi",
    powerRange: "500-600 Вт",
    name: "Сонячна панель Longi Solar Hi-MO 5 540W",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 103,
    category: "solar_panels",
    brand: "Trina",
    powerRange: "400-500 Вт",
    name: "Сонячна панель Trina Solar Vertex S 425W",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 104,
    category: "solar_panels",
    brand: "Risen",
    powerRange: "понад 600 Вт",
    name: "Сонячна панель Risen Energy Titan 650W",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 105,
    category: "solar_panels",
    brand: "Ja Solar",
    powerRange: "500-600 Вт",
    name: "Сонячна панель JA Solar DeepBlue 3.0 545W",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 106,
    category: "solar_panels",
    brand: "Jinko",
    powerRange: "до 400 Вт",
    name: "Сонячна панель Jinko Solar Cheetah 340W",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 107,
    category: "solar_panels",
    brand: "Trina",
    powerRange: "500-600 Вт",
    name: "Сонячна панель Trina Vertex 550W",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 108,
    category: "solar_panels",
    brand: "Risen",
    powerRange: "400-500 Вт",
    name: "Сонячна панель Risen Energy 450W",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 109,
    category: "solar_panels",
    brand: "Longi",
    powerRange: "400-500 Вт",
    name: "Сонячна панель Longi Hi-MO 4 450W",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 110,
    category: "solar_panels",
    brand: "Ja Solar",
    powerRange: "до 400 Вт",
    name: "Сонячна панель JA Solar 380W Black",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 111,
    category: "solar_panels",
    brand: "Jinko",
    powerRange: "понад 600 Вт",
    name: "Сонячна панель Jinko Solar Tiger Pro 610W",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 112,
    category: "solar_panels",
    brand: "Trina",
    powerRange: "понад 600 Вт",
    name: "Сонячна панель Trina Vertex 670W",
    image: "/images/catalog/2.jpg",
  },

  // ================= ГІБРИДНІ ІНВЕРТОРИ =================
  {
    id: 201,
    category: "hybrid_inverters",
    brand: "Deye",
    phase: "3 фази",
    powerNum: 12,
    name: "Гібридний інвертор Deye SUN-12K-SG04LP3-EU",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 202,
    category: "hybrid_inverters",
    brand: "Solis",
    phase: "1 фаза",
    powerNum: 6,
    name: "Гібридний інвертор Solis RHI-6K-48ES-5G",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 203,
    category: "hybrid_inverters",
    brand: "Sungrow",
    phase: "3 фази",
    powerNum: 10,
    name: "Гібридний інвертор Sungrow SH10RT",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 204,
    category: "hybrid_inverters",
    brand: "Huawei",
    phase: "3 фази",
    powerNum: 10,
    name: "Гібридний інвертор Huawei SUN2000-10KTL-M1",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 205,
    category: "hybrid_inverters",
    brand: "Deye",
    phase: "1 фаза",
    powerNum: 8,
    name: "Гібридний інвертор Deye SUN-8K-SG01LP1-EU",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 206,
    category: "hybrid_inverters",
    brand: "Deye",
    phase: "3 фази",
    powerNum: 50,
    name: "Гібридний інвертор Deye SUN-50K-SG01HP3-EU-BM4",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 207,
    category: "hybrid_inverters",
    brand: "Solis",
    phase: "3 фази",
    powerNum: 10,
    name: "Гібридний інвертор Solis RHI-3P10K-HVES-5G",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 208,
    category: "hybrid_inverters",
    brand: "Sungrow",
    phase: "1 фаза",
    powerNum: 5,
    name: "Гібридний інвертор Sungrow SH5.0RS",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 209,
    category: "hybrid_inverters",
    brand: "Huawei",
    phase: "1 фаза",
    powerNum: 5,
    name: "Гібридний інвертор Huawei SUN2000-5KTL-L1",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 210,
    category: "hybrid_inverters",
    brand: "Deye",
    phase: "3 фази",
    powerNum: 20,
    name: "Гібридний інвертор Deye SUN-20K-SG01HP3-EU",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 211,
    category: "hybrid_inverters",
    brand: "Solis",
    phase: "1 фаза",
    powerNum: 5,
    name: "Гібридний інвертор Solis S6-EH1P5K-L-PRO",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 212,
    category: "hybrid_inverters",
    brand: "Sungrow",
    phase: "3 фази",
    powerNum: 20,
    name: "Гібридний інвертор Sungrow SH20T",
    image: "/images/catalog/3.jpg",
  },

  // ================= МЕРЕЖЕВІ ІНВЕРТОРИ =================
  {
    id: 301,
    category: "inverters",
    brand: "Deye",
    phase: "3 фази",
    powerNum: 30,
    name: "Мережевий інвертор Deye SUN-30K-G04",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 302,
    category: "inverters",
    brand: "Huawei",
    phase: "3 фази",
    powerNum: 30,
    name: "Мережевий інвертор Huawei SUN2000-30KTL-M3",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 303,
    category: "inverters",
    brand: "Solis",
    phase: "3 фази",
    powerNum: 110,
    name: "Мережевий інвертор Solis-110K-5G",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 304,
    category: "inverters",
    brand: "Sungrow",
    phase: "3 фази",
    powerNum: 125,
    name: "Мережевий інвертор Sungrow SG125CX-P2",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 305,
    category: "inverters",
    brand: "Solis",
    phase: "1 фаза",
    powerNum: 8,
    name: "Мережевий інвертор Solis S6-GR1P8K",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 306,
    category: "inverters",
    brand: "Huawei",
    phase: "3 фази",
    powerNum: 150,
    name: "Інвертор Huawei SUN2000-330KTL (Високовольтний)",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 307,
    category: "inverters",
    brand: "Huawei",
    phase: "3 фази",
    powerNum: 20,
    name: "Мережевий інвертор Huawei SUN2000-20KTL-M2",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 308,
    category: "inverters",
    brand: "Solis",
    phase: "3 фази",
    powerNum: 50,
    name: "Мережевий інвертор Solis-50K-5G",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 309,
    category: "inverters",
    brand: "Sungrow",
    phase: "3 фази",
    powerNum: 33,
    name: "Мережевий інвертор Sungrow SG33CX",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 310,
    category: "inverters",
    brand: "Deye",
    phase: "3 фази",
    powerNum: 50,
    name: "Мережевий інвертор Deye SUN-50K-G03",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 311,
    category: "inverters",
    brand: "Huawei",
    phase: "3 фази",
    powerNum: 100,
    name: "Мережевий інвертор Huawei SUN2000-100KTL-M2",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 312,
    category: "inverters",
    brand: "Solis",
    phase: "3 фази",
    powerNum: 100,
    name: "Мережевий інвертор Solis-100K-5G",
    image: "/images/catalog/4.jpg",
  },

  // ================= АКУМУЛЯТОРИ =================
  {
    id: 401,
    category: "batteries",
    brand: "Dyness",
    batType: "Низьковольтна",
    name: "Акумулятор Dyness BX51100 (5.12 кВт*год, 48В)",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 402,
    category: "batteries",
    brand: "Deye",
    batType: "Високовольтна",
    name: "Високовольтний акумулятор Deye BOS-G 5.1",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 403,
    category: "batteries",
    brand: "GSL ENERGY",
    batType: "Низьковольтна",
    name: "Акумулятор GSL Energy 48V 100Ah LiFePO4",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 404,
    category: "batteries",
    brand: "FoxESS",
    batType: "Високовольтна",
    name: "Акумуляторний блок FoxESS HV2600",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 405,
    category: "batteries",
    brand: "Deye",
    batType: "Низьковольтна",
    name: "Акумулятор Deye SE-G5.1 Pro (LiFePO4)",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 406,
    category: "batteries",
    brand: "Dyness",
    batType: "Високовольтна",
    name: "Високовольтний модуль Dyness Tower T10",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 407,
    category: "batteries",
    brand: "FoxESS",
    batType: "Низьковольтна",
    name: "Акумулятор FoxESS LV5200 (5.12 кВт*год)",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 408,
    category: "batteries",
    brand: "GSL ENERGY",
    batType: "Високовольтна",
    name: "Високовольтний акумулятор GSL Energy HVS 10.2",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 409,
    category: "batteries",
    brand: "Dyness",
    batType: "Низьковольтна",
    name: "Акумулятор Dyness A48100 4.8 кВт*год",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 410,
    category: "batteries",
    brand: "Deye",
    batType: "Високовольтна",
    name: "Акумуляторний модуль Deye BOS-G (Високовольтний кластер)",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 411,
    category: "batteries",
    brand: "GSL ENERGY",
    batType: "Низьковольтна",
    name: "Акумулятор GSL Energy Wall Mount 48V 200Ah",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 412,
    category: "batteries",
    brand: "FoxESS",
    batType: "Високовольтна",
    name: "Акумулятор FoxESS ECM2900 (Майстер-модуль)",
    image: "/images/catalog/5.jpg",
  },

  // ================= СИСТЕМИ НАКОПИЧЕННЯ =================
  {
    id: 501,
    category: "storage",
    brand: "GSL ENERGY",
    name: "Комплексна система зберігання GSL Energy 10kWh",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 502,
    category: "storage",
    brand: "Dyness",
    name: "Система накопичення енергії Dyness Powerbox Pro",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 503,
    category: "storage",
    brand: "Deye",
    name: "Стекова система зберігання Deye RW-M6.1",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 504,
    category: "storage",
    brand: "FoxESS",
    name: "Модульна система FoxESS ECS2900 (Стек)",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 505,
    category: "storage",
    brand: "Deye",
    name: "All-in-one система накопичення Deye ESS 15kWh",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 506,
    category: "storage",
    brand: "Dyness",
    name: "Система зберігання Dyness PowerDepot H5",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 507,
    category: "storage",
    brand: "GSL ENERGY",
    name: "Промислова система GSL Energy 50kWh Cabinet",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 508,
    category: "storage",
    brand: "FoxESS",
    name: "Система FoxESS All-in-One AIO-H1-5.0",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 509,
    category: "storage",
    brand: "Deye",
    name: "Високовольтна система зберігання Deye GB-L 20kWh",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 510,
    category: "storage",
    brand: "Dyness",
    name: "Система накопичення Dyness Tower T14",
    image: "/images/catalog/4.jpg",
  },

  // ================= СИЛОВЕ ОБЛАДНАННЯ =================
  {
    id: 601,
    category: "power_equipment",
    type: "для гібридних інверторів",
    powerNum: 15,
    name: "Щит захисту AC/DC для гібридної СЕС 15 кВт",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 602,
    category: "power_equipment",
    type: "для мережевих інверторів",
    powerNum: 30,
    name: "Щит збору потужності для СЕС 30 кВт",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 603,
    category: "power_equipment",
    type: "для дизельних генераторів АВР",
    powerNum: 100,
    name: "Шафа АВР (Автоматичне введення резерву) 100 кВт",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 604,
    category: "power_equipment",
    type: "для установок зберігання енергії",
    powerNum: 50,
    name: "Щит комутації акумуляторних батарей BESS 50 кВт",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 605,
    category: "power_equipment",
    type: "для гібридних інверторів",
    powerNum: 8,
    name: "Щит захисту для гібридного інвертора 8 кВт",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 606,
    category: "power_equipment",
    type: "для мережевих інверторів",
    powerNum: 150,
    name: "Головний розподільчий щит промислової СЕС 150 кВт",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 607,
    category: "power_equipment",
    type: "для мережевих інверторів",
    powerNum: 50,
    name: "Щит захисту AC/DC для мережевої СЕС 50 кВт",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 608,
    category: "power_equipment",
    type: "для дизельних генераторів АВР",
    powerNum: 50,
    name: "Шафа АВР на 50 кВт (Контакторного типу)",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 609,
    category: "power_equipment",
    type: "для гібридних інверторів",
    powerNum: 10,
    name: "Щит захисту для гібридного інвертора 10 кВт",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 610,
    category: "power_equipment",
    type: "для установок зберігання енергії",
    powerNum: 100,
    name: "Промисловий щит для BESS систем 100 кВт",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 611,
    category: "power_equipment",
    type: "для дизельних генераторів АВР",
    powerNum: 150,
    name: "Промисловий АВР 150 кВт з мотор-приводом",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 612,
    category: "power_equipment",
    type: "для мережевих інверторів",
    powerNum: 100,
    name: "Щит збору потужності для СЕС 100 кВт",
    image: "/images/catalog/1.jpg",
  },

  // ================= КОМПЛЕКТУЮЧІ ДЛЯ МОНТАЖУ =================
  {
    id: 701,
    category: "components",
    type: "Кабель",
    name: "Сонячний кабель KBE Solar 6 мм² (Котушка 500м)",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 702,
    category: "components",
    type: "Конектори МС-4",
    name: "Комплект оригінальних конекторів MC-4 Staubli",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 703,
    category: "components",
    type: "Кріплення",
    name: "Профіль монтажний алюмінієвий 41х41 (3 метри)",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 704,
    category: "components",
    type: "Лічильники",
    name: "Смарт-лічильник Huawei Smart Power Sensor DTSU666-H",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 705,
    category: "components",
    type: "Кріплення",
    name: "Комплект кріплень для керамічної черепиці",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 706,
    category: "components",
    type: "Інше",
    name: "Запобіжник по постійному струму 1000V 15A",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 707,
    category: "components",
    type: "Лічильники",
    name: "Смарт-метр Eastron SDM630-Modbus V2",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 708,
    category: "components",
    type: "Кабель",
    name: "Кабель силовий ВВГнг-LS 5х16",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 709,
    category: "components",
    type: "Кабель",
    name: "Сонячний кабель Hikra Solar 4 мм² (Чорний)",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 710,
    category: "components",
    type: "Кріплення",
    name: "Гвинт-шуруп для кріплення на металочерепицю (М10х200)",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 711,
    category: "components",
    type: "Конектори МС-4",
    name: "Y-подібний розгалужувач MC-4 (1 пара)",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 712,
    category: "components",
    type: "Лічильники",
    name: "Смарт-лічильник Sungrow DTSD1352-C (3 фази)",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 713,
    category: "components",
    type: "Інше",
    name: "Автоматичний вимикач постійного струму 1000V 32A",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 714,
    category: "components",
    type: "Кабель",
    name: "Кабель заземлення ПВ-3 1х16 Ж/З",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 715,
    category: "components",
    type: "Кріплення",
    name: "Притиск кінцевий алюмінієвий (35мм)",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 716,
    category: "components",
    type: "Кріплення",
    name: "Притиск міжпанельний алюмінієвий",
    image: "/images/catalog/1.jpg",
  },
];
