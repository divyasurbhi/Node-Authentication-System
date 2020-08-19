$(function() {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("form[name='registration']").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      first_name: "required",
      //last_name: "required",
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6
      },
      passwordConfirm:{
        required: true,
        minlength: 6
        
      },
      dob:{
          required:true
          },
          event:{
            required:true
          },
          duration:{
            required:true
          },
          phoneNumber:{
            required:true,
            minlength:10
          }
    },
    // Specify validation error messages
    messages: {
      first_name: "Please enter your firstname",
     
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 6 characters long"
      },
      passwordConfirm: {
        required: "Please confirm the password you provided",
        minlength: "This doesn't match with the password you provided"
      },
      email: "Please enter a valid email",
      dob:"Please enter your birth date",
      phoneNumber:{
        required:"Please provide phone number",
        minlength:"Please add valid phone number(min 10 characters required)"
      },
      event:"Please select the event",
      duration:"Please select event duration"
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
  });
});