# busines-plan-full-app project

## Введение

Данная документация описывает процесс развёртывания проекта на своей локальной машине с помощью [**docker**](https://www.docker.com), а также имеет небольшое описание данного сервиса.

Сервис написан с помощью фреймворка [**nest.js**](https://nestjs.com), который позволяет писать масштабируемые и отлаживаемые бекенд-сервисы. Также фреймкорк имеет хорошее комьюнити разработчиков, которые поддерживают проект и фреймворк имеет плагины и комьюнити-пакеты на все случаи жизни.

## Установка

Для установки понадобится **git**. Чтобы клонировать проект на свой локальный скоростной болид, введите следующую команду:

```sh
# Команда для клонирования репозитория:
git clone https://github.com/evangelipeep/busines-plan-full-app.git

# Чтобы клонировать определённую ветку:
git clone https://github.com/evangelipeep/busines-plan-full-app.git -b branch_name
```

Дальше потребуется установить все зависимости из файла `package.json`. Делается это с помощью менеджера пакетов `npm`. Для установки зависимости используйте следующую команду:

```sh
# Установка зависимостей
npm install
```

Готово! Теперь проект готов к запуску. Можете скинуть мне свои улыбки в личку, если у вас получилось подготовить проект к запуску по этому гайду.

## Запуск

Для запуска проекта потребуется либо docker, либо локально запущенный сервер [**mongodb**](https://www.mongodb.com). Гайды по установке:

- Docker – [windows](https://docs.docker.com/desktop/install/windows-install/), [linux](https://docs.docker.com/desktop/install/linux-install/).
- MongoDB – [windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/), [linux](https://www.mongodb.com/docs/manual/administration/install-on-linux/).

После установки docker (я надеюсь, что вы выбрали именно этот вариант) нужно просто запустить следующую команду внутри папки проекта:

```sh
# Запуск проекта дев скриптом:
docker-compose -f docker-compose.dev.yml up -d

# Запуск проекта продовским скриптом:
docker-compose -f docker-compose.prod.yml up -d
```

Также рекомендую установить себе на локальный Camry 3.5 [MongoDB Compass](https://www.mongodb.com/products/compass), чтобы можно было смотреть, что там вообще в базе данных творится в красивом GUI интерфейсе.
