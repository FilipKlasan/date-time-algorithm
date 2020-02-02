import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentMonthArr = [];
  nextMonthsArr = [];
  prestupna: boolean = false;
  week =  ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  months = [ { name: 'January', days: 31} , { name: 'February', days: 28}, { name: 'March', days: 31 }, { name: 'April', days: 30 }, 
             { name: 'May', days: 31 }, { name: 'June', days: 30 }, { name: 'July', days: 31 }, { name: 'August', days: 31 }, 
             { name: 'September', days: 30 }, { name: 'October', days: 31 }, { name: 'November', days: 30 }, { name: 'December' , days: 31}];
  leftDays: number;
  weekDay: number;
  currentDay: number;
  currentMonth: number;
  nextMonth: number;
  selectedDt: any;
  nextMonthIndexes = [];
  selectedMonth: string;
  notEmptyOrNull: boolean = false;
  monthsToShowArr = [];
  dayMonth: boolean = false;
  hoursStart: number = 9;
  minutesStart: number = 30;
  hoursEnd: number = 10;
  minutesEnd: number = 0;
  amStart: boolean = true;
  pmStart: boolean = false;
  amEnd: boolean = false;
  pmEnd: boolean = true;
  dateTimeBool: boolean = false;
  incorrect: string;
  select = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  selectedVal: number = 1;

  constructor(){
          let arr = [];
          let arr1 = [];
          for(let i = 0; i < 6; i++) {
             for(let j = 0; j < 7; j++) {
                 arr.push('');
             }
             this.currentMonthArr.push(arr);
             arr = [];
          }
          let d = new Date();
          let weekd = d.getDay();
          if(weekd == 0) {
              this.weekDay = 6;
          }
          else {
              this.weekDay = weekd - 1;
          }
          this.currentDay = d.getDate();
          this.currentMonth = d.getMonth();
          this.nextMonth = (this.currentMonth+1)%12;
          let nextMonthIndex = this.nextMonth;
          for(let i = 0; i < 11; i++) {
              this.nextMonthIndexes.push(nextMonthIndex);
              nextMonthIndex = (nextMonthIndex + 1) % 12;
          }
          
          let y = d.getFullYear();
          if(y % 4 == 0 && y % 100 != 0) {
              this.prestupna = true;
              this.months[1].days = 29;
          }
          if(this.currentMonth == 1) {
             if(this.prestupna) {
               this.leftDays = 29 - this.currentDay;
               if(this.leftDays == 0) {
                  this.zeroDays();
               }
               else {
                  this.zeroPlusDays();
               }
             }
             else {
               this.leftDays = 28 - this.currentDay;
               if(this.leftDays == 0) {
                  this.zeroDays();
               }
               else {
                  this.zeroPlusDays();
               }
             }
          }
          else { 
               this.leftDays = this.months[this.currentMonth].days - this.currentDay;
               if(this.leftDays == 0) {
                  this.zeroDays();
               }
               else {
                  this.zeroPlusDays();
               }
          }
      }

zeroDays() {
  let arr = [];
  this.currentMonthArr = [];
  for(let i = 0; i < 7; i++) {
      arr.push('');
  }
  this.currentMonthArr.push(arr);
  this.currentMonthArr[0][this.weekDay] = this.currentDay;
  let t = (this.weekDay + 1)%7;
  this.nextMonthFu(t);
}  
zeroPlusDays() {
  let w = this.weekDay;
  let t;
  for(let i = 0; i < 6; i++) {
      for(let j = w; j < 7; j++) {
         this.currentMonthArr[i][w] = this.currentDay;
         w+=1%7;
         t = w;
         this.currentDay++;
         if(this.currentDay > this.months[this.currentMonth].days) {
             break;
         }
      } 
        w = 0;
      if(this.currentDay > this.months[this.currentMonth].days) {
          break;
      }
   }

   let index;
   let indToDel;
  for(let i = 0; i < this.currentMonthArr.length; i++) {
      for(let j = 0; j < this.currentMonthArr[i].length; j++) {
          if(this.currentMonthArr[i][j] == this.months[this.currentMonth].days) {
              index = i;
              break;
          }
      }
  }

  for(let i = 5; i > index; i--) {
       this.currentMonthArr.splice(i, 1);
  }
   this.nextMonthFu(t);
}
nextMonthFu(t) {
 let indexMo = this.nextMonth;
 let mArr = [];
 let mArr1 = [];
 for(let i = 0; i < 11; i++) {
    for(let j = 0; j < 6; j++) {
       for(let k = 0; k < 7; k++) {
          mArr.push('');
       }
       mArr1.push(mArr);
       mArr = [];
    }
  this.nextMonthsArr.push(mArr1);
  mArr1 = [];
 } 

  let tempArr = []; 
  let tempArr1 = [];
  for(let i = 0; i < 11; i++) {
      for(let j = 1; j <= this.months[indexMo].days; j++) {
          tempArr.push(j);
      }
      tempArr1.push(tempArr);
      indexMo = (indexMo + 1) % 12;
      tempArr = [];
  }

  let weekDayIndexArr = [t];
  let weekDayIndexCounter = 0;
  let ind = 0;
  let r = t;
  indexMo = this.nextMonth;
  
  for(let i = 0; i < 11; i++) {
      for(let j = 0; j < 6; j++) {
        for(let k = weekDayIndexArr[weekDayIndexCounter]; k < 7; k++) {
           this.nextMonthsArr[i][j][k] = tempArr1[i][ind];
           weekDayIndexArr[weekDayIndexCounter]+=1%7;
           r = weekDayIndexArr[weekDayIndexCounter]; 
           ind++;
           if(ind > this.months[indexMo].days) {
              break;
          }
        }
        weekDayIndexArr[weekDayIndexCounter] = 0;
        if(ind > this.months[indexMo].days) {
          break;
        }
      }
      ind = 0;
      weekDayIndexArr.push(r-1);
      weekDayIndexCounter+=1;
      indexMo = (indexMo + 1) % 12;
  }

  let x = this.nextMonth;
  let indexJ;
  let indToDel;
 for(let i = 0; i < this.nextMonthsArr.length; i++) {
     for(let j = 0; j < this.nextMonthsArr[i].length; j++) {
         for(let k = 0; k < this.nextMonthsArr[i][j].length; k++) {
          if(this.nextMonthsArr[i][j][k] == this.months[x].days) {
              indexJ = j;
              for(let r = 5; r > indexJ; r--) {
                  this.nextMonthsArr[i].splice(r, 1)
              }
           }
         }

     }
     x = (x + 1) % 12;
 }

}

