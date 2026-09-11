document.addEventListener("DOMContentLoaded", () => {
    const btnCalcTdee = document.getElementById("btn-calc-tdee");
    if (!btnCalcTdee) return;
  
    btnCalcTdee.addEventListener("click", () => {
      const h = parseFloat(document.getElementById("height").value);
      const w = parseFloat(document.getElementById("weight").value);
      const age = parseInt(document.getElementById("age").value);
      const gender = document.getElementById("gender").value;
      const act = parseFloat(document.getElementById("activity").value);
  
      if (!h || !w || !age || h <= 0 || w <= 0) {
        alert("請完整輸入有效的身高、體重與年齡！");
        return;
      }
  
      // 計算 BMI
      const bmi = w / ((h / 100) ** 2);
      
      // 計算 BMR (Mifflin-St Jeor 公式)
      let bmr = (10 * w) + (6.25 * h) - (5 * age);
      bmr += (gender === "male") ? 5 : -161;
  
      // 計算 TDEE
      const tdee = bmr * act;
  
      // 渲染 UI
      document.getElementById("bmi-val").textContent = bmi.toFixed(1);
      document.getElementById("bmr-val").textContent = Math.round(bmr);
      document.getElementById("tdee-val").textContent = Math.round(tdee);
  
      // BMI 狀態提示
      const bmiStatus = document.getElementById("bmi-status");
      if (bmi < 18.5) {
        bmiStatus.textContent = "體重過輕";
        bmiStatus.className = "badge badge-yellow";
      } else if (bmi < 24) {
        bmiStatus.textContent = "健康體位";
        bmiStatus.className = "badge badge-green";
      } else {
        bmiStatus.textContent = "體重過重";
        bmiStatus.className = "badge badge-red";
      }
  
      document.getElementById("result-tool1").classList.remove("hidden");
    });
  });