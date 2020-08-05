/*
 * JavaScript Form complete with Validation & Submission
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
    if (isValid) {
      fetch(this.path, {
        method: "POST",
        body: new FormData(document.querySelector("form.hewy-form")),
        crossOrigin: this.crossOrigin,
      })
        .then(function (response) {
          return response.text();
        })
        .then(function (html) {
          // Clean up Form
          let inputs = Array.from(document.querySelectorAll("input"));
          let textareas = Array.from(document.querySelectorAll("textarea"));
          let selects = Array.from(document.querySelectorAll("select"));
          let checkboxes = Array.from(
            document.querySelectorAll('input[type="checkbox"]')
          );

          inputs.map(function (input) {
            input.value = "";
          });

          textareas.map(function (textarea) {
            textarea.value = "";
          });

          selects.map(function (select) {
            select.selectedIndex = 0;
          });

          checkboxes.map(function (checkbox) {
            checkbox.checked = false;
          });
          return console.log(html);
        });
    } else {
      alert("some of the fields have returned invalid.");
      // console.log("form was not valid");
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
      for (const [key, value] of Object.entries(args)) {
        if (key === "placeholder") {
          createLabel.innerText = value;
        } else if (
          key === "class" &&
          value.constructor.name === "Array"
        ) {
          for (var c = 0; c < value.length; c++) {
            createInput.classList.add(value[c]);
          }
        } else {
          createInput.setAttribute(key, value);
        }
      }
      form.appendChild(container);
      break;
    default:
      for (const [key, value] of Object.entries(args)) {
        if (key === "class" && value.constructor.name === "Array") {
          for (var c = 0; c < value.length; c++) {
            createInput.classList.add(value[c]);
          }
        } else {
          createInput.setAttribute(key, value);
        }
      }
      form.appendChild(createInput);
      break;
  }
};

Form.prototype.createSelectElement = function (args) {
  let select = document.createElement("SELECT");

  // Iterate over args object to assign attr-value pairs
  for (const [key, value] of Object.entries(args)) {
    // When iteration reaches options, map over the array and create "option" elements
    if (key === "option") {
      let placeholder = document.createElement("OPTION");
      placeholder.value = null;
      placeholder.innerText = args.option.placeholder;
      select.appendChild(placeholder);
      args.option.options.map(function (choice) {
        let option = document.createElement("OPTION");
        option.value = choice;
        option.innerText = choice;
        select.appendChild(option);
      });
    } else if (key === "class" && value.constructor.name === "Array") {
      for (var c = 0; c < value.length; c++) {
        if (key === "class") {
          select.classList.add(value[c]);
        }
      }
    } else {
      select.setAttribute(key, value);
    }
  }

  form.appendChild(select);
};

Form.prototype.createTextArea = function (args) {
  let textContainer = document.createElement("DIV");
  let heading = document.createElement("H2");
  let sub_copy = document.createElement("P");
  let textArea = document.createElement("TEXTAREA");
  textContainer.appendChild(textArea);

  for (const [key, value] of Object.entries(args)) {
    switch (key) {
      case "title":
        for (const [k, v] of Object.entries(args[key])) {
          if (k === "value") {
            heading.innerText = v;
          } else {
            heading.setAttribute(k, v);
          }
        }
        textContainer.insertBefore(heading, textArea);
        break;
      case "copy":
        for (const [k, v] of Object.entries(args[key])) {
          if (k === "value") {
            sub_copy.innerText = v;
          } else {
            sub_copy.setAttribute(k, v);
          }
        }
        textContainer.insertBefore(sub_copy, textArea);
        break;
      case "class":
        if (value.constructor.name === "Array") {
          for (var c = 0; c < value.length; c++) {
            textArea.classList.add(value[c]);
          }
        } else {
          textArea.classList.add(value);
        }
        break;
      default:
        textArea.setAttribute(key, args[key]);
    }
  }
  form.appendChild(textContainer);
};

Form.prototype.createSubmit = function (args) {
  let button = document.createElement("BUTTON");
  for (const [key, value] of Object.entries(args)) {
    button.setAttribute(key, value);
    if (key === "text") {
      button.innerText = value;
    }
  }
  button.classList.add("form-submit-cta");
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
      case "checkbox":
        if (inputs[i].required && inputs[i].checked) {
          inputs[i].classList.remove("error");
        } else if (!inputs.required) {
          inputs[i].classList.remove("error");
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
  for (var t = 0; t < textarea.length; t++) {
    if (textarea[t].required && textarea[t].value !== "") {
      textarea[t].classList.remove("error");
    } else if (!textarea[t].required) {
      textarea[t].classList.remove("error");
    } else {
      error = parseInt(error + 1);
      textarea[t].classList.add("error");
    }
  }

  let selects = document.querySelectorAll("select");
  for (var s = 0; s < selects.length; s++) {
    if (selects[s].required && selects[s].selectedIndex !== 0) {
      selects[s].classList.remove("error");
    } else if (!selects[s].required) {
      selects[s].classList.remove("error");
    } else {
      error = parseInt(error + 1);
      selects[s].classList.add("error");
    }
  }

  if (error === 0) {
    let isValid = true;
    console.log("passed validation");
    return myForm.submit(isValid);
  }
};
