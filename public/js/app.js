//token si moramo nekam spraviti
var token;


//moramo pripraviti funkcijo, ki se bo zgodila, ko pritisnemo na gumb
$('#submit-button').on('click', function () {

    //na tak nacin dobimo vrednost ven iz email input field-a
    var email = $('#email-input').val();
    var password = $('#password-input').val();

    //ko imamo to pripravljeno moramo narediti req na nas: /api/login
    $.post('/api/login', {email:email, password:password}, function (res) {

        if(res.token){
            token = res.token;
        }
    });
});

//ta gumb bo naredil req na protected route
$('#projects-button').on('click', function () {

    $.ajax({
        method:'GET',
        url:'/api/projects',
        headers:{ authorization:token},
        success:function (res) {

            console.log(res);
        },
        fail:function (err) {

            console.log(err);
        }
    });
});
