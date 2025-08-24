// NeuroAid Professional Website JavaScript

// Global state management
let currentPage = 'home';
let isDemoRecording = false;
let demoTimer = null;
let demoAnimationId = null;
let demoTimeLeft = 30;

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('NeuroAid: Initializing professional website...');
    initializeApp();
});

function initializeApp() {
    try {
        setupNavigation();
        setupThemeToggle();
        setupEventListeners();
        setupScrollAnimations();
        initializePage();
        
        console.log('NeuroAid: Website initialized successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}

// Navigation Management
function setupNavigation() {
    console.log('Setting up navigation...');
    
    // Setup main navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
        console.log('Added listener to nav link:', link.getAttribute('href'));
    });
    
    // Setup dropdown links
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
        console.log('Added listener to dropdown link:', link.getAttribute('href'));
    });
    
    // Setup footer navigation
    const footerLinks = document.querySelectorAll('.footer-column a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
        console.log('Added listener to footer link:', link.getAttribute('href'));
    });
    
    // Setup logo click
    const logo = document.querySelector('.logo h1');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            console.log('Logo clicked, navigating to home');
            showPage('home');
        });
    }
    
    // Setup CTA buttons
    setupCTAButtons();
}

function setupCTAButtons() {
    console.log('Setting up CTA buttons...');
    
    // Try Demo buttons
    const tryDemoButtons = document.querySelectorAll('button:contains("Try Demo"), button:contains("Try Free Demo"), .btn:contains("Try Demo")');
    document.querySelectorAll('button').forEach(btn => {
        const text = btn.textContent.toLowerCase();
        if (text.includes('try demo') || text.includes('try free demo')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Demo button clicked');
                showPage('demo');
            });
        }
    });
    
    // Get Started buttons
    document.querySelectorAll('button').forEach(btn => {
        const text = btn.textContent.toLowerCase();
        if (text.includes('get started') || text.includes('start free trial')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Get started button clicked');
                showPage('demo');
            });
        }
    });
    
    // Learn More buttons
    document.querySelectorAll('button').forEach(btn => {
        const text = btn.textContent.toLowerCase();
        if (text.includes('learn more')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Learn more button clicked');
                showPage('platform');
            });
        }
    });
    
    // Contact Sales buttons
    document.querySelectorAll('button').forEach(btn => {
        const text = btn.textContent.toLowerCase();
        if (text.includes('contact sales')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Contact sales button clicked');
                showPage('contact');
            });
        }
    });
}

function handleNavigation(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    console.log('Navigation clicked:', href);
    
    if (href && href.startsWith('#')) {
        const pageName = href.substring(1);
        if (pageName) {
            showPage(pageName);
        }
    } else if (href && href.startsWith('http')) {
        // External links - open in new tab
        window.open(href, '_blank');
    }
}

function showPage(pageName) {
    console.log('Navigating to page:', pageName);
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageName;
        
        // Update navigation active state
        updateNavigationState(pageName);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Page-specific initialization
        setTimeout(() => {
            initializePageContent(pageName);
        }, 100);
        
        // Update URL hash without triggering navigation
        history.replaceState(null, null, `#${pageName}`);
        
        console.log('Successfully navigated to:', pageName);
    } else {
        console.warn('Page not found:', pageName);
        // Fallback to home if page doesn't exist
        if (pageName !== 'home') {
            showPage('home');
        }
    }
}

