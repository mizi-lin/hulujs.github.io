import { MetRuyi } from '@hulu/met';
import type { ModalProps } from 'antd';
import { materialListState } from './store';
import { MaterialList } from './material-list';
import { InsertCodeExport } from '../monaco-editor/monaco-editor';

interface MaterialsProps extends ModalProps {
    onExport?: (content: InsertCodeExport) => void;
    onInstall?: (content: string) => void;
}

const Materials: FC<MaterialsProps> = (props) => {
    const { onExport, onInstall } = props;
    return (
        <Modal open={false} title="物料市场" width={1300} footer={<></>} {...props}>
            <MetRuyi selector={materialListState}>
                <MaterialList onExport={onExport} onInstall={onInstall} />
            </MetRuyi>
        </Modal>
    );
};

export default Materials;
