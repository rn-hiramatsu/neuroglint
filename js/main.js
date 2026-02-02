/* ===================================
   NeuroGlint - JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollAnimation();
  initSmoothScroll();
});

/**
 * モバイルメニューの開閉
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.header__menu-btn');
  const nav = document.querySelector('.header__nav');
  
  if (!menuBtn || !nav) return;
  
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    
    // ハンバーガーアイコンのアニメーション
    const spans = menuBtn.querySelectorAll('span');
    if (nav.classList.contains('is-open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
  
  // メニューリンクをクリックしたら閉じる
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      const spans = menuBtn.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
}

/**
 * スクロールアニメーション
 * 要素が画面内に入ったらフェードイン
 */
function initScrollAnimation() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (!fadeElements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  fadeElements.forEach(el => {
    observer.observe(el);
  });
}

/**
 * スムーススクロール
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
