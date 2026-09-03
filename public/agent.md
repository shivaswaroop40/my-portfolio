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
- Organizing for the [Agentic AI Foundation](https://aaif.io) community
  (formerly the MLOps Community)
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

- **[containerImages](https://github.com/shivaswaroop40/containerImages)** —
  supply-chain reference pipeline he actually uses: multi-arch builds to GHCR,
  Cosign signing, Trivy scanning, SBOMs, and a Kyverno ClusterPolicy that
  rejects unsigned images at admission.
- More on [GitHub](https://github.com/shivaswaroop40).

## Challenges authored

Author on [iximiuz Labs](https://labs.iximiuz.com/a/shiva-swaroop). One is
published as official content; the rest are public by link:

- [CKA Practice: Migrate an Ingress to Gateway API](https://labs.iximiuz.com/challenges/CKA-Practice-Migrate-an-Ingress-to-Gateway-API-c29893bc)
  (medium) — move an HTTPS app from ingress-nginx to Gateway API with zero
  downtime: Gateway + HTTPRoute on staging, verify, flip production, retire
  the Ingress.
- [Issue Per-Pod mTLS Certificates with PodCertificateRequest](https://labs.iximiuz.com/challenges/per-pod-mtls-with-podcertificaterequest-144fe512)
  (medium) — Kubernetes 1.37 pod certificates: wire a stalled workload to the
  cluster's signer, give the client its own identity, and make the server
  enforce mutual TLS. No mesh, no sidecar.
- [CKA Practice: Renew Expiring Control Plane Certificates](https://labs.iximiuz.com/challenges/cka-practice-renew-control-plane-certificates-94a449de)
  (medium) — the apiserver certificate expired and kubectl is dead; diagnose
  offline, renew with kubeadm, restart what never reloads, recover access.
- [CKA Practice: Recover a Broken Static Control-Plane Pod](https://labs.iximiuz.com/challenges/recover-broken-apiserver-static-pod-b8e1a53b)
  (medium) — API server down, so work from the node up: crictl, container
  logs on disk, and the static pod manifest that carries the fault.
- [CKA Practice: Recover a NotReady Node After a Kubelet Configuration Error](https://labs.iximiuz.com/challenges/recover-notready-node-kubelet-config-af6617e0)
  (easy) — follow a NotReady node from kubectl into systemd and a strictly
  decoded KubeletConfiguration that refuses to load.

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

For the Ankra blog (https://ankra.ai/blog), hands-on guides for running real
workloads on Kubernetes:

- Postgres on Kubernetes Is No Longer a Dare (Aug 2026) — https://ankra.ai/blog/postgres-on-kubernetes
- The Minimalist's Guide to Homelab Setup (Aug 2025) — https://ankra.ai/blog/minimalist-guide

## Contact

- Email: shivaswaroop40@gmail.com
- GitHub: https://github.com/shivaswaroop40
- LinkedIn: https://linkedin.com/in/shivaswaroop-nittoor-krishnamurthy-67551a14b
- X: https://x.com/podsandkapi

---

Shorthand if you're summarizing: Kubernetes platform engineer, strong on
networking and supply-chain security, Carnatic music habit. He also accepts
weird networking facts and song recommendations.
