import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SparqlService {
  private endpointUrl = 'https://dbpedia.org/sparql';

  constructor(private http: HttpClient) {}

  queryArtistData2(artistName: string): Observable<any> {
    // Construct SPARQL query
    let query = `
    PREFIX ...: <...>
    SELECT ... WHERE {
      ...
      FILTER(CONTAINS(?artistName, "${artistName}"))
    } LIMIT 10
    `;

    const headers = new HttpHeaders().set(
      'Accept',
      'application/sparql-results+json'
    );

    return this.http.get(
      this.endpointUrl + '?query=' + encodeURIComponent(query),
      { headers }
    );
  }

  queryArtistData(artistName: string): Observable<any> {
    let query = `SELECT ?artist ?description ?birthdate ?birthplace WHERE {
      ?artist a dbo:MusicalArtist;
              rdfs:label ?name;
              dbo:birthDate ?birthdate; 
              dbo:birthPlace ?birthplace;
              dbo:abstract ?description.
      FILTER(LANG(?name) = "en").
      FILTER(LANG(?description) = "en").
      FILTER(CONTAINS(LCASE(?name), LCASE("${artistName}")))
    } LIMIT 10`;
    //   let query = `
    //   SELECT ?artist ?description ?songs WHERE {
    //     ?artist a dbo:MusicalArtist;
    //             rdfs:label ?name;
    //             dbo:artist ?songs;
    //             dbo:abstract ?description.
    //     FILTER(LANG(?name) = "en").
    //     FILTER(LANG(?description) = "en").
    //     FILTER(CONTAINS(LCASE(?name), LCASE("${artistName}")))
    //   } LIMIT 10
    // `;
    // let query = `
    //   SELECT ?artist ?description WHERE {
    //     ?artist a dbo:MusicalArtist;
    //             rdfs:label ?name;
    //             dbo:abstract ?description;
    //             ?test ?test
    //             .
    //     FILTER(LANG(?name) = "en").
    //     FILTER(LANG(?description) = "en").
    //     FILTER(CONTAINS(LCASE(?name), LCASE("${artistName}")))
    //   } LIMIT 10
    // `;
    // let query = `
    // SELECT ?song ?streamCount WHERE {
    //   ?artist a dbo:MusicalArtist;
    //           rdfs:label ?name.
    //   FILTER(LANG(?name) = "en").
    //   FILTER(CONTAINS(LCASE(?name), LCASE("${artistName}")))
    // } LIMIT 10`;

    const headers = new HttpHeaders().set(
      'Accept',
      'application/sparql-results+json'
    );

    return this.http.get(
      this.endpointUrl + '?query=' + encodeURIComponent(query),
      { headers }
    );
  }
  getArtistDetails(artistURI: string): Observable<any> {
    let query = `
      SELECT ?artistOf WHERE {
        <${artistURI}> dbo:artist ?artistOf.
      }
    `;

    const headers = new HttpHeaders().set(
      'Accept',
      'application/sparql-results+json'
    );

    return this.http.get(
      this.endpointUrl + '?query=' + encodeURIComponent(query),
      { headers }
    );
  }

  queryMovieDetails(movieTitle: string): Observable<any> {
    let query = `
      SELECT ?movie ?duration ?releaseDate ?description WHERE {
        ?movie a dbo:Film;
               rdfs:label ?title;
               dbo:runtime ?duration;
               dbo:releaseDate ?releaseDate;
               dbo:abstract ?description.
        FILTER(LANG(?title) = "en").
        FILTER(LANG(?description) = "en").
        FILTER(CONTAINS(LCASE(?title), LCASE("${movieTitle}")))
      } LIMIT 10
    `;

    const headers = new HttpHeaders().set(
      'Accept',
      'application/sparql-results+json'
    );

    return this.http.get(
      this.endpointUrl + '?query=' + encodeURIComponent(query),
      { headers }
    );
  }

  queryCarsByBrand(brandName: string): Observable<any> {
    let query = `SELECT ?car ?model ?brand WHERE {
      ?car a dbo:Automobile;             rdfs:label ?model.
      ?brand rdfs:label ?brandName.
      FILTER(LANG(?brandName) = "en").
      FILTER(CONTAINS(LCASE(?brandName), LCASE("${brandName}")))
    } LIMIT 10`;

    const headers = new HttpHeaders().set(
      'Accept',
      'application/sparql-results+json'
    );

    return this.http.get(
      this.endpointUrl + '?query=' + encodeURIComponent(query),
      { headers }
    );
  }

  queryAnimalDetails(animalName: string): Observable<any> {
    let query = `
      SELECT ?animal ?description ?lifespan WHERE {
        ?animal a dbo:Animal;
                rdfs:label ?name;
                dbo:abstract ?description;
                dbo:lifespan ?lifespan.
        FILTER(LANG(?name) = "en").
        FILTER(CONTAINS(LCASE(?name), LCASE("${animalName}")))
      } LIMIT 10
    `;

    const headers = new HttpHeaders().set(
      'Accept',
      'application/sparql-results+json'
    );

    return this.http.get(
      this.endpointUrl + '?query=' + encodeURIComponent(query),
      { headers }
    );
    // ... (Use the same headers and http.get logic as before)
  }

  queryCityDetails(cityName: string): Observable<any> {
    let query = `SELECT ?city ?country ?population ?abstract WHERE {
      ?city a dbo:City;
            rdfs:label ?name;
            dbo:country ?country;
           dbo:abstract ?abstract;
            dbo:populationTotal ?population.
      FILTER(LANG(?name) = "en").
      FILTER(CONTAINS(LCASE(?name), LCASE("${cityName}")))
    } LIMIT 10`;
    // let query = `
    //   SELECT ?city ?country ?population WHERE {
    //     ?city a dbo:City;
    //           rdfs:label ?name;
    //           dbo:country ?country;
    //           dbo:populationTotal ?population.
    //     FILTER(LANG(?name) = "en").
    //     FILTER(CONTAINS(LCASE(?name), LCASE("${cityName}")))
    //   } LIMIT 10
    // `;

    const headers = new HttpHeaders().set(
      'Accept',
      'application/sparql-results+json'
    );

    return this.http.get(
      this.endpointUrl + '?query=' + encodeURIComponent(query),
      { headers }
    );

    // ... (Use the same headers and http.get logic as before)
  }

  queryCountryDetails(countryName: string): Observable<any> {
    let query = `SELECT ?country ?capital ?population ?code WHERE {
      ?country a dbo:Country;
               rdfs:label ?name;
               dbo:currencyCode ?code;
               dbo:capital ?capital;
               dbo:populationTotal ?population.
      FILTER(LANG(?name) = "en").
      FILTER(CONTAINS(LCASE(?name), LCASE("${countryName}")))
    } LIMIT 10`;

    const headers = new HttpHeaders().set(
      'Accept',
      'application/sparql-results+json'
    );

    return this.http.get(
      this.endpointUrl + '?query=' + encodeURIComponent(query),
      { headers }
    );
  }

  queryBooksByAuthor(authorName: string): Observable<any> {
    console.log('query books');

    // let query = `
    //   SELECT ?book ?title ?publicationYear WHERE {
    //     ?book a dbo:Book;
    //           dbo:author ?author;
    //           rdfs:label ?title;
    //           dbo:publicationYear ?publicationYear.
    //     ?author rdfs:label ?name.
    //     FILTER(LANG(?name) = "en").
    //     FILTER(CONTAINS(LCASE(?name), LCASE("${authorName}")))
    //   } LIMIT 10
    // `;
    // let query = ` SELECT ?book ?title WHERE {
    //   ?book a dbo:Book;
    //         rdfs:label ?name;
    //         dbo:abstract ?description.
    //   FILTER(LANG(?name) = "en").
    //   FILTER(CONTAINS(LCASE(?name), LCASE("${authorName}")))
    // } LIMIT 10`;

    let query = ` SELECT ?book ?description ?author ?name WHERE {
      ?book a dbo:Book;
            dbo:author ?author;
            rdfs:label ?name;
            dbo:abstract ?description.
      FILTER(LANG(?name) = "en").
      FILTER(CONTAINS(LCASE(?name), LCASE("${authorName}")))
    } LIMIT 10`;
    const headers = new HttpHeaders().set(
      'Accept',
      'application/sparql-results+json'
    );

    return this.http.get(
      this.endpointUrl + '?query=' + encodeURIComponent(query),
      { headers }
    );
    // ... (Use the same headers and http.get logic as before)
  }
}
