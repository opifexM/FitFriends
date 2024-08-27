# Проект Fit Friends

## Информация
- В проекте используются Workspaces
- Все скрипты для запуска и для работы с докером подготовлены в package.json
- Развернутая Web версия проекта: http://fit-friends.opifex.me

### Активировать рассылку email сообщений
- см файл: backend/src/email/email.http


### Сборка и запуск

- **Сборка проекта**
  ```bash
  npm run build --workspaces --if-present
  ```

- **Docker Up (Mongo)**
  ```bash
  docker compose --file ./backend/docker-compose.dev.yml --env-file ./backend/server.env --project-name "fit-friends" up -d
  ```

- **Docker Down (Mongo)**
  ```bash 
  docker compose --file ./backend/docker-compose.dev.yml --env-file ./backend/server.env --project-name "fit-friends" down
  ```

### Backend Server
- **Запуск backend**
  ```bash 
    npm run start --workspace backend
  ```

- **Сборка backend**
  ```bash 
    npm run build --workspace backend
  ```

### Backend CLI
- **Запуск CLI**
  ```bash 
    ts-node --project backend/tsconfig.json backend/src/main-cli.ts
  ```

- **Справка CLI**
  ```bash 
    ts-node --project backend/tsconfig.json backend/src/main-cli.ts --help
  ```

- **Генерация продуктов CLI**
  ```bash 
    ts-node --project backend/tsconfig.json backend/src/main-cli.ts --generate 'mongodb://admin:123456@localhost:27017/fit-friends?authSource=admin'
  ```

### Frontend React
- **Запуск React**
  ```bash 
    npm run start --workspace frontend
  ```

- **Сборка React**
  ```bash 
    npm run build --workspace frontend
  ```

