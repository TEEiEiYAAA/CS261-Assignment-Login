function checkForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // Check if both fields are filled and a role is selected
    if (username !== "" && password !== "" && role !== "0") {
        document.getElementById('loginButton').disabled = false;  // Enable button
    } else {
        document.getElementById('loginButton').disabled = true;   // Disable button
    }
}

function clearUsername() {
    document.getElementById('username').value = ''; // Clear username field
    document.getElementById('clearUsername').style.display = 'none'; // Hide the clear icon
    checkForm(); // Update the login button state
}

document.getElementById('username').addEventListener('input', function() {
    // Show or hide the clear icon based on the input field's value
    if (this.value.length > 0) {
        document.getElementById('clearUsername').style.display = 'inline';
    } else {
        document.getElementById('clearUsername').style.display = 'none';
    }
});

function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            /*'Application-Key':''*/
        },
        body: JSON.stringify({ username, password, role })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
    })
    .catch(error => console.error('Error:', error));
}

function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleButton = document.getElementById('togglePassword');

    if (passwordField.type === "password") {
        passwordField.type = "text"; // Show the password
        toggleButton.innerText = "❌"; // Change icon to an "eye off" icon
    } else {
        passwordField.type = "password"; // Hide the password
        toggleButton.innerText = "👁️"; // Change icon to an "eye on" icon
    }
}