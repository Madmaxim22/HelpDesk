/**
 * Класс для отображения доски с заявками
 */
export default class TicketBoardView {
  constructor(containerId, ticketManager) {
    this.container = document.getElementById(containerId);
    this.ticketManager = ticketManager;
    this.modalElement = document.getElementById('ticket-modal');
    this.modalTitle = document.getElementById('modal-title');
    this.ticketForm = document.getElementById('ticket-form');
    this.ticketIdInput = document.getElementById('ticket-id');
    this.ticketNameInput = document.getElementById('ticket-name');
    this.ticketDescriptionInput = document.getElementById('ticket-description');
    this.ticketStatusInput = document.getElementById('ticket-status');
    this.deleteModal = document.getElementById('confirm-delete-modal');
    this.detailsModal = document.getElementById('ticket-details-modal');

    this.detailsTitle = document.getElementById('details-title');
    this.detailsContent = document.getElementById('ticket-details-content');
    this.loadingIndicator = document.getElementById('loading-indicator');

    this.setupEventListeners();
  }

  setupEventListeners() {
    // Обработчик для кнопки "Добавить тикет"
    const addTicketBtn = document.getElementById('add-ticket-btn');
    if (addTicketBtn) {
      addTicketBtn.addEventListener('click', () => this.openCreateModal());
    }

    // Обработчики для модальных окон
    this.setupModalEventListeners();
  }

