# DiscordBotIdaTS Template
#### Бот Ида не является финальным продуктом. 
イド разрабатывается в рамках тестового полигона для обучающих видео по Discord.js. И не предназначен для использования на своих серверах.
Более того, это копия [оригинального шаблона](https://github.com/idaspin/DiscordBotIda) в [попытках переписать его на TypeScript](https://youtu.be/s__C4LUT5uQ). 
##### Рекомендуемый способ применения: 
- Загрузить исходный код. 
- Подправить под свои нужды. 
- Запустить.

#### Технические требования / ограничения:
[Discord.js@14.3.0](https://www.npmjs.com/package/discord.js/v/14.3.0)<br>
[typescript@4.8.3](https://www.npmjs.com/package/typescript/v/4.8.3)

## Установка
- Загрузить репозиторий `git clone https://github.com/idaspin/DiscordBotIda_boosty.git`
- В папке проекта инициализировать node-проект и загрузить модули `npm init`, `npm i discord.js@14.1.2 typescript dotenv`
- В *structures/ConfigUtil.ts* заменить идентификаторы: `controller_guild_id` - сервера для логов (в данный момент не используется), `controller_logs_id` - канала для логов.
- В *.env* указать token бота.
- Сбилдить проект: `npm clean; npm build`. Затем запустить с помощью `node .`

## Присоединяйся к сообществу
Есть вопросы по боту или программированию в целом? Залетай в **Хаб Не ITшников**: Сообщество разработчиков, программистов и просто людей увлекающихся кодингом.<br>
[Discord сервер](https://discord.gg/YeqrTtpmaH)<br>
[Вконтакте](https://vk.com/iamnotacoderdjs)<br>
[Телеграм](https://t.me/iamnotacoderdjs)
