myForm = new Form({
    path: "./submit.php",
    id: "form",
    className: "create-form",
    crossOrigin: false,
  });
  
  body = document.querySelector(".form-container");
  body.appendChild(myForm.create());
console.log(myForm);
myForm.createInputElement({
  type: "text",
  placeholder: "First Name",
  class: ["form-input", "half-width"],
  id: "formInput",
  name: "first_name",
  required: true,
});

myForm.createInputElement({
  type: "text",
  placeholder: "Last Name",
  class: ["form-input", "half-width"],
  id: ["formInput", "half"],
  name: "last_name",
  required: true,
});

myForm.createInputElement({
  type: "email",
  placeholder: "Email Address",
  class: "form-input",
  id: "formInput",
  name: "email",
  required: true,
});

myForm.createInputElement({
  type: "tel",
  placeholder: "Phone Number",
  class: "form-input",
  id: "formInput",
  name: "phone",
  required: true,
});

myForm.createInputElement({
  type: "hidden",
  name: "post_timestamp",
  value: new Date(),
  required: false,
});

myForm.createSelectElement({
  class: ["form-select", "select-dropdown"],
  id: "formSelect",
  option: {
    placeholder: "Select a car...",
    options: ["Volvo", "Saab", "Fiat", "Audi"],
  },
  name: "car_choice",
  required: true,
});

myForm.createTextArea({
    class: ["my-textarea", "text-area"],
    id: "textArea",
    placeholder: "Leave us a message...",
    name: "message",
    title: {
      class: "text-area-title",
      id: "title",
      value: "Leave us a message!",
    },
    copy: {
      class: "text-area-copy",
      id: "textAreaCopy",
      value: "Why not tell us more about your experience with us?",
    },
  });

myForm.createInputElement({
  type: "checkbox",
  placeholder:
    "By submitting this form you agree to the processing of your data.",
  class: "form-checkbox",
  id: "formInput",
  name: "terms",
  required: true,
});

myForm.createSubmit({
  text: "Submit",
  type: "submit",
  className: "cta",
  id: "formSubmit",
});


var button = document.querySelector('button#formSubmit');

button.addEventListener("click", function(event) {
    event.preventDefault();
    myForm.validate();
})
