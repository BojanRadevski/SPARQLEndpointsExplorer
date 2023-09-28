import { Component, OnInit } from '@angular/core';
import { SparqlService } from 'src/app/services/sparql.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit {
  // showData: any;
  artistData: any;
  artistURI: any;
  showData: any = false;
  // artistData: any;
  visible: any;
  // artistURI: any;
  booksBindings: any;
  searchValue = '';

  constructor(private sparqlService: SparqlService) {}

  ngOnInit(): void {
    console.log('on init u cars');
  }

  onSearch(artistName: string) {
    this.showData = true;
    this.sparqlService.queryCarsByBrand(artistName).subscribe((data) => {
      this.booksBindings = data.results.bindings;
      console.log('results: ', data.results.bindings);
    });
  }

  reset() {
    console.log('reset table');
  }

  search(): void {
    this.visible = false;
    this.booksBindings = this.booksBindings.filter(
      (item: any) => item.name.indexOf(this.searchValue) !== -1
    );
  }
}
