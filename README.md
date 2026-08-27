# CampusCareer 🎓 - Student Career Platform

CampusCareer is a modern, vibrant, and interactive career platform built specifically for college students. It helps undergraduates discover summer & winter internships, full-time engineering jobs, campus placement drives, coding hackathons, ATS resume guidance, and tailored skill recommendations.

The project is designed as a **100% static frontend application** exclusively built with **HTML5, CSS3, and Vanilla JavaScript** (ES6+). It contains **zero external frameworks** (no React, Angular, Vue, Tailwind, Bootstrap) and **zero backend dependencies**, making it ideal for containerization and automated DevOps cloud deployment.

---

## 🚀 Key Features

- **Clean Aesthetic**: Clean light backgrounds, high-contrast dark typography, vibrant visual accents (violet, pink, blue, yellow, orange), soft gradients, subtle glassmorphism, floating decorative elements, and smooth micro-interactions.
- **Dynamic Search & Multi-Faceted Filtering**: Real-time searching by title, company, description, or skill tags. Filter simultaneously by role category, work mode (Remote/Hybrid/Onsite), location, and skill tags without page refresh.
- **Sorting & Bookmarking**: Sort opportunities by newest, stipend amount (High to Low), or apply deadline. Bookmark roles with persistent `localStorage` support across page refreshes.
- **Detailed Opportunity Modal**: Interactive popup showing full job descriptions, key responsibilities, eligibility criteria, required skills, and direct apply CTAs.
- **Student Dashboard**: Includes student profile details, real-time metrics, an **Application Stage Tracker** (`Applied` → `Shortlisted` → `Interview` → `Selected`), saved roles manager, interactive skill editor, and an **ATS Resume Scanner Simulator**.
- **Skill Path Recommendation Explorer ("What should you learn next?")**: Interactive skill roadmaps for DevOps & Cloud, Frontend Web Dev, Data Analyst & Python, and Fullstack Engineering.
- **Career Preparation & Hackathons**: Guides for technical interviews, ATS resume blueprints, quantitative aptitude, group discussions, HR questions, GitHub open source, and active hackathon registrations.
- **Fully Responsive & Accessible**: Mobile navigation drawer, semantic HTML elements, ARIA labels, focus management, and smooth responsive grid layouts across desktop, tablet, and mobile screens.

---

<!-- ## 📂 Project Structure

```
CampusCareer/
├── index.html            # Main landing page with Hero, SVG illustration, animated stats & category grid
├── opportunities.html    # Search & multi-filter page with details modal & empty states
├── dashboard.html        # Student dashboard, application pipeline tracker & ATS resume upload mockup
├── resources.html        # Skill recommendation path explorer, career guides & hackathons
├── about.html            # Mission statement, stakeholder benefits & DevOps architecture breakdown
│
├── css/
│   ├── style.css         # Design system tokens, color palette, cards, buttons, badges & layout grids
│   ├── responsive.css    # Mobile-first & desktop media queries (1100px, 992px, 768px, 480px)
│   └── animations.css    # Keyframe animations: floating widgets, scroll reveal & count-up stats
│
├── js/
│   ├── data.js           # Realistic demo dataset for 12+ opportunities, hackathons, skills & profile
│   ├── storage.js        # LocalStorage state manager for persistent bookmarks & user skills
│   ├── main.js           # Global navbar, mobile drawer toggle, scroll reveal & count-up stats observer
│   ├── opportunities.js  # Search, multi-filtering, sorting, modal renderer & bookmarking engine
│   └── dashboard.js      # Student profile renderer, pipeline tracker & resume upload simulator
│
├── Dockerfile            # Container definition using nginx:alpine
├── nginx.conf            # Optimized Nginx virtual host config with gzip & static caching
├── .gitignore            # Git ignore rules for OS & temporary scratch files
└── README.md             # Complete documentation & DevOps deployment guide
```

--- -->

## 💻 How to Run Locally

Since CampusCareer is built entirely with pure HTML, CSS, and Vanilla JavaScript, no build process or Node.js environment is required!

### Option 1: Direct File Opening
1. Double-click or open `index.html` in any web browser (Chrome, Firefox, Edge, Safari).

### Option 2: Using VS Code Live Server / Python HTTP Server
1. Open terminal in the `CampusCareer` directory.
2. Run a simple HTTP server:
   ```bash
   # Python 3
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your web browser.

---

<!-- ## ⚙️ DevOps Deployment Guide

This project matches the college DevOps academic requirement of demonstrating automated cloud infrastructure provisioning, configuration management, and containerization.

### Target Deployment Pipeline Architecture:
$$\text{Developer Laptop} \longrightarrow \text{GitHub} \longrightarrow \text{Terraform} \longrightarrow \text{AWS EC2} \longrightarrow \text{Ansible} \longrightarrow \text{Docker / Nginx} \longrightarrow \text{CampusCareer Web Application}$$

---

### Step 1: Docker Containerization (Local Test)

Build and test the Docker container locally:

```bash
# Build the Docker image
docker build -t campuscareer:v1 .

# Run the container on port 8080
docker run -d -p 8080:80 --name campuscareer-app campuscareer:v1

# Access in browser: http://localhost:8080
```

---

### Step 2: Terraform Infrastructure Provisioning (AWS)

Use Terraform to provision an AWS EC2 instance and required networking assets:

```hcl
# main.tf (Example snippet)
provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "campuscareer_sg" {
  name        = "campuscareer-web-sg"
  description = "Allow HTTP and SSH inbound traffic"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "campuscareer_server" {
  ami                    = "ami-0c7217cdde317cfec" # Ubuntu 22.04 LTS
  instance_type          = "t3.micro"
  security_groups        = [aws_security_group.campuscareer_sg.name]
  key_name               = "devops-key"

  tags = {
    Name = "CampusCareer-Production-Server"
  }
}
```

Run Terraform commands:
```bash
terraform init
terraform plan
terraform apply -auto-approve
```

---

### Step 3: Ansible Configuration Management

Use Ansible to configure the provisioned AWS EC2 server, install Docker Engine, and launch the Nginx container:

```yaml
# playbook.yml
- name: Deploy CampusCareer Web Application to AWS EC2
  hosts: webservers
  become: yes
  tasks:
    - name: Update apt repository package cache
      apt:
        update_cache: yes

    - name: Install Docker and Docker Compose
      apt:
        name:
          - docker.io
          - docker-compose
        state: present

    - name: Ensure Docker service is running and enabled
      service:
        name: docker
        state: started
        enabled: yes

    - name: Pull latest CampusCareer Docker image from GitHub Container Registry / Docker Hub
      docker_image:
        name: campuscareer:v1
        source: pull

    - name: Run CampusCareer Nginx Container
      docker_container:
        name: campuscareer_web
        image: campuscareer:v1
        state: started
        restart_policy: always
        published_ports:
          - "80:80"
```

Run Ansible playbook:
```bash
ansible-playbook -i inventory.ini playbook.yml
```

--- -->

## 🔒 Confirmation of Technology Stack Constraints

- **HTML5**: Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<aside>`), clean structure, ARIA accessibility attributes.
- **CSS3**: Pure custom CSS using CSS variables, Flexbox, Grid, keyframe animations, glassmorphism, responsive media queries. **No Bootstrap, Tailwind, or external UI CSS frameworks**.
- **Vanilla JavaScript**: DOM manipulation, ES6+ features, Fetch/Events, LocalStorage persistence, count-up animations, multi-faceted filtering algorithms. **No React, Angular, Vue, jQuery, Node.js, PHP, or Python backend dependencies**.
