import { Component, OnInit } from '@angular/core';
import { Subject, combineLatest, BehaviorSubject, of, merge, Observable } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged, scan, map } from 'rxjs/operators';
import { APIService } from './services/api/api.service';
import { ModalService } from './services/modal/modal.service';
import { searchForm, editForm } from './components/forms/form.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private api: APIService, private modal: ModalService) {}

  searchForm: FormControlData[] = searchForm;
  editForm: FormControlData[] = editForm;
  search$: Subject<SearchFields> = new Subject();
  data$: BehaviorSubject<Movie[]> = new BehaviorSubject([]);
  update$: Subject<Movie> = new Subject();
  selected$: Subject<Movie> = new Subject();

  ngOnInit() {
    const results$: Observable<Movie[]> = this.search$.pipe(
      debounceTime(500),
      distinctUntilChanged((a, b) => a.title === b.title),
      switchMap(({ title }) => (title.length >= 3) ? this.api.searchByTitle(title.trim()) : of([]))
    );

    const updates$: Observable<Movie[]> = results$.pipe(switchMap((data) =>
      this.update$.pipe(
        debounceTime(500),
        distinctUntilChanged((a, b) => !Object.keys(b).some((key) => a[key] !== b[key])),
        switchMap(movie => this.api.update(movie)),
        scan((movies: Movie[], update: Movie) => {
          if (movies.some(({ id }) => update.id === id)) { movies[movies.findIndex(({ id }) => update.id === id)] = update; }
          return movies;
        }, data)
    )));

    combineLatest(merge(results$, updates$), this.search$)
      .pipe(map(([data, { year }]) => data
        .filter(({ startYear }) => startYear && startYear.includes(year))
        .sort((a, b) => a.startYear > b.startYear ? -1 : 1)))
      .subscribe(this.data$);

    this.selected$.subscribe(() => this.modal.toggle());

    this.data$
      .pipe(distinctUntilChanged((a, b) => a.length === b.length))
      .subscribe(() => document.documentElement.scrollTo({ top: 0 }));
  }
}
