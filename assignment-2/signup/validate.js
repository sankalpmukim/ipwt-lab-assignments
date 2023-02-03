const form = document.getElementById("signup-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let errors = [];
  const name = document.getElementById("full-name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");
  const phone = document.getElementById("phone-number");
  const errorList = document.querySelector(".error-list");
  // Validate Name
  if (!/^[a-zA-Z ]{2,25}$/.test(name.value)) {
    errors.push(
      "Name must contain only letters with a length between 2 and 25."
    );
    name.classList.add("error");
  } else {
    name.classList.remove("error");
  }

  // Validate Email
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    errors.push("Email is not valid.");
    email.classList.add("error");
  } else {
    email.classList.remove("error");
  }

  // Validate Password
  if (
    !/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,15}$/.test(
      password.value
    )
  ) {
    errors.push(
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character (!@#$&*) with a minimum length of 8 and a maximum length of 15."
    );
    password.classList.add("error");
  } else {
    password.classList.remove("error");
  }

  // Validate Confirm Password
  if (password.value !== confirmPassword.value) {
    errors.push("Confirm Password must match Password.");
    confirmPassword.classList.add("error");
  } else {
    confirmPassword.classList.remove("error");
  }

  // Validate Phone
  if (!/^[6-9]\d{9}$/.test(phone.value)) {
    errors.push(
      "Phone number must be a 10 digit number without any spaces or special characters."
    );
    phone.classList.add("error");
  } else {
    phone.classList.remove("error");
  }

  // Display errors if any
  if (errors.length) {
    errorList.innerHTML = "";
    errors.forEach(function (error) {
      let errorItem = document.createElement("li");
      errorItem.textContent = error;
      errorList.appendChild(errorItem);
    });
  } else {
    errorList.innerHTML = "";
    form.submit();
  }
});
