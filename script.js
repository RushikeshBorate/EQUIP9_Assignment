document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const firstname = document.getElementById('fname').value;
    const lastname = document.getElementById('lname').value;
    const mobile = document.getElementById('mobile').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstname, lastname, mobile, password })
    });
    
    if (response.ok) {
        window.location.href = 'login.html';
    } else {
        alert('Registration failed');
    }
});
