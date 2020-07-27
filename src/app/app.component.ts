import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  constructor(private appService: AppService, private spinner: NgxSpinnerService) {
    //  this.getData(this.fileName[this.num]);
  }
  content: string;
  originalHtml: any;
  num = 0;
  fileName = [
    'Caar.html',
    'Carr.html',
    'CarRent.html',
    'CarRental.html',
    'sample.html'
  ];
  ngOnInit(): void {
    this.getData(this.fileName[this.num]);
  }



  getData(name) {
    this.spinner.show();
    this.appService.getData(name).subscribe(
      data => {
        // this.originalHtml = data;
        this.content = data;
        const ind = this.content.indexOf('div');
    // let i = 100; let pos = 0;
        this.content = this.content.slice(0, ind + 3) + ' ' + 'contenteditable="true"' + this.content.slice(ind + 3);
    // while (pos !== -1) {
    //   pos = content.indexOf('class', i + 1);
    //   if (pos !== -1) {
    //     content = content.slice(0, pos) + ' ' + 'ngDraggable' + ' ' + content.slice(pos);
    //   }
    //   i = content.indexOf('class', i + 1) + 1;
    // }
    // content = content.split('class="table ').join('ngDraggable class="table ');
    // content = content.split('class=""').join('ngDraggable class=""');
    // content = content.split('class="form-control"').join('ngDraggable class="form-control"');
    // content = content.split('class="btn ').join('ngDraggable class="btn ');
    // content = content.split('class="img-fluid"').join('ngDraggable class="img-fluid"');
        this.content = this.content.slice(0, 100) + this.content.slice(100).split('id=').join('ngDraggable id=');
        this.content = this.content.split('sendData($event)').join('context.sendData($event)');
        this.spinner.hide();
      },
      err => {
        console.log(err);
      }
    );
  }

  prev() {
    if (this.num - 1 >= 0) {
      this.num -= 1;
      this.getData(this.fileName[this.num]);
    }
  }

  next() {
    if (this.num + 1 < this.fileName.length) {
      this.num += 1;
      this.getData(this.fileName[this.num]);
    }
  }

  save() {
    const doc = document.getElementById('code');
    const doc1 = doc.children[0].children;
    for(let m=0 ; m < doc1.length; m++) {
      let docm = doc1[m].children;
      for (let d = 0; d < docm.length; d++) {
        // tslint:disable-next-line: max-line-length
        docm[d]['style'].top = (+(docm[d]['style'].top.match(/(-?[0-9\.]+)/g)[0])) + (+(docm[d]['style'].transform.match(/(-?[0-9\.]+)/g)[1])) + 'px';
        // tslint:disable-next-line: max-line-length
        docm[d]['style'].left = (+(docm[d]['style'].left.match(/(-?[0-9\.]+)/g)[0])) + (+(docm[d]['style'].transform.match(/(-?[0-9\.]+)/g)[0])) + 'px';
      }
    }
    let doc2 = doc.outerHTML;
    doc2 = doc2.split('contenteditable="true"').join('');
    doc2 = doc2.split('ng-reflect-ng-draggable=""').join('');
    doc2 = doc2.split('ngdraggable=""').join('');
    doc2 = doc2.split('ng-draggable').join('');
    doc2 = doc2.split(/transform: translate\(\-?\d*\.?\d*px, \-?\d*\.?\d*px\);/).join('');
    doc2 = doc2.split('context.sendData($event)').join('sendData($event)');
    // doc2 = doc2.split(/transform: translate\(\-?\d*\.?\d*px, \-?\d*\.?\d*px\);/).join('');
    console.log(doc1);
    this.appService
      .update({
        fileName: this.fileName[this.num],
        code: doc2
      })
      .subscribe(
        () => {
          this.getData(this.fileName[this.num]);
          this.spinner.hide();
        },
        err => {
          this.spinner.hide();
          console.log(err);
        }
      );
  }
}
