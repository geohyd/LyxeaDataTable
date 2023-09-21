export type LyxeaDataTableConfigObject = {
  global: IGlobalConfig;
  dataSource: DatasourceConfig;
  dataTransformer: LyxeaDatatableTransformer | LyxeaDatatableCustomTransformer;
  header: LyxeaDatatableConfigHeaders;
  actions: LyxeaDatatableActions | LyxeaDatatableCustomActions;
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

/* const cats = <const>["crocus", "felix"];
type CatNames = typeof cats[number];
type CatInfo = Record<CatNames, {
    taille: number
}>; */
