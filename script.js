// ===== Intersection Observer for animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.service, .project, section');
  animatedElements.forEach(el => observer.observe(el));
});

// ===== Gallery filtering & lightbox =====
(function(){
  const filters = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project');
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox.querySelector('img');

  // Add stagger animation to gallery items
  function animateProjects(visibleProjects) {
    visibleProjects.forEach((project, index) => {
      setTimeout(() => {
        project.style.opacity = '1';
        project.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  filters.forEach(btn=>btn.addEventListener('click',()=>{
    // Remove active class from all buttons
    filters.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    
    const f = btn.dataset.filter;
    const visibleProjects = [];
    
    projects.forEach(p=>{
      p.style.opacity = '0';
      p.style.transform = 'translateY(20px)';
      p.style.transition = 'all 0.3s ease';
      
      setTimeout(() => {
        if(f==='all' || p.dataset.category===f) {
          p.style.display='block';
          visibleProjects.push(p);
        } else {
          p.style.display='none';
        }
      }, 150);
    });
    
    setTimeout(() => animateProjects(visibleProjects), 200);
  }));

  // Enhanced lightbox functionality
  projects.forEach(p=>{
    p.addEventListener('click',()=>{
      const img = p.querySelector('img');
      lbImg.src = img.dataset.large || img.src;
      lbImg.alt = img.alt;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    });
    
    // Keyboard accessible open
    p.addEventListener('keydown', (e)=>{ 
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        p.click();
      }
    });
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src='';
    document.body.style.overflow = '';
  }

  lightbox.addEventListener('click', (e)=>{
    if(e.target === lightbox || e.target === lbImg) {
      closeLightbox();
    }
  });
  
  document.addEventListener('keydown', (e)=>{ 
    if(e.key==='Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
})();

// ===== Quote form (enhanced with better UX) =====
(function(){
  const form = document.getElementById('quoteForm');
  const msg = document.getElementById('formMsg');

  function serialize(form){
    const data = {};
    new FormData(form).forEach((v,k)=>data[k]=v);
    return data;
  }

  // Enhanced form validation with real-time feedback
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearErrors);
  });

  function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.style.borderColor = '';
    
    if (field.hasAttribute('required') && !value) {
      field.style.borderColor = '#ef4444';
      return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
      field.style.borderColor = '#ef4444';
      return false;
    }
    
    field.style.borderColor = '#22c55e';
    return true;
  }

  function clearErrors(e) {
    e.target.style.borderColor = '';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    msg.textContent = '';
    msg.style.color = '';
    
    // Validate all fields
    let isValid = true;
    inputs.forEach(input => {
      if (!validateField({target: input})) {
        isValid = false;
      }
    });
    
    if(!form.checkValidity() || !isValid){
      msg.textContent = 'Please complete all required fields correctly.';
      msg.style.color = '#ef4444';
      form.reportValidity();
      
      // Smooth scroll to first error
      const firstError = form.querySelector('input[style*="rgb(239, 68, 68)"], select[style*="rgb(239, 68, 68)"], textarea[style*="rgb(239, 68, 68)"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
      return;
    }

    const payload = serialize(form);

    // Enhanced UX: disable and animate button
    const btn = form.querySelector('button[type="submit"]');
    const old = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="loading"></span> Sending...';
    btn.style.opacity = '0.7';

    try{
      // Simulate API call with progress indication
      await new Promise(resolve => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          if (progress >= 100) {
            clearInterval(interval);
            resolve();
          }
        }, 90);
      });

      // Success state
      msg.style.color = '#22c55e';
      msg.innerHTML = '✅ Thank you! Your request has been submitted successfully.<br>We will contact you within 48 hours.';
      
      // Reset form with smooth transition
      setTimeout(() => {
        form.style.transition = 'opacity 0.3s ease';
        form.style.opacity = '0.5';
        setTimeout(() => {
          form.reset();
          inputs.forEach(input => input.style.borderColor = '');
          form.style.opacity = '1';
        }, 300);
      }, 2000);
      
    } catch(err) {
      console.error(err);
      msg.style.color = '#ef4444';
      msg.innerHTML = '❌ An error occurred. Please try again or contact us directly at contact@coupal-construction.com';
    } finally {
      btn.disabled = false;
      btn.innerHTML = old;
      btn.style.opacity = '1';
    }
  });
})();

// ===== Smooth scroll for navigation links =====
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// ===== Header scroll effect =====
let lastScrollY = window.scrollY;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 100) {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.backdropFilter = 'blur(20px)';
  } else {
    header.style.background = 'var(--glass-card)';
    header.style.backdropFilter = 'blur(20px)';
  }
  
  lastScrollY = currentScrollY;
});

// ===== Parallax effect for hero background =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});
