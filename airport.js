(() => {
  'use strict';
  const data = window.GUIDE_AIRPORT;
  const root = document.getElementById('airport-page');
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const sources = items => `<div class="airport-sources">${items.map(item => `<a href="${escape(item.url)}" target="_blank" rel="noopener noreferrer">${escape(item.label)}</a>`).join('')}</div>`;
  const panel = (id, content) => `<div id="airport-${id}" class="airport-panel" role="tabpanel" aria-labelledby="airport-tab-${id}" tabindex="0"${id !== 'outbound' ? ' hidden' : ''}>${content}</div>`;
  const flightCard = uid => {
    const event = window.GUIDE_TRIP.events.find(item => item.uid === uid);
    const day = date => { const [, m, d] = date.split('-'); return `${Number(m)}/${Number(d)}`; };
    return `<article class="airport-flight"><p>${escape(event.flight)} · ${escape(event.place)}</p><div><strong>${day(event.date)} ${escape(event.start)} <small>${escape(event.startZone)}</small></strong><span>発</span></div><div><strong>${day(event.endDate)} ${escape(event.end)} <small>${escape(event.endZone)}</small></strong><span>着</span></div></article>`;
  };
  const journey = (id, trip) => panel(id, `
    <h2 class="airport-panel-title">${escape(trip.title)}</h2>
    <div class="airport-callout"><strong>ここだけは確認</strong><p>${escape(trip.reminder)}</p></div>
    <div class="airport-flights">${trip.flights.map(flightCard).join('')}</div>
    <p class="airport-connection">${escape(trip.connection)}</p>
    <div class="airport-stages">${trip.stages.map(stage => `<article class="card airport-stage">
      <header><span class="airport-code">${escape(stage.code)}</span><div><p class="airport-kicker">${escape(stage.kicker)}</p><h3>${escape(stage.title)}</h3></div></header>
      <p class="airport-lead">${escape(stage.lead)}</p>
      <ol class="airport-steps">${stage.steps.map(([title, body]) => `<li><strong>${escape(title)}</strong><p>${escape(body)}</p></li>`).join('')}</ol>
      ${stage.alert ? `<p class="airport-caution">${escape(stage.alert)}</p>` : ''}
      ${sources(stage.sources)}
    </article>`).join('')}</div>`);
  const rules = panel('rules', `<h2 class="airport-panel-title">制約・持ち物</h2>
    <p class="airport-panel-intro">B1コースの荷物条件と、保安検査・申告の要点。詳しい条件は各項目の出典で確認できます。</p>
    <div class="airport-rule-grid">${data.rules.map(rule => `<article class="card airport-rule"><p class="airport-kicker">${escape(rule.tag)}</p><h3>${escape(rule.title)}</h3><ul>${rule.items.map(item => `<li>${escape(item)}</li>`).join('')}</ul>${sources(rule.sources)}</article>`).join('')}</div>
    <article class="card airport-rule airport-print-list"><h3>出発前の印刷メモ</h3><p>登録完了メール、往復eチケット、ホテル名入り日程表、ESTA控え、保険の契約内容・連絡先、パスポートコピー、英語名刺を準備。</p><p>B1しおりの抜粋はPDF通し番号 <strong>3–4、10–14、17–18</strong>（9ページ分）。表紙も1ページとして数えます。紙面下部の番号とは1つずれます。</p><p>この空港ガイドの「全項目を印刷・PDF保存」では、行き・帰り・制約・受け答えをまとめて出力できます。PDF保存後は端末内のファイルから開いてください。</p>${sources([{ label: 'B1しおりを開く', url: 'documents/b1-travel-guide-2026.pdf' }])}</article>`);
  const phrases = panel('phrases', `<h2 class="airport-panel-title">その場で見る受け答えメモ</h2>
    <div class="airport-callout"><strong>日付とホテル</strong><p>米国到着11/29、米国出発12/4、日本到着12/5。宿泊はHarrah’sの5泊。会社名・正式な職種は、自分の情報に置き換えてください。</p></div>
    ${data.phraseGroups.map(group => `<section class="airport-phrase-group"><h3>${escape(group.title)}</h3><p class="airport-panel-intro">${escape(group.intro)}</p><div class="airport-phrases">${group.phrases.map(phrase => `<article class="card airport-phrase"><h4>${escape(phrase.q)}</h4>${phrase.meaning ? `<p class="airport-question-meaning">${escape(phrase.meaning)}</p>` : ''}<p lang="en" class="airport-english">${escape(phrase.a)}</p><p>${escape(phrase.ja)}</p>${phrase.note ? `<p class="airport-phrase-note">${escape(phrase.note)}</p>` : ''}</article>`).join('')}</div></section>`).join('')}
    <section class="card airport-personal"><h3><label for="airport-personal-memo">自分用の追記</label></h3><p>正式な会社名・職種や、係員に確認したいことを書いておけます。</p><textarea id="airport-personal-memo" rows="6" placeholder="Company: …&#10;Job title: …&#10;確認したいこと: …" aria-describedby="airport-memo-status" spellcheck="false"></textarea><p id="airport-memo-status" role="status">追記はこのブラウザに保存されます。</p><pre class="airport-memo-print" id="airport-memo-print"></pre></section>
    <p class="airport-source-note">入国審査の質問例・持参書類はB1しおりPDF 10ページと事前説明会資料PDF 41ページを参照。英文はこの旅程に合わせた説明例です。</p>
    ${sources([{ label: '入国審査の案内 PDF 10', url: 'documents/b1-travel-guide-2026.pdf#page=10' }, { label: '説明会・入国用書類 PDF 41', url: 'documents/japan-tour-briefing-2026.pdf#page=41' }])}`);
  document.getElementById('airport-content').innerHTML = [journey('outbound', data.outbound), journey('return', data.return), rules, phrases].join('') + `
    <section class="airport-contact-section" aria-labelledby="airport-contact-heading"><h2 id="airport-contact-heading">困ったときの連絡先</h2><div class="airport-contacts">${data.contacts.map(contact => `<article class="card airport-contact"><p class="airport-kicker">${escape(contact.title)}</p><h3>${escape(contact.name)}</h3><a href="tel:${escape(contact.phone)}">${escape(contact.label)}</a><p>${escape(contact.note)}</p></article>`).join('')}</div>${sources([{ label: '成田連絡先 PDF 4', url: 'documents/b1-travel-guide-2026.pdf#page=4' }, { label: '現地連絡先 PDF 17', url: 'documents/b1-travel-guide-2026.pdf#page=17' }])}</section>`;

  const tabs = [...root.querySelectorAll('[data-airport-tab]')];
  const select = tab => {
    tabs.forEach(item => { const active = item === tab; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
    root.querySelectorAll('[role="tabpanel"]').forEach(item => { item.hidden = item.id !== tab.getAttribute('aria-controls'); });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault(); select(tabs[next]); tabs[next].focus();
    });
  });
  document.getElementById('airport-print').addEventListener('click', () => window.print());
  const memo = document.getElementById('airport-personal-memo');
  const memoStatus = document.getElementById('airport-memo-status');
  const memoPrint = document.getElementById('airport-memo-print');
  const key = 'reinvent-airport-memo-2026-v1';
  const updateMemo = () => { memoPrint.textContent = memo.value || '会社名・職種・確認したいこと：'; };
  try { memo.value = localStorage.getItem(key) || ''; }
  catch { memoStatus.textContent = 'この環境では保存できません。追記は表示中のみ有効です。'; }
  updateMemo();
  memo.addEventListener('input', () => {
    updateMemo();
    try { localStorage.setItem(key, memo.value); memoStatus.textContent = '追記はこのブラウザに保存されます。別の端末には同期されません。'; }
    catch { memoStatus.textContent = 'この環境では保存できません。追記は表示中のみ有効です。'; }
  });
})();
