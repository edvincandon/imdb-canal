import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChange } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { skip } from 'rxjs/operators'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit, OnChanges {
  @Input() source: FormControlData[]
  @Input() hydrate: { [key: string]: any }
  @Output() data$: EventEmitter<any> = new EventEmitter<{ [key: string]: any }>()
  formGroup: FormGroup

  ngOnInit() {
    this.formGroup = new FormGroup(this.source.reduce((acc, { key }) => ({ ...acc, [key]: new FormControl('') }), {}))
    this.formGroup.valueChanges.pipe(skip(1)).subscribe(this.data$)
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes.hydrate && changes.hydrate.currentValue) {
      this.formGroup.setValue(changes.hydrate.currentValue)
    }
  }
}
