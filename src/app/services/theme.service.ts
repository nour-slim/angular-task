import themes, { current } from 'devextreme/ui/themes'
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import DevExpress from 'devextreme';



@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeMarker = 'theme-';
  private theme: 'light' | 'dark' = 'light';
  currentTheme:any='light';
  

  public isDark = new BehaviorSubject<boolean>(this.currentTheme === 'dark');

  private getThemeStyleSheets() {
    return   Array.from(document.styleSheets).filter(
      (styleSheet) => styleSheet?.href?.includes(this.themeMarker)
    );
  }

  setAppTheme(theme = this.currentTheme) {
    this.getThemeStyleSheets().forEach((styleSheet) => {
      styleSheet.disabled = !styleSheet?.href?.includes(`${this.themeMarker}${theme}`);
    });

    this.currentTheme = theme;
    themes.current('generic.light');
    
  }

  getCurrentTheme()  {
    return this.currentTheme;
  }

  isFluent(): boolean {
    return current().includes('fluent');
  }

  switchTheme() {
    if(this.currentTheme==='dark')
      this.currentTheme='light'
    else
         this.currentTheme='dark'


         if(this.currentTheme==='dark')
    themes.current('generic.dark');
  else
  themes.current('generic.light');
  }



  public applyTheme(theme: 'light' | 'dark') {
    this.getThemeStyleSheets().forEach((styleSheet) => {
      styleSheet.disabled = !styleSheet?.href?.includes(`${this.themeMarker}${theme}`);
    });

    themes.current(theme === 'dark' ? 'generic.dark' : 'generic.light');
    this.setGoldenLayoutTheme(theme);
  }

  setGoldenLayoutTheme(theme: 'dark' | 'light') {
    const goldenLayoutDarkLink = document.querySelector('link[href*="goldenlayout-dark-theme.css"]');
    const goldenLayoutLightLink = document.querySelector('link[href*="goldenlayout-light-theme.css"]');

    if (theme === 'dark') {
      goldenLayoutDarkLink?.removeAttribute('disabled');
      goldenLayoutLightLink?.setAttribute('disabled', 'true');
    } else {
      goldenLayoutLightLink?.removeAttribute('disabled');
      goldenLayoutDarkLink?.setAttribute('disabled', 'true');
    }
  }

}
