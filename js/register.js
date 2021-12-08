
function registerUser(){
  let emailTest=testEmail($("#registerEmail").val());

  if( ($("#registerEmail").val() == "") || 
      ($("#registerUsername").val() == "") || 
      ($("#registerPassword").val() == "") || 
      ($("#registerConfPassword").val() == "")||emailTest==false ){

    validate(emailTest);

  }else{
    validateEmail($("#registerEmail").val());      
      
  }
}

function createUser(){
  let datos = {
    email: $("#registerEmail").val(),
    password: $("#registerPassword").val(),
    name: $("#registerUsername").val()
  };

  let datosPeticion=JSON.stringify(datos);
  console.log(datosPeticion);

  $.ajax({
    url:"http://localhost:8080/api/user/new",
    type:"POST",
    data:datosPeticion,
    contentType: "application/JSON",
    dataType: "JSON",

    success: function (response){  

      Swal.fire(
        'Proceso exitoso!',
        'El usuario fue creado correctamente!',
        'success'
      );
    },

    error: function (xhr, status) {

      Swal.fire(
        'No es posible crear el usuario!',
        'Intente de nuevo!',
        'warning'
      );
    },
  });
}


function validateEmail(value){

  let data = {
    email: value
  };

  $.ajax({
    url:"http://localhost:8080/api/user/"+data.email,
    type:"GET",
    dataType: "JSON",

    success: function (response){  

      if(response==true){
        Swal.fire(
          'El email ya existe!',
          'Por favor intente nuevamente.',
          'warning'
        );
      }else{

        createUser();
      }
    }
  });

}


function validate(emailTest) {

  textEmail=        "* Se debe ingresar un email valido!";
  textPassword=     "* Se debe ingresar el password!";
  textUser=         "* Se debe ingresar el usuario!";
  textConfPassword= "* Se debe confirmar el password!";
  textConfPassword2="* No coincide con el password!";

  if ($("#registerEmail").val() == "") {
    document.getElementById("invalid-regEmail").innerHTML = textEmail;
  }

  if ($("#registerUsername").val() == "") {
    document.getElementById("invalid-regUser").innerHTML = textUser;
  }

  if ($("#registerPassword").val() == "") {
    document.getElementById("invalid-regPassword").innerHTML = textPassword;
  }

  if ($("#registerConfPassword").val() == "") {
    document.getElementById("invalid-regConPassword").innerHTML = textConfPassword;
  }

  if ($("#registerPassword").val() != $("#registerConfPassword").val()) {
    document.getElementById("invalid-regConPassword").innerHTML = textConfPassword2;
  }

  if (emailTest== false) {
    document.getElementById("invalid-regEmail").innerHTML = textEmail;
  }
}

  
function noValidateRegEmail(){
  textEmail2="";
  document.getElementById("invalid-regEmail").innerHTML = textEmail2;
}

function noValidateRegUser(){
  textUser2="";
  document.getElementById("invalid-regUser").innerHTML = textUser2;
}

function noValidateRegPassword(){
  textPassword2="";
  document.getElementById("invalid-regPassword").innerHTML = textPassword2;
}

function noValidateRegConPassword(){
  textConfPassword2="";
  document.getElementById("invalid-regConPassword").innerHTML = textConfPassword2;
}

function testEmail(value){
  
	re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
	if(!re.exec(value)){
	  return false;
	}
	  return true;
}