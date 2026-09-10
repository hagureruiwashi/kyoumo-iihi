'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.querySelector('.accordion-trigger');
  const content = document.querySelector('.accordion-content');

  trigger.addEventListener('click', () => {
    // ボタンの開閉状態を切り替え
    trigger.classList.toggle('is-open');
    
    // 現在の状態をチェック
    const isOpen = trigger.classList.contains('is-open');
    trigger.setAttribute('aria-expanded', isOpen);

    if (isOpen) {
      // メニューを開く（中身の本当の高さを取得して設定）
      content.style.height = content.scrollHeight + 'px';
    } else {
      // メニューを閉じる
      content.style.height = '0';
    }
  });
});
// 泡日記

const bubbles = document.querySelectorAll(".bubble");

bubbles.forEach(function(bubble) {

  // 泡が自然に上まで行って消えたら復活
  bubble.addEventListener("animationend", function(event) {

    if (event.animationName === "bubbleFloat") {

      // 今の泡を消す
      bubble.remove();

      // 新しい泡を作る
      const newBubble = bubble.cloneNode(true);

      // 泡を最初の状態に戻す
      newBubble.classList.remove("pop");

      // 泡エリアに追加
      document.querySelector(".bubble-area").appendChild(newBubble);

      // 新しい泡にもクリック機能をつける
      addBubbleClick(newBubble);
    }

  });


  // 最初の泡にクリック機能をつける
  addBubbleClick(bubble);

});


// ====================
// 泡をクリックしたとき
// ====================

function addBubbleClick(bubble) {

  bubble.addEventListener("click", function() {

    // 泡が持っている日記を取得
    const text = bubble.dataset.diary;

    // 日記を作る
    const diary = document.createElement("div");
    diary.classList.add("diary");
    diary.textContent = text;

    // 泡の現在位置を取得
    const rect = bubble.getBoundingClientRect();

    // 日記を泡の位置に置く
    diary.style.left = rect.left + rect.width / 2 + "px";
    diary.style.top = rect.top + "px";

    // 画面に追加
    document.body.appendChild(diary);

    // 泡を割る
    bubble.classList.add("pop");

    // 日記を浮かせる
    setTimeout(function() {
      diary.classList.add("show");
    }, 100);


    // 泡を復活させる
    setTimeout(function() {

      // 今の泡を消す
      bubble.remove();

      // 同じ日記を持った泡を作る
      const newBubble = bubble.cloneNode(true);

      // 「割れた」状態を解除
      newBubble.classList.remove("pop");

      // 泡エリアに追加
      document.querySelector(".bubble-area").appendChild(newBubble);

      // 新しい泡にもクリック機能をつける
      addBubbleClick(newBubble);

    }, 500);

  });

}
// =========================
// 美術館員のたこ
// =========================

const tako = document.querySelector("#tako");

if (tako) {

  tako.addEventListener("click", function() {

    // 手を伸ばす
    tako.src = "tako2.png";

    // 1秒後に通常に戻す
    setTimeout(function() {
      tako.src = "tako1.png";
    }, 1000);

  });

}


// =========================
// 展覧会
// =========================

const artItems = document.querySelectorAll(".art-item");

const artViewer = document.querySelector(".art-viewer");
const bigArt = document.querySelector("#big-art");
const nextArt = document.querySelector("#next-art");


// 作品をクリック
artItems.forEach(function(item) {

  item.addEventListener("click", function() {

    const image = item.querySelector("img");

    // 大きな作品に画像を入れる
    bigArt.src = image.src;
    bigArt.alt = image.alt;

    // 展示画面を表示
    artViewer.classList.add("show");

  });

});


// 「つぎの作品へ」
if (nextArt && artViewer) {

  nextArt.addEventListener("click", function() {

    artViewer.classList.remove("show");

  });

}


// =========================
// 大喜利 IN A BOTTLE
// =========================

const bottle = document.getElementById("bottle");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const message = document.getElementById("message");

let step = 0;

const questionText = "こんな海水浴場はイヤだ";
const answerText = "海の家の店員が全員カニ";


// 瓶をクリック
if (bottle) {

  bottle.addEventListener("click", function() {

    if (step !== 0) return;

    // いわしちゃんが紙を取り出す
    const iwashi = document.getElementById("iwashi");
    const paper = document.getElementById("paper");

    iwashi.classList.add("take-paper");

    // 紙を表示
    setTimeout(function() {
      paper.style.opacity = "1";
    }, 500);

    // 少し待ってからお題を表示
    setTimeout(function() {

      question.textContent = questionText;
      question.style.opacity = "1";

      paper.style.opacity = "0";

      message.textContent = "お題をタップしてね";

      step = 1;

    }, 1200);

  });

}


// お題をクリック
if (question) {

  question.addEventListener("click", function() {

    if (step !== 1) return;

    answer.textContent = answerText;
    answer.style.opacity = "1";

    message.textContent = "回答をタップしてね";

    step = 2;

  });

}


// 回答をクリック
if (answer) {

  answer.addEventListener("click", function() {

    if (step !== 2) return;

    const wave = document.getElementById("wave");

    message.textContent = "海へぽーん！";

    // 瓶を海へ投げる
    bottle.classList.add("throw");


    // 瓶が海に入ったころに波！
    setTimeout(function() {

      wave.classList.add("splash");

    }, 1200);


    // 2秒後
    setTimeout(function() {

      // お題と回答を消す
      question.style.opacity = "0";
      answer.style.opacity = "0";

      // 紙を消す
      const paper = document.getElementById("paper");
      paper.style.opacity = "0";

      // いわしちゃんを元に戻す
      const iwashi = document.getElementById("iwashi");
      iwashi.classList.remove("take-paper");

      // 瓶を一度リセット
      bottle.classList.remove("throw");

      // 瓶が海から流れてくる！
      bottle.classList.add("arrive");

      message.textContent = "瓶が流れてきた！";


      // 瓶が砂浜に着いたころ
      setTimeout(function() {

        bottle.classList.remove("arrive");

        wave.classList.remove("splash");

        message.textContent = "瓶をタップしてみて";

        step = 0;

      }, 1500);

    }, 2000);

  });

}
//大喜利投稿フォーム
const form = document.getElementById("ogiri-form");

if (form) {

  form.addEventListener("submit", function(event) {

    event.preventDefault();

    const question =
      document.getElementById("question-input").value;

    const message =
      document.getElementById("message-input").value;

    const name =
      document.getElementById("name-input").value;


    const data = new URLSearchParams();

    data.append("question", question);
    data.append("message", message);
    data.append("name", name);


    fetch("https://script.google.com/macros/s/AKfycbwUxYgYEsHoKKpcDMfb2HQZcSVw9arpBNbbv3Y4r9iBTLOaYLSLbhfLPk2fRwEpepv8/exec", {
      method: "POST",
      body: data,
      mode: "no-cors"
    });


    alert("瓶につめました！🫙");

    form.reset();

  });

}