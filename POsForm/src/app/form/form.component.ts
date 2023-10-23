import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { POsQuery } from './POs_Model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({}); // Initialize the formGroup
  @ViewChild('myTable', { static: false }) myTable!: ElementRef;
  

  POs_Items: POsQuery[]=[];
  empty_array: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      searchInput: ['']
    });
  }

  onSubmit() {
    const searchValue = this.formGroup.get('searchInput')?.value;
  
    if (searchValue) {
      this.searchItems(searchValue).subscribe(
        (res) => {
          this.POs_Items = res;
          // Handle the response from the Express server.
          console.log('Response from server:', this.POs_Items);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }

    if(this.POs_Items.length===0){
      this.empty_array = false;
    }else
    this.empty_array = true;
  }

  searchItems(searchValue: string): Observable<any> {
    return this.http.post('http://localhost:3000/search', { searchValue }).pipe(
      map((res) => res)
    );
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.myTable.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Export the Excel file
    XLSX.writeFile(wb, 'table_data.xlsx');
  }
  
}
