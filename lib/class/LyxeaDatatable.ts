import DataTable from "datatables.net";

class LyxeaDatatable {
  datatable;
  constructor(HTMLDivId: string) {
    this.datatable = new DataTable(`${HTMLDivId}`);
  }
}

export default LyxeaDatatable;
