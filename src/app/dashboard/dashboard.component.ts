import { ChangeDetectionStrategy, Component, NgZone, OnInit } from '@angular/core';
import { Color } from '@swimlane/ngx-charts';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  constructor(private zone:NgZone) { }

  allAlgos = [
    'Selection Sort',
    'Bubble Sort',
    'Insertion Sort',
    'Merge Sort',
    'Quick Sort',
    'Radix Sort'
  ];
  selectedAlgo;
  numberOfElements;
  saleData = [];
  customColor = [];
  mintime = 100;
  minsize = 10;

  ngOnInit(): void {
    this.saleData = this.getRandomList(this.minsize);
    this.customColor = this.getColor([...this.saleData]);
  }

  getColor(saleData:any){
    return saleData.map((v,i)=> {
      return {name: i + '', value: '#007BFF'}
    })
  }

  getRandomList(max:number) {
    let temp = Array.from({length: max}, () => Math.floor(Math.random() * max));
    return temp.map((v,i) =>  {
      return {name: i + '', value :v}
    })
  }

  wait(ms) {
    return timer(ms).pipe(take(1)).toPromise();
  }

  changeColor(name, color = 'red') {
    let temp = this.customColor;
    let elementWithName = null;
    for(let ele of this.customColor) {
      if(ele?.name == name) {
        elementWithName = ele;
      }
    }
    if(elementWithName) {
      elementWithName.value = color;
    }
  }

  shuffle(){
    window.location.reload()
  }

  submit(){
    this.mergeSort(this.saleData,0,this.saleData.length-1);
  }
  async mergeSort(a: any[], f: number, l: number) {
    if( f < l){
      const m = parseInt((f + l) / 2 + '');
      await this.mergeSort(a, f, m);
      await this.mergeSort(a, m + 1, l);
      await this.merge(a, f, m, l);
    }
  }

  merge(a: any[], f: number, m: number, l: number) {
    
  }

  async insertionSort(saleData: any[]) {
    var i, j, key;
    const n = saleData.length;
    var temp;
    for (i = 1; i < n; i++)
    {
      temp = [...saleData];
      key = temp[i]["value"];
      this.changeColor(saleData[i]["name"]);
      this.customColor = [...this.customColor];
      await this.wait(this.mintime);
      j = i - 1;
      while(j >= 0 && temp[j]["value"] > key){
        this.changeColor(saleData[j]["name"]);
        this.customColor = [...this.customColor];
        await this.wait(this.mintime);
        temp[j + 1]["value"] = temp[j]["value"];
        this.changeColor(saleData[j]["name"], '#007BFF');
        this.customColor = [...this.customColor];
        await this.wait(this.mintime);
        j--;
      }
      this.changeColor(saleData[j+1]["name"], '#65B556');
      this.customColor = [...this.customColor];
      await this.wait(this.mintime);
      temp[j+1]["value"] = key;
      this.saleData = [...temp];
      this.changeColor(saleData[i]["name"], '#007BFF');
      this.changeColor(saleData[j+1]["name"], '#007BFF');
      this.customColor = [...this.customColor];
      await this.wait(this.mintime);
    }
  }

  async bubbleSort(saleData: any[]){
    var i, j;
    const n = saleData.length;
    for (i = 0; i < n; i++)
    {
      for (j = 0; j < n-i-1; j++)
      {
        this.changeColor(saleData[j]["name"]);
        this.changeColor(saleData[j+1]["name"]);
        this.customColor = [...this.customColor];
        await this.wait(this.mintime);
        if (saleData[j]["value"] > saleData[j+1]["value"])
        {
          this.swap(j,j+1);
          await this.wait(2*this.mintime);
        }
        else{
          await this.wait(this.mintime);
          this.changeColor(saleData[j]["name"], '#007BFF');
          this.changeColor(saleData[j+1]["name"], '#007BFF');
          this.customColor = [...this.customColor];
        }
      }
    }
  }

  async selectionSort(saleData: any[]) {
    var i, j, minimum_index;
    const n = saleData.length;

    for (i = 0; i < n-1; i++)
    {
        minimum_index = i;
        for (j = i + 1; j < n; j++){
          this.changeColor(saleData[i]["name"]);
          this.changeColor(saleData[j]["name"]);
          this.customColor = [...this.customColor];
          await this.wait(this.mintime);
          if (saleData[j]["value"] < saleData[minimum_index]["value"]){
            minimum_index = j;
          }
          await this.wait(this.mintime);
          this.changeColor(saleData[i]["name"], '#007BFF');
          this.changeColor(saleData[j]["name"], '#007BFF');
          this.customColor = [...this.customColor];
        }
        if(i!=minimum_index){
          this.swap(i, minimum_index);
          await this.wait(2*this.mintime);
        }
    }
  }

  async swap(i,j){
    let temp = this.saleData;
    this.changeColor(temp[i]["name"]);
    this.changeColor(temp[j]["name"]);
    this.customColor = [...this.customColor];
    await this.wait(this.mintime);
    let temp1 = temp[i]["value"];
    temp[i]["value"] = temp[j]["value"];
    temp[j]["value"] =temp1;
    this.saleData = [...temp];
    await this.wait(this.mintime);
    this.changeColor(temp[i]["name"], '#007BFF');
    this.changeColor(temp[j]["name"], '#007BFF');
    this.customColor = [...this.customColor];
  }
}



