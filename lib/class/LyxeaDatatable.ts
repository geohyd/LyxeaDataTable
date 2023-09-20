import DataTable from "datatables.net";

class LyxeaDatatable {
  datatable;
  constructor(HTMLDivId: string) {
    console.log("init lyxea datatable");
    this.datatable = new DataTable(`${HTMLDivId}`);
  }
}

export default LyxeaDatatable;
