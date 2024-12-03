import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimations } from '@angular/platform-browser/animations';


const localAppConfig = {
  ...appConfig, // Spread imported appConfig to maintain its existing configuration
  providers: [
    ...appConfig.providers || [], // Include existing providers if defined in imported appConfig
    provideAnimations(), // Add animations support here
  ],
};

bootstrapApplication(AppComponent,localAppConfig)
  .catch((err) => console.error(err));
