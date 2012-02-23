JS_COMPILER = java -jar utils/compiler.jar

JS_COMPILE_FLAGS = --language_in ECMASCRIPT5_STRICT \
				   --compilation_level ADVANCED_OPTIMIZATIONS \
				   --warning_level VERBOSE \
				   --define 'tuna.IS_COMPILED=true'
				   #--formatting PRETTY_PRINT \
                   #--debug
				   

JS_COMBINE_FLAGS = --language_in ECMASCRIPT5_STRICT \
                   --compilation_level WHITESPACE_ONLY \
                   --warning_level VERBOSE \
				   --formatting PRETTY_PRINT \
				   --debug


JS_ROOT_DIR = public/js/

SRC_DIR = $(addprefix $(JS_ROOT_DIR), src/)
LIB_DIR = $(addprefix $(JS_ROOT_DIR), lib/)

LIB_TUNA_DIR = $(addprefix $(LIB_DIR), tuna/)

LIB_TUNA_FILES = tuna.js \
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
              	 tmpl/settings/list-settings.js \
              	 tmpl/settings/template-settings.js \
              	 \
              	 tmpl/markup/i-markup-extractor.js \
              	 tmpl/markup/spot-extractor.js \
              	 tmpl/markup/list-extractor.js \
              	 tmpl/markup/attribute-extractor.js \
              	 tmpl/markup/condition-extractor.js \
              	 tmpl/markup/markup-template-builder.js \
              	 \
              	 tmpl/units/i-list-item-router.js \
              	 tmpl/units/list-container-router.js \
              	 tmpl/units/compiled-unit.js \
              	 tmpl/units/spot.js \
              	 tmpl/units/attribute.js \
              	 tmpl/units/condition.js \
              	 tmpl/units/list.js \
              	 tmpl/units/template.js \
              	 \
              	 tmpl/compilers/i-item-compiler.js \
              	 tmpl/compilers/template-compiler.js \
              	 tmpl/compilers/spot-compiler.js \
              	 tmpl/compilers/attribute-compiler.js \
              	 tmpl/compilers/condition-compiler.js \
              	 tmpl/compilers/list-compiler.js \
              	 \
              	 tmpl/tmpl.js \
                 \
                 ui/module.js \
				 ui/module-instance.js \
				 ui/modules/modules.js \
				 \
				 ui/containers/container.js \
 				 ui/containers/control-container.js \
				 \
 				 ui/popups/popup.js \
				 ui/popups/popups.js \
				 \
 				 ui/buttons/button.js \
 				 ui/buttons/button-group.js \
 				 ui/buttons/buttons.js \
 				 \
 				 ui/forms/form.js \
				 ui/forms/form-input.js \
				 \
				 ui/transformers/i-transform-handler.js \
				 ui/transformers/i-transformer.js \
				 ui/transformers/template-transformer.js \
 				 \
 				 ui/selection/i-selection-group.js \
              	 ui/selection/abstract-selection-group.js \
              	 ui/selection/selection-group.js \
              	 ui/selection/navigation.js \
              	 \
 				 ui/selection/items/i-items-collection.js \
				 ui/selection/items/elements-collection.js \
				 ui/selection/items/named-elements-collection.js \
				 \
				 ui/selection/rule/i-selection-rule.js \
				 ui/selection/rule/abstract-selection-rule.js \
				 ui/selection/rule/single-selection-rule.js \
				 ui/selection/rule/multiple-selection-rule.js \
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
				 ui/modules/control-container.js \
				 ui/modules/button-group.js \
				 \
				 view/view.js \
				 view/view-controller.js \
				 view/navigation-view-controller.js \
 				 view/page-view-controller.js \
 				 \
				 
	 
SRC_FILES = main.js \
			\
			view/main-controller.js \
			view/page/recipes-controller.js \
			view/page/orders-controller.js \
			\
			model/record/user.js \
			model/record/bakery.js \
			model/record/recipe.js \
			\
			model/resource/users.js \
			model/resource/bakeries.js \
			model/resource/recipes.js \
			\
			rest/common-method.js \
			rest/common-factory.js \
			\

			

JS_ALL = $(addprefix $(LIB_TUNA_DIR), $(LIB_TUNA_FILES)) \
		 $(addprefix $(SRC_DIR), $(SRC_FILES))


compile: $(JS_ALL)
		$(JS_COMPILER) $(JS_COMPILE_FLAGS) \
					   $(addprefix --js , $^) \
					   $(addprefix --externs $(LIB_DIR), externs.js) \
					   $(addprefix --js_output_file $(JS_ROOT_DIR), app.js)

combine: $(JS_ALL)
		$(JS_COMPILER) $(JS_COMBINE_FLAGS) \
					   $(addprefix --js , $^) \
					   $(addprefix --externs $(LIB_DIR), externs.js) \
					   $(addprefix --js_output_file $(JS_ROOT_DIR), app.js)

watch-combine:
	watchr config/make/js-combine.watchr

watch-compile:
	watchr config/make/js-compile.watchr

clean:
	rm $(addprefix $(JS_ROOT_DIR), app.js)
