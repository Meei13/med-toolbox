document.addEventListener("DOMContentLoaded", () => {
    // Tab 分頁切換全域邏輯
    const tabBtns = document.querySelectorAll(".tab-btn");
    const toolCards = document.querySelectorAll(".tool-card");
  
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        toolCards.forEach(c => c.classList.remove("active"));
  
        btn.classList.add("active");
        const targetTab = btn.getAttribute("data-tab");
        document.getElementById(targetTab).classList.add("active");
      });
    });
  });