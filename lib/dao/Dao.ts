import State from '../utils/State';
import DaoError from './DaoError';

export type DaoState<T> = {
  loading: boolean;
  data: Array<T> | null;
  error: Error | null;
};

class Dao<T> {
  state: State<DaoState<T>>;

  constructor() {
    this.state = new State<DaoState<T>>({
      loading: false,
      error: null,
      data: null,
    });
  }

  public async fetchData(url: string | undefined): Promise<DaoState<T>> {
    if (!url) throw new DaoError('you must provide data or an URL');

    this.state.setState((state) => {
      state.loading = false;
      return state;
    });
    try {
      if (!url) throw new Error('Error : Url is not defined');

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        this.state.setState((state) => {
          state.data = data;
          return state;
        });
      } else {
        this.state.setState((state) => {
          state.error = new Error(
            `Error during fetch => Status : ${res.status}`
          );
          return state;
        });
      }
    } catch (err: any) {
      if (process.env.NODE_ENV !== 'test') console.error(err);
      this.state.setState((state) => {
        state.error = err;
        return state;
      });
    } finally {
      this.state.setState((state) => {
        state.loading = false;
        return state;
      });
      const state = this.state.getState();
      return state;
    }
  }
}

export default Dao;
