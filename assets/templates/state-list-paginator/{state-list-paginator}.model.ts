export interface IPaginate {
  pageIndex: number;
  pageSize: number;
}

export interface I{Name_pascalized}StateModel {
    working: boolean;
    records: any[];
    filtered: any[];
    fields: any[];
    page: any[];
  
  }