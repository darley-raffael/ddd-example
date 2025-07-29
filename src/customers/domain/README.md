# Customer Domain - Domain-Driven Design (DDD)

Esta implementação da entidade `Customer` segue rigorosamente os princípios do Domain-Driven Design (DDD).

## 🏗️ Estrutura da Implementação

### Value Objects

#### 1. `CustomerId`
- **Propósito**: Identificação única e tipada do Customer
- **Validações**: UUID v4 válido obrigatório
- **Características**:
  - Imutável
  - Método `generate()` para criar novos IDs
  - Comparação por valor com `equals()`

#### 2. `Email`
- **Propósito**: Garantir que emails sejam sempre válidos
- **Validações**: 
  - Formato de email válido
  - Não pode ser vazio
  - Máximo 254 caracteres
- **Características**:
  - Normalização automática (trim + lowercase)
  - Métodos para extrair domínio e parte local
  - Comparação por valor

#### 3. `Address`
- **Propósito**: Representar endereços completos e válidos
- **Validações**:
  - Todos os campos obrigatórios
  - CEP no formato brasileiro
- **Características**:
  - Normalização de CEP automática
  - Método `getFullAddress()` para endereço completo
  - Comparação por valor

### Entidade Customer

#### Características DDD Implementadas:

1. **Identidade Única**: Usa `CustomerId` como identificador
2. **Encapsulamento**: Campos privados com getters públicos
3. **Invariantes de Negócio**: Validações garantem estado sempre válido
4. **Value Objects**: Usa `Email`, `Address` e `CustomerId`
5. **Factory Methods**: 
   - `create()` para novos customers
   - `fromPersistence()` para reconstrução
6. **Métodos de Domínio**: Comportamentos relevantes ao negócio
7. **Rich Domain Model**: Não é um modelo anêmico

## 🎯 Regras de Negócio Implementadas

### Validações de Criação:
- Nome obrigatório (2-100 caracteres)
- Email válido obrigatório
- Endereço completo obrigatório
- ID único obrigatório

### Operações de Domínio:
- `changeName()`: Altera nome com validações
- `changeEmail()`: Troca email (deve ser diferente)
- `changeAddress()`: Altera endereço (deve ser diferente)
- `activate()` / `deactivate()`: Controla status ativo
- `getFullInfo()`: Informações completas formatadas
- `isFromCity()`: Verifica se é de determinada cidade
- `isFromEmailDomain()`: Verifica domínio do email

### Normalização Automática:
- **Nome**: Capitalização adequada (João Silva)
- **Email**: Lowercase e trim
- **CEP**: Formato brasileiro (12345-678)

## 📋 Princípios DDD Seguidos

### 1. **Linguagem Ubíqua**
- Métodos e propriedades usam termos do domínio
- Nomes claros e significativos
- Documentação em português (contexto brasileiro)

### 2. **Agregados**
- Customer é um agregado consistente
- Todas as mudanças passam pelos métodos da entidade
- Estado sempre válido

### 3. **Value Objects**
- Tipos primitivos substituídos por Value Objects
- Validações centralizadas nos Value Objects
- Imutabilidade garantida

### 4. **Factory Pattern**
- `CustomerEntity.create()` para criação segura
- `CustomerEntity.fromPersistence()` para reconstrução
- Validações no momento da criação

### 5. **Encapsulamento**
- Estado interno protegido
- Acesso controlado através de métodos
- Invariantes sempre mantidas

## 🚀 Como Usar

### Criando um novo Customer:
```typescript
const customer = CustomerEntity.create(
  'João Silva',
  'joao@email.com',
  {
    street: 'Rua A, 123',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234567',
    country: 'Brasil'
  }
);
```

### Operações de domínio:
```typescript
// Alterando dados
customer.changeName('João Santos');
customer.changeEmail('novo@email.com');

// Controle de status
customer.deactivate();
customer.activate();

// Consultas
const isFromSP = customer.isFromCity('São Paulo');
const info = customer.getFullInfo();
```

### Reconstrução da persistência:
```typescript
const customer = CustomerEntity.fromPersistence({
  id: new CustomerId(uuid),
  name: 'Maria Silva',
  email: new Email('maria@email.com'),
  address: new Address(addressData),
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
});
```

## ✅ Benefícios da Implementação DDD

1. **Validações Centralizadas**: Impossível criar Customer inválido
2. **Expressividade**: Código expressa regras de negócio claramente
3. **Manutenibilidade**: Mudanças centralizadas nos Value Objects
4. **Testabilidade**: Comportamentos isolados e testáveis
5. **Type Safety**: TypeScript + Value Objects = segurança total
6. **Evolução**: Fácil adicionar novas regras e comportamentos

## 🧪 Testando

Execute o arquivo de exemplo para ver a implementação em ação:

```bash
bun run examples/customer-usage.ts
```

Este exemplo demonstra:
- Criação de customers
- Validações em ação
- Operações de domínio
- Casos de erro
- Normalização automática 