JS_COMPILER = java -jar utils/compiler.jar \
			  --warning_level VERBOSE \
			  --compilation_level WHITESPACE_ONLY \
			  --externs library/externs.js \
			  --debug \
			  --formatting PRETTY_PRINT \
			   #ADVANCED_OPTIMIZATIONS \

TUNA_FILES = tuna.js \
			 \
			 utils/utils.js \
			 \
			 dom/dom.js \
			 \
			 events/basic-event.js \
			 events/i-event-dispatcher.js \
			 events/event-dispatcher.js \
			 \
			 net/i-request.js \
			 net/request.js \
			 net/net.js \
			 \
			 model/record.js \
			 model/model.js \
			 \
			 rest/i-method.js \
			 rest/method.js \
			 rest/i-method-factory.js \
			 rest/rest.js \
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
			 tmpl/units/i-list-item-router.js \
			 tmpl/units/list-container-router.js \
			 tmpl/units/compiled-unit.js \
			 tmpl/units/spot.js \
			 tmpl/units/attribute.js \
			 tmpl/units/condition.js \
			 tmpl/units/list.js \
			 tmpl/units/checkbox.js \
			 tmpl/units/template.js \
			 \
			 tmpl/compilers/i-item-compiler.js \
			 tmpl/compilers/template-compiler.js \
			 tmpl/compilers/spot-compiler.js \
			 tmpl/compilers/attribute-compiler.js \
			 tmpl/compilers/condition-compiler.js \
			 tmpl/compilers/checkbox-compiler.js \
			 tmpl/compilers/list-compiler.js \
			 \
			 tmpl/tmpl.js \
			 \
			 ui/module.js \
			 ui/module-instance.js \
			 ui/module-container.js \
			 ui/modules/modules.js \
			 \
			 ui/popups/popup.js \
			 ui/popups/popups.js \
			 \
			 ui/buttons/button.js \
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
			 ui/modules/form.js \
			 ui/modules/navigation.js \
			 ui/modules/popup.js \
			 ui/modules/popup-button.js \
			 ui/modules/selection-group.js \
			 ui/modules/template-transformer.js \
			 ui/modules/button-group.js \
			 ui/modules/swf.js \
			 ui/modules/input-filter.js \
			 ui/modules/autocomplete.js \
			 ui/modules/carousel.js \
			 \
			 view/view.js \
			 view/view-controller.js \
			 view/page-view-controller.js \
			 

APPLICATION_FILES = main.js \
					\
					view/main-controller.js \
					view/page/dimensions-controller.js \
					view/page/recipes-controller.js \
					view/page/recipes/add-recipe-controller.js \
					view/page/recipes/edit-recipe-controller.js \
					view/page/orders-controller.js \
					view/page/orders/edit-order-controller.js \
					\
					model/record/user.js \
					model/record/bakery.js \
					model/record/recipe.js \
					model/record/delivery.js \
					model/record/client.js \
					model/record/payment.js \
					model/record/dimension.js \
					model/record/cake.js \
					model/record/order.js \
					\
					model/resource/users.js \
					model/resource/bakeries.js \
					model/resource/recipes.js \
					model/resource/orders.js \
					model/resource/dimensions.js \
					\
					rest/common-method.js \
					rest/common-factory.js \
					\


JS_APP = $(addprefix $(LIBRARY_DIR)tuna/, $(TUNA_FILES)) \
		 $(addprefix $(APPLICATION_DIR), $(APPLICATION_FILES))

JS_PUBLIC_DIR = public/js/