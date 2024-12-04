resource "aws_instance" "instance_1" {
  ami           = var.ec2_ami_web
  instance_type = var.ec2_web_instance_type

  security_groups = [aws_security_group.instances.name]

  user_data = <<-EOF
    #!/bin/bash
    echo "Hello, World 1" > index.html
    python3 -m http.server 8080 &
    EOF
}
