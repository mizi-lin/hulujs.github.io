import { Ruyi } from '@hulu/msc';
import { isFalsy } from '@hulu/mu';

export const materialListParams = atom({
    key: 'ajax/materialListState/params',
    default: {}
});

export const materialListState = selector({
    key: 'ajax/materialListState',
    get: async ({ get }) => {
        const materialList$ = Ruyi('/montage/v1/materials');
        const params = get(materialListParams);
        const res = await materialList$.get(params);
        return res;
    }
});
