var Backbone = require('backbone');
var StyleModel = require('../../../../../../javascripts/cartodb3/editor/style/style-definition-model');
var QuerySchemaModel = require('../../../../../../javascripts/cartodb3/data/query-schema-model');
var LayerDefinitionsCollection = require('../../../../../../javascripts/cartodb3/data/layer-definitions-collection');
var StyleAnimatedPropertiesFormView = require('../../../../../../javascripts/cartodb3/editor/style/style-form/style-properties-form/style-animated-properties-form-view');

describe('editor/style/style-form/style-animated-properties-form-view', function () {
  var view;

  beforeEach(function () {
    this.styleModel = new StyleModel({
      overlap: true
    }, { parse: true });

    this.querySchemaModel = new QuerySchemaModel({
      status: 'fetched'
    }, {
      configModel: {}
    });
    this.querySchemaModel.set('simple_geom', 'point');

    this.layerDefinitionsCollection = new LayerDefinitionsCollection([], {
      analysisDefinitionNodesCollection: new Backbone.Collection(),
      configModel: {},
      mapId: 'map-123'
    });
    spyOn(this.layerDefinitionsCollection, 'isThereAnyTorqueLayer').and.returnValue(false);

    this.layerDefinitionModel = new Backbone.Model();

    view = this.view = new StyleAnimatedPropertiesFormView({
      layerDefinitionsCollection: this.layerDefinitionsCollection,
      layerDefinitionModel: this.layerDefinitionModel,
      querySchemaModel: this.querySchemaModel,
      styleModel: this.styleModel
    });

    this.view._styleModel.set({type: 'animation'});

    view.render();
  });

  it('should not have leaks', function () {
    expect(this.view).toHaveNoLeaks();
  });
});
