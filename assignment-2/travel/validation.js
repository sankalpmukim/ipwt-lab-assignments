document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  let fullName = document.querySelector("input[name='fullName']").value.trim();
  let email = document.querySelector("input[name='email']").value.trim();
  let tourPackage = document.querySelector("select[name='tourPackage']").value;
  let arrivalDate = document
    .querySelector("input[name='arrivalDate']")
    .value.trim();
  let numberOfPersons = document
    .querySelector("input[name='numberOfPersons']")
    .value.trim();
  let services = document.querySelectorAll("input[name='services']:checked");
  let couponCode = document
    .querySelector("input[name='couponCode']")
    .value.trim();
  let termsAndConditions = document.querySelector(
    "input[name='termsAndConditions']"
  ).checked;

  let errorMessages = [];

  if (!fullName) {
    errorMessages.push("Full name is mandatory.");
  }

  if (!email) {
    errorMessages.push("Email is mandatory.");
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errorMessages.push("Invalid email.");
  }

  if (!tourPackage) {
    errorMessages.push("Tour package is mandatory.");
  }

  if (!arrivalDate) {
    errorMessages.push("Arrival date is mandatory.");
  }

  if (!numberOfPersons) {
    errorMessages.push("Number of persons is mandatory.");
  }

  if (!services.length) {
    errorMessages.push("Please select at least one service.");
  }

  if (couponCode && couponCode.length !== 8) {
    errorMessages.push("Coupon code should be exactly 8 characters long.");
  }

  if (couponCode && !/^[A-Z]{8}$/.test(couponCode)) {
    errorMessages.push("Coupon code should be in capital letters.");
  }

  if (!termsAndConditions) {
    errorMessages.push("Please accept terms and conditions.");
  }

  let errorList = document.querySelector(".form__error-list");
  errorList.innerHTML = "";

  if (errorMessages.length) {
    errorMessages.forEach(function (errorMessage) {
      let li = document.createElement("li");
      li.innerText = errorMessage;
      errorList.appendChild(li);
    });
  } else {
    alert("Form submitted successfully.");
  }
});
