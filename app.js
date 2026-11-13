(() => {
  'use strict';
  const KEYS = { requests: 'neighbourfix_requests_v1', providers: 'neighbourfix_providers_v1' };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const read = key => { try { const value = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(value) ? value : []; } catch { return []; } };
  const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } };
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
  const dateLabel = value => { try { return new Date(value).toLocaleDateString('en-ZA', { day:'numeric', month:'short', year:'numeric' }); } catch { return ''; } };
  const showToast = message => { const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); window.setTimeout(() => toast.classList.remove('show'), 2800); };
  const setMessage = (element, text) => { element.textContent = text; element.classList.add('show'); };
  $('#year').textContent = new Date().getFullYear();

  const bookingForm = $('#booking-form');
  bookingForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!bookingForm.reportValidity()) return;
    const data = Object.fromEntries(new FormData(bookingForm).entries());
    const requests = read(KEYS.requests);
    requests.unshift({ id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, ...data, status:'New', createdAt:new Date().toISOString() });
    if (!write(KEYS.requests, requests)) { setMessage($('#booking-message'), 'Could not save this demo request in your browser. Check storage settings and try again.'); return; }
    bookingForm.reset();
    setMessage($('#booking-message'), 'Thanks! Your request is saved in this browser demo. The real-service follow-up workflow is not connected yet.');
    renderDashboard();
  });

  $$('.service-card').forEach(button => button.addEventListener('click', () => {
    const select = $('select[name="service"]', bookingForm);
    select.value = button.dataset.service;
    $('#book').scrollIntoView({ behavior:'smooth' });
    window.setTimeout(() => $('input[name="name"]', bookingForm).focus({ preventScroll:true }), 450);
  }));

  const providerDialog = $('#provider-dialog');
  $('#provider-open').addEventListener('click', () => providerDialog.showModal());
  $$('.dialog-close').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  $$('.dialog').forEach(dialog => dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); }));
  $('#provider-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    const providers = read(KEYS.providers);
    providers.unshift({ id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, ...data, status:'New', createdAt:new Date().toISOString() });
    if (!write(KEYS.providers, providers)) { setMessage($('#provider-message'), 'Could not save this demo application in your browser.'); return; }
    form.reset();
    setMessage($('#provider-message'), 'Thanks for your interest! Your application is saved in this browser demo; no one has been notified.');
    renderDashboard();
  });

  const policies = {
    privacy: {
      title:'Privacy notice', content:`<p><strong>Prototype notice — replace and obtain legal review before launch.</strong> NeighbourFix ("we") is a South African local-services marketplace prototype. This notice describes how the demo handles details you enter.</p><h3>Information and purpose</h3><p>Customer request and provider interest forms ask for contact details, service/area information and other details you choose to provide. In this prototype, form submissions are stored in local storage in the browser you are using. The demo does not send them to a server or notify the NeighbourFix team.</p><h3>Sharing and real bookings</h3><p>This prototype does not match users, make bookings, process payments, conduct provider checks or share information with providers. A future live service would need to explain any sharing needed to respond to your request and obtain any required permissions.</p><h3>Access, deletion and security</h3><p>Anyone with access to this browser profile may be able to view locally stored demo submissions. Do not enter sensitive information. Use the "Clear this browser’s demo data" control in the dashboard to remove demo submissions from this browser. That action does not remove browser backups or other copies.</p><h3>Your choices and contact</h3><p>For a real service, provide an accountable privacy contact and a process for access, correction, deletion and complaints under applicable law, including POPIA. Contact: [add a monitored business email and address before launch].</p><h3>Updates</h3><p>This prototype notice may change. A deployed service must publish an accurate, reviewed privacy notice and implement appropriate security safeguards.</p>`
    },
    terms: {
      title:'Prototype terms', content:`<p><strong>This is a demo, not a live marketplace.</strong> NeighbourFix is currently a front-end prototype. Submitting a form only stores information in the current browser; it does not create a booking, notify an operator, accept payment, or guarantee a provider.</p><h3>Prices and service providers</h3><p>No service price is quoted or agreed by this demo. In a live marketplace, the customer and provider must agree the scope, timing and price before work starts. Any future platform role, fees, cancellations, complaints and provider checks must be explained clearly in reviewed terms.</p><h3>Safety and disputes</h3><p>Do not use the prototype to arrange urgent, emergency, regulated or safety-critical work. No provider verification, insurance cover, customer support or dispute service is provided by this prototype.</p><h3>Future live service</h3><p>Before operating a real marketplace, the business must publish appropriate terms, explain whether it acts as an intermediary or service provider, and review its obligations under applicable South African law. Contact: [add a monitored business email before launch].</p>`
    }
  };
  const policyDialog = $('#policy-dialog');
  $$('[data-open-policy]').forEach(button => button.addEventListener('click', () => {
    const policy = policies[button.dataset.openPolicy];
    if (!policy) return;
    $('#policy-title').textContent = policy.title;
    $('#policy-content').innerHTML = policy.content;
    providerDialog.close();
    policyDialog.showModal();
  }));

  function renderDashboard() {
    const requests = read(KEYS.requests), providers = read(KEYS.providers);
    const newCount = [...requests, ...providers].filter(item => item.status === 'New').length;
    $('#stats-grid').innerHTML = `<div class="stat-card"><span>Customer requests</span><strong>${requests.length}</strong></div><div class="stat-card"><span>Provider applications</span><strong>${providers.length}</strong></div><div class="stat-card"><span>Needs review</span><strong>${newCount}</strong></div>`;
    const renderItems = (items, type) => items.length ? items.map(item => `<article class="admin-item"><strong>${escapeHtml(item.name)} · ${escapeHtml(item.service || item.services || 'Provider')}</strong><p>${escapeHtml(item.area)} · ${escapeHtml(item.phone)} · ${dateLabel(item.createdAt)}</p>${item.email ? `<p>${escapeHtml(item.email)}</p>` : ''}${item.details ? `<p>${escapeHtml(item.details)}</p>` : ''}${item.experience ? `<p>${escapeHtml(item.experience)}</p>` : ''}<label>Status: <select data-status-type="${type}" data-id="${escapeHtml(item.id)}"><option${item.status==='New'?' selected':''}>New</option><option${item.status==='Contacted'?' selected':''}>Contacted</option><option${item.status==='Matched'?' selected':''}>Matched</option><option${item.status==='Closed'?' selected':''}>Closed</option></select></label></article>`).join('') : '<p class="empty-state">No submissions yet. New demo submissions will appear here.</p>';
    $('#requests-list').innerHTML = renderItems(requests, 'requests');
    $('#providers-list').innerHTML = renderItems(providers, 'providers');
    $$('[data-status-type]').forEach(select => select.addEventListener('change', () => {
      const key = KEYS[select.dataset.statusType];
      const items = read(key); const item = items.find(entry => entry.id === select.dataset.id);
      if (item) { item.status = select.value; write(key, items); renderDashboard(); }
    }));
  }
  renderDashboard();

  $('#clear-data').addEventListener('click', () => {
    if (!window.confirm('Delete all NeighbourFix demo requests and provider applications saved in this browser?')) return;
    localStorage.removeItem(KEYS.requests); localStorage.removeItem(KEYS.providers); renderDashboard(); showToast('Demo data cleared from this browser.');
  });
  $('#export-data').addEventListener('click', () => {
    const rows = [['type','created_at','name','phone','email','service','area','timing','budget','details','status']];
    read(KEYS.requests).forEach(item => rows.push(['request',item.createdAt,item.name,item.phone,item.email,item.service,item.area,item.timing,item.budget,item.details,item.status]));
    read(KEYS.providers).forEach(item => rows.push(['provider',item.createdAt,item.name,item.phone,item.email,item.services,item.area,'','','',item.status]));
    const csv = rows.map(row => row.map(value => `"${String(value ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
    const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([csv], { type:'text/csv;charset=utf-8' })); link.download = 'neighbourfix-demo-export.csv'; link.click(); URL.revokeObjectURL(link.href);
  });
})();
