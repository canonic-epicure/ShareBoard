#!/usr/bin/perl

use strict;
use warnings;

use FindBin;
use lib "$FindBin::Bin/lib";

use JSON;
use Path::Class;
use Getopt::LL::Simple qw(
    --fast
    --skip_min
    --skip_png
    --skip_embed
);

use Deployer;
use CSS::Embedder;
use CSS::MHTMLFrame;


my $fast        = $ARGV{'--fast'};
my $skip_png    = $ARGV{'--skip_png'} || $fast;
my $skip_min    = $ARGV{'--skip_min'} || $fast;
my $skip_embed  = $ARGV{'--skip_embed'} || $fast;


my $build_id        = Deployer->save_key('build_id', time);
my $shotenjin_file  = dir(Deployer->config->{ jsan_root_dir })->file('bin', 'shotenjin_embed.pl');


#======================================================================================================================================================================================
# updating content 

print `script/build_pages.sh`;
print `$shotenjin_file lib/ --kw`;


#======================================================================================================================================================================================
# copying files 

print `./Build clean`;

$ENV{ JSANLIB } = Deployer->config->{ jsan_root_dir };

print `./Build task --task_name=all`;

print `./Build`;

print `cp -f t/visual/index.html blib/index.html`;


#======================================================================================================================================================================================
# optimizing pngs 

print `script/optimize_png.pl` unless $skip_png;

print `script/inline_buttons.pl --libroot lib.$build_id`;


#======================================================================================================================================================================================
# concatenating/minimizing js 

`chmod 644 blib/lib/Task/JooseIt/Bundle.js`;

print `java -jar bin/yuicompressor-2.4.2.jar -o blib/lib/Task/JooseIt/Bundle.js blib/lib/Task/JooseIt/Bundle.js` unless $skip_min; 
    

#======================================================================================================================================================================================
# concatenating/minimizing css 

print `script/concat_css.pl`;

print `script/embed_images.pl --libroot lib.$build_id`;

print `java -jar bin/yuicompressor-2.4.2.jar -o blib/lib/JooseIt/static/css/concat-all.css blib/lib/JooseIt/static/css/concat-all.css` unless $skip_min; 
    

#======================================================================================================================================================================================
# updating index.html 
    
print `script/update_index.pl`;