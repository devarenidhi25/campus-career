# FA DevOps Project - AWS Infrastructure using Terraform
# Owner: Ishan
#
# Creates:
#   1. Custom VPC
#   2. Public subnet
#   3. Internet Gateway
#   4. Route table + association
#   5. Security Group (SSH + HTTP)
#   6. Ubuntu EC2 instance
#   7. Elastic IP
#
# IMPORTANT:
# - Do NOT put AWS access keys, secret keys, or .pem private keys here.
# - The EC2 key pair must already exist in AWS. Set its name using:
#       terraform apply -var="key_pair_name=YOUR_KEY_PAIR_NAME"

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source = "hashicorp/aws"
      # Use a current stable AWS provider version in your environment.
      version = "~> 6.0"
    }
  }
}

# ------------------------------------------------------------
# 1. AWS PROVIDER
# ------------------------------------------------------------

provider "aws" {
  region = var.aws_region
}

# ------------------------------------------------------------
# 2. VARIABLES
# ------------------------------------------------------------

variable "aws_region" {
  description = "AWS region close to India"
  type        = string
  default     = "ap-south-1" # Mumbai
}

variable "key_pair_name" {
  description = "Existing EC2 key-pair name in AWS. Do not put the .pem file in GitHub."
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "ssh_cidr" {
  description = "CIDR allowed to SSH to the EC2. For the FA demo, 0.0.0.0/0 is simplest, but restrict this to your public IP for better security."
  type        = string
  default     = "0.0.0.0/0"
}

# ------------------------------------------------------------
# 3. CUSTOM VPC
# ------------------------------------------------------------

resource "aws_vpc" "fa_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "FA-DevOps-VPC"
  }
}

# ------------------------------------------------------------
# 4. PUBLIC SUBNET
# ------------------------------------------------------------

resource "aws_subnet" "fa_public_subnet" {
  vpc_id                  = aws_vpc.fa_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true

  tags = {
    Name = "FA-DevOps-Public-Subnet"
  }
}

# ------------------------------------------------------------
# 5. INTERNET GATEWAY
# ------------------------------------------------------------

resource "aws_internet_gateway" "fa_igw" {
  vpc_id = aws_vpc.fa_vpc.id

  tags = {
    Name = "FA-DevOps-Internet-Gateway"
  }
}

# ------------------------------------------------------------
# 6. ROUTE TABLE
# ------------------------------------------------------------

resource "aws_route_table" "fa_public_route_table" {
  vpc_id = aws_vpc.fa_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.fa_igw.id
  }

  tags = {
    Name = "FA-DevOps-Public-Route-Table"
  }
}

# Associate the public subnet with the public route table.
resource "aws_route_table_association" "fa_public_subnet_association" {
  subnet_id      = aws_subnet.fa_public_subnet.id
  route_table_id = aws_route_table.fa_public_route_table.id
}

# ------------------------------------------------------------
# 7. SECURITY GROUP
# ------------------------------------------------------------

resource "aws_security_group" "fa_web_sg" {
  name        = "fa-devops-web-sg"
  description = "Allow SSH and HTTP for FA DevOps EC2"
  vpc_id      = aws_vpc.fa_vpc.id

  # SSH - used to connect to the Ubuntu EC2.
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.ssh_cidr]
  }

  # HTTP - used to access the website.
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow EC2 to make outbound connections for package updates,
  # Docker installation, pulling images, etc.
  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "FA-DevOps-Web-SG"
  }
}

# ------------------------------------------------------------
# 8. FIND THE LATEST UBUNTU 24.04 LTS AMI
# ------------------------------------------------------------

data "aws_ami" "ubuntu" {
  most_recent = true

  owners = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }

  filter {
    name   = "root-device-type"
    values = ["ebs"]
  }
}

# ------------------------------------------------------------
# 9. UBUNTU EC2 INSTANCE
# ------------------------------------------------------------

resource "aws_instance" "fa_web_server" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.instance_type
  subnet_id                   = aws_subnet.fa_public_subnet.id
  vpc_security_group_ids      = [aws_security_group.fa_web_sg.id]
  key_name                    = var.key_pair_name
  associate_public_ip_address = true

  # The Ansible person will configure Docker and deploy the application.
  # Terraform is intentionally NOT installing Docker here.

  tags = {
    Name = "FA-DevOps-Web-Server"
    Role = "Application-Server"
  }
}

# ------------------------------------------------------------
# 10. ELASTIC IP
# ------------------------------------------------------------

# A stable public IP makes the Ansible handover easier.
resource "aws_eip" "fa_web_eip" {
  domain = "vpc"

  instance = aws_instance.fa_web_server.id

  tags = {
    Name = "FA-DevOps-Web-EIP"
  }
}

# ------------------------------------------------------------
# 11. OUTPUTS
# ------------------------------------------------------------

output "vpc_id" {
  description = "ID of the custom VPC"
  value       = aws_vpc.fa_vpc.id
}

output "subnet_id" {
  description = "ID of the public subnet"
  value       = aws_subnet.fa_public_subnet.id
}

output "security_group_id" {
  description = "ID of the web security group"
  value       = aws_security_group.fa_web_sg.id
}

output "ec2_instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.fa_web_server.id
}

output "ec2_public_ip" {
  description = "Stable public IP of the EC2 instance"
  value       = aws_eip.fa_web_eip.public_ip
}

output "ssh_command" {
  description = "SSH command template for the Ubuntu server"
  value       = "ssh -i <YOUR_PRIVATE_KEY.pem> ubuntu@${aws_eip.fa_web_eip.public_ip}"
}

output "website_url" {
  description = "Website URL after the application is deployed on port 80"
  value       = "http://${aws_eip.fa_web_eip.public_ip}"
}
