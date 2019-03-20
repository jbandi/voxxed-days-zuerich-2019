import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkbenchModule } from '@scion/workbench';
import { WorkbenchApplicationPlatformModule } from '@scion/workbench-application-platform';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    WorkbenchModule.forRoot(),
    WorkbenchApplicationPlatformModule.forRoot({
      applicationConfig:
        [
          {
            symbolicName: 'contact-app',
            manifestUrl: 'http://localhost:5000/assets/manifest.json',
          },
          {
            symbolicName: 'joke-app',
            manifestUrl: 'http://localhost:3000/manifest-scion.json',
          },
          {
            symbolicName: 'dev-tools-app',
            manifestUrl: 'https://scion-workbench-application-platform-devtools.now.sh/assets/manifest.json',
            scopeCheckDisabled: true,
          }
        ],
    }),
  ],
  providers: [],
  bootstrap:
    [AppComponent]
})

export class AppModule {
}
