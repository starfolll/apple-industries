resource "aws_db_instance" "db_instance" {
  allocated_storage = var.db_allocated_storage

  storage_type   = "standard"
  instance_class = "db.t3.micro"

  engine = "postgres"

  name     = var.db_name
  username = var.db_username
  password = var.db_password

  skip_final_snapshot = true
}
