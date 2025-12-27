import DataLoader from './utils/DataLoader.js';
import Ticket from './Ticket.js';
import TicketBoardView from './TicketBoardView.js';

/**
 * Класс для управления заявками
 */
export default class TicketManager {
  constructor() {
    this.dataLoader = new DataLoader();
    this.view = new TicketBoardView('ticket-board', this);
  }

  // метод запуска приложения
  async init() {
    this.view.init();
    await this.loadTickets();
  }

  /**
   * Загружает список тикетов с сервера и отображает их
   */
  async loadTickets() {
    try {
      this.view.showLoading();
      const tickets = await this.dataLoader.getAllTickets();
      this.view.renderTickets(tickets);
    } catch (error) {
      console.error('Ошибка при загрузке тикетов:', error);
    } finally {
      this.view.hideLoading();
    }
  }

  /**
   * Создает новый тикет
   * @param {Object} ticketData - Данные нового тикета
   * @returns {Promise<Ticket>} Созданный тикет
   */
  async createTicket(ticketData) {
    try {
      const newTicket = await this.dataLoader.createTicket(ticketData);
      await this.loadTickets(); // Обновляем список тикетов
      return newTicket;
    } catch (error) {
      console.error('Ошибка при создании тикета:', error);
      throw error;
    }
  }

  /**
   * Обновляет тикет
   * @param {string} id - ID тикета
   * @param {Object} ticketData - Данные для обновления тикета
   * @returns {Promise<Ticket>} Обновленный тикет
   */
  async updateTicket(id, ticketData) {
    try {
      const updatedTicket = await this.dataLoader.updateTicket(id, ticketData);
      await this.loadTickets(); // Обновляем список тикетов
      return updatedTicket;
    } catch (error) {
      console.error('Ошибка при обновлении тикета:', error);
      throw error;
    }
  }

  /**
   * Удаляет тикет
   * @param {string} id - ID тикета
   * @returns {Promise} Результат удаления
   */
  async deleteTicket(id) {
    try {
      const result = await this.dataLoader.deleteTicket(id);
      await this.loadTickets(); // Обновляем список тикетов
      return result;
    } catch (error) {
      console.error('Ошибка при удалении тикета:', error);
      throw error;
    }
  }

  /**
   * Переключает статус тикета между "сделано" и "не сделано"
   * @param {string} id - ID тикета
   * @returns {Promise<Ticket>} Обновленный тикет
   */
  async toggleTicketStatus(id) {
    try {
      // Сначала получаем текущий тикет для получения актуальных данных
      const ticket = await this.dataLoader.getTicketById(id);
      // Меняем статус на противоположный
      const updatedTicket = await this.dataLoader.updateTicket(id, {
        ...ticket,
        status: !ticket.status,
      });
      await this.loadTickets(); // Обновляем список тикетов
      return updatedTicket;
    } catch (error) {
      console.error('Ошибка при изменении статуса тикета:', error);
      throw error;
    }
  }

  /**
   * Получает тикет по ID
   * @param {string} id - ID тикета
   * @returns {Promise<Ticket>} Тикет
   */
  async getTicketById(id) {
    try {
      return await this.dataLoader.getTicketById(id);
    } catch (error) {
      console.error('Ошибка при получении тикета:', error);
      throw error;
    }
  }
}
