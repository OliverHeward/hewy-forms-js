# [WIP] Forms.js - v0.5 

## Breakdown

This Form library is currently WIP.


## Upcoming Version Notes: 0.5 > 1.0
* Arrays to be passable to creation elements arguments

  * Potential creation of `PromiseForm()` to batch send `POST` requests from an array.

  * `Form()`, `createFormElement()` and `createSubmit()` will take the ability to handle arrays for `id` and `className`.

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
| Key[Attribute]      | Value |
| ------------------- | -----------  |
| type                | `@{string}` - text / email / tel / checkbox      |
| placeholder         | `@{string}` - "First Name" |
| class               | `@{string}` `@[array]` - "form-input" ["form-input", "half-width"] |
| id                  | `@{string}` `@[array]` - "formInput" ["formInput", "firstName"] |
| name                | `@{string}` "first_name" |
| required            | `@{boolean}` true / false |
## Creating Input Fields

Attached to the Form, is a prototype set up using `.createInputElement`.

`.createInputElement` takes in an object with matching HTML attribute names with key values. Giving more flexibility to pass more attributes to given inputs.

In this example, we are creating a `First Name` and `Phone` input fields.

```javascript
form.createInputElement({
  type: "text", // defines input type - will omit text if not assigned
  placeholder: "First Name", // defines placeholder text
  className: "form-input", // custom className
  id: "formInput", // custom ID
  name: "first_name", // defines name for $_POST
  shouldValidate: true, // defines whether this element requires Validation
});
```

## Creating the Submit Button

Unlike creating input fields, the submit button has its own prototype assigned to `Form`. 

You can create a form submit button by calling the `.createSubmit()` function on your form, and passing `onclick: form.validate` to invoke the validation function prior to the form submitting.

```javascript
form.createSubmit({
  text: "Submit", // defines Text to sit within the Button
  className: "cta", // custom className
  id: "formSubmit", // custom ID
  onclick: form.validate // points the validation function
});
```


## How `.validate()` works

The `.validate()` prototype for `Form()` iterates over each input field and checks for `value` and whether or not the input `shouldValidate` before passing.

Once each input field has been looped over and there are no errors, the form handles it's own submission using the `.submit()` method assigned to `Form()`.

The submission is handled by the properties that were passed to `new Form()` upon creation of our Form. `.submit()` is passed a `boolean` value of `true` or `false` from `.validate()`. Once `.validate()` passes the value to `.submit()`, it takes `path` and `crossOrigin` to then begin the `fetch()` request. 


