import { IPersistentStorage } from "@entities/persistentStorage/IPersistentStorage";
import { LocalStorageImpl } from "@entities/persistentStorage/localStorage/persistentStorageImpl";

//Factory method pattern
export function makePersistentStorage(): IPersistentStorage {

  const persistentStorage: IPersistentStorage = new LocalStorageImpl();

  return persistentStorage;
}