# HelpDesk - Приложение для управления заявками


![Test and Deploy](https://github.com/Madmaxim22/HelpDesk/workflows/Test%20and%20Deploy/badge.svg)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?logo=github)](https://madmaxim22.github.io/HelpDesk/)

## Описание проекта

HelpDesk - это веб-приложение для управления заявками, состоящее из backend и frontend частей. Backend предоставляет REST API для работы с тикетами, а frontend предоставляет пользовательский интерфейс для взаимодействия с системой.

## Структура проекта

* `backend/` - серверная часть приложения (Express.js)
* `frontend/` - клиентская часть приложения (HTML, CSS, JavaScript)
* `.github/workflows/` - конфигурации GitHub Actions для CI/CD

## API

Backend-приложение принимает данные в формате JSON. Необходимо установить правильный заголовок в HTTP-запросе (application/json).

Примеры запросов:

* `GET    ?method=allTickets`           - список тикетов
* `GET    ?method=ticketById&id=<id>` - полное описание тикета (где `<id>` - идентификатор тикета)
* `POST   ?method=createTicket`         - создание тикета (`<id>` генерируется на сервере, в теле формы `name`, `description`, `status`)
* `POST   ?method=updateById&id=<id>` - в теле запроса форма с полями для обновления объекта типа `Ticket` по `id`
* `GET    ?method=deleteById&id=<id>` - удалить объект типа `Ticket` по `id`, при успешном запросе статус ответа 204

## CI/CD

Проект использует GitHub Actions для непрерывной интеграции и деплоя:

* Линтинг кода frontend
* Сборка frontend части
* Деплой frontend на GitHub Pages
* Деплой backend на внешний сервис (настраивается отдельно)

## Запуск локально

### Backend

1. Перейдите в директорию `backend/`
2. Установите зависимости: `npm install`
3. Запустите сервер: `npm start`
4. Сервер запустится на http://localhost:7070

### Frontend

1. Перейдите в директорию `frontend/`
2. Установите зависимости: `npm install`
3. Запустите в режиме разработки: `npm start`
4. Приложение будет доступно на http://localhost:5000


## Технические детали

### Backend

Backend реализован с использованием Express.js и предоставляет следующие возможности:
- Хранение тикетов в памяти (для демонстрации)
- Поддержка CRUD операций для тикетов
- Логирование действий с помощью pino
- Обработка CORS-запросов

### Frontend

Frontend реализован с использованием чистого JavaScript и включает:
- Класс `TicketManager` для управления заявками
- Класс `Ticket` для представления заявки
- Класс `TicketBoardView` для отображения доски тикетов
- Класс `DataLoader` для загрузки данных сервера
- Использование Webpack для сборки проекта
- Поддержка модального интерфейса для создания, редактирования и удаления тикетов
