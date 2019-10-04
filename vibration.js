
let vibrateInterval;

// 渡されたレベルでバイブレーションを開始
function startVibrate(duration) {
    navigator.vibrate(duration);
}

// バイブレーションを停止
function stopVibrate() {
    // インターバルをクリアして継続的なバイブレーションを停止 
    if (vibrateInterval) clearInterval(vibrateInterval);
    navigator.vibrate(0);
}

// 与えられた時間とインターバルによる継続的なバイブレーションを開始
// 数値が与えられるものとする
function startPeristentVibrate(duration, interval) {
    vibrateInterval = setInterval(function () {
        startVibrate(duration);
    }, interval);
}

function OnVibrateClick() {
    setInterval(UpdateStatus, 3000)
}

let duration = 10;

function UpdateStatus() {    
    stopVibrate();
    
    // 目的地までの距離が近いほど長く振動
    duration = (1 - dist / first_dist) * 1000;
    if(duration <= 0) duration = 10;

    startPeristentVibrate(duration, 1000);
}
