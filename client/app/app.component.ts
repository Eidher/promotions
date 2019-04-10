import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public company: string = "BCGDV";
  public title: string = "Engineering Coding Challenge!";
  public logoImage: string =
    "https://lever-client-logos.s3.amazonaws.com/b0eb0b2b-00c6-402a-88bd-7ed0a090af3f-1515024490884.png";
}
