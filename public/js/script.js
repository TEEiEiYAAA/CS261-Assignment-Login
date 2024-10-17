document.getElementById('loginButton').disabled = true;

function checkForm() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;
  document.getElementById('loginButton').disabled = !(username && password && role !== '0');
}

function submitLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Application-Key': 'TU28dd5f3f9ecc9c1d39bacd00ae06738a6372e75453e2073599e81b22a06e3b45765ac86ef04c20fae96bc82e950f3bc4',
    },
    body: JSON.stringify({
      UserName: username,
      PassWord: password,
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Login Response:', data); // Log the response data for debugging
      if (data.success) {
        fetchUserProfile(username);
      } else {
        document.getElementById('message').innerText = `Welcome, ${data.displayname_en}!`;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('message').innerText = 'An error occurred. Please try again later.';
    });
}

function fetchUserProfile(username) {
  fetch(`https://restapi.tu.ac.th/api/v2/profile/std/info/?username=${username}`, {
    method: 'GET',
    headers: {
      'Application-Key': 'TU28dd5f3f9ecc9c1d39bacd00ae06738a6372e75453e2073599e81b22a06e3b45765ac86ef04c20fae96bc82e950f3bc4',
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Profile Response:', data); // Log the profile data for debugging
      if (data && data.displayname_en) {
        document.getElementById('message').innerText = `Welcome, ${data.displayname_en}!`;
      } else {
        document.getElementById('message').innerText = 'Failed to fetch profile data.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('message').innerText = 'An error occurred while fetching profile data. Please try again later.';
    });
}

function clearUsername() {
  document.getElementById('username').value = '';
  checkForm();
}

function togglePassword() {
  const passwordField = document.getElementById('password');
  const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordField.setAttribute('type', type);
}