import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooster-icon',
  templateUrl: './rooster-icon.component.html',
  styleUrls: ['./rooster-icon.component.scss'],
})
export class RoosterIconComponent implements OnInit {

  @Input() value;

  constructor() { }

  ngOnInit() {}

  getColor(): string {
    const color = this.value === '1' ? 'primary' : 'danger';
    return color;
  }
}
