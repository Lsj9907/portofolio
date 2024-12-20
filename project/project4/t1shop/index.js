// 스와이퍼

var swiper = new Swiper('.swiper', {
  slidesPerView: 3,
  direction: getDirection(),
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  on: {
    resize: function () {
      swiper.changeDirection(getDirection());
    },
  },
});

function getDirection() {
  var windowWidth = window.innerWidth;
  var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

  return direction;
}




// 배너
let prevScroll = window.pageYOffset;

window.onscroll = function () {
  let currentScroll = window.pageYOffset;
  const banner = document.querySelector('.hd-banner');
  const slideContent = document.querySelector('.slide-content');

  if (prevScroll > currentScroll) {
    banner.style.top = '0';
    slideContent.style.top = `${banner.offsetHeight}px`;
  } else {
    banner.style.top = `-${banner.offsetHeight}px`;
    slideContent.style.top = '0';
  }
  prevScroll = currentScroll;
}


const boxes = document.querySelectorAll('.step_box');
let currentIndex = 0;
let intervalId;

function activateBox() {
  boxes.forEach(box => {
    box.classList.remove('active');
    const svg = box.querySelector('svg');
    if (svg) svg.classList.remove('shake');
  });

  const currentBox = boxes[currentIndex];
  currentBox.classList.add('active');

  const svg = currentBox.querySelector('svg');
  if (svg) svg.classList.add('shake');
  currentIndex = (currentIndex + 1) % boxes.length;
}

function startAutoRotate() {
  intervalId = setInterval(activateBox, 1800);
}

function stopAutoRotate() {
  clearInterval(intervalId);
}

activateBox();
startAutoRotate();

boxes.forEach(box => {
  box.addEventListener('mouseenter', () => {
    stopAutoRotate();
    boxes.forEach(box => {
      box.classList.remove('active');
      const svg = box.querySelector('svg');
      if (svg) svg.classList.remove('shake'); // 흔들림 효과 제거
    });
    box.classList.add('active');
    const svg = box.querySelector('svg');
    if (svg) svg.classList.add('shake'); // Hover 시 흔들림 효과 추가
  });

  box.addEventListener('mouseleave', () => {
    box.classList.remove('active');
    const svg = box.querySelector('svg');
    if (svg) svg.classList.remove('shake');
    startAutoRotate();
  });
});


let $text = $('.share-container1');
let $wrap = $('.share-container1');

$text.clone().appendTo($wrap);

TweenMax.to($wrap, 40, {
  x: -($text.width()),
  ease: Linear.easeNone,
  repeat: -1
});

let $text2 = $('.share-container2');
let $wrap2 = $('.share-container2');

$text2.clone().appendTo($wrap2);

TweenMax.to($wrap2, 40, {
  x: -($text2.width()),
  ease: Linear.easeNone,
  repeat: -1
});

let $text3 = $('.share-container3');
let $wrap3 = $('.share-container3');

$text2.clone().appendTo($wrap3);

TweenMax.to($wrap2, 40, {
  x: -($text2.width()),
  ease: Linear.easeNone,
  repeat: -1
});



// 베이스 캠프 주소
const btns = document.querySelectorAll('.center-btn li');
const states = document.querySelectorAll('.state');

btns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    // 모든 버튼에서 active 클래스 제거
    btns.forEach(button => button.classList.remove('active'));

    btn.classList.add('active');

    states.forEach(state => state.style.display = 'none');

    states[index].style.display = 'flex';
  });
});


document.querySelector('.hq_shop').classList.add('active');
document.querySelector('.center-btn li').classList.add('active');



function startAnimation() {
  gsap.set(".under-line .content", { height: 0 });
  gsap.to(".under-line .content", {
    height: "270px",
    duration: 1,
    ease: "power2.out"
  });
}

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startAnimation();
      gsap.set(".under-line .content", { height: 0 });
    }
  });
}, {
  threshold: 0.5
});

const targetElement = document.querySelector('.under-line');
observer.observe(targetElement);





// 사이드 메뉴
const links = document.querySelectorAll('.slide-nav a');

links.forEach(link => {
  link.addEventListener('mouseenter', function () {
    links.forEach(otherLink => {
      if (otherLink !== link) {
        otherLink.style.opacity = '0.5';
      }
    });
  });

  link.addEventListener('mouseleave', function () {
    links.forEach(otherLink => {
      otherLink.style.opacity = '1';
    });
  });
});



document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', (event) => {
    const currentStep = event.currentTarget.closest('.step');
    const stepHidden = currentStep.querySelector('.step-hidden');

    document.querySelectorAll('.step-hidden').forEach((hidden) => {
      if (hidden !== stepHidden) {
        hidden.classList.remove('active');
      }
    });

    stepHidden.classList.toggle('active');
  });
});
