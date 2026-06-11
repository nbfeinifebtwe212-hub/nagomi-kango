// ===== CHATBOT FAQ DATA =====
const faqData = [
  {
    keys: ['サービス', '内容', 'どんな', '何をして'],
    answer: '訪問看護・リハビリテーション・ターミナルケア・精神科訪問看護・小児訪問看護など、幅広いサービスを提供しています。看護師や療法士がご自宅を訪問します😊'
  },
  {
    keys: ['料金', '費用', 'いくら', 'お金', '負担'],
    answer: '介護保険をご利用の方は1〜3割のご負担です（所得に応じて異なります）。医療保険の方も同様です。具体的な金額はお気軽にお問い合わせください📞'
  },
  {
    keys: ['エリア', '対応', '地域', '区', '場所'],
    answer: '新宿区・渋谷区・中野区・杉並区を中心に対応しています。その他のエリアもお気軽にご相談ください🗺️'
  },
  {
    keys: ['流れ', '始め方', '手続き', 'どうすれば', '利用'],
    answer: '①お問い合わせ → ②アセスメント訪問 → ③ケアプラン作成 → ④訪問看護スタート、の4ステップです。まずはお電話かお問い合わせフォームからご連絡ください！'
  },
  {
    keys: ['夜間', '深夜', '休日', '24時間', '緊急'],
    answer: 'はい、24時間365日対応しています🌙 緊急時には夜間・休日でも看護師がご自宅へ伺いますので、ご安心ください。'
  },
  {
    keys: ['採用', '求人', '募集', '働き', 'スタッフ', '転職'],
    answer: '看護師・理学療法士・作業療法士・言語聴覚士を募集中です👩‍⚕️ 週3日〜・シフト相談可・育休実績ありです。詳しくはお問い合わせください！'
  },
  {
    keys: ['保険', '介護保険', '医療保険'],
    answer: '65歳以上で要介護・要支援認定の方は介護保険、それ以外の方や特定疾患の方は医療保険での利用が原則です。ご不明な点はお気軽にご相談ください🏥'
  },
  {
    keys: ['頻度', '週', '何回', '回数', 'どのくらい'],
    answer: '介護保険は原則週3回まで、医療保険も週3回まで（特定疾患は毎日可能な場合も）です。主治医の指示書に基づいて決定します📋'
  },
  {
    keys: ['医師', '主治医', 'かかりつけ', '指示'],
    answer: '訪問看護には主治医の指示書が必要です。かかりつけ医がいない場合は、地域の医療機関をご紹介することもできますよ🩺'
  }
];

function getBotResponse(input) {
  const text = input.trim().toLowerCase();
  if (!text) return null;
  for (const faq of faqData) {
    if (faq.keys.some(k => text.includes(k))) return faq.answer;
  }
  return 'ご質問ありがとうございます。詳しいことは直接スタッフにお聞きするのが一番です😊 お電話（03-XXXX-XXXX）またはお問い合わせフォームからご連絡ください。';
}

function addMessage(text, sender) {
  const messages = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `chat-msg chat-msg--${sender}`;
  const p = document.createElement('p');
  p.innerHTML = text.replace(/\n/g, '<br>');
  div.appendChild(p);
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function askQuestion(question) {
  const qr = document.getElementById('quickReplies');
  if (qr) qr.remove();
  addMessage(question, 'user');
  setTimeout(() => {
    const reply = getBotResponse(question);
    addMessage(reply, 'bot');
  }, 400);
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  const qr = document.getElementById('quickReplies');
  if (qr) qr.remove();
  addMessage(text, 'user');
  input.value = '';
  setTimeout(() => {
    const reply = getBotResponse(text);
    addMessage(reply, 'bot');
  }, 400);
}

function handleChatKey(e) {
  if (e.key === 'Enter') sendChat();
}

// ===== CHATBOT TOGGLE =====
const toggle = document.getElementById('chatbotToggle');
const bubble = document.getElementById('chatbotBubble');
const closeBtn = document.getElementById('chatbotClose');

toggle.addEventListener('click', () => {
  bubble.classList.toggle('is-open');
  if (bubble.classList.contains('is-open')) {
    document.getElementById('chatInput').focus();
  }
});
closeBtn.addEventListener('click', () => bubble.classList.remove('is-open'));

// ===== BURGER MENU =====
const burger = document.getElementById('burgerBtn');
const nav = document.getElementById('globalNav');
burger.addEventListener('click', () => nav.classList.toggle('is-open'));
nav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => nav.classList.remove('is-open'));
});

// ===== CONTACT FORM (demo) =====
function handleSubmit(e) {
  e.preventDefault();
  alert('【デモサイト】送信ありがとうございます。実際のサイトではここからメッセージが届きます。');
  e.target.reset();
}

// ===== SCROLL ANIMATION =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .service-item, .staff-card, .flow__step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});
