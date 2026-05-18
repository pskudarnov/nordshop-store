import type {AppLocale} from '../lib/i18n';

export type SetupSlug = 'developer-station' | 'creator-desk' | 'minimal-focus' | 'audio-corner';

type SetupGearItem = {
  role: string;
  productSlug: string;
  note: string;
};

type SetupMetric = {
  label: string;
  value: string;
  note: string;
};

type SetupTranslation = {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  tags: string[];
  storyTitle: string;
  story: string[];
  audienceTitle: string;
  audience: string;
  philosophyTitle: string;
  philosophy: string;
  atmosphere: string[];
  metrics: SetupMetric[];
  gallery: {src: string; alt: string}[];
  ctaTitle: string;
  ctaText: string;
  gear: SetupGearItem[];
};

export type SetupDefinition = {
  slug: SetupSlug;
  translations: Record<AppLocale, SetupTranslation>;
};

export const setupDefinitions: SetupDefinition[] = [
  {
    slug: 'developer-station',
    translations: {
      en: {
        title: 'Developer Station',
        subtitle: 'Built for deep work, clean code reviews and long sessions without cognitive noise.',
        description: 'A balanced setup for engineers who move between architecture work, pair sessions and focused implementation blocks.',
        heroImage: '/images/products/fjord-mech-keyboard-setup.webp',
        heroAlt: 'Developer station with compact keyboard, monitor riser and warm desk lighting',
        tags: ['Engineering', 'Deep Focus', 'Cable Discipline'],
        storyTitle: 'Why this setup exists',
        story: [
          'Developer Station was curated around one principle: protect flow state. Every object on the desk earns its place by reducing friction during decision-heavy work.',
          'The monitor line is lifted to eye level, typing acoustics stay controlled, and lighting remains neutral across morning and late-evening commits.',
          'The result feels calm and technical at the same time — more studio than office.'
        ],
        audienceTitle: 'Best for',
        audience: 'Frontend and backend engineers, technical leads, and founders who spend 6-10 hours per day in IDEs and review tools.',
        philosophyTitle: 'Workflow philosophy',
        philosophy: 'Optimize for fewer interruptions. Less visual clutter, fewer cable decisions, and clear tactile feedback when typing.',
        atmosphere: ['Deep focus under soft neutral light', 'Minimal distractions during review cycles', 'Calm acoustic profile for calls and coding', 'Confident ergonomics through long sessions'],
        metrics: [
          {label: 'Average daily use', value: '8.4 h', note: 'Split between coding, reviews and async docs'},
          {label: 'Cable management score', value: '9.1/10', note: 'Visible cables reduced to power + single monitor run'},
          {label: 'Focus rating', value: '9.4/10', note: 'Low visual noise and predictable interaction points'},
          {label: 'Ergonomics', value: '8.8/10', note: 'Monitor elevation + neutral wrist posture'},
          {label: 'Noise level', value: '34 dB', note: 'Quiet peripherals suitable for calls'}
        ],
        gallery: [
          {src: '/images/products/ridge-monitor-stand-main.webp', alt: 'Monitor stand and keyboard alignment on developer desk'},
          {src: '/images/products/fjord-mech-keyboard-angle.webp', alt: 'Side angle of mechanical keyboard with muted key profile'},
          {src: '/images/products/graphite-desk-mat-detail.webp', alt: 'Desk mat texture and cable routing detail'},
          {src: '/images/products/cable-organizer-kit-setup.webp', alt: 'Cable clips and wraps organizing dock and charger cables'}
        ],
        ctaTitle: 'Build your ideal workspace',
        ctaText: 'Start with this composition and adjust module by module to match your stack and schedule.',
        gear: [
          {role: 'Monitor foundation', productSlug: 'ridge-monitor-stand', note: 'Raises display line and hides adapter clutter.'},
          {role: 'Keyboard', productSlug: 'fjord-mech-keyboard', note: 'Quiet tactile response for sustained typing accuracy.'},
          {role: 'Mouse surface', productSlug: 'graphite-desk-mat', note: 'Stable glide and visual grounding for desk layout.'},
          {role: 'Lighting', productSlug: 'aura-desk-lamp', note: 'Adaptive tone for planning, coding and evening reviews.'},
          {role: 'Cable system', productSlug: 'cable-organizer-kit', note: 'Keeps power and I/O lines intentional and predictable.'},
          {role: 'Comfort support', productSlug: 'lumbar-chair-support', note: 'Maintains posture during uninterrupted coding blocks.'}
        ]
      },
      ru: {
        title: 'Станция разработчика',
        subtitle: 'Собрана для глубокой концентрации, чистых code review и длинных сессий без когнитивного шума.',
        description: 'Сбалансированный сетап для инженеров, которые переключаются между архитектурой, парной работой и глубокой реализацией.',
        heroImage: '/images/products/fjord-mech-keyboard-setup.webp',
        heroAlt: 'Рабочее место разработчика с компактной клавиатурой, подставкой для монитора и мягким светом',
        tags: ['Engineering', 'Глубокий фокус', 'Порядок с кабелями'],
        storyTitle: 'Зачем этот сетап создан',
        story: [
          'Станция разработчика собрана вокруг одного принципа: защищать flow state. Каждый предмет на столе должен реально снижать трение в задачах с высокой нагрузкой на внимание.',
          'Линия монитора поднята на уровень глаз, набор на клавиатуре остается тихим, а свет стабилен и днем, и вечером.',
          'В результате пространство ощущается одновременно спокойным и технологичным — скорее как студия, чем офис.'
        ],
        audienceTitle: 'Кому подходит',
        audience: 'Frontend/backend инженерам, техлидам и фаундерам, которые проводят 6-10 часов в IDE, review и технической документации.',
        philosophyTitle: 'Философия workflow',
        philosophy: 'Оптимизация под минимум прерываний: меньше визуального шума, меньше решений про кабели и четкая тактильная обратная связь при наборе.',
        atmosphere: ['Глубокий фокус под мягким нейтральным светом', 'Минимум отвлекающих факторов во время review', 'Спокойная акустика для созвонов и кода', 'Надежная эргономика на длинной дистанции'],
        metrics: [
          {label: 'Среднее использование в день', value: '8.4 ч', note: 'Баланс между кодом, review и документацией'},
          {label: 'Оценка кабель-менеджмента', value: '9.1/10', note: 'На поверхности только питание и один мониторный канал'},
          {label: 'Рейтинг концентрации', value: '9.4/10', note: 'Низкий визуальный шум и предсказуемая навигация по зоне'},
          {label: 'Эргономика', value: '8.8/10', note: 'Высота монитора + нейтральное положение запястий'},
          {label: 'Уровень шума', value: '34 дБ', note: 'Тихая периферия для звонков и кода'}
        ],
        gallery: [
          {src: '/images/products/ridge-monitor-stand-main.webp', alt: 'Выравнивание монитора и клавиатуры в рабочей зоне разработчика'},
          {src: '/images/products/fjord-mech-keyboard-angle.webp', alt: 'Угол обзора механической клавиатуры с мягким профилем клавиш'},
          {src: '/images/products/graphite-desk-mat-detail.webp', alt: 'Текстура коврика и аккуратная прокладка кабелей'},
          {src: '/images/products/cable-organizer-kit-setup.webp', alt: 'Организация кабелей дока и зарядки с помощью клипс'}
        ],
        ctaTitle: 'Соберите идеальное рабочее место',
        ctaText: 'Начните с этой композиции и донастройте каждый модуль под ваш стек и ритм работы.',
        gear: [
          {role: 'Основа под монитор', productSlug: 'ridge-monitor-stand', note: 'Поднимает линию экрана и убирает визуальный шум от адаптеров.'},
          {role: 'Клавиатура', productSlug: 'fjord-mech-keyboard', note: 'Тихий тактильный отклик для длинного и точного набора.'},
          {role: 'Поверхность для мыши', productSlug: 'graphite-desk-mat', note: 'Стабильное скольжение и визуальная структура стола.'},
          {role: 'Освещение', productSlug: 'aura-desk-lamp', note: 'Гибкий свет для планирования, кода и вечернего review.'},
          {role: 'Кабельная система', productSlug: 'cable-organizer-kit', note: 'Делает питание и I/O линии аккуратными и предсказуемыми.'},
          {role: 'Поддержка спины', productSlug: 'lumbar-chair-support', note: 'Помогает держать посадку в длинных фокус-сессиях.'}
        ]
      }
    }
  },
  {
    slug: 'creator-desk',
    translations: {
      en: {
        title: 'Creator Desk',
        subtitle: 'A warm visual setup tuned for editing, writing and camera-facing calls.',
        description: 'This composition supports creators who need both a calm background and a practical production surface.',
        heroImage: '/images/products/aura-desk-lamp-setup.webp',
        heroAlt: 'Creator desk with warm key light, notebook stack and clean audio zone',
        tags: ['Content Production', 'Visual Warmth', 'Balanced Acoustics'],
        storyTitle: 'Editorial narrative',
        story: [
          'Creator Desk is built around rhythm. Morning ideation starts on paper, production happens on-screen, and final checks run under warm evening light.',
          'The layout keeps visual identity intact for recorded calls while preserving enough utility for real work.',
          'It feels intentional in frame and reliable off camera.'
        ],
        audienceTitle: 'Best for',
        audience: 'Designers, editors, strategists and indie creators balancing client work, recording and async collaboration.',
        philosophyTitle: 'Workflow philosophy',
        philosophy: 'Treat the desk as both a production tool and a visual stage. Keep the palette warm, controls reachable, and notes always within hand span.',
        atmosphere: ['Warm ambient lighting for creative continuity', 'Balanced desk zones for capture and editing', 'Low-clutter composition that reads well on camera', 'Comfort-first posture for long narrative work'],
        metrics: [
          {label: 'Average daily use', value: '7.6 h', note: 'Editing, scripting and short recording blocks'},
          {label: 'Cable management score', value: '8.7/10', note: 'Primary lines hidden behind monitor axis'},
          {label: 'Focus rating', value: '8.9/10', note: 'Visual warmth with low interface friction'},
          {label: 'Ergonomics', value: '8.6/10', note: 'Notebook + keyboard transitions remain smooth'},
          {label: 'Noise level', value: '36 dB', note: 'Quiet baseline suitable for voice work'}
        ],
        gallery: [
          {src: '/images/products/aura-desk-lamp-main.webp', alt: 'Warm key light over notebook and keyboard area'},
          {src: '/images/products/linen-notebook-set-angle.webp', alt: 'Notebook stack for script drafts and shot planning'},
          {src: '/images/products/nova-headphones-angle.webp', alt: 'Headphones resting near editing keyboard'},
          {src: '/images/products/graphite-desk-mat-setup.webp', alt: 'Desk surface composition with reduced visual clutter'}
        ],
        ctaTitle: 'Build your ideal workspace',
        ctaText: 'Use this setup as a production-ready base for writing, editing and visual communication.',
        gear: [
          {role: 'Lighting', productSlug: 'aura-desk-lamp', note: 'Warm/cool presets for scripting and post-work reviews.'},
          {role: 'Keyboard', productSlug: 'fjord-mech-keyboard', note: 'Reliable tactile input for writing and editing shortcuts.'},
          {role: 'Audio', productSlug: 'nova-headphones', note: 'Controlled monitoring during edit passes and calls.'},
          {role: 'Planning', productSlug: 'linen-notebook-set', note: 'Fast capture for shot lists and content structures.'},
          {role: 'Desk base', productSlug: 'graphite-desk-mat', note: 'Visual anchor that unifies objects in frame.'},
          {role: 'Cable control', productSlug: 'cable-organizer-kit', note: 'Keeps microphones, chargers and docks tidy.'}
        ]
      },
      ru: {
        title: 'Сетап креатора',
        subtitle: 'Теплая визуальная композиция для монтажа, письма и созвонов с камерой.',
        description: 'Этот сетап поддерживает креаторов, которым нужен и аккуратный кадр, и практичная рабочая поверхность.',
        heroImage: '/images/products/aura-desk-lamp-setup.webp',
        heroAlt: 'Рабочий стол креатора с теплым светом, блокнотами и чистой аудио-зоной',
        tags: ['Контент-продакшн', 'Теплая визуальная среда', 'Сбалансированная акустика'],
        storyTitle: 'Редакционный контекст',
        story: [
          'Сетап креатора построен вокруг ритма дня. Утром идеи фиксируются на бумаге, днем идет продакшн на экране, вечером — финальные проверки в теплом свете.',
          'Композиция сохраняет аккуратную визуальную подачу для видеосозвонов и одновременно остается рабочим инструментом, а не декорацией.',
          'Это пространство хорошо выглядит в кадре и надежно работает вне кадра.'
        ],
        audienceTitle: 'Кому подходит',
        audience: 'Дизайнерам, редакторам, стратегам и независимым креаторам, совмещающим клиентскую работу, запись и асинхронную коммуникацию.',
        philosophyTitle: 'Философия workflow',
        philosophy: 'Воспринимать стол как рабочий инструмент и визуальную сцену одновременно: теплая палитра, доступные контролы и блокнот всегда под рукой.',
        atmosphere: ['Теплый свет для непрерывного творческого ритма', 'Сбалансированные зоны для записи и монтажа', 'Низкий визуальный шум и чистый кадр', 'Комфортная посадка для длинной нарративной работы'],
        metrics: [
          {label: 'Среднее использование в день', value: '7.6 ч', note: 'Монтаж, сценарии и короткие блоки записи'},
          {label: 'Оценка кабель-менеджмента', value: '8.7/10', note: 'Основные линии скрыты за мониторной осью'},
          {label: 'Рейтинг концентрации', value: '8.9/10', note: 'Теплая среда без лишнего интерфейсного трения'},
          {label: 'Эргономика', value: '8.6/10', note: 'Плавный переход между блокнотом и клавиатурой'},
          {label: 'Уровень шума', value: '36 дБ', note: 'Тихий фон для голосовой работы'}
        ],
        gallery: [
          {src: '/images/products/aura-desk-lamp-main.webp', alt: 'Теплый ключевой свет над зоной блокнота и клавиатуры'},
          {src: '/images/products/linen-notebook-set-angle.webp', alt: 'Блокноты для драфтов сценариев и планов съемки'},
          {src: '/images/products/nova-headphones-angle.webp', alt: 'Наушники рядом с рабочей зоной монтажа'},
          {src: '/images/products/graphite-desk-mat-setup.webp', alt: 'Композиция поверхности стола с минимальным шумом'}
        ],
        ctaTitle: 'Соберите идеальное рабочее место',
        ctaText: 'Используйте эту конфигурацию как надежную базу для письма, монтажа и визуальной коммуникации.',
        gear: [
          {role: 'Освещение', productSlug: 'aura-desk-lamp', note: 'Теплые и холодные пресеты для сценариев и вечерней проверки.'},
          {role: 'Клавиатура', productSlug: 'fjord-mech-keyboard', note: 'Стабильный тактильный ввод для текстов и шорткатов.'},
          {role: 'Аудио', productSlug: 'nova-headphones', note: 'Контролируемый мониторинг для монтажа и созвонов.'},
          {role: 'Планирование', productSlug: 'linen-notebook-set', note: 'Быстрая фиксация идей и структуры контента.'},
          {role: 'Основа стола', productSlug: 'graphite-desk-mat', note: 'Визуально объединяет рабочую композицию в кадре.'},
          {role: 'Контроль кабелей', productSlug: 'cable-organizer-kit', note: 'Упорядочивает микрофоны, зарядки и док-станции.'}
        ]
      }
    }
  },
  {
    slug: 'minimal-focus',
    translations: {
      en: {
        title: 'Minimal Focus',
        subtitle: 'Reduced to essentials for teams that think better in quiet visual environments.',
        description: 'A restrained setup where every surface and object is selected to lower decision fatigue.',
        heroImage: '/images/products/graphite-desk-mat-setup.webp',
        heroAlt: 'Minimal workspace with clean desk mat, monitor riser and controlled lighting',
        tags: ['Minimalism', 'Intentional Tools', 'Low Noise Visuals'],
        storyTitle: 'Curation intent',
        story: [
          'Minimal Focus started from subtraction, not addition. We removed every non-essential element and rebuilt the desk around tactile certainty and visual breathing room.',
          'This page is for people who think more clearly when the environment stops competing for attention.',
          'It is less about owning more gear and more about choosing better defaults.'
        ],
        audienceTitle: 'Best for',
        audience: 'Product managers, researchers, writers and developers who operate in long planning and synthesis windows.',
        philosophyTitle: 'Workflow philosophy',
        philosophy: 'Lower the number of daily micro-decisions. Fixed object positions, controlled lighting, and zero decorative clutter.',
        atmosphere: ['Minimal distractions with high signal workspace cues', 'Stable light that avoids contrast fatigue', 'Soft tactile materials for continuous desk contact', 'Quiet visual hierarchy that supports planning'],
        metrics: [
          {label: 'Average daily use', value: '7.9 h', note: 'Planning, writing and product thinking blocks'},
          {label: 'Cable management score', value: '9.5/10', note: 'Almost all routing hidden behind stand and desk edge'},
          {label: 'Focus rating', value: '9.6/10', note: 'High attention retention across long sessions'},
          {label: 'Ergonomics', value: '8.5/10', note: 'Neutral posture with reduced movement overhead'},
          {label: 'Noise level', value: '32 dB', note: 'One of the quietest workspace profiles'}
        ],
        gallery: [
          {src: '/images/products/graphite-desk-mat-main.webp', alt: 'Clean desk surface with restrained object count'},
          {src: '/images/products/ridge-monitor-stand-detail.webp', alt: 'Hidden cable channel beneath monitor stand'},
          {src: '/images/products/cable-organizer-kit-detail.webp', alt: 'Minimal clip system for routing power lines'},
          {src: '/images/products/aura-desk-lamp-detail.webp', alt: 'Lamp diffusion detail for low-glare setup light'}
        ],
        ctaTitle: 'Build your ideal workspace',
        ctaText: 'If your best work happens in quiet systems, this setup gives you a disciplined starting point.',
        gear: [
          {role: 'Desk foundation', productSlug: 'graphite-desk-mat', note: 'Defines a calm working zone with tactile consistency.'},
          {role: 'Display elevation', productSlug: 'ridge-monitor-stand', note: 'Creates visual order and ergonomic alignment.'},
          {role: 'Input device', productSlug: 'fjord-mech-keyboard', note: 'Compact footprint with low-noise typing character.'},
          {role: 'Lighting', productSlug: 'aura-desk-lamp', note: 'Maintains stable light without aggressive hotspots.'},
          {role: 'Cable discipline', productSlug: 'cable-organizer-kit', note: 'Locks cable routes into repeatable positions.'},
          {role: 'Posture support', productSlug: 'lumbar-chair-support', note: 'Keeps lower back neutral in long planning sessions.'}
        ]
      },
      ru: {
        title: 'Минималистичный фокус',
        subtitle: 'Собран из необходимого минимума для тех, кто думает лучше в тихой визуальной среде.',
        description: 'Сдержанный сетап, где каждая поверхность и каждый предмет помогают снижать усталость от решений.',
        heroImage: '/images/products/graphite-desk-mat-setup.webp',
        heroAlt: 'Минималистичное рабочее место с чистой поверхностью, подставкой под монитор и мягким светом',
        tags: ['Минимализм', 'Осознанные инструменты', 'Низкий визуальный шум'],
        storyTitle: 'Замысел курации',
        story: [
          'Минималистичный фокус начался с сокращения, а не с добавления. Мы убрали всё лишнее и заново выстроили стол вокруг тактильной уверенности и визуального воздуха.',
          'Этот сценарий для тех, кому проще держать внимание, когда окружение не конкурирует за него.',
          'Здесь важно не количество девайсов, а качество выбранных дефолтов.'
        ],
        audienceTitle: 'Кому подходит',
        audience: 'Продакт-менеджерам, исследователям, авторам и разработчикам, работающим длинными блоками планирования и синтеза.',
        philosophyTitle: 'Философия workflow',
        philosophy: 'Снижать число ежедневных микрорешений: фиксированные позиции предметов, контролируемый свет и ноль декоративного шума.',
        atmosphere: ['Минимум отвлечений и высокий сигнал рабочих зон', 'Стабильный свет без утомляющего контраста', 'Мягкие тактильные материалы для постоянного контакта', 'Тихая визуальная иерархия для планирования'],
        metrics: [
          {label: 'Среднее использование в день', value: '7.9 ч', note: 'Планирование, тексты и продуктовые сессии'},
          {label: 'Оценка кабель-менеджмента', value: '9.5/10', note: 'Почти вся разводка скрыта за подставкой и кромкой стола'},
          {label: 'Рейтинг концентрации', value: '9.6/10', note: 'Высокая удерживаемость внимания в длинных сессиях'},
          {label: 'Эргономика', value: '8.5/10', note: 'Нейтральная посадка при минимальных лишних движениях'},
          {label: 'Уровень шума', value: '32 дБ', note: 'Один из самых тихих профилей рабочего места'}
        ],
        gallery: [
          {src: '/images/products/graphite-desk-mat-main.webp', alt: 'Чистая поверхность стола с минимальным количеством предметов'},
          {src: '/images/products/ridge-monitor-stand-detail.webp', alt: 'Скрытый канал кабелей под подставкой для монитора'},
          {src: '/images/products/cable-organizer-kit-detail.webp', alt: 'Минимальная система клипс для маршрутизации питания'},
          {src: '/images/products/aura-desk-lamp-detail.webp', alt: 'Деталь рассеивателя лампы с мягким рабочим светом'}
        ],
        ctaTitle: 'Соберите идеальное рабочее место',
        ctaText: 'Если лучшие результаты приходят в спокойной системе, этот сетап даст дисциплинированную точку старта.',
        gear: [
          {role: 'Основа стола', productSlug: 'graphite-desk-mat', note: 'Формирует спокойную рабочую зону с устойчивой тактильностью.'},
          {role: 'Подъем дисплея', productSlug: 'ridge-monitor-stand', note: 'Выстраивает порядок и эргономичную линию взгляда.'},
          {role: 'Устройство ввода', productSlug: 'fjord-mech-keyboard', note: 'Компактный формат и тихий характер набора.'},
          {role: 'Освещение', productSlug: 'aura-desk-lamp', note: 'Стабильный свет без агрессивных пересветов.'},
          {role: 'Кабельная дисциплина', productSlug: 'cable-organizer-kit', note: 'Фиксирует маршруты кабелей в предсказуемой схеме.'},
          {role: 'Поддержка осанки', productSlug: 'lumbar-chair-support', note: 'Помогает сохранять нейтральную поясницу в долгих сессиях.'}
        ]
      }
    }
  },
  {
    slug: 'audio-corner',
    translations: {
      en: {
        title: 'Audio Corner',
        subtitle: 'A quieter corner setup for concentrated listening, writing and call-heavy days.',
        description: 'Designed around clean sound, low reflections and practical comfort for hybrid work.',
        heroImage: '/images/products/nova-headphones-setup.webp',
        heroAlt: 'Audio-focused workspace with headphones, warm lamp and uncluttered desk line',
        tags: ['Audio-first', 'Hybrid Work', 'Calm Calls'],
        storyTitle: 'Listening-first design',
        story: [
          'Audio Corner begins with one question: can you stay present in sound-heavy tasks without fatigue by midday?',
          'The setup combines controlled headphones, warm edge lighting and disciplined surfaces so calls, edits and notes can happen in one continuous flow.',
          'It feels intimate, private and technically stable.'
        ],
        audienceTitle: 'Best for',
        audience: 'Podcast editors, marketers, support leads and remote teams who spend a large part of the day in voice-driven collaboration.',
        philosophyTitle: 'Workflow philosophy',
        philosophy: 'Preserve clarity. Keep acoustic tools close, visual contrast gentle, and transitions between listening and writing seamless.',
        atmosphere: ['Calm acoustic environment with reduced harshness', 'Warm ambient edge light for long listening blocks', 'Low-clutter desk for faster context switching', 'Private corner feel even in shared spaces'],
        metrics: [
          {label: 'Average daily use', value: '7.1 h', note: 'Calls, edits and asynchronous follow-ups'},
          {label: 'Cable management score', value: '8.9/10', note: 'Audio and charging lines separated by route'},
          {label: 'Focus rating', value: '8.8/10', note: 'Strong voice clarity with minimal visual interruptions'},
          {label: 'Ergonomics', value: '8.4/10', note: 'Comfortable for alternating keyboard and note-taking'},
          {label: 'Noise level', value: '33 dB', note: 'Quiet baseline around core listening zone'}
        ],
        gallery: [
          {src: '/images/products/nova-headphones-main.webp', alt: 'Headphones placed on desk near keyboard and lamp'},
          {src: '/images/products/nova-headphones-detail.webp', alt: 'Cushion and material detail of headphones for long wear'},
          {src: '/images/products/aura-desk-lamp-angle.webp', alt: 'Warm edge light shaping the audio corner workspace'},
          {src: '/images/products/cable-organizer-kit-main.webp', alt: 'Separated cable paths for audio and power lines'}
        ],
        ctaTitle: 'Build your ideal workspace',
        ctaText: 'Use this layout to create a quieter, more intentional audio workflow for hybrid days.',
        gear: [
          {role: 'Primary audio', productSlug: 'nova-headphones', note: 'Comfortable monitoring with clear speech profile.'},
          {role: 'Support lighting', productSlug: 'aura-desk-lamp', note: 'Soft edge illumination during late listening sessions.'},
          {role: 'Keyboard', productSlug: 'fjord-mech-keyboard', note: 'Quiet input when moving from calls to notes.'},
          {role: 'Desk surface', productSlug: 'graphite-desk-mat', note: 'Damps visual and tactile noise in the workspace.'},
          {role: 'Cable routing', productSlug: 'cable-organizer-kit', note: 'Separates audio and charging lines for fewer tangles.'},
          {role: 'Planning notes', productSlug: 'linen-notebook-set', note: 'Fast handoff from voice ideas to structured action items.'}
        ]
      },
      ru: {
        title: 'Аудио-уголок',
        subtitle: 'Более тихий сценарий рабочего места для внимательного прослушивания, письма и дней с большим числом звонков.',
        description: 'Построен вокруг чистого звука, низких отражений и практичного комфорта для гибридной работы.',
        heroImage: '/images/products/nova-headphones-setup.webp',
        heroAlt: 'Аудио-ориентированное рабочее место с наушниками, теплой лампой и чистой линией стола',
        tags: ['Audio-first', 'Гибридная работа', 'Спокойные звонки'],
        storyTitle: 'Дизайн от прослушивания',
        story: [
          'Аудио-уголок начинается с вопроса: можно ли оставаться в звуковых задачах без усталости уже к середине дня?',
          'Сетап сочетает контролируемые наушники, теплый периферийный свет и дисциплинированные поверхности, чтобы звонки, монтаж и заметки шли одним потоком.',
          'Он ощущается камерным, приватным и технически стабильным.'
        ],
        audienceTitle: 'Кому подходит',
        audience: 'Подкаст-редакторам, маркетологам, лидам поддержки и удаленным командам, у которых значительная часть дня проходит в голосовой коммуникации.',
        philosophyTitle: 'Философия workflow',
        philosophy: 'Сохранять ясность: держать аудио-инструменты рядом, делать визуальный контраст мягким и переходы между прослушиванием и письмом бесшовными.',
        atmosphere: ['Спокойная акустическая среда без резких пиков', 'Теплая периферийная подсветка для долгих сессий', 'Чистый стол для быстрых переключений контекста', 'Ощущение приватного уголка даже в общей зоне'],
        metrics: [
          {label: 'Среднее использование в день', value: '7.1 ч', note: 'Звонки, монтаж и асинхронные follow-up задачи'},
          {label: 'Оценка кабель-менеджмента', value: '8.9/10', note: 'Аудио и питание разведены по разным маршрутам'},
          {label: 'Рейтинг концентрации', value: '8.8/10', note: 'Четкая речь и минимум визуальных прерываний'},
          {label: 'Эргономика', value: '8.4/10', note: 'Комфортный переход между клавиатурой и заметками'},
          {label: 'Уровень шума', value: '33 дБ', note: 'Тихий базовый фон в основной зоне прослушивания'}
        ],
        gallery: [
          {src: '/images/products/nova-headphones-main.webp', alt: 'Наушники на столе рядом с клавиатурой и лампой'},
          {src: '/images/products/nova-headphones-detail.webp', alt: 'Деталь амбушюр и материалов для долгого ношения'},
          {src: '/images/products/aura-desk-lamp-angle.webp', alt: 'Теплый контурный свет в аудио-зоне'},
          {src: '/images/products/cable-organizer-kit-main.webp', alt: 'Раздельная укладка аудио- и power-кабелей'}
        ],
        ctaTitle: 'Соберите идеальное рабочее место',
        ctaText: 'Используйте эту конфигурацию, чтобы сделать аудио-workflow тише и осознаннее в гибридном графике.',
        gear: [
          {role: 'Основное аудио', productSlug: 'nova-headphones', note: 'Комфортный мониторинг с четкой речевой подачей.'},
          {role: 'Поддерживающий свет', productSlug: 'aura-desk-lamp', note: 'Мягкая подсветка для вечерних сессий прослушивания.'},
          {role: 'Клавиатура', productSlug: 'fjord-mech-keyboard', note: 'Тихий ввод при переходе от звонков к заметкам.'},
          {role: 'Поверхность стола', productSlug: 'graphite-desk-mat', note: 'Снижает визуальный и тактильный шум рабочей зоны.'},
          {role: 'Маршрутизация кабелей', productSlug: 'cable-organizer-kit', note: 'Разводит аудио- и зарядные линии без путаницы.'},
          {role: 'Рабочие заметки', productSlug: 'linen-notebook-set', note: 'Быстрый переход от голосовых идей к структуре задач.'}
        ]
      }
    }
  }
];

export function getSetupBySlug(slug: string) {
  return setupDefinitions.find((setup) => setup.slug === slug) ?? null;
}

export function getSetupTranslation(slug: string, locale: AppLocale) {
  const setup = getSetupBySlug(slug);
  if (!setup) return null;
  return setup.translations[locale];
}
