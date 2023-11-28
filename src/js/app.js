import "../css/style.css";
import "./plugins";
import locations from "./store/locations";
import formUI from "./views/form";
import ticketsUI from "./views/tickets";
import currencyUI from "./views/currency";
import lightGallery from "lightgallery";

document.addEventListener("DOMContentLoaded", (e) => {
  const form = formUI.form;

  // Events
  initApp();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  // handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    console.log(form);
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currecyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);
  }

  const openMenuBtn = document.querySelector(".header__burger-menu");
  const mobileMenu = document.querySelector(".header__menu");
  openMenuBtn.addEventListener("click", function (e) {
    document.body.classList.toggle("scroll-lock");
    openMenuBtn.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  const navLinks = document.querySelectorAll(".header__menu-link");
  navLinks.forEach((navLink) => {
    navLink.addEventListener("click", (_) => {
      if (openMenuBtn.classList.contains("active")) {
        document.body.classList.remove("scroll-lock");
        openMenuBtn.classList.remove("active");
        mobileMenu.classList.remove("active");
      }
    });
  });

  // Close the mobile menu on wider screens if the device orientation changes
  window.matchMedia("(min-width: 992px)").addEventListener("change", (e) => {
    if (!e.matches) return;
    mobileMenu.classList.remove("active");
    openMenuBtn.classList.remove("active");
    document.body.classList.remove("scroll-lock");
  });

  const tabsBtn = document.querySelectorAll(".special-upcoming__btn-tab");
  const tabsContent = document.querySelectorAll(".special-upcoming__tabs");

  tabsBtn.forEach(setOnTabClick);

  function setOnTabClick(item) {
    item.addEventListener("click", function () {
      const currentBtn = item;
      const tabId = currentBtn.getAttribute("data-tab");
      const currentTab = document.querySelector(tabId);

      if (!currentBtn.classList.contains("active-btn")) {
        tabsBtn.forEach(function (item) {
          item.classList.remove("active-btn");
        });

        tabsContent.forEach(function (item) {
          item.classList.remove("active-tab");
        });

        currentBtn.classList.add("active-btn");
        currentTab.classList.add("active-tab");
      }
    });
  }

  lightGallery(document.getElementById("static-thumbnails"), {
    animateThumb: false,
    zoomFromOrigin: false,
    allowMediaOverlap: true,
    toggleThumb: true,
  });
});
