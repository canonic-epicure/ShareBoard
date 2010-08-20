#!/usr/bin/perl

use strict;
use warnings;

use FindBin;
use lib "$FindBin::Bin/lib";

use Path::Class;
use Deployer;
use Index::HTML;


`cp -f t/visual/index.html blib/index.html`;



my $blib_dir        = dir("$FindBin::Bin/../blib");

my $index           = Index::HTML->new({ 
    filename => $blib_dir->file('index.html')
});


#======================================================================================================================================================================================
# taking the build time 

my $now = Deployer->config->{ build_id };


#======================================================================================================================================================================================
# extracting urls of all scripts and styles

my @scripts     = $index->get_scripts(1);
my @styles      = $index->get_styles(1);


#======================================================================================================================================================================================
# replacing first script with concatenated one and removing others


$index->replace_script(shift @scripts, "lib.$now/Task/JooseIt/Bundle.js");

foreach (@scripts) {
    $index->remove_script($_);
}


#======================================================================================================================================================================================
# replacing first stylesheet link with concatenated one and removing others


$index->replace_stylesheet_branched(shift @styles, "lib.$now/JooseIt/static/css/concat-all.ie.css", "lib.$now/JooseIt/static/css/concat-all.nonie.css");

foreach (@styles) {
    $index->remove_stylesheet($_);
}

#======================================================================================================================================================================================
# creating new lib

my $jsan_lib = dir(Deployer->config->{ jsan_root_dir })->subdir('lib') . "/";

`cp -r blib/lib blib/lib.$now`;

`rsync -r $jsan_lib blib/jsan.$now`;

my $content = $index->content;

$content =~ s!\[ '/jsan', 'lib' \]![ 'lib.$now', 'jsan.$now' ]!;

$content =~ s!lib/JooseIt/static/images/navigation/buttons.ie.js!lib.$now/JooseIt/static/images/navigation/buttons.ie.js!;
$content =~ s!lib/JooseIt/static/images/navigation/buttons.nonie.js!lib.$now/JooseIt/static/images/navigation/buttons.nonie.js!;

$content =~ s!disableCaching = true!disableCaching = false!;

$index->content($content);

$index->replace_stylesheet('/jsan/Task/ExtJS/resources/css/ext-all.css', "jsan.$now/Task/ExtJS/resources/css/ext-all.css");

#======================================================================================================================================================================================
# embedding some SEO content

my $seo_content = $blib_dir->file('..', 'content', 'html', 'Home.html')->slurp;

$content = $index->content;

$content =~ s!<noscript></noscript>!<noscript><a href="http://joose.it/blog>Link to our blog</a>$seo_content</noscript>!;

$index->content($content);


#======================================================================================================================================================================================
# writing result

$index->save();

