import DataTable from "datatables.net";

class LyxeaDatatable {
  datable;
  constructor(HTMLDivId: string) {
    this.datable = new DataTable(`${HTMLDivId}`);
  }
}

export default LyxeaDatatable;
