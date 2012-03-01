APPLICATION_DIR = application/
TEMPLATE_DIR	= template/
LIBRARY_DIR		= library/

include config/make/*.mk

all: js html

html:
	  mustache $^ $(LAYOUT_TEMPLATE) > \
			   $(addprefix $(HTML_PUBLIC_DIR), index.html)

js: $(JS_APP)
	$(JS_COMPILER) $(addprefix --js , $^) \
				   $(addprefix --js_output_file $(JS_PUBLIC_DIR), app.js)