  setupModalEventListeners() {
    // Закрытие модальных окон по кнопке закрытия
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.closeAllModals();
      });
    });

    // Закрытие модальных окон по клику вне содержимого
    window.addEventListener('click', (event) => {
      if (event.target.classList.contains('modal')) {
        this.closeAllModals();
      }
    });

    // Обработка формы тикета
    this.ticketForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleTicketFormSubmit();
    });
  }

  /**
   * Отображает список тикетов
   * @param {Array} tickets - Массив тикетов
   */
  renderTickets(tickets) {
    if (!this.container) return;

    this.container.innerHTML = '';

    if (tickets && tickets.length > 0) {
      tickets.forEach((ticket) => {
        const ticketElement = this.createTicketElement(ticket);
        this.container.append(ticketElement);
      });
    } else {
      this.container.innerHTML = '<p>Тикетов пока нет</p>';
    }
  }

  /**
   * Создает элемент тикета
   * @param {Object} ticket - Объект тикета
   * @returns {HTMLElement} Элемент тикета
   */
  createTicketElement(ticket) {
    const ticketElement = document.createElement('div');
    ticketElement.className = `ticket ${
      ticket.status ? 'ticket-completed' : ''
    }`;
    ticketElement.dataset.id = ticket.id;

    const createdDate = new Date(ticket.created);
    const formattedDate = `${createdDate.getDate()}.${String(
      createdDate.getMonth() + 1
    ).padStart(2, '0')}.${createdDate.getFullYear()}`;

    ticketElement.innerHTML = `
      <div class="ticket-header">
        <h3 class="ticket-name">${ticket.name}</h3>
      </div>
      <div class="ticket-body" data-id="${ticket.id}">
        <p class="ticket-description">${ticket.description}</p>
      </div>
      <div class="ticket-footer">
        <div class="ticket-date">${formattedDate}</div>
        <button class="btn btn-small btn-status" data-id="${ticket.id}">
          ${ticket.status ? 'Сделано' : 'Не сделано'}
        </button>
        <button class="btn btn-small btn-edit" data-id="${ticket.id}">✎</button>
        <button class="btn btn-small btn-delete" data-id="${
  ticket.id
}">✕</button>
      </div>
    `;

    // Добавляем обработчики событий для кнопок
    const statusBtn = ticketElement.querySelector('.btn-status');
    const editBtn = ticketElement.querySelector('.btn-edit');
    const deleteBtn = ticketElement.querySelector('.btn-delete');
    const ticketBody = ticketElement.querySelector('.ticket-body');

    statusBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.ticketManager.toggleTicketStatus(ticket.id);
    });

    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.openEditModal(ticket);
    });

    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.openDeleteConfirmModal(ticket);
    });

    ticketBody.addEventListener('click', () => {
      this.openDetailsModal(ticket);
    });

    return ticketElement;
  }

  /**
   * Показывает индикатор загрузки
   */
  showLoading() {
    if (this.loadingIndicator) {
      this.loadingIndicator.classList.remove('hidden');
    }
  }

  /**
   * Скрывает индикатор загрузки
   */
  hideLoading() {
    if (this.loadingIndicator) {
      this.loadingIndicator.classList.add('hidden');
    }
  }

  /**
   * Открывает модальное окно создания тикета
   */
  openCreateModal() {
    this.modalTitle.textContent = 'Новый тикет';
    this.ticketForm.reset();
    this.ticketIdInput.value = '';
    this.ticketStatusInput.closest('.form-group').classList.add('hidden');
    this.modalElement.classList.remove('hidden');
  }

  /**
   * Открывает модальное окно редактирования тикета
   * @param {Object} ticket - Объект тикета
   */
  openEditModal(ticket) {
    this.modalTitle.textContent = 'Редактировать тикет';
    this.ticketIdInput.value = ticket.id;
    this.ticketNameInput.value = ticket.name;
    this.ticketDescriptionInput.value = ticket.description;
    this.ticketStatusInput.checked = ticket.status;
    this.modalElement.classList.remove('hidden');
  }

  /**
   * Открывает модальное окно подтверждения удаления
   * @param {Object} ticket - Объект тикета
   */
  openDeleteConfirmModal(ticket) {
    this.currentDeleteTicket = ticket;
    this.deleteModal.classList.remove('hidden');
  }

  /**
   * Открывает модальное окно просмотра деталей
   * @param {Object} ticket - Объект тикета
   */
  openDetailsModal(ticket) {
    this.detailsTitle.textContent = ticket.name;
    this.detailsContent.innerHTML = `
      <p><strong>Описание:</strong></p>
      <p>${ticket.description}</p>
      <p><strong>Дата создания:</strong> ${new Date(
    ticket.created
  ).toLocaleString()}</p>
      <p><strong>Статус:</strong> ${
  ticket.status ? 'Выполнено' : 'Не выполнено'
}</p>
    `;
    this.detailsModal.classList.remove('hidden');
  }

  /**
   * Закрывает все модальные окна
   */
  closeAllModals() {
    this.modalElement.classList.add('hidden');
    this.deleteModal.classList.add('hidden');
    this.detailsModal.classList.add('hidden');
  }

  /**
   * Обрабатывает отправку формы тикета
   */
  async handleTicketFormSubmit() {
    const id = this.ticketIdInput.value;
    const name = this.ticketNameInput.value;
    const description = this.ticketDescriptionInput.value;
    const status = this.ticketStatusInput.checked;

    const ticketData = {
      name, description, status
    };

    try {
      if (id) {
        // Обновление существующего тикета
        await this.ticketManager.updateTicket(id, ticketData);
      } else {
        // Создание нового тикета
        await this.ticketManager.createTicket(ticketData);
      }

      // Закрываем модальное окно и очищаем форму
      this.closeAllModals();
      this.ticketForm.reset();
      this.ticketStatusInput.closest('.form-group').classList.remove('hidden');
    } catch (error) {
      console.error('Ошибка при сохранении тикета:', error);
      alert('Произошла ошибка при сохранении тикета');
    }
  }

  /**
   * Подтверждает удаление тикета
   */
  async confirmDelete() {
    if (this.currentDeleteTicket) {
      try {
        await this.ticketManager.deleteTicket(this.currentDeleteTicket.id);
        this.deleteModal.classList.add('hidden');
      } catch (error) {
        console.error('Ошибка при удалении тикета:', error);
        alert('Произошла ошибка при удалении тикета');
      }
    }
  }

  /**
   * Отменяет удаление тикета
   */
  cancelDelete() {
    this.deleteModal.classList.add('hidden');
  }

  /**
   * Инициализирует обработчики событий для кнопок подтверждения/отмены удаления
   */
  initDeleteModalEventListeners() {
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const cancelDeleteBtn = document.getElementById('cancel-delete');

    if (confirmDeleteBtn) {
      confirmDeleteBtn.addEventListener('click', () => this.confirmDelete());
    }

    if (cancelDeleteBtn) {
      cancelDeleteBtn.addEventListener('click', () => this.cancelDelete());
    }
  }

  /**
   * Инициализирует представление
   */
  init() {
    this.initDeleteModalEventListeners();
  }
}
