var startButton = document.querySelector(".start");
var mainFirst = document.querySelector(".main-1");
var mainSecond = document.querySelector(".main-2");
var mainThird = document.querySelector(".main-3");
var characters = document.querySelectorAll(".character");
var belowDiv = document.querySelector(`.below-div`);
var below = document.querySelectorAll(".below");
var enemyDiv = document.querySelector(".enemy-div")
var chooseDiv = document.querySelector(".choose-div");
var info = document.querySelectorAll(".info");
var h2 = document.querySelector("h2");
var fightButton = document.querySelector(".fight");
var beatButton = document.querySelector(".beat");
var heroSection = document.querySelector(".hero-section");
var enemySection = document.querySelector(".enemy-section");
var heroBelow = document.querySelector(".hero-below");
var enemyBelow = document.querySelector(".enemy-below");
var result = document.querySelector(".result");
var tryButton = document.querySelector(".try-again");
var x = window.matchMedia("(max-width: 1050px)");
var heroValue = true;
var heroPower = 0;
var enemyPower = 0;
var heroHealth = 0;
var enemyHealth = 0;
var heroName = "";
var enemyName = "";
startButton.onclick = function () {
  mainFirst.style.display = "none";
  mainSecond.style.display = "block";
  for (let i = 0; i < characters.length; i++) {
    characters[i].onclick = function () {
      if (heroValue == true) {
        below[0].append(characters[i]);
        heroPower += parseInt(this.dataset.power);
        heroHealth += parseInt(this.dataset.health);
        heroName += this.dataset.name;
        heroValue = false;
        h2.innerText = "Choose Player 2";
        info[0].innerHTML = `Name:   ${this.dataset.name} <br> <br>
                                     Power:  ${this.dataset.power} <br> <br>
                                     Health: ${this.dataset.health}`;
      } else if (heroValue == false) {
        below[1].append(characters[i]);
        enemyPower += parseInt(this.dataset.power);
        enemyHealth += parseInt(this.dataset.health);
        enemyName += this.dataset.name;
        heroValue = "done";
        h2.style.visibility = "hidden";
        chooseDiv.style.visibility = "hidden";
        if (x.matches) {
          belowDiv.style.height = "100%"
          h2.style.display = "none";
          chooseDiv.style.display = "none";
          enemyDiv.style.display = "flex"
          fightButton.style.display = "flex"
        }
        info[1].innerHTML = `Name:   ${this.dataset.name} <br> <br>
                                     Power:  ${this.dataset.power} <br> <br>
                                     Health: ${this.dataset.health}`;
      } 
      fightButton.onclick = function () {
        mainFirst.style.display = "none";
        mainSecond.style.display = "none";
        mainThird.style.display = "block";

        heroSection.append(below[0]);
        enemySection.append(below[1]);
      };
      beatButton.onclick = function () {
        beatButton.style.display = "none";
        var x = setInterval(() => {
          var enemyDamage = Math.floor(Math.random() * enemyPower);
          var heroDamage = Math.floor(Math.random() * heroPower);
          heroHealth -= enemyDamage;
          enemyHealth -= heroDamage;
          info[0].innerHTML = `Name:   ${heroName} <br> <br>
                                     Power:  ${heroPower} <br> <br>
                                     Health: ${heroHealth}`;
          info[1].innerHTML = `Name:   ${enemyName} <br> <br>
                                     Power:  ${enemyPower} <br> <br>
                                     Health: ${enemyHealth}`;
          heroBelow.style.width = `${heroHealth}px`;
          enemyBelow.style.width = `${enemyHealth}px`;
          if (heroHealth <= 0) {
            heroBelow.style.display = "none";
          } else if (enemyHealth <= 0) {
            enemyBelow.style.display = "none";
          }
          setTimeout(() => {
            if (heroHealth <= 0 || enemyHealth <= 0) {
              heroSection.style.display = "none";
              enemySection.style.display = "none";
              beatButton.style.display = "none";
              clearInterval(x);
              if (heroHealth > enemyHealth) {
                result.innerText = `${heroName} won`;
                result.style.display = "block";
              } else if (enemyHealth > heroHealth) {
                result.innerText = `${enemyName} won`;
                result.style.display = "block";
              }
            }
          }, 2000);
        }, 3000);
      };
    };
  }
};
