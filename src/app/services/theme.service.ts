import { Injectable } from '@angular/core';
import themes from 'devextreme/ui/themes';
import { refreshTheme } from 'devextreme/viz/themes';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  changeTheme(isDark: boolean){
    if (isDark) {
      themes.current("generic.dark.compact");
      localStorage.setItem('themeDark', 'true');
    }
    else{
      themes.current("generic.carmine.compact");
      localStorage.setItem('themeDark', 'false');
    }
    refreshTheme();
  }
}
