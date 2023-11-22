import { uniqBy } from 'lodash-es';
import type { FiberSource } from './get-path-to-source';
import { DefaultValue } from 'recoil';

export enum MontageState {
    IDLE = 'IDLE',
    HOVER = 'HOVER',
    SELECT = 'SELECT',
    CONTEXT_MENU = 'CONTEXT_MENU',
    MONTAGE_EDITOR = 'MONTAGE_EDITOR'
}

/**
 * montage 全局状态
 */
export const montageState = atom<MontageState>({
    key: 'montage/montageState',
    default: MontageState.IDLE
});

/**
 * fiber source 路径信息
 */
export const currentFiberSourceState = atom<Partial<FiberSource>>({
    key: 'montage/currentFiberSourceState',
    default: {
        fileName: '/Users/Mizi/works/hulu/demo28/src/views/todos/todos.tsx'
    }
});

/**
 * storage fiber instance list
 * map.key = baseName:lineNumber:columnNumber
 */
export const fiberInstancesState = atom<Record<string, any>[]>({
    key: 'montage/fiberInstancesState',
    default: [],
    effects: [
        ({ onSet, setSelf }) => {
            onSet((newValue, oldValue) => {
                const value = [...newValue, ...(oldValue instanceof DefaultValue ? [] : oldValue ?? [])];
                const value$ = uniqBy(value, 'key');
                setSelf(value$);
            });
        }
    ]
});
