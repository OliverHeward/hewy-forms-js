/*
 *
 *
 * JavaScript Form Creation and Validation Library
 *
 * The Idea:
 * Be able to create a new form by calling new Form() - although conflicts will need to be checked
 *
 * Parameters that will need to be passed directly to the creation of the form
 * POST - ID - CLASS - AJAX - (can take an array for multiple POST requests) - crossOrigin
 *
 * CREATING NEW FORM ELEMENTS
 * create a function called .createFormElement()
 * These functions can be created using prototypes so that they are attached to Form.
 * If the form is saved to a veriable
 *
 *
 */

/* 
CLASS FORM   
params @{args} 
    sendTo => Used for XML request to send the data of the form
    id => Sets the forms ID
    className => Sets the forms Class
    crossOrigin => Sets Cross-origin Resource Sharing 
*/
class Form {
  constructor(args) {
    this.id = args.id;
    this.className = args.className;
    this.crossOrigin = args.crossOrigin;
    this.path = args.path;
  }

  create() {
    var form = document.createElement("form");
    form.className = this.className;
    form.classList.add("hewy-form");
    form.id = this.id;
    return form;
  }

  submit(isValid) {
    console.log("submit was called");
    if (isValid) {
      console.log("is valid");
      fetch(this.path, {
        method: "POST",
        body: new FormData(document.querySelector("form.hewy-form")),
        crossOrigin: this.crossOrigin,
      }).then(function (response) {
        return response.text();
      }
      ).then(function (html) {
        return console.log(html);
      });
    } else {
      alert("some of the fields have returned invalid.");
    }
  }
}

myForm = new Form({
  path: "./submit.php",
  id: "form",
  className: "create-form",
  crossOrigin: false,
});

body = document.querySelector("body");
body.appendChild(myForm.create());

// createFormElement needs to be passed
// elementType -> INPUT, TEXTAREA
Form.prototype.createFormElement = function (args) {
  let type = args.elementType.toLowerCase();
  let input = args.inputType;
  let classes = args.className;
  let validation = args.shouldValidate;
  let id = args.id;
  let createInput;
  let name = args.name;
  let form = document.querySelector("form");
  let button = document.querySelector(".form-submit-cta");

  if(args.value == "" || args.value == undefined) {
    args.value = "";
  }

  switch (type) {
    case "input":
      createInput = document.createElement("INPUT");
      createInput.setAttribute("type", input);
      createInput.className = classes;
      createInput.id = id;
      createInput.placeholder = args.placeholder;
      createInput.name = name;
      createInput.value = args.value;
      createInput.setAttribute("required", validation);
      // form.insertBefore(createInput, button);
      form.appendChild(createInput);
        break;
    case "hidden":
      createInput = document.createElement("INPUT");
      createInput.setAttribute("type", input);
      createInput.className = classes;
      createInput.id = id;
      createInput.name = name;
      createInput.value = args.value;
      createInput.setAttribute("required", validation);
        break;
    default:
      createInput = document.createElement("INPUT");
      createInput.setAttribute("type", input);
      createInput.className = classes;
      createInput.id = id;
      createInput.name = name;
      createInput.value = args.value;
      createInput.setAttribute("required", validation);
        break;
  }
};

Form.prototype.createSubmit = function (args) {
  let button = document.createElement("BUTTON");
  button.className = "form-submit-cta";
  button.classList.add(args.className);
  button.id = args.id;
  button.innerText = args.text;
  form.appendChild(button);
};

Form.prototype.validate = function () {
  var error = 0;
  let inputs = document.querySelectorAll("input");

  for (var i = 0; i < inputs.length; i++) {
    switch (inputs[i].type) {
      case "email":
        if (
          (inputs[i].value !== "" &&
            inputs[i].value.indexOf("@") > -1 &&
            inputs[i].value.slice(-1) != "@" &&
            inputs[i].required) ||
          (inputs[i].value !== "" && !inputs[i].required)
        ) {
          inputs[i].classList.remove("error");
        } else {
          error = parseInt(error + 1);
          inputs[i].classList.add("error");
        }
        break;
      case "text":
        if (inputs[i].value !== "" && inputs[i].required) {
          inputs[i].classList.remove("error");
        } else if (!inputs[i].required) {
          inputs[i].classList.remove("error");
          break;
        } else {
          error = parseInt(error + 1);
          inputs[i].classList.add("error");
        }
        break;
      default:
        // console.log('[default]', inputs[i]);
        break;
    }
  }

  if (error === 0) {
    let isValid = true;
    console.log("passed validation");
    myForm.submit(isValid);
  }
};

myForm.createFormElement({
  elementType: "input",
  inputType: "text",
  placeholder: "First Name",
  className: "form-input",
  id: "formInput",
  name: "first_name",
  shouldValidate: true,
});

myForm.createFormElement({
  elementType: "input",
  inputType: "text",
  placeholder: "Last Name",
  className: "form-input",
  id: "formInput",
  name: "last_name",
  shouldValidate: true,
});

myForm.createFormElement({
  elementType: "input",
  inputType: "email",
  placeholder: "Email Address",
  className: "form-input",
  id: "formInput",
  name: "email",
  shouldValidate: true,
});

myForm.createFormElement({
  elementType: "input",
  inputType: "tel",
  placeholder: "Phone Number",
  className: "form-input",
  id: "formInput",
  name: "phone",
  shouldValidate: true,
});

myForm.createFormElement({
  elementType: "input",
  inputType: "hidden",
  placeholder: "timestamp",
  className: "form-input",
  id: "formInput",
  name: "post_timestamp",
  value: new Date,
  shouldValidate: false,
});

myForm.createSubmit({
  text: "Submit",
  className: "cta",
  id: "formSubmit",
});

var buttonTest = document.querySelector("button");

buttonTest.addEventListener("click", function (event) {
  event.preventDefault();
  myForm.validate();
});
