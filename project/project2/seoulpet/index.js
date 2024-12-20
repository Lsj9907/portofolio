
const topBanner = document.querySelector('.top-banner');
const headerContainer = document.querySelector('.header-container');

window.addEventListener('scroll', function() {
    if (window.scrollY > topBanner.offsetHeight) {
        topBanner.style.opacity = '0';
        headerContainer.style.position = 'fixed';
        headerContainer.style.top = '0';
    } else {
        topBanner.style.opacity = '1';
        
        headerContainer.style.position = 'absolute';
        headerContainer.style.top = `${topBanner.offsetHeight}px`;
    }
});

// 'shop' 항목을 클릭하면 mini-menu가 보이게 만들고, 색상 변경 및 SVG 색상 변경
const shopMenu = document.querySelector('.global-menu-wrapper li');
const miniMenu = document.querySelector('.mini-menu');

shopMenu.addEventListener('click', function(event) {
    event.preventDefault();

    const clickedLink = shopMenu.querySelector('a');
    const svgIcon = clickedLink.querySelector('svg');

    const isActive = clickedLink.classList.toggle('active');

    if (isActive) {
        clickedLink.style.color = '#FFC1B8';
        if (svgIcon) {
            svgIcon.style.fill = '#FFC1B8';
            svgIcon.classList.add('rotated');
        }
        miniMenu.style.display = 'block';
    } else {
        clickedLink.style.color = '';
        if (svgIcon) {
            svgIcon.style.fill = '';
            svgIcon.classList.remove('rotated');
        }
        miniMenu.style.display = 'none';
    }

    const allMiniMenus = document.querySelectorAll('.mini-menu');
    allMiniMenus.forEach(menu => {
        if (menu !== miniMenu) {
            menu.style.display = 'none';
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // 필요한 요소 가져오기
    const mobileBtn = document.querySelector('.mobile-btn');
    const mobileMenuWrapper = document.querySelector('.mobile-menu-wrapper');
    const mobileMenuBackdrop = document.querySelector('.mobile-menu-backdrop');
    const headerContainer = document.querySelector('.header-container');

    if (!mobileBtn || !mobileMenuWrapper || !mobileMenuBackdrop || !headerContainer) {
        console.error('필수 요소를 찾을 수 없습니다. HTML 구조를 확인하세요.');
        return;
    }

    // 초기 상태에서 header-container가 항상 보이도록 설정
    headerContainer.style.position = 'fixed';
    headerContainer.style.top = '0';
    headerContainer.style.left = '0';
    headerContainer.style.width = '100%';
    headerContainer.style.zIndex = '10000';
    headerContainer.style.backgroundColor = 'white'; // 필요 시 색상 변경

    // 모바일 버튼 클릭 이벤트 추가
    mobileBtn.addEventListener('click', function () {
        // 버튼에 toggle-btn 클래스 추가/제거
        mobileBtn.classList.toggle('toggle-btn');

        // 메뉴 열림 상태 확인
        const isOpen = mobileMenuWrapper.style.display === 'block';

        if (isOpen) {
            // 메뉴 닫기
            mobileMenuWrapper.style.display = 'none';
            mobileMenuBackdrop.style.display = 'none';
            document.body.style.overflow = ''; // 스크롤 활성화
        } else {
            // 메뉴 열기
            mobileMenuWrapper.style.display = 'block';
            mobileMenuBackdrop.style.display = 'block';
            document.body.style.overflow = 'hidden'; // 스크롤 비활성화
        }
    });

    // 배경 클릭 시 메뉴 닫기
    mobileMenuBackdrop.addEventListener('click', function () {
        // 메뉴 닫기
        mobileBtn.classList.remove('toggle-btn');
        mobileMenuWrapper.style.display = 'none';
        mobileMenuBackdrop.style.display = 'none';
        document.body.style.overflow = '';
    });
});

// mini-menu 영역에서 마우스가 벗어날 때 메뉴 닫기
miniMenu.addEventListener('mouseleave', function() {
    miniMenu.style.display = 'none'; // mini-menu 숨기기

    // 메뉴와 링크 초기화
    const clickedLink = shopMenu.querySelector('a'); // 클릭된 'shop' 항목의 링크
    const svgIcon = clickedLink.querySelector('svg'); // 링크 내의 SVG 아이콘
    clickedLink.classList.remove('active'); // active 클래스 제거
    clickedLink.style.color = ''; // 링크 색상 초기화
    if (svgIcon) {
        svgIcon.style.fill = ''; // SVG 아이콘 색상 초기화
        svgIcon.classList.remove('rotated'); // SVG 회전 제거
    }
});

// 슬라이드
    const slideBox = $('.slide-box');
    
    const slides = $('.slide-item').clone();
    slideBox.append(slides);
    const totalItems = $('.slide-item').length;
    const animationDuration = totalItems * 5;
    slideBox.css('animation-duration', `${animationDuration}s`);

    slideBox.css({
        'display': 'flex',
        'animation': `slideAnimation ${animationDuration}s linear infinite`
    });
    

// new- in 슬라이드
document.addEventListener("DOMContentLoaded", function () {
    const swiperWrapper = document.querySelector('.new-swiper-wrapper');
    const swiperSlides = document.querySelectorAll('.new-swiper-slide');
    const prevButton = document.querySelector('.swiper-button-prev');
    const nextButton = document.querySelector('.swiper-button-next');
    const slideCount = swiperSlides.length;

    let currentIndex = 0;

    function duplicateSlides() {
        for (let i = 0; i < 100; i++) {
            swiperSlides.forEach(slide => {
                const clonedSlide = slide.cloneNode(true); // 슬라이드 복제
                swiperWrapper.appendChild(clonedSlide);
            });
        }

        updateSlidePosition();
    }

    function updateSlidePosition() {
        const slideWidth = swiperSlides[0].offsetWidth + 15;
        swiperWrapper.style.transition = 'transform 0.3s ease-in-out';
        swiperWrapper.style.transform = `translateX(-${(currentIndex) * slideWidth}px)`;
    }

    function resetSlider() {
        const slideWidth = swiperSlides[0].offsetWidth + 15;

        if (currentIndex >= slideCount * 100) {
            currentIndex = 0;
            swiperWrapper.style.transition = 'none';
            updateSlidePosition();
            setTimeout(() => {
                swiperWrapper.style.transition = 'transform 0.3s ease-in-out';
            }, 50);
        }
    }

    prevButton.addEventListener('click', () => {
        changeButtonOpacity(prevButton);
        if (currentIndex === 0) {
            currentIndex = slideCount * 100 - 1;
            swiperWrapper.style.transition = 'none';
            updateSlidePosition();
            setTimeout(() => {
                swiperWrapper.style.transition = 'transform 0.3s ease-in-out';
            }, 50);
        } else {
            currentIndex--;
            updateSlidePosition();
        }
    });

    nextButton.addEventListener('click', () => {
        changeButtonOpacity(nextButton);
        currentIndex++;
        updateSlidePosition();
        resetSlider();
    });

    duplicateSlides();

    function changeButtonOpacity(button) {
        button.style.opacity = '0.7';
        setTimeout(() => {
            button.style.opacity = '0.2';
        }, 200);
    }
});

// 리뷰
document.addEventListener('DOMContentLoaded', () => {
    const slidesContainer = document.querySelector('.review-swiper-container');
    const slides = document.querySelectorAll('.review-swiper-slide');
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');
    const buttons = document.querySelectorAll('.slide-button li');

    let currentIndex = 0;
    const totalSlides = slides.length;

    // PC용: 슬라이드 복제 (앞과 뒤에 추가)
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    slidesContainer.appendChild(firstClone); // 마지막 슬라이드 뒤에 첫 번째 복제
    slidesContainer.insertBefore(lastClone, slides[0]); // 첫 번째 슬라이드 앞에 마지막 복제

    // 복제된 슬라이드 포함 배열
    const slidesArray = document.querySelectorAll('.review-swiper-slide');

    // 초기 슬라이드 위치 설정 (PC)
    slidesArray.forEach((slide, index) => {
        slide.style.transition = 'none'; // 초기 위치 설정 시 애니메이션 제거
        slide.style.transform = `translateX(${(index - 1) * 100}%)`;
    });

    // 업데이트 함수
    const updateSlide = (index) => {
        slidesArray.forEach((slide, i) => {
            slide.style.transition = 'transform 0.5s ease-in-out';
            slide.style.transform = `translateX(${(i - index) * 100}%)`;
        });

        // 슬라이드 버튼 활성화 (모바일)
        buttons.forEach((button, i) => {
            button.classList.toggle('touch-slide', i === index % totalSlides);
        });
    };

    // 모바일에서 동작
    buttons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = index;
            updateSlide(currentIndex);
        });
    });

    // PC에서만 동작하도록 왼쪽/오른쪽 버튼 이벤트 추가
    const isPC = window.matchMedia('(min-width: 768px)').matches;

    if (isPC) {
        leftButton.addEventListener('click', () => {
            currentIndex--;
            updateSlide(currentIndex);

            // 경계 처리
            if (currentIndex < 0) {
                setTimeout(() => {
                    slidesArray.forEach((slide, i) => {
                        slide.style.transition = 'none';
                        slide.style.transform = `translateX(${(i - (totalSlides)) * 100}%)`;
                    });
                    currentIndex = totalSlides - 1;
                }, 500);
            }
        });

        // 오른쪽 버튼 클릭
        rightButton.addEventListener('click', () => {
            currentIndex++;
            updateSlide(currentIndex);

            // 경계 처리
            if (currentIndex >= totalSlides + 1) {
                setTimeout(() => {
                    slidesArray.forEach((slide, i) => {
                        slide.style.transition = 'none';
                        slide.style.transform = `translateX(${(i - 1) * 100}%)`;
                    });
                    currentIndex = 0;
                }, 500);
            }
        });

        updateSlide(1);
        currentIndex = 1;
    }
});




// 스크롤 이벤트
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = [
        { selector: '.block-item', classToAdd: 'show' },
        { selector: '.talk-img-box', classToAdd: 'show' },
        { selector: '.comfort-box', classToAdd: 'show' },
        { selector: '.fiber-txt-wrapper', classToAdd: 'show' },
        { selector: '.fiber-global', classToAdd: 'show' },
        { selector: '.fiber-mobile-img-wrapper', classToAdd: 'show' },
        { selector: '.fiber-global-img-wrapper', classToAdd: 'show' }
    ];

    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(entry.target.dataset.classToAdd);
            } else {
                entry.target.classList.remove(entry.target.dataset.classToAdd);
            }
        });
    }, options);

    elementsToObserve.forEach(({ selector, classToAdd }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.dataset.classToAdd = classToAdd;
            observer.observe(element);
        });
    });
});
