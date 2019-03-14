import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkbenchApplicationPlatformModule } from '@scion/workbench-application-platform';
import { WorkbenchModule } from '@scion/workbench';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
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
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap:
    [AppComponent]
})

export class AppModule {
}
