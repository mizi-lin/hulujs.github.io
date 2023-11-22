import path from 'node:path';
import { fileURLToPath } from 'node:url';
import AutoImport from 'unplugin-auto-import/vite';
import React from '@vitejs/plugin-react-swc';
import Inspect from 'vite-plugin-inspect';
import TsConfigPaths from 'vite-tsconfig-paths';

const antdIcons = [
    'StepBackwardOutlined',
    'StepForwardOutlined',
    'FastBackwardOutlined',
    'FastForwardOutlined',
    'ShrinkOutlined',
    'ArrowsAltOutlined',
    'DownOutlined',
    'UpOutlined',
    'LeftOutlined',
    'RightOutlined',
    'CaretUpOutlined',
    'CaretDownOutlined',
    'CaretLeftOutlined',
    'CaretRightOutlined',
    'UpCircleOutlined',
    'DownCircleOutlined',
    'LeftCircleOutlined',
    'RightCircleOutlined',
    'DoubleRightOutlined',
    'DoubleLeftOutlined',
    'VerticalLeftOutlined',
    'VerticalRightOutlined',
    'VerticalAlignTopOutlined',
    'VerticalAlignMiddleOutlined',
    'VerticalAlignBottomOutlined',
    'ForwardOutlined',
    'BackwardOutlined',
    'RollbackOutlined',
    'EnterOutlined',
    'RetweetOutlined',
    'SwapOutlined',
    'SwapLeftOutlined',
    'SwapRightOutlined',
    'ArrowUpOutlined',
    'ArrowDownOutlined',
    'ArrowLeftOutlined',
    'ArrowRightOutlined',
    'PlayCircleOutlined',
    'UpSquareOutlined',
    'DownSquareOutlined',
    'LeftSquareOutlined',
    'RightSquareOutlined',
    'LoginOutlined',
    'LogoutOutlined',
    'MenuFoldOutlined',
    'MenuUnfoldOutlined',
    'BorderBottomOutlined',
    'BorderHorizontalOutlined',
    'BorderInnerOutlined',
    'BorderOuterOutlined',
    'BorderLeftOutlined',
    'BorderRightOutlined',
    'BorderTopOutlined',
    'BorderVerticleOutlined',
    'PicCenterOutlined',
    'PicLeftOutlined',
    'PicRightOutlined',
    'RadiusBottomleftOutlined',
    'RadiusBottomrightOutlined',
    'RadiusUpleftOutlined',
    'RadiusUprightOutlined',
    'FullscreenOutlined',
    'FullscreenExitOutlined',
    'QuestionOutlined',
    'QuestionCircleOutlined',
    'PlusOutlined',
    'PlusCircleOutlined',
    'PauseOutlined',
    'PauseCircleOutlined',
    'MinusOutlined',
    'MinusCircleOutlined',
    'PlusSquareOutlined',
    'MinusSquareOutlined',
    'InfoOutlined',
    'InfoCircleOutlined',
    'ExclamationOutlined',
    'ExclamationCircleOutlined',
    'CloseOutlined',
    'CloseCircleOutlined',
    'CloseSquareOutlined',
    'CheckOutlined',
    'CheckCircleOutlined',
    'CheckSquareOutlined',
    'ClockCircleOutlined',
    'WarningOutlined',
    'IssuesCloseOutlined',
    'StopOutlined',
    'EditOutlined',
    'FormOutlined',
    'CopyOutlined',
    'ScissorOutlined',
    'DeleteOutlined',
    'SnippetsOutlined',
    'DiffOutlined',
    'HighlightOutlined',
    'AlignCenterOutlined',
    'AlignLeftOutlined',
    'AlignRightOutlined',
    'BgColorsOutlined',
    'BoldOutlined',
    'ItalicOutlined',
    'UnderlineOutlined',
    'StrikethroughOutlined',
    'RedoOutlined',
    'UndoOutlined',
    'ZoomInOutlined',
    'ZoomOutOutlined',
    'FontColorsOutlined',
    'FontSizeOutlined',
    'LineHeightOutlined',
    'DashOutlined',
    'SmallDashOutlined',
    'SortAscendingOutlined',
    'SortDescendingOutlined',
    'DragOutlined',
    'OrderedListOutlined',
    'UnorderedListOutlined',
    'RadiusSettingOutlined',
    'ColumnWidthOutlined',
    'ColumnHeightOutlined',
    'AreaChartOutlined',
    'PieChartOutlined',
    'BarChartOutlined',
    'DotChartOutlined',
    'LineChartOutlined',
    'RadarChartOutlined',
    'HeatMapOutlined',
    'FallOutlined',
    'RiseOutlined',
    'StockOutlined',
    'BoxPlotOutlined',
    'FundOutlined',
    'SlidersOutlined',
    'AndroidOutlined',
    'AppleOutlined',
    'WindowsOutlined',
    'IeOutlined',
    'ChromeOutlined',
    'GithubOutlined',
    'AliwangwangOutlined',
    'DingdingOutlined',
    'WeiboSquareOutlined',
    'WeiboCircleOutlined',
    'TaobaoCircleOutlined',
    'Html5Outlined',
    'WeiboOutlined',
    'TwitterOutlined',
    'WechatOutlined',
    'YoutubeOutlined',
    'AlipayCircleOutlined',
    'TaobaoOutlined',
    'SkypeOutlined',
    'QqOutlined',
    'MediumWorkmarkOutlined',
    'GitlabOutlined',
    'MediumOutlined',
    'LinkedinOutlined',
    'GooglePlusOutlined',
    'DropboxOutlined',
    'FacebookOutlined',
    'CodepenOutlined',
    'CodeSandboxOutlined',
    'AmazonOutlined',
    'GoogleOutlined',
    'CodepenCircleOutlined',
    'AlipayOutlined',
    'AntDesignOutlined',
    'AntCloudOutlined',
    'AliyunOutlined',
    'ZhihuOutlined',
    'SlackOutlined',
    'SlackSquareOutlined',
    'BehanceOutlined',
    'BehanceSquareOutlined',
    'DribbbleOutlined',
    'DribbbleSquareOutlined',
    'InstagramOutlined',
    'YuqueOutlined',
    'AlibabaOutlined',
    'YahooOutlined',
    'RedditOutlined',
    'SketchOutlined',
    'AccountBookOutlined',
    'AimOutlined',
    'AlertOutlined',
    'ApartmentOutlined',
    'ApiOutlined',
    'AppstoreAddOutlined',
    'AppstoreOutlined',
    'AudioOutlined',
    'AudioMutedOutlined',
    'AuditOutlined',
    'BankOutlined',
    'BarcodeOutlined',
    'BarsOutlined',
    'BellOutlined',
    'BlockOutlined',
    'BookOutlined',
    'BorderOutlined',
    'BorderlessTableOutlined',
    'BranchesOutlined',
    'BugOutlined',
    'BuildOutlined',
    'BulbOutlined',
    'CalculatorOutlined',
    'CalendarOutlined',
    'CameraOutlined',
    'CarOutlined',
    'CarryOutOutlined',
    'CiCircleOutlined',
    'CiOutlined',
    'ClearOutlined',
    'CloudDownloadOutlined',
    'CloudOutlined',
    'CloudServerOutlined',
    'CloudSyncOutlined',
    'CloudUploadOutlined',
    'ClusterOutlined',
    'CodeOutlined',
    'CoffeeOutlined',
    'CommentOutlined',
    'CompassOutlined',
    'CompressOutlined',
    'ConsoleSqlOutlined',
    'ContactsOutlined',
    'ContainerOutlined',
    'ControlOutlined',
    'CopyrightOutlined',
    'CreditCardOutlined',
    'CrownOutlined',
    'CustomerServiceOutlined',
    'DashboardOutlined',
    'DatabaseOutlined',
    'DeleteColumnOutlined',
    'DeleteRowOutlined',
    'DeliveredProcedureOutlined',
    'DeploymentUnitOutlined',
    'DesktopOutlined',
    'DingtalkOutlined',
    'DisconnectOutlined',
    'DislikeOutlined',
    'DollarOutlined',
    'DownloadOutlined',
    'EllipsisOutlined',
    'EnvironmentOutlined',
    'EuroCircleOutlined',
    'EuroOutlined',
    'ExceptionOutlined',
    'ExpandAltOutlined',
    'ExpandOutlined',
    'ExperimentOutlined',
    'ExportOutlined',
    'EyeOutlined',
    'EyeInvisibleOutlined',
    'FieldBinaryOutlined',
    'FieldNumberOutlined',
    'FieldStringOutlined',
    'FieldTimeOutlined',
    'FileAddOutlined',
    'FileDoneOutlined',
    'FileExcelOutlined',
    'FileExclamationOutlined',
    'FileOutlined',
    'FileGifOutlined',
    'FileImageOutlined',
    'FileJpgOutlined',
    'FileMarkdownOutlined',
    'FilePdfOutlined',
    'FilePptOutlined',
    'FileProtectOutlined',
    'FileSearchOutlined',
    'FileSyncOutlined',
    'FileTextOutlined',
    'FileUnknownOutlined',
    'FileWordOutlined',
    'FileZipOutlined',
    'FilterOutlined',
    'FireOutlined',
    'FlagOutlined',
    'FolderAddOutlined',
    'FolderOutlined',
    'FolderOpenOutlined',
    'FolderViewOutlined',
    'ForkOutlined',
    'FormatPainterOutlined',
    'FrownOutlined',
    'FunctionOutlined',
    'FundProjectionScreenOutlined',
    'FundViewOutlined',
    'FunnelPlotOutlined',
    'GatewayOutlined',
    'GifOutlined',
    'GiftOutlined',
    'GlobalOutlined',
    'GoldOutlined',
    'GroupOutlined',
    'HddOutlined',
    'HeartOutlined',
    'HistoryOutlined',
    'HolderOutlined',
    'HomeOutlined',
    'HourglassOutlined',
    'IdcardOutlined',
    'ImportOutlined',
    'InboxOutlined',
    'InsertRowAboveOutlined',
    'InsertRowBelowOutlined',
    'InsertRowLeftOutlined',
    'InsertRowRightOutlined',
    'InsuranceOutlined',
    'InteractionOutlined',
    'KeyOutlined',
    'LaptopOutlined',
    'LayoutOutlined',
    'LikeOutlined',
    'LineOutlined',
    'LinkOutlined',
    'Loading3QuartersOutlined',
    'LoadingOutlined',
    'LockOutlined',
    'MacCommandOutlined',
    'MailOutlined',
    'ManOutlined',
    'MedicineBoxOutlined',
    'MehOutlined',
    'MenuOutlined',
    'MergeCellsOutlined',
    'MessageOutlined',
    'MobileOutlined',
    'MoneyCollectOutlined',
    'MonitorOutlined',
    'MoreOutlined',
    'NodeCollapseOutlined',
    'NodeExpandOutlined',
    'NodeIndexOutlined',
    'NotificationOutlined',
    'NumberOutlined',
    'OneToOneOutlined',
    'PaperClipOutlined',
    'PartitionOutlined',
    'PayCircleOutlined',
    'PercentageOutlined',
    'PhoneOutlined',
    'PictureOutlined',
    'PlaySquareOutlined',
    'PoundCircleOutlined',
    'PoundOutlined',
    'PoweroffOutlined',
    'PrinterOutlined',
    'ProfileOutlined',
    'ProjectOutlined',
    'PropertySafetyOutlined',
    'PullRequestOutlined',
    'PushpinOutlined',
    'QrcodeOutlined',
    'ReadOutlined',
    'ReconciliationOutlined',
    'RedEnvelopeOutlined',
    'ReloadOutlined',
    'RestOutlined',
    'RobotOutlined',
    'RocketOutlined',
    'RotateLeftOutlined',
    'RotateRightOutlined',
    'SafetyCertificateOutlined',
    'SafetyOutlined',
    'SaveOutlined',
    'ScanOutlined',
    'ScheduleOutlined',
    'SearchOutlined',
    'SecurityScanOutlined',
    'SelectOutlined',
    'SendOutlined',
    'SettingOutlined',
    'ShakeOutlined',
    'ShareAltOutlined',
    'ShopOutlined',
    'ShoppingCartOutlined',
    'ShoppingOutlined',
    'SisternodeOutlined',
    'SkinOutlined',
    'SmileOutlined',
    'SolutionOutlined',
    'SoundOutlined',
    'SplitCellsOutlined',
    'StarOutlined',
    'SubnodeOutlined',
    'SwitcherOutlined',
    'SyncOutlined',
    'TableOutlined',
    'TabletOutlined',
    'TagOutlined',
    'TagsOutlined',
    'TeamOutlined',
    'ThunderboltOutlined',
    'ToTopOutlined',
    'ToolOutlined',
    'TrademarkCircleOutlined',
    'TrademarkOutlined',
    'TransactionOutlined',
    'TranslationOutlined',
    'TrophyOutlined',
    'UngroupOutlined',
    'UnlockOutlined',
    'UploadOutlined',
    'UsbOutlined',
    'UserAddOutlined',
    'UserDeleteOutlined',
    'UserOutlined',
    'UserSwitchOutlined',
    'UsergroupAddOutlined',
    'UsergroupDeleteOutlined',
    'VerifiedOutlined',
    'VideoCameraAddOutlined',
    'VideoCameraOutlined',
    'WalletOutlined',
    'WhatsAppOutlined',
    'WifiOutlined',
    'WomanOutlined',
    'StepBackwardFilled',
    'StepForwardFilled',
    'FastBackwardFilled',
    'FastForwardFilled',
    'CaretUpFilled',
    'CaretDownFilled',
    'CaretLeftFilled',
    'CaretRightFilled',
    'UpCircleFilled',
    'DownCircleFilled',
    'LeftCircleFilled',
    'RightCircleFilled',
    'ForwardFilled',
    'BackwardFilled',
    'PlayCircleFilled',
    'UpSquareFilled',
    'DownSquareFilled',
    'LeftSquareFilled',
    'RightSquareFilled',
    'QuestionCircleFilled',
    'PlusCircleFilled',
    'PauseCircleFilled',
    'MinusCircleFilled',
    'PlusSquareFilled',
    'MinusSquareFilled',
    'InfoCircleFilled',
    'ExclamationCircleFilled',
    'CloseCircleFilled',
    'CloseSquareFilled',
    'CheckCircleFilled',
    'CheckSquareFilled',
    'ClockCircleFilled',
    'WarningFilled',
    'StopFilled',
    'EditFilled',
    'CopyFilled',
    'DeleteFilled',
    'SnippetsFilled',
    'DiffFilled',
    'HighlightFilled',
    'PieChartFilled',
    'BoxPlotFilled',
    'FundFilled',
    'SlidersFilled',
    'AndroidFilled',
    'AppleFilled',
    'WindowsFilled',
    'ChromeFilled',
    'GithubFilled',
    'AliwangwangFilled',
    'WeiboSquareFilled',
    'WeiboCircleFilled',
    'TaobaoCircleFilled',
    'Html5Filled',
    'WechatFilled',
    'YoutubeFilled',
    'AlipayCircleFilled',
    'SkypeFilled',
    'GitlabFilled',
    'LinkedinFilled',
    'FacebookFilled',
    'CodeSandboxCircleFilled',
    'CodepenCircleFilled',
    'SlackSquareFilled',
    'BehanceSquareFilled',
    'DribbbleSquareFilled',
    'InstagramFilled',
    'YuqueFilled',
    'YahooFilled',
    'AccountBookFilled',
    'AlertFilled',
    'AlipaySquareFilled',
    'AmazonCircleFilled',
    'AmazonSquareFilled',
    'ApiFilled',
    'AppstoreFilled',
    'AudioFilled',
    'BankFilled',
    'BehanceCircleFilled',
    'BellFilled',
    'BookFilled',
    'BugFilled',
    'BuildFilled',
    'BulbFilled',
    'CalculatorFilled',
    'CalendarFilled',
    'CameraFilled',
    'CarFilled',
    'CarryOutFilled',
    'CiCircleFilled',
    'CloudFilled',
    'CodeFilled',
    'CodeSandboxSquareFilled',
    'CodepenSquareFilled',
    'CompassFilled',
    'ContactsFilled',
    'ContainerFilled',
    'ControlFilled',
    'CreditCardFilled',
    'CrownFilled',
    'CustomerServiceFilled',
    'DashboardFilled',
    'DatabaseFilled',
    'DingtalkCircleFilled',
    'DingtalkSquareFilled',
    'DislikeFilled',
    'DribbbleCircleFilled',
    'DropboxCircleFilled',
    'DropboxSquareFilled',
    'EnvironmentFilled',
    'EuroCircleFilled',
    'ExperimentFilled',
    'EyeFilled',
    'EyeInvisibleFilled',
    'FileAddFilled',
    'FileExcelFilled',
    'FileExclamationFilled',
    'FileFilled',
    'FileImageFilled',
    'FileMarkdownFilled',
    'FilePdfFilled',
    'FilePptFilled',
    'FileTextFilled',
    'FileUnknownFilled',
    'FileWordFilled',
    'FileZipFilled',
    'FilterFilled',
    'FireFilled',
    'FlagFilled',
    'FolderAddFilled',
    'FolderFilled',
    'FolderOpenFilled',
    'FormatPainterFilled',
    'FrownFilled',
    'FunnelPlotFilled',
    'GiftFilled',
    'GoldFilled',
    'GoldenFilled',
    'GoogleCircleFilled',
    'GooglePlusCircleFilled',
    'GooglePlusSquareFilled',
    'GoogleSquareFilled',
    'HddFilled',
    'HeartFilled',
    'HomeFilled',
    'HourglassFilled',
    'IdcardFilled',
    'IeCircleFilled',
    'IeSquareFilled',
    'InsuranceFilled',
    'InteractionFilled',
    'LayoutFilled',
    'LikeFilled',
    'LockFilled',
    'MacCommandFilled',
    'MailFilled',
    'MedicineBoxFilled',
    'MediumCircleFilled',
    'MediumSquareFilled',
    'MehFilled',
    'MessageFilled',
    'MobileFilled',
    'MoneyCollectFilled',
    'NotificationFilled',
    'PayCircleFilled',
    'PhoneFilled',
    'PictureFilled',
    'PlaySquareFilled',
    'PoundCircleFilled',
    'PrinterFilled',
    'ProfileFilled',
    'ProjectFilled',
    'PropertySafetyFilled',
    'PushpinFilled',
    'QqCircleFilled',
    'QqSquareFilled',
    'ReadFilled',
    'ReconciliationFilled',
    'RedEnvelopeFilled',
    'RedditCircleFilled',
    'RedditSquareFilled',
    'RestFilled',
    'RobotFilled',
    'RocketFilled',
    'SafetyCertificateFilled',
    'SaveFilled',
    'ScheduleFilled',
    'SecurityScanFilled',
    'SettingFilled',
    'ShopFilled',
    'ShoppingFilled',
    'SignalFilled',
    'SketchCircleFilled',
    'SketchSquareFilled',
    'SkinFilled',
    'SlackCircleFilled',
    'SmileFilled',
    'SoundFilled',
    'StarFilled',
    'SwitcherFilled',
    'TabletFilled',
    'TagFilled',
    'TagsFilled',
    'TaobaoSquareFilled',
    'ThunderboltFilled',
    'ToolFilled',
    'TrademarkCircleFilled',
    'TrophyFilled',
    'TwitterCircleFilled',
    'TwitterSquareFilled',
    'UnlockFilled',
    'UsbFilled',
    'VideoCameraFilled',
    'WalletFilled',
    'ZhihuCircleFilled',
    'ZhihuSquareFilled',
    'UpCircleTwoTone',
    'DownCircleTwoTone',
    'LeftCircleTwoTone',
    'RightCircleTwoTone',
    'PlayCircleTwoTone',
    'UpSquareTwoTone',
    'DownSquareTwoTone',
    'LeftSquareTwoTone',
    'RightSquareTwoTone',
    'QuestionCircleTwoTone',
    'PlusCircleTwoTone',
    'PauseCircleTwoTone',
    'MinusCircleTwoTone',
    'PlusSquareTwoTone',
    'MinusSquareTwoTone',
    'InfoCircleTwoTone',
    'ExclamationCircleTwoTone',
    'CloseCircleTwoTone',
    'CloseSquareTwoTone',
    'CheckCircleTwoTone',
    'CheckSquareTwoTone',
    'ClockCircleTwoTone',
    'WarningTwoTone',
    'StopTwoTone',
    'EditTwoTone',
    'CopyTwoTone',
    'DeleteTwoTone',
    'SnippetsTwoTone',
    'DiffTwoTone',
    'HighlightTwoTone',
    'PieChartTwoTone',
    'BoxPlotTwoTone',
    'FundTwoTone',
    'SlidersTwoTone',
    'Html5TwoTone',
    'AccountBookTwoTone',
    'AlertTwoTone',
    'ApiTwoTone',
    'AppstoreTwoTone',
    'AudioTwoTone',
    'BankTwoTone',
    'BellTwoTone',
    'BookTwoTone',
    'BugTwoTone',
    'BuildTwoTone',
    'BulbTwoTone',
    'CalculatorTwoTone',
    'CalendarTwoTone',
    'CameraTwoTone',
    'CarTwoTone',
    'CarryOutTwoTone',
    'CiCircleTwoTone',
    'CiTwoTone',
    'CloudTwoTone',
    'CodeTwoTone',
    'CompassTwoTone',
    'ContactsTwoTone',
    'ContainerTwoTone',
    'ControlTwoTone',
    'CopyrightTwoTone',
    'CreditCardTwoTone',
    'CrownTwoTone',
    'CustomerServiceTwoTone',
    'DashboardTwoTone',
    'DatabaseTwoTone',
    'DislikeTwoTone',
    'DollarTwoTone',
    'EnvironmentTwoTone',
    'EuroCircleTwoTone',
    'EuroTwoTone',
    'ExperimentTwoTone',
    'EyeTwoTone',
    'EyeInvisibleTwoTone',
    'FileAddTwoTone',
    'FileExcelTwoTone',
    'FileExclamationTwoTone',
    'FileTwoTone',
    'FileImageTwoTone',
    'FileMarkdownTwoTone',
    'FilePdfTwoTone',
    'FilePptTwoTone',
    'FileTextTwoTone',
    'FileUnknownTwoTone',
    'FileWordTwoTone',
    'FileZipTwoTone',
    'FilterTwoTone',
    'FireTwoTone',
    'FlagTwoTone',
    'FolderAddTwoTone',
    'FolderTwoTone',
    'FolderOpenTwoTone',
    'FrownTwoTone',
    'FunnelPlotTwoTone',
    'GiftTwoTone',
    'GoldTwoTone',
    'HddTwoTone',
    'HeartTwoTone',
    'HomeTwoTone',
    'HourglassTwoTone',
    'IdcardTwoTone',
    'InsuranceTwoTone',
    'InteractionTwoTone',
    'LayoutTwoTone',
    'LikeTwoTone',
    'LockTwoTone',
    'MailTwoTone',
    'MedicineBoxTwoTone',
    'MehTwoTone',
    'MessageTwoTone',
    'MobileTwoTone',
    'MoneyCollectTwoTone',
    'NotificationTwoTone',
    'PhoneTwoTone',
    'PictureTwoTone',
    'PlaySquareTwoTone',
    'PoundCircleTwoTone',
    'PrinterTwoTone',
    'ProfileTwoTone',
    'ProjectTwoTone',
    'PropertySafetyTwoTone',
    'PushpinTwoTone',
    'ReconciliationTwoTone',
    'RedEnvelopeTwoTone',
    'RestTwoTone',
    'RocketTwoTone',
    'SafetyCertificateTwoTone',
    'SaveTwoTone',
    'ScheduleTwoTone',
    'SecurityScanTwoTone',
    'SettingTwoTone',
    'ShopTwoTone',
    'ShoppingTwoTone',
    'SkinTwoTone',
    'SmileTwoTone',
    'SoundTwoTone',
    'StarTwoTone',
    'SwitcherTwoTone',
    'TabletTwoTone',
    'TagTwoTone',
    'TagsTwoTone',
    'ThunderboltTwoTone',
    'ToolTwoTone',
    'TrademarkCircleTwoTone',
    'TrophyTwoTone',
    'UnlockTwoTone',
    'UsbTwoTone',
    'VideoCameraTwoTone',
    'WalletTwoTone',
    ['default', 'Icon']
];

