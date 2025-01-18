const searchbtn = document.getElementById("searchbtn");
const searchinput = document.getElementById("searchinput");
const wordOfTheDayBtn = document.getElementById("wordOfTheDayBtn");
const definitionContainer = document.querySelector(".definition-container");
const wordheading = document.getElementById("wordheading");
const definition = document.getElementById("definition");
const exampleContainer = document.getElementById("example");
const readMoreBtn = document.getElementById("readMoreBtn");

const dictionary = async (word) => {
  try {
    const data = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const jsonData = await data.json();

    console.log(jsonData); // Debugging

    // Clear the previous results
    wordheading.textContent = `Word: ${jsonData[0].word}`;

    // Update the definition container
    definition.innerHTML = `
      <p><strong>Type:</strong> ${jsonData[0].meanings[0].partOfSpeech}</p>
      <p><strong>Meaning:</strong> ${jsonData[0].meanings[0].definitions[0].definition}</p>
    `;

    // Update the example container
    exampleContainer.textContent =
      jsonData[0].meanings[0].definitions[0].example ||
      "Example not available.";

    if (jsonData[0].sourceUrls && jsonData[0].sourceUrls.length > 0) {
      readMoreBtn.style.display = "inline-block";
      readMoreBtn.innerHTML = `Read More`;
      readMoreBtn.onclick = () => {
        window.open(jsonData[0].sourceUrls[0], "_blank"); // Open the URL in a new tab
      };
    } else {
      readMoreBtn.style.display = "none";
    }
  } catch (error) {
    console.error("Error:", error);

    // Handle errors (e.g., word not found)
    wordheading.textContent = "Word Not Found";
    definition.innerHTML =
      "<p>Sorry, we couldn't find a definition for the word you searched for.</p>";
    exampleContainer.textContent = "";
    readMoreBtn.style.display = "none";
  }
};

// Trigger on search button click
searchbtn.addEventListener("click", (e) => {
  e.preventDefault();
  dictionary(searchinput.value);
});

const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  definitionContainer.classList.toggle("dark-mode");
  definition.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
});

// Apply dark mode preference on page load
window.onload = () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
  fetchWordOfTheDay();
};

const fetchWordOfTheDay = () => {
  const wordList = ["perseverance", "ephemeral", "simplicity", "effervescence"];
  const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  dictionary(randomWord);
};

// Fetch Word of the Day on page load
wordOfTheDayBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetchWordOfTheDay();
});

const currentYear = document.getElementById("currentYear");
currentYear.textContent = new Data().getFullYear();
