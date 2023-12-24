import { openDB, type IDBPDatabase } from 'idb';


export async function openDb(): Promise<IDBPDatabase<unknown>> {

    const db = await openDB("Reallist", 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('List')) {
                console.log("created List object store")
                const listStore = db.createObjectStore('List', { keyPath: 'id', autoIncrement: true });
            }
            if (!db.objectStoreNames.contains('Task')) {
                console.log("created Task object store")
                const taskStore = db.createObjectStore('Task', { keyPath: 'id', autoIncrement: true });
                taskStore.createIndex('listId', 'listId', { unique: false })
            }


        }

    });

    return db;
}


