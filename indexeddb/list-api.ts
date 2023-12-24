import { IDBPDatabase, } from 'idb';

export declare interface List {
    name: string;
    content: string;

}
// create new list 
export function addList(db: IDBPDatabase<unknown>, list: List) {


    const tx = db.transaction('Lists', 'readwrite');
    const store = tx.objectStore('Lists');

    store.add(list).then(function () {
        console.log('Added item to the list store!');
    });

    return tx.done;

}

// Get a specific list
export async function getList(db: IDBPDatabase<unknown>, listId: string) {
    const tx = db.transaction('lists', 'readonly');
    const store = tx.objectStore('lists');
    return store.get(listId);
}

// Delete a list
export async function deleteList(db: IDBPDatabase<unknown>, listId: string) {
    const tx = db.transaction(['lists', 'tasks'], 'readwrite');
    const listStore = tx.objectStore('lists');
    const taskStore = tx.objectStore('tasks');

    // Delete the list
    await listStore.delete(listId);

    //  delete all tasks associated with this list
    const tasksToDelete = await taskStore.index('listId').getAllKeys(listId);
    await Promise.all(tasksToDelete.map(key => taskStore.delete(key)));

    await tx.done;
}

