import { Component, OnInit, Input, ViewEncapsulation, AfterViewChecked, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { AngularDraggableModule } from 'angular2-draggable';
import {
  MatMenuTrigger, MatMenuModule, MatSidenavModule, MatIconModule, MatFormFieldModule, MatSlideToggleModule, MatInputModule, MatButtonModule, MatSelectModule, MatChipsModule, MatListModule, MatRadioModule, MatCheckboxModule
} from '@angular/material';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { AppService } from '../app.service';
@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SampleComponent implements OnInit, AfterViewChecked, OnChanges {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

@Input()
  data: any;
  dataModule: any = {
    // schemas: [CUSTOM_ELEMENTS_SCHEMA],
    // declarations: [],
    imports: [
  AngularDraggableModule,
  MatMenuModule,
  MatSidenavModule,
  MatIconModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatChipsModule,
  MatListModule,
  MatCheckboxModule,
    MatRadioModule
    ],
    exports: []
  };
  public option;
  ddOptions = [];
  labelClasses = { post: 'badge badge-primary', get: 'badge badge-success',
  put: 'badge badge-warning', delete: 'badge badge-danger'};
  open = false;
  existingApiList = [{ action: '/api/store', method: 'post'}, { action: '/api/gather', method: 'get'},
  { action: '/api/alter', method: 'put'}, { action: '/api/remove', method: 'delete'}];
   newApiList = [{ action: '/newApi/sample', method: 'post'}, { action: '/newApi/connect', method: 'get'},
   { action: '/newApi/trial', method: 'put'}, { action: '/newApi/service', method: 'delete'}];
   baseURL = 'http://localhost:8080';
  elementGetFunctions = { dropdown: this.getDropDownProps, radio: this.getRadioCheckboxProps,
    checkbox: this.getRadioCheckboxProps, textbox: this.getTextboxProps, calendar: this.getCalendarProps,
    image: this.getImageProps, link: this.getLinkProps, table: this.getTableProps,
    button: this.getButtonProps, label: this.getLabelProps
  };
  elementSetFunctions = { dropdown: this.setDropDownProps, radio: this.setRadioCheckboxProps,
    checkbox: this.setRadioCheckboxProps, textbox: this.setTextboxProps, calendar: this.setCalendarProps,
    image: this.setImageProps, link: this.setLinkProps, table: this.setTableProps,
    button: this.setButtonProps, label: this.setLabelProps
  };
  elementProps = {};
  styleProps = [];

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };
  previousId = '';
  matMenuState = false;

  constructor(private appService: AppService) {}
  ngOnInit(): void {
  }
  handleCompileErrorHandler(error: Error) {
    console.error(error);
  }
  sendData(event) {
    const data1 = new FormData(event.path[2]);
    const object = {};
    data1.forEach((value, key) => {
    if (!Reflect.has(object, key)) {
        object[key] = value;
        return;
    }
    if (!Array.isArray(object[key])) {
        object[key] = [object[key]];
    }
    object[key].push(value);
  });
    this.appService.sendReq(event.target.formMethod, event.target.formAction, object)
    .subscribe((data) => {
      console.log(JSON.stringify(data));
      alert(JSON.stringify(data));
    }, (err) => {
      console.error(err);
      alert(err.status + ' - ' + err.statusText);
    }
    );
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.open = false;
  }


  ngAfterViewChecked(): void {
    const selectElements = document.getElementsByTagName('select');
    const inputElements = document.getElementsByTagName('input');
    const pElements = document.getElementsByTagName('p');
    const imgElements = document.getElementsByTagName('img');
    const aElements = document.getElementsByTagName('a');
    const buttonElements = document.getElementsByTagName('button');
    const tableElements = document.getElementsByTagName('table');
    const labelElements = document.getElementsByTagName('label');
    Array.from(pElements).forEach((element, index) => {
      element.addEventListener('contextmenu', this.onContextMenu.bind(this, element.id, this.contextMenuPosition, this.contextMenu));
    });
    Array.from(inputElements).forEach((element, index) => {
      element.addEventListener('contextmenu', this.onContextMenu.bind(this, element.id, this.contextMenuPosition, this.contextMenu));
    });
    Array.from(imgElements).forEach((element, index) => {
      element.addEventListener('contextmenu', this.onContextMenu.bind(this, element.id, this.contextMenuPosition, this.contextMenu));
    });
    Array.from(aElements).forEach((element, index) => {
      element.addEventListener('contextmenu', this.onContextMenu.bind(this, element.id, this.contextMenuPosition, this.contextMenu));
    });
    Array.from(selectElements).forEach((element, index) => {
      element.addEventListener('contextmenu', this.onContextMenu.bind(this, element.id, this.contextMenuPosition, this.contextMenu));
    });
    Array.from(buttonElements).forEach((element, index) => {
      element.addEventListener('contextmenu', this.onContextMenu.bind(this, element.id, this.contextMenuPosition, this.contextMenu));
    });
    Array.from(tableElements).forEach((element, index) => {
      element.addEventListener('contextmenu', this.onContextMenu.bind(this, element.id, this.contextMenuPosition, this.contextMenu));
    });
    Array.from(labelElements).forEach((element, index) => {
      element.addEventListener('contextmenu', this.onContextMenu.bind(this, element.id, this.contextMenuPosition, this.contextMenu));
    });
  }

  onContextMenu(sourceElementID, contextMenuPosition, contextMenu, event: MouseEvent) {
    const selectdiv = sourceElementID;
    event.preventDefault();
    this.option = '';
    if (selectdiv !== '' && selectdiv !== undefined ) {
      if (!this.open) {
        contextMenuPosition.x = event.clientX + 'px';
        contextMenuPosition.y = event.clientY + 'px';
        contextMenu.menuData = { src: selectdiv};
        if (selectdiv.split(/[0-9+]/)[0] === 'dropdown') {
          contextMenu.menu.focusFirstItem('mouse');
          this.dropDown(selectdiv);
        }
        contextMenu.openMenu();
      } else {
        const call = selectdiv.split(/[0-9+]/)[0];
        let sample = {};
        this.elementProps = {};
        this.styleProps = [];
        sample = this.elementGetFunctions[call](selectdiv);
        this.elementProps = sample['props'];
        this.styleProps = sample['prop'];
      }
      if (this.previousId !== '') {
        this.clearClass();
      }
      if (!document.getElementById(selectdiv).className.includes('context')) {
        document.getElementById(selectdiv).className += ' context';
        document.getElementById(selectdiv).blur();
        this.previousId = selectdiv;
      }
    }
  }

  clearClass() {
    document.getElementById(this.previousId).className = document.getElementById(this.previousId).className.split(' context').join('');
  }

  styleChange() {
    if (!this.open && !this.matMenuState) {
      this.clearClass();
    }
  }

  dropDown(id) {
    const dd = document.getElementById(id) as HTMLSelectElement;
    this.ddOptions = Array.from(dd.options).map(op => op.label);
  }

  dropdownValidate(id) {
    if (id.split(/[0-9+]/)[0] === 'dropdown') {
      return true;
    } else {
      return false;
    }
  }

  addOption(src: string) {
    if (this.option !== '' && this.option !== undefined) {
      const dd = document.getElementById(src) as HTMLSelectElement;
      const op1 = document.createElement('option');
      op1.text = this.option;
      op1.value = this.option;
      dd.add(op1);
      // document.getElementById(src).innerHTML += '<option >' + this.option + '</option>';
    // ("afterend",)
      this.option = '';
    }
  }

  deleteOption(id, index) {
    const dd = document.getElementById(id) as HTMLSelectElement;
    dd.options.remove(index);
    this.dropDown(id);
  }

  close() {
    this.open = false;
    this.elementProps = {};
    this.styleProps = [];
  }

  addStyleProperty(name, value) {
    this.elementProps['style'][name] = value;
    this.styleProps.push(name);
    this.propertySet(this.elementProps['id']);
  }

  deleteStylePropsrty(name) {
    this.styleProps.splice(this.styleProps.indexOf(name), 1);
    this.elementProps['style'][name] = '';
  }

  propertyGet(id) {
   const call = id.split(/z?[0-9+]/)[0];
   let sample = {};
   this.elementProps = {};
   this.styleProps = [];
   sample = this.elementGetFunctions[call](id);
   this.elementProps = sample['props'];
   this.styleProps = sample['prop'];
  //  console.log(this.elementProps);
   this.open = true;
  }

  propertySet(id) {
    const call = id.split(/[0-9+]/)[0];
    this.elementSetFunctions[call](id, this.elementProps, this.baseURL);
    // this.close();
  }

  getDropDownProps(id) {
    const props = {};
    const prop = [];
    props['id'] = id;
    props['name'] = id.split(/[0-9+]/)[0].replace(/^./, s => s.toUpperCase());
    const dd = document.getElementById(id) as HTMLSelectElement;
    props['class'] = dd.className;
    props['style'] = dd.style;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < props['style'].length; i++) {
      prop.push(props['style'][i]);
    }
    props['title'] = dd.title;
    props['pname'] = dd.name;
    props['multiple'] = dd.multiple;
    props['required'] = dd.required;
    return {props, prop};
  }

  setDropDownProps(id, modProps) {
    const dd = document.getElementById(id) as HTMLSelectElement;
    dd.className = modProps['class'];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < modProps.length; i++) {
        dd.style[modProps[i]] = modProps[modProps[i]];
    }
    // dd.style.cssText = modProps['style'];
    dd.title = modProps['title'];
    dd.name = modProps['pname'];
    dd.multiple = modProps['multiple'];
    dd.required = modProps['required'];
  }

  getRadioCheckboxProps(id) {
    const props = {};
    const prop = [];
    props['id'] = id;
    props['name'] = id.split(/[0-9+]/)[0].replace(/^./, s => s.toUpperCase());
    const rc = document.getElementById(id) as HTMLParagraphElement;
    props['class'] = rc.className;
    props['style'] = rc.style;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < props['style'].length; i++) {
      prop.push(props['style'][i]);
    }
    props['title'] = rc.title;
    const irc = rc.children[0] as HTMLInputElement;
    props['value'] = irc.value;
    props['pname'] = irc.name;
    props['required'] = irc.required;
    return {props, prop};
  }

  setRadioCheckboxProps(id, modProps) {
    const rc = document.getElementById(id) as HTMLParagraphElement;
    rc.className = modProps['class'];
    // rc.style.cssText = modProps['style'];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < modProps.length; i++) {
      rc.style[modProps[i]] = modProps[modProps[i]];
  }
    rc.title = modProps['title'];
    const irc = rc.children[0] as HTMLInputElement;
    irc.value = modProps['value'];
    irc.name = modProps['pname'];
    irc.required = modProps['required'];
  }

  getTextboxProps(id) {
    const props = {};
    const prop = [];
    props['id'] = id;
    props['name'] = id.split(/[0-9+]/)[0].replace(/^./, s => s.toUpperCase());
    const tb = document.getElementById(id) as HTMLInputElement;
    props['class'] = tb.className;
    props['style'] = tb.style;
    for (let i = 0; i < props['style'].length; i++) {
      prop.push(props['style'][i]);
    }
    props['title'] = tb.title;
    props['pname'] = tb.name;
    props['placeholder'] = tb.placeholder;
    props['readonly'] = tb.readOnly;
    props['required'] = tb.required;
    props['type'] = tb.type;
    props['pattern'] = tb.pattern;
    props['value'] = tb.value;
    return {props, prop};
  }

  setTextboxProps(id, modProps) {
    const tb = document.getElementById(id) as HTMLInputElement;
    tb.className = modProps['class'];
    // tb.style.cssText = modProps['style'];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < modProps.length; i++) {
      tb.style[modProps[i]] = modProps[modProps[i]];
  }
    tb.title = modProps['title'];
    tb.name = modProps['pname'];
    tb.placeholder = modProps['placeholder'];
    tb.readOnly = modProps['readonly'];
    tb.required = modProps['required'];
    tb.type = modProps['type'];
    tb.pattern = modProps['pattern'];
    tb.value = modProps['value'];
  }

  getCalendarProps(id) {
    const props = {};
    const prop = [];
    props['id'] = id;
    props['name'] = id.split(/[0-9+]/)[0].replace(/^./, s => s.toUpperCase());
    const cal = document.getElementById(id) as HTMLInputElement;
    props['class'] = cal.className;
    props['style'] = cal.style;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < props['style'].length; i++) {
      prop.push(props['style'][i]);
    }
    props['title'] = cal.title;
    props['pname'] = cal.name;
    props['required'] = cal.required;
    props['readonly'] = cal.readOnly;
    props['value'] = cal.value;
    props['max'] = cal.max;
    props['min'] = cal.min;
    return {props, prop};
  }

  setCalendarProps(id, modProps) {
    const cal = document.getElementById(id) as HTMLInputElement;
    cal.className = modProps['class'];
    // cal.style.cssText = modProps['style'];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < modProps.length; i++) {
      cal.style[modProps[i]] = modProps[modProps[i]];
  }
    cal.title = modProps['title'];
    cal.name = modProps['pname'];
    cal.required = modProps['required'];
    cal.readOnly = modProps['readonly'];
    cal.value = modProps['value'];
    cal.max = modProps['max'];
    cal.min = modProps['min'];
  }

  getImageProps(id) {
    const props = {};
    const prop = [];
    props['id'] = id;
    props['name'] = id.split(/[0-9+]/)[0].replace(/^./, s => s.toUpperCase());
    const img = document.getElementById(id) as HTMLImageElement;
    props['class'] = img.className;
    props['style'] = img.style;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < props['style'].length; i++) {
      prop.push(props['style'][i]);
    }
    props['title'] = img.title;
    props['src'] = img.src;
    props['alt'] = img.alt;
    props['height'] = img.height;
    props['width'] = img.width;
    return {props, prop};
  }

  setImageProps(id, modProps) {
    const img = document.getElementById(id) as HTMLImageElement;
    img.className = modProps['class'];
    // img.style.cssText = modProps['style'];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < modProps.length; i++) {
      img.style[modProps[i]] = modProps[modProps[i]];
  }
    img.title = modProps['title'];
    img.src = modProps['src'];
    img.alt = modProps['alt'];
    img.height = modProps['height'];
    img.width = modProps['width'];
  }

  getLinkProps(id) {
    const props = {};
    const prop = [];
    props['id'] = id;
    props['name'] = id.split(/[0-9+]/)[0].replace(/^./, s => s.toUpperCase());
    const link = document.getElementById(id) as HTMLAnchorElement;
    props['class'] = link.className;
    props['style'] = link.style;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < props['style'].length; i++) {
      prop.push(props['style'][i]);
    }
    props['title'] = link.title;
    props['href'] = link.href;
    props['target'] = link.target;
    return {props, prop};
  }

  setLinkProps(id, modProps) {
    const link = document.getElementById(id) as HTMLAnchorElement;
    link.className = modProps['class'];
    // link.style.cssText = modProps['style'];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < modProps.length; i++) {
      link.style[modProps[i]] = modProps[modProps[i]];
  }
    link.title = modProps['title'];
    link.href = modProps['href'];
    link.target = modProps['target'];
  }

  getTableProps(id) {
    const props = {};
    const prop = [];
    props['id'] = id;
    props['name'] = id.split(/[0-9+]/)[0].replace(/^./, s => s.toUpperCase());
    const table = document.getElementById(id) as HTMLTableElement;
    props['class'] = table.className;
    props['style'] = table.style;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < props['style'].length; i++) {
      prop.push(props['style'][i]);
    }
    props['title'] = table.title;
    return {props, prop};
  }

  setTableProps(id, modProps) {
    const table = document.getElementById(id) as HTMLTableElement;
    table.className = modProps['class'];
    // table.style.cssText = modProps['style'];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < modProps.length; i++) {
      table.style[modProps[i]] = modProps[modProps[i]];
  }
    table.title = modProps['title'];
  }

  getButtonProps(id) {
    const props = {};
    const prop = [];
    props['id'] = id;
    props['name'] = id.split(/[0-9+]/)[0].replace(/^./, s => s.toUpperCase());
    const button = document.getElementById(id) as HTMLButtonElement;
    props['class'] = button.className;
    props['style'] = button.style;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < props['style'].length; i++) {
      prop.push(props['style'][i]);
    }
    props['title'] = button.title;
    props['type'] = button.type;
    props['formmethod'] = button.formMethod;
    // tslint:disable-next-line: max-line-length
    props['formaction'] = button.formAction.split(/http[s]?:\/\/(?:localhost|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))?(?:\:[0-9]{1,4})?/)[1];
    props['formtarget'] = button.formTarget;
    return {props, prop};
  }

  setButtonProps(id, modProps, baseURL) {
    const button = document.getElementById(id) as HTMLButtonElement;
    button.className = modProps['class'];
    // button.style.cssText = modProps['style'];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < modProps.length; i++) {
      button.style[modProps[i]] = modProps[modProps[i]];
  }
    button.title = modProps['title'];
    button.type = modProps['type'];
    button.formMethod = modProps['formmethod'];
    button.formAction = baseURL + modProps['formaction'];
    button.formTarget = modProps['formtarget'];
  }

  getLabelProps(id) {
    const props = {};
    const prop = [];
    props['id'] = id;
    props['name'] = id.split(/[0-9+]/)[0].replace(/^./, s => s.toUpperCase());
    const label = document.getElementById(id) as HTMLLabelElement;
    props['class'] = label.className;
    props['style'] = label.style;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < props['style'].length; i++) {
      prop.push(props['style'][i]);
    }
    props['title'] = label.title;
    return {props, prop};
  }

  setLabelProps(id, modProps) {
    const label = document.getElementById(id) as HTMLLabelElement;
    label.className = modProps['class'];
    // label.style.cssText = modProps['style'];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < modProps.length; i++) {
      label.style[modProps[i]] = modProps[modProps[i]];
  }
    label.title = modProps['title'];
  }

}
