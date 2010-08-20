#!/usr/bin/perl

use strict;
use warnings;

use FindBin;
use lib "$FindBin::Bin/lib";

use File::Find::Rule;
use Path::Class;
use Getopt::LL::Simple qw(
    --mhtmlroot=s
    --libroot=s
);
use Deployer;
use CSS::Embedder;
use CSS::StyleSheet;

my $root        = Deployer->root;


my $lib_root    = $ARGV{'--libroot'};
$lib_root       = $lib_root ? "$root/$lib_root" : "$root/lib"; 
my $mhtml_root  = $ARGV{'--mhtmlroot'} || "$lib_root/JooseIt/static/css/concat-all.ie.css";


my $blib_dir        = dir("$FindBin::Bin/../blib");
my $css_file        = $blib_dir->file('lib', 'JooseIt', 'static', 'css', 'concat-all.css');


my $embedder        = CSS::Embedder->new();


$, = "\n";
$\ = "\n";


#======================================================================================================================================================================================
# embedding data uris (non-ie, ie8) 


my $stylesheet = CSS::StyleSheet->new({
    filename        => $css_file,
    embedder        => $embedder
});

$stylesheet->embed_data_uri();

my $non_ie_filename = "$css_file";
$non_ie_filename =~ s/\.css$/.nonie.css/;

$stylesheet->save($non_ie_filename);


#======================================================================================================================================================================================
# embedding mhtml links 

$stylesheet = CSS::StyleSheet->new({
    filename        => $css_file,
    embedder        => $embedder
});

$stylesheet->embed_mhtml_frame($mhtml_root);

my $ie_filename = "$css_file";
$ie_filename =~ s/\.css$/.ie.css/;

$stylesheet->save($ie_filename);

