const menuButton = document.querySelector('.menu-nav .ch-btn');
const menuList = document.querySelector('.menu-items .menu-list');

// 토글 이벤트 추가
menuButton.addEventListener('click', () => {
    // 버튼에 토글 클래스를 추가하거나 제거
    menuButton.classList.toggle('toggle-btn');
    
    // 메뉴 리스트의 visibility를 토글
    menuList.classList.toggle('active');
});