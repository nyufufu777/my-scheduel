/* JTB B1コース：ユーザー提供PDF 1ページから転記。時刻は各都市の現地時間。 */
window.GUIDE_TRIP = {
  course: 'JTB B1', title: '11/29発7日間（東京発）', escorted: true,
  start: '2026-11-29', end: '2026-12-05',
  conferenceStart: '2026-11-30', conferenceEnd: '2026-12-03',
  hotel: { name: "Harrah's Las Vegas", nights: 5, firstNight: '2026-11-29', lastNight: '2026-12-03', departure: '2026-12-04T04:00:00-08:00' },
  notice: '12/4（金）は04:00ホテル集合・07:00ラスベガス発。金曜のセッションには参加できません。',
  sourceNote: '提供されたJTB B1コース日程表に基づく予定です。便・時刻は変更になる場合があるため、JTBの最終しおりを優先してください。',
  events: [
    { uid: 'b1-outbound-meet', tour: true, date: '2026-11-29', start: '15:25', startZone: 'JST', startISO: '2026-11-29T15:25:00+09:00', end: null, kind: 'meetup', label: '成田空港に集合', title: 'JTB B1コース・成田空港集合', place: '成田空港（NRT）', venue: '', detail: '15:25に成田空港集合。18:25発のAS124便に搭乗します。集合場所の詳細はJTBの最終しおりで確認。' },
    { uid: 'b1-as124', tour: true, date: '2026-11-29', start: '18:25', startZone: 'JST', startISO: '2026-11-29T18:25:00+09:00', end: '10:15', endZone: 'PST', endDate: '2026-11-29', endISO: '2026-11-29T10:15:00-08:00', kind: 'flight', flight: 'AS124', label: '成田 → シアトル', title: 'AS124便・成田からシアトルへ', place: '成田（NRT） → シアトル（SEA）', venue: '', detail: '成田11/29 18:25（JST）発 → シアトル11/29 10:15（PST）着。日付変更線を通過。到着後、米国入国手続き。次の便は14:00発です。' },
    { uid: 'b1-as1325', tour: true, date: '2026-11-29', start: '14:00', startZone: 'PST', startISO: '2026-11-29T14:00:00-08:00', end: '16:45', endZone: 'PST', endDate: '2026-11-29', endISO: '2026-11-29T16:45:00-08:00', kind: 'flight', flight: 'AS1325', label: 'シアトル → ラスベガス', title: 'AS1325便・シアトルからラスベガスへ', place: 'シアトル（SEA） → ラスベガス（LAS）', venue: '', detail: 'シアトル14:00（PST）発 → ラスベガス16:45（PST）着。到着後は専用バスでホテルへ。' },
    { uid: 'b1-hotel-transfer', tour: true, date: '2026-11-29', start: '16:45', startZone: 'PST', startISO: '2026-11-29T16:45:00-08:00', timeSuffix: '着後', end: null, kind: 'transfer', label: '専用バスでホテルへ', title: 'ラスベガス到着後・ホテル送迎', place: "ラスベガス空港 → Harrah's Las Vegas", venue: "Harrah's Las Vegas", detail: "16:45はラスベガス便の到着予定時刻です。バスの出発・ホテル到着時刻は日程表に記載されていません。到着後、専用バスでHarrah's Las Vegasへ。11/29〜12/3の5泊。" },
    { uid: 'b1-return-meet', tour: true, date: '2026-12-04', start: '04:00', startZone: 'PST', startISO: '2026-12-04T04:00:00-08:00', end: null, kind: 'transfer', label: 'ホテル集合・専用バスで空港へ', title: '帰国日・04:00ホテル集合', place: "Harrah's Las Vegas → ラスベガス空港", venue: "Harrah's Las Vegas", detail: "04:00（PST）にホテル集合。専用バスで空港へ向かい、07:00発AS1322便に搭乗します。" },
    { uid: 'b1-as1322', tour: true, date: '2026-12-04', start: '07:00', startZone: 'PST', startISO: '2026-12-04T07:00:00-08:00', end: '09:47', endZone: 'PST', endDate: '2026-12-04', endISO: '2026-12-04T09:47:00-08:00', kind: 'flight', flight: 'AS1322', label: 'ラスベガス → シアトル', title: 'AS1322便・ラスベガスからシアトルへ', place: 'ラスベガス（LAS） → シアトル（SEA）', venue: '', detail: 'ラスベガス07:00（PST）発 → シアトル09:47（PST）着。次のAS123便は12:30発です。' },
    { uid: 'b1-as123', tour: true, date: '2026-12-04', start: '12:30', startZone: 'PST', startISO: '2026-12-04T12:30:00-08:00', end: '16:00', endZone: 'JST', endDate: '2026-12-05', endISO: '2026-12-05T16:00:00+09:00', kind: 'flight', flight: 'AS123', label: 'シアトル → 成田', title: 'AS123便・シアトルから成田へ', place: 'シアトル（SEA） → 成田（NRT）', venue: '', detail: 'シアトル12/4 12:30（PST）発 → 成田12/5 16:00（JST）着。機中泊・到着は日本時間で翌日です。' },
    { uid: 'b1-arrive-japan', tour: true, date: '2026-12-05', start: '16:00', startZone: 'JST', startISO: '2026-12-05T16:00:00+09:00', end: null, kind: 'arrival', label: '成田到着・入国後に解散', title: '日本帰着・7日間の旅程終了', place: '成田空港（NRT）', venue: '', detail: 'AS123便で16:00（JST）成田到着予定。入国審査・通関後に解散します。解散時刻は日程表に記載されていません。' }
  ]
};
