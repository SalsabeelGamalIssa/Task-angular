import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {
  form: FormGroup;
  Mealform: FormGroup;
  index = 1;
  breakfast_tags = ['Greek Yogurt', 'Eggs', 'Oatmeal', 'Chia Seeds', 'Berries'];
  lunch_tags = ['Paneer Kathi Roll', 'chicken curry', ' chapati', 'Varutha Kozhi Kari'];
  dinner_tags = ['Hard tacos', 'Huevos rancheros.', ' Burritos', 'Fajitas.'];
  category: any = null;
  categories= ['breakfast','lunch','dinner'];
  tag = null;
  tags=[];
  q:number;
  dis=true;
  isCombo=false;
  isSpicy=false
  Order:any[]=[];
  price=100;
  total:number;
  description:any;
  prico:number;
  name:any;
  file:any;
  constructor( private _formBuilder: FormBuilder,) { }



  ngOnInit(): void {

    this.form = this._formBuilder.group({
      q: [
        '',
        [
          Validators.required,
          
        ],
      ],
      category: [
        '',
      ],
      tag: [
        '',
      ],
      combo: [
        '',
      ],
      spicy: [
        '',
      ],

    });

    this.Mealform = this._formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          
        ],
      ],
      price: [
        '', [
          Validators.required,
         
        ],
      ],
      descripton: [
        ''
      ],
      category: [
        '',[
          Validators.required,
        ],
      ],
      image: [
        '', [
          Validators.required,
         
        ],
      ]
    });
  }
  tabChanger(index: number) {
    this.index = index;
  }
  OnSubmit(){

    console.log(this.isCombo);
    console.log(this.isSpicy);
    console.log(this.category);
    console.log(this.tag);

    let item={
      "item":this.tag,
      "Q":this.q,
      "price":100,
      "addson":true,
      "total":this.price*this.q

    }
    console.log(item);
    this.Order.push(item);
    console.log(this.Order);
    this.price=100;
    
    var msgTotal = this.Order.reduce(function(prev, cur) {
      return prev + cur.total;
    }, 0);
    
    console.log(msgTotal);
    this.total=msgTotal;

    this.form.reset();

  }
  onOptionsSelected(){
    if (this.category !== null){
      console.log(this.category);
      switch (this.category) {
        case "breakfast":
          this.tags=this.breakfast_tags;
          break;
          case "dinner":
            this.tags=this.dinner_tags;
            break;
            case "lunch":
              this.tags=this.lunch_tags;
              break;
      
        default:
          break;
      }
      
      this.dis = false;
      this.form.controls.tag.enable();
      
    }
  }

  checkSpicy(){
    if(this.isSpicy)
    this.price+=1;
  }

  checkCombo(){
    if(this.isCombo)
    this.price+=2;
  }
  Neo(){

    this.Order=[];
    this.form.reset();
    this.price=0;
    this.total=0;


  }
  OnSubmitMeal(desc)
  {
    const uploadData = new FormData();
    uploadData.append('myFile', this.file);
    let meal={
      "name":this.Mealform.controls.name.value,
      "price":this.prico,
      "description":desc,
      "img":uploadData
    }

   console.log(meal);
   this.Mealform.reset();

  }

  onFileChanged(event){
this.file = event.target.files[0]
console.log(this.file);

  }

}
