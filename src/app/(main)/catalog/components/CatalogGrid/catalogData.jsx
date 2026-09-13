import React from "react";

// --- ГОЛОВНІ SVG ІКОНКИ ---
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

// --- КОНФІГ КАТЕГОРІЙ ТА ФІЛЬТРІВ ---
export const CATEGORIES = [
  { id: "inverters", label: "Мережеві інвертори", icon: <IconInverter /> },
  { id: "storage", label: "Системи накопичення", icon: <IconStorage /> },
  { id: "power_eq", label: "Силове обладнання", icon: <IconPower /> },
  { id: "accessories", label: "Комплектуючі", icon: <IconTool /> },
  { id: "batteries", label: "Акумулятори", icon: <IconBattery /> },
];

export const FILTER_CONFIG = {
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
  storage: [
    {
      key: "brand",
      title: "Виробник",
      type: "checkbox",
      options: ["Deye", "Dyness", "GSL ENERGY", "FoxESS"],
    },
  ],
  power_eq: [
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
  accessories: [
    {
      key: "type",
      title: "Розділ",
      type: "checkbox",
      options: ["Кабель", "Конектори МС-4", "Кріплення", "Лічильники", "Інше"],
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
};

export const MOCK_PRODUCTS = [
  {
    id: 1,
    category: "inverters",
    brand: "Deye",
    phase: "3 фази",
    power: "11-15 кВт",
    powerNum: 15,
    name: "Мережевий інвертор Deye SUN-12K-G05",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 2,
    category: "inverters",
    brand: "Huawei",
    phase: "3 фази",
    power: "26-50 кВт",
    powerNum: 50,
    name: "Мережевий інвертор Huawei SUN2000-30KTL-M3",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 3,
    category: "inverters",
    brand: "Solis",
    phase: "1 фаза",
    power: "6-10 кВт",
    powerNum: 10,
    name: "Мережевий інвертор Solis S6-GR1P8K",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 4,
    category: "inverters",
    brand: "Sungrow",
    phase: "3 фази",
    power: "51-100 кВт",
    powerNum: 100,
    name: "Мережевий інвертор Sungrow SG50CX-P2",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 5,
    category: "inverters",
    brand: "Deye",
    phase: "1 фаза",
    power: "6-10 кВт",
    powerNum: 10,
    name: "Мережевий інвертор Deye SUN-8K-SG01LP1",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 6,
    category: "inverters",
    brand: "Solis",
    phase: "3 фази",
    power: "16-25 кВт",
    powerNum: 25,
    name: "Мережевий інвертор Solis-3P20K-4G",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 7,
    category: "inverters",
    brand: "Huawei",
    phase: "3 фази",
    power: "понад 100 кВт",
    powerNum: 150,
    name: "Інвертор Huawei SUN2000-330KTL",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 8,
    category: "storage",
    brand: "GSL ENERGY",
    name: "Система зберігання GSL Energy 10kWh",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 9,
    category: "storage",
    brand: "Dyness",
    name: "Система накопичення Dyness Tower T10",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 10,
    category: "storage",
    brand: "Deye",
    name: "Система зберігання енергії Deye SE-G5.1 Pro",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 11,
    category: "storage",
    brand: "FoxESS",
    name: "Модульна система FoxESS ECS2900",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 12,
    category: "batteries",
    brand: "Dyness",
    batType: "Низьковольтна",
    name: "Акумулятор Dyness BX51100 5.12 кВт*год",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 13,
    category: "batteries",
    brand: "Deye",
    batType: "Високовольтна",
    name: "Акумулятор Deye BOS-G (Високовольтний)",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 14,
    category: "batteries",
    brand: "GSL ENERGY",
    batType: "Низьковольтна",
    name: "Акумулятор GSL Energy 48V 100Ah",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 15,
    category: "batteries",
    brand: "FoxESS",
    batType: "Високовольтна",
    name: "Акумуляторний блок FoxESS HV2600",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 16,
    category: "accessories",
    type: "Кабель",
    name: "Сонячний кабель KBE Solar 6 мм² (Котушка)",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 17,
    category: "accessories",
    type: "Конектори МС-4",
    name: "Комплект конекторів MC-4 Staubli",
    image: "/images/catalog/2.jpg",
  },
  {
    id: 18,
    category: "accessories",
    type: "Кріплення",
    name: "Профіль монтажний алюмінієвий 41х41 (3м)",
    image: "/images/catalog/3.jpg",
  },
  {
    id: 19,
    category: "accessories",
    type: "Лічильники",
    name: "Смарт-лічильник Huawei Smart Power Sensor",
    image: "/images/catalog/4.jpg",
  },
  {
    id: 20,
    category: "power_eq",
    type: "для гібридних інверторів",
    power: "11-15 кВт",
    powerNum: 15,
    name: "Щит захисту AC/DC для гібридної СЕС 15 кВт",
    image: "/images/catalog/5.jpg",
  },
  {
    id: 21,
    category: "power_eq",
    type: "для мережевих інверторів",
    power: "26-50 кВт",
    powerNum: 50,
    name: "Щит збору потужності для СЕС 30 кВт",
    image: "/images/catalog/1.jpg",
  },
  {
    id: 22,
    category: "power_eq",
    type: "для дизельних генераторів АВР",
    power: "51-100 кВт",
    powerNum: 100,
    name: "Шафа АВР (Автоматичне введення резерву) 100 кВт",
    image: "/images/catalog/2.jpg",
  },
];