selectedDate(x, z, i) {
  let r = parseInt(x.innerHTML);
  if(r > 0) {
      this.dayMonth = false;
      let reservationDates = [];
      let month;
      this.notEmptyOrNull = true;
      this.selectedMonth = z; 
      this.selectedDt = z + " " + x.innerHTML + ", " +  this.week[i];
    
  for(let i = 0; i < this.months.length; i++) {
      if(this.months[i].name == z) {
          month = i;
          break;
      }
   }

  }
}
amStartFu(a, p) {
  p.style.fontWeight = "normal";
  a.style.fontWeight = "bold";
  this.amStart = true;
  this.pmStart = false;
}
pmStartFu(a, p) {
  a.style.fontWeight = "normal";
  p.style.fontWeight = "bold";
  this.amStart = false;
  this.pmStart = true;
}
amEndFu(a, p) {
  p.style.fontWeight = "normal";
  a.style.fontWeight = "bold";
  this.amEnd = true;
  this.pmEnd = false;
}
pmEndFu(a, p) {
  a.style.fontWeight = "normal";
  p.style.fontWeight = "bold";
  this.amEnd = false;
  this.pmEnd = true;
}
confirmDateAndTime() {
    if(this.hoursStart < 1 || this.hoursStart > 12 || 
       this.minutesStart < 0 || this.minutesStart > 59 ||
       this.hoursEnd < 1 || this.hoursEnd > 12 || 
       this.minutesEnd < 0 || this.minutesEnd > 59 || 
       this.hoursStart >= this.hoursEnd && 
       this.amStart == true && this.amEnd == true &&
       this.minutesStart >= this.minutesEnd ||
       this.hoursStart >= this.hoursEnd && 
       this.pmStart == true && this.pmEnd == true &&
       this.minutesStart >= this.minutesEnd ||
       this.pmStart == true && this.amEnd == true) {
       this.incorrect = 'Enter a correct time.';
       this.dateTimeBool = true;
        
    }
    else if(this.hoursStart == 9 && this.minutesStart < 30 && this.amStart == true ||
      this.hoursStart < 9 && this.amStart == true || 
      this.hoursStart == 12 && this.amStart == true ||
      this.hoursStart == 10 && this.minutesStart > 0 && this.pmStart == true || 
      this.hoursStart > 10 && this.hoursStart != 12 && this.pmStart == true ||
      this.hoursEnd == 9 && this.minutesEnd < 30 && this.amEnd == true ||
      this.hoursEnd < 9 && this.amEnd == true || 
      this.hoursEnd == 12 && this.amEnd == true ||
      this.hoursEnd == 10 && this.minutesEnd > 0 && this.pmEnd == true || 
      this.hoursEnd > 10 && this.hoursEnd != 12 && this.pmEnd == true) {
      this.incorrect = '9:30 AM - 10:00 PM';
      this.dateTimeBool = true;
    }
    else {
         this.dateTimeBool = false;
    }
 }
 toShow() {   
    this.monthsToShowArr = [];
    for(let i = 0; i < this.selectedVal; i++) {
        this.monthsToShowArr.push(i);
     }
 }
}