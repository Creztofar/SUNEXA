(() => {
  'use strict';

  const path = (window.location.pathname.replace(/\/+$/, '') || '/');
  const supported = new Set([
    '/start-project', '/contact',
    '/services/web-development', '/services/software-development',
    '/services/business-automation', '/services/ai-solutions',
    '/services/web-maintenance', '/services/domain-hosting'
  ]);
  if (!supported.has(path)) return;

  window.SUNEXA_DEDICATED_ROUTE = true;
  document.body.classList.add('route-mode');
  document.body.classList.remove('is-loading');
  document.body.classList.add('ready');
  ['#loader', '#nav', '#menu', 'main', 'footer', '#toast', '#previewModal'].forEach(selector => {
    const node = document.querySelector(selector);
    if (node) node.hidden = true;
  });

  const mount = document.getElementById('routePage');
  if (!mount) return;
  mount.hidden = false;

  const esc = value => String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const slugToLabel = {
    'web-development':'Website Development',
    'software-development':'Custom Software',
    'business-automation':'Business Automation',
    'ai-solutions':'AI Solutions',
    'web-maintenance':'Website Maintenance',
    'domain-hosting':'Domain & Hosting'
  };
  const serviceOptions = [
    'Website Development','Website Redesign','Custom Software','Business Automation','AI Solutions',
    'WhatsApp Automation','API Integrations','Website Maintenance','Domain & Hosting','Multiple Services','Not Sure — Need Guidance'
  ];
  const plan = new URLSearchParams(window.location.search).get('plan') || sessionStorage.getItem('sunexa_plan') || '';
  const requestedService = new URLSearchParams(window.location.search).get('service') || '';

  function header() {
    return `<header class="route-header">
      <a class="brand" href="/" aria-label="SUNEXA home">
        <span class="brand__mark" aria-hidden="true"><svg viewBox="0 0 24 24"><text x="12" y="17.5" text-anchor="middle" font-family="Georgia,serif" font-size="17" fill="currentColor">S</text></svg></span>
        <span><span class="brand__txt">SUNEXA</span><span class="brand__sub">IDEAS TO IMPACT</span></span>
      </a>
      <div class="route-header__actions"><a class="route-back" href="/">← Back to home</a><a class="route-btn primary" href="/start-project">Start a Project</a></div>
    </header>`;
  }

  function footer() {
    return `<footer class="route-footer"><span>© 2026 SUNEXA · All rights reserved</span><span>Websites · Software · Automation · AI · Care</span></footer>`;
  }

  function shell(content, title='SUNEXA — Ideas to Impact') {
    mount.innerHTML = `<div class="route-page"><div class="route-shell">${header()}${content}${footer()}</div></div>`;
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = 'SUNEXA builds thoughtful websites, software, automation and AI systems for ambitious businesses.';
  }

  const serviceData = {
    'web-development': {
      eyebrow:'01 · Website Development', title:'Websites that make your business easier to choose.',
      lede:'A clear, fast and credible digital home built around how your customers actually decide.',
      intro:'SUNEXA combines strategy, content structure, visual direction and dependable implementation into websites that do more than look polished. They explain your value, answer the right questions and make the next step obvious.',
      deliverables:['Positioning and page architecture','Responsive visual design for every screen','Conversion-focused copy structure and calls to action','Analytics, SEO foundations and launch support'],
      fit:'For new businesses, local teams, hospitality brands and established companies ready to outgrow a template.'
    },
    'software-development': {
      eyebrow:'02 · Custom Software', title:'The tool your team keeps wishing existed.',
      lede:'Custom portals, dashboards and operational tools that remove friction from the work behind the scenes.',
      intro:'When spreadsheets, inboxes and disconnected tools start slowing the business down, we map the real workflow and build the smallest useful system around it. You get software that your team can understand, own and improve.',
      deliverables:['Workflow mapping and technical scope','Client portals, dashboards and internal tools','Secure integrations, APIs, payments and data models','Documentation, handover and ongoing support'],
      fit:'For teams with a repeatable process, a growing operation or a customer experience that needs better infrastructure.'
    },
    'business-automation': {
      eyebrow:'03 · Business Automation', title:'Less repetition. More room for the work that matters.',
      lede:'Connect the tools you already use and automate the handoffs that quietly consume your week.',
      intro:'Automation should feel calm, not complicated. We identify repetitive tasks across enquiries, follow-ups, bookings, reporting and operations, then design practical flows that save time without taking control away from your team.',
      deliverables:['Automation opportunity audit','Lead capture, qualification and follow-up flows','CRM, forms, email, WhatsApp and calendar connections','Monitoring, fallback paths and team documentation'],
      fit:'For owner-led businesses and teams that are busy enough to need leverage, but not interested in buying a maze of tools.'
    },
    'ai-solutions': {
      eyebrow:'04 · AI Solutions', title:'Useful AI, grounded in your actual business.',
      lede:'Thoughtful assistants and workflows that help your team find, write, sort and respond faster.',
      intro:'We focus on AI where it can create a measurable improvement: answering common questions, organising information, drafting useful first passes or helping a team work through a repeatable process. Human judgement stays in the loop where it matters.',
      deliverables:['Use-case and data-readiness assessment','Knowledge assistants and internal copilots','AI-assisted content, support and operations workflows','Guardrails, review steps and practical handover'],
      fit:'For businesses with valuable information, recurring questions or a team ready to experiment responsibly.'
    },
    'web-maintenance': {
      eyebrow:'05 · Website Maintenance', title:'A website that stays trustworthy after launch.',
      lede:'Reliable care for updates, backups, security, content changes and the small fixes that keep confidence intact.',
      intro:'Your website should not become a forgotten technical chore. SUNEXA provides a straightforward care layer so your team can request changes, keep systems current and know who is watching the details.',
      deliverables:['Updates, backups and security checks','Content, layout and small feature changes','Uptime, performance and broken-link checks','Clear monthly reporting and responsive support'],
      fit:'For businesses that want an accountable technical partner without hiring a full in-house team.'
    },
    'domain-hosting': {
      eyebrow:'06 · Domain & Hosting', title:'The infrastructure underneath, handled properly.',
      lede:'Managed domain, hosting, SSL, DNS, email routing and renewal support with your accounts kept in your name.',
      intro:'Good infrastructure is quiet. We set up the foundations, keep the access clear and take care of the recurring details that can otherwise interrupt a business at the worst possible time.',
      deliverables:['Domain registration and renewal management','Managed hosting, SSL, CDN and DNS','Business email and mail-routing support','Ownership documentation and renewal reminders'],
      fit:'For businesses that want their digital foundations looked after without giving up control.'
    }
  };

  function servicePage(slug) {
    const data = serviceData[slug];
    shell(`<section class="route-hero"><p class="route-eyebrow">${esc(data.eyebrow)}</p><h1>${esc(data.title)}</h1><p class="route-hero__lede">${esc(data.lede)}</p><div class="route-hero__actions"><a class="route-btn primary" href="/start-project?service=${slug}">Enquire about this service →</a><a class="route-btn" href="/contact">Talk to SUNEXA</a></div></section>
      <section class="route-section route-grid"><div><h2>Built around the real work.</h2><p>${esc(data.intro)}</p><p>${esc(data.fit)}</p></div><aside class="route-panel"><p class="route-eyebrow">What you can expect</p><h3>A considered system, not a pile of features.</h3><p>We keep the scope clear, the language human and the next step visible. You will know what is being built, why it matters and what happens after launch.</p></aside></section>
      <section class="route-section"><div class="route-section__head"><h2>What we can shape together.</h2><p>Start with the outcome you need. We will help define the right level of build and support.</p></div><div class="route-list">${data.deliverables.map((item,i)=>`<article><b>0${i+1}</b><h3>${esc(item)}</h3><p>Planned with your context, customers and existing tools in mind.</p></article>`).join('')}</div><div class="route-cta"><p>Ready when the problem is clear.</p><a class="route-btn primary" href="/start-project?service=${slug}">Start your enquiry →</a></div></section>`, `SUNEXA — ${data.eyebrow.split('·')[1].trim()}`);
  }

  function field(label, id, type='text', placeholder='', options='') {
    if (type === 'select') return `<div class="enquiry-field" data-field="${id}"><label for="${id}">${label}</label><select id="${id}" name="${id}"><option value="">Select one…</option>${options}</select><span class="field-error" data-error-for="${id}"></span></div>`;
    if (type === 'textarea') return `<div class="enquiry-field full" data-field="${id}"><label for="${id}">${label}</label><textarea id="${id}" name="${id}" placeholder="${esc(placeholder)}"></textarea><span class="field-error" data-error-for="${id}"></span></div>`;
    return `<div class="enquiry-field" data-field="${id}"><label for="${id}">${label}</label><input id="${id}" name="${id}" type="${type}" placeholder="${esc(placeholder)}"><span class="field-error" data-error-for="${id}"></span></div>`;
  }

  function enquiryPage(isContact=false) {
    const title = isContact ? 'Tell us where you want to go next.' : "Let's Build Something That Matters.";
    const supporting = isContact ? 'Have a project, a problem or a better way of working in mind? Tell us what is happening and we will help you find the right next step.' : 'Tell us what you\'re building, what your business needs and what you want to achieve.';
    const options = serviceOptions.map(item => `<label class="check-option"><input type="checkbox" name="services" value="${esc(item)}"><span>${esc(item)}</span></label>`).join('');
    shell(`<section class="route-hero"><p class="route-eyebrow">${isContact ? 'Contact SUNEXA' : 'Project enquiry'}</p><h1>${esc(title)}</h1><p class="route-hero__lede">${esc(supporting)}</p></section>
      <section class="route-section"><div class="route-grid"><div><div class="route-panel"><p class="route-eyebrow">A few useful questions</p><h2>Good work starts with a clear picture.</h2><p>Share as much context as you have. You do not need a finished brief. We will read the details, ask sensible questions and reply with an honest recommendation.</p><div class="route-steps"><div class="route-step-card"><strong>01</strong><div><h3>Understand</h3><p>Your business, audience and the problem you want to solve.</p></div></div><div class="route-step-card"><strong>02</strong><div><h3>Shape</h3><p>The right combination of website, software, automation or care.</p></div></div><div class="route-step-card"><strong>03</strong><div><h3>Move forward</h3><p>A practical scope, realistic timing and a clear next conversation.</p></div></div></div></div></div>
      <div class="route-panel"><form class="enquiry-form" id="routeEnquiryForm" novalidate data-api-endpoint="https://api.web3forms.com/submit"><input class="hp-route" id="routeWebsite" name="website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true"><div class="enquiry-progress" aria-label="Form progress"><i class="on"></i><i></i><i></i><i></i></div>${plan ? `<div class="plan-context"><span>Selected plan: <strong>${esc(plan)}</strong></span><button type="button" id="clearPlan">Clear</button></div>` : ''}
        <section class="form-step on" data-step="0"><h2 class="form-step__title">First, tell us about you.</h2><p class="form-step__hint">Required fields are marked by the validation message if left incomplete.</p><div class="enquiry-fields">${field('Full Name','rq-name','text','Your full name')}${field('Business Name','rq-business','text','Your business or brand')}${field('Email Address','rq-email','email','you@example.com')}${field('Phone / WhatsApp Number','rq-phone','tel','+91 …')}${field('Business Industry','rq-industry','text','Restaurant, real estate, coaching…')}</div></section>
        <section class="form-step" data-step="1"><h2 class="form-step__title">What should we build or improve?</h2><p class="form-step__hint">Choose everything that feels relevant. We can help narrow it down later.</p><div class="enquiry-field full" data-field="rq-services"><label>Required Services</label><div class="check-grid">${options}</div><span class="field-error" data-error-for="rq-services"></span></div><div class="enquiry-fields">${field('Project Description','rq-description','textarea','What are you hoping to create or change?')}${field('Current Website URL (optional)','rq-url','url','https://…')}${field('Business Problem','rq-problem','textarea','What is currently costing you time, trust or opportunities?')}${field('What would you like to automate?','rq-automation','textarea','Enquiries, follow-ups, bookings, reporting…')}</div></section>
        <section class="form-step" data-step="2"><h2 class="form-step__title">When and at what level?</h2><p class="form-step__hint">These ranges help us recommend a realistic first step, not lock you into a package.</p><div class="enquiry-fields">${field('Preferred Timeline','rq-timeline','select','','<option>As soon as possible</option><option>Within 1 month</option><option>1–3 months</option><option>3+ months</option><option>Just exploring</option>')}${field('Budget Range','rq-budget','select','','<option>Under ₹10,000</option><option>₹10,000–₹25,000</option><option>₹25,000–₹50,000</option><option>₹50,000+</option><option>Not Sure Yet</option>')}</div></section>
        <section class="form-step" data-step="3"><h2 class="form-step__title">Review your enquiry.</h2><p class="form-step__hint">Check the details before sending. Nothing is submitted until you press Send Enquiry.</p><div class="review-card" id="routeReview"></div></section>
        <div class="enquiry-nav"><button class="route-btn" type="button" id="routeBack" hidden>Back</button><div class="enquiry-nav__right"><button class="route-btn" type="button" id="routeContinue">Continue</button><button class="route-btn primary" type="button" id="routeReviewBtn" hidden>Review</button><button class="route-btn primary" type="submit" id="routeSubmit" hidden>Send Enquiry</button></div></div><div class="enquiry-status" id="routeStatus" role="status" aria-live="polite"></div></form></div></div></section>`, `SUNEXA — ${isContact ? 'Contact' : 'Start a Project'}`);
    bindEnquiry(isContact);
  }

  function bindEnquiry(isContact) {
    const form = document.getElementById('routeEnquiryForm');
    if (!form) return;
    const steps = [...form.querySelectorAll('.form-step')];
    const progress = [...form.querySelectorAll('.enquiry-progress i')];
    const back = document.getElementById('routeBack'), cont = document.getElementById('routeContinue'), reviewBtn = document.getElementById('routeReviewBtn'), submit = document.getElementById('routeSubmit');
    let current = 0;
    const value = id => (document.getElementById(id)?.value || '').trim();
    const selected = () => [...form.querySelectorAll('input[name="services"]:checked')].map(el => el.value);
    const showError = (id, message) => { const fieldEl = form.querySelector(`[data-field="${id}"]`); if (!fieldEl) return; fieldEl.classList.add('invalid'); const msg = form.querySelector(`[data-error-for="${id}"]`); if (msg) msg.textContent = message; };
    const clearErrors = () => form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
    const validEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);
    const validPhone = v => /^[+()\d\s.-]{7,25}$/.test(v);
    function validate(step) {
      clearErrors(); const bad=[];
      if (step===0) { [['rq-name','Please enter your full name.'],['rq-business','Please enter your business name.'],['rq-email','Enter a valid email address.'],['rq-phone','Enter a valid phone or WhatsApp number.'],['rq-industry','Tell us your business industry.']].forEach(([id,msg])=>{ const v=value(id); const ok=id==='rq-email'?validEmail(v):id==='rq-phone'?validPhone(v):!!v; if(!ok){showError(id,msg);bad.push(id);} }); }
      if (step===1) { if(!selected().length){showError('rq-services','Choose at least one service so we know where to start.');bad.push('rq-services');} [['rq-description','Give us a short project description.'],['rq-problem','Tell us the business problem you want to solve.']].forEach(([id,msg])=>{if(!value(id)){showError(id,msg);bad.push(id);}}); }
      if (step===2) { ['rq-timeline','rq-budget'].forEach(id=>{if(!value(id)){showError(id,'Please choose an option.');bad.push(id);}}); }
      if (bad.length){ const first=form.querySelector(`[data-field="${bad[0]}"] input, [data-field="${bad[0]}"] textarea, [data-field="${bad[0]}"] select`); first?.focus(); return false; } return true;
    }
    function summary() {
      const rows = [['Full Name',value('rq-name')],['Business',value('rq-business')],['Email',value('rq-email')],['Phone',value('rq-phone')],['Industry',value('rq-industry')],['Services',selected().join(', ')],['Description',value('rq-description')],['Current URL',value('rq-url')||'Not provided'],['Business Problem',value('rq-problem')],['Automation',value('rq-automation')||'Not specified'],['Timeline',value('rq-timeline')],['Budget',value('rq-budget')],['Selected Plan',plan||'No plan selected']];
      document.getElementById('routeReview').innerHTML = rows.map(([k,v])=>`<div class="review-row"><span>${esc(k)}</span><span>${esc(v)}</span></div>`).join('');
    }
    function show(step) { current=step; steps.forEach((el,i)=>el.classList.toggle('on',i===step)); progress.forEach((el,i)=>el.classList.toggle('on',i<=step)); back.hidden=step===0; cont.hidden=step>=2; reviewBtn.hidden=step!==2; submit.hidden=step!==3; }
    cont.addEventListener('click',()=>{if(validate(current)){show(current+1);}});
    reviewBtn.addEventListener('click',()=>{if(validate(2)){summary();show(3);}});
    back.addEventListener('click',()=>show(Math.max(0,current-1)));
    document.getElementById('clearPlan')?.addEventListener('click',()=>{sessionStorage.removeItem('sunexa_plan'); location.href=location.pathname;});
    form.querySelectorAll('input,textarea,select').forEach(el=>el.addEventListener('input',()=>el.closest('.enquiry-field')?.classList.remove('invalid')));
    const serviceMatch = requestedService || (path.startsWith('/services/') ? path.split('/').pop() : '');
    const preselect = slugToLabel[serviceMatch];
    if(preselect){ const checkbox=[...form.querySelectorAll('input[name="services"]')].find(el=>el.value===preselect); if(checkbox) checkbox.checked=true; }
    if(plan){ const planMap={Essential:'Website Development',Studio:'Website Development',Bespoke:'Custom Software',Custom:'Multiple Services'}; const checkbox=[...form.querySelectorAll('input[name="services"]')].find(el=>el.value===planMap[plan]); if(checkbox) checkbox.checked=true; }
    form.addEventListener('submit',async event=>{
      event.preventDefault(); if(!validate(2)) return; summary();
      const status=document.getElementById('routeStatus'); submit.disabled=true; submit.textContent='Sending…'; status.className='enquiry-status on'; status.textContent='Sending your enquiry securely…';
      const accessKey='dfcab849-7274-401b-8879-d042200c8f30';
      const payload={access_key:accessKey,subject:'New SUNEXA Project Enquiry',from_name:'SUNEXA Website',name:value('rq-name'),business:value('rq-business'),email:value('rq-email'),phone:value('rq-phone'),industry:value('rq-industry'),services:selected().join(', '),description:value('rq-description'),website:value('rq-url'),problem:value('rq-problem'),automation:value('rq-automation'),timeline:value('rq-timeline'),budget:value('rq-budget'),selected_plan:plan||'None',replyto:value('rq-email'),botcheck:value('routeWebsite')};
      try { const response=await fetch(form.dataset.apiEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}); const result=await response.json().catch(()=>({})); if(!response.ok||result.success!==true) throw new Error(result.message||'The enquiry could not be submitted.'); status.className='enquiry-status on'; status.textContent='Enquiry submitted successfully. SUNEXA will follow up shortly.'; form.querySelectorAll('input,textarea,select,button').forEach(el=>{if(el.id!=='routeStatus') el.disabled=true;}); }
      catch(error){ status.className='enquiry-status on error'; status.textContent=error.message||'The enquiry could not be sent right now. Please try again shortly.'; submit.disabled=false; submit.textContent='Send Enquiry'; }
    });
  }

  if (path === '/start-project') enquiryPage(false);
  else if (path === '/contact') enquiryPage(true);
  else servicePage(path.split('/').pop());
})();
