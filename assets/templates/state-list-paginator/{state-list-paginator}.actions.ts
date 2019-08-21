import { IPaginate } from './{Name_dash}.model';

export class {Name_pascalized}Loading {
    static type = '[{Name_titlelized}] Set As Working';
  }
  
export class {Name_pascalized}Done {
    static type = '[{Name_titlelized}] Set As Done';
  }

export class {Name_pascalized}GetElements {
    static type = '[{Name_titlelized}] Get Elements';
    // parameters may aply
  }

export class {Name_pascalized}SetPage {
    static type = '[{Name_titlelized}] Set Page';
    constructor(public pagination: IPaginate) { }
  }

export class {Name_pascalized}ApplyFilter {
    static type = '[{Name_titlelized}] Apply Filter';
    constructor(public filter: IFilterRequest[]) { }
  }

export class {Name_pascalized}ClearFilter {
    static type = '[{Name_titlelized}] Clear Filter';
  }