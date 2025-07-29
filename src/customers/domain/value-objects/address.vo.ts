/**
 * Value Object para Endereço
 * Garante que todo endereço seja válido e fornece comportamentos relacionados
 */
export interface AddressProps {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export class Address {
  private readonly _street: string;
  private readonly _city: string;
  private readonly _state: string;
  private readonly _zipCode: string;
  private readonly _country: string;

  constructor(props: AddressProps) {
    this.validateAddress(props);
    this._street = this.normalizeString(props.street);
    this._city = this.normalizeString(props.city);
    this._state = this.normalizeString(props.state);
    this._zipCode = this.normalizeZipCode(props.zipCode);
    this._country = this.normalizeString(props.country);
  }

  private validateAddress(props: AddressProps): void {
    if (!props.street || props.street.trim().length === 0) {
      throw new Error("Rua é obrigatória");
    }

    if (!props.city || props.city.trim().length === 0) {
      throw new Error("Cidade é obrigatória");
    }

    if (!props.state || props.state.trim().length === 0) {
      throw new Error("Estado é obrigatório");
    }

    if (!props.zipCode || props.zipCode.trim().length === 0) {
      throw new Error("CEP é obrigatório");
    }

    if (!props.country || props.country.trim().length === 0) {
      throw new Error("País é obrigatório");
    }

    // Validação básica de CEP brasileiro
    const zipCodeRegex = /^\d{5}-?\d{3}$/;
    if (!zipCodeRegex.test(props.zipCode.replace(/\D/g, ""))) {
      throw new Error("Formato de CEP inválido");
    }
  }

  private normalizeString(value: string): string {
    return value.trim();
  }

  private normalizeZipCode(zipCode: string): string {
    const cleaned = zipCode.replace(/\D/g, "");
    return `${cleaned.substring(0, 5)}-${cleaned.substring(5)}`;
  }

  get street(): string {
    return this._street;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  get country(): string {
    return this._country;
  }

  getFullAddress(): string {
    return `${this._street}, ${this._city}, ${this._state} ${this._zipCode}, ${this._country}`;
  }

  equals(other: Address): boolean {
    return (
      this._street === other._street &&
      this._city === other._city &&
      this._state === other._state &&
      this._zipCode === other._zipCode &&
      this._country === other._country
    );
  }

  toString(): string {
    return this.getFullAddress();
  }
}
