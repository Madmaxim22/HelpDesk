/**
 * Класс, представляющий загрузку данных и отправку с сервера с использованием fetch API
 */
export default class DataLoader {
  constructor(baseURL = 'http://localhost:7070') {
    this.baseURL = baseURL;
  }

  /**
   * Получает все тикеты
   * @returns {Promise<Array>} Массив тикетов
   */
  async getAllTickets() {
    try {
      const response = await fetch(`${this.baseURL}?method=allTickets`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при загрузке тикетов:', error);
      throw error;
    }
  }

  /**
   * Получает тикет по ID
   * @param {string} id - ID тикета
   * @returns {Promise<Object>} Тикет
   */
  async getTicketById(id) {
    try {
      const response = await fetch(
        `${this.baseURL}?method=ticketById&id=${id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при загрузке тикета:', error);
      throw error;
    }
  }

  /**
   * Создает новый тикет
   * @param {Object} ticketData - Данные тикета
   * @returns {Promise<Object>} Созданный тикет
   */
  async createTicket(ticketData) {
    try {
      const response = await fetch(`${this.baseURL}?method=createTicket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при создании тикета:', error);
      throw error;
    }
  }

  /**
   * Обновляет тикет по ID
   * @param {string} id - ID тикета
   * @param {Object} ticketData - Данные тикета для обновления
   * @returns {Promise<Object>} Обновленный тикет
   */
  async updateTicket(id, ticketData) {
    try {
      const response = await fetch(
        `${this.baseURL}?method=updateById&id=${id}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify(ticketData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при обновлении тикета:', error);
      throw error;
    }
  }

  /**
   * Удаляет тикет по ID
   * @param {string} id - ID тикета
   * @returns {Promise} Результат удаления
   */
  async deleteTicket(id) {
    try {
      const response = await fetch(
        `${this.baseURL}?method=deleteById&id=${id}`,
        { method: 'GET', }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // При успешном удалении статус ответа 204 (No Content)
      return response.status === 204 ? {} : await response.json();
    } catch (error) {
      console.error('Ошибка при удалении тикета:', error);
      throw error;
    }
  }
}
