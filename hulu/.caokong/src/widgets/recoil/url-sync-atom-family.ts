import {
    SerializableParam,
    atomFamily,
    selectorFamily,
    RecoilState,
    AtomFamilyOptions
} from 'recoil';

export function urlSyncAtomFamily<T extends SerializableParam, P extends SerializableParam>(
    options: Omit<AtomFamilyOptions<T, P>, 'default'>
): (param: P, initialValue: T) => RecoilState<T> {
    const baseAtom: (param: P) => RecoilState<T> = atomFamily<T, P>({
        ...options,
        default: undefined
    });

    const evaluationSelector = selectorFamily<T, { param: P; initialValue: T }>({
        key: `urlSync::${options.key}`,
        get:
            ({ param, initialValue }) =>
            ({ get }) =>
                get(baseAtom(param)) ?? initialValue,
        set:
            ({ param }) =>
            ({ set }, newValue) =>
                set(baseAtom(param), newValue)
    });

    return (param, initialValue) => {
        return evaluationSelector({ param, initialValue });
    };
}
