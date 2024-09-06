function showSignup() {
    document.getElementById('welcome-section').style.display = 'none';
    document.getElementById('auth-container').style.display = 'block';
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
}

function showLogin() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function signup() {
    const name = document.getElementById('signup-name').value;
    const phone = document.getElementById('signup-phone').value;
    const email = document.getElementById('signup-email').value;
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (name && phone && email && username && password) {
        const user = {
            name,
            phone,
            email,
            username,
            password,
        };

        localStorage.setItem('user', JSON.stringify(user));
        alert('Signup successful! Please login.');
        showLogin();
    } else {
        alert('Please fill in all fields.');
    }
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && username === storedUser.username && password === storedUser.password) {
        sessionStorage.setItem('loggedIn', 'true');
        alert('Login successful!');
        // Redirect to the main expense tracker page or reveal the app content
        window.location.href = "index.html"; // Example redirect
    } else {
        alert('Incorrect username or password.');
    }
}