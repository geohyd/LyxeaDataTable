export type LyxeaDataTableConfigObject = {
  HTMLDivId: string;
  global: IGlobalConfig;
  dataSource: DatasourceConfig;
  header: LyxeaDatatableConfigHeaders;
  dataTransformer?: LyxeaDatatableTransformer | LyxeaDatatableCustomTransformer;
  actions?: LyxeaDatatableActions | LyxeaDatatableCustomActions;
  exporter?: LyxeaDatatableExporter;
};
interface IGlobalConfig {
  select: {
    active: boolean;
    multiple: boolean;
  };
  fullSearch: boolean;
  columnSearch: boolean;
  order: boolean;
}
type DatasourceConfig = Array<any> | string;
interface LyxeaDatatableConfigHeaders {}
type LyxeaDatatableCustomTransformer = <E>(data: E) => E;
type LyxeaDatatableCustomActions = <E>(data: E) => E;
interface LyxeaDatatableExporter {
  copy: {
    active: boolean;
  };
}
export {};
