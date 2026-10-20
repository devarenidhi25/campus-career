# CampusCareer - Student Career Platform

![CI - Build & Test](https://github.com/devarenidhi25/campus-career/actions/workflows/ci.yml/badge.svg)

CampusCareer is a career platform for college students to discover internships, jobs, hackathons and skill roadmaps in one place. It is a **100% static web application** (HTML5, CSS3, Vanilla JavaScript), containerized with **Docker + Nginx**, provisioned on **AWS** with **Terraform**, configured with **Ansible**, and automatically built and tested with **GitHub Actions**.

---

## Problem Statement

College students hunt for internships, jobs and hackathons across many scattered sources: WhatsApp groups, college notice boards, company career pages and job portals. Deadlines get missed, opportunities are hard to filter by skill or work mode, and students don't know which skills to build next.

**CampusCareer** brings these opportunities into a single platform with search, filters, bookmarks, an application tracker and skill roadmaps.

### The DevOps need

Even a simple website has a delivery problem when a team builds it:

| Without DevOps | With this project |
|---|---|
| Four members share files manually and overwrite each other's work | **Git + GitHub** – one shared repository with full history |
| Broken pages or links are found only after deployment | **GitHub Actions CI** – every push is automatically tested |
| "It works on my laptop" – different machines, different results | **Docker** – the app runs identically everywhere |
| Servers are created by clicking in the AWS console, hard to repeat | **Terraform** – infrastructure defined as code, rebuilt with one command |
| Servers are set up by typing commands over SSH, error-prone | **Ansible** – server setup and deployment automated in a playbook |

---

## Architecture & Pipeline

```
 Developer ──push──▶ GitHub ──▶ GitHub Actions CI
                                 ├─ Test: JS syntax, HTML lint, link check, Dockerfile lint
                                 └─ Build: Docker image ─▶ run container ─▶ smoke test
                                        │
                          (on success, deployed with)
                                        ▼
            Terraform ──creates──▶ AWS (VPC, subnet, security group, EC2, Elastic IP)
                                        │
            Ansible  ──configures──▶ EC2: install Docker ─▶ copy app ─▶ build image ─▶ run container
                                        │
                                        ▼
                         Browser ──HTTP :80──▶ Nginx (Docker) ──▶ CampusCareer
```

| Stage | Tool | Where in repo |
|---|---|---|
| Version control | Git + GitHub (feature branches + pull requests) | whole repo |
| Test | GitHub Actions: Node syntax check, HTMLHint, link checker, Hadolint | `.github/workflows/ci.yml`, `tests/check_site.py` |
| Build | Docker (`nginx:1.25-alpine`) | `Dockerfile`, `nginx.conf`, `.dockerignore` |
| Container test | Smoke test on the running container | `tests/smoke_test.sh` |
| Infrastructure | Terraform on AWS (ap-south-1, Mumbai) | `terraform/main.tf` |
| Configuration & deployment | Ansible playbook | `ansible/inventory.ini`, `ansible/deploy.yml` |

---

## Project Structure

```
campus-career/
├── index.html, opportunities.html, dashboard.html, resources.html, about.html
├── css/                      # style.css, responsive.css, animations.css
├── js/                       # data.js, storage.js, main.js, opportunities.js, dashboard.js
│
├── Dockerfile                # Nginx Alpine image serving the static site
├── nginx.conf                # Nginx config: gzip, caching, security headers
├── .dockerignore             # Keeps infra code, tests and secrets out of the image
│
├── .github/workflows/ci.yml  # CI pipeline: test -> build -> smoke test
├── tests/
│   ├── check_site.py         # Page structure + broken local link checker
│   └── smoke_test.sh         # HTTP checks against the running container
│
├── terraform/main.tf         # AWS infrastructure as code
├── ansible/
│   ├── inventory.ini         # Target EC2 server
│   └── deploy.yml            # Install Docker, deploy and verify the app
│
├── .gitignore                # Excludes .pem keys, Terraform state, credentials
└── README.md
```

---

## Key Features (Application)

- **Search & filters** – keyword search; filter by type, work mode, location and skills; sort by newest, stipend or deadline
- **Bookmarks** – saved with browser `localStorage`
- **Opportunity details** – modal with responsibilities, eligibility and skills
- **Student dashboard** – profile, application tracker (Applied → Shortlisted → Interview → Selected), skill editor, ATS resume score demo
- **Skill roadmaps** – "What should you learn next?" for DevOps, Frontend, Data and Fullstack
- **Responsive** – works on desktop, tablet and mobile

---

## How to Run

### 1. Locally (no tools needed)
Open `index.html` in a browser, or:
```bash
python3 -m http.server 8000      # then open http://localhost:8000
```

### 2. With Docker
```bash
docker build -t campuscareer:v1 .
docker run -d -p 8080:80 --name campuscareer-app campuscareer:v1
bash tests/smoke_test.sh http://localhost:8080
```
Open http://localhost:8080

### 3. Run the CI tests locally
```bash
for f in js/*.js; do node --check "$f"; done
npx htmlhint "*.html"
python3 tests/check_site.py
```

### 4. Deploy to AWS (Terraform + Ansible)
Prerequisites: AWS CLI configured (`aws configure`), an EC2 key pair named `fa1-key` in ap-south-1, and its `.pem` file at `~/.ssh/fa1-key.pem` (`chmod 400`).

```bash
# Provision infrastructure
cd terraform
terraform init
terraform validate
terraform plan  -var="key_pair_name=fa1-key"
terraform apply -var="key_pair_name=fa1-key"
terraform output ec2_public_ip

# Put the IP in ansible/inventory.ini, then deploy
cd ../ansible
ansible -i inventory.ini web -m ping
ansible-playbook -i inventory.ini deploy.yml
```
Open `http://<EC2_PUBLIC_IP>`. To remove all AWS resources: `terraform destroy`.

---

## Continuous Integration

`.github/workflows/ci.yml` runs on every push and on every pull request to `main`:

1. **Lint & Test Source** – JavaScript syntax check, HTML lint (HTMLHint), page/link checker, Dockerfile lint (Hadolint)
2. **Docker Build & Smoke Test** – builds the image, starts a container, checks every page returns HTTP 200, and checks that infrastructure files are **not** served by the website

Stage 2 runs only if stage 1 passes. Results are visible in the repository's **Actions** tab and on each pull request.

### Git workflow
- `main` holds working, tested code
- New work is done on a feature branch (e.g. `feature/ci-pipeline`)
- A pull request into `main` triggers CI; it is merged only when all checks pass

---

## Security

- AWS access keys and `.pem` private keys are **never** committed (`.gitignore`)
- Terraform state files are excluded (they can contain sensitive data)
- `.dockerignore` keeps Terraform, Ansible, tests and git history out of the public website
- The IAM user used by Terraform has only `AmazonEC2FullAccess`, not root access

---

## Team

| Member | Responsibility |
|---|---|
| Nidhi | Application, Docker, GitHub repository |
| Ishan | Terraform infrastructure code |
| Neha | AWS account, IAM, key pair, infrastructure provisioning |
| Kalyani | Ansible playbook, deployment, CI pipeline |
