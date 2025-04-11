document.addEventListener("DOMContentLoaded", function () {
  function selectOption(element, option) {
    document.querySelectorAll(".option").forEach((el) => {
      el.classList.remove("selected");
    });

    element.classList.add("selected");
    localStorage.setItem("selectedOption", option);
  }

  window.selectOption = selectOption;

  document
    .getElementById("continue-btn")
    .addEventListener("click", function () {
      const selectedOption = localStorage.getItem("selectedOption");

        document.getElementById("step-one").style.display = "none";
        document.getElementById("step-two").style.display = "flex";

        document.querySelector(".header").classList.add("centered-header");
        document.querySelector(".header-right").style.display = "none";

        document.querySelector(".footer").style.display = "none";
    });

  document
    .getElementById("continue-btn-step-two")
    .addEventListener("click", function () {
        document.getElementById("step-two").style.display = "none";
        document.getElementById("step-three").style.display = "flex";
    });

  document
    .getElementById("continue-btn-step-three")
    .addEventListener("click", function () {
      const fromValue = document.getElementById("number-from").value;
      const toValue = document.getElementById("number-to").value;
      const month = document.getElementById("birth-month").value;
      const day = document.getElementById("birth-day").value;
      const year = document.getElementById("birth-year").value;

        localStorage.setItem("rangeFrom", fromValue);
        localStorage.setItem("rangeTo", toValue);
        localStorage.setItem("birthMonth", month);
        localStorage.setItem("birthDay", day);
        localStorage.setItem("birthYear", year);
        document.getElementById("step-three").style.display = "none";
        document.getElementById("step-four").style.display = "flex";
     
    });
  document
    .getElementById("continue-btn-step-four")
    .addEventListener("click", function () {
        document.getElementById("step-four").style.display = "none";
        document.getElementById("step-five").style.display = "flex";
     
    });
    document
    .getElementById("continue-btn-step-five")
    .addEventListener("click", function () {

        document.getElementById("step-five").style.display = "none";
        document.getElementById("step-six").style.display = "flex";
     
    });

  const cookieBanner = document.getElementById("cookie-banner");
  const acceptButton = document.getElementById("accept-cookies");

  if (localStorage.getItem("cookieChoice")) {
    cookieBanner.style.display = "none";
  }

  if (acceptButton) {
    acceptButton.addEventListener("click", function () {
      localStorage.setItem("cookieChoice", "accepted");
      cookieBanner.style.display = "none";
    });
  }

  const carousels = document.querySelectorAll(".image-carousel");

  carousels.forEach(function (carousel) {
    const carouselImages = carousel.querySelector(".carousel-images");

    carousel.style.touchAction = "pan-x";
    carousel.style.userSelect = "none";

    let startX;
    let currentX;
    let isDragging = false;
    let initialOffset;

    function startSwipe(e) {
      isDragging = true;
      startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
      initialOffset = getTranslateX(carouselImages);

      carouselImages.style.transition = "none";
    }

    function moveSwipe(e) {
      if (!isDragging) return;

      e.preventDefault();

      currentX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
      const diffX = currentX - startX;

      let newTranslateX = initialOffset + diffX * 0.8;

      carouselImages.style.transform = `translateX(${newTranslateX}px)`;
    }

    function endSwipe(e) {
      if (!isDragging) return;
      isDragging = false;

      carouselImages.style.transition = "transform 0.3s ease-out";

      resetCarouselPosition();
    }

    function getTranslateX(element) {
      const style = window.getComputedStyle(element);
      const matrix = new WebKitCSSMatrix(style.transform);
      return matrix.m41;
    }

    carousel.addEventListener("mousedown", startSwipe);
    window.addEventListener("mousemove", moveSwipe);
    window.addEventListener("mouseup", endSwipe);

    carousel.addEventListener("touchstart", startSwipe);
    carousel.addEventListener("touchmove", moveSwipe, { passive: false });
    carousel.addEventListener("touchend", endSwipe);
  });

  function resetCarouselPosition(element) {
    if (window.innerWidth < 768) {
      element.style.left = "-25%";
    } else if (window.innerWidth < 1024) {
      element.style.left = "-10%";
    } else {
      element.style.left = "0";
    }
    element.style.transform = "translateX(0)";
  }

  window.addEventListener("resize", function () {
    document
      .querySelectorAll(".carousel-images")
      .forEach(resetCarouselPosition);
  });

  document.querySelectorAll(".carousel-images").forEach(resetCarouselPosition);
});
document.addEventListener("DOMContentLoaded", function () {
  const dropdownToInputMap = {
    "from-dropdown": "number-from",
    "to-dropdown": "number-to",
    "month-dropdown": "birth-month",
    "day-dropdown": "birth-day",
    "year-dropdown": "birth-year",
  };

  const generateRangeNumbers = (min, max) => {
    const numbers = [];
    for (let i = min; i <= max; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  const generateMonths = () => {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  };

  const generateDays = () => {
    return generateRangeNumbers(1, 31);
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return generateRangeNumbers(1900, currentYear);
  };

  const fillDropdown = (dropdownId, items) => {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;

    dropdown.innerHTML = "";

    items.forEach((item) => {
      const dropdownItem = document.createElement("div");
      dropdownItem.classList.add("survey-dropdown-item");
      dropdownItem.textContent = item;
      dropdownItem.addEventListener("click", function () {
        const inputId = dropdownToInputMap[dropdownId];
        const input = document.getElementById(inputId);
        if (input) {
          input.value = item;
        }
        dropdown.classList.remove("active");
      });
      dropdown.appendChild(dropdownItem);
    });
  };

  fillDropdown("from-dropdown", generateRangeNumbers(1, 100));
  fillDropdown("to-dropdown", generateRangeNumbers(1, 100));
  fillDropdown("month-dropdown", generateMonths());
  fillDropdown("day-dropdown", generateDays());
  fillDropdown("year-dropdown", generateYears());

  const dropdownArrows = document.querySelectorAll(".survey-dropdown-arrow");

  dropdownArrows.forEach((arrow) => {
    arrow.addEventListener("click", function () {
      const container = this.closest(".survey-dropdown-container");
      const dropdown = container.querySelector(".survey-dropdown-menu");

      document
        .querySelectorAll(".survey-dropdown-menu.active")
        .forEach((menu) => {
          if (menu !== dropdown) {
            menu.classList.remove("active");
          }
        });

      dropdown.classList.toggle("active");
    });
  });

  document.addEventListener("click", function (event) {
    const isDropdownClick = event.target.closest(".survey-dropdown-container");
    if (!isDropdownClick) {
      document
        .querySelectorAll(".survey-dropdown-menu.active")
        .forEach((menu) => {
          menu.classList.remove("active");
        });
    }
  });

  const dropdownInputs = document.querySelectorAll(".survey-field");

  dropdownInputs.forEach((input) => {
    input.addEventListener("click", function () {
      const container = this.closest(".survey-dropdown-container");
      const dropdown = container.querySelector(".survey-dropdown-menu");

      document
        .querySelectorAll(".survey-dropdown-menu.active")
        .forEach((menu) => {
          if (menu !== dropdown) {
            menu.classList.remove("active");
          }
        });

      dropdown.classList.add("active");
    });
  });
});
document.querySelector('.custom-checkbox').addEventListener('click', function() {
    const checkbox = this.previousElementSibling;
    checkbox.checked = !checkbox.checked;
    
    this.classList.add('click-effect');
    setTimeout(() => this.classList.remove('click-effect'), 300);
  });