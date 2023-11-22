import { atomFamily } from 'recoil';

/**
 * 缓存代码
 */
export const tempCodeState = atomFamily<string, string>({
    key: 'tempCodeState',
    default: void 0
});

/**
 * 获取当前编辑器内容
 */
export const useGetEditorContent = (selector: RecoilValue<any>) => {
    const { state, contents } = useRecoilValueLoadable(selector);
    return useRecoilCallback(({ snapshot, set }) => () => {});
};