const antdComponents = [
    'Affix',
    'Alert',
    'Anchor',
    'App',
    'Auto',
    'Avatar',
    'Back',
    'Badge',
    'Breadcrumb',
    'Button',
    'Calendar',
    'Card',
    'Carousel',
    'Cascader',
    'Checkbox',
    'Col',
    'Collapse',
    'Color',
    'Config',
    'Date',
    'Descriptions',
    'Divider',
    'Drawer',
    'Dropdown',
    'Empty',
    'Float',
    'Form',
    'Grid',
    'Image',
    'Input',
    'InputNumber',
    'Layout',
    'List',
    'Mentions',
    'Menu',
    'message',
    'Modal',
    'notification',
    'Pagination',
    'Popconfirm',
    'Popover',
    'Progress',
    'QRCode',
    'Radio',
    'Rate',
    'Result',
    'Row',
    'Segmented',
    'Select',
    'Skeleton',
    'Slider',
    'Space',
    'Spin',
    'Statistic',
    'Steps',
    'Switch',
    'Table',
    'Tabs',
    'Tag',
    'theme',
    'Time',
    'Timeline',
    'Tooltip',
    'Tour',
    'Transfer',
    'Tree',
    'Tree',
    'Typography',
    'Upload',
    'version',
    'Watermark'
];

