import { run, rid } from '@hulu/mu';
import localforage from 'localforage';
import { allURLSyncState } from '~ck';
import { TodoItem, StateAction } from './todos';

const todoListGetState = selector({
    key: 'todo/todoListGetState',
    get: async () => {
        const data = await localforage.getItem<TodoItem[]>('todoList');
        return data ?? [];
    }
});

const todoListGetAtom = atom<TodoItem[]>({
    key: 'todo/todoListGetAtom',
    default: todoListGetState
});

export const todoListState = selector<TodoItem[]>({
    key: 'todo/todoListState',
    get: ({ get }) => {
        const data = get(todoListGetAtom);
        const { status } = get(allURLSyncState)['params'];
        return status ? data?.filter((item) => item.status === status) : data;
    },

    set: ({ set, get }, values: Record<string, any>) => {
        const action = values[0] as unknown as StateAction;
        const data = get(todoListGetAtom);
        let data$: TodoItem[] = [];

        run(action['add'], (title: string) => {
            data$ = [{ id: rid(), title, status: 'active' }, ...data];
        });

        run(action['delete'], (id: string) => {
            data$ = data.filter((item) => item.id === id);
        });

        run(action['update'], (record: TodoItem) => {
            const inx = data.findIndex((item) => item.id === record.id);
            data$ = data.toSpliced(inx, 1, record);
        });

        localforage.setItem('todoList', data$);
        set(todoListGetAtom, data$);
    }
});
