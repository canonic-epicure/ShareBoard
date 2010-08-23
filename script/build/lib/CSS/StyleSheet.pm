package CSS::StyleSheet;

use Moose;

use Path::Class;

use CSS::MHTMLFrame;


has 'embedder' => (
    is => 'rw',
    
    required => 1
);


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


sub get_background_images_urls {
    my ($self) = @_;
    
    my @scripts     = $self->content =~ m!background-image\s*:\s*url\(["']?(.+?)["']?\)!g;
    
    return @scripts;
}


sub replace_image_with_url {
    my ($self, $url, $new_url) = @_;
    
    $url            = quotemeta $url;
    
    my $content = $self->content;
    
    $content =~ s!background-image\s*:\s*url\(["']?$url["']?\)!background-image : url($new_url)!i;
    
    $self->content($content);
    
    return $self;
}


sub replace_image_with_data_uri {
    my ($self, $url) = @_;
    
    my $image_file  = file($url)->absolute(file($self->filename)->dir);
    
    my $data_uri    = $self->embedder->get_data_uri_for($image_file);
    
    return $self->replace_image_with_url($url, $data_uri);
}


sub embed_data_uri {
    my ($self) = @_;
    
    my @background_urls     = $self->get_background_images_urls;
    
    foreach my $url (@background_urls) {
        $self->replace_image_with_data_uri($url);
    }
}


sub embed_mhtml_frame {
    my ($self, $mhtml_root) = @_;
    
    my $frame = CSS::MHTMLFrame->new({
        embedder => $self->embedder
    });
    
    my @background_urls     = $self->get_background_images_urls;
    
    my $counter = 1;
    
    foreach my $url (@background_urls) {
        my $image_file  = file($url)->absolute(file($self->filename)->dir);
        
        $frame->add_image($image_file, $counter);
        
        $self->replace_image_with_url($url, $self->embedder->get_mhtml_uri_for($mhtml_root, $counter++));
    }
    
    my $content = $self->content;
    
    $content = "/*\n" . $frame->as_string . "\n*/\n\n" . $content;
    
    $self->content($content);
}



__PACKAGE__