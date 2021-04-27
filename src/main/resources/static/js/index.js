$(document).ready(showAllUsers());

function showAllUsers() {
    $("#table").empty();
    $.ajax({
        type: 'GET',
        url: '/api/users',
        success: function (data) {
            console.log(data);
            $.each(data, function (i, user) {
                $("#table").append($('<tr>').append(
                    $('<td>').append($('<span>')).text(user.id),
                    $('<td>').append($('<span>')).text(user.username),
                    $('<td>').append($('<span>')).text(user.password),
                    $('<td>').append($('<span>')).text(user.roles),

                    $('<td>').append($('<button>').text("Edit").attr({
                        "type": "button",
                        "class": "btn btn-primary edit",
                        "data-toggle": "modal",
                        "data-target": "#iModal",

                    })
                        .data("user", user)),

                    $('<td>').append($('<button>').text("Delete").attr({
                        "type": "button",
                        "class": "btn btn-danger delete",
                        "data-toggle": "modal",
                        "data-target": "#modalDel",
                    })
                        .data("user", user))
                    )
                );
            });
        }
    });
}

$(document).on("click", ".edit", function () {
    let user = $(this).data('user');

    $('#idInput').val(user.id);
    $('#usernameInput').val(user.username);
    $('#passwordInput').val(user.password);
    $('#roleInput').val(user.roles);

});

$(document).on("click", ".editUser", function () {
    let formData = $(".formEditUser").serializeArray();
    $.ajax({
        type: 'PUT',
        url: '/api/users',
        data: formData,
        success: function () {
            showAllUsers();
        }
    });
});

$(document).on("click", ".delete", function () {
    let user = $(this).data('user');

    $('#id').val(user.id);
    $('#username').val(user.username);
    $('#password').val(user.password);

    $(document).on("click", ".deleteUser", function () {
        $.ajax({
            type: 'DELETE',
            url: '/api/users/' + $('#id').val(),
            data: {id: $('#id').val()},
            success: function () {
                showAllUsers();
            }
        });
    });
})

$('.addUser').click(function () {
    $('#usersTable').trigger('click');
    let formData = $(".formAddUser").serializeArray();
    $.ajax({
        type: 'POST',
        url: '/api/users',
        data: formData,
        success: function () {

            $('.formAddUser')[0].reset();
            showAllUsers()
        }
    })
});

$(document).ready(getUser());
function getUser() {
    $("#userTable").empty();
    $.ajax({
        type: 'GET',
        url: '/api/users',
        error: function() {
            $('#menuForUser').hide();
        },
        success: function (data) {
            console.log(data);
            $.each(data, function (i, user) {
                $("#userTable").append($('<tr>').append(
                    $('<td>').append($('<span>')).text(user.id),
                    $('<td>').append($('<span>')).text(user.username),
                    $('<td>').append($('<span>')).text(user.password),
                    $('<td>').append($('<span>')).text(user.roles),
                    )
                );
            });
        }
    });
}