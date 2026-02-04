import { ContentStrategy } from "../types";

const templates = [
  {
    platform: "Reels/Shorts",
    templates: [
      { title: "Хук, который ломает ленту", description: "15-секундный вирус с контр-интуитивным тейком. Никаких советов — только провокация." },
      { title: "Визуальный взрыв", description: "Быстрые кадры + текст на экране. Показываешь результат за 3 секунды, объясняешь как — в комментах." },
      { title: "Миф под удар", description: "Ломаешь популярное заблуждение в нише за 30 секунд. Люди бегут спорить — а это охваты." },
    ]
  },
  {
    platform: "Telegram/VC.ru",
    templates: [
      { title: "Глубокий разбор без воды", description: "2-3 абзаца конкретики. Один кейс, цифры, вывод. Тот, кто дочитал — уже тёплый лид." },
      { title: "История провала", description: "Честно про ошибку, которую допустил. Вызывает больше доверия, чем посты об успехе." },
      { title: "Чек-лист за внимание", description: "Полезный мини-гайд. В конце: полная версия в Telegram-канале." },
    ]
  },
  {
    platform: "Telegram-канал",
    templates: [
      { title: "Лид-магнит эксклюзив", description: "PDF, таблица или бот, который решает проблему. Доступен только подписчикам." },
      { title: "Закрытая воронка", description: "Пошаговая воронка в одном сообщении. Читаешь — применяешь — получаешь результат." },
      { title: "Персональный аудит", description: "Бесплатный разбор для 3-5 подписчиков. Собираешь заявки — делаешь контент из разборов." },
    ]
  }
];

const generateMockStrategy = (topic: string): ContentStrategy => {
  const getRandomTemplate = (platformIdx: number) => {
    const platformTemplates = templates[platformIdx].templates;
    return platformTemplates[Math.floor(Math.random() * platformTemplates.length)];
  };

  return {
    niche: topic,
    steps: [
      {
        ...getRandomTemplate(0),
        platform: templates[0].platform,
      },
      {
        ...getRandomTemplate(1),
        platform: templates[1].platform,
      },
      {
        ...getRandomTemplate(2),
        platform: templates[2].platform,
      },
    ],
  };
};

export const generateGrowthStrategy = async (topic: string): Promise<ContentStrategy | null> => {
  if (!topic) return null;

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return generateMockStrategy(topic);
};