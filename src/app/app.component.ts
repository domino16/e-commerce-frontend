import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from './modules/shared/components/header/header.component';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [HeaderComponent],
  standalone: true,
})
export class AppComponent  {


}