function updateNavigationState(activePage) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${activePage}`) {
            link.classList.add('active');
        }
    });
}

function initializePage() {
    // Check for hash in URL
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(`${hash}-page`)) {
        showPage(hash);
    } else {
        showPage('home');
    }
}

// Page-specific content initialization
function initializePageContent(pageName) {
    console.log('Initializing content for page:', pageName);
    
    switch (pageName) {
        case 'demo':
            initializeDemoPage();
            break;
        case 'home':
            initializeHomePage();
            break;
        case 'careers':
            initializeCareersPage();
            break;
        case 'contact':
            initializeContactPage();
            break;
        case 'pricing':
            initializePricingPage();
            break;
        default:
            break;
    }
}

// Demo Page Functionality
function initializeDemoPage() {
    console.log('Initializing demo page...');
    
    const recordBtn = document.getElementById('demo-record-btn');
    const timer = document.getElementById('demo-timer');
    const canvas = document.getElementById('demo-waveform');
    const results = document.getElementById('demo-results');
    
    if (recordBtn) {
        // Remove any existing listeners
        recordBtn.removeEventListener('click', toggleDemoRecording);
        recordBtn.addEventListener('click', toggleDemoRecording);
        console.log('Demo record button listener added');
    }
    
    if (canvas) {
        initializeDemoCanvas();
    }
    
    if (results) {
        results.classList.add('hidden');
    }
    
    // Reset demo state
    isDemoRecording = false;
    demoTimeLeft = 30;
    if (timer) {
        timer.textContent = '0:30';
    }
    
    showSuccessMessage('Demo page loaded! Click the record button to try voice analysis.');
}

function toggleDemoRecording() {
    console.log('Demo recording toggle clicked, current state:', isDemoRecording);
    
    if (!isDemoRecording) {
        startDemoRecording();
    } else {
        stopDemoRecording();
    }
}

function startDemoRecording() {
    console.log('Starting demo recording...');
    isDemoRecording = true;
    demoTimeLeft = 30;
    
    const recordBtn = document.getElementById('demo-record-btn');
    const recordText = recordBtn ? recordBtn.querySelector('.record-text') : null;
    const timer = document.getElementById('demo-timer');
    const results = document.getElementById('demo-results');
    
    // Update UI
    if (recordBtn) {
        recordBtn.style.background = '#EF4444';
        recordBtn.style.animation = 'pulse 1s infinite';
    }
    if (recordText) {
        recordText.textContent = 'Recording...';
    }
    if (results) {
        results.classList.add('hidden');
    }
    
    // Start timer
    demoTimer = setInterval(() => {
        demoTimeLeft--;
        if (timer) {
            const minutes = Math.floor(demoTimeLeft / 60);
            const seconds = demoTimeLeft % 60;
            timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
        
        if (demoTimeLeft <= 0) {
            stopDemoRecording();
        }
    }, 1000);
    
    // Start waveform animation
    startDemoWaveform();
    
    showSuccessMessage('Demo recording started! Read the phrase aloud.');
}

function stopDemoRecording() {
    console.log('Stopping demo recording...');
    isDemoRecording = false;
    
    const recordBtn = document.getElementById('demo-record-btn');
    const recordText = recordBtn ? recordBtn.querySelector('.record-text') : null;
    
    // Clear timer
    if (demoTimer) {
        clearInterval(demoTimer);
        demoTimer = null;
    }
    
    // Stop waveform animation
    stopDemoWaveform();
    
    // Reset UI
    if (recordBtn) {
        recordBtn.style.background = '#0EA5E9';
        recordBtn.style.animation = 'none';
    }
    if (recordText) {
        recordText.textContent = 'Start Demo Recording';
    }
    
    // Show processing message
    showLoadingMessage('Analyzing voice patterns...');
    
    // Show results after processing delay
    setTimeout(() => {
        hideLoadingMessage();
        showDemoResults();
    }, 2500);
}

function startDemoWaveform() {
    const canvas = document.getElementById('demo-waveform');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    function animate() {
        if (!isDemoRecording) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0EA5E9';
        
        const time = Date.now() * 0.002;
        for (let x = 0; x < canvas.width; x += 4) {
            const amplitude = Math.sin(time + x * 0.02) * Math.random() * 30;
            const y = canvas.height / 2 + amplitude;
            ctx.fillRect(x, y, 2, 4);
        }
        
        demoAnimationId = requestAnimationFrame(animate);
    }
    
    animate();
}

function stopDemoWaveform() {
    if (demoAnimationId) {
        cancelAnimationFrame(demoAnimationId);
        demoAnimationId = null;
    }
}

function initializeDemoCanvas() {
    const canvas = document.getElementById('demo-waveform');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#666';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Click record to start demo', canvas.width / 2, canvas.height / 2);
}

function showDemoResults() {
    const results = document.getElementById('demo-results');
    const scoreValue = document.getElementById('demo-score');
    
    if (!results) return;
    
    // Generate demo score
    const demoScore = Math.floor(Math.random() * 20) + 75; // 75-95 range
    
    if (scoreValue) {
        scoreValue.textContent = demoScore;
    }
    
    // Show results with animation
    results.classList.remove('hidden');
    results.style.animation = 'fadeInUp 0.6s ease-out';
    
    showSuccessMessage(`Demo analysis complete! Health score: ${demoScore}/100. This is a simulated result for demonstration purposes.`);
}

// Home Page Functionality
function initializeHomePage() {
    setupHeroAnimations();
    setupCounterAnimations();
}

function setupHeroAnimations() {
    // Animate hero elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.hero-badge, .hero h1, .hero-description, .hero-actions, .hero-stats').forEach(el => {
        observer.observe(el);
    });
}

function setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isNumber = target.includes('+') || target.includes(',');
    
    if (isNumber) {
        const finalValue = parseInt(target.replace(/[^\d]/g, ''));
        let current = 0;
        const increment = finalValue / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalValue) {
                current = finalValue;
                clearInterval(timer);
            }
            
            if (target.includes('+')) {
                element.textContent = Math.floor(current).toLocaleString() + '+';
            } else if (target.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 30);
    }
}

// Theme Management
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        console.warn('Theme toggle button not found');
        return;
    }
    
    console.log('Setting up theme toggle...');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('neuroaid-theme') || 'light';
    document.documentElement.setAttribute('data-color-scheme', savedTheme);
    updateThemeToggleIcon(savedTheme);
    
    themeToggle.addEventListener('click', toggleTheme);
    console.log('Theme toggle listener added');
}

function toggleTheme() {
    console.log('Theme toggle clicked');
    
    const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-color-scheme', newTheme);
    localStorage.setItem('neuroaid-theme', newTheme);
    updateThemeToggleIcon(newTheme);
    
    showSuccessMessage(`Switched to ${newTheme} theme`);
    console.log('Theme changed to:', newTheme);
}

function updateThemeToggleIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Contact Page Functionality
function initializeContactPage() {
    console.log('Initializing contact page...');
    
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmission);
        console.log('Contact form listener added');
    }
    
    showSuccessMessage('Contact page loaded! Fill out the form to get in touch.');
}

function handleContactSubmission(e) {
    e.preventDefault();
    console.log('Contact form submitted');
    
    const inputs = e.target.querySelectorAll('input, textarea');
    const firstName = inputs[0]?.value || 'User';
    const lastName = inputs[1]?.value || '';
    const email = inputs[2]?.value || '';
    const organization = inputs[3]?.value || '';
    const message = inputs[4]?.value || '';
    
    console.log('Form data:', { firstName, lastName, email, organization, message });
    
    // Simulate form submission
    showLoadingMessage('Sending message...');
    
    setTimeout(() => {
        hideLoadingMessage();
        showSuccessMessage(`Thank you ${firstName}! Your message has been sent. We'll get back to you at ${email} soon.`);
        e.target.reset();
    }, 2000);
}

