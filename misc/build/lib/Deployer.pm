package Deployer;

use strict;
use warnings;

use FindBin;
use Path::Class;
use JSON;


sub config {
    return JSON->new->relaxed->decode(scalar(file("$FindBin::Bin/config.json")->slurp));
}


sub root {
    my ($self) = @_;
    
    my $root = $self->config->{root};
    
    $root =~ s!/$!!;
    
    return $root;
}



sub save_key {
    my ($self, $key, $value) = @_;
    
    my $config = $self->config;
    
    $config->{ $key } = $value;
    
    my $fh = file("$FindBin::Bin/config.json")->openw;
    
    print $fh JSON->new->pretty->encode($config);
    
    $fh->close;
    
    return $value;
}


__PACKAGE__