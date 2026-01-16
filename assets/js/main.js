// Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Scroll progress
        function updateScrollProgress() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollProgress = (scrollTop / scrollHeight) * 100;
            document.getElementById('scrollProgress').style.width = scrollProgress + '%';
        }

        window.addEventListener('scroll', updateScrollProgress);

        // Mobile sticky header toggle
        const mSticky = document.querySelector('.breadcrumb-action-bar');

        function setMobileSticky(on) {
            if (!mSticky) return;
            mSticky.classList.toggle('mobile-visible', on);
            document.body.classList.toggle('has-mobile-sticky', on);
        }

        window.addEventListener('scroll', () => {
            const on = window.scrollY > 120;
            setMobileSticky(on);
        });

        // Mobile interactions
        document.querySelectorAll('.cta-button').forEach(btn => {
            btn.addEventListener('click', () => {
                const toast = document.getElementById('toast');
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 3000);
            });
        });

        // Desktop interactions
        document.querySelectorAll('.apply-btn, .primary-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const toast = document.getElementById('toast');
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 3000);
            });
        });

        // Phone button interaction
        document.querySelectorAll('.phone-button, .mobile-phone-button').forEach(btn => {
            btn.addEventListener('click', () => {
                window.location.href = 'tel:097-513-2111';
            });
        });


        

        document.addEventListener('DOMContentLoaded', () => {
            const pcTagScroll = document.getElementById('pcTagScroll');
            const pcTagLeft = document.getElementById('pcTagScrollLeft');
            const pcTagRight = document.getElementById('pcTagScrollRight');
            const mobileTagScroll = document.getElementById('mobileTagScroll');
            const mobileTagLeft = document.getElementById('mobileTagScrollLeft');
            const mobileTagRight = document.getElementById('mobileTagScrollRight');
            const mobileBadgeScroll = document.getElementById('mobileBadgeScroll');
            const mobileBadgeLeft = document.getElementById('mobileBadgeScrollLeft');
            const mobileBadgeRight = document.getElementById('mobileBadgeScrollRight');

            function setupTagScroller(scrollEl, leftBtn, rightBtn, step) {
                if (!scrollEl || !leftBtn || !rightBtn) {
                    return;
                }

                const updateButtons = () => {
                    const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
                    const hasOverflow = scrollEl.scrollWidth > scrollEl.clientWidth + 1;

                    leftBtn.classList.toggle('is-hidden', !hasOverflow);
                    rightBtn.classList.toggle('is-hidden', !hasOverflow);

                    leftBtn.disabled = scrollEl.scrollLeft <= 0;
                    rightBtn.disabled = scrollEl.scrollLeft >= maxScroll - 1;
                };

                leftBtn.addEventListener('click', () => {
                    scrollEl.scrollBy({ left: -step, behavior: 'smooth' });
                });

                rightBtn.addEventListener('click', () => {
                    scrollEl.scrollBy({ left: step, behavior: 'smooth' });
                });

                scrollEl.addEventListener('scroll', updateButtons);
                window.addEventListener('resize', updateButtons);
                updateButtons();
            }

            setupTagScroller(pcTagScroll, pcTagLeft, pcTagRight, 240);
            setupTagScroller(mobileTagScroll, mobileTagLeft, mobileTagRight, 180);
            setupTagScroller(mobileBadgeScroll, mobileBadgeLeft, mobileBadgeRight, 80);

            console.log('Unified responsive job posting loaded');
        });
// Make tags clickable with visual feedback only
document.querySelectorAll('.mobile-job-tag, .job-tag').forEach(tag => {
    tag.addEventListener('click', function() {
        // Add temporary highlight effect
        this.style.background = '#e91e63';
        this.style.color = '#ffffff';
        
        // Reset after 200ms
        setTimeout(() => {
            this.style.background = '#ffffff';
            this.style.color = '#1f2937';
        }, 200);
        
        const tagText = this.textContent.trim();
        console.log(`Tag clicked: ${tagText}`);
        // Here you would typically navigate or filter results
    });
});

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileOverlay = document.getElementById('mobile-overlay');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');
function openMobileMenu() {
    console.log('Opening menu...');
    if (mobileOverlay && mobileMenu) {
        // First set display
        mobileMenu.style.display = 'block';
        mobileOverlay.style.display = 'block';
        
        // Force reflow
        mobileMenu.offsetHeight;
        mobileOverlay.offsetHeight;
        
        // Then add animation classes
        setTimeout(() => {
            mobileMenu.classList.add('open'); // ✅ Use 'open' not 'show'
            mobileOverlay.classList.add('show');
        }, 10);
        
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    console.log('Closing menu...');
    if (mobileOverlay && mobileMenu) {
        mobileMenu.classList.remove('open');
        mobileOverlay.classList.remove('show');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            mobileMenu.style.display = 'none';
            mobileOverlay.style.display = 'none';
        }, 300);
    }
}
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Menu button clicked!');
        openMobileMenu();
    });
}
if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
}
if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
}
