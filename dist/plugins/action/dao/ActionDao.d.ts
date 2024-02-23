interface ResponseWithUrl {
    url: string;
}
declare class ActionDao {
    static fetchUrl<T extends ResponseWithUrl>(url: string): Promise<T>;
}
export default ActionDao;
