import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChildren('btn') btn:any;
  @ViewChild('btnPlay') btnPlay:any;
  @ViewChild('gameOver') gameOverAlert:any;
  @ViewChild('correct') correct:any;

  notes:any = [
    {},{},{},{},{},{}
  ] ;
  public arrayConst: number[] = [];
  public arrayClient: number[] = [];
  public arrayServer: number[] =[];
  public arrayTemp:number[]=[];
  public isClickDone = false;
  public count = 1;
  public scorce = 0;
  public highest = 0;
  public compare:number|undefined;
  public point:number|undefined;
  title = 'remember';
  ngOnInit(): void {
    
  }
  play(){
    this.clearEffect();
    this.reset();
    const random = Math.floor(Math.random()*6)
    this.arrayConst.push(random);
    this.btnPlay.nativeElement.classList.add('disable')
    this.btn._results[random].nativeElement.classList.add('btn-change-color');
  }
  
  //Xoa hieu ung chuyen mau
  clearEffect(){
    this.btn.forEach((btn:any) => {
      btn.nativeElement.classList.remove('btn-change-color');
    });
    this.correct.nativeElement.classList.remove('point')
    this.gameOverAlert.nativeElement.classList.remove('appear');
    this.btn.forEach((element:any) => {
      element.nativeElement.classList.remove('wrong');
      element.nativeElement.classList.remove('warning');
    });

  }
  reset(){
    this.arrayTemp=[];
    this.arrayConst=[];
    this.arrayServer=[];
    this.arrayClient=[];
    this.count=1;
    this.scorce=1;
    this.point = 0;
    this.isClickDone=false;
  }
  //hien thi cac nut trong mang
  displayNote(array:number[]){
    //xoa het hieu ung
    this.clearEffect();
    // them hieu ung cho cac nut
    for (let index = 0; index < array.length; index++) {
      setTimeout(() =>{
       this.btn._results[array[index]].nativeElement.classList.remove('btn-change-color');
       setTimeout(() => {
        this.btn._results[array[index]].nativeElement.classList.add('btn-change-color');
       }, index*100);
       
      },index*1000)
    }
  }
  //tao ra cac nut ke tiep
  randomNote(){
    const random = Math.floor(Math.random()*6)
    this.arrayConst.push(random);
  }
 
  onClick(index:number){
    //So lan nguoi choi phan an
    if(this.count > 0){
      this.clearEffect();
      if(!this.isClickDone){
        //copy array
        this.arrayTemp = this.arrayConst.map(num=>num);
        this.isClickDone = true;
      }
      this.compare = this.arrayTemp.shift();
      if(this.compare === index){
        this.point = this.scorce * 5;
        this.highest = this.point > this.highest ? this.point : this.highest;
        this.correct.nativeElement.innerHTML = '+' + this.point;
        this.scorce++;
        if(this.arrayTemp.length == 0){
          this.randomNote();
          setTimeout(() => {
          this.displayNote(this.arrayConst);
          }, 2500);
          this.correct.nativeElement.classList.add('point');
          setTimeout(() => {
          this.correct.nativeElement.classList.remove('point');
        }, 2500);
        }
        this.count--;
      }
      else{
        this.btn._results[index].nativeElement.classList.add('wrong');
        console.log(index,this.compare);
        if(typeof this.compare =='number'){
         this.btn._results[this.compare].nativeElement.classList.add('warning');
        }
        this.gameOverAlert.nativeElement.classList.add('appear');
      }
    }
    else{
      this.count = this.arrayConst.length;
      this.isClickDone = false;
      this.onClick(index)
    }
  }
}
