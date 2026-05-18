import type { Product, ProductReview } from "../data/products";
import type { AppLocale } from "./i18n";

type LocalizedProductContent = {
  name: string;
  description: string;
  longDescription: string;
  categoryLabel: string;
  tags: string[];
  badges: string[];
  features: string[];
  specifications: { label: string; value: string }[];
  shippingInfo: string[];
  warrantyInfo: string[];
};

const ruBySlug: Record<string, LocalizedProductContent> = {
  "aura-desk-lamp": {
    name: "Настольная лампа Aura",
    description:
      "Адаптивная настольная лампа с регулировкой теплого и холодного света для долгой концентрации.",
    longDescription:
      "Aura настроена под реальный рабочий день: утреннее планирование, дневные созвоны и вечерняя фокус-сессия. Поворотный механизм убирает блики с монитора и дает мягкий, комфортный свет над клавиатурой и блокнотом.",
    categoryLabel: "Освещение",
    tags: ["Фокус", "Освещение", "Рабочее место"],
    badges: ["Хит продаж"],
    features: ["Сенсорный диммер", "Теплые/холодные пресеты", "Низкобликовая линза"],
    specifications: [
      { label: "Материал", value: "Анодированный алюминий" },
      { label: "Питание", value: "USB-C PD 20W" },
      { label: "Температура света", value: "2700K–5000K" },
      { label: "Высота", value: "42 см" },
    ],
    shippingInfo: [
      "Отправка в день заказа до 14:00",
      "Доставка 1–2 рабочих дня",
      "Упаковка с нейтральным углеродным следом",
    ],
    warrantyInfo: [
      "Гарантия на устройство 2 года",
      "Возврат в течение 30 дней",
      "Мгновенная замена при браке при получении",
    ],
  },
  "fjord-mech-keyboard": {
    name: "Механическая клавиатура Fjord",
    description: "Тихая тактильная клавиатура в компактном формате с премиальным ощущением клавиш.",
    longDescription:
      "Fjord создана для смешанных сценариев: кодинг, тексты и поздние созвоны. Акустический слой снижает резонанс, сохраняя четкий тактильный отклик для уверенного набора.",
    categoryLabel: "Аксессуары",
    tags: ["Набор текста", "Разработчикам", "Минимализм"],
    badges: ["Хит продаж", "Лимитировано"],
    features: ["Горячая замена свитчей", "PBT-кейкапы", "Gasket mount"],
    specifications: [
      { label: "Раскладка", value: "75% ANSI" },
      { label: "Свитчи", value: "Linear Silent" },
      { label: "Подключение", value: "USB-C / 2.4G" },
      { label: "Вес", value: "1.1 кг" },
    ],
    shippingInfo: ["Отправка в течение 24 часов", "Экспресс-доставка на checkout"],
    warrantyInfo: ["Гарантия 2 года", "Поддержка по замене кейкапов"],
  },
  "ridge-monitor-stand": {
    name: "Подставка для монитора Ridge",
    description:
      "Дубовая подставка для монитора со скрытым каналом для кабелей и антискользящими ножками.",
    longDescription:
      "Ridge поднимает монитор на уровень глаз и убирает визуальный шум под экраном. Небольшое изменение, которое делает рабочее место собранным и аккуратным.",
    categoryLabel: "Мебель",
    tags: ["Эргономика", "Дерево", "Кабель-менеджмент"],
    badges: [],
    features: ["Массив дуба", "Вырез под кабели", "Защитные накладки"],
    specifications: [
      { label: "Ширина", value: "58 см" },
      { label: "Глубина", value: "22 см" },
      { label: "Нагрузка", value: "До 18 кг" },
    ],
    shippingInfo: ["Усиленная защита углов", "Доставка 2–4 рабочих дня"],
    warrantyInfo: ["Гарантия 2 года"],
  },
  "linen-notebook-set": {
    name: "Набор блокнотов Linen",
    description: "Набор из 3 премиальных блокнотов для планирования и набросков.",
    longDescription:
      "Прошитые льняные блокноты с плотной бумагой и мягкой точечной сеткой. Для команд, которые ценят мышление ручкой на бумаге.",
    categoryLabel: "Аксессуары",
    tags: ["Планирование", "Канцелярия"],
    badges: ["Новинка"],
    features: ["Бумага 120 gsm", "Dot grid", "Нитяной переплет"],
    specifications: [
      { label: "Формат", value: "A5" },
      { label: "Страниц", value: "192 в каждом блокноте" },
    ],
    shippingInfo: ["Отправка в перерабатываемом конверте"],
    warrantyInfo: ["Гарантия удовлетворенности 30 дней"],
  },
  "nova-headphones": {
    name: "Наушники Nova",
    description: "Закрытые беспроводные наушники для офиса и поездок.",
    longDescription:
      "Nova сочетают детальность звучания и комфорт для длительной работы. Тюнинг без резких верхов, но с четкой разборчивостью речи на звонках.",
    categoryLabel: "Аудио",
    tags: ["Аудио", "Удаленная работа"],
    badges: ["Лимитировано"],
    features: ["40 часов автономности", "Низкая задержка", "Подключение к двум устройствам"],
    specifications: [
      { label: "Батарея", value: "40 ч" },
      { label: "Вес", value: "282 г" },
    ],
    shippingInfo: ["Застрахованная доставка", "Доставка 1–3 рабочих дня"],
    warrantyInfo: ["Гарантия 2 года", "Сервисная программа по батарее"],
  },
  "lumbar-chair-support": {
    name: "Поясничная поддержка Lumbar",
    description: "Поясничная подушка из memory foam с дышащим чехлом.",
    longDescription:
      "Компактная опора, которая помогает держать нейтральную осанку в длинных рабочих сессиях без ощущения громоздкости.",
    categoryLabel: "Мебель",
    tags: ["Эргономика", "Здоровье"],
    badges: [],
    features: ["Пена с памятью формы", "Регулируемый ремень", "Дышащий чехол"],
    specifications: [{ label: "Плотность пены", value: "55D" }],
    shippingInfo: ["Следующая партия через 6 дней"],
    warrantyInfo: ["Гарантия 1 год"],
  },
  "graphite-desk-mat": {
    name: "Коврик Graphite",
    description: "Большой нескользящий коврик с прошитыми краями.",
    longDescription:
      "Graphite структурирует рабочее место и добавляет визуального спокойствия. Устойчив к проливам и красиво стареет со временем.",
    categoryLabel: "Аксессуары",
    tags: ["Рабочее место", "Минимализм"],
    badges: ["Хит продаж"],
    features: ["90x40 см", "Водоотталкивающий", "Прошитые края"],
    specifications: [{ label: "Толщина", value: "3 мм" }],
    shippingInfo: ["Отправка сегодня", "Доставка 1–2 дня"],
    warrantyInfo: ["Гарантия 1 год"],
  },
  "cable-organizer-kit": {
    name: "Набор Cable Organizer",
    description: "Магнитные клипсы и стяжки для аккуратной укладки кабелей.",
    longDescription:
      "Практичный стартовый комплект, чтобы убрать кабельный хаос вокруг монитора, док-станции и зарядки.",
    categoryLabel: "Аксессуары",
    tags: ["Кабель-менеджмент"],
    badges: ["Новинка"],
    features: ["Набор из 8 предметов", "Многоразовые стяжки", "Сильный клейкий слой"],
    specifications: [{ label: "В комплекте", value: "4 клипсы + 4 стяжки" }],
    shippingInfo: ["Отправка в течение 24 часов"],
    warrantyInfo: ["Возврат 30 дней"],
  },
};

