import { Component, Input } from '@angular/core';


export interface IQueryData {

    keyword: string;
    synonyms: string;
    group: string;
}


@Component({
    selector: 'app-query-table',
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.css']
})
export class QueryTableComponent {
    columns = ['keyword', 'synonyms', 'group', 'actions'];

    @Input()
    data: IQueryData[] ;


    @Input()
    handleRemove: (idx: number) => void;

    addRow() {
        console.log('addRow');
    }

    deleteRow(elem: number) {
        this.handleRemove(elem);
    }
}
