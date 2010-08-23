package CSS::MHTMLFrame;

use Moose;

use Path::Class;


has 'embedder' => (
    is => 'rw',
    
    required => 1
);


has 'images' => (
    is => 'rw',
     
    default => sub { [] }
);


has 'separator' => (
    is => 'rw',
    
    default => sub { 'IMAGE' }
);


sub add_image {
    my ($self, $file_name, $file_location) = @_;
    
    push @{$self->images}, { 
        file_name       => $file_name,
        file_location   => $file_location || file($file_name)->basename
    };
}


sub as_string {
    my ($self) = @_;
    
    my $separator   = $self->separator;
    my @images      = @{$self->images};
    
    my $content = "Content-Type: multipart/related; boundary=\"$separator\";\n\n";
    
    foreach my $image_desc (@images) {
        $content .= '--' . $separator . "\n";
        $content .= "Content-Location:" . $image_desc->{ file_location } . "\n";
        $content .= "Content-Transfer-Encoding:base64" . "\n\n";
        
        $content .= $self->embedder->get_base64_content_for($image_desc->{ file_name }) . "\n";
    }
    
    if (@images) {
        $content .= "\n";
        $content .= '--' . $separator . '--' . "\n";
    }
    
    # strange Windows world )
    $content =~ s/\n/\r\n/g;
    
    return $content;
}


__PACKAGE__