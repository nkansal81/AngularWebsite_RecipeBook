import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CompleteWebApp';
  
  constructor() { }

  ngOnInit(): void {
  //   window.addEventListener("beforeunload", function (e) {
  //     var confirmationMessage = "\o/";
  //     console.log("cond");
  //     e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
  //     return confirmationMessage;              // Gecko, WebKit, Chrome <34
  // });
  }
}
