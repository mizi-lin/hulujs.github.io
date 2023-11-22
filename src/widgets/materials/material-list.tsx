import { MetGrid } from '@hulu/met';
import { MaterialItem } from './material-item';
import { InsertCodeExport } from '../monaco-editor/monaco-editor';

interface MaterialListProps {
    data?: Record<string, any>[];
    onExport?: (content: InsertCodeExport) => void;
    onInstall?: (content: string) => void;
}
export const MaterialList: FC<MaterialListProps> = ({ data = [], onExport, onInstall }) => {
    const radius = 8;
    return (
        <MetGrid gap={16} h={'calc(100vh - 240px)'} cols={3} rows={'360px'} br={radius} overflowY="auto">
            {data.map((item) => {
                return (
                    <MaterialItem
                        key={item.name}
                        item={item}
                        radius={radius}
                        onExport={onExport}
                        onInstall={onInstall}
                    />
                );
            })}
        </MetGrid>
    );
};
