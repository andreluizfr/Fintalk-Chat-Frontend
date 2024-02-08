//Bridge pattern
export interface IPersistentStorage {
  get<T>(key: string): T | null;
  set(key: string, value: any): void;
  remove(key: string): void;
  clearAll(): void;
}