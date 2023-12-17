LIBRARY APP

Homework: 
- "2.6. База данных и хранение данных"

В файле README.md написать следующие запросы для MongoDB:

1. запрос(ы) для вставки данных минимум о двух книгах в коллекцию books

db.books.insertMany([
    {title: "book1", description: "book about IT", authors: "jobs"},
    {title: "book2", description: "book about Figma", authors: "kolosov"}
])

2. запрос для поиска полей документов коллекции books по полю title

db.books.find({
	title: "book1"
})

3. запрос для редактирования полей: description и authors коллекции books по _id записи

db.books.updateOne(
  {_id: ObjectId("657f25ccb4bc7bd78f65b9ca")},
  {$set: {description: "updated desc", authors: "updated author"}}
)
