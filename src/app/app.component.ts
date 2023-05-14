import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { BehaviorSubject, delay, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private _subject = new BehaviorSubject<string>(
    ''
  );

  public obse = this._subject.asObservable();
  //some text after click
  public something = '';
  //side effect from remote source
  public somethingElse: string = '';

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public doSomething() {
    this.something = 'a';

    of(true)
      .pipe(delay(500))
      .subscribe(() => {
        this.doSomethingElse();
      });
  }

  private doSomethingElse() {
    this.somethingElse = 'b';
    this.changeDetectorRef.detectChanges();
  }
}
