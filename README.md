# OFFWARE

Сайт **OFFWARE** — современные технологии против современных угроз. Официальный лендинг с описанием продуктов: OFFTest, OFFRed, OFFTac.

## Технологии

- **Сборка:** [Parcel](https://parceljs.org/) 2.x
- **Вёрстка:** HTML, CSS (модульная структура в `src/css/`)
- **Скрипты:** JavaScript (ES-модули)
- **Шрифты:** Manrope (Google Fonts)

## Структура проекта

```
src/
├── index.html          # Главная
├── blog.html           # Блог
├── support.html        # Поддержка
├── services.html       # Услуги
├── offtest.html        # Продукт OFFTest
├── offred.html         # Продукт OFFRed
├── offtac.html         # Продукт OFFTac
├── app.js              # Основной скрипт
├── css/                # Стили (base, layout, sections, pages, responsive)
└── img/                # Изображения и иконки
```

## Запуск

```bash
# Установка зависимостей
npm install

# Режим разработки (с hot reload)
npm start

# Сборка для продакшена
npm run build
```

После `npm start` приложение откроется по адресу (как правило) `http://localhost:1234`.

## Сборка

Результат сборки Parcel по умолчанию попадает в каталог `dist/`. Его можно развернуть на любом статическом хостинге.

---

OFFWARE — современные технологии против современных угроз.
