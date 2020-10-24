import { ApplicationRef, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class ThemingService {
  themes = ["dark-theme", "light-theme"];
  theme = new BehaviorSubject("light-theme");

  constructor(private ref: ApplicationRef) {
    // initially trigger dark mode if preference is set to dark mode on system
    const darkModeOn =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if(darkModeOn){
      this.theme.next("dark-theme");
    }

    // watch for changes of the preference
    window.matchMedia("(prefers-color-scheme: dark)").addListener(e => {
      const turnOn = e.matches;
      this.theme.next(turnOn ? "dark-theme" : "light-theme");

      // trigger refresh of UI
      this.ref.tick();
    });
  }
  public applyThemeOnOverlays(overlayContainer,themingService,cssClass) {
    const overlayContainerClasses = overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(themingService.themes);
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(cssClass);
  }
}
