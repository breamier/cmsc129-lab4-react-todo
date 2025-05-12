import { firestore as db } from "../config/firebase";
import { getDocs, getDoc, query, doc, collection, orderBy, serverTimestamp, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

export const getTodos = async() => {
    try{
        const snapshots = await getDocs(collection(db, "todos"));
        // const snapshots = await getDocs(collection(db, "todos"), orderBy("addedAt", "asc"));
        const todos = snapshots.docs.map((snapshot) => getSnapshotData(snapshot));

        return todos;

    } catch (error) {
        console.log(error)
    }
}

export const getTodosAsync = async(id) => {
    try{
        const todoDoc = doc(db, "todos", id);
        const snapshot = await getDoc(todoDoc);
        return getSnapshotData(snapshot);

    } catch (error){
        console.log(error)
    }
}

export const createTodoAsync = async (todo) => {
    try{
        const newTodo = {
            ...todo,
            addedAt: serverTimestamp(),
        };
        const todoDoc = doc(db, "todos", newTodo.id);
        await setDoc(doc(db, "todos", newTodo.id), newTodo);
        const snapshot = await getDoc(todoDoc);
        return getSnapshotData(snapshot);
    }catch (error){
        console.log(error)
    }
}

export const updateTodoAsync = async(toUpdate) => {
    try{
        const updated = {
            title: toUpdate.title,
            date: toUpdate.date,
            time: toUpdate.time,
            priority: toUpdate.priority,
            completed: toUpdate.completed
        };

        const todoDoc = doc(db, "todos", toUpdate.id);
        await updateDoc(todoDoc, updated);
        const snapshot = await getDoc(todoDoc);
        return getSnapshotData(snapshot);
    } catch (error){
        console.log(error);
    }
}

export const deleteTodoAsync = async (id) => {
    try{
        const todoDoc = doc(db, "todos", id);
        const res = await deleteDoc(todoDoc);
        return res;

    }catch (error){
        console.log(error)
    }
}

const getSnapshotData = (snapshot) => {
    if(!snapshot.exists) return undefined;
    const data = snapshot.data();
    return {
        ...data, addedAt: data.addedAt?.toDate().toDateString()
    }
}