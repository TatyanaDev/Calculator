document.addEventListener("DOMContentLoaded", () => {
  const buttonReset = document.querySelector(".reset");
  const buttonCalc = document.querySelector(".calc");
  const display = document.querySelector(".display");
  const buttons = document.querySelectorAll("button");
  const time = document.querySelector(".time");

  const operators = ["+", "-", "*", "/"];
  const MAX_DIGITS = 15;

  const isOperator = (v) => operators.includes(v);
  const endsWithOperator = (v) => operators.some((op) => v.endsWith(op));
  const lastNumber = (v) => v.split(/[+\-*/]/).pop();

  const scrollDisplay = () => (display.scrollTop = display.scrollHeight);

  display.addEventListener("keydown", (e) => e.preventDefault());

  buttonReset.addEventListener("click", () => {
    display.value = "";
    scrollDisplay();
  });

  buttonCalc.addEventListener("click", () => {
    const expr = display.value;

    if (expr === "" || endsWithOperator(expr)) {
      return;
    }

    let result;

    try {
      result = eval(expr);
    } catch {
      return;
    }

    if (!Number.isFinite(result)) {
      return;
    }

    display.value = String(result);
    scrollDisplay();
  });

  buttons.forEach((button) => {
    const value = button.innerHTML;

    if (value === "C" || value === "=") {
      return;
    }

    button.addEventListener("click", () => {
      const current = display.value;

      if (/\d/.test(value)) {
        const digitsInCurrentNumber = lastNumber(current).replace(/\D/g, "").length;

        if (digitsInCurrentNumber >= MAX_DIGITS) {
          return;
        }

        display.value += value;
        scrollDisplay();

        return;
      }

      if (value === ".") {
        const last = lastNumber(current);

        if (!last.includes(".")) {
          display.value += ".";
          scrollDisplay();
        }

        return;
      }

      if (isOperator(value)) {
        if (current === "" && value !== "-") {
          return;
        }

        if (endsWithOperator(current)) {
          return;
        }

        display.value += value;
        scrollDisplay();
      }
    });
  });

  setInterval(() => {
    time.innerHTML = new Date().toLocaleString("ru", {
      hour: "numeric",
      minute: "numeric",
    });
  }, 1000);
});
