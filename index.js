// 你的 Google Apps Script URL
const GAS_URL = 'https://script.google.com/macros/s/AKfycbxxNdKZe3b4EZMEHl8IWfgxoZoaSk157NZ-CdIR4ns0F6IqfT0bYiMytsVjMzcUEI0K/exec';

async function redirect() {
    try {
        // 向 Google 表格請求下一個該派發的索引
        // 使用 mode: 'cors' 確保跨網域存取
        const response = await fetch(GAS_URL);
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        const targetIndex = data.index;

        // 檢查 urls 是否存在且有資料 (由 url.js 提供)
        if (typeof urls !== 'undefined' && urls.length > 0) {
            // 根據 Google 回傳的 index 跳轉 (0 或 1)
            // 使用餘數運算確保即使增加問卷數量也能正常運作
            window.location.href = urls[targetIndex % urls.length];
        } else {
            // 如果 url.js 沒讀到，跳轉到你的 GitHub 備案
            window.location.href = 'https://github.com/rennn0223/random-survey';
        }
    } catch (error) {
        // 如果 API 沒反應（例如網路延遲），則使用隨機備案，確保填答者不會看到空白頁
        console.error("Redirect error:", error);
        if (typeof urls !== 'undefined' && urls.length > 0) {
            window.location.href = urls[Math.floor(Math.random() * urls.length)];
        } else {
            window.location.href = 'https://github.com/rennn0223/random-survey';
        }
    }
}

// 執行跳轉函數
redirect();
