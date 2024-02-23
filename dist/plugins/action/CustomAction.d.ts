import { ActionArgs } from './Action';
export type CustomActionDef = {
  name: string;
  effect: (rowData: any) => void;
};
declare class CustomAction {
  customActions: Array<CustomActionDef>;
  constructor(
    action: ActionArgs,
    parsingUrl: (
      url: string,
      rowData: {
        [key: string]: any;
      }
    ) => string
  );
  retrieve: () => Array<CustomActionDef>;
}
export default CustomAction;
