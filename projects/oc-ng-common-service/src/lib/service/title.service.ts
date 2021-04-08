import {Inject, Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivationStart, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  title: string;

  constructor(private titleService: Title,
              private router: Router,
              @Inject('environment') private environment) {
    this.router.events.subscribe(value => {
      if (value instanceof ActivationStart) {
        const subtitle = value.snapshot.data.title;
        this.setPrefix(subtitle);
      }});
  }

  /**
   *  Set subtitle on the left side of a pipe
   */
  setPrefix(subtitle: string) {
    const siteTitle = `${subtitle ? `${subtitle} | ` : ''}${this.title}`;
    this.titleService.setTitle(siteTitle);
  }
  /**
   *  Set subtitle on the right side of a pipe
   */
  setPostfix(subtitle: string) {
    const siteTitle = `${this.title}${subtitle ? ` | ${subtitle}` : ''}`;
    this.titleService.setTitle(siteTitle);
  }

  /**
   * Set custom title to the right or left side of a pipe.
   * @param newTitlePart new title part to override
   * @param rightPart is 'true' - set new title part on the right side
   */
  setSpecialTitle(newTitlePart: string, rightPart?: boolean) {
    if (rightPart) {
      this.setPostfix(newTitlePart);
    } else {
      this.setPrefix(newTitlePart);
    }
  }
}
