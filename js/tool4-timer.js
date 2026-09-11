document.addEventListener("DOMContentLoaded", () => {
    const btnAddTimer = document.getElementById("btn-add-timer");
    const btnClearTimers = document.getElementById("btn-clear-timers");
    const timerList = document.getElementById("timer-list");
  
    if (!btnAddTimer || !timerList) return;
  
    // 1. 初始化：從 LocalStorage 載入歷史紀錄
    let timerItems = JSON.parse(localStorage.getItem("med_timer_list")) || [];
    renderTimers();
  
    // 2. 新增追蹤項目
    btnAddTimer.addEventListener("click", () => {
      const nameInput = document.getElementById("item-name");
      const dateInput = document.getElementById("open-date");
      const expiryInput = document.getElementById("expiry-days");
  
      const name = nameInput.value.trim();
      const dateStr = dateInput.value;
      // 讀取效期天數，若未輸入或小於 1 則預設為 28 天
      const expiryDays = parseInt(expiryInput.value, 10) > 0 ? parseInt(expiryInput.value, 10) : 28;
  
      if (!name || !dateStr) {
        alert("請輸入藥品名稱與開瓶日期！");
        return;
      }
  
      const newItem = {
        id: Date.now(),
        name: name,
        openDate: dateStr,
        expiryDays: expiryDays // ✨ 儲存自訂的效期天數
      };
  
      timerItems.push(newItem);
      saveAndRender();
  
      // 清空輸入框並還原預設天數
      nameInput.value = "";
      dateInput.value = "";
      expiryInput.value = "28";
    });
  
    // 3. 一鍵清空事件
    if (btnClearTimers) {
      btnClearTimers.addEventListener("click", () => {
        if (timerItems.length === 0) {
          alert("目前沒有任何追蹤中的開瓶項目！");
          return;
        }
        if (confirm("確定要清空所有開瓶倒數追蹤紀錄嗎？此動作無法復原！")) {
          timerItems = [];
          saveAndRender();
        }
      });
    }
  
    // 4. 儲存與渲染
    function saveAndRender() {
      localStorage.setItem("med_timer_list", JSON.stringify(timerItems));
      renderTimers();
    }
  
    function renderTimers() {
      timerList.innerHTML = "";
  
      if (timerItems.length === 0) {
        timerList.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem; text-align: center; padding: 20px 0;">目前尚無追蹤中的開瓶藥品</p>`;
        return;
      }
  
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      timerItems.forEach((item) => {
        const openDate = new Date(item.openDate);
        openDate.setHours(0, 0, 0, 0);
  
        // ✨ 計算天數差與自訂效期的剩餘天數
        const diffTime = today - openDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        // 兼容舊資料：若以往儲存的項目沒有 expiryDays，自動給予 28 天預設值
        const totalExpiry = item.expiryDays || 28;
        const remainDays = totalExpiry - diffDays;
  
        // 判定狀態 Badge
        let statusBadge = "";
        if (remainDays < 0) {
          statusBadge = `<span class="badge badge-red">已過期 ${Math.abs(remainDays)} 天</span>`;
        } else if (remainDays <= 7) {
          statusBadge = `<span class="badge badge-yellow">剩餘 ${remainDays} 天 (儘速使用)</span>`;
        } else {
          statusBadge = `<span class="badge badge-green">剩餘 ${remainDays} 天</span>`;
        }
  
        const div = document.createElement("div");
        div.className = "timer-item";
        div.innerHTML = `
          <div>
            <strong>${item.name}</strong>
            <div style="font-size: 0.8rem; color: var(--text-muted);">
              開瓶日: ${item.openDate} (效期: ${totalExpiry} 天)
            </div>
          </div>
          <div style="display: flex; align-items: center;">
            ${statusBadge}
            <button class="btn-del" data-id="${item.id}" style="margin-left: 12px;" title="刪除此紀錄">❌</button>
          </div>
        `;
  
        div.querySelector(".btn-del").addEventListener("click", (e) => {
          const idToDel = Number(e.target.getAttribute("data-id"));
          timerItems = timerItems.filter((t) => t.id !== idToDel);
          saveAndRender();
        });
  
        timerList.appendChild(div);
      });
    }
  });