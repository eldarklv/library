LIBRARY APP

Homework: 
- "2.5. Docker: контейнеризация приложения"

Запуск:
- npm run dev (с использованием nodemon)
- npm run stage (обычный запуск через команду node)
- docker compose up (запуск сервисов library, counter, redis в режиме прод)
- docker compose -f docker-compose.dev.yml up (запуск сервисов library, counter, redis в режиме dev)

Сделано:
- Сконфигурировал Dockerfile в library service
- Добавил сервис counter (он в отдельном репозитории https://github.com/eldarklv/netology-counter-hw/tree/2_5_docker_counter)
- У сервиса counter две ручки: увеличить счетчик и получить count
- Однако я использую только одну ручку "Увеличить счетчик", т.к. она сразу же возвращает и count
- Кстати вся разработка велась в docker compose в режиме dev (с подключением папок и nodemon)
- Далее я сделал такой же Dockerfile в counter service
- Пушнул оба сервиса в докер хаб
- В основном приложении library сконфигурировал docker-compose.yml
- В docker-compose.yml я использую образы eldarklv/nodejs-library:1.0.1 и eldarklv/nodejs-counter:0.0.2
- Сервисы успешно общаются между собой

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
