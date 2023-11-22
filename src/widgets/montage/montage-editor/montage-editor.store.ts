import { Ruyi } from '@hulu/msc';
import { isNil, map } from '@hulu/mu';
import localforage from 'localforage';
import { selectorFamily } from 'recoil';

/**
 * Instance
 */
export const instanceState = atom<Record<string, any>>({
    key: 'montage/editor/instanceState',
    default: void 0
});

/**
 * 避免Refresh时, token 信息丢失
 */
export const previewTokenState = atom<number>({
    key: 'montage/editor/previewTokenState',
    default: void 0
});

/**
 * 预览样式
 */
export const previewStyleState = atom<string>({
    key: 'montage/editor/previewStyleState',
    default: ''
});

/**
 * 控制montage编辑器的状态
 */
export const openMEState = atom<boolean>({
    key: 'montage/editor/montageEditorOpenState',
    default: false
});

/**
 * Montage编辑器当前打开的页面
 */
export const currentFilePathMEState = atom<string>({
    key: 'montage/editor/montageEditorCurrentFilePathState',
    default: void 0
});

/**
 * 更新编辑器代码
 */
export const useSaveCode = () => {
    return useRecoilCallback(({ snapshot, refresh, set }) => async (content: string) => {
        const filePath = await snapshot.getPromise(currentFilePathMEState);
        const content$ = Ruyi('/montage/v1/content');
        const { data } = await content$.put({ content }, { filePath });
        refresh(codeMEStore(filePath));
        set(previewTokenState, Math.random());
        return data;
    });
};

/**
 * 获取文件名获取代码内容
 */
export const codeMEStore = selectorFamily({
    key: 'montage/editor/montageEditorCodeStore',
    get:
        (filePath?: string) =>
        async ({ get }) => {
            if (!filePath) return { content: '' };
            const content$ = Ruyi('/montage/v1/content');
            const { data } = await content$.get({ filePath });
            return data;
        }
});

/**
 * 通过instance文件，获取该文件的imports文件，方便文件编辑
 * 做为编辑器tabs文件
 */
export const tabItemsMEStore = selector<MetTabItemProps>({
    key: 'montage/editor/montageEditorTabItemsStore',
    get: async ({ get }) => {
        const { source } = get(instanceState);
        const { fileName: filePath } = source;
        const imports$ = Ruyi('/montage/v1/imports');
        const { data } = await imports$.get({ filePath });
        const { imports } = data;
        const key = `METabItemsStore:${filePath}`;

        if (isNil(imports)) return localforage.getItem<MetTabItemProps>(key);

        const items = [filePath, ...imports];
        const result = map(items, (key) => {
            const label = key.split('/').at(-1);
            return { key, label };
        });

        localforage.setItem(key, result);
        return result;
    }
});

/**
 * 编辑器主题样式配置
 */
export const themeMEState = atom<Record<string, any>>({
    key: 'montage/editor/montageEditorThemeState',
    default: { width: 1200, asideWidth: 350, openAside: true, openEditor: true },
    effects: [
        ({ onSet, setSelf }) => {
            onSet((value, oldValue) => {
                setSelf({ ...oldValue, ...value });
            });
        }
    ]
});
