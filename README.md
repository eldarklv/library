LIBRARY APP

Homework: 
- "2.5. Docker: контейнеризация приложения"

Запуск:
- npm run dev (с использованием nodemon)
- npm run stage (обычный запуск через команду node)
- docker compose up (запуск сервисов library, counter, redis в режиме прод)
- docker compose -f docker-compose.dev.yml up (запуск сервисов library, counter, redis в режиме dev)
- Не забыть добавить в env MONGO_URL

Сделано:
- Создана облачная база данных монго
- Подключена библиотека монгус
- Произведен рефакторинг всех роутов на использование монго дб
- Собраны новые образы, обновлен docker compose
- MONGO_URL положил в .env, но можно его прокинуть через docker-compose.yml (пример MONGO_URL=mongodb+srv://admin:<password>@cluster0.6au3jzx.mongodb.net/library?retryWrites=true&w=majority)

Роуты:
Метод | URL | Действие | Комментарий
--- | --- | ---  | ---
`POST` | `/api/user/login` | авторизация пользователя | метод всегда возвращает **Code: 201** и статичный объект: `{ id: 1, mail: "test@mail.ru" }`
`GET` | `/api/books` | получить все книги | получаем массив всех книг
`GET` | `/api/books/:id` | получить книгу по **ID** | получаем объект книги, если запись не найдена, вернём **Code: 404** 
`POST` | `/api/books` | создать книгу | создаём книгу и возвращаем её же вместе с присвоенным **ID**
`PUT` | `/api/books/:id` | редактировать книгу по **ID** | редактируем объект книги, если запись не найдена, вернём **Code: 404**
`DELETE` | `/api/books/:id` | удалить книгу по **ID** | удаляем книгу и возвращаем ответ: **'ok'**
`POST` (new) | `/api/books/:id/file` | добавить файл книги по **ID** | сохраняет отправленный файл и добавляет в объект книги поле fileBook, которые хранит путь до файла
`DELETE` (new) | `/api/books/:id/file` | удалить файл книги по **ID** | удаляет файл и удаляет в объекте книги поле fileBook
`DELETE` (new) | `/api/books/:id/download` | скачать файл книги по **ID** | возвращает на скачивание файл книги
