import {
  it,
  iit,
  describe,
  ddescribe,
  expect,
  inject,
  injectAsync,
  beforeEach,
  beforeEachProviders
} from '@angular/core/testing';
import {TestComponentBuilder} from '@angular/compiler/testing';
import {provide} from '@angular/core';
import {OptionsDetailComponent} from './options-detail.component';
import {Router, RouteParams} from '@angular/router-deprecated';
import {Option} from '../../shared/index';
import {OptionsProvider} from '../../services/index';

class MockOptionsProvider {
  get() {
    return Promise.resolve(
      [{id:1, label:'one', value:0, dirty:false, values:['Default'], tags:[], children:[]}]
    );
  }
};

class MockRouter {
  navigate() { }
};

class MockRouteParams {
  get() { return 1; }
};

describe('OptionsDetailComponent', () => {
  let tcb;

  beforeEachProviders(() => [
    TestComponentBuilder,
    provide(OptionsProvider, {useClass: MockOptionsProvider}),
    provide(Router, {useClass: MockRouter}),
    provide(RouteParams, {useClass: MockRouteParams}),
    provide(OptionsDetailComponent, {
      deps: [OptionsProvider, Router, RouteParams]})
  ]);

  beforeEach(inject([TestComponentBuilder], (_tcb) => {
    tcb = _tcb;
  }));

  it('should ...', done => {
    return tcb
    .overrideProviders(OptionsDetailComponent, [
      provide(OptionsProvider, {useClass: MockOptionsProvider}),
      provide(Router, {useClass: MockRouter}),
      provide(RouteParams, {useClass: MockRouteParams})
    ])
    .createAsync(OptionsDetailComponent)
    .then((fixture) => {
      fixture.detectChanges();
      done();
    })
    .catch(e => done());
  });

});