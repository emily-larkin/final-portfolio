// /* eslint-disable indent */
// $(document).ready(function () {

//     $('select').formSelect();

//     $('#register-btn').on('click', function () {
//         event.preventDefault();
//         var firstName = $('#first-name').val().trim();
//         var lastName = $('#last-name').val().trim();
//         var email = $('#email').val().trim();
//         var password = $('#password').val().trim();
//         var passwordCheck = $('#password-again').val().trim();

//         if (firstName.length === 0 || lastName.length === 0 || email.length === 0 || password.length === 0) {

//             alert('all fields must be filled out');

//         } else if (password !== passwordCheck) {

//             alert('Passwords do not match.');

//         } else {
//             console.log('firstName: ' + firstName);
//             console.log('lastName: ' + lastName);
//             console.log('email: ' + email);
//             console.log('password: ' + password);

//             var newUser = {
//                 // eslint-disable-next-line camelcase
//                 first_name: firstName,
//                 // eslint-disable-next-line camelcase
//                 last_name: lastName,
//                 email: email,
//                 password: password
//             };
//             console.log(newUser);

//             $.ajax('/api/users', {
//                 method: 'POST',
//                 data: newUser
//             }).then(
//                 function () {
//                     console.log('created new user');
//                     // function (event) { return true };
//                     window.location.href = '/';
//                 }
//             );

//         }
//     });
// });