JS_COMPILER = java -jar utils/compiler.jar

JS_COMPILE_FLAGS = --language_in ECMASCRIPT5_STRICT \
				   --compilation_level ADVANCED_OPTIMIZATIONS \
				   --warning_level VERBOSE \
				   --define 'tuna.IS_COMPILED=true'
				   

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
				 tmpl/i-transform-handler.js \
				 tmpl/i-transformer.js \
				 tmpl/template-transformer.js \
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
				 view/view.js \
				 view/view-controller.js \
				 view/navigation-view-controller.js \
 				 view/page-view-controller.js \
                 \
                 ui/module.js \
				 ui/module-instance.js \
				 ui/modules/modules.js \
				 \
				 ui/containers/container.js \
 				 ui/containers/transform-container.js \
				 \
 				 ui/popups/popup.js \
				 ui/popups/popups.js \
				 \
 				 ui/forms/form.js \
				 ui/forms/form-input.js \
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
				 ui/modules/transform-container.js \
				 \
				 

				 
SRC_FILES = main.js \
			\
			view/main-controller.js \
			\
			model/records/user.js \
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

watch: 
	watchr config/make/js.watchr

clean:
	rm $(addprefix $(JS_ROOT_DIR), app.js)
