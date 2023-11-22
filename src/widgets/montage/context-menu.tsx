import { InstanceList } from './instance-list';
import { Met } from '@hulu/met';

interface ContextMenuProps {
    open: boolean;
    inset: Record<string, any>;
    target: HTMLElement;
    editor: string;
    onOpenChange: (open: boolean) => void;
}

export const ContextMenu: FC<ContextMenuProps> = (props) => {
    const { open, target, editor, inset = {}, onOpenChange } = props;

    return (
        <Popover
            open={open}
            arrow={false}
            content={<InstanceList target={target} editor={editor} />}
            placement="rightTop"
            overlayInnerStyle={{ padding: 0 }}
            destroyTooltipOnHide={true}
            onOpenChange={onOpenChange}
            rootClassName="met-montage-ignore"
            data-met-montage-ignore
        >
            <Met w={1} h={1} bg={'transparent'} position="absolute" {...inset} />
        </Popover>
    );
};
