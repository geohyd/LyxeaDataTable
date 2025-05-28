import { ButtonConfig, ConfigButtons } from 'datatables.net-dt';
declare class DtButtons {
    getDefaults(): (string | {
        extend: string;
        exportOptions: {
            orthogonal: string;
        };
        text?: undefined;
        action?: undefined;
    } | {
        text: string;
        action: (_: any, dt: any) => void;
        extend?: undefined;
        exportOptions?: undefined;
    })[];
    parse(config: true | ConfigButtons | (string | ButtonConfig)[]): true | ConfigButtons | (string | ButtonConfig)[];
}
export default DtButtons;
