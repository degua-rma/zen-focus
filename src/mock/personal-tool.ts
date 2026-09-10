const PAYMENT_SETTING_COUNT = 45;

const PAYMENT_NAMES = [
  "房租",
  "水電瓦斯",
  "Netflix",
  "Spotify",
  "手機費",
  "網路費",
  "健身房",
  "保險費",
  "訂閱軟體",
  "信用卡年費",
];

const PERIODS = ["每月", "每兩個月", "每季", "每半年", "每年"] as const;

const NOTES = ["", "", "自動扣款", "記得保留發票", "可與室友分攤"];

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

function randomAmount(): string {
  if (Math.random() < 0.1) return "未知";
  return String(Math.floor(Math.random() * 20000) + 100);
}

function randomDate(year = 2026): string {
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function randomDateBefore(maxDate: string): string {
  const date = new Date(maxDate);
  date.setDate(date.getDate() - (Math.floor(Math.random() * 180) + 1));
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function generatePaymentSettingData(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const date = randomDate();
    const hasLastPayment = Math.random() > 0.3;

    return {
      id: index + 1,
      name: index === 0 ? "房租" : pickRandom(PAYMENT_NAMES),
      amount: randomAmount(),
      period: pickRandom(PERIODS),
      date,
      lastPaymentDate: hasLastPayment ? randomDateBefore(date) : "",
      note: pickRandom(NOTES),
      status: Math.random() > 0.2,
    };
  });
}

export const paymentSettingData = generatePaymentSettingData(
  PAYMENT_SETTING_COUNT,
);
