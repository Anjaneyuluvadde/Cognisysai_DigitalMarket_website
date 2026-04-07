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
function submitForm() {
  const fn = document.getElementById('fn'),
    ln = document.getElementById('ln'),
    em = document.getElementById('em'),
    ph = document.getElementById('ph'),
    svc = document.getElementById('svc'),
    msg = document.getElementById('msg'),
    fMsg = document.getElementById('fMsg');

  if (!fn || !em || !ph || !fMsg) return;

  // Reset message
  fMsg.style.color = 'var(--orange)';
  fMsg.textContent = 'Processing...';

  // Validation
  if (!fn.value.trim() || !em.value.trim() || !ph.value.trim()) {
    fMsg.style.color = '#f87171';
    fMsg.textContent = '⚠ Please fill in all required fields (Name, Email, Phone).';
    return;
  }

  if (!em.value.includes('@')) {
    fMsg.style.color = '#f87171';
    fMsg.textContent = '⚠ Please enter a valid email address.';
    return;
  }

  // Pre-fill data for WhatsApp
  const fullMsg = `New Inquiry from Cognisys AI Website:
Name: ${fn.value} ${ln.value}
Email: ${em.value}
Phone: ${ph.value}
Service: ${svc.value || 'Not specified'}
Message: ${msg.value || 'No message'}`;

  // 1. WhatsApp Notification (Instant to Admin)
  const adminPhone = '916300447384';
  const waUrl = `https://api.whatsapp.com/send?phone=${adminPhone}&text=${encodeURIComponent(fullMsg)}`;

  // 2. Email Notification Placeholder (Formspree)
  // To activate email: replace 'YOUR_FORM_ID' with your real Formspree ID
  const formID = 'YOUR_FORM_ID'; 
  if (formID !== 'YOUR_FORM_ID') {
    fetch(`https://formspree.io/f/${formID}`, {
      method: 'POST',
      body: JSON.stringify({
        name: fn.value + ' ' + ln.value,
        email: em.value,
        phone: ph.value,
        service: svc.value,
        message: msg.value
      }),
      headers: { 'Accept': 'application/json' }
    }).catch(err => console.error('Email error:', err));
  }

  // Show success and open WhatsApp
  fMsg.style.color = 'var(--orange)';
  fMsg.textContent = '✓ Success! Redirecting to WhatsApp to finalize your request...';

  setTimeout(() => {
    window.open(waUrl, '_blank');
    // Clear form
    [fn, ln, em, ph, msg].forEach(el => { if (el) el.value = ''; });
    if (svc) svc.selectedIndex = 0;
  }, 1000);
}
