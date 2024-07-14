
// addCustomer.js

$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        $('#formTitle').text('Edit Customer');

        $.ajax({
            url: '/api/customers/' + id,
            type: 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token')); // Add JWT token to request header
            },
            success: function(customer) {
                $('#firstName').val(customer.firstName);
                $('#lastName').val(customer.lastName);
                $('#street').val(customer.street);
                $('#address').val(customer.address);
                $('#city').val(customer.city);
                $('#state').val(customer.state);
                $('#email').val(customer.email);
                $('#phone').val(customer.phone);
            },
            error: function(xhr, status, error) {
                console.error('Error loading customer data:', error);
            }
        });
    }

    $('#customerForm').submit(function(event) {
        event.preventDefault();

        var formData = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            street: $('#street').val(),
            address: $('#address').val(),
            city: $('#city').val(),
            state: $('#state').val(),
            email: $('#email').val(),
            phone: $('#phone').val()
        };

        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/customers/${id}` : '/api/customers';

        $.ajax({
            url: url,
            type: method,
            contentType: 'application/json',
            data: JSON.stringify(formData),
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token')); // Add JWT token to request header
            },
            success: function() {
                $('#customerForm')[0].reset(); // Clear form fields
                window.location.href = 'customerList.html'; // Redirect to customer list page
            },
            error: function(xhr, status, error) {
                console.error('Error saving customer:', error);
                alert('Failed to save customer. Please try again.');
            }
        });
    });
});

 