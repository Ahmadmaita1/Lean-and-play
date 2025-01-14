document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.querySelector(".game-container");
  
    const cardValues = ["🍎", "🍌", "🍇", "🍓", "🍎", "🍌", "🍇", "🍓"];
    let shuffledCards = shuffle(cardValues);
  
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
  
    // Create and append cards
    shuffledCards.forEach(value => {
      const card = document.createElement("div");
      card.classList.add("card");
  
      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front"></div>
          <div class="card-back">${value}</div>
        </div>
      `;
  
      card.addEventListener("click", () => handleCardClick(card));
      gameContainer.appendChild(card);
    });
  
    function shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    }
  
    function handleCardClick(card) {
      if (lockBoard || card === firstCard || card.classList.contains("flip")) return;
  
      card.classList.add("flip");
  
      if (!firstCard) {
        firstCard = card;
      } else {
        secondCard = card;
        lockBoard = true;
  
        checkForMatch();
      }
    }
  
    function checkForMatch() {
      const isMatch = firstCard.innerHTML === secondCard.innerHTML;
  
      if (isMatch) {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
      } else {
        setTimeout(() => {
          firstCard.classList.remove("flip");
          secondCard.classList.remove("flip");
          firstCard = null;
          secondCard = null;
          lockBoard = false;
        }, 1000);
      }
    }
  });