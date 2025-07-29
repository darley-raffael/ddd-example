/**
 * Value Object para identificação única do Customer
 * Garante que todo ID seja válido e único
 */
export class CustomerId {
  private readonly _value: string;

  constructor(id: string) {
    this.validateId(id);
    this._value = id;
  }

  private validateId(id: string): void {
    if (!id || id.trim().length === 0) {
      throw new Error("ID do cliente não pode ser vazio");
    }

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new Error("ID deve ser um UUID válido");
    }
  }

  get value(): string {
    return this._value;
  }

  equals(other: CustomerId): boolean {
    return this._value === other._value;
  }

  static generate(): CustomerId {
    return new CustomerId(Bun.randomUUIDv7());
  }
}
