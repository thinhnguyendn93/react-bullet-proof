export function formatToPercent(number: number) {
    return Math.floor(number * 100);
  }
  
  export function formatNumber(num: number, period: string = ','): string {
    if (num === undefined) return '';
    const formatted = Number(num)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, `$&${period}`);
    if (num < 1e3) return num.toString();
    if (Number.isInteger(num)) {
      return formatted.slice(0, -3);
    }
    return formatted;
  }