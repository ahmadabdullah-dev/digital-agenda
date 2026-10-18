export class Shared {
  static formatDateTime(value?: string | null): string | null {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;

    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }
  static formatDate(value?: string | null): string | null {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;

    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  static toISODate(d: Date): string {
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${month}-${day}`;
  }

  // yyyy-MM-dd + days -> yyyy-MM-dd add days
  static shiftDate(date: string, days: number): string {
    const [y, m, d] = date.split("-").map(Number);
    return Shared.toISODate(new Date(y, m - 1, d + days));
  }
}
