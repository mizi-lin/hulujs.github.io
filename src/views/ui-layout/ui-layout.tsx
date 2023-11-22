import { FC, PropsWithChildren, CSSProperties, LegacyRef, Children, cloneElement } from 'react';
import { Met, MetBox, MetFlex, MetGene, MetRow } from '@hulu/met';
import { mergeRefs } from 'react-merge-refs';

export interface UiLayoutProps extends PropsWithChildren {
    style?: CSSProperties;
    className?: string;
}

const MetBlockExample: FC<Record<string, any>> = (props) => {
    const [placement, setPlacement] = useState('top');
    const [vertical, setVertical] = useState(true);
    const [gap, setGap] = useState(2);

    return (
        <MetBox {...props}>
            <Met fs={16}>
                MetBlock
            </Met>
            <MetFlex gap={8} placement={'left'}>
                <Radio.Group value={vertical} onChange={(e) => setVertical(e.target.value)}>
                    <Radio value={false}>horizontal</Radio>
                    <Radio value={true}>vertical</Radio>
                </Radio.Group>
                <Select
                    placeholder="placement"
                    value={placement}
                    onChange={setPlacement}
                    style={{ width: 200 }}
                    options={[
                        { value: 'top', label: 'top' },
                        { value: 'bottom', label: 'bottom' }
                    ]}
                />

                <InputNumber value={gap} onChange={setGap} />
            </MetFlex>
            <MetBox
                mt={8}
                p={8}
                h={300}
                border={'1px solid #dedede'}
                gap={gap}
                placement={placement}
                vertical={vertical}
            >
                <Met bg={'yellowgreen'} flex={1}>
                    header
                </Met>
                <Met bg={'chartreuse'} flex={2}>
                    Main
                </Met>
                <Met bg={'gray'}>Footer</Met>
            </MetBox>
        </MetBox>
    );
};

const MetRowExample: FC<Record<string, any>> = (props) => {
    const [placement, setPlacement] = useState('left');
    const [vertical, setVertical] = useState(false);
    const [gap, setGap] = useState(2);

    return (
        <MetBox {...props}>
            <Met fs={16}>MetRow</Met>
            <MetFlex gap={8} placement={'left'}>
                <Radio.Group value={vertical} onChange={(e) => setVertical(e.target.value)}>
                    <Radio value={false}>horizontal</Radio>
                    <Radio value={true}>vertical</Radio>
                </Radio.Group>
                <Select
                    placeholder="placement"
                    value={placement}
                    onChange={setPlacement}
                    style={{ width: 200 }}
                    options={[
                        { value: 'left', label: 'left' },
                        { value: 'right', label: 'right' }
                    ]}
                />

                <InputNumber value={gap} onChange={setGap} />
            </MetFlex>
            <MetRow
                mt={8}
                p={8}
                h={300}
                border={'1px solid #dedede'}
                gap={gap}
                placement={placement}
                vertical={vertical}
            >
                <Met bg={'yellowgreen'}>slide</Met>
                <Met bg={'chartreuse'}>Main</Met>
                <Met bg={'gray'}>aside</Met>
            </MetRow>
        </MetBox>
    );
};

const MetFlexExample: FC<Record<string, any>> = (props) => {
    const [placement, setPlacement] = useState('left');
    const [vertical, setVertical] = useState(false);
    const [gap, setGap] = useState(2);

    return (
        <MetBox {...props}>
            <Met fs={16}>MetFlex 123</Met>
            <MetFlex gap={8} placement={'left'}>
                <Radio.Group value={vertical} onChange={(e) => setVertical(e.target.value)}>
                    <Radio value={false}>horizontal</Radio>
                    <Radio value={true}>vertical</Radio>
                </Radio.Group>
                <Select
                    placeholder="placement"
                    value={placement}
                    onChange={setPlacement}
                    style={{ width: 200 }}
                    options={[
                        { value: 'top', label: 'top' },
                        { value: 'left', label: 'left' },
                        { value: 'right', label: 'right' },
                        { value: 'bottom', label: 'bottom' },
                        { value: 'topLeft', label: 'topLeft' },
                        { value: 'topRight', label: 'topRight' },
                        { value: 'bottomLeft', label: 'bottomLeft' },
                        { value: 'bottomRight', label: 'bottomRight' },
                        { value: 'leftTop', label: 'leftTop' },
                        { value: 'leftBottom', label: 'leftBottom' },
                        { value: 'rightTop', label: 'rightTop' },
                        { value: 'rightBottom', label: 'rightBottom' },
                        { value: 'center', label: 'center' },
                        { value: 'betweenTop', label: 'betweenTop' },
                        { value: 'betweenMiddle', label: 'betweenMiddle' },
                        { value: 'betweenBottom', label: 'betweenBottom' }
                    ]}
                />

                <InputNumber value={gap} onChange={setGap} />
            </MetFlex>
            <MetFlex
                mt={8}
                p={8}
                h={300}
                border={'1px solid #dedede'}
                gap={gap}
                placement={placement}
                vertical={vertical}
            >
                <Button type="primary">Primary</Button>
                <Button type="primary">Primary</Button>
                <Button type="primary">Primary</Button>
                <Button type="primary">Primary</Button>
            </MetFlex>
        </MetBox>
    );
};

const UiLayout: FC<UiLayoutProps> = (props) => {
    return (
        <MetBox p={16} gap={16} fill scroll>
            <MetFlexExample />
            <MetBlockExample />
            <MetRowExample />
        </MetBox>
    );
};

export default UiLayout;
