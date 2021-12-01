
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})();

$("#login").click(function(){
 
  let data = {
      email: $("#email").val(),
      password: $("#password").val()
  };

  $.ajax({
      url:"http://localhost:8080/api/user/"+data.email+"/"+data.password,
      method:"GET",
      dataType: "json",
      success: function (response){
          console.log(response);
      }
  });
    
});

$("#register").click(function(){

  if($("#registerPassword").val() != $("#confirmPassword").val()){
    alert("El password ingresado no coincide con la confirmación");
  }

    let data = {
      registerEmail: $("#registerEmail").val(),
      registerPassword: $("#registerPassword").val(),
      registerUser: $("#registerUser").val()
  };

  $.ajax({
      url:"http://localhost:8080/api/user/"+data.email+"/"+data.password,
      method:"POST",
      dataType: "json",
      data: JSON.stringify(data),
      contentType: "application/json",
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: {
        201: function (response){
          console.log(response);
          alert("Usuario creado");
        }
      }
  });

});



