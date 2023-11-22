import { Met, MetBox, MetFlex } from '@hulu/met';
import huluImg from './assets/hulu.png';
import img1 from './assets/城市级别-2023-06-19.png';
import img2 from './assets/年龄分布-2023-06-19.png';
import img3 from './assets/1111.png';
import img4 from './assets/性别分布-2023-06-19.png';
import { random } from 'lodash-es';
import { InsertCodeExport } from '../monaco-editor/monaco-editor';

interface MaterialItemProps {
    item: Record<string, any>;
    radius: number;
    onExport?: (content: InsertCodeExport) => void;
    onInstall?: (content: string) => void;
}
export const MaterialItem: FC<MaterialItemProps> = (props) => {
    const { item, radius, onExport, onInstall } = props;
    const [showDesc, setShowDesc] = useState(false);
    return (
        <MetBox
            alt="Material Item Box"
            key={item.id}
            br={radius}
            gap={radius}
            border={`1px solid ${showDesc ? 'lightskyblue' : 'rgba(161,166,179,.2)'}`}
            bg={showDesc ? 'lightskyblue' : 'rgba(161,166,179,.2)'}
            boxShadow={`0 2px 8px 0 ${showDesc ? 'lightskyblue' : 'rgba(161,166,179,.2)'}`}
            transition="all .2s"
            overflowY="hidden"
            cursor="pointer"
            p={showDesc ? 2 : 0}
            pb={8}
            onMouseOver={() => setShowDesc(true)}
            onMouseOut={() => setShowDesc(false)}
        >
            <Met
                alt="Material thumbail"
                flex={1}
                br={radius}
                bg={`#fafafa url(${[huluImg, img1, img2, img3, img4][random(0, 4)]}) no-repeat center center / contain`}
            >
                {/* <img src={huluImg} style={{ height: '100%' }} /> */}
            </Met>
            <Met alt="Material title" pl={8} h={24} fs={17} fw={500} transition="all 3s">
                {item.name}
            </Met>
            <Met
                alt="Material description"
                pl={8}
                pr={8}
                transition="all .3s"
                h={showDesc ? 'auto' : 0}
                lh={showDesc ? 1.5 : 0}
                opacity={showDesc ? 1 : 0}
            >
                {item.package?.description}
            </Met>
            <MetFlex alt="Material info" pl={8} pr={8} h={24} color="#777" placement={'betweenMiddle'}>
                <Met>{dayjs(item.package.updateTime).format('YYYY-MM-DD')}</Met>
                <Avatar.Group>
                    {item.package.authors?.map?.((name: string) => {
                        return <Avatar size={'small'}>{name.substring(0, 1)}</Avatar>;
                    })}
                </Avatar.Group>
            </MetFlex>
            <Met p={'0 16px 8px'} none={!showDesc}>
                <Button type="primary" shape={'round'} block>
                    查看详情
                </Button>

                <MetFlex mt={8} gap={8}>
                    <Met tag={Fragment} flex={1}>
                        <Button
                            shape={'round'}
                            onClick={() => {
                                onExport?.(item.package.export);
                            }}
                        >
                            导入物料
                        </Button>
                        <Button shape={'round'}>安装物料</Button>
                    </Met>
                </MetFlex>
            </Met>
        </MetBox>
    );
};
