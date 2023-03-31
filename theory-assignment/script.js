function registerDonor(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const city = document.getElementById("city").value;
  const phone = document.getElementById("phone").value;
  const bloodType = document.getElementById("bloodType").value;
  const rhFactor = document.querySelector(
    'input[name="rhFactor"]:checked'
  ).value;
  const address = document.getElementById("address").value;

  if (phone.length !== 10 || isNaN(phone)) {
    alert("Phone number should be exactly 10 digits and contain only numbers.");
    return false;
  }

  if (address && address.length < 40) {
    alert("Address should be at least 40 characters long.");
    return false;
  }

  // Add your API call to register the donor, then redirect to the success page.
  // Example: (Replace with your own API route)
  // fetch('/api/registerDonor', { method: 'POST', body: JSON.stringify({ name, city, phone, bloodType, rhFactor, address }) })
  // .then(response => {
  //     if (response.ok) {
  //         window.location.href = 'success.html';
  //     } else {
  //         alert('There was an error registering the donor.');
  //     }
  // });
  window.location.href = "success.html";

  return false;
}

function searchDonor(event) {
  event.preventDefault();

  const searchCity = document.getElementById("searchCity").value;
  const searchBloodType = document.getElementById("searchBloodType").value;

  // Add your API call to search donors based on the city and/or blood type.
  // Example: (Replace with your own API route)
  // fetch('/api/searchDonor', { method: 'POST', body: JSON.stringify({ searchCity, searchBloodType }) })
  // .then(response => response.json())
  // .then(data => {
  //     displaySearchResults(data);
  // });
  // make mock data
  const donorData = [
    {
      name: "John Doe",
      city: "Chennai",
      phone: "1234567890",
      bloodType: "A",
      rhFactor: "+",
      address: "123 Main St, Chennai, 10001",
    },
    {
      name: "Jane Doe",
      city: "Tambaram",
      phone: "1234567890",
      bloodType: "B",
      rhFactor: "-",
      address: "123 Main St, Tambaram, 10001",
    },
    {
      name: "John Smith",
      city: "Adyar",
      phone: "1234567890",
      bloodType: "AB",
      rhFactor: "+",
      address: "123 Main St, Adyar, 10001",
    },
    {
      name: "Jane Smith",
      city: "Tambaram",
      phone: "1234567890",
      bloodType: "O",
      rhFactor: "-",
      address: "123 Main St, Tambaram, 10001",
    },
  ];

  const results = donorData.filter((donor) => {
    // account for all in search
    if (searchCity === "All" && searchBloodType === "All") {
      return true;
    } else if (searchCity === "All") {
      return donor.bloodType === searchBloodType;
    } else if (searchBloodType === "All") {
      return donor.city === searchCity;
    } else {
      return donor.city === searchCity && donor.bloodType === searchBloodType;
    }
  });

  displaySearchResults(results);

  return false;
}

function displaySearchResults(results) {
  const searchResultsDiv = document.getElementById("searchResults");
  searchResultsDiv.innerHTML = "";

  if (results.length === 0) {
    const resultDiv = document.createElement("div");
    resultDiv.className = "searchResult";
    resultDiv.innerHTML = `
          <p>No results found.</p>
      `;
    searchResultsDiv.appendChild(resultDiv);
    return;
  }

  results.forEach((result) => {
    const resultDiv = document.createElement("div");
    resultDiv.className = "searchResult";
    resultDiv.innerHTML = `
          <p>Name: ${result.name}</p>
          <p>City: ${result.city}</p>
          <p>Phone: ${result.phone}</p>
          <p>Blood Type: ${result.bloodType} ${result.rhFactor}</p>
          <p>Address: ${result.address}</p>
      `;
    searchResultsDiv.appendChild(resultDiv);
  });
}
