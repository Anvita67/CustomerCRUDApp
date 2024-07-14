$(document).ready(function() {
    loadCustomers();

    function loadCustomers() {
        $.ajax({
            url: '/api/customers',
            type: 'GET',
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            },
            success: function(data) {
                displayCustomers(data.content);
                setupPagination(data);
            },
            error: function(xhr, status, error) {
                console.error('Error loading customers:', error);
            }
        });
    }

    function displayCustomers(customers) {
        const tableBody = $('#customerTableBody');
        tableBody.empty();

        customers.forEach(customer => {
            const row = `
                <tr>
                    <td>${customer.id}</td>
                    <td>${customer.firstName}</td>
                    <td>${customer.lastName}</td>
                    <td>${customer.street}</td>
                    <td>${customer.address}</td>
                    <td>${customer.city}</td>
                    <td>${customer.state}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
                    <td>
                        <button class="edit" onclick="editCustomer(${customer.id})">Edit</button>
                        <button class="delete" onclick="deleteCustomer(${customer.id})">Delete</button>
                    </td>
                </tr>`;
            tableBody.append(row);
        });
    }

    function setupPagination(data) {
        const pagination = $('.pagination');
        pagination.empty();

        for (let i = 0; i < data.totalPages; i++) {
            const button = `<button ${i === data.number ? 'class="active"' : ''} onclick="loadPage(${i})">${i + 1}</button>`;
            pagination.append(button);
        }
    }

    window.editCustomer = function(id) {
        window.location.href = `addCustomer.html?id=${id}`;
    };

    window.deleteCustomer = function(id) {
        if (confirm('Are you sure you want to delete this customer?')) {
            $.ajax({
                url: `/api/customers/${id}`,
                type: 'DELETE',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
                },
                success: function() {
                    loadCustomers();
                },
                error: function(xhr, status, error) {
                    console.error('Error deleting customer:', error);
                }
            });
        }
    };

    window.loadPage = function(page) {
        $.ajax({
            url: `/api/customers?page=${page}`,
            type: 'GET',
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            },
            success: function(data) {
                displayCustomers(data.content);
                setupPagination(data);
            },
            error: function(xhr, status, error) {
                console.error('Error loading customers:', error);
            }
        });
    };

    $('#logoutBtn').click(function() {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });
});
