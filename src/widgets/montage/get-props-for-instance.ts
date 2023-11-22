import { Fiber } from 'react-reconciler';

export function getPropsForInstance(instance: Fiber) {
    /**
     * @type {Fiber['pendingProps']}
     */
    const props = {};

    Object.entries(instance.memoizedProps).forEach(([key, value]) => {
        const type = typeof value;

        // Ignore some values, even if they're scalar, because they're not unique enough
        if (['key'].includes(key) || value === instance.type.defaultProps?.[key]) {
            return;
        }

        // Scalar values
        if (
            ['string', 'number', 'boolean', 'symbol'].includes(type) ||
            value instanceof String ||
            value instanceof Number ||
            value instanceof Boolean ||
            value instanceof Symbol
        ) {
            // @ts-ignore
            props[key] = value;
        }
    });

    return props;
}
