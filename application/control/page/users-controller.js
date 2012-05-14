/**
 * @constructor
 * @extends {tuna.control.PageController}
 */
var UsersController = function () {
    tuna.control.PageController.call(this);
};

tuna.utils.extend(UsersController, tuna.control.PageController);

/**
 * @override
 */
UsersController.prototype.initActions = function() {
    //this._navigation.addChild
    //   (this._container.getWidget('navigation', 'users'));

    var controls = this._container.getWidget('button-group', 'list');
    controls.addEventListener('delete', function(event, button) {
        if (confirm('Удалить кондитерскую?')) {
            var id = button.getStringOption('id');

            tuna.rest.call('users.remove', { 'id': id }, function() {
                model.bakeries.removeItemById(id);
            });

            button.disable();
        }
    });

    var listTransformer = this._container.getWidget
        ('template-transformer', 'list');

    model.bakeries.addEventListener('update', function(event, bakeries) {
        listTransformer.applyTransform(tuna.model.serialize(bakeries));
    });

    listTransformer.applyTransform
        (tuna.model.serialize(model.bakeries.get()));

    var addForm = this._container.getWidget('form', 'add');

    var self = this;

    addForm.addEventListener('result', function(event, bakery) {
        model.bakeries.addItem(bakery);
        //self._navigation.back();
    });

    var citiesTransformer = this._container.getWidget
        ('template-transformer', 'cities-list');

    model.cities.addEventListener('update', function(event, cities) {
        citiesTransformer.applyTransform(tuna.model.serialize(cities));
    });

    citiesTransformer.applyTransform(tuna.model.serialize(model.cities.get()));

    var addCityPopup = this._container.getWidget('popup', 'add-city');

    var addCityButton = this._container.getWidget('button', 'add-city');
    addCityButton.addEventListener('click', function() {
        addCityPopup.open();
    });

    var addCityForm = this._container.getWidget('form', 'add-city');
    addCityForm.addEventListener('result', function(event, city) {
        model.cities.addItem(city);
        addCityPopup.close();
    });

    model.cities.load();
};


tuna.control.registerController('users_page', new UsersController());
