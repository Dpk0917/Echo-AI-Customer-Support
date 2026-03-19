/* ============================================================
   ECHO AI – script.js
   ============================================================ */

/* ---------- NAVBAR SCROLL ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ---------- HAMBURGER MENU ---------- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = mobileMenu.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = isOpen ? '0' : '';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ---------- SCROLL FADE-IN ANIMATION ---------- */
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

/* ---------- HERO CHAT ANIMATION ---------- */
const heroConvo = [
  { role: 'ai', text: "Hi there! I found your order #48291. It was shipped yesterday via FedEx. 📦" },
  { role: 'ai', text: "Your estimated delivery is tomorrow between 2–6 PM. Would you like the tracking link?" },
  { role: 'user', text: "Yes please! Also, can I change the delivery address?" },
  { role: 'ai', text: "Of course! I've sent the tracking link to your email. To change the address, I'll need to verify your account first — can you confirm your registered email?" },
];

function typeMessage(el, text, callback) {
  let i = 0;
  el.textContent = '';
  el.classList.remove('typing-cursor');
  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) setTimeout(callback, 600);
    }
  }, 28);
}

function addHeroMessage(chatBody, msg, delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.classList.add('msg', msg.role === 'user' ? 'msg-user' : 'msg-ai');

      if (msg.role === 'ai') {
        const cursor = document.createElement('span');
        cursor.classList.add('typing-cursor');
        div.appendChild(cursor);
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
          typeMessage(div, msg.text, resolve);
          chatBody.scrollTop = chatBody.scrollHeight;
        }, 700);
      } else {
        div.textContent = msg.text;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
        resolve();
      }
    }, delay);
  });
}

async function runHeroChat() {
  const chatBody = document.getElementById('hero-chat');
  // Remove the initial typing cursor message
  const initialAiMsg = chatBody.querySelector('.msg-ai');
  if (initialAiMsg) initialAiMsg.remove();

  let delay = 1200;
  for (const msg of heroConvo) {
    await addHeroMessage(chatBody, msg, 0);
    await new Promise(r => setTimeout(r, 500));
  }
}

// Start hero chat after a short delay
setTimeout(runHeroChat, 1800);

/* ---------- DEMO SECTION ---------- */
const conversations = [
  [
    { role: 'user', text: "Hi! My order #48291 hasn't arrived yet. It was supposed to come 3 days ago." },
    { role: 'ai', text: "I'm sorry to hear that! Let me look into order #48291 right away." },
    { role: 'ai', text: "I can see your order shipped 4 days ago via FedEx (tracking: FX2849123). There appears to be a delay at the regional sorting facility. 📦 I've flagged this for priority resolution — you should receive an update within 2 hours. Would you like me to initiate a replacement shipment as a precaution?" },
    { role: 'user', text: "Yes, please do that. Thank you!" },
    { role: 'ai', text: "Done! ✅ A replacement shipment has been initiated. You'll receive a confirmation email with the new tracking number within 15 minutes. Is there anything else I can help you with today?" },
  ],
  [
    { role: 'user', text: "I was charged twice for my subscription this month." },
    { role: 'ai', text: "I sincerely apologize for that! Let me pull up your billing history immediately." },
    { role: 'ai', text: "I can confirm there were indeed two charges of $89 on March 3rd and March 4th. This was due to a payment retry after a temporary processing error. I've already initiated a full refund of $89 — you'll see it in your account within 3–5 business days. 💳" },
    { role: 'user', text: "Great, that's a relief. Will this happen again?" },
    { role: 'ai', text: "I've added a safeguard to your account to prevent duplicate billing. Our engineering team also patched the issue on March 5th. You're fully protected going forward! Is there anything else I can assist with?" },
  ],
  [
    { role: 'user', text: "The app keeps crashing when I try to export reports." },
    { role: 'ai', text: "I'm sorry you're experiencing this! Let me diagnose the issue." },
    { role: 'ai', text: "Based on your account's app version (v3.2.1), I can see this is a known issue affecting exports larger than 10MB. Our team released a fix in v3.2.3 released yesterday. Could you update the app and try again? The update takes about 2 minutes. 🔧" },
    { role: 'user', text: "Updated! It works now. Thanks so much." },
    { role: 'ai', text: "Fantastic! Glad that resolved it 🎉 I've also added a note to your account so our team can monitor your export performance. If you have any other issues, I'm here 24/7!" },
  ]
];

let currentConv = 0;
let isAnimating = false;

async function loadConversation(convIndex, messagesEl) {
  if (isAnimating) return;
  isAnimating = true;
  messagesEl.innerHTML = '';

  const conv = conversations[convIndex];
  for (const msg of conv) {
    await new Promise(resolve => {
      setTimeout(() => {
        const div = document.createElement('div');
        div.classList.add('msg', msg.role === 'user' ? 'msg-user' : 'msg-ai');

        if (msg.role === 'ai') {
          const cursor = document.createElement('span');
          cursor.classList.add('typing-cursor');
          div.appendChild(cursor);
          messagesEl.appendChild(div);
          messagesEl.scrollTop = messagesEl.scrollHeight;

          setTimeout(() => {
            div.innerHTML = '';
            let i = 0;
            const interval = setInterval(() => {
              div.textContent += msg.text[i];
              i++;
              messagesEl.scrollTop = messagesEl.scrollHeight;
              if (i >= msg.text.length) {
                clearInterval(interval);
                setTimeout(resolve, 300);
              }
            }, 22);
          }, 600);
        } else {
          div.textContent = msg.text;
          messagesEl.appendChild(div);
          messagesEl.scrollTop = messagesEl.scrollHeight;
          setTimeout(resolve, 200);
        }
      }, msg.role === 'user' ? 0 : 100);
    });
  }
  isAnimating = false;
}

