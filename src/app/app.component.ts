import { Component, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map, delay, withLatestFrom } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { NavigationStart, Router } from '@angular/router';
import {Subscription} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { KpiService } from './shared/services/api/kpi.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnDestroy{
  
  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map(v => v[1]),
  );
  
  subscription : Subscription;
  
  constructor(
    @Inject(PLATFORM_ID) 
    private platformId: Object,
    private loader: LoadingBarService, translate: TranslateService,
    private router: Router,
    private kipService: KpiService,
    private toasterService: ToastrService
    ) {
    if (isPlatformBrowser(this.platformId)) {
      const langs = ['en', 'fr'];
      translate.addLangs(langs);
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');
      // Get browser Lang
      const browserLang = translate.getBrowserLang();
      // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
      // translate.use('en');
      // console.log(browserLang);
      // console.log(translate.getLangs());
      // console.log(translate.currentLang);
      this.subscription = router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          const browserRefresh = !router.navigated;
          if (browserRefresh){
            this.kipService.collectData().subscribe(() => {
            this.toasterService.info('collec data in Jira-api  successfully',);
          })
          console.log('collect data is dane !');
          }
        }
      });
    }
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
