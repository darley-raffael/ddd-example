import { Address } from "../value-objects/address.vo";
import { CustomerId } from "../value-objects/customer-id.vo";
import { Email } from "../value-objects/email.vo";

/**
 * Entidade Customer seguindo as regras do Domain-Driven Design
 * Representa um cliente no sistema com todas as suas invariantes de negócio
 */
export interface CustomerProps {
  id: CustomerId;
  name: string;
  email: Email;
  address: Address;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CustomerEntity {
  private readonly _id: CustomerId;
  private _name: string;
  private _email: Email;
  private _address: Address;
  private _isActive: boolean;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: CustomerProps) {
    this.validateCustomer(props);

    this._id = props.id;
    this._name = this.normalizeName(props.name);
    this._email = props.email;
    this._address = props.address;
    this._isActive = props.isActive ?? true;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  // Factory method para criar novo customer
  static create(
    name: string,
    email: string,
    addressProps: any
  ): CustomerEntity {
    const customerId = CustomerId.generate();
    const customerEmail = new Email(email);
    const customerAddress = new Address(addressProps);

    return new CustomerEntity({
      id: customerId,
      name,
      email: customerEmail,
      address: customerAddress,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // Factory method para reconstruir customer existente
  static fromPersistence(props: CustomerProps): CustomerEntity {
    return new CustomerEntity(props);
  }

  private validateCustomer(props: CustomerProps): void {
    if (!props.name || props.name.trim().length === 0) {
      throw new Error("Nome do cliente é obrigatório");
    }

    if (props.name.trim().length < 2) {
      throw new Error("Nome deve ter pelo menos 2 caracteres");
    }

    if (props.name.trim().length > 100) {
      throw new Error("Nome não pode ter mais de 100 caracteres");
    }

    if (!props.email) {
      throw new Error("Email é obrigatório");
    }

    if (!props.address) {
      throw new Error("Endereço é obrigatório");
    }

    if (!props.id) {
      throw new Error("ID é obrigatório");
    }
  }

  private normalizeName(name: string): string {
    return name
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  // Getters
  get id(): CustomerId {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): Email {
    return this._email;
  }

  get address(): Address {
    return this._address;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  // Métodos de domínio
  changeName(newName: string): void {
    if (!newName || newName.trim().length === 0) {
      throw new Error("Novo nome é obrigatório");
    }

    if (newName.trim().length < 2) {
      throw new Error("Nome deve ter pelo menos 2 caracteres");
    }

    if (newName.trim().length > 100) {
      throw new Error("Nome não pode ter mais de 100 caracteres");
    }

    this._name = this.normalizeName(newName);
    this._updatedAt = new Date();
  }

  changeEmail(newEmail: string): void {
    const email = new Email(newEmail);

    if (this._email.equals(email)) {
      throw new Error("O novo email deve ser diferente do atual");
    }

    this._email = email;
    this._updatedAt = new Date();
  }

  changeAddress(newAddressProps: any): void {
    const newAddress = new Address(newAddressProps);

    if (this._address.equals(newAddress)) {
      throw new Error("O novo endereço deve ser diferente do atual");
    }

    this._address = newAddress;
    this._updatedAt = new Date();
  }

  activate(): void {
    if (this._isActive) {
      throw new Error("Cliente já está ativo");
    }

    this._isActive = true;
    this._updatedAt = new Date();
  }

  deactivate(): void {
    if (!this._isActive) {
      throw new Error("Cliente já está inativo");
    }

    this._isActive = false;
    this._updatedAt = new Date();
  }

  // Métodos de utilidade
  getFullInfo(): string {
    return `${this._name} (${
      this._email.value
    }) - ${this._address.getFullAddress()}`;
  }

  isFromCity(city: string): boolean {
    return this._address.city.toLowerCase() === city.toLowerCase();
  }

  isFromEmailDomain(domain: string): boolean {
    return this._email.getDomain().toLowerCase() === domain.toLowerCase();
  }

  // Igualdade baseada na identidade
  equals(other: CustomerEntity): boolean {
    return this._id.equals(other._id);
  }

  toString(): string {
    return `Customer: ${this._name} (${this._id.value})`;
  }

  // Para persistência
  toPlainObject() {
    return {
      id: this._id.value,
      name: this._name,
      email: this._email.value,
      address: {
        street: this._address.street,
        city: this._address.city,
        state: this._address.state,
        zipCode: this._address.zipCode,
        country: this._address.country,
      },
      isActive: this._isActive,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
