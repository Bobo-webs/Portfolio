"use strict";

//Opening or closing side bar

const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

//Activating Filter Select and filtering options

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue == "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue == filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

//Enabling filter button for larger screens

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// Enabling Contact Form

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Enabling Page Navigation

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Restore last opened page
const savedPage = localStorage.getItem("activePage");

if (savedPage) {
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].dataset.page === savedPage) {
      pages[i].classList.add("active");
      navigationLinks[i].classList.add("active");
    } else {
      pages[i].classList.remove("active");
      navigationLinks[i].classList.remove("active");
    }
  }
}

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() == pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");

        // Save current page
        localStorage.setItem("activePage", pages[j].dataset.page);

        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// Contact Form EamilJs
document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Collect form data
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Prepare EmailJS parameters
  const templateParams = {
    fullname: fullName,
    email: email,
    message: message,
  };

  // Send email via EmailJS
  emailjs.send("service_lorebim", "template_p4vhvdq", templateParams).then(
    function (response) {
      alert("Message sent successfully!✅");
      document.getElementById("myForm").reset();
    },
    function (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message❌. Please try again.");
    }
  );
});

// Enable submit button when form is valid
const myForm = document.getElementById("myForm");
const submitButton = document.getElementById("submit");

form.addEventListener("input", function () {
  submitButton.disabled = !myForm.checkValidity();
});
