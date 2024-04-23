# KABAN

Kaban - это инструмент управления проектами, который помогает команде получать информацию о задачах, а менеджеру отслеживать их выполнение.

# Деплой
1. Склонируйте репозиторий:
    - git clone
2. Запустите docker build:
    - docker build . -t frontend
3. Запустите docker run, в команде укажите переменные окружения, пример:
   - docker run -d -p 3000:3000 -e REACT_APP_PUBLIC_URL=url-of-backend-application frontend
   
# Локальная разработка

1. Убедитесь, что на вашем компьютере установлен Node.js.
2. Склонируйте репозиторий:
    - git clone
3. Создайте в корне .env файл, пример содержания:
    - REACT_APP_PUBLIC_URL=url-of-backend-application
4. Установите зависимости:
    - npm install
5. Запустите проект:
    - npm start
