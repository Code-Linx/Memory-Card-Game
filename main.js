document.addEventListener("DOMContentLoaded", function () {
  const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const allCards = [...cardValues, ...cardValues];
  let shuffledCards = shuffleArray(allCards);
  let flippedCards = [];
  let matchedPairs = 0;

  const gameContainer = document.getElementById("game-container");
  const helpButton = document.getElementById("helpButton");
  const helpModal = document.getElementById("helpModal");
  const closeHelp = document.querySelector(".close");

  helpButton.addEventListener("click", function () {
    helpModal.style.display = "block";
  });

  closeHelp.addEventListener("click", function () {
    helpModal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === helpModal) {
      helpModal.style.display = "none";
    }
  });

  // Dynamically create cards
  shuffledCards.forEach((value, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;
    card.addEventListener("click", flipCard);
    gameContainer.appendChild(card);
  });

  function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
      this.classList.add("flipped");
      flippedCards.push(this);

      if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
      }
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;
    const value1 = card1.dataset.value;
    const value2 = card2.dataset.value;

    if (value1 === value2) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      matchedPairs++;

      if (matchedPairs === cardValues.length) {
        alert("Congratulations! You matched all pairs!");
        resetGame();
      }
    } else {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
    }

    flippedCards = [];
  }

  function resetGame() {
    shuffledCards = shuffleArray(allCards);
    matchedPairs = 0;
    flippedCards = [];

    gameContainer.innerHTML = "";

    shuffledCards.forEach((value, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.value = value;
      card.addEventListener("click", flipCard);
      gameContainer.appendChild(card);
    });
  }

  function shuffleArray(array) {
    return array.slice().sort(() => Math.random() - 0.5);
  }
});
