/* Las Vegas practical reference. Sources checked 2026-11-22; hotel conditions are JTB B1-specific. */
(() => {
  'use strict';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pdf = (page, label) => ({ label, url: `documents/b1-travel-guide-2026.pdf#page=${page}` });
  const tipping = { label: 'Emily Post・チップの目安', url: 'https://emilypost.com/advice/general-tipping-guide' };
  const vegas = { label: 'ラスベガス観光局・飲酒とチップ', url: 'https://www.visitlasvegas.com/travel-professionals/' };
  const police = { label: 'LVMPD・観光客向けの注意点', url: 'https://www.lvmpd.com/services/tourist-safety/when-in-public-areas' };
  const sourceLinks = sources => `<div class="local-sources">${sources.map(s => `<a href="${escape(s.url)}" target="_blank" rel="noopener noreferrer">${escape(s.label)}</a>`).join('')}</div>`;
  const note = (title, text, type = '実用メモ') => ({ title, text, type });
  const cards = entries => `<div class="local-notes">${entries.map(entry => `<article class="local-note"><span class="local-type">${escape(entry.type)}</span><h3>${escape(entry.title)}</h3><p>${escape(entry.text)}</p></article>`).join('')}</div>`;
  const section = (id, title, caption, body, sources, open = false) => `<details class="card local-topic" id="local-${id}"${open ? ' open' : ''}><summary><span><strong>${escape(title)}</strong><small>${escape(caption)}</small></span></summary><div class="local-topic-body">${body}${sourceLinks(sources)}</div></details>`;
  const rows = [
    ['テーブルで接客を受ける飲食店', '税前15〜20％', '一般的な目安。B1しおりは18〜23％。迷うときは20％を計算の目安に。'],
    ['バーのドリンク', '1杯$1〜2／会計の15〜20％', '注文ごとか、まとめた会計時かを確認する。'],
    ['客室清掃', '1日$2〜5', '一般目安。清掃が入るなら日ごとに、Housekeeping – Thank youのメモと一緒に置く。'],
    ['ベルスタッフの荷物運び', '最初の1個$2、追加1個$1', '一般目安。B1説明会の荷物預かり案内は$2〜3を推奨。'],
    ['タクシー', '運賃の15〜20％', '荷物運びなど追加サービスは別途考える。'],
    ['テイクアウト・チップ瓶', '一律の義務なし', '追加サービスや大量注文などに応じて判断。端末の候補額をそのまま選ぶ必要はない。']
  ];
  const tipBody = `<p class="local-topic-intro">以下は慣習の目安。請求書に含まれる料金や、受けたサービスを確認して決めます。</p>
    <div class="local-table-wrap"><table class="local-tip-table"><caption class="sr-only">サービス別のチップの目安</caption><thead><tr><th scope="col">場面</th><th scope="col">目安</th><th scope="col">渡し方・確認</th></tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell, i) => i ? `<td>${escape(cell)}</td>` : `<th scope="row">${escape(cell)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>
    ${cards([
      note('最初に明細を見る', 'Gratuity included／Auto gratuityが付いていないか確認。Service chargeは名称だけで任意のチップと同じ扱いだと判断せず、サービス分を含むか店員に聞く。含まれている分に気付かず追加しない。'),
      note('カードか現金、どちらで払うか', 'カード会計のTip欄または端末で追加できる場合は、金額と合計を確認する。同じサービスに現金でも渡したら二重に加算しない。ホテル用には$1・$5の小額紙幣を分けておくと便利。'),
      note('添乗員・団体送迎のチップ', '今回の資料では、添乗員や団体バスに渡す一律の額は確定できない。ツアー代金への含まれ方や団体としての扱いを、JTB・添乗員に確認する。個人タクシーの相場をそのまま当てはめない。')
    ])}
    <div class="local-tip-calculator"><h3>チップ額の計算</h3><p>自動加算されていない場合の目安です。税金・必須料金は含みません。</p><div class="local-tip-fields"><label for="local-tip-base">税前の飲食代（USD）<input id="local-tip-base" type="number" min="0" step="0.01" inputmode="decimal" value="30"></label><label for="local-tip-rate">割合<select id="local-tip-rate"><option value="15">15％</option><option value="18">18％</option><option value="20" selected>20％</option><option value="23">23％</option></select></label></div><p id="local-tip-result" class="local-tip-result" aria-live="polite"></p></div>`;
  const hotel = [
    note('チェックインと保証金', 'Harrah’sは個人チェックイン。パスポートとクレジットカードを用意し、保証金の仮押さえ額と解除の見込みを確認。今回の資料に具体的な保証金額はない。仮押さえはその場で現金返金されるものではなく、利用可能枠への影響も確認する。', 'B1しおり'),
    note('宿泊代と個人利用を分ける', 'B1では部屋代・リゾートフィー・Taxは旅行代金に含まれる案内。飲食、ミニバーなど個人で使った分は別精算。Room chargeで部屋付けにした利用も明細を確認する。', 'B1しおり'),
    note('卓上ミニバーは動かさない', '備え付けの飲み物等は、少し動かしただけでも請求対象になるとしおりに記載。無料の水や私物の置き場所だと思って触らない。誤って動かしたら早めにフロントへ確認する。', 'B1しおり'),
    note('客室は電子タバコも禁煙', '今回の客室は全室禁煙。電子タバコも含む。喫煙は敷地内の指定場所をスタッフに確認し、客室や廊下で吸わない。', 'B1しおり'),
    note('Wi-Fiは無料枠2台まで', 'しおりでは無料利用は2デバイスまで、3台目以降は有料。スマホ・PCなど使う端末を決め、追加端末や有料アップグレードの画面を確認してから接続する。', 'B1しおり'),
    note('歯ブラシ・スリッパ・寝間着', '歯ブラシ、客室スリッパ、パジャマ、ひげ剃りはない案内。タオル・石鹸類、ドライヤー等は記載がある。自分が使う物は日本から用意する。', 'B1しおり'),
    note('清掃・タオル・冷蔵庫', 'Do Not Disturbを出す場合は、必要な清掃やタオルをどう頼むか確認。私物を冷やしたいときも、冷蔵庫の有無・利用可否・追加料金を先に聞く。清掃頻度や冷蔵庫無料を一律には想定しない。'),
    note('金庫とカードキー', '金庫は閉める前に操作を確認。カードキーの紛失や締め出しはフロントへ。部屋番号を人前で大きく言わず、知らない訪問者にはドアを開けずフロントへ確認する。'),
    note('帰国日は通常のチェックアウト時刻より早い', 'ホテルの通常チェックアウトは11:00だが、B1は12/4 04:00集合。集合前にチェックアウトと個人利用分の精算を済ませ、金庫・充電器・クローゼットを確認する。', 'B1しおり')
  ];
  const casino = [
    note('プレーは21歳以上・IDを用意', 'ネバダ州の賭博は21歳以上。21歳未満はゲームエリアに滞留できない。年齢確認を求められたら写真付きIDを提示できるようにし、日本人旅行者はパスポート原本を準備する。', '法律・施設'),
    note('座る前に最低ベット額を確認', '卓に表示されるMinimum／Maximumは1回の賭け金の範囲。分からなければ、参加前にディーラーへ最低額と進行を聞く。最初に使う金額と帰る時刻を決め、負けを取り返すための追加出金をしない運用にする。', '施設・実用'),
    note('卓での手順はディーラーに確認', 'ブラックジャックでは配札が始まったら賭けたチップに触らない。意思表示はハンドサインを使う。カードに触れてよいか、現金をどこに置くか、途中から参加できるかは、その卓の指示を聞く。', 'ゲームのマナー'),
    note('写真・動画・スマホは施設ごと', 'B1しおりはカジノ撮影禁止と案内。一方、MGMには一部のスロット・ポーカー撮影を条件付きで認める方針があり、全施設共通ではない。Harrah’sにも同じ条件が適用されるとは考えず、撮影・配信・卓上スマホは先にスタッフへ確認。他の客やスタッフを無断で撮らない。', '施設ごとに確認'),
    note('残高・チケット・チップを残さない', '台を離れる前に自分の残高の精算方法を確認し、払戻し券や会員カードの取り忘れに注意。券の期限・使える場所、チップの換金場所は係員へ確認。分からない残高や他人の券を勝手に使わない。'),
    note('飲み物が必ず無料とは限らない', 'しおりはプレー中の飲料無料と案内しているが、対象・注文条件・銘柄は施設で確認。バーで普通に注文する飲み物まで無料と思わない。提供を受けたときのチップも確認する。', '施設ごとに確認'),
    note('会員カードと支払いは別', 'Rewardsの会員カードはクレジットカードとは別。特典や無料サービスは条件を聞いてから利用し、口頭で勧められた内容も料金を確認する。換金や本人確認で困ったらカジノ係員・Securityに相談する。')
  ];
  const dining = [
    note('入口で席に案内してもらう', '着席型レストランは入口の受付で人数と予約名を伝える。自由席か分からなければ先に確認。高級店やクラブは服装・予約・入場条件も店の案内で確認する。'),
    note('会計は席で頼むことがある', '伝票が欲しいときは “Could I have the check, please?”。レジ払いか席払いかを確認し、Tax、Service charge、Gratuityなどの内訳を見てから支払う。割り勘したい場合は注文前に別会計できるか聞く。'),
    note('水・おかわり・持ち帰り', '水は “Tap water, please.” と伝えるとボトル水との区別を確認しやすい。おかわりや追加のパンが無料かは店ごとに確認。残りを持ち帰る場合は “Could I get a to-go box?”。'),
    note('アレルギーは注文前に', '対象がある場合は “I have an allergy to [食材]. Does this contain [食材]?” と具体的に伝える。必要なら調理器具の共用なども店に確認し、メニューの見た目だけで判断しない。'),
    note('飲酒は21歳から', 'バー・レストラン等で年齢確認を求められることがあるのでパスポートを準備。酒の持ち出しや屋外での飲酒は場所・容器等で条件が違うため、店や施設に確認する。今回の運用としては、提供された店内・イベントの許可エリアで飲む。', '法律・施設'),
    note('会議の食事と外食を分ける', 'B1資料では11/30〜12/3の朝食は07:00〜09:00、昼食は11:00〜13:00の案内。会場・参加条件はスケジュールの「当日の動き」と現地案内で確認。一般のレストラン会計までツアー代金に含まれるわけではない。', 'ツアー案内')
  ];
  const payment = [
    note('表示価格と支払総額を確認', 'メニューや値札だけで予算を決めず、税金・チップ・必須料金を含む総額を確認。店の端末で金額を確認してからタッチ・署名し、レシートはホテルや帰国後の精算まで残す。'),
    note('円換算決済の画面をよく見る', '店やATMでJPY（円）への換算を選ぶDCCには、独自の為替レートや上乗せ手数料が含まれる。USDとJPYの条件を見て選択し、店に勝手に決めてもらわない。USDでもカード会社側の為替・手数料が別途かかる場合がある。', 'カード決済'),
    note('小額紙幣と予備カード', 'カード決済に備えつつ、ホテルのチップなどに使う小額の現金を分けて持つ。カードが通らないときに備えて異なるブランドの予備も用意。ATMは手数料と換算条件を確認し、暗証番号の入力を見られないようにする。')
  ];
  const other = [
    note('横断歩道・歩道橋を使う', '大通りを横切って近道せず、信号・横断歩道・歩道橋の案内に従う。カジノを通り抜ける経路や夜間の出入口は現地表示で確認。夜は明るい人通りのある道を選ぶ。', '移動のルール'),
    note('配車は指定の乗り場で', 'ホテルのRideshare／Taxiの案内へ。Uber等ではアプリの車種・ナンバー・運転手を確認して乗り、シートベルトを着ける。路上の客引きの車にそのまま乗らず、ホテルスタッフや正規の配車を使う。'),
    note('路上の写真・勧誘・荷物', '着ぐるみ等との写真、CD、飲料の手渡しに反応する前に、不要なら断る。LVMPDは路上パフォーマー等への支払い・寄付が義務ではないと案内。財布・スマホ・バッグを放置せず、困ったらホテルのSecurityへ。', '観光客向け'),
    note('大麻・THC入り商品', 'ネバダ州でも公共の場所や移動中の車内での大麻使用は認められていない。客室の利用条件も別。菓子や飲料のTHC等の表示に注意し、旅行中は購入・使用しない運用にする。現地で販売されていることを、日本への持込可の根拠にしない。', '法律・施設'),
    note('水・上着・充電', '会場を長く歩くので、水と羽織れる上着を用意。充電器の入力表示が現地の電源に対応するか確認し、ホテル備品を充電用の私物と取り違えない。バッテリーの航空機持込条件は空港ガイドで確認する。'),
    note('事件・急病・紛失の連絡', '命に関わる緊急時は911。ホテル内ならSecurity／フロントにも知らせる。旅行中の相談・事件事故・急病はJTB現地緊急連絡先 +1-702-266-7404。保険の証券番号と保険会社の窓口も手元に用意する。', '困ったとき')
  ];
  document.getElementById('local-guide-content').innerHTML = [
    section('tips', 'チップ文化', '金額の目安、二重払いの確認、計算', tipBody, [tipping, vegas, pdf(22, 'B1・チップの目安 PDF 22'), { label: 'IRS・チップとサービス料の区別', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/tip-recordkeeping-and-reporting' }], true),
    section('hotel', 'ホテルのルール', 'Harrah’sの保証金、ミニバー、禁煙、Wi-Fi', cards(hotel), [pdf(14, 'B1・Harrah’sの条件 PDF 14'), pdf(18, 'B1・帰国日の精算 PDF 18')]),
    section('casino', 'カジノのあれこれ', '年齢確認、最低額、撮影、精算', cards(casino), [{ label: 'ネバダ州法・21歳未満の賭博等', url: 'https://www.leg.state.nv.us/Nrs/NRS-463.html#NRS463Sec350' }, { label: 'MGM・ブラックジャックのマナー', url: 'https://www.mgmresorts.com/en/gamesense/guide-to-blackjack.html' }, { label: 'MGM・撮影ポリシー', url: 'https://www.mgmresorts.com/en/casino-filming.html' }, { label: 'MGM GameSense・時間と金額の管理', url: 'https://www.mgmresorts.com/en/gamesense.html' }, pdf(22, 'B1・カジノ案内 PDF 22')]),
    section('dining', '飲食', '注文、会計、水、年齢確認、会議の食事', cards(dining), [vegas, { label: 'JTB説明会資料', url: 'documents/japan-tour-briefing-2026.pdf' }]),
    section('payment', '買い物・支払い', '支払総額、円換算、カードと現金', cards(payment), [{ label: 'Visa・円換算決済（DCC）', url: 'https://www.visa.com.hk/en_HK/travel-with-visa/dynamic-currency-conversion.html' }, pdf(8, 'B1・カードと現金 PDF 8')]),
    section('other', '移動・街歩き・その他', '横断、配車、勧誘、大麻、困ったとき', cards(other), [police, { label: 'LVMPD・歩行者の安全', url: 'https://www.lvmpd.com/Home/Components/News/News/3094/263' }, { label: 'Uber・乗車時の安全', url: 'https://www.uber.com/us/en/ride/safety/' }, { label: 'ネバダ州CCB・大麻の使用場所', url: 'https://ccb.nv.gov/laws-regulations/' }, { label: 'Clark County・緊急時の連絡', url: 'https://www.clarkcountynv.gov/government/departments/administrative_services/office_of_public_safety/park-safety-tips' }, pdf(17, 'B1・JTB現地緊急連絡先 PDF 17')])
  ].join('');
  const base = document.getElementById('local-tip-base');
  const rate = document.getElementById('local-tip-rate');
  const result = document.getElementById('local-tip-result');
  const dollars = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const calculate = () => {
    const value = base.valueAsNumber;
    if (!Number.isFinite(value) || value < 0 || !base.validity.valid) { result.textContent = '税前の飲食代を0以上、小数第2位までで入力してください。'; return; }
    const cents = Math.round(value * 100);
    const tip = Math.round(cents * Number(rate.value) / 100);
    result.textContent = `チップ ${dollars.format(tip / 100)} ／ 飲食代＋チップ ${dollars.format((cents + tip) / 100)}（税・必須料金は別）`;
  };
  base.addEventListener('input', calculate);
  rate.addEventListener('change', calculate);
  calculate();
})();
