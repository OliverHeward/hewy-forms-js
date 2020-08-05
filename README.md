# [WIP] Forms.js - v0.5 

## Breakdown

This Form library is currently WIP.


## Upcoming Version Notes: 0.5 > 1.0
* Arrays to be passable to creation elements arguments

  * Potential creation of `PromiseForm()` to batch send `POST` requests from an array.

  * `Form()`, `createFormElement()` and `createSubmit()` will take the ability to handle arrays for `class`.

* Generation ability of all inputs, excluding Image/File.

  * Complete with error handling, validation and submission.

* Bot Honeypot input to deter scripted submissions.


## Declaring a new Form

To create a new Form, declare `new Form()` and assign to a variable.

```javascript
var form = new Form();
```

## Form Attributes

Currently, the Form takes in 4 possible arguments as detailed below.

`path` - States where the form should be submitted to.

`id` - Custom ID for the Form.

`className` - Custom classname for the Form.

`crossOrigin` - States the CORS Policy method, set to either `true` or `false`

When declaring a new Form, your structure should look similar to this.

```javascript
var form = new Form({
  path: "./submit.php",
  id: "myForm",
  className: "create-form",
  crossOrigin: false,
});
```

## Creation - Using the .create() method.

Once you have set up the Form Attributes, you will need to assign the Form to the page/component of your choice.

In this example we will use the `body`

```javascript
var body = document.querySelector("body");
body.appendChild(form.create());
```

## How Creating Elements Work.

When creating a given element for the form, an object is passed to the function, giving it `key`, `value` pairs to then be used upon creation of the element.

### Key / Value pairing examples.
| Key[Attribute] | Input Type                       | Value                                                              |
| -------------- | -------------------------------- | ------------------------------------------------------------------ |
| type           | all                              | `@{string}` - text, email, tel, checkbox                           |
| placeholder    | password, search, tel, text url, | `@{string}` - "First Name"                                         |
| class          | all                              | `@{string}` `@[array]` - "form-input" ["form-input", "half-width"] |
| id             | all                              | `@{string}` `@[array]` - "formInput" ["formInput", "firstName"]    |
| name           | all                              | `@{string}` - "first_name"                                         |
| required       | almost all                       | `@{boolean}` - true, false                                         |
| autocomplete   | all                              | `@{boolean}` - true, false                                         |
| max            | numeric types                    | `@{integer}` - 10                                                  |
| maxlength      | password, search, tel, text, url | `@{integer}` - 22                                                  |
| min            | numeric types                    | `@{integer}` - 2                                                   |
| minlength      | password, search, tel, text, url | `@{integer}` - 3                                                   |


# Creating Form Elements

## Creating Input Elements
Attached to the Form, is a prototype defined as `.createInputElement`.

`.createInputElement` takes in an object with matching HTML attribute names with key values. Giving more flexibility to pass more attributes to given inputs.

In this example, we are creating a `First Name` and `Checkbox` input fields.

```javascript
form.createInputElement({
  type: "text", // defines input type 
  placeholder: "First Name", // defines placeholder text
  class: "form-input", // custom className
  id: "formInput", // custom ID
  name: "first_name", // defines name for $_POST
  required: true, // defines whether this element requires Validation
  autocomplete: true, // allow for autocomplete 
});

form.createInputElement({
  type: "checkbox", // defines input type
  placeholder:
    "By submitting this form you agree to the processing of your data.", // defines text to appear alongside checkbox
  class: ["form-checkbox", "terms"], // note the use of array class here
  id: "formCheckbox", // note the use of array ID here 
  name: "terms", // defines name for $_POST
  required: true, // defines whether this element requires Validation
})
```

## Creating Select Elements
Attached to the Form, is a prototype defined as `.createSelectElement`.

`.createSelectElement` also takes in an object with matching HTML attribute names with Key/Values pairs. Although this function also takes in a nested object - `option: {}` 

`option: {}` is a nested object to be able to set a `placeholder` for the select when unselected, and the `options` array is used for listing all avaliable options for the given select.

```javascript
form.createSelectElement({
  class: "form-select", // defines class
  id: "formSelect", // defines ID
  option: {
    placeholder: "Select a car...", // placeholder for unselected select
    options: ["Volvo", "Saab", "Fiat", "Audi"], // array of options for the select
  },
  name: "car_choice", // defines name for $_POST
  required: true, // defines whether this element requires Validation
});
```

## Creating Textarea Elements
Attached to the Form, is a prototype defines as `.createTextArea`.

`.createTextArea` also takes in an object with matching HTML attribute names with Key/Value pairs. Although this function also takes in two nested objects of `title: {}` and `copy: {}`.

`title: {}` is a nested object used for setting a custom title for the textarea, once set it will create a `<h2></h2>` element and also allows for all Key/Value types of HTML attributes for its tag.

`copy: {}` is a nested object used for setting a custom sub title or "copy", once set it will create a `<p></p>` element and also allows for all Key/Value types of HTML attributes for its tag.

To set the text for both `title: {}` and `copy: {}`, use the `value` key. Below is examples of 3 different Text Areas for reference.

```javascript
// Simple Textarea
myForm.createTextArea({
    class: "my-textarea",
    id: "textArea",
    placeholder: "Leave us a message...",
    name: "message",
  });

// Textarea with "copy"
myForm.createTextArea({
  class: "my-textarea",
  id: "textArea",
  placeholder: "Leave us a message...",
  name: "message",
  copy: {
    class: "text-area-copy",
    id: "textAreaCopy",
    value: "Why not tell us more about your experience with us?",
  },
});

// Complete Textarea
myForm.createTextArea({
  class: "my-textarea",
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
```

## Creating the Submit Button
Attached to the Form, is a prototype defines as `.createSubmit`.

`.createSubmit` also takes in an object with matching HTML attribute names with Key/Value pairs. This function does not take in any additional nested objects.

```javascript
form.createSubmit({
  text: "Submit", // defines Text to sit within the Button
  type: "submit", // points the validation function
  class: "cta", // custom className
  id: "formSubmit", // custom ID
});
```

## How `.validate()` works

The `.validate()` prototype for `Form()` iterates over each input field and checks for `value` and whether or not the input `shouldValidate` before passing.

Once each input field has been looped over and there are no errors, the form handles it's own submission using the `.submit()` method assigned to `Form()`.

The submission is handled by the properties that were passed to `new Form()` upon creation of our Form. `.submit()` is passed a `boolean` value of `true` or `false` from `.validate()`. Once `.validate()` passes the value to `.submit()`, it takes `path` and `crossOrigin` to then begin the `fetch()` request. 


