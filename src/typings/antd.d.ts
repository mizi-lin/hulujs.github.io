/**
 * antd more type
 */
import { TabPaneProps } from 'antd';

declare global {
    interface MetTabItemProps extends Omit<TabPaneProps, 'tab'> {
        key: string;
        label: ReactNode;
    }
}
