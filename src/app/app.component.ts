import { Component, OnInit } from '@angular/core';
import { IQueryData } from './components/table/table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'deep-dynamics-assignment';

  // query = `((“bike” OR "bicycle" OR "velo") OR ("car" OR "automobile" OR “ride")) AND ("apartment" OR "condo" OR “flat”)`;
  query = '';

  data: IQueryData[] = [
      { keyword: 'bike', 'synonyms': 'bicycle, velo', group: 'transportation' },
      { keyword: 'car', 'synonyms': 'automobile, ride', group: 'transportation' },
      { keyword: 'apartment', 'synonyms': 'condo, flat', group: 'housing' },
  ];

  ngOnInit(): void {
   this.generateQuery();
  }

  groupBy(data: IQueryData[], predicate: (r: IQueryData) => string) {
    const out: { [s: string]: IQueryData[] } = {};
    data.forEach((item: IQueryData) => {
      const key = predicate(item);
      if (out[key]) {
        out[key].push(item);
      } else {
        out[key] = [item];
      }
    });
    return out;
  }

  handleQueryForm = (values: IQueryData) => {
    this.data = [
      ...this.data,
      values
    ];

    this.generateQuery();
  }

  removeRow = (idx: number) => {
    const arr = this.data;
    arr.splice(idx, 1);
    this.data = [...arr];
    this.generateQuery();
  }

  generateQuery() {

    const grouped = this.groupBy(this.data, (i) => i.group);

    this.query = '';

    Object.values(grouped)
      .forEach((group, idxGroup, arrGroup) => {
        // if there are more rows in a group, group with paranthesis
        if (group.length > 1) { this.query += '('; }

        group.forEach((queryData, index, arr2) => {
          const keyword = queryData.keyword;
          const synonyms = queryData.synonyms ?
            queryData.synonyms.split(',').join('" OR "')
            : [];

          if (synonyms.length > 1) {
            this.query += `("${keyword}" OR "${synonyms}")`;
          } else {
            this.query += `"${keyword}" `;
          }

          if (group.length > 1 && index !== (arr2.length - 1)) {
            this.query += ' OR ';
          }
        });

        // end group
        if (group.length > 1) {
          this.query += ')';
        }
        // if there are more groups add AND
        if (arrGroup.length > 1 && idxGroup !== (arrGroup.length - 1)) {
           this.query += ' AND ';
        }
      });
  }
}
