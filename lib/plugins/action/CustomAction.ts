import { ActionArgs } from './Action';
import ActionDao from './dao/ActionDao';

export type CustomActionDef = {
  name: string;
  effect: (rowData: any) => void;
};

class CustomAction {
  customActions: Array<CustomActionDef>;
  constructor(
    action: ActionArgs,
    parsingUrl: (url: string, rowData: { [key: string]: any }) => string
  ) {
    this.customActions = [
      {
        name: 'FOLLOW_URL_REDIRECT',
        effect: async (rowData: any) => {
          if (!action.url) throw new Error('URL is not defined');
          try {
            const parsedUrl = parsingUrl(action.url, rowData);
            const redirectUrl = await ActionDao.fetchUrl(parsedUrl);
            if (redirectUrl.url)
              window.open(redirectUrl.url, action.blank ? '_blank' : '_self');
          } catch (err) {
            throw err;
          }
        },
      },
    ];
  }

  retrieve = (): Array<CustomActionDef> => this.customActions;
}

export default CustomAction;
