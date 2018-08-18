import { Component, OnChanges, Input } from '@angular/core';
import { IQueryData } from '../table/table.component';

@Component({
    selector: 'app-query-form',
    templateUrl: 'query-form.component.html'
})
export class QueryFormComponent {
    qs!: string;

    @Input()
    submit: (data: IQueryData) => void;

    onSubmit(formValue: IQueryData) {
        this.submit(formValue);
    }

    getQuery() {
        this.qs = 'testing';
    }
}
