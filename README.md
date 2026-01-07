# Приложения для заказа еды

## Приложение написано с помощью React + TypeScript + Vite + Redux

### Backend написан на ExpressJS 

Сервер будет доступен по адресу: `http://localhost:5000`


### Для просмотра данных через бразуер:

* Все продукты: http://localhost:5000/products
* Поиск продуктов: http://localhost:5000/products/search?q=пицца
* Конкретный продукт: http://localhost:5000/products/1
* Просмотр корзины: http://localhost:5000/cart
* Статус сервера: http://localhost:5000/health

### Пользовательские запросы (POST)

* Регистрация: POST http://localhost:5000/auth/register
* Вход: POST http://localhost:5000/auth/login
* Профиль: GET http://localhost:5000/auth/me (нужен access_token)

### Для тестирования данных запросов можно воспользоваться следующими командами:

Получить все продукты
* curl http://localhost:5000/products

Найти продукты
* curl "http://localhost:5000/products/search?q=пицца"

Зарегестрировать пользователя
* curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

Войти
* curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'