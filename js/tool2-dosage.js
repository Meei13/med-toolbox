document.addEventListener("DOMContentLoaded", () => {
    const calcTypeSelect = document.getElementById("calc-type");
    const groupAge = document.getElementById("group-child-age");
    const groupWeight = document.getElementById("group-child-weight");
    const btnCalc = document.getElementById("btn-calc-dosage");
  
    if (!calcTypeSelect || !btnCalc) return;
  
    // 下拉選單連動
    calcTypeSelect.addEventListener("change", (e) => {
      if (e.target.value === "age") {
        groupAge.classList.remove("hidden");
        groupWeight.classList.add("hidden");
      } else {
        groupAge.classList.add("hidden");
        groupWeight.classList.remove("hidden");
      }
    });
  
    // 計算邏輯
    btnCalc.addEventListener("click", () => {
      const adultDose = parseFloat(document.getElementById("adult-dose").value);
      const type = calcTypeSelect.value;
      let resultDose = 0;
  
      if (!adultDose || adultDose <= 0) {
        alert("請輸入有效的成人標準劑量！");
        return;
      }
  
      if (type === "age") {
        const age = parseInt(document.getElementById("child-age").value);
        if (!age || age < 1) { alert("請輸入有效的兒童年齡！"); return; }
        resultDose = adultDose * (age / (age + 12));
      } else {
        const weight = parseFloat(document.getElementById("child-weight").value);
        if (!weight || weight < 1) { alert("請輸入有效的兒童體重！"); return; }
        resultDose = adultDose * (weight / 68);
      }
  
      document.getElementById("child-dose-val").textContent = resultDose.toFixed(1);
      document.getElementById("result-tool2").classList.remove("hidden");
    });
  });