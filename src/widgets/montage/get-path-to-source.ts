import type { Source } from 'react-reconciler';

export interface FiberSource extends Source {
    columnNumber: number;
}

/**
 * 获取源码的路径, 在代码中的行数
 * @param source 源码信息
 * @returns 源码路径
 */
export function getPathToSource(source: FiberSource) {
    const { columnNumber = 1, fileName, lineNumber = 1 } = source;
    return `${fileName}:${lineNumber}:${columnNumber}`;
}
