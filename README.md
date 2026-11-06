# re:Invent のしおり

AWS re:Invent 2026 の個人用ガイドです。HTML・CSS・JavaScriptのみで動き、ビルド、npm、APIキーは不要です。

## 開く

[GitHub Pagesでしおりを開く](https://nyufufu777.github.io/my-scheduel/)

`index.html` をブラウザで開いてください。フォルダ内のファイルは同じ階層関係のまま置いてください。

必要なら、このフォルダで以下を実行するとローカルで確認できます。

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

ブラウザで `http://127.0.0.1:8765/` を開きます。

## 3つの画面

| 画面 | 内容 |
| --- | --- |
| ホーム `#home` | JTB B1の往復・宿泊概要、日別予定、会場を回る順序、一日の集計、出発前チェック、2026年のSWAG収集リスト |
| スケジュール `#schedule` | 11/29〜12/5の7日間。JTBの集合・フライト・送迎とセッションのタイムライン、おすすめ／5K Run案の切替、検索、詳細表示 |
| MAP・移動時間 `#map` | 実座標に基づく5会場・宿泊先・主要道路・モノレールの地図、確認できた移動の概要、出発時刻の逆算 |

パソコンでは左ナビ、スマホでは下部ナビになります。OSのダークモードに追従します。

## 内容を変更する

- `data.js`：行程データ。`plan` は従来のおすすめ45件、`run` は5K Run案52件です。移動・準備・待機・休憩を含み、ホテル出発の自動追加分とJTB行程は別です。ホーム・スケジュール・MAPで選択した案を共有します。
- `tour.js`：提供されたJTB B1日程表から転記した往復8件、宿泊先、参加可能期間。画面ではこの条件とセッションを組み合わせます。
- `map-data.js`：OpenStreetMapから取得した道路・建物・線路・施設代表点の静的データ。地図の出典・ライセンスはファイル冒頭と画面内に記載しています。
- `routes-data.js`：Valhalla（FOSSGIS / OpenStreetMap）による30方向の徒歩検索結果と、10方向のモノレール併用候補。生成時に取得した静的データで、閲覧時のAPI通信はありません。
- `app.js`：画面の表示、会場データ、移動枠の計算、チェックリスト。
- `styles.css`：配色、余白、文字サイズ、スマホ対応。
- `assets/favicon.svg`：ブラウザタブのアイコン。

おすすめは、指定された `reinvent2026-week.html` の行程をもとに、金曜の会議予定を削除し、火曜・木曜の交流予定を追加した従来版を維持しています。全候補・Keynote案は削除しました。5K Run案はおすすめを複製し、火曜の受付と水曜の行程を変更しています。予約を変更する機能はありません。

5Kと受付は2026年公式カタログを確認しました。他のセッションの時刻・部屋・予約表示は添付行程からの引継ぎです。参加前に公式Agendaで再確認してください。

## JTB B1コースの反映

提供PDFの1ページを確認して反映しています。東京発・添乗員同行、11/29出発〜12/5帰着の7日間です。

- 11/29：成田15:25集合。AS124 成田18:25 JST発 → シアトル10:15 PST着。AS1325 シアトル14:00 PST発 → ラスベガス16:45 PST着。到着後、専用バスでホテルへ。
- 宿泊：Harrah's Las Vegas、11/29〜12/3の5泊。
- 12/4：ホテル04:00 PST集合、専用バスで空港へ。AS1322 ラスベガス07:00 PST発 → シアトル09:47 PST着。AS123 シアトル12:30 PST発 → 12/5成田16:00 JST着。
- 12/5：成田到着後、入国審査・通関を経て解散。解散の正確な時刻は未記載です。

**B1で現地参加できるのは11/30〜12/3です。** ご指定により、12/4のセッション候補と関連する待機・休憩を両案のデータから削除しました。金曜はJTBの集合・送迎・帰国便のみ表示します。

航空便はUTCオフセット付きの時刻で並べ、日本と米国の時差によって行程の順序が逆転しないようにしています。画面上の時刻にはJST／PSTを明記します。

空港送迎の所要時間やホテル到着時刻はPDFにないため補完していません。便・時刻が変更になる場合はJTBの最終しおりを優先してください。元のPDFは公開用ファイルには含めていません。

## 追加の交流予定

- 12/1（火）18:30〜20:30：Japan Night。日本からのツアー参加者向けネットワーキング。Wynn Las Vegas | Event Pavilion Space。18:30ドアオープン予定、19:00開始、無料。時刻は変更になる場合があります。20:30はご指定の参加予定終了時刻です。
- 12/3（木）18:30〜20:30：re:Play party。ご指定の参加予定で、会場・入場条件は未確認です。会場が未指定のため、移動先や所要時間は追加していません。

どちらも両案に表示し、セッションの予約状況とは分けて「交流・参加予定」と表示します。Japan NightのMAPボタンでは18:30の開場に合わせた到着予定を計算機へ渡します。

## 5K Run案（追加）

おすすめの予定は変更していません。火曜・水曜以外は同じです。

- 火曜10:30〜11:00：Venetian 2階 Artist FoyerのAttendee Experience Deskで5K申込・キット受取。デスクの公式営業時間は08:00〜19:00で、30分は手続き用の仮枠です。元の休憩は11:00〜11:30に短縮しています。
- 水曜：04:45起床 → 05:00ホテル発 → 05:15 Venetianから送迎を仮定 → 06:00会場入り → 06:30〜07:30に5K参加を想定 → 08:00 Venetian → 08:20ホテル → シャワー・着替え → 08:55ホテル発 → 09:40 Caesars Palace着。
- 10:00〜11:30：予約済み「Security Agent侵入テスト」TNC208（Caesars Palace / Palace Ballroom II）。DVT339と、同じ11:30に別会場で始まるAIM110-Sはこの案では見送ります。
- 11:30〜12:15にVenetianへ移動し、昼食・Expo。13:45からWynnへ移動し、15:00〜17:00の予約済みAIM336-R1に参加します。

5Kの公式掲載枠は12/2 06:30〜08:30、ACT053、Allegiant Stadium外周6周・約5km、無料です。06:30はイベント枠の開始で、実際のスタート時刻は未確認です。この案は35〜45分で走り、07:30までに会場を出て08:00にVenetianへ戻れると仮定しています。2026年の専用送迎の有無・乗り場・往復時刻、早期退場の可否は未確認です。5K・送迎が遅れれば10:00のラボに影響します。参加申込やセッションの予約操作は行っていません。

- [2026年公式カタログ（5K ACT053・受付ACT012-R1）](https://registration.awsevents.com/flow/awsevents/reinvent2026/eventcatalog/page/eventcatalog)：5Kは日〜火に現地申込とキット受取が必要。
- [2026年の会場・交通案内](https://registration.awsevents.com/flow/awsevents/reinvent2026/venueshotel/page/venuehotel)：一般の会場シャトル等を確認。5K専用便の根拠にはしていません。
- [2025年の参加記録](https://datacated.substack.com/p/running-the-5k-at-aws-reinvent)：05:17 Venetian乗車、05:22発、05:37 Mandalay Bay着、07:45復路乗車、08:00 Venetian帰着の例。2026年は会場が異なり、同じ送迎を保証するものではありません。

Allegiant Stadiumは既存地図の範囲外です。未確認の送迎経路線は追加せず、移動一覧に仮枠を記載し、5K詳細からGoogle Mapsの場所検索を開けます。既存地図内の移動は、行程をクリックするとその案の仮枠で計算します。出発地・目的地を手動変更した場合は通常の計画枠へ戻ります。

## 移動時間の扱い

地図は2026/11/5に取得したOpenStreetMapデータを、ラスベガス中心部のメートル単位の座標へ投影して表示しています。SVGの縦横で同じ縮尺を保ち、500mのスケールバーを表示します。主要道路・一定以上の大きさの建物・モノレールを抜粋し、線幅は見やすく調整しています。

施設の点はOpenStreetMapの代表位置です。Venetian・MGM・Caesars Forum・Caesars Palaceは会議施設、Harrah'sは宿泊先、Wynn/EncoreはWynn側のホテル建物の代表位置です。入口・部屋の座標ではありません。表示する距離は施設代表点間の直線距離で、歩行距離ではありません。

会場名は地図上に直接表示し、選択した出発地と目的地を経路線でつなぎます。青は徒歩の検索結果、紫は選択したモノレール乗車区間、灰色の点線は施設代表点と検索経路の未検証の接続です。灰色の点線は実際の通路を表しません。全線が入口から入口まで確認済みという意味ではありません。

2026/11/5にValhalla（FOSSGIS）の歩行経路検索を取得しました。各方向を個別に検索しています。現地の通行可否、大会入口、館内の専用通路、部屋までの経路は未検証です。検索結果が最短・推奨の会場アクセスを表すとは限りません。

- Venetian〜Wynn：Venetian公式で接続を確認できたSands Avenueの歩道橋を経由するよう、OSMの歩道橋座標を経由点として指定した検索結果を表示。館内・大会入口の通行可否と所要時間は未確認です。
- MGM方面：Harrah's / The LINQ駅、またはFlamingo / Caesars Palace駅を経由する候補。会場⇔駅は歩行経路検索結果、駅間は実際のOSM線路を区切った線です。Flamingo / Caesars Palace駅はFlamingo内です。駅への接続・通行可否・所要時間は現地未検証です。
- その他：徒歩の検索結果を表示します。検索結果と施設代表点とのずれは点線で区別します。シャトルの運行線は表示していません。

確認に使った情報と各施設の座標の出典は、MAP画面の「地図・移動案内の根拠」から開けます。

- [AWS公式の交通案内](https://aws.amazon.com/events/reinvent/know-before-you-go/)：会場間は30〜45分の余裕を案内。大会シャトル・モノレールの案内もあります。個別区間の乗り場・時刻表は未確認です。
- [モノレール公式](https://www.lvmonorail.com/route-map/)：駅と停車順、通常4〜8分間隔の運行を確認。駅間時間にページ内の表記差があるため、合計乗車時間は計算・掲載していません。
- [Venetian公式](https://www.venetianlasvegas.com/resort/maps-and-parking.html)：Palazzo〜Wynnの歩道橋と、Harrah'sでのモノレールアクセスを確認。
- [Wynn公式の館内図](https://www.wynnlasvegas.com/meetings/resort-maps)：会議エリアとEvent Pavilionを確認。
- 地図データ：[© OpenStreetMap contributors](https://www.openstreetmap.org/copyright)、[ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/)。配布する地図データは `map-data.js` です。
- 徒歩検索：[Valhalla / FOSSGIS](https://valhalla.openstreetmap.de/)。各検索の取得URLは `routes-data.js` に含めています。生成スクリプト・取得した応答・OSMの原データは `.reference/map-research/` に残し、ZIPには含めていません。

所要時間の計算には次の計画枠を使います。調査で実測値が得られたわけではありません。

- 元の行程にある会場ペアは、45分または60分の「移動枠」を使います。交通機関の待ち・施設内移動を含む計画値です。
- 逆方向にも同じ値を仮置きしています。
- 元の行程にないペアは、近隣45分／MGMを含む区間60分の仮置きとし、画面にもその旨を表示します。
- Harrah'sと各会場の移動時間もPDFにはないため、近隣45分／MGM60分の仮置きです。JTBの空港送迎とは区別して表示しています。
- 同一会場内は15分の仮置きです。
- 月〜木は、各日の最初の予定からホテル出発の目安を自動で逆算し、ホーム・スケジュール・MAPの移動一覧に表示します。おすすめプランでは11/30が08:55、12/1が06:45、12/2・12/3が07:55（すべてPST）です。ホテルからの移動45分の仮枠と、元の行程の入場待ち20分／60分を差し引いています。5K Run案の水曜は05:00ホテル発を明示し、計算機でも15分の仮枠を使います。JTBの集合時刻ではありません。
- 会場の入場待ちは移動枠とは別に指定します。例：16:30開始 − 移動45分 − 入場待ち20分 = 15:25出発。
- 渋滞・シャトル運行・徒歩ルートをリアルタイムに取得する機能はありません。実際の経路はリンク先のGoogle Maps等で確認します。

## 会場入口・館内図とホテル連絡先

MAP画面の「会場入口・館内図」に、5会場の公式リンクをまとめています。予定の詳細からも対応する会場のリンクを開けます。2026/11/5に確認した常設の施設案内です。re:Invent専用入口、当日の通行範囲、会場内の大会向けレイアウトは公式Agenda・現地案内を優先してください。

| 会場 | 公式リンク |
| --- | --- |
| Venetian | [館内図PDF](https://www.venetianlasvegas.com/content/dam/vlvweb/resort/map.pdf) · [地図・アクセス案内](https://www.venetianlasvegas.com/resort/maps-and-parking.html) |
| Wynn / Encore | [館内図PDF](https://cdn.wynnresorts.com/image/upload/visitwynn_pdfs_files/PropertyMap.pdf) · [公式マップ案内](https://www.wynnlasvegas.com/meetings/resort-maps) |
| Caesars Forum | [公式会議フロア案内](https://www.caesars.com/meetings/properties/caesars-forum)：「Conference Center Floor Plans」を参照 |
| Caesars Palace | [公式会議フロア案内](https://www.caesars.com/meetings/properties/caesars-palace)：「Conference Center Floor Plans」を参照 |
| MGM Grand | [館内図PDF](https://assets.contentstack.io/v3/assets/bltc6ce635bc4868eb2/blt67c0bdb5f16b8094/mgm-grand-property-map.pdf) · [公式会議施設案内](https://mgmgrand.mgmresorts.com/en/meetings-groups.html) |

Harrah’s Las Vegasの連絡先は、ホームの旅程概要とMAPの宿泊先欄に表示します。

- 公式掲載電話：**+1 800-214-9110**（米国フリーダイヤル）。スマホでは電話リンクを利用できます。フロント直通とは確認できていないため、直通番号とは表示していません。
- 住所：3475 Las Vegas Blvd South, Las Vegas, NV 89109。
- 出典：[Harrah’s Las Vegas公式ホテルページ](https://www.caesars.com/harrahs-las-vegas/hotel)。FAQとフッターの掲載番号を確認しました。

今回追加したのは施設の公開情報と外部リンクだけです。個人の連絡先・予約番号・客室番号は追加していません。外部ページ・PDFはリンクを押した時だけ開き、ローカルへの同梱や閲覧時の自動取得は行っていません。

## データと通信

外部ライブラリ、外部フォント、アクセス解析、位置情報の取得は使用していません。ページを開くだけでは第三者への通信は発生しません。公式サイトやGoogle Mapsはリンクを押した場合に開きます。

チェック、表示日、行程の種類だけを `localStorage` に保存します。ラスベガスの現地日付が旅程内にある場合、開き直すとその日を表示します。ホームとスケジュールの「今日」でも現地の当日に戻れます。別のブラウザ・端末とは同期しません。保存が使えない環境でも画面は動きます。

公開用のJavaScriptには行程データが入っています。公開した場合はその内容も閲覧できます。

## GitHub Pagesの公開構成

公開元は `main` ブランチの `/(root)` です。以下のファイルを同じ相対配置に保ってください。`.nojekyll` により、そのまま静的サイトとして配信されます。

```text
index.html
styles.css
app.js
data.js
tour.js
map-data.js
routes-data.js
.nojekyll
assets/
  favicon.svg
```

ハッシュで画面を切り替えるため、GitHub Pagesのサブディレクトリでも相対パスで動きます。個別画面は `index.html#schedule` のようにリンクできます。

## デザイン方針

指定の [Apple Design Skill](https://github.com/dickwu/apple-design-skill/blob/main/SKILL.md) を使用しました。Webとして、情報の優先順位・読みやすさ・一貫した操作・キーボード操作・画面幅への追従に適用しています。

元の週全体の密なグリッドから、日別リストと「会場を回る順序」を軸にした構成へ変更しました。詳細は必要なときだけ開き、色だけで予約状況を伝えない設計にしています。
