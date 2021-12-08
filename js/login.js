
function loginUser(){

  let emailTest=testEmail($("#email").val());

  if( ($("#email").val() == "") ||
      ($("#password").val() == "") ||
      ($("#registerConfPassword").val() == "")||emailTest==false ){

    validate(emailTest);

  }else{

    let data = {
      email: $("#email").val(),
      password: $("#password").val()
    };
  
    //let datosPeticion=JSON.stringify(data);
  
    $.ajax({
      url:"http://localhost:8080/api/user/"+data.email+"/"+data.password,
      type:"GET",
      dataType: "JSON",
  
      success: function (response){     
  
        nameResponse=response.name;
  
        if(nameResponse=='NO DEFINIDO'){
          console.log(nameResponse)
          Swal.fire(
            'Datos incorrectos!',
            'Usuario y/o contraseña no existen, intente de nuevo!',
            'warning'
          );
  
  
        }else{
          console.log(nameResponse)
          Swal.fire(
            'Bienvenido!',
            'Gracias por ingresar a la divina comedia!',
            'success'
          );
  
        }
      }
    });

  }

}


function validate(emailTest) {

  textEmail="* Se debe ingresar un email valido!";
  textPassword="* Se debe ingresar el password!";

  if ($("#email").val() == "") {
    document.getElementById("invalid-email").innerHTML = textEmail;
  }
  if ($("#password").val() == "") {
    document.getElementById("invalid-password").innerHTML = textPassword;
  }

  if (emailTest== false) {
    document.getElementById("invalid-email").innerHTML = textEmail;
  }
}


function noValidateEmail(){
  textEmail2="";
  document.getElementById("invalid-email").innerHTML = textEmail2;
}

function noValidatePassword(){
  textPassword2="";
  document.getElementById("invalid-password").innerHTML = textPassword2;
}


function testEmail(value){

	re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
	if(!re.exec(value)){
	  return false;
	}
	  return true;
}