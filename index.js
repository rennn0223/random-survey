// index.js

// 1. 获取上一次访问的索引（存储在浏览器本地）
let lastIndex = localStorage.getItem('survey_last_idx');

let currentIndex;

if (urls.length > 0) {
    if (lastIndex === null) {
        // 第一次访问：完全随机选一个
        currentIndex = Math.floor(Math.random() * urls.length);
    } else {
        // 后续访问：强制选择下一个（实现 0 -> 1 -> 0 的循环）
        currentIndex = (parseInt(lastIndex) + 1) % urls.length;
    }

    // 2. 存入本次索引，供下次使用
    localStorage.setItem('survey_last_idx', currentIndex);

    // 3. 执行跳转
    window.location.href = urls[currentIndex];
} else {
    // 兜底方案
    window.location.href = 'https://github.com/rennn0223/random-survey';
}
