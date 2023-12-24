import { IDBPDatabase } from 'idb';

export declare interface Task {
    listName: string;
    content: string;

}

// Add a new task
export async function addTask(db: IDBPDatabase, listId: string, task: Task) {
    const tx = db.transaction('tasks', 'readwrite');
    const store = tx.objectStore('tasks');
    const result = await store.add({ listId, task });
    return tx.done;

}

// Get tasks for a specific list
export async function getTasksByListId(db: IDBPDatabase, listId: string) {
    const tx = db.transaction('tasks', 'readonly');
    const store = tx.objectStore('tasks');
    const index = store.index('listId');
    return index.getAll(listId);
}

// Update a task
export async function updateTask(db: IDBPDatabase, id: string, listId: string, task: Task) {
    const tx = db.transaction('tasks', 'readwrite');
    const store = tx.objectStore('tasks');
    await store.put({ id, listId, task });
    return tx.done;
}

// Delete a task
export async function deleteTask(db: IDBPDatabase, id: string) {
    const tx = db.transaction('tasks', 'readwrite');
    const store = tx.objectStore('tasks');
    await store.delete(id);
    return tx.done;
}
