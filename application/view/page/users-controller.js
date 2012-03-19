/**
 * @constructor
 * @extends {tuna.view.PageViewController}
 */
var UsersController = function () {
    tuna.view.PageViewController.call(this);

    /**
     * @override
     */
    this._modules = [ 'template-transformer', 'navigation', 'button-group',
                      'form', 'button', 'popup' ];

};

tuna.utils.extend(UsersController, tuna.view.PageViewController);

/**
 * @override
 */
UsersController.prototype._initActions = function() {
    this._navigation.addChild
        (this._container.getModuleInstanceByName('navigation', 'users'));

    var controls = this._container.getModuleInstanceByName('button-group', 'list');
    controls.addEventListener('delete', function(event, button) {
        if (confirm('Удалить кондитерскую?')) {
            var id = button.getStringOption('id');

            tuna.rest.call('users.remove', { 'id': id }, function() {
                model.bakeries.removeItemById(id);
            });

            button.setEnabled(false);
        }
    });

    var listTransformer = this._container.getModuleInstanceByName
        ('template-transformer', 'list');

    model.bakeries.addEventListener('update', function(event, bakeries) {
        listTransformer.applyTransform(tuna.model.serialize(bakeries));
    });

    listTransformer.applyTransform
        (tuna.model.serialize(model.bakeries.get()));

    var addForm = this._container.getModuleInstanceByName('form', 'add');

    var self = this;

    addForm.addEventListener('result', function(event, bakery) {
        model.bakeries.addItem(bakery);
        self._navigation.back();
    });

    var citiesTransformer = this._container.getModuleInstanceByName
        ('template-transformer', 'cities-list');

    model.cities.addEventListener('update', function(event, cities) {
        citiesTransformer.applyTransform(tuna.model.serialize(cities));
    });

    citiesTransformer.applyTransform(tuna.model.serialize(model.cities.get()));

    var addCityPopup = this._container.getModuleInstanceByName('popup', 'add-city');

    var addCityButton = this._container.getModuleInstanceByName('button', 'add-city');
    addCityButton.addEventListener('click', function() {
        addCityPopup.open();
    });

    var addCityForm = this._container.getModuleInstanceByName('form', 'add-city');
    addCityForm.addEventListener('result', function(event, city) {
        model.cities.addItem(city);
        addCityPopup.close();
    });

    model.cities.load();
};


tuna.view.registerController('users_page', new UsersController());
