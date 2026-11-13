* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  background: #fffdf8;
  color: #1a2d29;
}
img { max-width: 100%; }
a { text-decoration: none; color: inherit; }
button, input, select, textarea { font: inherit; }
button { cursor: pointer; }

:root {
  --green-900: #123d32;
  --green-800: #1d513d;
  --green-700: #2a644f;
  --green-500: #69a27b;
  --lime-300: #dff778;
  --lime-200: #edf9b7;
  --sand-100: #f5f0e8;
  --sand-200: #ece4d8;
  --line: #e6e0d4;
  --text: #20362f;
  --muted: #5a6b64;
  --danger: #b04343;
  --success: #2f6d4a;
  --shadow: 0 18px 42px rgba(18, 61, 50, 0.08);
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px 6.5%;
  background: rgba(255, 253, 248, 0.9);
  border-bottom: 1px solid rgba(28, 62, 52, 0.08);
  backdrop-filter: blur(12px);
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: var(--green-900);
  font-weight: 800;
  color: var(--lime-300);
  letter-spacing: -1px;
}

.brand-mark span {
  color: #fff;
}

.brand-copy {
  font-family: 'Manrope', sans-serif;
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: -0.06em;
  color: var(--green-900);
}

.brand-copy span {
  color: #7a9e79;
  font-weight: 700;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 28px;
  font-size: 0.83rem;
  color: var(--muted);
  font-weight: 600;
}

.main-nav a:hover { color: var(--green-800); }

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 18px;
  border: none;
  border-radius: 9px;
  background: var(--green-900);
  color: #fff;
  font-weight: 700;
  letter-spacing: -0.02em;
  box-shadow: var(--shadow);
  transition: transform 0.2s ease, background 0.2s ease;
}

.button:hover {
  transform: translateY(-1px);
  background: var(--green-800);
}

.button.alt {
  background: var(--lime-300);
  color: var(--green-900);
}

.button.ghost {
  background: #fff;
  color: var(--green-900);
  border: 1px solid var(--line);
  box-shadow: none;
}

.header-button { white-space: nowrap; }

.hero {
  max-width: 1220px;
  margin: 0 auto;
  padding: 64px 6.5% 42px;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 52px;
}

.eyebrow {
  margin: 0 0 18px;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: var(--green-700);
}

.eyebrow.white { color: #dce7b9; }

.hero h1 {
  margin: 0;
  font-family: 'Manrope', sans-serif;
  font-size: clamp(3.1rem, 6vw, 6rem);
  line-height: 0.97;
  letter-spacing: -0.07em;
  color: var(--green-900);
}

.hero h1 span { color: #7aa05e; }

.subtitle {
  max-width: 530px;
  margin-top: 20px;
  font-size: 1.02rem;
  line-height: 1.8;
  color: var(--muted);
}

.action-row {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-top: 30px;
}

.link-button {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--green-800);
}

.trust-row {
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--muted);
  font-size: 0.78rem;
}

.trust-avatars {
  display: flex;
}

.trust-avatars span {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  margin-left: -6px;
  border-radius: 50%;
  background: #eef0d9;
  border: 2px solid #fff;
  font-size: 1rem;
}

.trust-avatars span:first-child { margin-left: 0; }

.trust-row strong { color: var(--green-900); }

.hero-visual {
  position: relative;
  min-height: 420px;
  border-radius: 42px 42px 18px 18px;
  background: linear-gradient(180deg, #eef4d2, #edf3ea 30%);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.badge {
  position: absolute;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  background: rgba(255,255,255,0.9);
  border-radius: 10px;
  box-shadow: var(--shadow);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--green-900);
}

.badge-top { top: 84px; left: 30px; }
.badge-bottom { right: 26px; bottom: 54px; }

.house-graphic {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 330px;
  height: 300px;
  transform: translateX(-50%);
}

.roof {
  position: absolute;
  left: 50%;
  top: 12px;
  width: 236px;
  height: 184px;
  transform: translateX(-50%);
  background: #d78d67;
  clip-path: polygon(50% 0%, 100% 50%, 89% 50%, 50% 18%, 11% 50%, 0% 50%);
}

.box {
  position: absolute;
  left: 50%;
  top: 100px;
  width: 220px;
  height: 150px;
  transform: translateX(-50%);
  background: #fffefb;
  border: 1px solid rgba(39, 65, 53, 0.08);
  border-radius: 4px;
}

