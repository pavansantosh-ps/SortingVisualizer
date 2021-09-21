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
  mintime = 1000;
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
    this.quickSorter();
  }

  // quickSort
  async quickSorter() {
    await this.quickSort(this.saleData,0,this.saleData.length-1);
  }

  async quickSort(arr: any[], f: number, l: number) {
    var pivot = arr[f]["value"];
    var p = f+1;
    var q = l;
    this.changeColor(arr[f]["name"], '#65B556');
    this.customColor = [...this.customColor];
    await this.wait(this.mintime);
    while(q>p){
      this.changeColor(arr[p]["name"]);
      this.changeColor(arr[q]["name"]);
      this.customColor = [...this.customColor];
      await this.wait(this.mintime);
      if(p<=l){
        while(pivot > arr[p]["value"]){
          this.changeColor(arr[p]["name"], '#007BFF');
          this.customColor = [...this.customColor];
          await this.wait(this.mintime);
          p++;
        }
        if(q>=0){
          while(pivot < arr[q]["value"]){
            this.changeColor(arr[q]["name"], '#007BFF');
            this.customColor = [...this.customColor];
            await this.wait(this.mintime);
            q--;
          }
        }
      }
      if(p<q){
        this.swap(p,q);
        await this.wait(this.mintime);
      }
    }
    this.swap(f,q);
    await this.wait(this.mintime);
    if(f<l){
      this.quickSort(arr,f,q-1);
      this.quickSort(arr,q+1,l);
    }
  }

  // mergeSort
  async mergeSorter() {
    await this.mergeSort(this.saleData,0,this.saleData.length-1);
  }


  async mergeSort(a: any[], f: number, l: number) {
    if( f < l){
      var m = parseInt((f + l) / 2 + '');
      await this.mergeSort(a, f, m);
      await this.mergeSort(a, m + 1, l);
      await this.merge(a, f, m, l);
    }
  }

  async merge(arr: any[], f: number, m: number, l: number) {

    let i,j,k;
    let n1 = m - f + 1;
    let n2 = l - m;
    let L = [],M = [];
    for ( i = 0; i < n1; i++)
        L[i] = arr[f + i];
    for ( j = 0; j < n2; j++)
        M[j] = arr[m + 1 + j];

    i = 0;
    j = 0;
    k = f;

    while (i < n1 && j < n2) {
      this.changeColor(L[i]["name"]);
      this.changeColor(M[j]["name"]);
      this.customColor = [...this.customColor];
      await this.wait(this.mintime);
      if (L[i]["value"] <= M[j]["value"]) {
        this.changeColor(L[i]["name"], '#007BFF');
        this.changeColor(M[j]["name"], '#007BFF');
        this.customColor = [...this.customColor];
        arr[k] = L[i];
        arr[k]['name'] = k;
        i++;
      } else {
        this.changeColor(arr[k]["name"], '#007BFF');
        this.changeColor(M[j]["name"], '#007BFF');
        this.customColor = [...this.customColor];
        arr[k] = M[j];
        arr[k]['name'] = k;
        j++;
      }
      k++;
    }

    while (i < n1) {
      this.changeColor(L[i]["name"], '#007BFF');
      this.customColor = [...this.customColor];
      arr[k] = L[i];
      arr[k]['name'] = k;
      i++;
      k++;
    }

    while (j < n2) {
      this.changeColor(L[j]["name"], '#007BFF');
      this.customColor = [...this.customColor];
      arr[k] = M[j];
      arr[k]['name'] = k;
      j++;
      k++;
    }

    for(let z= 0 ; z <  arr.length; z++) {
      this.changeColor(arr[z]["name"], '#007BFF');
      this.customColor = [...this.customColor];
    }
    this.saleData = [...arr];
  }

  // insertionSort
  async insertionSort(saleData: any[]) {
    var i, j, key;
    var n = saleData.length;
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
      this.changeColor(saleData[j+1]["name"], '#007BFF');
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

  // bubbleSort
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

  // sellectionSort
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

  // Swap of two elements
  async swap(i,j){
    let temp = this.saleData;
    this.changeColor(temp[i]["name"]);
    this.changeColor(temp[j]["name"], '#007BFF');
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