const categoryRu: Record<string, string> = {
  Lighting: "Освещение",
  Accessories: "Аксессуары",
  Audio: "Аудио",
  Furniture: "Мебель",
  Power: "Питание",
};

const ruReviewsBySlug: Record<string, ProductReview[]> = {
  "aura-desk-lamp": [
    {
      author: "Mila",
      role: "Продуктовый дизайнер",
      rating: 5,
      comment: "Наконец-то лампа, которая выглядит премиально и не утомляет глаза.",
      date: "2 недели назад",
    },
    {
      author: "Anton",
      role: "Frontend-инженер",
      rating: 4.8,
      comment: "Отличное рассеивание света и аккуратная индустриальная отделка.",
      date: "1 месяц назад",
    },
  ],
  "fjord-mech-keyboard": [
    {
      author: "Leo",
      role: "Тимлид frontend",
      rating: 5,
      comment: "Звук собранный, ход стабильный, никаких дребезжаний.",
      date: "5 дней назад",
    },
    {
      author: "Sara",
      role: "Автор",
      rating: 4.9,
      comment: "Достаточно тихая для созвонов и при этом очень приятная для набора.",
      date: "3 недели назад",
    },
  ],
  "ridge-monitor-stand": [
    {
      author: "Inga",
      role: "Арт-директор",
      rating: 4.7,
      comment: "Мгновенно привела рабочее место в порядок.",
      date: "2 месяца назад",
    },
  ],
  "linen-notebook-set": [
    {
      author: "Nora",
      role: "UX-исследователь",
      rating: 4.6,
      comment: "Отличное качество бумаги, особенно для заметок маркером.",
      date: "1 неделю назад",
    },
  ],
  "nova-headphones": [
    {
      author: "Ken",
      role: "Моушн-дизайнер",
      rating: 4.8,
      comment: "Комфорт на высшем уровне даже при использовании весь день.",
      date: "3 недели назад",
    },
  ],
  "lumbar-chair-support": [
    {
      author: "Victor",
      role: "Backend-инженер",
      rating: 4.3,
      comment: "Хорошая поддержка, особенно во время длинных созвонов.",
      date: "2 месяца назад",
    },
  ],
  "graphite-desk-mat": [
    {
      author: "Alisa",
      role: "QA-инженер",
      rating: 4.7,
      comment: "Фактура идеально подходит и для трекпада, и для мыши.",
      date: "1 месяц назад",
    },
  ],
  "cable-organizer-kit": [
    {
      author: "Roman",
      role: "CTO",
      rating: 4.4,
      comment: "Небольшая покупка, но визуальный эффект огромный.",
      date: "6 дней назад",
    },
  ],
};

export function localizeProduct(product: Product, locale: AppLocale): Product {
  if (locale === "en") return product;
  const ru = ruBySlug[product.slug];
  const localizedReviews = ruReviewsBySlug[product.slug] ?? product.reviews;

  if (!ru) {
    return {
      ...product,
      category: (categoryRu[product.category] ?? product.category) as Product["category"],
      reviews: localizedReviews,
    };
  }

  return {
    ...product,
    name: ru.name,
    description: ru.description,
    longDescription: ru.longDescription,
    category: (ru.categoryLabel ?? product.category) as Product["category"],
    tags: ru.tags,
    badges: ru.badges as Product["badges"],
    features: ru.features,
    specifications: ru.specifications,
    shippingInfo: ru.shippingInfo,
    warrantyInfo: ru.warrantyInfo,
    reviews: localizedReviews,
  };
}

export function localizeProducts(items: Product[], locale: AppLocale) {
  return items.map((p) => localizeProduct(p, locale));
}
