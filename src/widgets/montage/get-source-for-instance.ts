import { Fiber } from 'react-reconciler';

export function getSourceForInstance(fiber: Fiber) {
    const { _debugSource } = fiber;
    if (!_debugSource) return;
    const {
        // It _does_ exist!
        // @ts-ignore Property 'columnNumber' does not exist on type 'Source'.ts(2339)
        columnNumber = 1,
        fileName,
        lineNumber = 1
    } = _debugSource;

    return { columnNumber, fileName, lineNumber };
}