.window {
  position: absolute;
  top: 30px;
  width: 42px;
  height: 42px;
  background: #dfeee8;
  border: 5px solid #fff;
}

.window.left { left: 18px; }
.window.right { right: 18px; }

.door {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 48px;
  height: 82px;
  transform: translateX(-50%);
  background: #7aa17d;
  border-radius: 18px 18px 0 0;
}

.door::after {
  content: "";
  position: absolute;
  right: 7px;
  top: 42px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(255,255,255,0.8);
}

.plant {
  position: absolute;
  bottom: 20px;
  font-size: 2.2rem;
  color: #6a8e5d;
}

.plant.one { left: 18px; }
.plant.two { right: 18px; }

.benefits-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  max-width: 1220px;
  margin: 0 auto;
  padding: 0 6.5% 40px;
  font-size: 0.8rem;
  color: var(--muted);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.benefits-strip span {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 68px;
  text-align: center;
}

.section {
  max-width: 1220px;
  margin: 0 auto;
  padding: 84px 6.5%;
}

.section-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 26px;
  margin-bottom: 28px;
}

.section-head h2, .process-copy h2, .booking-copy h2, .roadmap h2 {
  margin: 0;
  font-family: 'Manrope', sans-serif;
  color: var(--green-900);
  font-size: clamp(2rem, 3vw, 3rem);
  letter-spacing: -0.06em;
  line-height: 1.1;
}

.section-head p, .process-copy p, .booking-copy p {
  max-width: 420px;
  color: var(--muted);
  line-height: 1.8;
  margin: 0;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.service-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 22px 18px 18px;
  min-height: 160px;
  background: #fbfaf7;
  border: 1px solid var(--line);
  border-radius: 12px;
  text-align: left;
  box-shadow: var(--shadow);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.service-card:hover {
  transform: translateY(-2px);
  border-color: #d6e0aa;
}

.service-card .icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  margin-bottom: 22px;
  border-radius: 10px;
  background: #edf4d5;
  font-size: 1.25rem;
}

.service-card strong {
  font-family: 'Manrope', sans-serif;
  font-size: 1.08rem;
  margin-bottom: 8px;
  color: var(--green-900);
}

.service-card small {
  color: var(--muted);
  line-height: 1.7;
}

.process {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 36px;
  background: #f3f4ec;
  max-width: none;
}

.process-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.step {
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 16px;
  align-items: start;
  padding: 18px 0;
  border-bottom: 1px solid #dfe8d4;
}

.step span {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #e6efcd;
  color: var(--green-900);
  font-weight: 800;
}

.step h3 {
  margin: 0 0 8px;
  font-size: 1rem;
  color: var(--green-900);
}

.step p {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
  font-size: 0.9rem;
}

.booking {
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  gap: 42px;
  align-items: start;
}

.mini-box {
  margin-top: 22px;
  padding: 18px 18px 14px;
  background: #f7f4ed;
  border: 1px solid var(--line);
  border-radius: 12px;
}

.mini-box strong {
  font-family: 'Manrope', sans-serif;
  color: var(--green-900);
}

.mini-box p {
  margin: 8px 0 0;
}

.card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 18px;
  box-shadow: var(--shadow);
}

.form-card {
  padding: 22px 22px 18px;
}

.form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--green-900);
}

.form-header small {
  color: var(--muted);
  letter-spacing: 0;
  text-transform: none;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px 14px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--green-900);
}

.full-width { grid-column: 1 / -1; }

input, select, textarea {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 8px;
  min-height: 42px;
  padding: 10px 11px;
  background: #fff;
  color: #1f2e2a;
}

textarea {
  min-height: 88px;
  resize: vertical;
}

input:focus, select:focus, textarea:focus {
  outline: 3px solid rgba(105, 162, 123, 0.18);
  border-color: #94b78d;
}

.checkbox-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 18px;
  font-size: 0.74rem;
  line-height: 1.6;
  color: var(--muted);
}

.checkbox-row input {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  accent-color: var(--green-900);
}

.full-width-button {
  width: 100%;
  margin-top: 18px;
}

.small-note {
  margin: 10px 0 0;
  font-size: 0.68rem;
  color: var(--muted);
  text-align: center;
}

.message-box {
  display: none;
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  background: #edf7ef;
  border: 1px solid #d8e9d9;
  color: var(--success);
  font-size: 0.76rem;
}

.message-box.visible { display: block; }

.provider-cta {
  max-width: 1180px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 26px 30px;
  background: var(--green-900);
  border-radius: 16px;
  color: #fff;
}

