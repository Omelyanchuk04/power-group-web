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

// --- 🔥 ОНОВЛЕНІ КАТЕГОРІЇ (Тепер українською, як у БД) 🔥 ---
export const CATEGORIES = [
  { id: "Сонячні панелі", label: "Сонячні панелі", icon: <IconPanel /> },
  {
    id: "Гібридні інвертори",
    label: "Гібридні інвертори",
    icon: <IconInverter />,
  },
  {
    id: "Мережеві інвертори",
    label: "Мережеві інвертори",
    icon: <IconInverter />,
  },
  { id: "Акумулятори", label: "Акумулятори", icon: <IconBattery /> },
  {
    id: "Системи накопичення",
    label: "Системи накопичення",
    icon: <IconStorage />,
  },
  {
    id: "Силове обладнання для сонячних електростанцій",
    label: "Силове обладнання",
    icon: <IconPower />,
  },
  {
    id: "Комплектуючі для монтажу",
    label: "Комплектуючі для монтажу",
    icon: <IconTool />,
  },
];

const STANDARD_POWER_RANGES = [
  "6-10 кВт",
  "11-15 кВт",
  "16-25 кВт",
  "26-50 кВт",
  "51-100 кВт",
  "понад 100 кВт",
];

// --- 🔥 ОНОВЛЕНІ ФІЛЬТРИ (Синхронізовані з адмінкою) 🔥 ---
export const FILTER_CONFIG = {
  "Сонячні панелі": [
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
      key: "power",
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
  "Гібридні інвертори": [
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
      key: "type",
      title: "Тип",
      type: "checkbox",
      options: ["високовольтний", "низьковольтний"],
    },
    {
      key: "power",
      title: "Потужність",
      type: "checkbox",
      options: STANDARD_POWER_RANGES,
    },
  ],
  "Мережеві інвертори": [
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
      key: "power",
      title: "Потужність",
      type: "checkbox",
      options: STANDARD_POWER_RANGES,
    },
  ],
  Акумулятори: [
    {
      key: "brand",
      title: "Виробник (бренд)",
      type: "checkbox",
      options: ["Deye", "Dyness", "GSL ENERGY", "FoxESS"],
    },
    {
      key: "batteryType",
      title: "Тип батареї",
      type: "checkbox",
      options: ["Низьковольтна", "Високовольтна"],
    },
  ],
  "Системи накопичення": [
    {
      key: "brand",
      title: "Виробник (бренд)",
      type: "checkbox",
      options: ["Deye", "Dyness", "GSL ENERGY", "FoxESS"],
    },
  ],
  "Силове обладнання для сонячних електростанцій": [
    {
      key: "executionType",
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
      key: "power",
      title: "Потужність",
      type: "checkbox",
      options: STANDARD_POWER_RANGES,
    },
  ],
  "Комплектуючі для монтажу": [
    {
      key: "subcategory",
      title: "Розділи",
      type: "checkbox",
      options: ["Кабель", "Конектори МС-4", "Кріплення", "Лічильники", "Інше"],
    },
  ],
};

// --- ОНОВЛЕНА БАЗА ТОВАРІВ (MOCK) ---
export const MOCK_PRODUCTS = [
  {
    id: 101,
    category: "Сонячні панелі",
    brand: "Jinko Solar",
    dimensions: "2278x1134",
    power: "500 - 600 Вт",
    name: "Сонячна панель Jinko Tiger Neo 550W",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 102,
    category: "Сонячні панелі",
    brand: "Longi Solar",
    dimensions: "2278x1134",
    power: "500 - 600 Вт",
    name: "Сонячна панель Longi Hi-MO 5 540W",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 201,
    category: "Гібридні інвертори",
    brand: "Deye",
    phase: "3 фази",
    type: "низьковольтний",
    power: "11-15 кВт",
    name: "Гібридний інвертор Deye 12kW",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 301,
    category: "Мережеві інвертори",
    brand: "Huawei",
    phase: "3 фази",
    power: "26-50 кВт",
    name: "Мережевий інвертор Huawei 30kW",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 401,
    category: "Акумулятори",
    brand: "Dyness",
    batteryType: "Низьковольтна",
    name: "Акумулятор Dyness BX51100",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 501,
    category: "Системи накопичення",
    brand: "GSL ENERGY",
    name: "Комплексна система GSL Energy 10kWh",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 601,
    category: "Силове обладнання для сонячних електростанцій",
    executionType: "для гібридних інверторів",
    power: "11-15 кВт",
    name: "Щит захисту AC/DC 15 кВт",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 701,
    category: "Комплектуючі для монтажу",
    subcategory: "Кабель",
    name: "Сонячний кабель KBE Solar 6 мм²",
    image: "/images/catalog/1.jpg",
  },
];
