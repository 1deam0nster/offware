// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const body = document.body;

  function openMenu() {
    if (mobileMenuToggle) mobileMenuToggle.classList.add('active');
    if (mobileNav) mobileNav.classList.add('active');
    if (body) body.classList.add('menu-open');
    if (document.documentElement) document.documentElement.classList.add('menu-open');
  }

  function closeMenu() {
    if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
    if (mobileNav) mobileNav.classList.remove('active');
    if (body) body.classList.remove('menu-open');
    if (document.documentElement) document.documentElement.classList.remove('menu-open');
    // Закрываем все подменю при закрытии меню
    const submenus = document.querySelectorAll('.mobile-submenu');
    submenus.forEach(submenu => {
      submenu.classList.remove('active');
    });
    const submenuLinks = document.querySelectorAll('.mobile-nav-link-with-submenu');
    submenuLinks.forEach(link => {
      link.classList.remove('active');
    });
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', openMenu);
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMenu);
  }

  // Подменю для "Продукты"
  const productsLink = document.querySelector('[data-submenu="products"]');
  if (productsLink) {
    productsLink.addEventListener('click', (e) => {
      e.preventDefault();
      const submenu = document.getElementById('products-submenu');
      if (submenu) {
        productsLink.classList.toggle('active');
        submenu.classList.toggle('active');
      }
    });
  }

  // Close menu when clicking on a regular link (not submenu)
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link:not(.mobile-nav-link-with-submenu), .mobile-submenu-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Desktop submenu toggle on click
  const navItemWithSubmenu = document.querySelector('.nav-item-with-submenu');
  const navLinkWithSubmenu = document.querySelector('.nav-link-with-submenu');
  
  if (navItemWithSubmenu && navLinkWithSubmenu) {
    navLinkWithSubmenu.addEventListener('click', (e) => {
      e.preventDefault();
      navItemWithSubmenu.classList.toggle('active');
    });

    // Close submenu when clicking outside (проверяем только при открытом подменю)
    document.addEventListener('click', (e) => {
      if (!navItemWithSubmenu.classList.contains('active')) return;
      if (!navItemWithSubmenu.contains(e.target)) {
        navItemWithSubmenu.classList.remove('active');
      }
    });
  }

  // FAQ accordion: открытие по клику, иконки down/up переключаются через CSS
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    const toggleBtn = item.querySelector('.faq-toggle');
    if (!question || !toggleBtn) return;

    function handleClick() {
      const isOpen = item.classList.toggle('active');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    }

    question.addEventListener('click', handleClick);
    toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      handleClick();
    });
  });

  // Task cards expand/collapse functionality
  const taskCards = document.querySelectorAll('.task-card');
  const expandButtons = document.querySelectorAll('.btn-expand');
  
  taskCards.forEach((card, index) => {
    // Инициализация: все карточки свернуты
    card.classList.add('collapsed');
    
    const button = expandButtons[index];
    if (button) {
      const buttonText = button.querySelector('.btn-expand-text');
      const buttonIcon = button.querySelector('.btn-expand-icon');
      
      button.addEventListener('click', () => {
        const isCollapsed = card.classList.contains('collapsed');
        
        if (isCollapsed) {
          card.classList.remove('collapsed');
          card.classList.add('expanded');
          if (buttonText) buttonText.textContent = 'Свернуть';
          if (buttonIcon) buttonIcon.classList.add('flipped');
        } else {
          card.classList.remove('expanded');
          card.classList.add('collapsed');
          if (buttonText) buttonText.textContent = 'Развернуть';
          if (buttonIcon) buttonIcon.classList.remove('flipped');
        }
      });
    }
  });

  // Product cards expand/collapse functionality
  const productCards = document.querySelectorAll('.product-card');
  const productExpandButtons = document.querySelectorAll('.btn-expand-product');
  
  if (productCards.length > 0 && productExpandButtons.length > 0) {
    productCards.forEach((card, index) => {
      // Инициализация: все карточки свернуты
      if (!card.classList.contains('collapsed') && !card.classList.contains('expanded')) {
        card.classList.add('collapsed');
      }
      
      const button = productExpandButtons[index];
      if (button) {
        const buttonText = button.querySelector('.btn-expand-text');
        const buttonIcon = button.querySelector('.btn-expand-icon');
        
        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          const isCollapsed = card.classList.contains('collapsed');
          
          if (isCollapsed) {
            card.classList.remove('collapsed');
            card.classList.add('expanded');
            if (buttonText) buttonText.textContent = 'Свернуть';
            if (buttonIcon) buttonIcon.classList.add('flipped');
          } else {
            card.classList.remove('expanded');
            card.classList.add('collapsed');
            if (buttonText) buttonText.textContent = 'Развернуть';
            if (buttonIcon) buttonIcon.classList.remove('flipped');
          }
        });
      }
    });
  }

  // Подсвечивание бордера карточек по курсору (throttle для снижения нагрузки)
  const glowBorderCardsSelector = '.product-card, .achievement-card, .task-card, .advantage-card, .services-advantage-card, .blog-card';
  const glowBorderCards = document.querySelectorAll(glowBorderCardsSelector);
  if (glowBorderCards.length > 0) {
    let glowThrottle = 0;
    function updateGlowBorderCardsMouse(e) {
      if (window.innerWidth <= 1200) return;
      const now = performance.now();
      if (now - glowThrottle < 32) return; // ~30fps
      glowThrottle = now;
      glowBorderCards.forEach(function(card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
      });
    }
    document.addEventListener('mousemove', updateGlowBorderCardsMouse, { passive: true });
  }

  // Offtest capabilities tabs: при нажатии на кнопку меняются картинка и блок с текстом
  const offtestCapabilities = document.querySelector('.offtest-capabilities');
  if (offtestCapabilities) {
    const capabilityTabs = offtestCapabilities.querySelectorAll('.capability-tab');
    const capabilityPanels = offtestCapabilities.querySelectorAll('.capability-panel');
    capabilityTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        capabilityTabs.forEach(t => t.classList.remove('active'));
        capabilityPanels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = offtestCapabilities.querySelector(`.capability-panel[data-index="${index}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  }

  // Services page tabs functionality
  const serviceTabs = document.querySelectorAll('.service-tab');
  if (serviceTabs.length > 0) {
    serviceTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        const tabsContainer = tab.closest('.services-section');
        
        if (tabsContainer) {
          // Remove active class from all tabs in the same section
          const allTabs = tabsContainer.querySelectorAll('.service-tab');
          allTabs.forEach(t => t.classList.remove('active'));
          
          // Hide all content boxes in this section
          const allContentBoxes = tabsContainer.querySelectorAll('.services-content-box');
          allContentBoxes.forEach(box => {
            box.style.display = 'none';
          });
          
          // Show the content for the clicked tab
          if (tabId) {
            const contentBox = tabsContainer.querySelector(`#${tabId}-content`);
            if (contentBox) {
              contentBox.style.display = 'grid';
            }
          }
        }
        
        // Add active class to clicked tab
        tab.classList.add('active');
      });
    });
    
    // Initialize: show active tab content, hide others (once per section)
    const sections = new Set();
    serviceTabs.forEach(tab => {
      const tabsContainer = tab.closest('.services-section');
      if (tabsContainer && !sections.has(tabsContainer)) {
        sections.add(tabsContainer);
        const allContentBoxes = tabsContainer.querySelectorAll('.services-content-box');
        allContentBoxes.forEach(box => {
          box.style.display = 'none';
        });
        
        const activeTab = tabsContainer.querySelector('.service-tab.active');
        if (activeTab) {
          const tabId = activeTab.getAttribute('data-tab');
          if (tabId) {
            const contentBox = tabsContainer.querySelector(`#${tabId}-content`);
            if (contentBox) {
              contentBox.style.display = 'grid';
            }
          }
        } else {
          // If no active tab, show first content box
          const firstContentBox = tabsContainer.querySelector('.services-content-box');
          if (firstContentBox) {
            firstContentBox.style.display = 'grid';
          }
        }
      }
    });
  }
});