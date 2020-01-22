import { Validators } from '@angular/forms'

export const searchForm: FormControlData[] = [
  { label: 'Title', key: 'title', type: 'text', validators: [Validators.minLength(3)] },
  { label: 'Year', key: 'year', type: 'text', validators: [Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/^\d+$/)] }
]
export const editForm: FormControlData[] = [
  { label: 'ID', key: 'id', readonly: true, type: 'text'},
  { label: 'Original Title', key: 'originalTitle', type: 'text', validators: [Validators.required, Validators.minLength(3)] },
  { label: 'Primary Title', key: 'primaryTitle', type: 'hidden' },
  { label: 'Year', key: 'startYear', type: 'text', validators: [Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/^\d+$/)] },
  { label: 'Genres', key: 'genres', type: 'text' }
]
