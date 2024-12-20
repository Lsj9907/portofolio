// 해더 nav
const header = document.getElementById("header");
const contentBox2 = document.getElementById("content-box2");
const logo = document.getElementById("logo");
const headerHeight = header.offsetHeight;
let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll <= headerHeight) {
        header.style.backdropFilter = 'none';
        header.style.borderBottom = "none";
    } else {
        header.style.backdropFilter = 'blur(10px)';
        header.style.borderBottom = "1px solid rgba(255, 255, 255, 0.4)";
    }

    if (currentScroll > lastScroll && currentScroll > headerHeight) {
        gsap.to(header, { y: -headerHeight, duration: 0.5 });
    } else if (currentScroll < lastScroll) {
        gsap.to(header, { y: 0, duration: 0.5 });
    }

    if (contentBox2 && currentScroll > contentBox2.offsetTop && currentScroll < contentBox2.offsetTop + contentBox2.offsetHeight) {
        header.style.color = "#222";
        header.style.borderBottom = "1px solid rgba(0, 0, 0, 0.4)";
        
        const logoImg = logo.querySelector("img");
        logoImg.src = './images/LOGO2.svg';
    } else {
        header.style.color = "";
        const logoImg = logo.querySelector("img");
        logoImg.src = './images/LOGO1.svg';
    }

    lastScroll = currentScroll;
});

// 버튼
document.querySelectorAll('.btn-box').forEach((btnBox) => {
    const btn2 = btnBox.querySelector('.btn2');

    btnBox.addEventListener('mouseenter', () => {
        gsap.to(btn2, {
            x: '0px',
            clipPath: 'inset(0 0 0 100%)',
            duration: 0.4,
            ease: 'power1.out',
        });
    });

    btnBox.addEventListener('mouseleave', () => {
        gsap.to(btn2, {
            x: '0px',
            clipPath: 'inset(0)',
            duration: 0.4,
            ease: 'power1.out',
        });
    });
});


// 버튼2

const wrapper = document.querySelector(".view-wrapper");
const more1 = document.querySelector(".more1");
const more2 = document.querySelector(".more2");

wrapper.addEventListener("mouseenter", () => {
    more2.style.transform = "translateX(220px)";
});

wrapper.addEventListener("mouseleave", () => {
    more2.style.transform = "translateX(0)";
});



// 프리미엄
const text = document.querySelector('.slide-txt');
const textWt = text.offsetWidth;

gsap.fromTo(text, {
    x: 0
}, {
    x: -textWt,
    duration: 30,
    repeat: -1,
    ease: 'linear'
});





// 올라가는 숫자
function animateNumber(id, targetValue) {
    const element = document.getElementById(id);
    let currentValue = 0;
    const duration = 2000;
    const increment = targetValue / (duration / 50);

    const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            clearInterval(interval);
            element.textContent = formatNumber(targetValue, id);
        } else {
            element.textContent = formatNumber(Math.floor(currentValue), id);
        }
    }, 50);
}

function formatNumber(num, id) {
    let formatted = num.toLocaleString();
    if (id === 'sales' && num >= 200) {
        formatted = num >= 200 ? num + '+' : formatted;
    }
    return formatted;
}

let triggered = false;
window.addEventListener('scroll', function () {
    const upNumSection = document.querySelector('.up-num');
    const rect = upNumSection.getBoundingClientRect();

    if (rect.top <= window.innerHeight && !triggered) {
        triggered = true;
        animateNumber('hours', 3984);
        animateNumber('creators', 276);
        animateNumber('sales', 200);
    }
});



// 온에어
const dragContainer = document.querySelector('.on_air-drag');

let isDragging = false;
let startX, scrollLeft;

dragContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - dragContainer.offsetLeft;
    scrollLeft = dragContainer.scrollLeft;
});

dragContainer.addEventListener('mouseleave', () => {
    isDragging = false;
});

dragContainer.addEventListener('mouseup', () => {
    isDragging = false;
});

dragContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - dragContainer.offsetLeft;
    const walk = (x - startX) * 1.5;
    dragContainer.scrollLeft = scrollLeft - walk;
});




// 움직이는 원형
const circles = document.querySelectorAll('.circle-wrapper .circle');
const subsidiary = document.querySelector('.subsidiary');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            gsap.from(circles, {
                opacity: 0,
                y: -50,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
            });

            circles.forEach((circle, index) => {
                gsap.to(circle, {
                    y: 20,
                    duration: 1.5 + Math.random(),
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    delay: index * 0.3,
                });
            });

            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

observer.observe(subsidiary);



//왜 선택해야하는가?

const topBoxes = document.querySelectorAll(".top-container .choose-box");
const underBoxes = document.querySelectorAll(".under-container .under-box");

topBoxes[0].classList.add("active");
underBoxes[0].classList.add("active");

topBoxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        topBoxes.forEach((b) => b.classList.remove("active"));

        box.classList.add("active");

        underBoxes.forEach((underBox) => {
            underBox.classList.remove("active");
        });

        const selectedBox = underBoxes[index];
        selectedBox.classList.add("active");
    });
});

// 수상경력

const achievementsWrapper = document.querySelector(".achievements .achievements-wrapper");

let isDraggingAchievements = false;
let startXAchievements; 
let scrollLeftAchievements;

