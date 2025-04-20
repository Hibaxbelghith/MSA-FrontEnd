import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import 'rxjs/operators';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
