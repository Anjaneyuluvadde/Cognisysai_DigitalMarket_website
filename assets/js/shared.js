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
    pkg = document.getElementById('pkg'),
    plat = document.getElementById('plat'),
    biz = document.getElementById('biz'),
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
Name: ${fn.value} ${ln ? ln.value : ''}
Email: ${em.value}
Phone: ${ph.value}
Service: ${svc ? svc.value : 'Not specified'}
Message: ${msg ? msg.value : 'No message'}`;

  // 1. WhatsApp Notification (Instant to Admin)
  const adminPhone = '916300447384';
  const waUrl = `https://api.whatsapp.com/send?phone=${adminPhone}&text=${encodeURIComponent(fullMsg)}`;

  // 2. Email Notification (FormSubmit.co)
  // We send this to media@cognisysai.com using FormSubmit's AJAX endpoint.
  const formData = new FormData();
  formData.append('name', fn.value + ' ' + (ln ? ln.value : ''));
  formData.append('email', em.value);
  formData.append('phone', ph.value);
  formData.append('company', biz ? biz.value : 'N/A');
  formData.append('package', pkg ? pkg.value : 'N/A');
  formData.append('platform', plat ? plat.value : 'N/A');
  formData.append('service', svc ? svc.value : 'N/A');
  formData.append('message', msg ? msg.value : 'N/A');
  formData.append('_subject', 'New Website Inquiry - Cognisys AI');
  formData.append('_captcha', 'false'); // Disable captcha for smoother AJAX flow

  fetch('https://formsubmit.co/ajax/media@cognisysai.com', {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if (response.ok) console.log('Email sent successfully via FormSubmit');
    else console.error('Email failed with status:', response.status);
  })
  .catch(err => console.error('Email error:', err));

  // Show success and open WhatsApp
  fMsg.style.color = 'var(--orange)';
  fMsg.textContent = '✓ Success! Redirecting to WhatsApp to finalize your request...';

  setTimeout(() => {
    window.open(waUrl, '_blank');
    // Clear form
    [fn, ln, em, ph, biz, msg].forEach(el => { if (el) el.value = ''; });
    if (svc) svc.selectedIndex = 0;
    if (pkg) pkg.selectedIndex = 0;
    if (plat) plat.selectedIndex = 0;
  }, 1000);
}
