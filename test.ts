// types.ts

// --- Decorator Utilities ---
function LogClass(constructor: Function) {
  console.log(`Class decorated: ${constructor.name}`);
}

function LogMethod(
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args);
    return originalMethod.apply(this, args);
  };
}

// --- Interface ---
interface User {
  id: number;
  name: string;
  email?: string;
}

// --- Type Alias ---
type Status = 'active' | 'inactive' | 'pending';

// --- Arrow Function ---
const greetUser = (user: User): string => {
  return `Hello, ${user.name}!`;
};

// --- Named Function ---
function calculateArea(width: number, height: number): number {
  return width * height;
}

// --- Async Named Function ---
async function fetchUser(id: number): Promise<User> {
  // Simulated async call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: 'John Doe' });
    }, 1000);
  });
}

// --- Class with Decorators, Async Methods, and Static Methods ---
@LogClass
export class Account {
  private balance: number;

  constructor(public user: User, initialBalance: number = 0) {
    this.balance = initialBalance;
  }

  @LogMethod
  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.balance += amount;
  }

  @LogMethod
  withdraw(amount: number): boolean {
    if (amount > this.balance) return false;
    this.balance -= amount;
    return true;
  }

  getBalance(): number {
    return this.balance;
  }

  async syncWithBank(): Promise<string> {
    // Fake delay
    await new Promise((r) => setTimeout(r, 500));
    return `Balance synced for ${this.user.name}`;
  }

  static isValidUser(user: User): boolean {
    return user.id > 0 && !!user.name;
  }
}

// --- Exported Function ---
export function createAccount(user: User, initialBalance: number = 0): Account {
  return new Account(user, initialBalance);
}

// --- Default Exported Async Function ---
export default async function getStatus(): Promise<Status> {
  await new Promise((r) => setTimeout(r, 200));
  return 'active';
}
