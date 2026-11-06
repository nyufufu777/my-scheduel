(() => {
  'use strict';

  const DATA = window.GUIDE_DATA;
  const TRIP = window.GUIDE_TRIP;
  const GEO = window.GUIDE_MAP;
  const ROUTES = window.GUIDE_ROUTES;
  const STORAGE_KEY = 'reinvent-field-guide-2026-v1';
  const DAYS = [
    { date: '2026-11-29', short: '11/29', en: 'SUN', ja: '日', long: '11月29日、出発の日。' },
    { date: '2026-11-30', short: '11/30', en: 'MON', ja: '月', long: '11月30日、月曜日。' },
    { date: '2026-12-01', short: '12/1', en: 'TUE', ja: '火', long: '12月1日、火曜日。' },
    { date: '2026-12-02', short: '12/2', en: 'WED', ja: '水', long: '12月2日、水曜日。' },
    { date: '2026-12-03', short: '12/3', en: 'THU', ja: '木', long: '12月3日、木曜日。' },
    { date: '2026-12-04', short: '12/4', en: 'FRI', ja: '金', long: '12月4日、帰国の途へ。' },
    { date: '2026-12-05', short: '12/5', en: 'SAT', ja: '土', long: '12月5日、日本に到着。' }
  ];
  const VENUES = [
    { name: 'Venetian', short: 'Venetian', css: 'venetian', caption: '会議施設', query: 'The Venetian Convention and Expo Center, Las Vegas' },
    { name: 'Wynn/Encore', short: 'Wynn / Encore', css: 'wynn', caption: 'Wynn側の代表位置', query: 'Wynn Las Vegas Convention Center, Las Vegas' },
    { name: 'Caesars Forum', short: 'Caesars Forum', css: 'forum', caption: '会議施設', query: 'CAESARS FORUM Convention Center, 3911 Koval Lane, Las Vegas' },
    { name: 'Caesars Palace', short: 'Caesars Palace', css: 'palace', caption: '会議施設', query: 'Caesars Palace Convention Center, Las Vegas' },
    { name: 'MGM Grand', short: 'MGM Grand', css: 'mgm', caption: '会議施設', query: 'MGM Grand Conference Center, Las Vegas' },
    { name: "Harrah's Las Vegas", short: "Harrah's Las Vegas", css: 'harrahs', caption: '宿泊先 · 5泊', query: "Harrah's Las Vegas Hotel, 3475 Las Vegas Boulevard South, Las Vegas", hotel: true }
  ].map(item => ({ ...item, ...GEO.venues[item.name] }));
  // Public venue resources checked on 2026-11-05; these are permanent maps, not event entrance assignments.
  const VENUE_GUIDES = {
    Venetian: { label: '公式館内図（PDF）', url: 'https://www.venetianlasvegas.com/content/dam/vlvweb/resort/map.pdf', sourceURL: 'https://www.venetianlasvegas.com/resort/maps-and-parking.html', note: 'Convention & Expo Centerへの入口・施設の位置を確認。' },
    'Wynn/Encore': { label: '公式館内図（PDF）', url: 'https://cdn.wynnresorts.com/image/upload/visitwynn_pdfs_files/PropertyMap.pdf', sourceURL: 'https://www.wynnlasvegas.com/meetings/resort-maps', note: 'Wynn・Encoreの館内図。Japan NightのEvent Pavilionも確認。' },
    'Caesars Forum': { label: '公式フロア案内', url: 'https://www.caesars.com/meetings/properties/caesars-forum', note: 'ページ内の「Conference Center Floor Plans」を参照。' },
    'Caesars Palace': { label: '公式フロア案内', url: 'https://www.caesars.com/meetings/properties/caesars-palace', note: 'ページ内の「Conference Center Floor Plans」を参照。' },
    'MGM Grand': { label: '公式館内図（PDF）', url: 'https://assets.contentstack.io/v3/assets/bltc6ce635bc4868eb2/blt67c0bdb5f16b8094/mgm-grand-property-map.pdf', sourceURL: 'https://mgmgrand.mgmresorts.com/en/meetings-groups.html', note: 'Conference Center・Marquee Ballroomの位置を確認。' }
  };
  const HOTEL_CONTACT = {
    phone: '+18002149110', label: '+1 800-214-9110',
    note: '米国フリーダイヤル · 公式サイト掲載番号',
    address: '3475 Las Vegas Blvd South, Las Vegas, NV 89109',
    sourceURL: 'https://www.caesars.com/harrahs-las-vegas/hotel'
  };
  const CHECKS = ['セッションの予約・会場を再確認', 'AWS Eventsアプリを準備', 'PC・充電器・モバイルバッテリー', 'パスポート・参加用QRコード', 'JTB最終しおり・集合場所を確認'];
  const COPY = {
    home: ['YOUR WEEK, AT A GLANCE', '旅のしおり', '2026年11月29日 — 12月5日 · JTB B1コース', 'ホーム'],
    schedule: ['MAKE ROOM FOR THE JOURNEY', 'スケジュール', '出発から帰国まで。JTB B1とセッションをひとつに。', 'スケジュール'],
    map: ['FIND YOUR WAY', 'MAP・移動時間', '会場の位置関係と、余裕をもった出発時刻。', 'MAP・移動時間']
  };
  const ICONS = {
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M16 3v4M8 3v4M3 11h18M8 15h2m4 0h2m-8 3h2"/>',
    map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3ZM9 3v15M15 6v15"/>',
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    external: '<path d="M14 3h7v7m0-7L10 14M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"/>',
    chevron: '<path d="m9 5 7 7-7 7"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    route: '<circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 5h8a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h8"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    search: '<circle cx="10.5" cy="10.5" r="7.5"/><path d="m16 16 5 5"/>',
    swap: '<path d="M8 3v16m-4-4 4 4 4-4M16 21V5m-4 4 4-4 4 4"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    coffee: '<path d="M4 9h12v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4ZM16 10h2a3 3 0 1 1 0 6h-2M7 3v3M12 3v3M3 23h15"/>',
    people: '<circle cx="10" cy="7" r="3"/><path d="M4 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M20 21v-3a6 6 0 0 0-2-4"/>',
    plane: '<path d="m22 2-7 20-4-9-9-4Z M22 2 11 13"/>',
    hotel: '<path d="M3 21V5h18v16M7 21v-4h10v4M7 9h2m6 0h2m-10 4h2m6 0h2M1 21h22"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6.2 6.2l1.3-1.3a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.7.7a2 2 0 0 1 1.7 2Z"/>'
  };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name] || ICONS.info}</svg>`;
  const minutes = value => { const [h, m] = value.split(':').map(Number); return h * 60 + m; };
  const formatTime = value => { const normal = ((value % 1440) + 1440) % 1440; return `${String(Math.floor(normal / 60)).padStart(2, '0')}:${String(normal % 60).padStart(2, '0')}`; };
  const duration = event => minutes(event.end) - minutes(event.start);
  const isSession = event => !event.tour && !['travel', 'queue', 'rest', 'prep'].includes(event.kind);
  const venue = name => VENUES.find(item => item.name === name);
  const dateInfo = date => DAYS.find(day => day.date === date);
  const courseBlocks = event => isSession(event) && (event.date < TRIP.conferenceStart || event.date > TRIP.conferenceEnd);
  const onDay = (mode = state.mode, date = state.day) => [
    ...DATA[mode].filter(event => event.date === date && !event.hotelDeparture && date >= TRIP.conferenceStart && date <= TRIP.conferenceEnd).map(event => courseBlocks(event) ? { ...event, blocked: true } : event),
    ...TRIP.events.filter(event => event.date === date),
    ...[hotelDeparture(mode, date)].filter(Boolean)
  ].sort((a, b) => Date.parse(a.startISO || `${a.date}T${a.start}:00-08:00`) - Date.parse(b.startISO || `${b.date}T${b.start}:00-08:00`));
  const findEvent = uid => {
    const event = [...Object.values(DATA).flat(), ...TRIP.events, hotelDeparture('plan'), hotelDeparture(state.mode)].find(item => item?.uid === uid);
    return event && courseBlocks(event) ? { ...event, blocked: true } : event;
  };
  const dayLabel = date => { const day = dateInfo(date); return `${day.short}（${day.ja}）`; };
  const roomLabel = event => event.room ? event.room.split(' | ')[0] : '詳細な場所は公式案内を確認';

  function vegasNow() {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).map(part => [part.type, part.value]));
    return { date: `${parts.year}-${parts.month}-${parts.day}`, minute: Number(parts.hour) * 60 + Number(parts.minute) };
  }

  let storageAvailable = true;
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}; } catch { storageAvailable = false; }
  const today = vegasNow();
  const state = {
    page: 'home',
    day: DAYS.some(day => day.date === saved.day) ? saved.day : (dateInfo(today.date) ? today.date : DAYS[0].date),
    mode: ['plan', 'run'].includes(saved.mode) ? saved.mode : 'plan',
    checks: Array.isArray(saved.checks) ? saved.checks.filter(value => Number.isInteger(value) && value >= 0 && value < CHECKS.length) : [],
    query: '',
    logistics: true,
    mapAllocation: null
  };

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ day: state.day, mode: state.mode, checks: state.checks })); storageAvailable = true; }
    catch { storageAvailable = false; }
    $('#storage-note').textContent = storageAvailable ? 'チェックはこのブラウザに保存されます。' : 'この環境では保存できません。チェックは表示中のみ有効です。';
  }

  function status(event) {
    if (event.tour) return ['keynote', event.flight || (event.kind === 'transfer' ? 'JTB 専用バス' : 'JTB B1'), event.kind === 'flight' ? 'plane' : 'calendar'];
    if (event.blocked) return ['cut', '帰国日・参加不可', 'clock'];
    if (event.kind === 'social') return ['social', '交流・参加予定', 'people'];
    if (event.kind === 'run') return ['conditional', '参加候補・要受付', 'people'];
    if (event.kind === 'registration') return ['conditional', '現地申込・キット受取', 'check'];
    if (event.kind === 'cut') return ['cut', event.reserved ? '予約済み・別案' : '見送り候補', 'info'];
    if (event.kind === 'conflict') return ['cut', '時間が重複', 'info'];
    if (event.reserved) return ['reserved', '予約済み', 'check'];
    if (event.kind === 'keynote') return ['keynote', event.date === '2026-12-01' ? '参加必須' : '基調講演', 'calendar'];
    if (event.kind === 'conditional') return ['conditional', '満席・当日入場', 'people'];
    return ['walkup', '当日入場', 'people'];
  }
  function badge(event) {
    const [type, label, symbol] = status(event);
    return `<span class="status-label ${type}">${icon(symbol)}${label}</span>`;
  }

  function renderDays() {
    const focusId = document.activeElement?.id;
    ['home', 'schedule'].forEach(section => {
      $(`#${section}-days`).innerHTML = DAYS.map((day, index) => `<button type="button" id="day-${section}-${index}" data-day="${day.date}" aria-pressed="${state.day === day.date}" aria-label="${day.short} ${day.ja}曜日"><span class="day-en">${day.en}</span><span class="day-date">${day.short}</span></button>`).join('');
    });
    $('#route-day').value = state.day;
    if (focusId?.startsWith('day-')) document.getElementById(focusId)?.focus({ preventScroll: true });
  }

  function renderHome() {
    const events = onDay();
    const departure = events.find(event => event.hotelDeparture);
    $('#home-departure').hidden = !departure;
    $('#home-departure').innerHTML = departure ? `<div class="hotel-departure-time"><span class="field-label">ホテル出発の目安</span><strong>${escape(departure.start)} <small>PST</small></strong></div><div class="hotel-departure-copy"><strong>${escape(TRIP.hotel.name)} → ${escape(departure.to)}</strong><p>${departure.departureNote ? escape(departure.departureNote) : `${escape(departure.sessionStart)}開始 − 移動${departure.travelMinutes}分（仮）− 入場待ち${departure.entryMinutes}分`}</p></div><button class="quiet-button" data-travel="${departure.uid}">経路を見る${icon('arrow')}</button>` : '';
    const sessions = events.filter(isSession);
    const travels = events.filter(event => event.kind === 'travel');
    const current = vegasNow();
    const first = current.date === state.day ? sessions.find(event => minutes(event.end) > current.minute) : sessions[0];
    $('#home-day-title').textContent = dateInfo(state.day).long;
    $('#route-card-title').textContent = 'この日のルート';
    if (!sessions.length && events.some(event => event.tour)) { renderJourneyHome(events.filter(event => event.tour)); return; }
    if (first) {
      const started = current.date === state.day && minutes(first.start) <= current.minute;
      const upcoming = current.date === state.day && !started;
      const queue = events.find(event => event.kind === 'queue' && event.end === first.start);
      $('#first-card').innerHTML = `<div class="first-top"><span class="eyebrow">${started ? 'IN PROGRESS · 進行中' : upcoming ? 'UP NEXT · 次の予定' : 'FIRST UP · 最初の予定'}</span>${badge(first)}</div><div class="first-time">${escape(first.start)}<span>— ${escape(first.end)}</span></div><h2 class="first-title">${escape(first.label)}</h2>${first.english ? `<p class="first-english">${escape(first.english)}</p>` : ''}<div class="venue-line"><span class="venue-icon">${icon('pin')}</span><div class="venue-copy"><strong>${escape(first.venue || '会場は未確認')}</strong><span>${escape(roomLabel(first))}${first.id ? ` · ${escape(first.id)}` : ''}</span></div></div><div class="first-bottom"><p>${['social', 'run', 'registration'].includes(first.kind) ? escape(first.summary) : queue ? `<b>${escape(queue.start)}</b> 入場待ち開始の目安` : '入場の案内は公式Agendaで確認'}</p><button class="primary-button" data-event="${first.uid}">予定の詳細${icon('arrow')}</button></div>`;
    } else {
      $('#first-card').innerHTML = `<div class="first-top"><span class="eyebrow">THAT'S A WRAP</span>${icon('check')}</div><div class="first-time">おつかれさま。</div><h2 class="first-title">この日の予定は終了しました。</h2><p class="first-english">気になったことを振り返って、次の一日に備えましょう。</p><div class="first-bottom"><button class="primary-button" data-go="schedule">一日を振り返る${icon('arrow')}</button></div>`;
    }
    const stops = travels.length ? [travels[0].from, ...travels.map(event => event.to)] : [...new Set(sessions.map(event => event.venue).filter(Boolean))];
    $('#home-route').innerHTML = stops.map((name, index) => `${index ? `<div class="route-connector">${icon('clock')}${duration(travels[index - 1])}分の移動枠</div>` : ''}<div class="route-stop"><span class="route-stop-dot" aria-hidden="true"></span><span>${escape(venue(name)?.short || name)}</span></div>`).join('') + (travels.length ? '' : '<p class="route-single">会場間の移動はないプラン。<br>同じ施設内でも、部屋まで余裕をもって。</p>');
    if (sessions.some(event => event.kind === 'social' && !event.venue)) $('#home-route').innerHTML += '<p class="route-single">夜のイベント会場・移動は未確認です。</p>';
    if (sessions.some(event => event.kind === 'run')) $('#home-route').innerHTML += '<p class="route-single">5K送迎の有無・乗り場・時刻は未確認。往復は仮の計画枠です。</p>';
    $('#day-summary').innerHTML = `<div class="summary-item"><strong>${sessions.length}</strong><span>${sessions.some(event => ['run', 'registration'].includes(event.kind)) ? '参加・受付の予定' : sessions.some(event => event.kind === 'social') ? 'セッション・交流' : 'セッション'}</span></div><div class="summary-item"><strong>${new Set(sessions.map(event => event.venue).filter(Boolean)).size}</strong><span>訪れる会場</span></div><div class="summary-item"><strong>${travels.reduce((sum, event) => sum + duration(event), 0)}<small>分</small></strong><span>確保する移動枠</span></div>`;
    $('#home-agenda').innerHTML = sessions.map(event => `<button class="preview-row" data-event="${event.uid}"><span class="preview-time">${escape(event.start)}</span><span><span class="preview-label">${escape(event.label)}</span><span class="preview-venue">${escape(event.venue || '会場は未確認')} · ${escape(status(event)[1])}</span></span>${icon('chevron')}</button>`).join('');
  }

  function renderJourneyHome(events) {
    const first = events[0];
    $('#first-card').innerHTML = `<div class="first-top"><span class="eyebrow">JTB B1 · この日の最初の予定</span>${badge(first)}</div><div class="first-time">${escape(first.start)}<span>${escape(first.startZone)}</span></div><h2 class="first-title">${escape(first.label)}</h2><p class="first-english">${escape(first.detail)}</p><div class="venue-line"><span class="venue-icon">${icon(first.kind === 'arrival' ? 'plane' : 'pin')}</span><div class="venue-copy"><strong>${escape(first.place)}</strong><span>${dayLabel(first.date)} · 現地時間 ${escape(first.startZone)}</span></div></div><div class="first-bottom"><p>便・集合場所は最終しおりで確認</p><button class="primary-button" data-event="${first.uid}">行程の詳細${icon('arrow')}</button></div>`;
    let stops, connections;
    if (state.day === TRIP.start) {
      $('#route-card-title').textContent = 'ラスベガスへ';
      stops = ['成田 NRT', 'シアトル SEA', 'ラスベガス LAS', TRIP.hotel.name];
      connections = ['AS124 · 18:25 JST発', 'AS1325 · 14:00 PST発', '到着後、専用バス'];
    } else if (state.day === '2026-12-04') {
      $('#route-card-title').textContent = '日本への帰路';
      stops = [TRIP.hotel.name, 'ラスベガス LAS', 'シアトル SEA', '成田 NRT'];
      connections = ['04:00 PST集合 · 専用バス', 'AS1322 · 07:00 PST発', 'AS123 · 12/5 16:00 JST着'];
    } else {
      $('#route-card-title').textContent = '旅の終わり';
      stops = ['成田 NRT']; connections = [];
    }
    $('#home-route').innerHTML = stops.map((name, index) => `${index ? `<div class="route-connector">${icon('plane')}${escape(connections[index - 1])}</div>` : ''}<div class="route-stop"><span class="route-stop-dot" aria-hidden="true"></span><span>${escape(name)}</span></div>`).join('') + (stops.length === 1 ? '<p class="route-single">16:00 JST到着予定。<br>入国審査・通関後に解散です。</p>' : '');
    const returning = state.day === '2026-12-04';
    const arrived = state.day === TRIP.end;
    $('#day-summary').innerHTML = `<div class="summary-item"><strong>${arrived ? '16:00' : '2'}${arrived ? '' : '<small>便</small>'}</strong><span>${arrived ? '成田着（JST）' : 'この日のフライト'}</span></div><div class="summary-item"><strong>${arrived ? '7' : '1'}<small>${arrived ? '日間' : '回'}</small></strong><span>${arrived ? 'ツアー全体' : 'シアトル乗継'}</span></div><div class="summary-item"><strong>${returning ? '12/5' : '5'}${returning ? '' : '<small>泊</small>'}</strong><span>${returning ? '日本帰着日' : 'ホテル（全旅程）'}</span></div>`;
    $('#home-agenda').innerHTML = events.map(event => `<button class="preview-row" data-event="${event.uid}"><span class="preview-time">${escape(event.start)}<small>${escape(event.startZone)}${event.timeSuffix ? ' 着後' : ''}</small></span><span><span class="preview-label">${escape(event.label)}</span><span class="preview-venue">${escape(event.flight || event.place)}</span></span>${icon('chevron')}</button>`).join('');
  }

  function journeyCard(event) {
    const arrival = event.end ? `${event.endDate !== event.date ? `${dayLabel(event.endDate)} ` : ''}${event.end} ${event.endZone}着` : '';
    return `<button class="session-card journey-card" data-event="${event.uid}"><span class="session-top">${badge(event)}</span><span class="session-title-line"><span class="session-title">${escape(event.label)}</span>${icon('chevron')}</span>${arrival ? `<span class="flight-times">${escape(event.start)} ${escape(event.startZone)}発 ${icon('arrow')} ${escape(arrival)}</span>` : ''}<span class="journey-note">${escape(event.detail)}</span></button>`;
  }

  function renderChecks() {
    $('#checklist').innerHTML = CHECKS.map((label, index) => `<label class="check-item"><input type="checkbox" data-check="${index}" ${state.checks.includes(index) ? 'checked' : ''}><span class="check-box" aria-hidden="true">${icon('check')}</span><span class="check-text">${escape(label)}</span></label>`).join('');
    updateCheckCount();
  }
  function updateCheckCount() { $('#check-count').textContent = `${new Set(state.checks).size} / ${CHECKS.length}`; }

  function venueGuideLinks(name) {
    const guide = VENUE_GUIDES[name];
    if (!guide) return '';
    return `<a class="text-link" href="${escape(guide.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(name)}の${escape(guide.label)}を開く">${escape(guide.label)}${icon('external')}</a>${guide.sourceURL ? `<a class="text-link" href="${escape(guide.sourceURL)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(name)}の公式案内を開く">公式案内${icon('external')}</a>` : ''}`;
  }

  function renderVenueResources() {
    $('#venue-guides').innerHTML = Object.entries(VENUE_GUIDES).map(([name, guide]) => `<div class="venue-guide-row"><div class="venue-guide-copy"><h3>${escape(venue(name).short)}</h3><p>${escape(guide.note)}</p></div><div class="venue-guide-links">${venueGuideLinks(name)}</div></div>`).join('');
    const contact = `<div class="hotel-contact-details"><span class="field-label">Harrah’sへの連絡先</span><a class="hotel-phone text-link" href="tel:${HOTEL_CONTACT.phone}" aria-label="Harrah’s Las Vegasの公式掲載番号 ${HOTEL_CONTACT.label}に電話する">${icon('phone')}${escape(HOTEL_CONTACT.label)}</a><p>${escape(HOTEL_CONTACT.note)}</p><address>${escape(HOTEL_CONTACT.address)}</address></div><a class="text-link" href="${escape(HOTEL_CONTACT.sourceURL)}" target="_blank" rel="noopener noreferrer">ホテル公式${icon('external')}</a>`;
    $$('.hotel-contact').forEach(element => { element.innerHTML = contact; });
  }

  function renderSchedule() {
    $$('[data-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === state.mode)));
    const allEvents = onDay();
    const query = state.query.trim().toLocaleLowerCase();
    const events = allEvents.filter(event => (state.logistics || isSession(event) || event.tour) && (!query || `${event.title} ${event.detail} ${event.start} ${event.end} ${event.flight || ''}`.toLocaleLowerCase().includes(query)));
    $('#schedule-day-title').textContent = dayLabel(state.day);
    const sessions = allEvents.filter(isSession);
    const socials = sessions.filter(event => event.kind === 'social');
    const activities = sessions.filter(event => ['run', 'registration'].includes(event.kind));
    const journeys = allEvents.filter(event => event.tour);
    $('#schedule-count').textContent = `${sessions.length - socials.length - activities.length}セッション${activities.length ? ` · 参加・受付 ${activities.length}件` : ''}${socials.length ? ` · 交流 ${socials.length}件` : ''}${journeys.length ? ` · JTB ${journeys.length}件` : ''}${query ? ` · 検索 ${events.length}件` : ''}`;
    $('#plan-description').textContent = {
      plan: 'JTB B1の往復と、移動・入場待ちに余裕を取ったセッション行程。',
      run: '火曜に5K申込・キット受取。水曜は05:00ホテル発 → 5K → 着替え → 10:00の予約済みTNC208へ。5Kの公式枠は06:30〜08:30ですが、07:30退場と送迎時刻は仮定です。DVT339・AIM110-Sは見送り、15:00のAIM336-R1に参加します。'
    }[state.mode];
    $('#timeline').innerHTML = events.map(event => {
      if (event.tour) return `<article class="timeline-row journey"><div class="timeline-time"><time datetime="${event.startISO}">${escape(event.start)}</time><small>${escape(event.startZone)}${event.timeSuffix ? ' 着後' : ''}</small></div><span class="timeline-marker" aria-hidden="true"></span>${journeyCard(event)}</article>`;
      const session = isSession(event);
      const content = session ? `<button class="session-card${event.blocked ? ' course-blocked' : ''}" data-event="${event.uid}"><span class="session-top">${badge(event)}${event.id ? `<span class="session-code">${escape(event.id)}</span>` : ''}</span><span class="session-title-line"><span class="session-title">${escape(event.label)}</span>${icon('chevron')}</span><span class="session-location">${icon('pin')}<span>${escape(event.venue || '会場は未確認')}${event.room ? ` · ${escape(roomLabel(event))}` : ''}</span></span>${event.summary ? `<span class="journey-note">${escape(event.summary)}</span>` : ''}${event.blocked ? '<span class="blocked-reason">B1は07:00ラスベガス発のため参加不可</span>' : ''}</button>` : `<div class="logistic-content">${icon(event.kind === 'travel' ? 'route' : event.kind === 'queue' ? 'people' : event.kind === 'prep' ? 'clock' : 'coffee')}<div class="logistic-copy"><strong>${escape(event.title)}</strong><small>${escape(event.detail.split(' · ').slice(1).join(' · '))}</small></div>${event.kind === 'travel' && venue(event.from) && venue(event.to) ? `<button class="logistic-map-button" data-travel="${event.uid}" aria-label="${escape(event.title)}をMAPで確認">${icon('map')}</button>` : ''}</div>`;
      return `<article class="timeline-row ${session ? 'session' : 'logistics'}"><div class="timeline-time"><time datetime="${event.date}T${event.start}:00-08:00">${escape(event.start)}</time><small>— ${escape(event.end)}</small></div><span class="timeline-marker" aria-hidden="true"></span>${content}</article>`;
    }).join('');
    $('#timeline').hidden = !events.length;
    $('#schedule-empty').hidden = !!events.length;
  }

  // These are planning allocations, not calculated routing durations.
  // Values for these six pairs come directly from the supplied HTML.
  const sourcePairs = new Map();
  DATA.plan.filter(event => event.kind === 'travel' && event.from && event.to).forEach(event => {
    sourcePairs.set([event.from, event.to].sort().join('|'), duration(event));
  });
  function allocation(from, to) {
    if (from === to) return { value: 15, origin: 'same' };
    const match = sourcePairs.get([from, to].sort().join('|'));
    if (match) return { value: match, origin: 'source' };
    if ([from, to].includes(TRIP.hotel.name)) return { value: [from, to].includes('MGM Grand') ? 60 : 45, origin: 'hotel' };
    return { value: [from, to].includes('MGM Grand') ? 60 : 45, origin: 'draft' };
  }

  function hotelDeparture(mode = 'plan', date = state.day) {
    if (date < TRIP.conferenceStart || date > TRIP.conferenceEnd) return null;
    const planMode = mode;
    const events = DATA[planMode].filter(event => event.date === date).sort((a, b) => minutes(a.start) - minutes(b.start));
    const explicit = events.find(event => event.hotelDeparture);
    if (explicit) return explicit;
    const first = events.find(event => isSession(event) && !['cut', 'conflict'].includes(event.kind) && venue(event.venue));
    if (!first) return null;
    const queue = events.find(event => event.kind === 'queue' && event.end === first.start);
    const entryMinutes = queue ? duration(queue) : 20;
    const travelMinutes = allocation(TRIP.hotel.name, first.venue).value;
    const end = formatTime(minutes(first.start) - entryMinutes);
    const start = formatTime(minutes(first.start) - entryMinutes - travelMinutes);
    const title = 'ホテル出発（目安）';
    return {
      uid: `hotel-departure-${mode}-${date}`, date, start, end,
      kind: 'travel', hotelDeparture: true, title, label: title,
      from: TRIP.hotel.name, to: first.venue, planMode,
      targetUid: first.uid, sessionStart: first.start, entryMinutes, travelMinutes,
      detail: `${title} · ${TRIP.hotel.name} → ${first.venue}。${first.start}開始 − 移動${travelMinutes}分（仮）− 入場待ち${entryMinutes}分。移動時間は未実測です。`
    };
  }

  function setupMap() {
    const options = VENUES.map(item => `<option value="${escape(item.name)}">${escape(item.short)}</option>`).join('');
    $('#origin').innerHTML = options;
    $('#destination').innerHTML = options;
    $('#route-day').innerHTML = DAYS.map(day => `<option value="${day.date}">${day.short}（${day.ja}）</option>`).join('');
    $('#venue-map').style.aspectRatio = `${GEO.width} / ${GEO.height}`;
    $('#venue-map').innerHTML = `<svg class="map-art" viewBox="0 0 ${GEO.width} ${GEO.height}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${GEO.buildings.map(item => `<path class="map-building" d="${escape(item.d)}"/>`).join('')}${GEO.roads.map(item => `<path class="map-road" d="${escape(item.d)}"/>`).join('')}${GEO.labels.map(item => `<text class="map-street-text" x="${item.point[0]}" y="${item.point[1]}" transform="rotate(${item.angle} ${item.point.join(' ')})" text-anchor="middle">${escape(item.text)}</text>`).join('')}<g id="map-route-lines"></g><g id="map-stations">${GEO.stations.map(item => `<g class="map-station" transform="translate(${item.point.join(' ')})"><title>${escape(item.name)}駅</title><rect x="-22" y="-22" width="44" height="44" rx="7"/></g>`).join('')}</g><g id="map-label-leaders"></g></svg><div class="north-indicator">${icon('arrow')}<span>N</span></div>${VENUES.map(item => `<button class="map-location venue-${item.css}" data-venue="${escape(item.name)}" aria-label="${escape(item.short)}を目的地にする"><span class="pin-dot" aria-hidden="true"></span><span class="pin-label"><span>${escape(item.short)}</span><small hidden></small></span></button>`).join('')}<div class="map-legend" aria-hidden="true"><span><i></i>出発地</span><span><i class="destination-dot"></i>目的地</span></div><div id="map-scale" class="map-scale" aria-label="地図の縮尺、500メートル"><span class="scale-rule"></span><span>500 m</span></div>`;
    $$('.map-location').forEach(button => {
      const point = venue(button.dataset.venue).point;
      button.style.left = `${point[0] / GEO.width * 100}%`;
      button.style.top = `${point[1] / GEO.height * 100}%`;
    });
    $('#map-scale').style.width = `${500 / GEO.width * 100}%`;
    $('#map-source-places').innerHTML = VENUES.map(item => `<a href="${escape(item.source)}" target="_blank" rel="noopener noreferrer">${escape(item.short)}</a>`).join('');
    const firstTravel = onDay().find(event => event.kind === 'travel');
    if (firstTravel) applyTravel(firstTravel, false);
    else { $('#origin').value = 'Venetian'; $('#destination').value = 'Wynn/Encore'; }
    updatePlanner();
    const observer = new ResizeObserver(() => requestAnimationFrame(layoutMapLabels));
    observer.observe($('#venue-map'));
    $$('.pin-label').forEach(label => observer.observe(label));
  }

  function layoutMapLabels() {
    const map = $('#venue-map'), bounds = map.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const sx = bounds.width / GEO.width, sy = bounds.height / GEO.height;
    const items = $$('.map-location').map(button => {
      const label = $('.pin-label', button), source = venue(button.dataset.venue);
      label.style.maxWidth = `${Math.min(170, Math.max(100, bounds.width * .46))}px`;
      const rect = label.getBoundingClientRect();
      return { button, label, x: source.point[0] * sx, y: source.point[1] * sy, w: rect.width, h: rect.height };
    });
    const placed = $$('.north-indicator, .map-legend, .map-scale').map(node => {
      const r = node.getBoundingClientRect();
      return { x: r.left - bounds.left, y: r.top - bounds.top, w: r.width, h: r.height };
    });
    const overlap = (a, b, pad = 5) => Math.max(0, Math.min(a.x + a.w + pad, b.x + b.w + pad) - Math.max(a.x - pad, b.x - pad)) * Math.max(0, Math.min(a.y + a.h + pad, b.y + b.h + pad) - Math.max(a.y - pad, b.y - pad));
    items.sort((a, b) => items.filter(p => Math.hypot(p.x - b.x, p.y - b.y) < 100).length - items.filter(p => Math.hypot(p.x - a.x, p.y - a.y) < 100).length);
    const leaders = [];
    for (const item of items) {
      const { x, y, w, h } = item;
      const candidates = [
        [x + 17, y - h / 2], [x - w - 17, y - h / 2], [x - w / 2, y - h - 17], [x - w / 2, y + 17],
        [x - w - 15, y - h - 14], [x + 15, y - h - 14], [x - w - 15, y + 15], [x + 15, y + 15]
      ];
      for (let top = 8; top <= bounds.height - h - 8; top += 14) {
        candidates.push([8, top], [bounds.width - w - 8, top]);
      }
      const choices = candidates.map(([left, top]) => {
        const rect = { x: Math.max(8, Math.min(bounds.width - w - 8, left)), y: Math.max(8, Math.min(bounds.height - h - 8, top)), w, h };
        const end = [Math.max(rect.x, Math.min(rect.x + w, x)), Math.max(rect.y, Math.min(rect.y + h, y))];
        const labelOverlap = placed.reduce((sum, other) => sum + overlap(rect, other), 0);
        const pointOverlap = items.reduce((sum, other) => sum + overlap(rect, { x: other.x - 7, y: other.y - 7, w: 14, h: 14 }, 2), 0);
        return { rect, end, cost: labelOverlap * 10000 + pointOverlap * 10000 + Math.hypot(end[0] - x, end[1] - y) };
      }).sort((a, b) => a.cost - b.cost);
      const best = choices[0];
      item.label.style.left = `${best.rect.x - x + 22}px`;
      item.label.style.top = `${best.rect.y - y + 22}px`;
      placed.push(best.rect);
      if (Math.hypot(best.end[0] - x, best.end[1] - y) > 10) leaders.push(`<path d="M${x / sx},${y / sy}L${best.end[0] / sx},${best.end[1] / sy}"/>`);
    }
    $('#map-label-leaders').innerHTML = leaders.join('');
  }

  function renderMapRoute(from, to) {
    const key = `${from}|${to}`;
    const route = ROUTES.transit[key] || ROUTES.walks[key];
    $('#map-stations').setAttribute('hidden', '');
    $('#map-route-lines').innerHTML = route ? route.legs.map(leg => {
      const d = `M${leg.points.map(point => point.join(',')).join('L')}`;
      return `<path class="route-casing" d="${d}"/><path class="map-route route-${leg.kind}" d="${d}"/>`;
    }).join('') : '';
    if (route?.mode === 'transit') $('#map-stations').removeAttribute('hidden');
    $('#map-route-notice').textContent = route ? '地図データから求めた移動候補です。現地の通行可否・大会入口・館内経路は未検証です。' : '同一施設内の経路は未確認です。館内マップで確認してください。';
    return route;
  }

  function routeOverview(from, to) {
    const official = { label: 'AWS交通案内', url: 'https://aws.amazon.com/events/reinvent/know-before-you-go/' };
    const rail = { label: '駅・停車順の出典', url: 'https://www.lvmonorail.com/route-map/' };
    const venetian = { label: '接続の出典', url: 'https://www.venetianlasvegas.com/resort/maps-and-parking.html' };
    if (from === to) return { title: '同じ施設内の移動', steps: [], note: '階・部屋までの経路と所要時間は未確認です。下の15分は計画用の仮置きです。', mode: 'walking', source: official };
    if ([from, to].includes('Venetian') && [from, to].includes('Wynn/Encore')) {
      const steps = ['Venetian会議エリア', 'Palazzo側', 'Sands Aveの歩道橋', 'Wynn / Encore会議エリア'];
      return { title: '歩道橋を通る徒歩候補', steps: from === 'Venetian' ? steps : steps.reverse(), note: 'Palazzo〜Wynnの歩道橋接続はVenetian公式で確認。地図の徒歩線は経路検索結果です。館内・大会入口の通行可否と所要時間は未確認です。', mode: 'walking', source: venetian };
    }
    const other = from === 'MGM Grand' ? to : from;
    const served = ['Venetian', 'Wynn/Encore', 'Caesars Forum', 'Caesars Palace', "Harrah's Las Vegas"];
    if ([from, to].includes('MGM Grand') && served.includes(other)) {
      const palace = other === 'Caesars Palace';
      const station = palace ? 'Flamingo / Caesars Palace駅' : 'Harrah’s / The LINQ駅';
      const north = from === 'MGM Grand';
      const via = palace ? 'Horseshoe / Paris経由' : north ? 'Horseshoe / Paris・Flamingo経由' : 'Flamingo・Horseshoe / Paris経由';
      const ride = `モノレール${north ? '北行' : '南行'}（${via}）`;
      const steps = north ? ['MGM Grand会議エリア', 'MGM Grand駅', ride, station, venue(other).short] : [venue(other).short, station, ride, 'MGM Grand駅', 'MGM Grand会議エリア'];
      return { title: 'モノレールを使う移動候補', steps, note: `${palace ? 'Flamingo / Caesars Palace駅はFlamingo内で、Palaceへは徒歩移動が必要です。' : other === 'Wynn/Encore' ? 'WynnからHarrah’s / The LINQ駅までの徒歩は経路検索に基づく候補です。' : 'Harrah’s / The LINQ駅は、公式案内でこの施設へのアクセス駅として掲載されています。'}駅・停車順は公式確認済み。会場⇔駅の線は徒歩の検索結果で、館内の通行可否・時間は未確認です。`, mode: 'transit', source: rail };
    }
    return { title: '徒歩経路の検索結果', steps: [venue(from).short, venue(to).short], note: '地図データ上の徒歩候補です。専用通路や大会入口を考慮できていない場合があります。館内の通行可否・所要時間は未確認です。', mode: 'walking', source: { label: '徒歩経路の出典', url: 'https://valhalla.openstreetmap.de/' } };
  }

  function updatePlanner() {
    const from = $('#origin').value;
    const to = $('#destination').value;
    const selected = state.mapAllocation;
    const estimate = selected?.from === from && selected.to === to ? { value: duration(selected), origin: 'assumed' } : allocation(from, to);
    const route = routeOverview(from, to);
    renderMapRoute(from, to);
    $('#route-guide').innerHTML = `<span class="field-label">道のりの概要</span><h3>${escape(route.title)}</h3>${route.steps.length ? `<ol class="route-steps">${route.steps.map(step => `<li>${escape(step)}</li>`).join('')}</ol>` : ''}<p>${escape(route.note)}</p><a class="text-link" href="${escape(route.source.url)}" target="_blank" rel="noopener noreferrer">${escape(route.source.label)}${icon('external')}</a>`;
    const entry = Number($('#entry-buffer').value);
    const arrival = $('#arrival-time').value;
    $('#travel-number').innerHTML = `${estimate.value}<span>分</span><small>${estimate.origin === 'assumed' ? '5K Run案の仮枠・未実測' : ['draft', 'hotel'].includes(estimate.origin) ? '仮置き・未実測' : estimate.origin === 'same' ? '同一会場内の仮置き' : '添付行程の計画枠'}</small>`;
    $('#travel-description').textContent = estimate.origin === 'same' ? '同じ施設でも部屋が離れる場合があります。施設内移動として仮に15分を確保。' : '交通の待ち・館内移動を含む予定上の枠です。実測の所要時間ではありません。';
    $('#estimate-source').textContent = estimate.origin === 'assumed' ? `${selected.detail.split(' · ').slice(1).join(' · ')} 実測の所要時間ではありません。` : estimate.origin === 'source' ? '添付HTMLの移動枠を使用。逆方向も同じ枠で仮置きしています。経路・交通状況の実測値ではありません。' : estimate.origin === 'same' ? '施設内移動は15分の仮置きです。階・部屋・混雑に応じて余裕を追加してください。' : estimate.origin === 'hotel' ? 'ホテル⇔会場の時間はJTBのPDFに記載がありません。近隣45分・MGM60分の仮の計画枠です。空港への専用バスとは別の移動です。' : '元の行程にない区間です。近隣45分・MGMを含む区間60分で仮置きしています。公式案内や実際の経路で調整してください。';
    if (/^\d{2}:\d{2}$/.test(arrival)) {
      const departure = minutes(arrival) - estimate.value - entry;
      $('#departure-result').innerHTML = `<p>出発時刻の目安</p><strong>${departure < 0 ? '前日 ' : ''}${formatTime(departure)}<span>に出発</span></strong><small>${escape(arrival)} 開始 − 移動 ${estimate.value}分 − 入場待ち ${entry}分</small>`;
    } else {
      $('#departure-result').innerHTML = '<p>セッションの開始時刻を入力してください。</p>';
    }
    const params = new URLSearchParams({ api: '1', origin: venue(from).query, destination: venue(to).query });
    if (route.mode) params.set('travelmode', route.mode);
    $('#directions-link').href = `https://www.google.com/maps/dir/?${params}`;
    const start = venue(from).point, end = venue(to).point;
    const distance = Math.hypot(start[0] - end[0], start[1] - end[1]);
    $('#map-distance').textContent = from === to ? '同一施設の代表位置を選択中' : `選択した代表点間の直線距離：約${distance < 1000 ? `${Math.round(distance / 10) * 10}m` : `${(distance / 1000).toFixed(1)}km`}（徒歩距離ではありません）`;
    $$('.map-location').forEach(button => {
      const name = button.dataset.venue;
      button.dataset.state = name === to ? 'destination' : name === from ? 'origin' : '';
      button.setAttribute('aria-pressed', String(name === to));
      const caption = $('small', button);
      if (caption) { caption.textContent = name === to && name === from ? '出発地・目的地' : name === to ? '目的地' : name === from ? '出発地' : ''; caption.hidden = !caption.textContent; }
    });
    layoutMapLabels();
  }

  function applyTravel(event, navigate = true) {
    if (!venue(event.from) || !venue(event.to)) return;
    state.mapAllocation = event.assumed ? event : null;
    $('#origin').value = event.from;
    $('#destination').value = event.to;
    const plan = DATA[event.planMode || state.mode];
    const next = event.hotelDeparture ? plan.find(item => item.uid === event.targetUid) : plan.find(item => item.date === event.date && isSession(item) && minutes(item.start) >= minutes(event.end));
    if (event.arrivalTime) {
      $('#arrival-time').value = event.arrivalTime;
      $('#entry-buffer').value = String(event.entryMinutes ?? 0);
    } else if (next) {
      $('#arrival-time').value = next.start;
      const queue = plan.filter(item => item.date === event.date && item.kind === 'queue' && item.end === next.start).at(-1);
      const buffer = event.entryMinutes ?? (queue ? duration(queue) : 20);
      $('#entry-buffer').value = ['0', '20', '30', '60'].includes(String(buffer)) ? String(buffer) : '20';
    }
    if (navigate) { updatePlanner(); go('map'); }
  }

  function renderDailyRoutes() {
    const travels = onDay().filter(event => event.kind === 'travel');
    $('#route-plan-label').textContent = state.mode === 'run' ? '5K Run案' : 'おすすめ';
    $('#map-plan-note').hidden = state.mode !== 'run' || state.day !== '2026-12-02';
    const transfers = TRIP.events.filter(event => event.date === state.day && event.kind === 'transfer');
    $('#daily-routes').innerHTML = transfers.length ? transfers.map(event => `<button class="transfer-summary" data-event="${event.uid}"><span class="venue-icon">${icon('route')}</span><span><strong>${escape(event.start)} ${escape(event.startZone)}${event.timeSuffix || ' 集合'}</strong><span>${escape(event.place)}</span></span><span class="status-label keynote">専用バス</span>${icon('chevron')}</button>`).join('') : travels.length ? travels.map(event => `<div class="daily-route"><time datetime="${event.date}T${event.start}:00-08:00">${escape(event.start)} — ${escape(event.end)}${event.hotelDeparture ? '<small>ホテル出発の目安</small>' : ''}${!venue(event.from) || !venue(event.to) ? '<small>送迎・経路未確認</small>' : ''}</time><div class="daily-route-names"><span>${escape(venue(event.from)?.short || event.from)}</span>${icon('arrow')}<span>${escape(venue(event.to)?.short || event.to)}</span></div><div class="daily-route-duration">${duration(event)}<small>${event.hotelDeparture || event.assumed ? '分・仮' : '分'}</small></div>${venue(event.from) && venue(event.to) ? `<button class="logistic-map-button" data-travel="${event.uid}" aria-label="${escape(event.title)}を計算機で確認">${icon('arrow')}</button>` : ''}</div>`).join('') : '<p class="daily-route-empty">この日の行程には、会場間の移動がありません。</p>';
  }

  function chooseDay(date) {
    if (!dateInfo(date)) return;
    state.day = date;
    state.mapAllocation = null;
    const travel = onDay().find(item => item.kind === 'travel');
    if (travel) applyTravel(travel, false);
    renderDays();
    renderHome();
    renderSchedule();
    renderDailyRoutes();
    updatePlanner();
    save();
  }

  let dialogEvent = null;
  function openEvent(event) {
    dialogEvent = event;
    if (event.tour) {
      const end = event.end ? `<dt>到着</dt><dd>${dayLabel(event.endDate)} ${escape(event.end)} ${escape(event.endZone)}</dd>` : '';
      $('#dialog-body').innerHTML = `${badge(event)}<h2 id="dialog-title" class="dialog-title">${escape(event.title)}</h2><dl class="dialog-facts"><dt>${event.kind === 'flight' ? '出発' : event.kind === 'arrival' ? '到着' : '時刻'}</dt><dd>${dayLabel(event.date)} ${escape(event.start)} ${escape(event.startZone)}${event.timeSuffix ? ' 着後' : ''}</dd>${end}<dt>場所</dt><dd>${escape(event.place)}</dd>${event.flight ? `<dt>便名</dt><dd>${escape(event.flight)}</dd>` : ''}</dl><p class="dialog-note">${escape(event.detail)}</p><p class="dialog-note">${escape(TRIP.sourceNote)}</p>${event.venue ? '<div class="dialog-actions"><button class="primary-button" id="dialog-map">宿泊先をMAPで見る' + icon('map') + '</button></div>' : ''}`;
      $('#event-dialog').showModal();
      return;
    }
    const note = event.detail.split(' · ').filter(part => part !== event.id && part !== event.english && part !== event.location).join(' · ');
    const sourceNote = event.source === 'user' ? 'ご指定の参加予定です。主催者の最新案内で確認してください。' : event.source === 'official' ? '公式カタログの掲載情報と個人の仮予定を区別して記載しています。最新案内で再確認してください。' : '添付行程の情報です。最新の時刻・部屋・予約状況は公式Agendaで確認してください。';
    const mapAction = venue(event.venue) ? `<button class="primary-button" id="dialog-map">会場をMAPで見る${icon('map')}</button>` : event.venue ? `<a class="primary-button" href="https://www.google.com/maps/search/?${new URLSearchParams({ api: '1', query: event.location || event.venue })}" target="_blank" rel="noopener noreferrer">Google Mapsで場所を確認${icon('external')}</a>` : '';
    const venueResources = VENUE_GUIDES[event.venue] ? `<div class="dialog-venue-guide"><span class="field-label">会場入口・館内図</span><div class="venue-guide-links">${venueGuideLinks(event.venue)}</div><p class="dialog-note">施設の常設図です。re:Invent専用入口・当日の通行範囲は公式Agendaと現地案内で確認してください。</p></div>` : '';
    $('#dialog-body').innerHTML = `${badge(event)}<h2 id="dialog-title" class="dialog-title">${escape(event.label)}</h2>${event.english ? `<p class="dialog-english">${escape(event.english)}</p>` : ''}<dl class="dialog-facts"><dt>${['social', 'run', 'registration'].includes(event.kind) ? '参加予定' : '日時'}</dt><dd>${dayLabel(event.date)} ${escape(event.start)}–${escape(event.end)} PST${event.kind === 'run' ? '（仮）' : ''}</dd>${event.officialStart ? `<dt>公式掲載枠</dt><dd>${escape(event.officialStart)}–${escape(event.officialEnd)} PST（実際のスタート時刻は未確認）</dd>` : ''}${event.doors ? `<dt>開場</dt><dd>${escape(event.doors)} PST（予定）</dd>` : ''}${event.programStart ? `<dt>開始</dt><dd>${escape(event.programStart)} PST</dd>` : ''}<dt>会場</dt><dd>${escape(event.venue || '未確認')}</dd>${event.location ? `<dt>場所</dt><dd>${escape(event.location)}</dd>` : ''}${event.fee ? `<dt>参加費</dt><dd>${escape(event.fee)}</dd>` : ''}${event.id ? `<dt>ID</dt><dd>${escape(event.id)}</dd>` : ''}</dl>${event.blocked ? `<p class="blocked-reason">${escape(TRIP.notice)}</p>` : ''}<p class="dialog-note">${escape(note)}<br>${escape(sourceNote)}</p>${event.sourceURL ? `<p><a class="text-link" href="${escape(event.sourceURL)}" target="_blank" rel="noopener noreferrer">公式カタログ${icon('external')}</a></p>` : ''}${venueResources}${mapAction ? `<div class="dialog-actions">${mapAction}</div>` : ''}`;
    $('#event-dialog').showModal();
  }

  function go(page) {
    if (location.hash === `#${page}`) { showPage(page); return; }
    location.hash = page;
  }
  function showPage(page, focus = true) {
    if (!COPY[page]) page = 'home';
    state.page = page;
    const [eyebrow, title, description, label] = COPY[page];
    $('#page-eyebrow').textContent = eyebrow;
    $('#page-title').textContent = title;
    $('#page-description').textContent = description;
    $('#topbar-page').textContent = label;
    document.title = `${label} · re:Invent のしおり`;
    $$('.page').forEach(section => { section.hidden = section.id !== `${page}-page`; });
    if (page === 'map') requestAnimationFrame(layoutMapLabels);
    $$('[data-page]').forEach(link => { if (link.dataset.page === page) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current'); });
    if (focus) { window.scrollTo({ top: 0, behavior: 'instant' }); $('#main').focus({ preventScroll: true }); }
  }

  document.addEventListener('click', event => {
    const target = event.target.closest('button');
    if (!target) return;
    if (target.dataset.go) {
      if (target.dataset.go === 'map' && state.page === 'home') {
        const travel = onDay().find(item => item.kind === 'travel');
        if (travel) applyTravel(travel, false);
        updatePlanner();
      }
      go(target.dataset.go);
    }
    if (target.dataset.day) chooseDay(target.dataset.day);
    if (['plan', 'run'].includes(target.dataset.mode)) {
      state.mode = target.dataset.mode;
      state.mapAllocation = null;
      const travel = onDay().find(item => item.kind === 'travel');
      if (travel) applyTravel(travel, false);
      renderHome(); renderSchedule(); renderDailyRoutes(); updatePlanner(); save();
    }
    if (target.dataset.event) { const item = findEvent(target.dataset.event); if (item) openEvent(item); }
    if (target.dataset.travel) { const item = findEvent(target.dataset.travel); if (item?.from && item?.to) applyTravel(item); }
    if (target.dataset.venue) { state.mapAllocation = null; $('#destination').value = target.dataset.venue; updatePlanner(); }
    if (target.id === 'dialog-map' && dialogEvent?.venue) {
      state.mapAllocation = null;
      $('#destination').value = dialogEvent.venue;
      if (!dialogEvent.tour) {
        $('#arrival-time').value = dialogEvent.start;
        const queue = DATA[state.mode].find(item => item.date === dialogEvent.date && item.kind === 'queue' && item.end === dialogEvent.start);
        $('#entry-buffer').value = ['social', 'registration'].includes(dialogEvent.kind) ? '0' : String(queue ? duration(queue) : 20);
      }
      updatePlanner(); $('#event-dialog').close(); go('map');
    }
    if (target.id === 'hotel-map') { state.mapAllocation = null; $('#destination').value = TRIP.hotel.name; updatePlanner(); go('map'); }
    if (target.id === 'hotel-origin') {
      const departure = hotelDeparture(state.mode);
      if (departure) { applyTravel(departure, false); updatePlanner(); $('#origin').focus(); return; }
      state.mapAllocation = null;
      const first = onDay().find(item => isSession(item) && venue(item.venue));
      $('#origin').value = TRIP.hotel.name;
      $('#destination').value = first?.venue || 'Caesars Forum';
      if (first) {
        $('#arrival-time').value = first.start;
        const queue = onDay().filter(item => item.kind === 'queue' && item.end === first.start).at(-1);
        const buffer = queue ? duration(queue) : 20;
        $('#entry-buffer').value = ['0', '20', '30', '60'].includes(String(buffer)) ? String(buffer) : '20';
      }
      updatePlanner();
      $('#origin').focus();
    }
  });
  document.addEventListener('change', event => {
    if (event.target.matches('[data-check]')) {
      const index = Number(event.target.dataset.check);
      state.checks = event.target.checked ? [...new Set([...state.checks, index])] : state.checks.filter(value => value !== index);
      updateCheckCount(); save();
    }
  });
  $('#session-search').addEventListener('input', event => { state.query = event.target.value; renderSchedule(); });
  $('#clear-search').addEventListener('click', () => { state.query = ''; $('#session-search').value = ''; renderSchedule(); $('#session-search').focus(); });
  $('#show-logistics').addEventListener('change', event => { state.logistics = event.target.checked; renderSchedule(); });
  ['origin', 'destination', 'arrival-time', 'entry-buffer'].forEach(id => {
    const update = () => { if (['origin', 'destination'].includes(id)) state.mapAllocation = null; updatePlanner(); };
    $(`#${id}`).addEventListener('input', update); $(`#${id}`).addEventListener('change', update);
  });
  $('#swap-route').addEventListener('click', () => { state.mapAllocation = null; const origin = $('#origin').value; $('#origin').value = $('#destination').value; $('#destination').value = origin; updatePlanner(); });
  $('#route-day').addEventListener('change', event => chooseDay(event.target.value));
  $('#close-dialog').addEventListener('click', () => $('#event-dialog').close());
  $('#event-dialog').addEventListener('click', event => { const bounds = event.currentTarget.getBoundingClientRect(); if (event.target === event.currentTarget && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) event.currentTarget.close(); });
  window.addEventListener('hashchange', () => showPage(location.hash.slice(1)));

  $$('[data-icon]').forEach(element => { element.innerHTML = icon(element.dataset.icon); });
  setupMap();
  renderVenueResources();
  renderDays(); renderHome(); renderChecks(); renderSchedule(); renderDailyRoutes();
  $('#storage-note').textContent = storageAvailable ? 'チェックはこのブラウザに保存されます。' : 'この環境では保存できません。チェックは表示中のみ有効です。';
  showPage(location.hash.slice(1) || 'home', false);
  window.setInterval(() => { if (vegasNow().date === state.day && !$('#event-dialog').open) renderHome(); }, 60000);
})();
