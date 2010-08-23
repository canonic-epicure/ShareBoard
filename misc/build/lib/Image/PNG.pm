package Image::PNG;

use Moose;

use Path::Class;


has 'filename' => (
    is => 'rw',
     
    required => 1
);


has 'iterations' => (
    is => 'rw',
     
    default => sub { 1 }
);


has 'use_lossless' => (
    is => 'rw',
     
    default => sub { 1 }
);


has 'use_optipng' => (
    is => 'rw',
     
    default => sub { 1 }
);


has 'use_pngout' => (
    is => 'rw',
     
    default => sub { 1 }
);


has 'use_quantization' => (
    is => 'rw',
     
    default => sub { 1 }
);


has 'bin_dir' => (
    is => 'rw',
     
    required => 1
);


sub get_size {
    my ($self) = @_;
    
    return file($self->filename)->stat->size;
}



sub optimize {
    my ($self) = @_;
    
    for (my $i = 0; $i < $self->iterations; $i++) {
        
        $self->quantize()               if $self->use_quantization;
        $self->optimize_lossless()      if $self->use_lossless;
    }
    
} 


sub optimize_lossless {
    my ($self) = @_;
    
    my $file        = $self->filename;
    my $pngout      = dir($self->bin_dir)->file('pngout-static');     
    
    qx!optipng -q -o3 $file!    if $self->use_optipng;   
    qx!$pngout -q -y $file!     if $self->use_pngout;
} 


sub quantize {
    my ($self) = @_;
    
    my $file        = $self->filename;
    
    my $file_nq8    = $file;
    $file_nq8       =~ s/\.png$/-nq8.png/;
    
    
    my $before      = file($file)->stat->size;
    
    qx!pngnq -s 1 -Q f $file 2> /dev/null!;
    
    my $after       = file($file_nq8)->stat->size;
    
    
    if ($after < $before) {
        `mv -f $file_nq8 $file`;
    } else {
        unlink($file_nq8);
    }
}

__PACKAGE__