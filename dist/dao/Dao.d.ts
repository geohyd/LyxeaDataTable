import State from '../utils/State';
export type DaoState<T> = {
  loading: boolean;
  data: Array<T> | null;
  error: Error | null;
};
declare class Dao<T> {
  state: State<DaoState<T>>;
  constructor();
  fetchData(url: string | undefined): Promise<DaoState<T>>;
}
export default Dao;
