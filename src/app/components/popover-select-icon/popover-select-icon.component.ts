import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-select-icon',
  templateUrl: './popover-select-icon.component.html',
  styleUrls: ['./popover-select-icon.component.scss'],
})
export class PopoverSelectIconComponent implements OnInit {

  @Input() popoverTitle;

  userIcon = null;
  cpuIcon = null;

  constructor(private readonly popoverController: PopoverController,) { }

  ngOnInit() {}

  selectUserIcon(event: any): void {
    this.userIcon = event;
    this.cpuIcon = event === 'X' ? 'O' : 'X';
    this.popoverController.dismiss({userIcon: this.userIcon, cpuIcon: this.cpuIcon});
  }
}