// Careers Page Functionality
function initializeCareersPage() {
    console.log('Initializing careers page...');
    
    const applyButtons = document.querySelectorAll('.job-card .btn--primary');
    
    applyButtons.forEach((button, index) => {
        button.addEventListener('click', () => handleJobApplication(index));
    });
    
    console.log(`Added listeners to ${applyButtons.length} job application buttons`);
    showSuccessMessage('Careers page loaded! Click any "Apply Now" button to start your application.');
}

function handleJobApplication(jobIndex) {
    const jobTitles = [
        'Senior ML Engineer - Voice AI',
        'Clinical Research Scientist',
        'Senior Product Manager',
        'Senior Frontend Engineer'
    ];
    
    const jobTitle = jobTitles[jobIndex] || 'Position';
    
    showLoadingMessage(`Processing application for ${jobTitle}...`);
    
    setTimeout(() => {
        hideLoadingMessage();
        showSuccessMessage(`Thank you for your interest in the ${jobTitle} position! Please send your resume to gyanshri68@gmail.com with "${jobTitle} Application" in the subject line.`);
    }, 2000);
}

// Pricing Page Functionality
function initializePricingPage() {
    console.log('Initializing pricing page...');
    
    const pricingButtons = document.querySelectorAll('.pricing-card .btn');
    
    pricingButtons.forEach((button, index) => {
        button.addEventListener('click', () => handlePricingAction(index));
    });
    
    console.log(`Added listeners to ${pricingButtons.length} pricing buttons`);
    showSuccessMessage('Pricing page loaded! Choose a plan that fits your needs.');
}

