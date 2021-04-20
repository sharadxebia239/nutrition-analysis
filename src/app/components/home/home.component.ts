import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NutritionApiService } from 'src/app/services/nutrition-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Nutrition Analysis';
  submitted = false;
  model = { iTitle: '', iSummary: '' };
  constructor(private nutritionAPI: NutritionApiService, private router: Router) { }

  ngOnInit(): void {
  }

  // on form submittion
  onSubmit() {
    this.submitted = true;
    var iSummaryArray = this.model.iSummary.split("\n"); // split by line break

    // remove empty element in the array
    var finalSummaryArray = iSummaryArray.filter(function (el) {
      return el != null;
    });
    
    // body declartion
    var body = {
      "title": this.model.iTitle,
      "ingr": finalSummaryArray
    }

    // navigate data from this component to summary component
    let navigationExtras: NavigationExtras = {
      state : {
        body
      }
    } 

    //navigate to summary component
    this.router.navigateByUrl('/summary', navigationExtras);
  }
}