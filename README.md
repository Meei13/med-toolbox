## 專案簡介 (Overview)

本專案為 **iThome 鐵人賽** 參賽作品，旨在將複雜的醫療健康數據與日常照護需求，轉化為簡易易用的微型 Web 工具。

專案堅持採用 **Vanilla JS (原生 JavaScript)** 開發，無第三方框架包袱，實現快速載入、離線 LocalStorage 持久化儲存，並支援 **A4 紙本高畫質列印 (`@media print`)**，讓長輩與照護者能輕鬆將健康資訊轉化為實體紀錄。

---

## 已開發工具模組 (Toolbox Features)

### Tool 1：BMI & 基礎代謝率 (BMR/TDEE) 計算器
* 自動計算 BMI、BMR 與每日總熱量消耗 (TDEE)。
* 結合視覺化健康區間提示與馬卡龍配色卡片。

### Tool 2：每日建議飲水量與進度追蹤器
* 依據體重自動換算每日最佳飲水量。
* 提供一鍵快速打卡與 LocalStorage 歷史紀錄追蹤。

### Tool 3：每日用藥時間表生成器 (Daily Medication Schedule)
* **多時段分派**：支援將單一藥品同時歸類至「早/中/晚/睡前」4 大服用時段。
* **資料同步 (CRUD)**：支援單筆藥品卡片刪除與一鍵清空時間表，資料自動同步至 LocalStorage。
* **無障礙表單設計**：修復 HTML `<label>` 關聯性與 Optional Chaining (`?.`) 空值防呆，確保程式碼穩定性。
* **A4 乾淨紙本列印 (`@media print`)**：
  * 自動隱藏按鈕、輸入框與無關 UI。
  * 包含列印專用抬頭與自動帶入當日日期 (`YYYY/MM/DD`)。
  * 使用 `print-color-adjust: exact` 保留灰階質感，並加高表格格子方便手寫備註。

### Tool 4：藥品保存期限與動態過期提醒器 (開發中)
* 透過原生 `Date` 物件與 `setDate()` 實作跨月/跨年效期自動計算。
* 輸入開封日與效期天數 (`expiryDays`)，秒算預計過期日期。

---

## 技術亮點 (Technical Highlights)

* **單一真實數據源 (Single Source of Truth)**：UI 完全由資料陣列 (`Array of Objects`) 驅動，拒絕手動混亂操作 DOM。
* **事件代理與動態監聽 (Event Delegation)**：動態產生的 DOM 卡片直接進行事件綁定，解決 `querySelector` 時間差抓取 null 問題。
* **防呆衛語句 (Guard Clauses)**：完整驗證表單輸入（未填藥名、未選時段攔截），提升用戶體驗。
* **A4 Print CSS 優化**：專為銀髮族與紙本照護設計，一鍵 `window.print()` 輸出乾淨無雜訊的醫療時間表。
* **無框架零依賴**：100% 原生 HTML5 / CSS3 (Flexbox & Grid) / Vanilla JS，載入速度極快。

---

## 目錄結構 (Project Structure)

```text
macaron-medical-toolbox/
├── index.html              # 主頁面入口 (包含 Tool 1 ~ Tool 4 頁面區塊)
├── css/
│   └── style.css           # 全域樣式、馬卡龍變數與 @media print 列印樣式
├── js/
│   ├── tool1-bmi.js        # Tool 1 計算邏輯
│   ├── tool2-water.js      # Tool 2 打卡追蹤邏輯
│   ├── tool3-schedule.js   # Tool 3 用藥時間表核心邏輯 (LocalStorage & DOM 渲染)
│   └── tool4-expiry.js     # Tool 4 日期計算邏輯
└── README.md               # 專案說明文件