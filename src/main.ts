import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import themes from 'devextreme/ui/themes';
import { AppModule } from './app/app.module';


// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
 
  themes.initialized(() => {
    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  
  });