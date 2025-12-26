/* Colorize the website title */
const rainbowColor = () => {
  const getColor = (inIndex, inRange) => {
    return Math.trunc(inIndex / inRange);
  };

  const colorize = (inElement) => {
    if(inElement) {
      const wordArr = inElement.textContent.split("");
      inElement.textContent = "";
      const range = Math.round(wordArr.length / 6);
      for(let index in wordArr) {
        const span = document.createElement('span');
        span.textContent = wordArr[Number(index)];
        const color = getColor(Number(index), range);
        span.style.setProperty('--hue', 60 * color);
        inElement.append(span);
      }
    }
  };

  const nameElements = document.querySelectorAll('[data-type="name"]');
  for(const nameElement of nameElements) {
    colorize(nameElement);
  }
};

/* Count up the remaining funds */
const countUp = () => {
  const funds = document.querySelectorAll('.funds');
  // Main function
  for(let fundElement of funds) {
    const animateRemainingFunds = () => {
      const target = Number(fundElement.getAttribute('data-pending-fund'));
      const count = + fundElement.innerText;
      const speed = 1000; // change animation speed here
      const inc = target / speed;
      if(count < target) {
        fundElement.innerText = Math.ceil(count + inc);
        setTimeout(animateRemainingFunds, 1);
      } else {
        fundElement.innerText = target;
      }
    }
    animateRemainingFunds();
  }
};

const handleDialogEvents = () => {
  const years = ["2022", "2023", "2024", "2025"];
  for(const year of years) {
    const openButton = document.getElementById(`dialogOpener${year}`);
    const dialogElem = document.getElementById(`dialog${year}`);
    const closeButton = document.getElementById(`dialogClose${year}`);
    openButton.addEventListener('click', () => {
      dialogElem.showModal();
    });
    closeButton.addEventListener('click', () => {
      dialogElem.close();
    });
  }
};

const animateTextReveal = (element) => {
  const observerOptions = {
    "threshold": 1
  }
  const observer2Callback = (entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        element.style.color = "white";
      }
      else {
        element.style.color = "gray";
      }
    });
  }
  let observer2 = new IntersectionObserver(observer2Callback, observerOptions);
  observer2.observe(element);
};

const textReveal = () => {
  const yearlyContribDOM = document.getElementsByClassName('yearly-contrib');
  for(const parent of yearlyContribDOM) {
    const yearlyContribPoints = parent.children;
    for(const point of yearlyContribPoints) {
      animateTextReveal(point);
    }
  }
};

const animateRemainingFunds = () => {
  const funds = document.getElementById('remaining-funds');
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        countUp();
      }
    });
  }
  let observer = new IntersectionObserver(observerCallback);
  observer.observe(funds);
};

const updateDurationInYears = () => {
  const year = document.getElementById("durationInYears");
  const startYear = 2016;
  const currentYear = new Date().getFullYear();
  year.innerText = currentYear - startYear;
};

rainbowColor();
handleDialogEvents();
animateRemainingFunds();
textReveal();
updateDurationInYears();
