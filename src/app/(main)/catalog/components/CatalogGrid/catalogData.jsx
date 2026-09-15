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

const STANDARD_POWER_RANGES = [
  "6-10 кВт",
  "11-15 кВт",
  "16-25 кВт",
  "26-50 кВт",
  "51-100 кВт",
  "понад 100 кВт",
];

// --- КОНФІГ ФІЛЬТРІВ ---
export const FILTER_CONFIG = {
  solar_panels: [
    {
      key: "brand",
      title: "Виробник (бренд)",
      type: "checkbox",
      options: [
        "Longi Solar",
        "Tongwei Solar",
        "Jinko Solar",
        "JA Solar",
        "Trina Solar",
      ],
    },
    {
      key: "powerRange",
      title: "Потужність",
      type: "checkbox",
      options: ["300 - 400 Вт", "400 - 500 Вт", "500 - 600 Вт", "600 - 700 Вт"],
    },
    {
      key: "dimensions",
      title: "Габарити",
      type: "checkbox",
      options: [
        "1722х1134",
        "1762x1134",
        "1961×1134",
        "1990х1134",
        "2278x1134",
        "2382x1134",
      ],
    },
  ],
  hybrid_inverters: [
    {
      key: "brand",
      title: "Виробник (бренд)",
      type: "checkbox",
      options: [
        "Deye",
        "Solis",
        "Afore",
        "Sungrow",
        "FoxESS",
        "LuxPower",
        "Huawei",
      ],
    },
    {
      key: "phase",
      title: "Кількість фаз",
      type: "checkbox",
      options: ["1 фаза", "3 фази"],
    },
    {
      key: "invType",
      title: "Тип",
      type: "checkbox",
      options: ["високовольтний", "низьковольтний"],
    },
    {
      key: "powerRange",
      title: "Потужність",
      type: "checkbox",
      options: STANDARD_POWER_RANGES,
    },
  ],
  inverters: [
    {
      key: "brand",
      title: "Виробник (бренд)",
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
      key: "powerRange",
      title: "Потужність",
      type: "checkbox",
      options: STANDARD_POWER_RANGES,
    },
  ],
  batteries: [
    {
      key: "brand",
      title: "Виробник (бренд)",
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
      title: "Виробник (бренд)",
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
      key: "powerRange",
      title: "Потужність",
      type: "checkbox",
      options: STANDARD_POWER_RANGES,
    },
  ],
  components: [
    {
      key: "type",
      title: "Розділи",
      type: "checkbox",
      options: ["Кабель", "Конектори МС-4", "Кріплення", "Лічильники", "Інше"],
    },
  ],
};

