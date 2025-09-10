const isMobile = window.innerWidth <= 767.9; // for mobile devices
const triggerPoint = window.innerHeight * 0.1; // 10% of viewport height

function updateBg() {
  if (window.scrollY >= triggerPoint) {
    document.body.style.setProperty("--bg-y", "-20px");
  } else {
    document.body.style.setProperty("--bg-y", isMobile ? "-60px" : "-180px");
  }
}

window.addEventListener("scroll", updateBg);
window.addEventListener("resize", updateBg); // keep it correct on resize
updateBg();


const resetMargin = () => {
  const stat = document.getElementById("stats");

  if (window.scrollY >= triggerPoint) {
    stat.style.setProperty("margin-top", isMobile ? "60px" : "80px");
  } else {
    stat.style.setProperty("margin-top", "180px");
  }
}

window.addEventListener("scroll", resetMargin);


// number counter
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.stat').forEach(stat => {
  const span = stat.querySelector('p span');
  const target = parseFloat(span.dataset.target);

  // Format the initial display
  if (Number.isInteger(target)) {
    span.innerText = target.toLocaleString();
  } else {
    span.innerText = target.toFixed(3);
  }

  const animateNumber = () => {
    const obj = { value: 0 };
    gsap.to(obj, {
      value: target,
      duration: 2,
      ease: "power1.out",
      onUpdate: () => {
        let formatted;
        if (Number.isInteger(target)) {
          formatted = Math.round(obj.value).toLocaleString();
        } else {
          formatted = obj.value.toFixed(3);
        }
        span.innerText = formatted;
      }
    });
  };

  ScrollTrigger.create({
    trigger: stat,
    start: "top 95%",
    onEnter: animateNumber,
    onEnterBack: animateNumber
  });
});
