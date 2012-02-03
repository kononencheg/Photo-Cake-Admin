<?php

require_once($_SERVER["DOCUMENT_ROOT"] . '/bootstrap.php');

use PhotoCake\View\Page;

$page = new Page();
$page->render('layout');

?>