// --- БАЗА ТОВАРІВ ---
export const MOCK_PRODUCTS = [
  // ================= ПАНЕЛІ =================
  {
    id: 101,
    category: "solar_panels",
    brand: "Jinko Solar",
    dimensions: "2278x1134",
    powerRange: "500 - 600 Вт",
    name: "Сонячна панель Jinko Tiger Neo 550W",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 102,
    category: "solar_panels",
    brand: "Longi Solar",
    dimensions: "2278x1134",
    powerRange: "500 - 600 Вт",
    name: "Сонячна панель Longi Hi-MO 5 540W",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 103,
    category: "solar_panels",
    brand: "Trina Solar",
    dimensions: "1762x1134",
    powerRange: "400 - 500 Вт",
    name: "Сонячна панель Trina Vertex S 425W",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 104,
    category: "solar_panels",
    brand: "Tongwei Solar",
    dimensions: "1722х1134",
    powerRange: "300 - 400 Вт",
    name: "Сонячна панель Tongwei 400W",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 105,
    category: "solar_panels",
    brand: "JA Solar",
    dimensions: "2382x1134",
    powerRange: "600 - 700 Вт",
    name: "Сонячна панель JA Solar DeepBlue 600W",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 106,
    category: "solar_panels",
    brand: "Jinko Solar",
    dimensions: "1961×1134",
    powerRange: "400 - 500 Вт",
    name: "Сонячна панель Jinko 450W",
    image: "/images/catalog/1.jpg",
  },

  // ================= ГІБРИДНІ ІНВЕРТОРИ =================
  {
    id: 201,
    category: "hybrid_inverters",
    brand: "Deye",
    phase: "3 фази",
    invType: "низьковольтний",
    powerRange: "11-15 кВт",
    name: "Гібридний інвертор Deye 12kW",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 202,
    category: "hybrid_inverters",
    brand: "Solis",
    phase: "1 фаза",
    invType: "низьковольтний",
    powerRange: "6-10 кВт",
    name: "Гібридний інвертор Solis 6kW",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 203,
    category: "hybrid_inverters",
    brand: "Sungrow",
    phase: "3 фази",
    invType: "високовольтний",
    powerRange: "16-25 кВт",
    name: "Гібридний інвертор Sungrow 20kW",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 204,
    category: "hybrid_inverters",
    brand: "Huawei",
    phase: "3 фази",
    invType: "високовольтний",
    powerRange: "6-10 кВт",
    name: "Гібридний інвертор Huawei 10kW",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 205,
    category: "hybrid_inverters",
    brand: "FoxESS",
    phase: "3 фази",
    invType: "високовольтний",
    powerRange: "11-15 кВт",
    name: "Гібридний інвертор FoxESS 12kW",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 206,
    category: "hybrid_inverters",
    brand: "LuxPower",
    phase: "1 фаза",
    invType: "низьковольтний",
    powerRange: "6-10 кВт",
    name: "Гібридний інвертор LuxPower 8kW",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 207,
    category: "hybrid_inverters",
    brand: "Afore",
    phase: "3 фази",
    invType: "низьковольтний",
    powerRange: "6-10 кВт",
    name: "Гібридний інвертор Afore 10kW",
    image: "/images/catalog/3.jpg",
  },

  // ================= МЕРЕЖЕВІ ІНВЕРТОРИ =================
  {
    id: 301,
    category: "inverters",
    brand: "Deye",
    phase: "3 фази",
    powerRange: "26-50 кВт",
    name: "Мережевий інвертор Deye 30kW",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 302,
    category: "inverters",
    brand: "Huawei",
    phase: "3 фази",
    powerRange: "26-50 кВт",
    name: "Мережевий інвертор Huawei 30kW",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 303,
    category: "inverters",
    brand: "Solis",
    phase: "3 фази",
    powerRange: "понад 100 кВт",
    name: "Мережевий інвертор Solis 110kW",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 304,
    category: "inverters",
    brand: "Sungrow",
    phase: "3 фази",
    powerRange: "понад 100 кВт",
    name: "Мережевий інвертор Sungrow 125kW",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 305,
    category: "inverters",
    brand: "Solis",
    phase: "1 фаза",
    powerRange: "6-10 кВт",
    name: "Мережевий інвертор Solis 8kW",
    image: "/images/catalog/3.jpg",
  },

  // ================= АКУМУЛЯТОРИ =================
  {
    id: 401,
    category: "batteries",
    brand: "Dyness",
    batType: "Низьковольтна",
    name: "Акумулятор Dyness BX51100",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 402,
    category: "batteries",
    brand: "Deye",
    batType: "Високовольтна",
    name: "Високовольтний акумулятор Deye BOS-G",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 403,
    category: "batteries",
    brand: "GSL ENERGY",
    batType: "Низьковольтна",
    name: "Акумулятор GSL Energy 100Ah",
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

  // ================= СИСТЕМИ НАКОПИЧЕННЯ =================
  {
    id: 501,
    category: "storage",
    brand: "GSL ENERGY",
    name: "Комплексна система GSL Energy 10kWh",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 502,
    category: "storage",
    brand: "Dyness",
    name: "Система накопичення Dyness Powerbox Pro",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 503,
    category: "storage",
    brand: "Deye",
    name: "Стекова система Deye RW-M6.1",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 504,
    category: "storage",
    brand: "FoxESS",
    name: "Модульна система FoxESS ECS2900",
    image: "/images/catalog/1.jpg",
  },

  // ================= СИЛОВЕ ОБЛАДНАННЯ =================
  {
    id: 601,
    category: "power_equipment",
    type: "для гібридних інверторів",
    powerRange: "11-15 кВт",
    name: "Щит захисту AC/DC 15 кВт",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 602,
    category: "power_equipment",
    type: "для мережевих інверторів",
    powerRange: "26-50 кВт",
    name: "Щит збору потужності 30 кВт",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 603,
    category: "power_equipment",
    type: "для дизельних генераторів АВР",
    powerRange: "51-100 кВт",
    name: "Шафа АВР 100 кВт",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 604,
    category: "power_equipment",
    type: "для установок зберігання енергії",
    powerRange: "26-50 кВт",
    name: "Щит комутації акумуляторів BESS",
    image: "/images/catalog/5.jpg",
  },

  // ================= КОМПЛЕКТУЮЧІ =================
  {
    id: 701,
    category: "components",
    type: "Кабель",
    name: "Сонячний кабель KBE Solar 6 мм²",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 702,
    category: "components",
    type: "Конектори МС-4",
    name: "Комплект конекторів MC-4 Staubli",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 703,
    category: "components",
    type: "Кріплення",
    name: "Профіль монтажний алюмінієвий (3м)",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 704,
    category: "components",
    type: "Лічильники",
    name: "Смарт-лічильник Huawei DTSU666-H",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 705,
    category: "components",
    type: "Інше",
    name: "Запобіжник по постійному струму 1000V",
    image: "/images/catalog/5.jpg",
  },
];
