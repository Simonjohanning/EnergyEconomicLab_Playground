import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-feed-in-point-display',
  templateUrl: './feed-in-point-display.component.html',
  styleUrls: ['./feed-in-point-display.component.css']
})
export class FeedInPointDisplayComponent implements OnInit {

  @Input() feedInPoint: Coordinates;
  constructor() { }

  ngOnInit() {
  }

}
