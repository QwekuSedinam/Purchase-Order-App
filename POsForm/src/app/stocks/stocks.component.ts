import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { stockQuery } from './stock_Model';
import { IQuery } from './item_Model';


@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }
  formGroup: FormGroup = new FormGroup({});
  searchInput: FormControl = new FormControl();

  private searchTerms = new Subject<string>();

  showSuggestions: boolean = false;
  suggestions: IQuery[] = [];
  stock_Items: stockQuery[]=[];

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      searchInput: this.searchInput,
    });

  }

  onSubmit() {
    const searchValue = this.formGroup.get('searchInput')?.value;
    this.showSuggestions = false;
  
    if (searchValue) {
      this.searchItems(searchValue).subscribe(
        (res) => {
          this.stock_Items = res;
          // Handle the response from the Express server.
          console.log('Response from server:', this.stock_Items);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }

  onInput() {
    const searchValue = this.formGroup.get('searchInput')?.value;
    this.showSuggestions = true;
  
    if (searchValue) {
      this.suggest(searchValue).subscribe(
        (res) => {
          this.suggestions = res;
          // Handle the response from the Express server.
          console.log('Response from server:', this.suggestions);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else if (searchValue === '') {
      this.showSuggestions = false;
    }
    
  }

  onSuggestionClick(suggestion: string) {
    
      this.searchInput.setValue(suggestion);
    
    this.searchItems(suggestion).subscribe(
      (res) => {
        this.stock_Items = res;
        // Handle the response from the Express server.
        console.log('Response from server:', this.stock_Items);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    this.showSuggestions = false;
  }

  searchItems(searchValue: string): Observable<any> {
    return this.http.post('http://localhost:3000/stock', { searchValue }).pipe(
      map((res) => res)
    );
  }
  suggest(searchValue: string): Observable<any> {
    return this.http.post('http://localhost:3000/suggestion', { searchValue }).pipe(
      map((res) => res)
    );
  }


}
