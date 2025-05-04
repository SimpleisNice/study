const fs = require("fs");

// 공연료 청구서에 들어갈 데이터
const invoices = JSON.parse(
  fs.readFileSync(
    "/Users/toya/Code/study/books/refactoring/chapter01/invoices.json",
    "utf8"
  )
);
// 극단의 공연할 연극 정보
const plays = JSON.parse(
  fs.readFileSync(
    "/Users/toya/Code/study/books/refactoring/chapter01/plays.json",
    "utf8"
  )
);
// statement 함수 호출
const result = statement(invoices[0], plays);

console.log(result);

function statement(invoice, plays) {
  let totalAmount = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})`;

  for (let perf of invoice.performances) {
    // 청구 내역을 출력
    result += ` ${playerFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    }석)\n`;
    totalAmount += amountFor(perf);
  }

  return renderPlainText(invoice, plays);

  function amountFor(aPerformance) {
    let result = 0;

    switch (playerFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;

      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }

        result += 300 * aPerformance.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }
    return result;
  }

  function playerFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playerFor(aPerformance).type) {
      result += Math.floor(aPerformance.audience / 5);
    }
    return result;
  }

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  function renderPlainText(invoice, plays) {
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;

    for (let perf of invoice.performances) {
      // 청구 내역을 출력
      result += ` ${playerFor(perf).name}: ${usd(amountFor(perf))} (${
        perf.audience
      }석)\n`;
    }

    result += `총액: ${usd(totalAmount)}\n`;
    return result;
  }
}
