# Main variables
variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "app_name" {
  description = "Name of the web application"
  type        = string
  default     = "apple-industries-app"
}

variable "environment_name" {
  description = "Deployment environment (dev/staging/production)"
  type        = string
  default     = "dev"
}

# EC2 variables
variable "ec2_ami_web" {
  description = "Amazon Machine Image ID for ec2"
  type        = string
  default     = "ami-011899242bb902164"
}

variable "ec2_web_instance_type" {
  description = "ec2 instance type"
  type        = string
  default     = "t2.micro"
}

# RDS variables
variable "db_allocated_storage" {
  description = "Database allocated storage"
  type        = number
  default     = 10
}

variable "db_name" {
  description = "Database name"
  type        = string
  default     = "demo"
}

variable "db_username" {
  description = "Database username"
  type        = string
  default     = "demo"
}

variable "db_password" {
  description = "Database password"
  type        = string
  default     = "demopassword"
  sensitive   = true
}
