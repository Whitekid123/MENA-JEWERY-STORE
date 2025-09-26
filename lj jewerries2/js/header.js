// Toggle mobile menu for header
document.addEventListener('DOMContentLoaded', function(){
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  const navLinks = nav ? nav.querySelectorAll('a') : [];

  function setExpanded(val){
    if(!toggle) return;
    toggle.setAttribute('aria-expanded', String(val));
    header.classList.toggle('open', val);
  }

  if(toggle){
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      setExpanded(!expanded);
    });
  }

  navLinks.forEach(link=>{
    link.addEventListener('click', () => setExpanded(false));
  });

  const scrolledClassThreshold = 20;
  window.addEventListener('scroll', () => {
    if(window.scrollY > scrolledClassThreshold) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
});
