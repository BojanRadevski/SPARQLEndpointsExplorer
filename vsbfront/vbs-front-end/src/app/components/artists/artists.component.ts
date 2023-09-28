import { Component, OnInit } from '@angular/core';
import { SparqlService } from 'src/app/services/sparql.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
})
export class ArtistsComponent implements OnInit {
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
    console.log('on init u artists');
  }

  onSearch(artistName: string) {
    this.showData = true;
    this.sparqlService.queryArtistData(artistName).subscribe((data) => {
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
