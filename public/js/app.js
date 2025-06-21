console.log("Client side JS Loaded");
// fetch("https://puzzle.mead.io/puzzle").then((response) => {
//   response
//     .json()
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.log("Error:", error);
//     });
// });
// fetch("http://localhost:3000/weather?address=Los%20Angeles").then(
//   (response) => {
//     response
//       .json()
//       .then((data) => {
//         if (data.error) {
//           return console.log(data.error);
//         }
//         console.log(data);
//       })
//       .catch((error) => {
//         console.log("Error:", error);
//       });
//   }
// );
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#weather-message");
const messageTwo = document.querySelector("#weather-details");
const errorMessage = document.querySelector("#weather-error");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  errorMessage.textContent = "";
  fetch(`/weather?address=${location}`).then((response) => {
    response
      .json()
      .then((data) => {
        if (data.error) {
          messageOne.textContent = "";
          messageTwo.textContent = "";
          errorMessage.textContent = data.error;
          return console.log(data.error);
        }
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      })
      .catch((error) => {
        messageOne.textContent = "";
        messageTwo.textContent = "";
        errorMessage.textContent = "Unable to fetch weather data.";
        console.log("Error:", error);
      });
  });
});