.provider-icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: #234f41;
  color: var(--lime-300);
  font-size: 1.5rem;
}

.provider-cta h3 {
  margin: 0;
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.4rem, 2vw, 2.1rem);
  letter-spacing: -0.05em;
}

.dashboard-section { padding-top: 70px; }

.narrow-head {
  margin-bottom: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 24px;
}

.stat-card {
  padding: 18px 16px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: #fff;
  box-shadow: var(--shadow);
}

.stat-card span {
  display: block;
  font-size: 0.72rem;
  color: var(--muted);
}

.stat-card strong {
  display: block;
  margin-top: 8px;
  font-family: 'Manrope', sans-serif;
  color: var(--green-900);
  font-size: clamp(1.6rem, 2vw, 2.3rem);
  letter-spacing: -0.05em;
}

.dashboard-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.panel {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 18px 16px;
}

.panel h3 {
  margin: 0 0 12px;
  font-family: 'Manrope', sans-serif;
  color: var(--green-900);
}

.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.list-item {
  padding: 12px 10px;
  border-top: 1px solid var(--line);
}

.list-item:first-child { border-top: none; }

.list-item strong {
  display: block;
  font-size: 0.82rem;
  color: var(--green-900);
}

.list-item p {
  margin: 6px 0;
  color: var(--muted);
  line-height: 1.5;
  font-size: 0.72rem;
}

.list-item select {
  width: auto;
  min-width: 110px;
  margin-top: 8px;
  min-height: 34px;
  font-size: 0.72rem;
}

.small-tools { margin-top: 18px; }

.text-button {
  background: transparent;
  border: none;
  color: var(--green-800);
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
}

.roadmap {
  padding-top: 70px;
}

.roadmap-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 22px;
}

.roadmap-card {
  padding: 22px 18px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: #fff;
  box-shadow: var(--shadow);
}

.roadmap-card span {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--green-700);
  margin-bottom: 10px;
}

.roadmap-card h3 {
  margin: 0 0 12px;
  font-family: 'Manrope', sans-serif;
  color: var(--green-900);
}

.roadmap-card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
  font-size: 0.85rem;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  max-width: 1220px;
  margin: 0 auto;
  padding: 22px 6.5% 52px;
  color: var(--muted);
}

.footer-brand { margin-right: auto; }

.footer p {
  margin: 0;
  color: var(--green-700);
  font-weight: 700;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 18px;
}

.modal {
  width: min(640px, calc(100% - 26px));
  border: none;
  border-radius: 18px;
  background: #fffdf8;
  padding: 0;
  box-shadow: 0 24px 80px rgba(19, 27, 24, 0.2);
}

.modal::backdrop {
  background: rgba(15, 31, 26, 0.5);
}

.modal form {
  padding: 22px 22px 18px;
}

.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.modal-head h3 {
  margin: 0;
  font-family: 'Manrope', sans-serif;
  color: var(--green-900);
  font-size: 1.7rem;
  letter-spacing: -0.05em;
}

.close-button {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: #f1f0ea;
  color: var(--green-900);
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-grid { margin-top: 8px; }

.policy-content {
  padding: 2px 8px 10px;
  font-size: 0.8rem;
  line-height: 1.8;
  color: var(--muted);
}

.policy-content h4 {
  margin: 16px 0 8px;
  color: var(--green-900);
  font-family: 'Manrope', sans-serif;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%) translateY(10px);
  opacity: 0;
  background: rgba(18, 61, 50, 0.94);
  color: #fff;
  padding: 10px 16px;
  border-radius: 999px;
  font-size: 0.74rem;
  transition: opacity 0.2s ease, transform 0.2s ease;
  pointer-events: none;
}

.toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

@media (max-width: 860px) {
  .main-nav { display: none; }
  .hero { grid-template-columns: 1fr; }
  .service-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .booking { grid-template-columns: 1fr; }
  .roadmap-grid { grid-template-columns: 1fr; }
  .dashboard-columns { grid-template-columns: 1fr; }
  .benefits-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 620px) {
  .topbar { padding-inline: 20px; }
  .button { min-height: 42px; }
  .hero, .section, .footer { padding-left: 20px; padding-right: 20px; }
  .section-head { display: block; }
  .service-grid, .stats-grid, .form-grid { grid-template-columns: 1fr; }
  .provider-cta { flex-direction: column; align-items: flex-start; }
  .footer { flex-wrap: wrap; }
  .footer-links { width: 100%; justify-content: flex-start; }
}
