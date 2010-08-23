#!/usr/bin/perl

use strict;
use warnings;

use FindBin;
use lib "$FindBin::Bin/lib";

use URI;
use Path::Class;
use LWP::Simple;
use File::Path qw(make_path remove_tree);

use Index::HTML;
use Deployer;


#======================================================================================================================================================================================
# getting urls of stylesheets 

my $blib_dir        = dir("$FindBin::Bin/../blib");
my $task_file       = file($blib_dir, 'lib', 'JooseIt', 'static', 'css', 'concat-all.css');


my $index           = Index::HTML->new( filename => $blib_dir->file('index.html'));

my @styles          = $index->get_styles(1);


#======================================================================================================================================================================================
# concatenating files 

my $root = Deployer->root;

my $css = "";

foreach my $style (@styles) {
    my $url     = URI->new_abs($style, $root . '/');
    
    $url =~ s/\?.*//;
    next unless $url =~ m/\.css$/;
    die "concat_css.pl used on already concatenated index file" if $url =~ m/concat-all\.css$/; 
    
    $css .= get($url) . "\n";
}


#======================================================================================================================================================================================
# writing into /blib/lib/JooseIt/static/css/concat-all.css 



my $fh = $task_file->openw;

print $fh $css;

$fh->close;


