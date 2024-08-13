import themes, { current } from 'devextreme/ui/themes'
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import DevExpress from 'devextreme';


//type Theme = typeof themes[number];

// function getNextTheme(theme?: Theme) {
//   return themes[themes.indexOf(theme!) + 1] || themes[0];
// }

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private storageKey = 'app-theme';
  private themeMarker = 'theme-';

  currentTheme:any='dark';//: Theme = window.localStorage[this.storageKey] //|| getNextTheme();
  

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
    // this.isDark.next(this.currentTheme === 'dark');
    themes.current('generic.light');
    // const regexTheme = new RegExp(`\\.(${themes.join('|')})`, 'g');

    // currentVizTheme(currentVizTheme().replace(regexTheme, `.${theme}`));
    // refreshTheme();
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  isFluent(): boolean {
    return current().includes('fluent');
  }

  switchTheme() {
    // const newTheme = getNextTheme(this.currentTheme);
    // this.setAppTheme(newTheme);
    // window.localStorage[this.storageKey] = newTheme;
    if(this.currentTheme==='dark')
      this.currentTheme='light'
    else
         this.currentTheme='dark'


         if(this.currentTheme==='dark')
    themes.current('generic.dark');
  else
  themes.current('generic.light');
  }
}
