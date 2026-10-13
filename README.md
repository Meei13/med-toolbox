## 專案簡介

**《醫藥健康數位工具箱》** 為 **iThome 鐵人賽** 參賽作品，專為「家庭照護情境」打造。針對日常健康管理四大常見需求，提供簡單、安心、無負擔的防呆與自動化輔助工具。

---

## 4 大核心功能

### 1. Tool 1：生理指標計算器 (BMI / BMR / TDEE)
- **功能描述**：輸入身高、體重、年齡與日常活動量，快速計算每日熱量需求與基礎代謝率。
- **亮點**：搭配動態燈號警示，適用於日常健康維護與慢性病飲食管理。

### 2. Tool 2：兒童用藥劑量換算器
- **功能描述**：結合藥學經典公式 **揚氏公式 (Young's Rule)** 與 **克拉克公式 (Clark's Rule)**，依年齡或體重換算安全的兒童用藥劑量。
- **亮點**：內建輸入值邊界驗證與防呆警示，適用於深夜緊急退燒藥水驗算與海外成藥劑量確認。

### 3. Tool 3：每日用藥時間表生成器
- **功能描述**：動態新增藥品與服用時段（早/中/晚/睡前），自動生成直覺的矩陣時間表。
- **亮點**：支援 **一鍵列印當日紙本**（自動優化列印 CSS 樣式）與 **LocalStorage 本地紀錄記憶**，適合多重用藥長者。

### 4. Tool 4：特殊藥品開瓶倒數計時器
- **功能描述**：設定藥品開瓶日期與自訂效期天數（如 28 天），自動計算剩餘天數與即時狀態標籤。
- **亮點**：三階段馬卡龍警示燈號（安全/警告/過期），支援 LocalStorage 歷史紀錄持久化儲存，避免誤用過期眼藥水或散瞳劑。

---

## UI/UX 設計規範

- **溫和療癒配色**：採用低飽和度的馬卡龍色系（Macaron Palette），降低使用者面對醫療主題時的焦慮感。
- **SPA 單頁切換體驗**：採用頂端 Tab 選單切換，無需刷新頁面即可流暢切換 4 大工具。
- **響應式排版 (RWD)**：支援 Mobile、Tablet 與 Desktop，完美適應各式裝置螢幕。
- **無障礙友善 (A11y)**：動態同步 `aria-selected` 狀態，提供視障與輔具使用者更好的操作體驗。

---

## 技術選型與目錄結構

本專案貫徹「純原生 Web 開發」精神，不依賴任何前端框架（如 React, Vue）或 CSS 框架（如 Bootstrap, Tailwind）：

- **前端核心**：HTML5, CSS3 (CSS Variables, Flexbox, Grid), Vanilla JavaScript (ES6+)
- **資料持久化**：Web Storage API (LocalStorage)
- **版本控制與部署**：Git, GitHub, GitHub Pages

---

## 目錄結構 (Project Structure)

```text
med-toolbox/
├── index.html               # 網頁主要骨架 (SPA 結構，包含 4 大 Tool Section)
├── css/
│   ├── style.css            # 全局 Reset、CSS 變數系統與主佈局
│   └── components.css       # 通用元件樣式 (按鈕, 表格, Badge 標籤, 列印專用樣式)
├── js/
│   ├── app.js               # 全局控制 (Tab 切換與無障礙綁定)
│   ├── tool1-calculator.js  # Tool 1 生理指標計算邏輯
│   ├── tool2-dosage.js      # Tool 2 兒童劑量換算邏輯
│   ├── tool3-schedule.js    # Tool 3 時間表生成、列印與LocalStorage 記憶
│   └── tool4-timer.js       # Tool 4 開瓶計時、自訂效期與 LocalStorage 記憶
└── README.md                # 專案說明文件