import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SparqlService } from 'src/app/services/sparql.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  artistData: any;
  showData: any = false;
  show: any = true;
  showArtists: any = false;
  showMovies: any = false;
  showCities: any = false;
  showCountries: any = false;
  showBooks: any = false;
  showCars: any = false;

  constructor(private sparqlService: SparqlService, private router: Router) {}

  ngOnInit(): void {
    console.log('ng on init in home');
    this.showData = false;
    this.show = true;
    this.showArtists = false;
  }

  onSearch(artistName: string) {
    this.showData = true;
    this.sparqlService.queryArtistData(artistName).subscribe((data) => {
      console.log('data', data);
      const descriptionValue = data.results.bindings[0].description.value;
      console.log('Description:', descriptionValue);
      this.artistData = data.results.bindings;
    });
  }
  openMovies() {
    console.log('open books');

    this.show = false;

    this.showArtists = false;
    this.showBooks = true;
    this.showCars = false;
    this.showCities = false;
    this.showCountries = false;
    this.router.navigateByUrl('/books');
  }
  openArtists() {
    console.log('open artists');

    this.show = false;
    this.showArtists = true;
    this.showBooks = false;
    this.showCars = false;
    this.showCities = false;
    this.showCountries = false;
    this.router.navigateByUrl('/artists');
  }
  openCars() {
    console.log('open cars');

    this.show = false;
    this.showArtists = false;
    this.showBooks = false;
    this.showCars = true;
    this.showCities = false;
    this.showCountries = false;
    this.router.navigateByUrl('/cars');
  }
  openCitis() {
    console.log('open cities');

    this.show = false;
    this.showArtists = false;
    this.showBooks = false;
    this.showCars = false;
    this.showCities = true;
    this.showCountries = false;
    this.router.navigateByUrl('/cities');
  }
  openCountries() {
    console.log('open countries');

    this.show = false;
    this.showArtists = false;
    this.showBooks = false;
    this.showCars = false;
    this.showCities = false;
    this.showCountries = true;
    this.router.navigateByUrl('/countries');
  }
}
