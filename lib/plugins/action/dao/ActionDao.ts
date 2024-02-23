interface ResponseWithUrl {
  url: string;
}

class ActionDao {
  public static async fetchUrl<T extends ResponseWithUrl>(
    url: string
  ): Promise<T> {
    try {
      const res = await fetch(url);
      const data: T = await res.json();

      return data;
    } catch (err) {
      throw err;
    }
  }
}

export default ActionDao;
