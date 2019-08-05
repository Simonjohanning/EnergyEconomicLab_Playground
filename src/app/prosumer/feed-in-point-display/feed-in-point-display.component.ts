import {Component, Input, OnInit} from '@angular/core';
import {Coordinates} from '../../core/data-types/Coordinates';
import {Observable} from 'rxjs';
import {ProsumerInstance} from '../../core/data-types/ProsumerInstance';
import {ConcreteCoordinates} from '../../core/data-types/ConcreteCoordinates';
import {load} from '@angular/core/src/render3';

@Component({
  selector: 'app-feed-in-point-display',
  templateUrl: './feed-in-point-display.component.html',
  styleUrls: ['./feed-in-point-display.component.css']
})
export class FeedInPointDisplayComponent implements OnInit {

  @Input() prosumerObservable: Observable<ProsumerInstance>;
  public feedInPoint: ConcreteCoordinates;

  constructor() { }

  ngOnInit() {
    this.prosumerObservable.subscribe(loadedInstance => {
      this.feedInPoint = loadedInstance.feedInCoordinates;
    });
  }

}
