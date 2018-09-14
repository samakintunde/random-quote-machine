// $(document).ready(function() {
// let swatch = [
//     '#FFAAAA',
//     '#550000',
//     '#9974AA',
//     '#280339',
//     '#FFDEAA',
//     '#553400',
//     '#827FB2',
//     '#0B083B',
//     '#9ED78F',
//     '#0F4800',
//     '#748BA7',
//     '#FFAEAC',
//     '#4D0200',
//     '#FF4900',
//     '#040100',
//     '#0E54B4',
//     '#B6D4FE',
//     '#E5004D',
//     '#FFAFCA',
//     '#CCF8E6',
//     '#004E2F',
//     '#FFCCB6',
//     '#531E07',
//     '#D7A9B4',
//     '#42111D'
// ];

window.addEventListener("DOMContentLoaded", getQuote);
const getQuoteBtn = document.getElementById("get-quote");
const copyQuoteBtn = document.getElementById("copy-quote");
const contentArea = document.getElementById("content");
const authorArea = document.getElementById("author");
let category;

// GET Quote using the Fetch API
function getQuote() {
  const URL = "https://talaikis.com/api/quotes/random/";

  fetch(URL)
    .then(res => {
      return res.json();
    })
    .then(data => {
      contentArea.innerText = `"${data.quote}"`;
      authorArea.innerText = `${data.author}`;
      category = data.cat;
    });
}

getQuoteBtn.addEventListener("click", () => {
  getQuote();
});

// Copying to clipboard
copyQuoteBtn.addEventListener("click", () => {
  // Check if the new CLipboard API is supported. If not, use document.execCommand()
  if (!navigator.clipboard) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(contentArea);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      document.execCommand("copy");
      selection.removeAllRanges();
      // Display a success icon
      setTimeout(() => {
        copyQuoteBtn.innerHTML =
          '<i class="fas fa-check" style="background-color:green"></i>';
      }, 1500);
    } catch (e) {
      // Display an error icon
      setTimeout(() => {
        copyQuoteBtn.innerHTML =
          '<i class="fas fa-exclamation-circle" style="background-color:red"></i>';
      }, 1500);
    }
  }

  //   Check that the quote isn't empty and remove whitespaces
  let copiedQuote = contentArea.innerText.trim();
  if (!copiedQuote) return;

  //   Use the new CLipboard API for browsers that support it
  navigator.clipboard
    .writeText(copiedQuote)
    .then(() => {
      // Display a success icon and remove after some time
      copyQuoteBtn.innerHTML =
        '<i class="fas fa-check" style="background-color:green"></i>';
      setTimeout(() => {
        copyQuoteBtn.innerHTML = '<i class="fas fa-clipboard"></i>';
      }, 1500);
    })
    .catch(err => {
      setTimeout(() => {
        //   Display an error icon
        copyQuoteBtn.innerHTML =
          '<i class="fas fa-exclamation-circle" style="background-color:red"></i>';
        copyQuoteBtn.innerHTML = '<i class="fas fa-clipboard"></i>';
      }, 1500);
    });
});

// Tweet the quote
const tweetBtn = document.getElementById("tweet-quote");
let quote = encodeURIComponent(contentArea.innerText.trim());

tweetBtn.addEventListener("click", e => {
  e.preventDefault();
  if (contentArea.innerText) {
    let win = window.open(
      `https://twitter.com/intent/tweet?hashtags=quotes,${category}&related=freecodecamp&url=${
        location.href
      }&text=${contentArea.innerText.trim()}%20by%20${authorArea.innerText.trim()}`,
      "Share on Twitter",
      `resizable,scroll,width=400,height=600`
    );
    win.opener = null;
  }
});
