/* Kabuwol Motors — Interactions */
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
document.getElementById('year').textContent = new Date().getFullYear();

const header = document.querySelector('.site-header');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a[href^="#"]');
function onScroll(){
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 10);
  let current = '';
  sections.forEach(sec => { if (y >= sec.offsetTop - 120) current = sec.id; });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + current));
}
window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } }), {threshold:0.12});
revealEls.forEach(el => io.observe(el));

const counters = document.querySelectorAll('[data-count]');
const ioCount = new IntersectionObserver(es => es.forEach(e => {
  if(e.isIntersecting){
    const el = e.target; const target = +el.dataset.count;
    let start = 0; const dur = 1600; const t0 = performance.now();
    function tick(now){ const p = Math.min((now-t0)/dur,1); const ease = 1-Math.pow(1-p,3); el.textContent = Math.floor(ease*target).toLocaleString(); if(p<1) requestAnimationFrame(tick); }
    requestAnimationFrame(tick); ioCount.unobserve(el);
  }
}), {threshold:0.5});
counters.forEach(c => ioCount.observe(c));

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.card');
function applyFilter(cat){ cards.forEach(card => { const cats = card.dataset.cat.split(' '); card.style.display = (cat==='all' || cats.includes(cat)) ? '' : 'none'; }); }
filters.forEach(f => f.addEventListener('click', () => { filters.forEach(x => x.classList.remove('active')); f.classList.add('active'); applyFilter(f.dataset.filter); }));

const form = document.getElementById('inquiryForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', function(e){
  e.preventDefault();
  const d = new FormData(form);
  const text = `Hi Kabuwol Motors, I'd like an inquiry.\n\nName: ${d.get('name')}\nPhone: ${d.get('phone')}\nLooking for: ${d.get('interest')}\nMessage: ${d.get('message')||'N/A'}`;
  note.textContent = 'Opening WhatsApp to send your inquiry...';
  window.open('https://wa.me/2348027249014?text=' + encodeURIComponent(text), '_blank');
});
