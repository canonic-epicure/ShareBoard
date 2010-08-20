##!/usr/bin/perl
#
#use strict;
#use warnings;
#
#use FindBin;
#use lib "$FindBin::Bin/lib";
#
#use URI;
#$URI::ABS_REMOTE_LEADING_DOTS = 1;
#
#use Path::Class;
#use LWP::Simple;
#use File::Path qw(make_path remove_tree);
#
#
#use Deployer;
#
#
#
##======================================================================================================================================================================================
## filtering urls 
#
#`cat $FindBin::Bin/components.txt | grep http: > $FindBin::Bin/components.urls.txt`;
#
#my $components = file("$FindBin::Bin/components.urls.txt")->slurp; 
#
#
#
##======================================================================================================================================================================================
## concatenating files 
#
#my $js = "";
#
#foreach my $url (split "\n", $components) {
#    next unless $url;
#    
#    $url =~ s/\?.*//;
#    
#    next unless $url =~ m/\.js$/;
#    
#    
#    my $uri         = URI->new($url);
#    
#    my $rel_uri     = $uri->rel(Deployer->config->{components_root});
#    my $abs_uri     = URI->new_abs($rel_uri, Deployer->root . '/');
#    
#    
#    my $component = get($abs_uri) || "";
#    
#    $js .= "\n;\n" . $component;
#}
#
#
##======================================================================================================================================================================================
## writing into /blib 
#
#my $blib_dir        = dir("$FindBin::Bin/../blib");
#
#my $task_file       = file($blib_dir, 'lib', 'Task', 'JooseIt.js');
#
#make_path($task_file->dir . "");
#
#
#my $fh = $task_file->openw;
#
#print $fh $js;
#
#$fh->close;
#

