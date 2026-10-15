document.addEventListener("DOMContentLoaded", () => {
    const btnAddMed = document.getElementById("btn-add-med");
    const btnClearSchedule = document.getElementById("btn-clear-schedule");
    if (!btnAddMed) return;
  
    // 1. 自動填寫今日日期
    const dateSpan = document.getElementById("current-date-str");
    const today = new Date();
    const dateFormatted = `${today.getFullYear()}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}`;
    if (dateSpan) dateSpan.textContent = dateFormatted;
  
    // 2. 從 LocalStorage 載入資料
    let medList = JSON.parse(localStorage.getItem("med_schedule_list")) || [];
    renderSchedule();
  
    // 3. 新增藥品事件
    btnAddMed.addEventListener("click", () => {
      const nameInput = document.getElementById("med-name");
      const dosageInput = document.getElementById("med-dosage");

      // 一次抓取所有被勾选 (checked) 的時段 Value
      const checkedTimes = Array.from(document.querySelectorAll('input[name="med-time"]:checked')).map(cb => cb.value);
  
      const name = nameInput.value.trim();
      const dosage = dosageInput.value.trim() || "1錠";

    // 防呆條件 1：未輸入藥品名稱
      if (!name) {
        alert("請輸入藥品名稱！");
        return;
      }
  
    // 防呆條件 2：未選擇任何服用時段
      if (checkedTimes.length === 0) {
        alert("請至少選擇一個服用時段 (早/中/晚/睡前)！");
        return;
      }

      // 建立新藥品物件
      const newMed = {
        id: Date.now(),
        name: name,
        dosage: dosage,
        times: checkedTimes
      };
  
      // 推入核心資料庫陣列
      medList.push(newMed);

      // 儲存並渲染 (模組化呼叫)
      saveAndRender();
  
      // 清空輸入表單與核取方塊
      nameInput.value = "";
      dosageInput.value = "";
      document.querySelectorAll('input[name="med-time"]').forEach(cb => cb.checked = false);
    });
  
    // 4. ✨ 新增：一鍵清空事件
    if (btnClearSchedule) {
      btnClearSchedule.addEventListener("click", () => {
        if (medList.length === 0) {
          alert("目前時間表中沒有任何項目！");
          return;
        }
        if (confirm("確定要清空用藥時間表中的所有藥品嗎？此動作無法復原！")) {
            medList = [];
            saveAndRender();
          }
      });
    }
  
    // 5. 儲存與渲染
    function saveAndRender() {
      localStorage.setItem("med_schedule_list", JSON.stringify(medList));
      renderSchedule();
    }
  
    // 核心渲染函式：將 medList 陣列動態繪製成 DOM 節點
    function renderSchedule() {

        // 1. 取得 4 個時段格子的 DOM 節點對照表
          const slots = {
            morning: document.getElementById("slot-morning"),
            noon: document.getElementById("slot-noon"),
            night: document.getElementById("slot-night"),
            bedtime: document.getElementById("slot-bedtime")
          };
      
          // 2. 清空現有表格內容 (防止重複繪製)
          Object.values(slots).forEach(slot => { if (slot) slot.innerHTML = ""; });
      
          // 3. 外層：巡訪每筆藥品物件
          medList.forEach(med => {
    
            // 內層：巡訪藥品勾選的時段
            med.times.forEach(timeKey => {
              if (slots[timeKey]) {
    
                // 動態建立外層卡片容器 <div>
                const chip = document.createElement("div");
                chip.className = "med-chip";
    
                // 動態建立藥品名稱與備註
                chip.innerHTML = `
                  <div class="med-info">
                    <strong>${med.name}</strong>
                    <span class="med-qty">備注: ${med.dosage}</span>
                  </div>
                  <button class="btn-del no-print" data-id="${med.id}" title="刪除此藥品">❌</button>
                `;
      
                chip.querySelector(".btn-del").addEventListener("click", (e) => {
                  const idToDel = Number(e.target.getAttribute("data-id"));
                  medList = medList.filter(item => item.id !== idToDel);
                  saveAndRender();
                });
      
                slots[timeKey].appendChild(chip);
              }
            });
          });
        }
  });