const registerNameInput = document.querySelector('.r-name-input');
const registerEmailInput = document.querySelector('.r-email-input');
const registerPasswordInput = document.querySelector('.r-pass-input');
const signUpBtn = document.querySelector('.sign-up');

const nameAlert = document.querySelector('#nameAlert');
const emailAlert = document.querySelector('#emailAlert');
const passwordRules = document.querySelector('#passwordRules');

let usersList;

if (localStorage.getItem('users')) {
    usersList = JSON.parse(localStorage.getItem('users'));
} else {
    usersList = [];
}

function isValidName(name) {
    if (name === '') {
        nameAlert.innerHTML = 'Name is required';
        return false
    } else if (name.length <= 2) {
        nameAlert.innerHTML = 'must be more than 2 characters';
    } else {
        nameAlert.innerHTML = '';
        return true
    }
}

function isValidEmail(email) {
    let regex = /^(?!.*\.\.)[a-z0-9_.]+@[a-z0-9-]+\.[a-z]{2,6}(?:\.[a-z]{2,})?$/g;

    if (regex.test(email)) {
        for (let i = 0; i < usersList.length; i++) {
            if (email === usersList[i].email) {
                emailAlert.innerHTML = 'Email already exists';
                return false;
            }
        }
        emailAlert.innerHTML = '';
        return true;

    } else if (email === '') {
        emailAlert.innerHTML = 'Email is required';

    } else {
        emailAlert.innerHTML = 'Invalid Email';
        return false;
    }
}

function isValidPassword(password) {
    let regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/g;

    if (regex.test(password)) {
        passwordRules.classList.add('d-none');
        return true
    } else {
        passwordRules.classList.remove('d-none');
        return false
    }
}

function storeUserData() {

    let user = {
        name: registerNameInput.value,
        email: registerEmailInput.value,
        password: registerPasswordInput.value,
    }

    if (isValidEmail(user.email) & isValidPassword(user.password) & isValidName(user.name)) {
        usersList.push(user)
        localStorage.setItem('users', JSON.stringify(usersList))
        clearForm()

        swal("Account has been created successfuly", {
            icon: "success",
        }).then(() => {
            window.location.href = 'index.html'
        })
    }
}

function clearForm() {
    registerNameInput.value = '';
    registerEmailInput.value = '';
    registerPasswordInput.value = '';
}

signUpBtn.addEventListener('click', storeUserData);

const showPassword = document.querySelector('.show-password');

showPassword.addEventListener('click', function (e) {
    if (e.target.classList.contains('fa-eye')) {
            registerPasswordInput.type = 'text';
            showPassword.classList.remove('fa-eye');
            showPassword.classList.add('fa-eye-slash');
    } else {
        registerPasswordInput.type = 'password';
        showPassword.classList.add('fa-eye');
        showPassword.classList.remove('fa-eye-slash');
    }
})

registerPasswordInput.oninput = function () {
    if (registerPasswordInput.value && registerPasswordInput.type == 'password') {
        showPassword.classList.add('fa-eye')
    } else if (registerPasswordInput.value && registerPasswordInput.type == 'text') {
        showPassword.classList.add('fa-eye-slash')
        showPassword.classList.remove('fa-eye')
    } else {
        showPassword.classList.remove('fa-eye')
        showPassword.classList.remove('fa-eye-slash')
    }
}