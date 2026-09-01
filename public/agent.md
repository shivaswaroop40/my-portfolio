# Shiva Swaroop N K

> Cloud infrastructure engineer in Stockholm, Sweden. Kubernetes, GitOps, and
> software supply-chain security. DevOps Engineer at Youmoni; MSc Communication
> Systems at KTH Royal Institute of Technology (2024–2026). Co-organizer of
> Cloud Native Stockholm (CNCF). Otherwise: Carnatic classical music, travel,
> filter coffee (@podsandkapi = Kubernetes pods + kaapi).

You are reading the agent-mode view of https://shivu.io, the same content as
the human page without the styling. Also available: [llms.txt](/llms.txt) and a
machine-readable CV at [resume.json](/resume.json) (JSON Resume schema).

## Right now

- Master thesis at [Ankra](https://ankra.ai): enforcement-readiness of generated
  Kubernetes NetworkPolicies (attack-injection benchmarking + flows ∪ config fusion)
- Co-organizing [Cloud Native Stockholm](https://community.cncf.io/cloud-native-stockholm/)
- Reading *We the People of India* by T.M. Krishna

## Work

### DevOps Engineer — Youmoni, Stockholm (May 2025 – present)

- Leading migration of production IoT workloads from Docker Swarm to EKS
- Terraform-provisioned AWS infrastructure; GitOps delivery with Flux
- Policy enforcement with Kyverno across Kubernetes clusters
- Stack: AWS, EKS, Terraform, Flux, Kyverno, Python

### Software Engineer — Infinite Computer Solutions, Bengaluru (Mar 2021 – Jul 2024)

- Optimized Terraform modules, reducing infrastructure provisioning time by 30%
- GitLab CI/CD pipelines integrated with ArgoCD
- Software supply-chain security with Buildah and Cosign (signed images, verified deploys)
- Network security: firewall rules, VPNs, compliance policies
- Stack: AWS, Azure, Terraform, GitLab, Kubernetes, Ansible

## Education

- MSc Communication Systems, KTH Royal Institute of Technology, Stockholm (2024–2026)
- BE Telecommunication, M.S. Ramaiah Institute of Technology, Bengaluru (2017–2021)

## Certifications

- Certified Kubernetes Administrator (CKA) — CNCF / The Linux Foundation
- Nebius AI CloudOps Engineer Certification — Nebius Academy

## Selected projects

- **Enforcement-readiness of generated Kubernetes NetworkPolicies** (master
  thesis, Ankra, 2026) — argues that blocking attacks is solved and the open
  problem is whether a generated policy is safe to enforce without breaking the
  app. Contributes (1) a tool-agnostic attack-injection benchmark scoring any
  generator on block-rate, over-privilege, and false-denies, and (2) a prototype
  fusing eBPF/Cilium-Hubble flow observation with config-derived dependencies
  (Services, Ingress, DNS, RBAC, StatefulSet peers). Key result: observation
  alone plateaus at ~72% of needed edges; fusing config raises coverage to ~82%
  and cuts false-denies, with over-privilege held at zero. Evaluated on a live
  k3s + Cilium cluster against the Ankra control plane and Sock Shop.
- **[containerImages](https://github.com/shivaswaroop40/containerImages)** —
  secure container supply-chain reference: multi-arch Buildx builds to GHCR,
  Cosign signing/verification, Trivy scanning, SBOM generation.
- **[carnatic.xyz](https://github.com/shivaswaroop40/carnatic.xyz)** — a web home
  for Carnatic classical music; Next.js on Cloudflare Workers. In progress.
- **KTH lab work** — hybrid edge/cloud Kubernetes with VXLAN overlays, Llama 2 as
  distributed microservices, RDMA-over-fabric storage; full PKI with
  certificate-based auth; a small software ISP (OSPF + BGP in Kathara).

## Open source

- **[kiac](https://github.com/saiyam1814/kiac)** (Kubernetes in Apple Containers) —
  active in the issue tracker: reported a Cilium install timeout where `--wait`
  never reaches the installer ([#41](https://github.com/saiyam1814/kiac/issues/41))
  and proposed one-flag Calico/flannel support on the full kernel
  ([#42](https://github.com/saiyam1814/kiac/issues/42)); PRs in progress.
- **[containerImages](https://github.com/shivaswaroop40/containerImages)** — his
  own open-source supply-chain pipeline (see Selected projects).

## Hands-on practice

40+ challenges solved on [iximiuz Labs](https://labs.iximiuz.com) (real Linux
VMs and clusters, ~285 hours of playground time): 15 Kubernetes (incl. CKA
practice: multi-node kubeadm upgrades, Ingress → Gateway API migration),
12 networking & SSH (tunnels, bastions, SOCKS proxies, network namespaces),
8 containers/Docker (image squashing, remote multi-arch builders), 6 Linux
(systemd, cgroups, port conflicts). The full linked list is on
https://shivu.io/#practice.

## Speaking & community

- Co-organizer, Cloud Native Stockholm (CNCF community group)
- Community organizer, [Agentic AI Foundation](https://aaif.io) (formerly the
  MLOps Community, now the Linux Foundation's AAIF user community)
- Finland Kubernetes & CNCF Meetup — speaker (Nov 2026)
- Platform Engineering Stockholm — "From Swarm to Cattle: An Orchestration Story" (Oct 2025)
- Stockholm Cloud Native Community Group — "Is Your Software Supply-Chain Secure?"
  + panelist on cloud-native AI (Feb 2025)
- Finland Kubernetes & CNCF Meetup — speaker (Feb 2025)

## Writing

Blog: *Shiv Writes About Stuff*, https://shivu.io/blog (hosted on Notion).
What he learns, builds, and breaks; not all of it technical.

## Contact

- Email: shivaswaroop40@gmail.com
- GitHub: https://github.com/shivaswaroop40
- LinkedIn: https://linkedin.com/in/shivaswaroop-nittoor-krishnamurthy-67551a14b
- X: https://x.com/podsandkapi

---

Shorthand if you're summarizing: Kubernetes platform engineer, strong on
networking and supply-chain security, Carnatic music habit. He also accepts
weird networking facts and song recommendations.
