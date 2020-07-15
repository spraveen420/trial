import { Component, OnInit, Input, ViewEncapsulation, AfterViewChecked, ViewChild } from '@angular/core';
import { AngularDraggableModule } from 'angular2-draggable';
import {
  MatMenuTrigger
} from '@angular/material';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SampleComponent implements OnInit, AfterViewChecked {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

@Input()
  data: any;
  dataModule: any = {
    // schemas: [CUSTOM_ELEMENTS_SCHEMA],
    // declarations: [],
    imports: [
  AngularDraggableModule,
    ],
    exports: []
  };
  public option;
  ddOptions = [];
  labelClasses = ['badge badge-primary', 'badge badge-success', 'badge badge-info',
  'badge badge-warning'];
  open = false;
  elementGetFunctions = { dropdown: this.getDropDownProps, radio: this.getRadioCheckboxProps,
    checkbox: this.getRadioCheckboxProps, textbox: this.getTextboxProps, calendar: this.getCalendarProps,
    image: this.getImageProps, link: this.getLinkProps, table: this.getTableProps,
    button: this.getButtonProps
  };
  elementSetFunctions = { dropdown: this.setDropDownProps, radio: this.setRadioCheckboxProps,
    checkbox: this.setRadioCheckboxProps, textbox: this.setTextboxProps, calendar: this.setCalendarProps,
    image: this.setImageProps, link: this.setLinkProps, table: this.setTableProps,
    button: this.setButtonProps
  };
  elementProps = {};

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };


  ngOnInit(): void {
  }
  handleCompileErrorHandler(error: Error) {
    console.error(error);
  }


  ngAfterViewChecked(): void {
    const selectElements = document.getElementsByTagName('select');
    const inputElements = document.getElementsByTagName('input');
    const pElements = document.getElementsByTagName('p');
    const imgElements = document.getElementsByTagName('img');
    const aElements = document.getElementsByTagName('a');
    const buttonElements = document.getElementsByTagName('button');
    const tableElements = document.getElementsByTagName('table');
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

    // for (let i = 0; i < selectElements.length; i++) {
      // console.log("id",selectElements.item(i).id)
      // tslint:disable-next-line: max-line-length
      // selectElements.item(i).addEventListener('contextmenu', this.onContextMenu.bind(this, selectElements.item(i).id, this.contextMenuPosition, this.contextMenu));
      // selectElements.item(i).setAttribute('title', 'Right click to add options');
    // }
  }
  constructor() {}

  onContextMenu(sourceElementID, contextMenuPosition, contextMenu, event: MouseEvent) {
    const selectdiv = sourceElementID;
    event.preventDefault();
    contextMenuPosition.x = event.clientX + 'px';
    contextMenuPosition.y = event.clientY + 'px';
    contextMenu.menuData = { src: selectdiv};
    if (selectdiv.split(/[0-9+]/)[0] === 'dropdown') {
      contextMenu.menu.focusFirstItem('mouse');
      this.dropDown(selectdiv);
    }
    contextMenu.openMenu();
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
  }

  propertyGet(id) {
   const call = id.split(/[0-9+]/)[0];
   this.elementProps = {};
   this.elementProps = this.elementGetFunctions[call](id);
   console.log(this.elementProps);
   this.open = true;
  }

  propertySet(id) {
    const call = id.split(/[0-9+]/)[0];
    this.elementSetFunctions[call](id, this.elementProps);
    this.close();
  }

  getDropDownProps(id) {
    const props = {};
    props['id'] = id;
    props['name'] = id.split(/[0-9+]/)[0].replace(/^./, s => s.toUpperCase());
    const dd = document.getElementById(id) as HTMLSelectElement;
    props['class'] = dd.className;
    props['style'] = dd.style.cssText;
    props['title'] = dd.title;
    props['pname'] = dd.name;
    props['multiple'] = dd.multiple;
    props['required'] = dd.required;
    return props;
  }

  setDropDownProps(id, modProps) {
    const dd = document.getElementById(id) as HTMLSelectElement;
    dd.className = modProps['class'];
    dd.style.cssText = modProps['style'];
    dd.title = modProps['title'];
    dd.name = modProps['pname'];
    dd.multiple = modProps['multiple'];
    dd.required = modProps['required'];
  }

  getRadioCheckboxProps(id) {
    const props = {};
    props['id'] = id;
    props['name'] = id.split(/[0-9+]/)[0].replace(/^./, s => s.toUpperCase());
    const rc = document.getElementById(id) as HTMLParagraphElement;
    props['class'] = rc.className;
    props['style'] = rc.style.cssText;
    props['title'] = rc.title;
    const irc = rc.children[0] as HTMLInputElement;
    props['value'] = irc.value;
    props['pname'] = irc.name;
    props['required'] = irc.required;
    return props;
  }

  setRadioCheckboxProps(id, modProps) {
    const rc = document.getElementById(id) as HTMLParagraphElement;
    rc.className = modProps['class'];
    rc.style.cssText = modProps['style'];
    rc.title = modProps['title'];
    const irc = rc.children[0] as HTMLInputElement;
    irc.value = modProps['value'];
    irc.name = modProps['pname'];
    irc.required = modProps['required'];
  }

  getTextboxProps(id) {
    const props = {};
    props['id'] = id;
    props['name'] = id.split(/[0-9+]/)[0].replace(/^./, s => s.toUpperCase());
    const tb = document.getElementById(id) as HTMLInputElement;
    props['class'] = tb.className;
    props['style'] = tb.style.cssText;
    props['title'] = tb.title;
    props['pname'] = tb.name;
    props['placeholder'] = tb.placeholder;
    props['readonly'] = tb.readOnly;
    props['required'] = tb.required;
    props['type'] = tb.type;
    props['pattern'] = tb.pattern;
    props['value'] = tb.value;
    return props;
  }

  setTextboxProps(id, modProps) {
    const tb = document.getElementById(id) as HTMLInputElement;
    tb.className = modProps['class'];
    tb.style.cssText = modProps['style'];
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
    props['id'] = id;
    props['name'] = id.split(/[0-9+]/)[0].replace(/^./, s => s.toUpperCase());
    const cal = document.getElementById(id) as HTMLInputElement;
    props['class'] = cal.className;
    props['style'] = cal.style.cssText;
    props['title'] = cal.title;
    props['pname'] = cal.name;
    props['required'] = cal.required;
    props['readonly'] = cal.readOnly;
    props['value'] = cal.value;
    props['max'] = cal.max;
    props['min'] = cal.min;
    return props;
  }

  setCalendarProps(id, modProps) {
    const cal = document.getElementById(id) as HTMLInputElement;
    cal.className = modProps['class'];
    cal.style.cssText = modProps['style'];
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
    props['id'] = id;
    props['name'] = id.split(/[0-9+]/)[0].replace(/^./, s => s.toUpperCase());
    const img = document.getElementById(id) as HTMLImageElement;
    props['class'] = img.className;
    props['style'] = img.style.cssText;
    props['title'] = img.title;
    props['src'] = img.src;
    props['alt'] = img.alt;
    props['height'] = img.height;
    props['width'] = img.width;
    return props;
  }

  setImageProps(id, modProps) {
    const img = document.getElementById(id) as HTMLImageElement;
    img.className = modProps['class'];
    img.style.cssText = modProps['style'];
    img.title = modProps['title'];
    img.src = modProps['src'];
    img.alt = modProps['alt'];
    img.height = modProps['height'];
    img.width = modProps['width'];
  }

  getLinkProps(id) {
    const props = {};
    props['id'] = id;
    props['name'] = id.split(/[0-9+]/)[0].replace(/^./, s => s.toUpperCase());
    const link = document.getElementById(id) as HTMLAnchorElement;
    props['class'] = link.className;
    props['style'] = link.style.cssText;
    props['title'] = link.title;
    props['href'] = link.href;
    props['target'] = link.target;
    return props;
  }

  setLinkProps(id, modProps) {
    const link = document.getElementById(id) as HTMLAnchorElement;
    link.className = modProps['class'];
    link.style.cssText = modProps['style'];
    link.title = modProps['title'];
    link.href = modProps['href'];
    link.target = modProps['target'];
  }

  getTableProps(id) {
    const props = {};
    props['id'] = id;
    props['name'] = id.split(/[0-9+]/)[0].replace(/^./, s => s.toUpperCase());
    const table = document.getElementById(id) as HTMLTableElement;
    props['class'] = table.className;
    props['style'] = table.style.cssText;
    props['title'] = table.title;
    return props;
  }

  setTableProps(id, modProps) {
    const table = document.getElementById(id) as HTMLTableElement;
    table.className = modProps['class'];
    table.style.cssText = modProps['style'];
    table.title = modProps['title'];
  }

  getButtonProps(id) {
    const props = {};
    props['id'] = id;
    props['name'] = id.split(/[0-9+]/)[0].replace(/^./, s => s.toUpperCase());
    const button = document.getElementById(id) as HTMLButtonElement;
    props['class'] = button.className;
    props['style'] = button.style.cssText;
    props['title'] = button.title;
    props['type'] = button.type;
    props['formmethod'] = button.formMethod;
    props['formaction'] = button.formAction;
    props['formtarget'] = button.formTarget;
    return props;
  }

  setButtonProps(id, modProps) {
    const button = document.getElementById(id) as HTMLButtonElement;
    button.className = modProps['class'];
    button.style.cssText = modProps['style'];
    button.title = modProps['title'];
    button.type = modProps['type'];
    button.formMethod = modProps['formmethod'];
    button.formAction = modProps['formaction'];
    button.formTarget = modProps['formtarget'];
  }

}
