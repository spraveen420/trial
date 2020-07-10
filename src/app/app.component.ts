import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  constructor(private appService: AppService, public sanitize: DomSanitizer, private spinner: NgxSpinnerService) {
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

        const parser = new DOMParser();
        const el = parser.parseFromString(data, 'text/html');
        this.originalHtml = el.getElementById('div0');
        const num = this.content.indexOf('div');
        let i = 100; let pos = 0;
        this.content = this.content.slice(0, num + 3) + ' ' + 'contenteditable="true"' + this.content.slice(num + 3);
        while (pos !== -1) {
          pos = this.content.indexOf('class', i + 1);
          // console.log(pos);
          if (pos !== -1) {
            // this.content = this.content.slice(0, pos + 7 ) + ' ' + 'element' + ' ' + this.content.slice(pos + 7);
            this.content = this.content.slice(0, pos ) + ' ' + 'ngDraggable' + ' ' + this.content.slice(pos);
            // this.content = this.content.slice(0, pos ) + ' ' + 'rzHandles="all"' + ' ' + this.content.slice(pos);
            // this.content = this.content.slice(0, pos ) + ' ' + 'ngResizable' + ' ' + this.content.slice(pos);
          }
          i = this.content.indexOf('class', i + 1) + 1;
          // console.log(i);
        }
        // console.log(this.content);
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
    // this.spinner.show();
    let doc = document.getElementById('div0');
    // console.log(typeof doc);
    // console.log(doc);
    let doc1 = doc.children[0].children[0].children;
    let odoc = this.originalHtml.children[0].children[0].children;
    for (let d = 0; d < doc1.length; d++) {
      // tslint:disable-next-line: max-line-length
    doc1[d]['style'].top = (+(doc1[d]['style'].top.match(/(-?[0-9\.]+)/g)[0])) + (+(doc1[d]['style'].transform.match(/(-?[0-9\.]+)/g)[1])) + 'px';
    // tslint:disable-next-line: max-line-length
    doc1[d]['style'].left = (+(doc1[d]['style'].left.match(/(-?[0-9\.]+)/g)[0])) + (+(doc1[d]['style'].transform.match(/(-?[0-9\.]+)/g)[0])) + 'px';
    odoc[d]['style'].top = doc1[d]['style'].top;
    odoc[d]['style'].left = doc1[d]['style'].left;
    if (doc1[d].id.search(/(radio\d*|checkbox\d*|button\d*|link\d*|label\d*)/) === 0) {
      odoc[d].innerText = doc1[d]['innerText'];
      if (doc1[d].id.search(/(radio\d*|checkbox\d*)/) === 0) {
        odoc[d].setAttribute('value', doc1[d]['innerText']);
      }
      if (doc1[d].id.search(/link\d*/) === 0) {
        odoc[d].setAttribute('href', doc1[d]['innerText']);
      }
    }
    }
    console.log(odoc[0]);
    console.log(this.originalHtml);
    // let doc2 = doc.outerHTML.split('\n').join(' ');
    // doc2 = doc2.split('contenteditable="true"').join('');
    // doc2 = doc2.split('ng-reflect-ng-draggable=""').join('');
    // doc2 = doc2.split('ngdraggable=""').join('');
    // doc2 = doc2.split('ng-draggable').join('');
    // doc2 = doc2.split(/ transform: translate\(\-?\d*\.?\d*px, \-?\d*\.?\d*px\);/).join('');

    // this.appService
    //   .update({
    //     fileName: this.fileName[this.num],
    //     code: this.originalHtml
    //   })
    //   .subscribe(
    //     data => {
    //       console.log(data);
    //       this.getData(this.fileName[this.num]);
    //       // this.spinner.hide();
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
  }
}
