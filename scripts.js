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
  const dialogOpener2022 = document.getElementById('dialogOpener2022');
  const dialogOpener2023 = document.getElementById('dialogOpener2023');
  const dialogOpener2024 = document.getElementById('dialogOpener2024');
  const dialog2022 = document.getElementById('dialog2022');
  const dialog2023 = document.getElementById('dialog2023');
  const dialog2024 = document.getElementById('dialog2024');
  const dialogClose2022 = document.getElementById('dialogClose2022');
  const dialogClose2023 = document.getElementById('dialogClose2023');
  const dialogClose2024 = document.getElementById('dialogClose2024');

  dialogOpener2022.addEventListener('click', () => {
    dialog2022.showModal();
  });

  dialogClose2022.addEventListener('click', () => {
    dialog2022.close();
  });

  dialogOpener2023.addEventListener('click', () => {
    dialog2023.showModal();
  });

  dialogClose2023.addEventListener('click', () => {
    dialog2023.close();
  });

  dialogOpener2024.addEventListener('click', () => {
    dialog2024.showModal();
  });

  dialogClose2024.addEventListener('click', () => {
    dialog2024.close();
  });
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
