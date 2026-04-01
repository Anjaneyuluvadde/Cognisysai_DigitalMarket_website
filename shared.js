/* ── CURSOR ── */
(function(){
  const cur=document.getElementById('cur'),cr=document.getElementById('cr');
  if(!cur||!cr)return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  (function a(){
    cur.style.left=mx+'px';cur.style.top=my+'px';
    rx+=(mx-rx)*.12;ry+=(my-ry)*.12;
    cr.style.left=rx+'px';cr.style.top=ry+'px';
    requestAnimationFrame(a);
  })();
  document.querySelectorAll('a,button,.svc-card,.pkg-card,.t-card,.cli-row,.ps-item').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cr.style.width='52px';cr.style.height='52px';cr.style.opacity='.25';cur.style.transform='translate(-50%,-50%) scale(1.5)';});
    el.addEventListener('mouseleave',()=>{cr.style.width='36px';cr.style.height='36px';cr.style.opacity='.45';cur.style.transform='translate(-50%,-50%) scale(1)';});
  });
})();

/* ── NAV SCROLL ── */
window.addEventListener('scroll',function(){
  const n=document.getElementById('navbar');
  if(n) n.classList.toggle('scrolled',window.scrollY>60);
});

/* ── HAMBURGER ── */
var hambBtn=document.getElementById('hamburger');
var mobMenu=document.getElementById('mobMenu');
var mobClose=document.getElementById('mobClose');
if(hambBtn) hambBtn.addEventListener('click',function(){if(mobMenu)mobMenu.classList.add('open');});
if(mobClose) mobClose.addEventListener('click',closeMenu);
function closeMenu(){if(mobMenu)mobMenu.classList.remove('open');}

/* ── REVEAL ── */
var ro=new IntersectionObserver(function(e){
  e.forEach(function(x){if(x.isIntersecting)x.target.classList.add('visible');});
},{threshold:.1});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(function(r){ro.observe(r);});

/* ── COUNTER ── */
function runCnt(el){
  var t=+el.dataset.target;
  if(isNaN(t))return;
  var dur=1800,s=performance.now();
  (function u(n){
    var p=Math.min((n-s)/dur,1),e2=1-Math.pow(1-p,3);
    el.textContent=Math.floor(e2*t)+(p===1?'+':'');
    if(p<1)requestAnimationFrame(u);
    else el.textContent=t+'+';
  })(s);
}
var co=new IntersectionObserver(function(e){
  e.forEach(function(x){if(x.isIntersecting){runCnt(x.target);co.unobserve(x.target);}});
},{threshold:.6});
document.querySelectorAll('[data-target]').forEach(function(el){co.observe(el);});

/* ── SMOOTH SCROLL (same-page anchors only) ── */
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click',function(e){
    var t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}
  });
});

/* ── CONTACT FORM ── */
function submitForm(){
  var e=document.getElementById('em');
  var m=document.getElementById('fMsg');
  if(!e||!m)return;
  var v=e.value.trim();
  if(!v||!v.includes('@')){m.style.color='#f87171';m.textContent='⚠ Please enter a valid email address.';return;}
  m.style.color='var(--orange)';m.textContent='✓ Thank you! We\'ll reach out within 24 hours with your free audit.';
  e.value='';
}