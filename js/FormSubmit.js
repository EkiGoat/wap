
function FormSubmit(url, data) {
    //helper function to create the form
    function createForm() {
        var submitForm = document.createElement("FORM");
        document.body.appendChild(submitForm);
        submitForm.method = "POST";
        return submitForm;
    }

    //helper function to add elements to the form
    function createFormElement(form, name, value) {
        var element = document.createElement("input");
        element.setAttribute("name", name);
        element.setAttribute("type", "hidden");
        element.setAttribute("value", value);
        form.appendChild(element);
        return element;
    }

    var submitForm = createForm();
    createFormElement(submitForm, "data", JSON.stringify(data));
    submitForm.action = url;
    submitForm.submit();
}