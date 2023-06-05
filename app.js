const express = require("express");
const logger = require("morgan"); // HTTP request logger middleware
const cors = require("cors"); //  это посредник (middleware) для Express,  для настройки HTTP-заголовков, связанных с CORS (Cross-Origin Resource Sharing - возможность использования ресурсов из другого источника).

require("dotenv").config(); // Переменные окружения - для безопасности, используется файл .env

const contactsRouter = require("./routes/api/contacts");
const { PORT } = process.env;
const app = express(); // создание сервера
app.use(express.json()); // Подключается обработка JSON

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(cors()); // Подключается  CORS (теперь express знает CORS)
app.use(logger("dev")); //Подключается логгер (в консоли показует время запуска приложения(логгирует))
app.use("/api/contacts", contactsRouter); // "/api/contacts" - эндпоинт. Если кто то обращается к этому эндпоинту, то отрабатывает функция contactsRouter

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" }); // обработка ошибка
});
app.use((err, req, res, next) => {
  const { message = "Server wrong", status = 500 } = err;

  res.status(status).json({ message }); // обработка ошибка
});

app.listen(PORT, () => {
  console.log("server is runing");
});
