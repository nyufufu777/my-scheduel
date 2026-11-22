/* JTB B1コース最終しおり（2026年11月22日受領）に基づく行程。 */
window.GUIDE_TRIP = {
  course: 'JTB B1', title: '11/29発7日間（東京発）', escorted: true,
  start: '2026-11-29', end: '2026-12-05',
  conferenceStart: '2026-11-30', conferenceEnd: '2026-12-03',
  hotel: { name: "Harrah's Las Vegas", nights: 5, firstNight: '2026-11-29', lastNight: '2026-12-03', departure: '2026-12-04T04:00:00-08:00' },
  notice: '12/4（金）は04:00ホテル集合・07:00ラスベガス発。金曜のセッションには参加できません。',
  sourceNote: '2026年11月22日受領のJTB B1コース最終しおりを反映。変更時はeチケット・JTBの当日案内を確認してください。',
  events: [
    {
      uid: 'b1-outbound-meet', tour: true, date: '2026-11-29', start: '14:25', startZone: 'JST', startISO: '2026-11-29T14:25:00+09:00', end: null,
      kind: 'meetup', label: '成田第2ターミナル・JTB受付に集合', title: 'JTB B1コース・成田空港集合',
      place: '成田空港 第2ターミナル3階 JTB団体受付カウンター1〜10番', venue: '',
      detail: '14:25集合。パスポートを手元に用意。荷物タグ2枚・eチケット・日程表・Trip Loop参加QR・ツアーギフト2点を受け取ります。受付で渡される宣誓書に署名して航空会社へ提出。添乗員の案内後、搭乗手続き・保安検査・出国審査へ進みます。'
    },
    {
      uid: 'b1-as124', tour: true, date: '2026-11-29', start: '17:25', startZone: 'JST', startISO: '2026-11-29T17:25:00+09:00',
      end: '09:15', endZone: 'PST', endDate: '2026-11-29', endISO: '2026-11-29T09:15:00-08:00',
      kind: 'flight', flight: 'AS124', label: '成田 → シアトル', title: 'AS124便・成田からシアトルへ', place: '成田（NRT） → シアトル（SEA）', venue: '',
      detail: '成田17:25 JST発 → シアトル09:15 PST着。降機後に添乗員と集合。スーツケース受取 → 荷物を持って入国・税関 → Connecting Flights Baggageで再預け → 保安検査 → 国内線ゲートへ。ホテル名入り日程表・AWS登録完了メールの印刷・英語名刺を手元に。次のAS734便は12:58発、ゲートには30分前までに到着。'
    },
    {
      uid: 'b1-as734', tour: true, date: '2026-11-29', start: '12:58', startZone: 'PST', startISO: '2026-11-29T12:58:00-08:00',
      end: '15:28', endZone: 'PST', endDate: '2026-11-29', endISO: '2026-11-29T15:28:00-08:00',
      kind: 'flight', flight: 'AS734', label: 'シアトル → ラスベガス', title: 'AS734便・シアトルからラスベガスへ', place: 'シアトル（SEA） → ラスベガス（LAS）', venue: '',
      detail: 'シアトル12:58 PST発 → ラスベガス15:28 PST着。時差なし。降機後は添乗員と集合して荷物受取へ。トラム移動がある場合、アラスカ航空はRedラインでターミナル3へ。ターンテーブルでJTBスタッフと合流し、全員でホテル行きバスへ進みます。'
    },
    {
      uid: 'b1-hotel-transfer', tour: true, date: '2026-11-29', start: '15:28', startZone: 'PST', startISO: '2026-11-29T15:28:00-08:00', timeSuffix: '着後', end: null,
      kind: 'transfer', label: '荷物受取・団体バスでHarrah’sへ', title: 'ラスベガス到着後・ホテル送迎', place: "ラスベガス空港 → Harrah's Las Vegas", venue: "Harrah's Las Vegas",
      detail: '15:28は便の到着予定時刻。荷物の有無にかかわらずターンテーブルで集合。全員で専用バスへ移動します。ホテル到着後はパスポートとクレジットカードで個人チェックイン（16:00〜）。その後、各自VenetianまたはMGM Grandでバッジ受取。空港ではバッジを受け取らず団体送迎へ。'
    },
    {
      uid: 'b1-return-meet', tour: true, date: '2026-12-04', start: '04:00', startZone: 'PST', startISO: '2026-12-04T04:00:00-08:00', end: null,
      kind: 'transfer', label: 'チェックアウトを済ませ04:00集合', title: '帰国日・04:00ホテル集合', place: 'Harrah’s 1階 ホテルフロント横', venue: "Harrah's Las Vegas",
      detail: '04:00 PSTまでにチェックアウトを済ませ、ホテル1階フロント横に集合。個人利用分の明細・セーフティボックス・充電器を確認。添乗員の案内でバスへ。パスポートとeチケットを手元に用意。07:00発AS701便に搭乗します。'
    },
    {
      uid: 'b1-as701', tour: true, date: '2026-12-04', start: '07:00', startZone: 'PST', startISO: '2026-12-04T07:00:00-08:00',
      end: '09:51', endZone: 'PST', endDate: '2026-12-04', endISO: '2026-12-04T09:51:00-08:00',
      kind: 'flight', flight: 'AS701', label: 'ラスベガス → シアトル', title: 'AS701便・ラスベガスからシアトルへ', place: 'ラスベガス（LAS） → シアトル（SEA）', venue: '',
      detail: 'ラスベガス07:00 PST発 → シアトル09:51 PST着。ラスベガスのチェックインで成田までの搭乗券を受け取り、荷物タグがNRTになっていることを確認。スーツケースは成田で受取。シアトルでは降機後に添乗員と集合し、電光掲示板で次のAS123便のゲートを確認。'
    },
    {
      uid: 'b1-as123', tour: true, date: '2026-12-04', start: '11:55', startZone: 'PST', startISO: '2026-12-04T11:55:00-08:00',
      end: '15:25', endZone: 'JST', endDate: '2026-12-05', endISO: '2026-12-05T15:25:00+09:00',
      kind: 'flight', flight: 'AS123', label: 'シアトル → 成田', title: 'AS123便・シアトルから成田へ', place: 'シアトル（SEA） → 成田（NRT）', venue: '',
      detail: 'シアトル12/4 11:55 PST発 → 12/5 15:25 JST成田着。パスポートと搭乗券を用意して搭乗。日付変更線を越え、機中泊。'
    },
    {
      uid: 'b1-arrive-japan', tour: true, date: '2026-12-05', start: '15:25', startZone: 'JST', startISO: '2026-12-05T15:25:00+09:00', end: null,
      kind: 'arrival', label: '成田到着・入国後に解散', title: '日本帰着・7日間の旅程終了', place: '成田空港（NRT）', venue: '',
      detail: '15:25 JST成田着。入国 → スーツケース受取 → 税関 → 解散。Visit Japan WebのQRまたは申告書を用意。荷物に破損・紛失があれば、空港を出る前にクレームタグを提示して手続きします。'
    }
  ],
  dayGuides: {
    '2026-11-29': {
      heading: '14:25 成田第2ターミナル集合',
      steps: [
        '第2ターミナル3階、JTB団体受付1〜10番へ。パスポートを用意して受付と宣誓書の提出を済ませる。',
        '受付でもらったTrip Loop参加QRを読み込み、オフライン地図を作成。荷物タグを付け、添乗員の案内でチェックインへ。',
        'シアトルでは添乗員と集合 → スーツケース受取 → 入国・税関 → 再預け → 保安検査 → AS734のゲートへ。',
        'ラスベガスでは荷物の有無にかかわらずターンテーブルで合流。団体バスでHarrah’sへ。',
        'ホテルで個人チェックイン（16:00〜）。その後パスポートとpickup codeを持って各自バッジ受取。Venetian・MGM Grandとも11/29は20:00まで。'
      ],
      source: 'B1しおり p.3〜4、8〜13'
    },
    '2026-11-30': {
      heading: '初日はバッジと会場への移動を確認',
      steps: [
        '前日にバッジを受け取れなかった場合は、朝の予定に受取時間を確保。Venetian・MGM Grandとも06:30から受付。',
        '予約セッションは部屋まで移動し、行程の入場待ち時刻に合わせる。集合・予約の最新案内はAWS EventsとTrip Loopで確認。',
        '日本語Expoツアーは先着受付。11/30は09:00〜15:00 Casanova 607、16:00〜19:00 ATW Japan Zoneで受付の案内。'
      ],
      source: 'B1しおり p.12、16／事前説明会資料「EXPOツアー」'
    },
    '2026-12-01': {
      heading: '07:00頃 CEO Keynote会場着／夜はJapan Night',
      steps: [
        '08:30のCEO Keynoteは、説明会で1時間半前の到着を推奨。Venetian Level 2 Ballroom Eへ07:00頃に到着する計画。',
        '無料昼食は11:00〜13:00。午前の休憩枠で食べるなら11:00以降に食事会場へ。',
        'Japan Nightは18:30受付、19:00〜21:00。Wynn Event Pavilionへカンファレンスバッジとツアー限定ピンを着けて参加。羽織りと名刺を用意し、荷物は小さめに。'
      ],
      source: 'B1しおり p.15／事前説明会資料「Keynotes」「Meals」'
    },
    '2026-12-02': {
      heading: '昼食・Expoは13:00の食事終了に注意',
      steps: [
        '無料昼食は13:00まで。Venetianに着いたら昼食を先に取り、残り時間でExpoやSWAGを回る。',
        '5K Run案の集合・送迎はAWS Eventsの最新案内で確認。受付場所はVenetian Level 2 Artist FoyerのAttendee Experience Desk。'
      ],
      source: '事前説明会資料「Meals」「Fun Event」'
    },
    '2026-12-03': {
      heading: 're:Play後は翌朝04:00の帰国集合へ',
      steps: [
        'Japan Wrap-up（JPN101）はVenetian Theatreで15:00〜17:00、14:30開場・参加登録不要。今の16:00 COM313と重なるため、参加する場合は行き先を選ぶ。',
        're:PlayはAllegiant Stadium、18:30〜22:30。事前登録不要、バッジ持参。大きな荷物は部屋に置き、AWS Eventsでシャトル乗り場・時刻を確認。',
        '個人のre:Play参加予定は20:30まで。ホテルに戻ったら荷造り・精算の準備を済ませ、翌朝04:00の集合に備える。'
      ],
      source: 'B1しおり p.17／事前説明会資料「Japan Wrap-up Session」「re:Play」'
    },
    '2026-12-04': {
      heading: 'チェックアウト後、04:00に1階フロント横へ',
      steps: [
        '集合前に各自チェックアウト。個人利用の明細、セーフティボックス、充電器を確認。パスポートとeチケットは手荷物へ。',
        'Harrah’s 1階フロント横で04:00集合。添乗員と専用バスで空港へ。',
        'ラスベガス空港では荷物タグの行き先がNRTか確認。搭乗券は成田まで発券、スーツケースは成田で受取。',
        'AS701で09:51シアトル着。添乗員と集合し、11:55発AS123の搭乗口を掲示板で確認して移動。'
      ],
      source: 'B1しおり p.13、17'
    },
    '2026-12-05': {
      heading: '15:25 JST 成田到着予定',
      steps: [
        '日本時間15:25に成田着。入国 → スーツケース受取 → 税関の順に進む。',
        'Visit Japan WebのQRまたは税関申告書を用意。荷物の破損・紛失はクレームタグを添えて空港で申告。',
        '入国・通関後に解散。到着時刻から荷物受取・手続きの時間を見込んで帰宅する。'
      ],
      source: 'B1しおり p.18'
    }
  },
  meals: [
    ['Caesars Forum', 'Level 1 · Lower Plaza Tent'],
    ['Caesars Palace', 'Pool Level · Julius 12'],
    ['MGM Grand', 'Level 1 · Marquee Ballroom'],
    ['Venetian', 'Level 1 · Hall G'],
    ['Wynn/Encore', 'Convention Promenade · Lafite 7']
  ]
};
