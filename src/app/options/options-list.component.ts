import {Component, OnInit} from '@angular/core';
import {Option} from '../shared/interfaces/option';
import {OptionsProvider} from '../services/options-provider/options-provider';
import {RouteConfig, RouterOutlet, RouteParams, Router} from '@angular/router-deprecated';
import {CanDeactivate, ComponentInstruction, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
  templateUrl: 'app/options/options-list.component.html',
  styleUrls: ['app/options/options-list.component.css'],
  directives: [ROUTER_DIRECTIVES],
})
export class OptionsListComponent implements OnInit {
  options: Option[];
  option: Option;

  constructor(
    private _optionsProvider: OptionsProvider,
    private _router: Router,
    private _routeParams: RouteParams
    ) {}

  ngOnInit() {
    let id = +this._routeParams.get('id');
    if (id) {
      this._optionsProvider.get(id).then(option => {
        this.option = option;
        this.options = this.option["children"];
      });
    } else {
      this._optionsProvider.getOptions().then(options => {
        this.options = options;
      });
    }
  }
}
