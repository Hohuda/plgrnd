type GetItemResult = string | object | number | boolean | null;
type SetItemValue = string | object | number | boolean;

class SecureLocalStorageMock {
  public store: Record<string, GetItemResult>;

  constructor() {
    this.store = {};
  }

  clear(): void {
    this.store = {};
  }

  getItem(key: string): GetItemResult {
    return this.store[key] || null;
  }

  setItem(key: string, value: SetItemValue): void {
    this.store[key] = value;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }
}

export const secureLocalStorageMock = new SecureLocalStorageMock();
