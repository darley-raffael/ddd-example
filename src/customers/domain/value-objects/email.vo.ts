/**
 * Value Object para Email
 * Garante que todo email seja válido e fornece comportamentos relacionados
 */
export class Email {
  private readonly _value: string;

  constructor(email: string) {
    this.validateEmail(email);
    this._value = this.normalizeEmail(email);
  }

  private validateEmail(email: string): void {
    if (!email || email.trim().length === 0) {
      throw new Error("Email não pode ser vazio");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Formato de email inválido");
    }

    if (email.length > 254) {
      throw new Error("Email muito longo");
    }
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  get value(): string {
    return this._value;
  }

  getDomain(): string {
    return this._value.split("@")[1] || "";
  }

  getLocalPart(): string {
    return this._value.split("@")[0] || "";
  }

  equals(other: Email): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
}