const reactFunctions = [
    'Fragment',
    'Suspense',
    'createRef',
    'forwardRef',
    'lazy',
    'memo',
    'startTransition',
    'useCallback',
    'useContext',
    'useDebugValue',
    'useDeferredValue',
    'useEffect',
    'useLayoutEffect',
    'useMemo',
    'useId',
    'useInsertionEffect',
    'useRef',
    'useState',
    'useImperativeHandle',
    'useSyncExternalStore',
    'useTransition'
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    title: 'demo28',
    compiler: 'vite',
    plugins: [
        React(),
        Inspect(),
        TsConfigPaths(),
        AutoImport({
            dts: path.resolve(__dirname, '../src/typings/auto-imports.d.ts'),
            imports: [
                'recoil',
                'react-router-dom',
                {
                    '@ant-design/icons': antdIcons,
                    antd: antdComponents,
                    react: reactFunctions,
                    dayjs: [['default', 'dayjs']],
                    classnames: [['default', 'clx']]
                }
            ]
        })
    ],
    resolve: {
        alias: {
            '~ck': path.resolve(__dirname, '../hulu/.caokong/src'),
            '~ck/hulu': path.resolve(__dirname, '../hulu/.caokong/hulu'),
            '~ass': path.resolve(__dirname, '../hulu/.assists'),
            '~hulu': path.resolve(__dirname, '../hulu')
        }
    },
    server: {
        proxy: {
            '/montage': {
                /**
                 * @mark 若使用 localhost, 直接 node server 会报如下错误
                 * Error: connect ECONNREFUSED ::1:4555
                 * https://stackoverflow.com/questions/73843720/connect-econnrefused-127017
                 * // target: 'http://localhost:4555/api',
                 */
                target: 'http://127.0.0.1:4555',
                changeOrigin: true
            }
        }
    }
};

export default config;
