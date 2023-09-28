import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { BooksComponent } from './components/books/books.component';
import { CarsComponent } from './components/cars/cars.component';
import { CitiesComponent } from './components/cities/cities.component';
import { CountriesComponent } from './components/countries/countries.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'artists',
    component: ArtistsComponent,
  },
  {
    path: 'books',
    component: BooksComponent,
  },
  {
    path: 'cars',
    component: CarsComponent,
  },
  { path: 'cities', component: CitiesComponent },
  { path: 'countries', component: CountriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
