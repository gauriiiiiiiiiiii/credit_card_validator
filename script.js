const ccNumberInput = document.getElementById("ccNumber");
const validateBtn = document.getElementById("validateBtn");
const resultDiv = document.getElementById("result");
const errorDiv = document.getElementById("error");

function isNumberString(s) {
    return /^\d+$/.test(s);
}

function luhnValidate(number) {
    if (!number) {
        return { valid: false, error: "Please enter a credit card number." };
    }
    if (!isNumberString(number)) {
        return { valid: false, error: "Invalid input. Please enter only numbers." };
    }

    let len = number.length;
    let doubleEvenSum = 0;

    for (let i = len - 2; i >= 0; i = i - 2) {
        let digit = parseInt(number[i]);
        let dbl = digit * 2;
        if (dbl > 9) {
            dbl = (dbl / 10) + (dbl % 10);
        }
        doubleEvenSum += dbl;
    }

    for (let i = len - 1; i >= 0; i = i - 2) {
        let digit = parseInt(number[i]);
        doubleEvenSum += digit;
    }

    const isValid = doubleEvenSum % 10 === 0;
    return { valid: isValid, error: isValid ? "" : "Invalid credit card number." };
}

function showPopup(type, title, content) {
    const popupDiv = document.createElement('div');
    popupDiv.className = `popup ${type}`;
    popupDiv.innerHTML = `<h2 class="popup-title">${title}</h2><p class="popup-content">${content}</p>`;
    document.body.appendChild(popupDiv);
    setTimeout(() => {
        popupDiv.classList.add('show');
        setTimeout(() => {
            popupDiv.remove();
        }, 3000);
    }, 10);
}

validateBtn.addEventListener("click", () => {
    const ccNumber = ccNumberInput.value.trim();
    validateBtn.classList.add('processing');

    // Simulate server-side validation with a delay
    setTimeout(() => {
        const validationResult = luhnValidate(ccNumber); // Use the luhnValidate function
        validateBtn.classList.remove('processing');
        errorDiv.classList.add("hidden");
        resultDiv.classList.add("hidden");
        ccNumberInput.classList.remove("input-error", "input-success");

        if (!validationResult.valid) {
            showPopup('error', 'Error', validationResult.error);
            ccNumberInput.classList.add("input-error");
        } else {
            showPopup('success', 'Success', "Valid Credit Card Number!");
            ccNumberInput.classList.add("input-success");
        }
        ccNumberInput.value = '';
        ccNumberInput.placeholder = "Enter Credit Card Number";
    }, 1500);
});

ccNumberInput.addEventListener('focus', () => {
    ccNumberInput.placeholder = '';
});

ccNumberInput.addEventListener('blur', () => {
    if (!ccNumberInput.value.trim()) {
        ccNumberInput.placeholder = 'Enter Credit Card Number';
    }
});