import { Met } from '@hulu/met';
import { codeMEStore, currentFilePathMEState } from './montage-editor.store';
import { tempCodeState } from '@/widgets/monaco-editor/monaco.store';
import { isNil } from 'lodash-es';

/**
 * @todo 本地修改引起content内容变化
 */
interface ModifyPointProps {
    filePath: string;
}
export const ModifyPoint: FC<ModifyPointProps> = ({ filePath }) => {
    const [temp, setTemp] = useRecoilState(tempCodeState(filePath));
    const { content } = useRecoilValue(codeMEStore(filePath));

    if (isNil(temp)) return <></>;
    if (content === temp) return <></>;

    return <Met ml={8} w={8} h={8} bg={'rgb(200, 200, 200)'} br={'50%'} display="inline-block" />;
};
