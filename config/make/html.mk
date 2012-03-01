HTML_COMPRESSOR = java -jar utils/htmlcompressor.jar --type html

LAYOUT_TEMPLATE = $(addprefix $(TEMPLATE_DIR), layout.mustache)

HTML_PUBLIC_DIR = public/