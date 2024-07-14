

$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        event.preventDefault();

        var formData = {
            loginId: $('#loginId').val(),
            password: $('#password').val()
        };

        $.ajax({
            url: '/api/auth/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(data) {
                localStorage.setItem('token', data); // Store JWT token in localStorage
                window.location.href = 'customerList.html'; // Redirect to customer list page
            },
            error: function(xhr, status, error) {
                console.error('Login failed:', error);
                alert('Login failed. Please check your credentials.');
            }
        });
    });
});

