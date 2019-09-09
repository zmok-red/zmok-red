const debug = require('debug')('[boot]:main')
debug.enabled = true

export default async ({ Vue, router, store }) => {
  // translations
  const translations = {
    en: {
      'show_only_name': 'Show only name'
    },
    ru: {
      'show_core_fields': 'Показать системные поля',
      'hide_core_fields': 'Скрыть системные поля',
      'show_only_name': 'Показать только имя',
      'id': 'ID',
      'name': 'Имя',
      'version': 'Версия',
      'type': 'Тип',
      'tags': 'Тэги',
      'description': 'Описание',
      'color': 'Цвет',
      'background': 'Фон',
      'icon': 'Иконка',
      'created_at': 'Создан',
      'created_by': 'Создал',
      'updated_at': 'Изменен',
      'updated_by': 'Изменил',
      'trashed': 'В архиве',
      'props': 'Пользовательские поля',
      'files_map': 'Файлы',
      'cancel': 'Отмена',
      'save': 'Сохранить',
      'create': 'Создать',
      'update': 'Обновить',
      'delete': 'В архив',
      'settings': 'Настройки',
      'app_settings': 'Настройки приложения',
      'logout': 'Выйти',
      'logout_from_app': 'Выйти из приложения',
      'activity': 'Активность',
      'settings_account': 'Мой аккаунт',
      'settings_zmok': 'Сервер',
      'settings_models': 'Модели',
      'settings_database': 'База данных',
      'settings_users': 'Пользователи',
      'settings_groups': 'Группы',
      'settings_roles': 'Роли',
      'settings_pages': 'Страницы',
      'settings_views': 'Виды (закладки)',
      'settings_blocks': 'Блоки',
      'settings_functions': 'Функции',
      'settings_chat': 'Чат',
      'settings_exit': 'Выйти',
      'fields': 'Поля',
      'sort': 'Сорт.',
      'filter': 'Фильтр',
      'page': 'Страница',
      '_id': 'ID',
      'nothing_found': 'Ничего не найдено',
      'createdAt': 'Создан',
      'updatedAt': 'Изменен',
      'createdBy': 'Создал',
      'updatedBy': 'Изменил',
      'account': 'Аккаунт',
      'pages': 'Страницы',
      'roles': 'Роли',
      'groups': 'Группы',
      'app': 'Приложение'
    }
  }
  // lang fn
  Vue.prototype.$lang = (val) => {
    if (translations[store.state.z.lang] && translations[store.state.z.lang][val]) {
      return translations[store.state.z.lang][val]
    } else {
      return val
    }
  }
}