const demoMessages = document.getElementById('demo-messages');
const demoTabs = document.querySelectorAll('.dtab');
const replayBtn = document.getElementById('replay-btn');

// Initialize demo
const demoSectionEl = document.getElementById('demo');
const demoObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadConversation(0, demoMessages);
    demoObserver.disconnect();
  }
}, { threshold: 0.3 });
demoObserver.observe(demoSectionEl);

demoTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    demoTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentConv = parseInt(tab.dataset.conv);
    loadConversation(currentConv, demoMessages);
  });
});

replayBtn?.addEventListener('click', () => {
  loadConversation(currentConv, demoMessages);
});

// Demo input - let users type messages
const demoInput = document.getElementById('demo-input');
const demoSend = document.getElementById('demo-send');

async function sendDemoMessage() {
  if (isAnimating) return;
  const text = demoInput.value.trim();
  if (!text) return;
  demoInput.value = '';

  isAnimating = true;

  const userDiv = document.createElement('div');
  userDiv.classList.add('msg', 'msg-user');
  userDiv.textContent = text;
  demoMessages.appendChild(userDiv);
  demoMessages.scrollTop = demoMessages.scrollHeight;

  await new Promise(r => setTimeout(r, 800));

  const aiDiv = document.createElement('div');
  aiDiv.classList.add('msg', 'msg-ai');
  const cursor = document.createElement('span');
  cursor.classList.add('typing-cursor');
  aiDiv.appendChild(cursor);
  demoMessages.appendChild(aiDiv);
  demoMessages.scrollTop = demoMessages.scrollHeight;

  await new Promise(r => setTimeout(r, 1000));

  const responses = [
    "Thanks for reaching out! I've found your account and I'm looking into this right now. I'll have an answer for you in just a moment. 🔍",
    "Great question! I can help with that. Let me pull up the relevant information from our knowledge base and get back to you with a complete answer.",
    "I understand your concern, and I'm here to help! Based on what you've described, I have a few solutions that should resolve this quickly. Could you share a bit more detail so I can give you the most accurate help?",
    "I've reviewed your account history and I can see exactly what's happening. Here's what I recommend: let's start with the simplest fix first, and if that doesn't work, I have two backup options ready for you. ✅",
  ];

  const reply = responses[Math.floor(Math.random() * responses.length)];
  aiDiv.innerHTML = '';
  let i = 0;
  await new Promise(resolve => {
    const interval = setInterval(() => {
      aiDiv.textContent += reply[i];
      i++;
      demoMessages.scrollTop = demoMessages.scrollHeight;
      if (i >= reply.length) {
        clearInterval(interval);
        resolve();
      }
    }, 22);
  });

  isAnimating = false;
}

demoSend.addEventListener('click', sendDemoMessage);
demoInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendDemoMessage();
});

/* ---------- PRICING TOGGLE ---------- */
const billingToggle = document.getElementById('billing-toggle');
const priceNums = document.querySelectorAll('.price-num[data-monthly]');

billingToggle.addEventListener('change', () => {
  const isAnnual = billingToggle.checked;
  priceNums.forEach(el => {
    const target = isAnnual ? parseInt(el.dataset.annual) : parseInt(el.dataset.monthly);
    animateNumber(el, parseInt(el.textContent) || 0, target, 400);
  });
});

function animateNumber(el, from, to, duration) {
  const start = performance.now();
  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(from + (to - from) * eased);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

/* ---------- ACCORDION ---------- */
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
  const trigger = item.querySelector('.accordion-trigger');
  const content = item.querySelector('.accordion-content');

  trigger.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all
    accordionItems.forEach(i => {
      i.classList.remove('open');
      i.querySelector('.accordion-content').style.maxHeight = '0';
    });

    // Open clicked if it wasn't open
    if (!isOpen) {
      item.classList.add('open');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});

/* ---------- SMOOTH SCROLL ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---------- CURSOR GLOW ON HERO ---------- */
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth * 100;
    const y = e.clientY / window.innerHeight * 100;
    heroBg.style.setProperty('--mx', x + '%');
    heroBg.style.setProperty('--my', y + '%');
  });
}

/* ---------- CARD TILT EFFECT ---------- */
document.querySelectorAll('.feature-card, .testi-card, .pricing-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ---------- FEATURE CARD SPECIAL TILT ---------- */
document.querySelectorAll('.pricing-card--featured').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-14px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(-8px)';
  });
});

/* ---------- STAGGER FEATURE CARDS ANIMATION ---------- */
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, i) => {
  if (!card.classList.contains('delay-1') && !card.classList.contains('delay-2') && !card.classList.contains('delay-3')) {
    card.style.transitionDelay = `${(i % 3) * 0.1}s`;
  }
});

/* ---------- ACTIVE NAV LINK HIGHLIGHT ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.fontWeight = link.getAttribute('href') === `#${current}` ? '600' : '';
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--black)' : '';
  });
});