function handlePricingAction(planIndex) {
    const plans = ['Personal', 'Professional', 'Enterprise'];
    const actions = ['Get Started Free', 'Start Trial', 'Contact Sales'];
    
    const planName = plans[planIndex] || 'Plan';
    const actionText = actions[planIndex] || 'Action';
    
    console.log(`Pricing action: ${planName} - ${actionText}`);
    
    if (planIndex === 0) {
        // Personal plan - free signup
        showPage('demo');
        showSuccessMessage('Welcome to NeuroAid Personal! Try our demo to get started.');
    } else if (planIndex === 1) {
        // Professional plan - trial
        showSuccessMessage(`Starting ${planName} trial! Contact gyanshri68@gmail.com to complete setup.`);
    } else {
        // Enterprise plan - contact sales
        showPage('contact');
        showSuccessMessage('Redirected to contact page for Enterprise consultation.');
    }
}

// Event Listeners Setup
function setupEventListeners() {
    console.log('Setting up global event listeners...');
    
    // Global click handlers for buttons and links
    document.addEventListener('click', (e) => {
        // Handle feature links
        if (e.target.matches('.feature-link')) {
            e.preventDefault();
            const href = e.target.getAttribute('href');
            if (href && href.startsWith('#')) {
                showPage(href.substring(1));
            }
        }
        
        // Handle any remaining onclick attributes
        if (e.target.hasAttribute('onclick') || e.target.closest('[onclick]')) {
            const element = e.target.hasAttribute('onclick') ? e.target : e.target.closest('[onclick]');
            const onclick = element.getAttribute('onclick');
            
            if (onclick && onclick.includes('showPage')) {
                e.preventDefault();
                const match = onclick.match(/showPage\(['"]([^'"]+)['"]\)/);
                if (match && match[1]) {
                    showPage(match[1]);
                }
            }
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any modals or stop recording
            if (isDemoRecording) {
                stopDemoRecording();
            }
        }
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        initializePage();
    });
    
    console.log('Global event listeners setup complete');
}

// Scroll Animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .job-card, .resource-card, .team-card, .platform-feature');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Utility Functions
function showSuccessMessage(message) {
    // Remove any existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = 'toast toast-success';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10B981;
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.25);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        line-height: 1.4;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

function showErrorMessage(message) {
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = 'toast toast-error';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #EF4444;
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 10px 25px rgba(239, 68, 68, 0.25);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        line-height: 1.4;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

function showLoadingMessage(message) {
    // Remove existing loading
    const existingLoading = document.querySelector('.loading-overlay');
    if (existingLoading) {
        existingLoading.remove();
    }
    
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        backdrop-filter: blur(4px);
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: var(--color-surface);
        color: var(--color-text);
        padding: 32px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        max-width: 300px;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 40px;
        height: 40px;
        border: 3px solid var(--color-border);
        border-top: 3px solid #0EA5E9;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 16px auto;
    `;
    
    const text = document.createElement('p');
    text.textContent = message;
    text.style.cssText = `
        margin: 0;
        color: var(--color-text);
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-weight: 500;
    `;
    
    content.appendChild(spinner);
    content.appendChild(text);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    
    // Add spinner animation if not exists
    if (!document.querySelector('#spinner-styles')) {
        const style = document.createElement('style');
        style.id = 'spinner-styles';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
        `;
        document.head.appendChild(style);
    }
}

function hideLoadingMessage() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);
    }
}

// Export functions for global access
window.showPage = showPage;
window.showSuccessMessage = showSuccessMessage;
window.showErrorMessage = showErrorMessage;
window.toggleTheme = toggleTheme;

// Performance monitoring
const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
            console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
        }
    }
});

try {
    observer.observe({ entryTypes: ['navigation'] });
} catch (e) {
    console.log('Performance Observer not supported');
}

console.log('NeuroAid: JavaScript loaded successfully');