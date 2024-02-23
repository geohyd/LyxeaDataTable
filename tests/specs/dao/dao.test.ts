import Dao from '../../../lib/dao/Dao';

// Mock se traduit en anglais par "Mocking the fetch function to simulate HTTP requests
global.fetch = jest.fn();

describe('Dao', () => {
  let daoInstance: Dao<{ id: number; name: string }>;

  beforeEach(() => {
    daoInstance = new Dao();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    expect(daoInstance.state.getState().loading).toBe(false);
    expect(daoInstance.state.getState().error).toBeNull();
    expect(daoInstance.state.getState().data).toBeNull();
  });

  it('should fetch data successfully from a valid URL', async () => {
    const mockData = { id: 1, name: 'John Doe' };
    const mockResponse = {
      ok: true,
      // @ts-ignore
      json: jest.fn().mockResolvedValue(mockData),
    };
    // @ts-ignore
    global.fetch.mockResolvedValue(mockResponse);

    const url = 'http://lxdt.com/data';
    const daoState = await daoInstance.fetchData(url);

    expect(daoState.data).not.toBeNull();

    expect(daoInstance.state.getState().loading).toBe(false);
    expect(daoInstance.state.getState().error).toBeNull();
    expect(daoInstance.state.getState().data).toEqual(mockData);
  });

  it('should handle error when fetching data from an invalid URL', async () => {
    const mockResponse = { ok: false, status: 404 };
    // @ts-ignore
    global.fetch.mockResolvedValue(mockResponse);

    const url = 'http://lxdt.com/invalid';
    const daoState = await daoInstance.fetchData(url);

    expect(daoState.data).toBeNull();

    expect(daoInstance.state.getState().loading).toBe(false);
    // @ts-ignore
    expect(daoInstance.state.getState().error.message).toBe(
      'Error during fetch => Status : 404'
    );
    expect(daoInstance.state.getState().data).toBeNull();
  });

  it('should handle error when URL is not defined', async () => {
    try {
      const daoState = await daoInstance.fetchData(undefined);
      expect(daoState.data).toBeNull();

      expect(daoInstance.state.getState().loading).toBe(false);
      // @ts-ignore
      expect(daoInstance.state.getState().error.message).toBe(
        'Data Acquisition Error : you must provide data or an URL'
      );
      expect(daoInstance.state.getState().data).toBeNull();
    } catch (err: any) {
      expect(err.message).toBe(
        'Data Acquisition Error : you must provide data or an URL'
      );
    }
  });
});
