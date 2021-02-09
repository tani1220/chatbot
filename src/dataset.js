import SLACK_URL from "./webhookConfig";

const defaultDataset = {
  firstAnswer: {
    answers: [
      { content: "お話したい", nextId: "talk" },
      { content: "私について知りたい", nextId: "aboutMe" },
      { content: "お友達になりたい", nextId: "friend" },
    ],
    question: "ようこそ🐱ご用件はなんでしょうか？",
  },
  talk: {
    answers: [
      { content: "お仕事の依頼について", nextId: "job" },
      { content: "相談に乗って欲しい", nextId: "consultation" },
    ],
    question: "どのようなお話しましょうか？🙂",
  },
  job: {
    answers: [
      { content: "Webサイトを制作してほしい", nextId: "website" },
      { content: "Webサイトを開発してほしい", nextId: "webapp" },
      { content: "その他", nextId: "other" },
    ],
    question: "どのようなお仕事でしょうか？",
  },
  website: {
    answers: [
      { content: "問い合わせる", nextId: "contact" },
      { content: "最初の質問に戻る", nextId: "firstAnswer" },
    ],
    question: "Webサイト細作についてですね。コチラからお問い合わせできます。",
  },
  webapp: {
    answers: [
      { content: "問い合わせる", nextId: "contact" },
      { content: "最初の質問に戻る", nextId: "firstAnswer" },
    ],
    question: "Webアプリ開発についてですね。コチラからお問い合わせできます。",
  },
  other: {
    answers: [
      { content: "問い合わせる", nextId: "contact" },
      { content: "最初の質問に戻る", nextId: "firstAnswer" },
    ],
    question: "その他ですね。コチラからお問い合わせできます。",
  },
  consultation: {
    answers: [
      { content: "DMする", nextId: "https://twitter.com/tani_ningen" },
      { content: "匿名で相談したい", nextId: "anonymous" },
      { content: "最初の質問に戻る", nextId: "firstAnswer" },
    ],
    question:
      "相談ですね😄人生相談でも愚痴でも何でもOKです！良かったらDMして下さい！",
  },
  anonymous: {
    answers: [
      {
        content: "Slackの招待を貰う",
        nextId: SLACK_URL.join,
      },
      { content: "最初の質問に戻る", nextId: "firstAnswer" },
    ],
    question:
      "匿名相談ですね！私のSlackチャンネルにて匿名で登録後、気軽に話しかけて下さい🥰",
  },
  aboutMe: {
    answers: [
      { content: "ポートフォリオを見る", nextId: "https://tani.im" },
      { content: "最初の質問に戻る", nextId: "firstAnswer" },
    ],
    question:
      "私はフロントエンジニアを目指して学習している者です♪現在はReact,Nextを勉強しています。",
  },
  friend: {
    answers: [
      { content: "フォローする", nextId: "https://twitter.com/tani_ningen" },
      {
        content: "slackでお話する",
        nextId: SLACK_URL.join,
      },
      { content: "最初の質問に戻る", nextId: "firstAnswer" },
    ],
    question:
      "ぜひお友達になりましょう！気軽にお話しませんか？DMまたはslackから声かけて下さい😊",
  },
};

export default defaultDataset;
