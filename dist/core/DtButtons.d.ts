import { ButtonConfig, ConfigButtons } from 'datatables.net-dt';
declare class DtButtons {
    getDefaults(): (string | {
        text: string;
        action: (_: any, dt: any) => void;
    })[];
    parse(config: true | ConfigButtons | (string | ButtonConfig)[]): true | ConfigButtons | (string | ButtonConfig)[];
}
export default DtButtons;
