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
  const gratitudeOpener = document.getElementById('gratitudeOpener');
  const gratitudeDialog = document.getElementById('gratitudeDialog');
  const gratitudeClose = document.getElementById('gratitudeClose');
  if(gratitudeOpener && gratitudeDialog && gratitudeClose) {
    gratitudeOpener.addEventListener('click', () => {
      gratitudeDialog.showModal();
    });
    gratitudeClose.addEventListener('click', () => {
      gratitudeDialog.close();
    });
  }
};

const animateRemainingFunds = () => {
  const funds = document.getElementById('remaining-funds');
  if(!funds) {
    return;
  }
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
  if(!year) {
    return;
  }
  const startYear = 2016;
  const currentYear = new Date().getFullYear();
  year.innerText = currentYear - startYear;
};

handleDialogEvents();
animateRemainingFunds();
updateDurationInYears();
