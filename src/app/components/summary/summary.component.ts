import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NutritionApiService } from 'src/app/services/nutrition-api.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  extraState: any = '';
  title: string = 'Ingredients Summary';
  ingredients:any = [];
  iTitle: string = '';
  ingredientsFinal: any = [];
  ingredientsArray: any = {title: '', calories: '', weight: ''};
  dailyNutrition: any = [];
  body: any;
  active: boolean = false;
  showAlert: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private nutritionAPI: NutritionApiService) {
    this.route.params.subscribe(async params => {
      this.extraState = this.router.getCurrentNavigation()?.extras.state; // get the state value 
      this.body = this.extraState?.body;

      // if state value exist
      if (this.extraState) {
        this.iTitle = this.extraState.body.title;
        this.ingredients = this.extraState.body.ingr;

        // if ingredient length is greater than zero
        if(this.ingredients.length > 0) {
          this.ingredientsFinal = [];

          // get each ingredient nutrition data
          this.ingredients.forEach((element, index) => { 
            this.nutritionAPI.getNutritionData(element).subscribe((response: any) => {
              this.ingredientsArray = [];
              this.ingredientsArray.title = element;
              this.ingredientsArray.calories = response.calories;
              this.ingredientsArray.weight = response.totalWeight;
              this.ingredientsFinal.push(this.ingredientsArray);
            }, error => {
              console.log(error);
            })
          });
        }
      } else {
        // no state value
        this.router.navigateByUrl('/home');
      }
    });
  }

  ngOnInit(): void {
  }

  // get the total daily nurtition
  totalNutrition() {
    this.nutritionAPI.getNutritionDetails(this.body).subscribe((response: any) => {
      this.dailyNutrition = response;
      this.active = true;
      this.showAlert = false;
    }, error => {
      console.log(error);
      this.active = false;
      this.showAlert = true;
    }) 
  }
}
