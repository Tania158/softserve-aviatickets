import currencyUI from "./currency";

class TicketsUI {
  constructor(currency) {
    this.container = document.querySelector(
      ".tickets-sections .tickets-sections__main-block"
    );
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
  }

  renderTickets(tickets) {
    this.clearContainer();

    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    let fragment = "";
    const currency = this.getCurrencySymbol();

    tickets.forEach((ticket) => {
      const template = TicketsUI.ticketTemplate(ticket, currency);
      fragment += template;
    });

    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  showEmptyMsg() {
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  static emptyMsgTemplate() {
    return `
    <div class="tickets-empty-res-msg">
      No tickets were found for your request.
    </div>
    `;
  }

  static ticketTemplate(ticket, currency) {
    return `
    <div class="tickets-sections__ticket">
      <div class="tickets-sections__ticket-card">
        <div class="ticket-airline d-flex align-items-center">
          <img
            src="${ticket.airline_logo}"
            class="ticket-airline-img"
          />
          <span class="ticket-airline-name"
            >${ticket.airline_name}</span
          >
        </div>
        <div class="ticket-destination d-flex align-items-center">
          <div class="d-flex align-items-center">
            <span class="ticket-city">${ticket.origin_name}</span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="line-ticket">
            <span class="dot"></span>
            <span class="divider-line"></span>
            <svg class="arrow-icon" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"><path d="m11.893 5.807.113-.007a.9.9 0 0 1 .893.787l.007.113-.001 8.393 2.419-2.41a.905.905 0 0 1 1.09-.06l.096.076c.34.304.395.807.146 1.174l-.075.097-3.865 3.932a.904.904 0 0 1-1.255.087l-4.049-4.02a.898.898 0 0 1 .066-1.27.904.904 0 0 1 1.186-.02l2.441 2.368V6.7a.9.9 0 0 1 .788-.893l.113-.007-.113.007Z"></path></svg>
            <span class="divider-line"></span>
            <span class="dot"></span>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="ticket-city">${ticket.destination_name}</span>
          </div>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Transplant: ${ticket.transfers}</span>
          <span class="ticket-flight-number">Flight number: ${ticket.flight_number}</span>
          <span class="ticket-time-departure">${ticket.departure_at}</span>
        </div>
      </div>
      <div class="ticket-time-price d-flex align-items-center">
        <button class="select-btn">Select</button>
        <span class="ticket-price">${currency}${ticket.price}</span>
      </div>
    </div>
    `;
  }
}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;
