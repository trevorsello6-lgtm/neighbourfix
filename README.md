const requestForm = document.getElementById('request-form');
const providerForm = document.getElementById('provider-form');
const providerDialog = document.getElementById('provider-dialog');
const policyDialog = document.getElementById('policy-dialog');
const messageBox = document.getElementById('request-message');
const providerMessage = document.getElementById('provider-message');
const toast = document.getElementById('toast');

function setMessage(el, value) {
  el.textContent = value;
  el.classList.add('visible');
}

function showToast(value) {
  toast.textContent = value;
  toast.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

function formatLabel(value) {
  return value && value !== 'Not specified' ? value : 'Not specified';
}

function renderStats(stats) {
  const container = document.getElementById('stats-grid');
  container.innerHTML = `
    <div class="stat-card"><span>Customer requests</span><strong>${stats.requestCount}</strong></div>
    <div class="stat-card"><span>Provider applications</span><strong>${stats.providerCount}</strong></div>
    <div class="stat-card"><span>Needs review</span><strong>${stats.newCount}</strong></div>
    <div class="stat-card"><span>Monthly potential</span><strong>R${stats.monthlyPotential.toLocaleString('en-ZA')}</strong></div>
  `;
}

async function loadDashboard() {
  const summary = await fetch('/api/summary').then(r => r.json());
  renderStats(summary);

  const requests = await fetch('/api/requests').then(r => r.json());
  const providers = await fetch('/api/providers').then(r => r.json());

  const renderList = (items, type) => {
    const target = type === 'requests' ? document.getElementById('request-list') : document.getElementById('provider-list');

    if (!items.length) {
      target.innerHTML = '<div class="list-item"><p>No submissions yet.</p></div>';
      return;
    }

    target.innerHTML = items.map(item => `
      <div class="list-item">
        <strong>${item.name || 'Anonymous'} · ${item.service || item.services || 'Service'}</strong>
        <p>${item.area || 'No area'} · ${item.phone || 'No phone'} · ${new Date(item.createdAt).toLocaleDateString('en-ZA')}</p>
        ${item.details ? `<p>${item.details}</p>` : ''}
        <label>
          Status
          <select data-type="${type}" data-id="${item.id}">
            <option ${item.status === 'New' ? 'selected' : ''}>New</option>
            <option ${item.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
            <option ${item.status === 'Matched' ? 'selected' : ''}>Matched</option>
            <option ${item.status === 'Closed' ? 'selected' : ''}>Closed</option>
          </select>
        </label>
      </div>
    `).join('');

    target.querySelectorAll('select').forEach(select => {
      select.addEventListener('change', async event => {
        const typeValue = event.target.dataset.type;
        const id = event.target.dataset.id;
        const endpoint = typeValue === 'requests' ? `/api/requests/${id}/status` : `/api/providers/${id}/status`;
        await fetch(endpoint, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: event.target.value })
        });
        loadDashboard();
        showToast('Status updated');
      });
    });
  };

  renderList(requests, 'requests');
  renderList(providers, 'providers');
}

requestForm.addEventListener('submit', async event => {
  event.preventDefault();
  const formData = new FormData(requestForm);
  const payload = Object.fromEntries(formData.entries());

  const response = await fetch('/api/requests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    setMessage(messageBox, data.error || 'Something went wrong.');
    return;
  }

  requestForm.reset();
  loadDashboard();
  setMessage(messageBox, 'Request submitted successfully. The live demo has captured your details.');
  showToast('Request captured');
});

providerForm.addEventListener('submit', async event => {
  event.preventDefault();
  const formData = new FormData(providerForm);
  const payload = Object.fromEntries(formData.entries());

  const response = await fetch('/api/providers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    setMessage(providerMessage, data.error || 'Something went wrong.');
    return;
  }

  providerForm.reset();
  providerDialog.close();
  setMessage(providerMessage, 'Provider interest saved. We’ll review it in the dashboard.');
  loadDashboard();
  showToast('Provider interest saved');
});

const serviceButtons = document.querySelectorAll('.service-card');
serviceButtons.forEach(button => {
  button.addEventListener('click', () => {
    const service = button.dataset.service;
    const select = document.querySelector('select[name="service"]');
    if (select) {
      select.value = service;
      document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
    }
  });
});

document.getElementById('provider-open').addEventListener('click', () => providerDialog.showModal());

document.querySelectorAll('.close-button').forEach(button => {
  button.addEventListener('click', () => {
    const dialog = button.closest('dialog');
    if (dialog) dialog.close();
  });
});

document.querySelectorAll('[data-policy]').forEach(button => {
  button.addEventListener('click', async () => {
    const type = button.dataset.policy;
    const title = type === 'privacy' ? 'Privacy notice' : 'Terms and conditions';
    const content = type === 'privacy'
      ? '<h4>Data handling</h4><p>This prototype stores form data on the local server for demo purposes. It is not a production marketplace and does not provide full legal compliance or payment handling.</p><h4>Purpose</h4><p>We collect basic contact and service details to understand demand, match providers and improve the MVP.</p><h4>Security</h4><p>Real production launch should add secure storage, role-based access and reviewed privacy controls under POPIA.</p>'
      : '<h4>Prototype terms</h4><p>This is an MVP demo, not a live booking or money-moving platform. Requests are not confirmed bookings and no payments are taken.</p><h4>Pricing</h4><p>Prices and provider credentials must be agreed directly before work begins. A future live system needs clear cancellation, refund and dispute rules.</p>';

    document.getElementById('policy-title').textContent = title;
    document.getElementById('policy-content').innerHTML = content;
    policyDialog.showModal();
  });
});

document.getElementById('clear-demo').addEventListener('click', async () => {
  const confirmed = confirm('Clear all demo requests and providers from this server-backed MVP?');
  if (!confirmed) return;

  await fetch('/api/requests', { method: 'DELETE' });
  await fetch('/api/providers', { method: 'DELETE' });
  loadDashboard();
  showToast('Demo data cleared');
});

document.getElementById('export-csv').addEventListener('click', async () => {
  const requests = await fetch('/api/requests').then(r => r.json());
  const providers = await fetch('/api/providers').then(r => r.json());
  const rows = [['type', 'created_at', 'name', 'phone', 'email', 'service', 'area', 'budget', 'status']];

  requests.forEach(item => rows.push(['request', item.createdAt, item.name, item.phone, item.email, item.service, item.area, item.budget, item.status]));
  providers.forEach(item => rows.push(['provider', item.createdAt, item.name, item.phone, item.email, item.services, item.area, 'n/a', item.status]));

  const csv = rows.map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'neighbourfix-demo-export.csv';
  a.click();
  URL.revokeObjectURL(a.href);
  showToast('CSV downloaded');
});

async function initWhatsAppButton() {
  const link = await fetch('/api/whatsapp-template?service=Cleaning&area=Cape%20Town').then(r => r.json());
  const btn = document.createElement('a');
  btn.href = link.url;
  btn.className = 'button alt';
  btn.textContent = 'WhatsApp us';
  btn.target = '_blank';
  btn.rel = 'noreferrer';
  const parent = document.querySelector('.provider-cta');
  parent.appendChild(btn);
}

['click', 'submit'].forEach(() => {});

loadDashboard();
initWhatsAppButton();
