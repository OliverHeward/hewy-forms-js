/*
 *
 *
 * JavaScript Form Creation and Validation Library
 *
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
    console.log('[isValid]',isValid);
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
      console.log("form was not valid");
    }
  }
}

Form.prototype.createInputElement = function (args) {
  let createInput;
  let form = document.querySelector("form");
  createInput = document.createElement("INPUT");
  let type = args.type;
  switch (type) {
    case "checkbox":
      let container = document.createElement("DIV");
      createLabel = document.createElement("LABEL");
      container.appendChild(createInput);
      container.appendChild(createLabel);
      for(const[key, value] of Object.entries(args)) {
          createInput.setAttribute(key, value);
          if(key === "placeholder") {
            createLabel.innerText = value;
          }
      }
      form.appendChild(container);
      break;
    default:
      for(const[key, value] of Object.entries(args)) {
          createInput.setAttribute(key, value);
      }
      form.appendChild(createInput);
      break;
  }
};

Form.prototype.createSelectElement = function(args) {
  let select = document.createElement("SELECT");

  // Iterate over args object to assign attr-value pairs
  for(const[key, value] of Object.entries(args)) {
    select.setAttribute(key, value);
    // When iteration reaches options, map over the array and create "option" elements
    if(key === "option") {
      let placeholder = document.createElement("OPTION");
      placeholder.value = null;
      placeholder.innerText = args.option.placeholder;
      select.appendChild(placeholder);
      args.option.options.map(function(choice) {
        let option = document.createElement("OPTION");
        option.value = choice;
        option.innerText = choice;
        select.appendChild(option);
      });
    }
  }

  form.appendChild(select);
}

Form.prototype.createTextArea = function(args) {
  let textContainer = document.createElement("DIV");
  let heading = document.createElement("H2");
  let sub_copy = document.createElement("P");
  let textArea = document.createElement("TEXTAREA");
  textContainer.appendChild(textArea);

  Object.keys(args).forEach(function(key, index) {
    if(key === "title") {
      for(const[k, v] of Object.entries(args[key])) {
        if(k === "value") {
          heading.innerText = v;
        } else {
          heading.setAttribute(k, v);
        }
      }
      textContainer.insertBefore(heading, textArea);
    } else if (key === "copy") {
      for(const[k, v] of Object.entries(args[key])) {
        if(k === "value") {
          sub_copy.innerText = v;
        } else {
          sub_copy.setAttribute(k, v);
        }
      }
      textContainer.insertBefore(sub_copy, textArea);
    } else {
      textArea.setAttribute(key, args[key]);
    }
  })

  form.appendChild(textContainer);
}


Form.prototype.createSubmit = function (args) {
  let button = document.createElement("BUTTON");
  for(const[key, value] of Object.entries(args)) {
    button.setAttribute(key, value);
    if (key === "text") {
      button.innerText = value;
    }
  }
  button.className = "form-submit-cta";
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
    }
  }
  let textarea = document.querySelectorAll("textarea");
  for(var t = 0; t < textarea.length; t++) {
    if(textarea[t].required && textarea[t].value !== "") {
    } else if (!textarea[t].required) {
      textarea[t].classList.remove("error"); 
    } else {
      error = parseInt(error + 1);
      textarea[t].classList.add("error");
    }
  }

  let selects = document.querySelectorAll("select");
  for(var s = 0; s < selects.length; s++) {
    
  }

  if (error === 0) {
    let isValid = true;
    console.log("passed validation");
    return myForm.submit(isValid);
  }
};