import {atom, selector} from 'recoil';

export const countAtom = atom({
    key: 'countAtom',
    default: 0,
});

export const evenSelector = selector({
    key: 'evenSelector',
    get: ({get})=>{
        const count = get(countAtom);
        return count % 2;
    }
});

// export const todosSelector = selector({
//     key: 'todosSelector',
//     get: ({get})=>{
//         const todos = get(todosAtom);
//         const filter = get(filterAtom);
//         return todos.filter(todo => todo.title.includes(filter) || todo.description.includes(filter));
//     }
// });