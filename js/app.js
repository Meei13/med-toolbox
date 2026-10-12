document.addEventListener("DOMContentLoaded", () => {
    // 1. 抓取畫面上的按鈕與卡片
    const tabBtns = document.querySelectorAll(".tab-btn");
    const toolCards = document.querySelectorAll(".tool-card");
  
    // 2. 監聽每個按鈕的點擊事件
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        
        // 3. 歸零：移除所有按鈕與卡片的 active 樣式，並將 aria-selected 設為 "false"
        tabBtns.forEach(b => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false"); // 👈 補上大括號，語法正確！
        });
        
        toolCards.forEach(c => {
          c.classList.remove("active");
        });
  
        // 4. 啟用：將被點擊的按鈕與對應的卡片加上 active 樣式，並將 aria-selected 設為 "true"
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
  
        // 5. 讀取 HTML 屬性 (優先讀取 data-target，若無則讀取 data-tab)
        const targetTab = btn.getAttribute("data-target") || btn.getAttribute("data-tab");
        
        const targetCard = document.getElementById(targetTab);
        if (targetCard) {
          targetCard.classList.add("active");
        } else {
          console.error(`找不到 ID 為 "${targetTab}" 的工具卡片！請檢查 HTML 的 ID 命名。`);
        }
  
      });
    });
  });