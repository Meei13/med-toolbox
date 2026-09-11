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
      const checkedTimes = Array.from(document.querySelectorAll('input[name="med-time"]:checked')).map(cb => cb.value);
  
      const name = nameInput.value.trim();
      const dosage = dosageInput.value.trim() || "1錠";
  
      if (!name) {
        alert("請輸入藥品名稱！");
        return;
      }
  
      if (checkedTimes.length === 0) {
        alert("請至少選擇一個服用時段 (早/中/晚/睡前)！");
        return;
      }
  
      const newMed = {
        id: Date.now(),
        name: name,
        dosage: dosage,
        times: checkedTimes
      };
  
      medList.push(newMed);
      saveAndRender();
  
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
  
    function renderSchedule() {
      const slots = {
        morning: document.getElementById("slot-morning"),
        noon: document.getElementById("slot-noon"),
        night: document.getElementById("slot-night"),
        bedtime: document.getElementById("slot-bedtime")
      };
  
      Object.values(slots).forEach(slot => { if (slot) slot.innerHTML = ""; });
  
      medList.forEach(med => {
        med.times.forEach(timeKey => {
          if (slots[timeKey]) {
            const chip = document.createElement("div");
            chip.className = "med-chip";
            chip.innerHTML = `
              <div class="med-info">
                <strong>${med.name}</strong>
                <span class="med-qty">用量: ${med.dosage}</span>
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