import {
  Address,
  CustomerEntity,
  CustomerId,
  Email,
} from "../src/customers/domain";

/**
 * Exemplo prático de uso da entidade Customer seguindo as regras DDD
 */

// Exemplo 1: Criando um novo customer
console.log("=== Criando um novo Customer ===");

try {
  const newCustomer = CustomerEntity.create(
    "joão silva",
    "joao.silva@email.com",
    {
      street: "Rua das Flores, 123",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234567",
      country: "Brasil",
    }
  );

  console.log("Customer criado:", newCustomer.getFullInfo());
  console.log("ID gerado:", newCustomer.id.value);
  console.log("Nome normalizado:", newCustomer.name); // "João Silva"
  console.log("Email:", newCustomer.email.value); // "joao.silva@email.com"
  console.log("Endereço completo:", newCustomer.address.getFullAddress());
  console.log("Status ativo:", newCustomer.isActive);
} catch (error) {
  console.error("Erro ao criar customer:", error.message);
}

// Exemplo 2: Reconstruindo customer da persistência
console.log("\n=== Reconstruindo Customer da persistência ===");

try {
  const existingCustomerData = {
    id: new CustomerId("12345678-1234-4123-8123-123456789abc"),
    name: "Maria Santos",
    email: new Email("maria.santos@empresa.com"),
    address: new Address({
      street: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100",
      country: "Brasil",
    }),
    isActive: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
  };

  const existingCustomer = CustomerEntity.fromPersistence(existingCustomerData);
  console.log("Customer reconstruído:", existingCustomer.getFullInfo());
} catch (error) {
  console.error("Erro ao reconstruir customer:", error.message);
}

// Exemplo 3: Operações de domínio
console.log("\n=== Operações de Domínio ===");

try {
  const customer = CustomerEntity.create("Ana Costa", "ana.costa@email.com", {
    street: "Rua A, 100",
    city: "Rio de Janeiro",
    state: "RJ",
    zipCode: "20000-000",
    country: "Brasil",
  });

  console.log("Customer original:", customer.getFullInfo());

  // Mudando nome
  customer.changeName("Ana Costa Silva");
  console.log("Após mudança de nome:", customer.name);

  // Mudando email
  customer.changeEmail("ana.silva@novoemail.com");
  console.log("Após mudança de email:", customer.email.value);

  // Mudando endereço
  customer.changeAddress({
    street: "Rua B, 200",
    city: "Rio de Janeiro",
    state: "RJ",
    zipCode: "20001-000",
    country: "Brasil",
  });
  console.log("Após mudança de endereço:", customer.address.getFullAddress());

  // Testando métodos de utilidade
  console.log("É de Rio de Janeiro?", customer.isFromCity("Rio de Janeiro"));
  console.log(
    "É do domínio novoemail.com?",
    customer.isFromEmailDomain("novoemail.com")
  );

  // Desativando customer
  customer.deactivate();
  console.log("Customer ativo?", customer.isActive);

  // Reativando customer
  customer.activate();
  console.log("Customer ativo após reativação?", customer.isActive);
} catch (error) {
  console.error("Erro nas operações de domínio:", error.message);
}

// Exemplo 4: Validações e invariantes
console.log("\n=== Testando Validações ===");

// Email inválido
try {
  CustomerEntity.create("João", "email-inválido", {
    street: "Rua A",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234567",
    country: "Brasil",
  });
} catch (error) {
  console.log("Erro esperado - Email inválido:", error.message);
}

// Nome muito curto
try {
  CustomerEntity.create("A", "email@valido.com", {
    street: "Rua A",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234567",
    country: "Brasil",
  });
} catch (error) {
  console.log("Erro esperado - Nome muito curto:", error.message);
}

// CEP inválido
try {
  CustomerEntity.create("João Silva", "joao@email.com", {
    street: "Rua A",
    city: "São Paulo",
    state: "SP",
    zipCode: "123", // CEP inválido
    country: "Brasil",
  });
} catch (error) {
  console.log("Erro esperado - CEP inválido:", error.message);
}

console.log("\n=== Todos os exemplos executados! ===");