achievementsWrapper.addEventListener("mousedown", (event) => {
    isDraggingAchievements = true;
    achievementsWrapper.classList.add("dragging");
    startXAchievements = event.pageX - achievementsWrapper.offsetLeft;
    scrollLeftAchievements = achievementsWrapper.scrollLeft;
    event.preventDefault();
});

achievementsWrapper.addEventListener("mousemove", (event) => {
    if (!isDraggingAchievements) return;
    const x = event.pageX - achievementsWrapper.offsetLeft;
    const walk = (x - startXAchievements) * 1.5;
    achievementsWrapper.scrollLeft = scrollLeftAchievements - walk;
});

achievementsWrapper.addEventListener("mouseup", () => {
    isDraggingAchievements = false;
    achievementsWrapper.classList.remove("dragging");
});



// 정년이

const slideTxt = document.querySelector('.news-slide-txt');
const slideTxtWt = slideTxt.offsetWidth;

gsap.fromTo(slideTxt, {
    x: 0
}, {
    x: -slideTxtWt,
    duration: 30,
    repeat: -1,
    ease: 'linear'
});


// 마우스 포인터 추가

const onAir = document.querySelector('.on_air');
const chasingElement = document.querySelector('.chasing-element');


onAir.addEventListener('mouseenter', () => {
    chasingElement.classList.add('show');
});

onAir.addEventListener('mouseleave', () => {
    chasingElement.classList.remove('show');
});

onAir.addEventListener('mousemove', (e) => {
    const rect = onAir.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    chasingElement.style.left = `${x - chasingElement.offsetWidth / 2}px`;
    chasingElement.style.top = `${y - chasingElement.offsetHeight / 2}px`;
});


const achievements = document.querySelector('.achievements');
const chasingElement2 = document.querySelector('.chasing-element2');

achievements.addEventListener('mouseenter', () => {
    chasingElement2.classList.add('show');
});

achievements.addEventListener('mouseleave', () => {
    chasingElement2.classList.remove('show');
});

achievements.addEventListener('mousemove', (e) => {
    const rect = achievements.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    chasingElement2.style.left = `${x - chasingElement2.offsetWidth / 2}px`;
    chasingElement2.style.top = `${y - chasingElement2.offsetHeight / 2}px`;
});


// 스크롤 원형 변화

gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", {
    scrollTrigger: {
        trigger: ".box",
        start: "top bottom",
        end: "top top",
        scrub: 0.2
    },
    y: "-100%",
    scale: 1.5,
    borderRadius: "100% 100% 0 0",
    ease: "power4.out",
});



gsap.registerPlugin(ScrollTrigger);

// box가 스크롤되면서 위로 올라가고 하단 모서리가 둥글게 변하는 효과
gsap.to(".container-box2", {
    scrollTrigger: {
        trigger: ".container2",
        start: "top bottom", // box가 뷰포트 하단에 닿을 때 시작
        end: "top top", // box가 뷰포트 상단에 닿을 때 종료
        scrub: 0.1, // 스크롤에 따라 따라가며
    },
    y: "-100%", // 갑자기 위로 이동
    scale: 1.5, // 크기가 갑자기 커지도록 설정
    borderRadius: "0 0 100% 100%", // 하단 모서리가 둥글게
    ease: "power4.in", // 튀어나오는 효과
});

gsap.registerPlugin(ScrollTrigger);

// box가 스크롤되면서 위로 올라가고 하단 모서리가 둥글게 변하는 효과
gsap.to(".container-box3", {
    scrollTrigger: {
        trigger: ".container3",
        start: "top bottom", // box가 뷰포트 하단에 닿을 때 시작
        end: "top top", // box가 뷰포트 상단에 닿을 때 종료
        scrub: 0.1, // 스크롤에 따라 따라가며
    },
    y: "-100%", // 갑자기 위로 이동
    scale: 1.5, // 크기가 갑자기 커지도록 설정
    borderRadius: "0 0 100% 100%", // 하단 모서리가 둥글게
    ease: "power4.in", // 튀어나오는 효과
});

gsap.registerPlugin(ScrollTrigger);

// box가 스크롤되면서 위로 올라가고 하단 모서리가 둥글게 변하는 효과
gsap.to(".container-box4", {
    scrollTrigger: {
        trigger: ".container4",
        start: "top bottom", // box가 뷰포트 하단에 닿을 때 시작
        end: "top top", // box가 뷰포트 상단에 닿을 때 종료
        scrub: 0.1, // 스크롤에 따라 따라가며
    },
    y: "-100%", // 갑자기 위로 이동
    scale: 1.2, // 크기가 갑자기 커지도록 설정
    borderRadius: "0 0 100% 100%", // 하단 모서리가 둥글게
    ease: "power4.in", // 튀어나오는 효과
});


gsap.registerPlugin(ScrollTrigger);

// box가 스크롤되면서 위로 올라가고 하단 모서리가 둥글게 변하는 효과
gsap.to(".container-box5", {
    scrollTrigger: {
        trigger: ".container5",
        start: "top bottom", // box가 뷰포트 하단에 닿을 때 시작
        end: "top top", // box가 뷰포트 상단에 닿을 때 종료
        scrub: 0.1, // 스크롤에 따라 따라가며
    },
    y: "0%", // 갑자기 위로 이동
    scale: 1, // 크기가 갑자기 커지도록 설정
    borderRadius: "100% 100% 0 0", // 하단 모서리가 둥글게
    ease: "power4.in", // 튀어나오는 효과
});


