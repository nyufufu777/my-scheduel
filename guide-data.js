(() => {
  const agenda = 'https://aws.amazon.com/events/reinvent/agenda/';
  const eventGuide = 'https://aws.amazon.com/events/reinvent/know-before-you-go/';
  const aiOps = 'https://aws.amazon.com/blogs/mt/operating-in-the-agentic-era-aiops-sessions-at-reinvent-2026/';

  window.GUIDE_STOPS = {
    Venetian: {
      note: '両方の行程案で12/2（水）の昼が寄りやすい。Expoは月 16:00〜19:00、火・水 10:00〜18:00、木 10:00〜16:00。',
      stops: [
        {
          title: 'Agentic Workload Gallery',
          kind: 'デモ', topic: 'AI基盤', minutes: '10〜15分',
          place: 'Venetian Expo · Partner Advantage Zone / New to AWS',
          description: 'エージェントの実演を1本見て、評価から本番化までの構成を聞く。',
          question: '共用のエージェント基盤で、チームごとのツール権限と実行ログをどこで分けていますか？',
          url: 'https://aws.amazon.com/marketplace/resources/events/reinvent/partner-advantage-zone', source: 'AWSのデモ案内'
        },
        {
          title: 'OpenAI',
          kind: 'ブース', topic: 'AI提供・運用', minutes: '10〜15分',
          place: 'Venetian Expo · ブース #1012',
          description: '実演を1つ見て、社内チームへモデルやエージェントを提供する際の設計を聞く。',
          question: 'モデルを更新するとき、品質・遅延・費用をどう比較し、どの条件で切り戻しますか？',
          url: 'https://openai.com/events/aws-reinvent/', source: 'OpenAIの出展案内'
        },
        {
          title: 'Datadog AI Booth',
          kind: 'ブース', topic: 'AI提供・運用', minutes: '10〜15分',
          place: 'Venetian Expo · ブース #1638',
          description: 'AIワークロードの可観測性とセキュリティのデモ。障害を追う流れを1例見せてもらう。',
          question: '入力の機密情報を伏せたまま、モデル・ツール呼び出し・費用を1つのトレースで追えますか？',
          url: 'https://events.datadoghq.com/aws-reinvent/experience/', source: 'Datadogの出展案内'
        },
        {
          title: 'Wiz Whimzical Shop',
          kind: 'ブース', topic: 'ガバナンス', minutes: '10〜15分',
          place: 'Venetian Expo · ブース #1385',
          description: 'AIエージェントと開発パイプラインの防御について、デモか説明を1つ聞く。',
          question: '開発時の設定ミスと、本番のツール実行で起きる権限逸脱を、どの段階で検知・停止しますか？',
          url: 'https://www.wiz.io/events/wiz-at-reinvent', source: 'Wizの出展案内'
        },
        {
          title: 'Cloud Infrastructure Activation',
          kind: '展示', topic: 'AI基盤', minutes: '10分',
          place: 'Venetian Expo · AWS Village',
          description: 'Trainium・Nitroやラック規模の実機、AWS AI Factoriesの模型を見て、AIを支える計算・ネットワーク構成をつかむ。',
          question: '推論基盤の選定では、対応モデル・運用の負荷・遅延のうち、どこから比較するとよいですか？',
          url: 'https://aws.amazon.com/blogs/networking-and-content-delivery/your-aws-networking-and-content-delivery-guide-to-reinvent-2026/', source: 'AWSの展示案内'
        }
      ]
    },
    'Caesars Forum': {
      note: '展示を1つ見るならCustomer Showcase。会場名が似ているCaesars Palaceとは別施設。',
      stops: [
        {
          title: 'Customer Showcase',
          kind: '展示', topic: 'AI提供・運用', minutes: '15〜20分',
          place: 'Summit Ballroom · 11/30（月）〜12/3（木）08:30〜17:30',
          description: 'AWS利用企業の導入事例から、実運用に載せた仕組みを1つ選んで見る。',
          question: '導入時の評価指標は何で、本番後はどのチームが品質と障害に責任を持っていますか？',
          url: 'https://aws.amazon.com/blogs/media/experience-the-future-of-media-and-entertainment-sports-and-advertising-technology-at-aws-reinvent-2026/', source: 'AWSの展示案内'
        },
        {
          title: 'Content Hub',
          kind: '上映・当日企画', topic: 'AI提供・運用', minutes: '10〜15分',
          place: 'Level 1 · Forum 120',
          description: '当日の掲示から、AIエージェントの可観測性や本番運用に近い上映を探す。上映枠・入場条件はAWS Eventsで確認。',
          question: 'エージェントの品質低下を、通常のアプリ障害とどう切り分けているかに注目。',
          url: 'https://aws.amazon.com/blogs/mt/embracing-observability-for-the-ai-era-at-reinvent-2026/', source: 'AWSの会場・セッション案内'
        }
      ]
    },
    'Caesars Palace': {
      note: '短い空き時間はContent Hubへ。自分で手を動かすならSelf-paced learningの受付でテーマと所要時間を確認。',
      stops: [
        {
          title: 'Content Hub',
          kind: '上映・当日企画', topic: 'ガバナンス', minutes: '10〜15分',
          place: 'Promenade South · Octavius 4',
          description: '当日の上映を確認。AWSはここで、エージェントによる障害復旧と人の承認を扱う事例も案内している。',
          question: '自動復旧を許す操作と、人の承認を通す操作をどんな基準で分けているかに注目。',
          url: aiOps, source: 'AWSの会場・セッション案内'
        },
        {
          title: 'Self-paced learning',
          kind: '体験', topic: 'AI基盤', minutes: '15〜20分',
          place: '会場内の受付 · 部屋と当日のテーマはAWS Eventsで確認',
          description: '自分のペースで試せる学習枠。AI関連の題材があれば、短い時間で扱える部分を受付で聞く。',
          question: 'エージェントの権限設定や評価を試せる題材はありますか？ 20分以内ならどこまで試せますか？',
          url: agenda, source: 'AWS公式Agenda'
        }
      ]
    },
    'MGM Grand': {
      note: '空き時間は会場内のContent Hubを候補に。部屋・企画はAWS Eventsと現地の掲示で確認。',
      stops: [
        {
          title: 'Content Hub',
          kind: '上映・当日企画', topic: 'AI基盤', minutes: '10〜15分',
          place: 'MGM Grand会議施設内',
          description: '当日上映から推論基盤・プライベート接続・ネットワークの話題を探す。合う枠がなければ会場内のコミュニティスペースへ。',
          question: 'モデルやツールへのネットワーク経路を、利用チームや環境ごとにどう制御しているかに注目。',
          url: eventGuide, source: 'AWSのContent Hub案内'
        }
      ]
    },
    'Wynn/Encore': {
      note: '火・水に立ち寄るならContent Hub。木曜にWynnへ行く場合はSecurity Focusも候補。',
      stops: [
        {
          title: 'Content Hub',
          kind: '上映・当日企画', topic: 'AI提供・運用', minutes: '10〜15分',
          place: 'Upper Convention Promenade · Cristal 2',
          description: '本番運用や障害対応に関する上映・企画を当日の掲示で探す。次の予定に間に合う枠を選ぶ。',
          question: 'エージェントが判断に使ったログ・メトリクス・トレースを、運用者が後からどう確認できるかに注目。',
          url: aiOps, source: 'AWSの会場・セッション案内'
        },
        {
          title: 'Security Focus · AWSエンジニアとの相談',
          kind: '相談', topic: 'ガバナンス', minutes: '10〜15分',
          place: 'Wynn · 12/3（木）08:30〜17:30の企画枠',
          description: 'セッションの合間に、AIセキュリティ担当者と話せる機会を探す。相談場所・受付は現地で確認。',
          question: '利用可能なモデルとツールの制限、機密データの扱い、監査ログを、全社基盤でどこまで共通化できますか？',
          url: 'https://aws.amazon.com/events/reinvent/sessions/security-focus/', source: 'AWSのSecurity Focus案内'
        }
      ]
    }
  };
})();
