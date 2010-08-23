package Index::HTML;

use Moose;


use Path::Class;



has 'filename' => (
    is => 'rw',
     
    required => 1
);

has 'content' => (
    is => 'rw'
);


sub BUILD {
    my ($self) = @_;
    
    
    $self->content(scalar(file($self->filename)->slurp));
}


sub save {
    my ($self, $filename) = @_;
    
    my $file = file($filename || $self->filename);
    
    
    my $fh = $file->openw;
    
    print $fh $self->content;
    
    $fh->close;
}


sub get_scripts {
    my ($self, $double_quoted_only) = @_;
    
    my $quote = $double_quoted_only ? qr/"/ : qr/['"]/;
    
    my @scripts     = $self->content =~ m!<script\s+.*?src=$quote(.+)$quote.*?>!ig;
    
    return @scripts;
}


sub get_styles {
    my ($self, $double_quoted_only) = @_;
    
    my $quote = $double_quoted_only ? qr/"/ : qr/['"]/;
    
    my @styles      = $self->content =~ m!<link\s+.*?href=$quote(.+)$quote.*?>!ig;
    
    return @styles;
}


sub remove_script {
    my ($self, $url) = @_;
    
    
    my $content     = $self->content;
    $url            = quotemeta $url;
    
    $content =~ s!^\s*<script\s+.*?src=["']$url["'].*?>(</script>(\s*\n)?)?!!im;
    
    $self->content($content);
    
    return $self;
}


sub replace_script {
    my ($self, $url, $new_url) = @_;
    
    
    my $content     = $self->content;
    $url            = quotemeta $url;
    
    $content =~ s!<script\s+.*?src=["']$url["'].*?>(</script>(\s*\n)?)?!<script type="text/javascript" src="$new_url">$1!i;
    
    $self->content($content);
    
    return $self;
}


sub remove_stylesheet {
    my ($self, $url) = @_;
    
    
    my $content     = $self->content;
    $url            = quotemeta $url;
    
    $content =~ s!^\s*<link\s+.*?href=["']$url["'].*?>!!im;
    
    $self->content($content);
    
    return $self;
}


sub replace_stylesheet {
    my ($self, $url, $new_url) = @_;
    
    
    my $content     = $self->content;
    $url            = quotemeta $url;
    
    $content =~ s!<link\s+.*?href=["']$url["'].*?>!<link rel="stylesheet" type="text/css" href="$new_url">!i;
    
    $self->content($content);
    
    return $self;
}


sub replace_stylesheet_branched {
    my ($self, $url, $new_url_ie, $new_url_nonie) = @_;
    
    
    my $content     = $self->content;
    $url            = quotemeta $url;
    
    $content =~ s@<link\s+.*?href=["']$url["'].*?>@<!--[if IE]><link rel="stylesheet" type="text/css" href="$new_url_ie"><![endif]--><!--[if !IE]><!--><link rel="stylesheet" type="text/css" href="$new_url_nonie"><!--<![endif]-->@i;
    
    $self->content($content);
    
    return $self;
}


__PACKAGE__