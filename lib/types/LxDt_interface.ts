import LyxeaDatatable from '@core/LyxeaDatatable';

export interface ILyxeaDatatable<T> {
  init(): Promise<LyxeaDatatable<T>>;
}
