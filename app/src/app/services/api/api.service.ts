import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, NEVER } from 'rxjs';
import { endpoint } from '../../config.json';
import { map, catchError, tap } from 'rxjs/operators';
import { formatValues } from 'src/app/utils/index.js';

const headers = { 'Content-Type': 'application/graphql' };

const buildSearchQuery = (title: string) => `query {\
  getByTitle(title:"${title}") {\
    id primaryTitle originalTitle startYear genres\
  }\
}`;

const buildMutation = ({ id, primaryTitle, originalTitle, startYear, genres }: Movie ) => `mutation {\
  update(id: ${id}, input: {\
    primaryTitle: ${primaryTitle} originalTitle: ${originalTitle} startYear: ${startYear} genres: ${genres}\
  }) {\
    id primaryTitle originalTitle startYear genres\
  }\
}`;

@Injectable({ providedIn: 'root' })

export class APIService {
  constructor(private http: HttpClient) {}

  doGraphQlQuery(query: string): Observable<GraphQlResponse<any>> {
    return this.http
      .post<GraphQlResponse<any>>(endpoint, query, { headers })
      .pipe(catchError(() => NEVER)); /* 😇 ignore for now */
  }

  searchByTitle(title: string): Observable<Movie[]> {
    return (this.doGraphQlQuery(buildSearchQuery(title)) as Observable<GraphQlResponse<Movie[]>>)
      .pipe(map(({ data: { getByTitle } }) => getByTitle));
  }

  update(movie: Movie): Observable<Movie> {
    return (this.doGraphQlQuery(buildMutation(formatValues<Movie>(movie))) as Observable<GraphQlResponse<Movie>>)
      .pipe(map(({ data: { update } }) => update));
  }
}
