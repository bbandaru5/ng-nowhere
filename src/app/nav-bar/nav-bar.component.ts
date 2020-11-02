import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ThemingService } from '../theming.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit, AfterViewChecked, AfterViewInit {

  constructor(private themingService: ThemingService,private cdRef:ChangeDetectorRef) { }
  hearUrl = 'assets/images/hear.svg';
  hearSelectedUrl = 'assets/images/hear-o.svg';
  logoUrl = 'assets/images/logo-dark.svg';
  navLogoUrl = 'assets/images/nav-logo.svg';
  confessUrl = 'assets/images/confess-icon.svg';
  confessDarkUrl = 'assets/images/confess-icon-dark.svg';
  confessSelectedUrl = 'assets/images/confess-o.svg';
  selection = "hear";
  expandIcon = "expand_more"
  isDarkMode = false;
  showMenu = false;
  userLinks = [
    {
      name: "Change Password",
      iconCls: "fa fa-list-ol",
      click: "changePassword",
    },
    {
      iconCls: "fa fa-plus",
      name: "Log Out",
      click: "logout",
    },
  ];
  ngOnInit(): void {
    this.updateTheme();
    this.showMenu = false;
  }

  hearOnClick(){
    this.selection = "hear"
  }
  onClickUserOption(){
    this.showMenu = !this.showMenu;
    this.expandIcon = this.showMenu?"expand_less":"expand_more";
  }
  changed($event){
    this.changeTheme($event);
    this.showMenu = false;
    this.expandIcon = this.showMenu?"expand_less":"expand_more";
  }
  changeTheme($event){
    console.log($event)
    this.isDarkMode = $event.checked;
    if($event.checked)
      this.themingService.theme.next("dark-theme");
    else
      this.themingService.theme.next("light-theme")
  }
  confessOnClick(){
    this.selection = "confess"
  }
  ngAfterViewInit() {
    this.cdRef.detectChanges();
    }
  ngAfterViewChecked(): void{
    this.updateTheme();
    this.cdRef.detectChanges();
  }
  updateTheme(){
    if(this.themingService.theme.value === 'light-theme'){
      this.isDarkMode = false;
      this.confessUrl = "assets/images/confess-icon.svg";
      this.hearUrl = "assets/images/hear.svg";
      this.logoUrl = "assets/images/logo-dark.svg";
     }else{
      this.isDarkMode = true;
      this.confessUrl = "assets/images/confess-icon-dark.svg";
      this.hearUrl = "assets/images/hear-dark.svg";
      this.logoUrl = "assets/images/logo-light.svg";
     }
  }
}
