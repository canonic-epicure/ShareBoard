#!/usr/bin/perl

use strict;
use warnings;

use FindBin;
use lib "$FindBin::Bin/lib";


use Path::Class;
use File::Find::Rule;


use Image::PNG;


my $blib_dir        = dir("$FindBin::Bin/../blib");
my $bin_dir         = $blib_dir->subdir('script');
my $images_dir      = $blib_dir->subdir('lib', 'JooseIt', 'static', 'images');



my @png_files = File::Find::Rule->or(
    File::Find::Rule->file->name('*.png')
)->in($images_dir);





foreach my $file (@png_files) {
    my $image = Image::PNG->new({
        filename    => $file,
        
        bin_dir     => $bin_dir,
        
        
        use_lossless            => 1,
        use_quantization        => 1
    });
    
    my $before  = $image->get_size;
    
    $image->optimize();
    
    my $after   = $image->get_size;
    
    printf "File %150s: before=%7d, after=%7d, optimization=%.3f%%\n", $file, $before, $after, 100 * ($after - $before) / $before;
}






