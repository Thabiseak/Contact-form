const form = document.getElementById('form');
const name = document.getElementById('name');
const address = document.getElementById('address');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const message = document.getElementById('message');

//add function to contactus button

document.getElementById('openModal').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'block';
});

//add function to closemark
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
};
//add function to send button
form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});
 //define the validation massage
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(email).toLowerCase());
};

const isValidPhone = phone => {
    const phoneRegex = /^\+94\d{9}$/;
    return phoneRegex.test(phone);
};
// set the input values validation
const validateInputs = () => {
    const nameValue = name.value.trim();
    const addressValue = address.value.trim();
    const phoneValue = phone.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    let isValid = true;

    if(nameValue === '') {
        setError(name, 'Name is required');
        isValid = false;
    } else {
        setSuccess(name);
    }

    if(addressValue === '') {
        setError(address, 'Address is required');
        isValid = false;
    } else {
        setSuccess(address);
    }

    if(phoneValue === '') {
        setError(phone, 'invalid phone number, it should start with +94 and be followed by exactly 9 digits (+94xxxxxxxxx)');
        isValid = false;
    } else if (!isValidPhone(phoneValue)) {
        setError(phone, 'invalid phone number, it should start with +94 and be followed by exactly 9 digits (+94xxxxxxxxx)');
        isValid = false;
    } else {
        setSuccess(phone);
    }

    if(emailValue === '') {
        setError(email, 'invalid Email');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'invalid Email');
        isValid = false;
    } else {
        setSuccess(email);
    }

    if(messageValue === '') {
        setError(message, 'Message must be at least 10 characters long');
        isValid = false;
    } else if (messageValue.length < 10) {
        setError(message, 'Message must be at least 10 characters long');
        isValid = false;
    } else {
        setSuccess(message);
    }
         // set the input validation is correct then store to local storage and show the thepopup alart message
         if (isValid) {
        const contactData = {
            name: nameValue,
            address: addressValue,
            phone: phoneValue,
            email: emailValue,
            message: messageValue
        };
       
        localStorage.setItem('contactData', JSON.stringify(contactData));
        alert('Contact data submitted successfully!');
        document.getElementById('modal').style.display = 'none';
        form.reset()
    }
};