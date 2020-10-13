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
  tb = 1;
  lb = 1;
  dd = 1;
  cal = 1;
  but = 1;
  fileName = [
    'Caar.html',
    'Carr.html',
    'CarRent.html',
    'CarRental.html',
    'sample.html',
    // 'CarRentals.html',
    // 'CarRentals1.html',
    // 'img20.html',
    // 'material.html'
  ];
  ngOnInit(): void {
    this.getData(this.fileName[this.num]);
  }



  getData(name) {
    this.spinner.show();
    this.appService.getData(name).subscribe(
      data => {
        // this.originalHtml = data;
        this.content = this.preprocess(data);
        this.spinner.hide();
      },
      err => {
        console.log(err);
      }
    );
  }

  preprocess(content) {
    const ind = content.indexOf('div');
    // let i = 100; let pos = 0;
    content = content.slice(0, ind + 3) + ' ' + 'contenteditable="true"' + content.slice(ind + 3);
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
    content = content.slice(0, 100) + content.slice(100).split('id=').join('ngDraggable id=');
    content = content.split('sendData($event)').join('context.sendData($event)');
    return content;
  }

  postprocess() {
    const doc = document.getElementById('code');
    const doc1 = (Array.from(doc.children).filter(e => e.nodeName === 'FORM'))[0].children;
    for (let m = 0; m < doc1.length; m++) {
      const docm = doc1[m].children;
      for (let d = 0; d < docm.length; d++) {
        // tslint:disable-next-line: max-line-length
        docm[d].children[0]['style'].top = (+(docm[d].children[0]['style'].top.match(/(-?[0-9\.]+)/g)[0])) + (+(docm[d].children[0]['style'].transform.match(/(-?[0-9\.]+)/g)[1])) + 'px';
        // tslint:disable-next-line: max-line-length
        docm[d].children[0]['style'].left = (+(docm[d].children[0]['style'].left.match(/(-?[0-9\.]+)/g)[0])) + (+(docm[d].children[0]['style'].transform.match(/(-?[0-9\.]+)/g)[0])) + 'px';
      }
    }
    Array.from(doc.children).map(( v ) => {
      if (v.nodeName !== 'FORM') {
        console.log('Working');
         // tslint:disable-next-line: max-line-length
        v['style'].top = (+(v['style'].top.match(/(-?[0-9\.]+)/g)[0])) + (+(v['style'].transform.match(/(-?[0-9\.]+)/g)[1])) + 'px';
        // tslint:disable-next-line: max-line-length
        v['style'].left = (+(v['style'].left.match(/(-?[0-9\.]+)/g)[0])) + (+(v['style'].transform.match(/(-?[0-9\.]+)/g)[0])) + 'px';
        const div = document.createElement('div');
        div.className = 'col';
        div.append(v);
        let checkr = 0;
        const rnele =  +v['style'].top.match(/(-?[0-9\.]+)/g)[0];
        for (let r = 0; r < doc1.length; r++) {
          const rEle = +doc1[r].children[0].children[0]['style'].top.match(/(-?[0-9\.]+)/g)[0];
          if (rEle - 30 < rnele && rnele < rEle + 30) {
            const docc = doc1[r].children;
            let checkc = 0;
            let cnele = +v['style'].left.match(/(-?[0-9\.]+)/g)[0];
            for (let c = 0; c < docc.length; c++) {
              const cEle = +docc[c].children[0]['style'].left.match(/(-?[0-9\.]+)/g)[0];
              // console.log(+docc[c].children[0]['style'].width.match(/(-?[0-9\.]+)/g)[0]);
              if (cEle > cnele) {
                doc1[r].insertBefore(div, docc[c]);
                console.log(div);
                console.log(v);
                break;
              }
              console.log(cnele);
              cnele -= 983 / docc.length;
              console.log(cnele);
              checkc = c;
            }
            if (checkc === docc.length - 1) {
              console.log(checkc);
              doc1[r].appendChild(div);
            }
            console.log(rEle + '  ' + rnele);
            console.log(r + 'th row');
            break;
          } else if (rEle > rnele) {
            const divR = document.createElement('div');
            divR.className = 'row';
            divR.append(div);
            doc.children[doc.children.length - 1].insertBefore(divR, doc1[r]);
            break;
          }
          checkr = r;
        }
        if (checkr === doc1.length - 1) {
          const divS = document.createElement('div');
          divS.className = 'row';
          divS.append(div);
          doc.children[doc.children.length - 1].appendChild(divS);
        }
      }
    });
    let doc2 = doc.outerHTML;
    doc2 = doc2.split('contenteditable="true"').join('');
    doc2 = doc2.split('ng-reflect-ng-draggable=""').join('');
    doc2 = doc2.split('ngdraggable=""').join('');
    doc2 = doc2.split('ng-draggable').join('');
    doc2 = doc2.split(/transform: translate\(\-?\d*\.?\d*px, \-?\d*\.?\d*px\);/).join('');
    doc2 = doc2.split('context.sendData($event)').join('sendData($event)');
    return doc2;
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
    const doc = this.postprocess();
    // doc2 = doc2.split(/transform: translate\(\-?\d*\.?\d*px, \-?\d*\.?\d*px\);/).join('');
    this.appService
      .update({
        fileName: this.fileName[this.num],
        code: doc
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

  addTextbox() {
    this.content = this.postprocess();
    // console.log(this.content);
    const ele = '<input class="form-control" id="textboxz' + this.tb + '" name="textbox" style="top: 255px; left: 492px;'
    + ' position: absolute; width: 20%" type="text"/>';
    this.tb += 1;
    this.content = this.preprocess(this.content.slice(0, this.content.indexOf('>') + 1) + ele + this.content.slice(this.content.indexOf('>')
     + 1));
    // console.log(this.content);
  }

  addLabel() {
    this.content = this.postprocess();
    const ele = '<label class="" id="labelz' + this.lb + '" style="top: 255px; left: 492px; position: absolute;">Label</label>';
    this.lb += 1;
    this.content = this.preprocess(this.content.slice(0, this.content.indexOf('>') + 1) + ele + this.content.slice(this.content.indexOf('>')
    + 1));
  }

  addDropdown() {
    this.content = this.postprocess();
    const ele = '<select class="form-control" id="dropdownz' + this.dd + '" name="Label" style="top: 255px; left: 492px;'
    + ' position: absolute; width: 20%" ><option value="Dropdown">Dropdown</option></select>';
    this.dd += 1;
    this.content = this.preprocess(this.content.slice(0, this.content.indexOf('>') + 1) + ele + this.content.slice(this.content.indexOf('>')
    + 1));
  }

  addCalendar() {
    this.content = this.postprocess();
    const ele = '<input class="form-control" id="calendarz' + this.cal + '" name="calendar" style="top: 255px; left: 492px;'
    + ' position: absolute; width: 20%" type="date" />';
    this.cal += 1;
    this.content = this.preprocess(this.content.slice(0, this.content.indexOf('>') + 1) + ele + this.content.slice(this.content.indexOf('>')
    + 1));
  }

  addButton() {
    this.content = this.postprocess();
    const ele = '<button (click)="sendData($event)" class="btn btn-primary" id="buttonz' + this.but + '" style="top: 255px;'
    + ' left: 492px; position: absolute" type="button">Button</button>';
    this.but += 1;
    this.content = this.preprocess(this.content.slice(0, this.content.indexOf('>') + 1) + ele + this.content.slice(this.content.indexOf('>')
    + 1));
  }
}
