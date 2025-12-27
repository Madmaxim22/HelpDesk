/**
 * Класс, представляющий заявку
 */
export default class Ticket {
  /**
   * Создает новую карточку
   * @param {Object} options - Параметры заявки
   * @param {string} options.id - идентификатор (уникальный в пределах системы)
   * @param {string} options.name - краткое описание
   * @param {boolean} options.status - cделано или нет
   * @param {string} options.description - полное описание
   * @param {number} [options.created] - Дата создания (timestamp)
   */
  constructor(options) {
    this.id = options.id;
    this.name = options.name;
    this.status = options.status || false;
    this.description = options.description;
    this.created = options.created || Date.now();
  }

  /**
   * Создает копию тикета
   * @returns {Ticket} Копия тикета
   */
  clone() {
    return new Ticket({
      id: this.id,
      name: this.name,
      status: this.status,
      description: this.description,
      created: this.created,
    });
  }

  /**
   * Преобразует тикет в формат, пригодный для отправки на сервер
   * @returns {Object} Объект тикета без даты создания
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      description: this.description,
    };
  }
}
