/**
 * Класс, представляющий заявку
 */
export default class Ticket {
  /**
   * Создает новую карточку
   * @param {Object} options - Параметры заявки
   * @param {crypto.randomUUID} options.id - идентификатор (уникальный в пределах системы)
   * @param {string} options.name - краткое описание
   * @param {boolean} options.status - cделано или нет
   * @param {string} options.description - полное описание
   * @param {Date} [options.created=new Date()] - Дата создания
   */
  constructor() {

  }
}