# ADVANCED_OPTIMIZATIONS | WHITESPACE_ONLY | SIMPLE_OPTIMIZATIONS


JS_COMPILER = java -jar utils/compiler.jar \
			  --warning_level VERBOSE \
			  --compilation_level ADVANCED_OPTIMIZATIONS \
			  --externs library/externs.js \
			  #--formatting PRETTY_PRINT \
			  #--debug \

TUNA_COMMON = tuna.js \
              \
              utils/config.js \
              utils/utils.js \
              \
              dom/dom.js \
              \
              events/basic-event.js \
              events/i-event-dispatcher.js \
              events/event-dispatcher.js \
              \
              net/i-request.js \
              net/request.js

TUNA_MVC = model/model.js \
           model/i-resource.js \
           model/list-resource.js \
           model/item-resource.js \
           model/record-factory.js \
           model/record.js \
           \
           rest/rest.js \
           rest/i-method.js \
           rest/method.js \
           rest/default-method.js \
           rest/i-method-factory.js \
           rest/method-factory.js \
           \
           ui/ui.js \
           ui/module.js \
           ui/module-instance.js \
           ui/module-container.js \
           \
           ui/popups/popup.js \
           ui/popups/popups.js \
           \
           ui/buttons/button.js \
           ui/buttons/popup-button.js \
           ui/buttons/button-group.js \
           ui/buttons/buttons.js \
           \
           ui/flash/swf.js \
           ui/flash/flash.js \
           \
           ui/forms/form.js \
           ui/forms/form-input.js \
           ui/forms/input-filter.js \
           ui/forms/autocomplete.js \
           ui/forms/forms.js \
           \
           ui/transformers/i-transform-handler.js \
           ui/transformers/i-transformer.js \
           ui/transformers/template-transformer.js \
           \
           ui/selection/i-selection-group.js \
           ui/selection/abstract-selection-group.js \
           ui/selection/selection-group.js \
           ui/selection/navigation.js \
           ui/selection/carousel.js \
           \
           ui/selection/items/i-items-collection.js \
           ui/selection/items/elements-collection.js \
           ui/selection/items/named-elements-collection.js \
           \
           ui/selection/rule/i-selection-rule.js \
           ui/selection/rule/abstract-selection-rule.js \
           ui/selection/rule/single-selection-rule.js \
           ui/selection/rule/multiple-selection-rule.js \
           ui/selection/rule/navigation-selection-rule.js \
           \
           ui/selection/view/i-selection-view.js \
           ui/selection/view/abstract-selection-view.js \
           ui/selection/view/class-selection-view.js \
           \
           control/control.js \
           control/view-controller.js \
           control/page-view-controller.js \


TUNA_TEMPLATES = tmpl/tmpl.js \
                 \
                 tmpl/data/data-node.js \
                 tmpl/data/path-evaluator.js \
                 \
                 tmpl/settings/i-item-settings.js \
                 tmpl/settings/spot-settings.js \
                 tmpl/settings/attribute-settings.js \
                 tmpl/settings/condition-settings.js \
                 tmpl/settings/checkbox-settings.js \
                 tmpl/settings/list-settings.js \
                 tmpl/settings/template-settings.js \
                 \
                 tmpl/markup/i-markup-extractor.js \
                 tmpl/markup/spot-extractor.js \
                 tmpl/markup/list-extractor.js \
                 tmpl/markup/attribute-extractor.js \
                 tmpl/markup/condition-extractor.js \
                 tmpl/markup/checkbox-extractor.js \
                 tmpl/markup/markup-template-builder.js \
                 \
                 tmpl/units/list/i-list-item-router.js \
                 tmpl/units/list/list-container-router.js \
                 tmpl/units/condition/condition-action.js \
                 tmpl/units/condition/class-action.js \
                 tmpl/units/condition/condition-operator.js \
                 tmpl/units/condition/equals-operator.js \
                 tmpl/units/condition/isset-operator.js \
                 tmpl/units/condition/not-equals-operator.js \
                 tmpl/units/condition/notset-operator.js \
                 tmpl/units/i-unit.js \
                 tmpl/units/unit.js \
                 tmpl/units/spot.js \
                 tmpl/units/attribute.js \
                 tmpl/units/condition.js \
                 tmpl/units/checkbox.js \
                 tmpl/units/list.js \
                 tmpl/units/template.js \
                 \
                 tmpl/compilers/i-item-compiler.js \
                 tmpl/compilers/template-compiler.js \
                 tmpl/compilers/spot-compiler.js \
                 tmpl/compilers/attribute-compiler.js \
                 tmpl/compilers/condition-compiler.js \
                 tmpl/compilers/checkbox-compiler.js \
                 tmpl/compilers/list-compiler.js \

TUNA_UI_MODULES = navigation.js \
                  popup.js \
                  button.js \
                  popup-button.js \
                  selection-group.js \
                  template-transformer.js \
                  button-group.js \
                  swf.js \
                  input-filter.js \
                  autocomplete.js \
                  form.js \
                  carousel.js \


APPLICATION_FILES = main.js \
					\
					control/main-controller.js \
					control/page/profile-controller.js \
					control/page/decorations-controller.js \
					control/page/dimensions-controller.js \
					control/page/users-controller.js \
					control/page/recipes-controller.js \
					control/page/recipes/add-recipe-controller.js \
					control/page/recipes/edit-recipe-controller.js \
					control/page/orders-controller.js \
					control/page/orders/edit-order-controller.js \
					\
					model/record/user.js \
					model/record/bakery.js \
					model/record/partner.js \
					model/record/recipe.js \
					model/record/delivery.js \
					model/record/client.js \
					model/record/payment.js \
					model/record/dimension.js \
					model/record/cake.js \
					model/record/order.js \
					model/record/city.js \
					model/record/decoration.js \
					\
					model/model.js \
					\
					rest/common-method.js \
					\


JS_COMMON =     $(addprefix $(LIBRARY_DIR)tuna/common/,     $(TUNA_COMMON))
JS_TEMPLATES =  $(addprefix $(LIBRARY_DIR)tuna/templates/,  $(TUNA_TEMPLATES))
JS_MVC =        $(addprefix $(LIBRARY_DIR)tuna/mvc/,        $(TUNA_MVC))
JS_UI_MODULES = $(addprefix $(LIBRARY_DIR)tuna/ui-modules/, $(TUNA_UI_MODULES))

JS_APP = $(addprefix $(APPLICATION_DIR), $(APPLICATION_FILES))

JS_ALL = $(JS_COMMON) $(JS_TEMPLATES) $(JS_MVC) $(JS_UI_MODULES) $(JS_APP)

JS_PUBLIC_DIR = public/js/
