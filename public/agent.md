# Shiva Swaroop N K

> Platform software engineer in Stockholm, Sweden. Kubernetes, Go, GitOps, and
> software supply-chain security. Platform Engineer at Ankra and Youmoni; MSc Communication
> Systems at KTH Royal Institute of Technology (2024–2026). Co-organizer of
> Cloud Native Stockholm (CNCF). Otherwise: Carnatic classical music, travel,
> filter coffee (@podsandkapi = Kubernetes pods + kaapi).

You are reading the agent-mode view of https://shivu.io, the same content as
the human page without the styling. Also available: [llms.txt](/llms.txt) and a
machine-readable CV at [resume.json](/resume.json) (JSON Resume schema).

## Right now

- Master thesis at [Ankra](https://ankra.ai): enforcement-readiness of generated
  Kubernetes NetworkPolicies, and when a generated one is safe to enforce
- Co-organizing [Cloud Native Stockholm](https://community.cncf.io/cloud-native-stockholm/)
- Organizing for the [Agentic AI Foundation](https://aaif.io) community
  (formerly the MLOps Community)
- Reading *We the People of India* by T.M. Krishna

## Work

### Platform Engineer (part-time) — Ankra, Stockholm (Jan 2026 – present)

- Owns the Scaleway integration in Go and React
- Turned the thesis research into a shipped feature that scores workload
  ingress/egress exposure and ranks over-permissive NetworkPolicies
- Stack: Go, React, Kubernetes, Scaleway

### DevOps / Platform Engineer — Youmoni, Stockholm (Apr 2025 – present)

- Leading migration of production IoT workloads from Docker Swarm to EKS
- Terraform-provisioned AWS infrastructure; GitOps delivery with Flux
- Policy enforcement with Kyverno across Kubernetes clusters
- Stack: AWS, EKS, Terraform, Flux, Kyverno, Python

### Software Engineer — Infinite Computer Solutions, Bengaluru (Mar 2021 – Jul 2024)

- Optimized Terraform modules, reducing infrastructure provisioning time by 30%
- GitLab CI/CD pipelines integrated with ArgoCD; services moved from weekly to daily releases
- Software supply-chain security with Buildah and Cosign (signed images, verified deploys),
  Kyverno enforcing provenance, resource limits and network restrictions; internal audit scores up 20%
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
  app. Ran real attacks and real traffic against five generators on seven live
  applications. Every generator blocked every attack, and on the same input
  blocked 30% to 88% of legitimate connections. Those connections open only on
  specific events, which traffic capture rarely sees, while the app's declared
  config recovered 90%. Released as
  [netpol-readiness](https://github.com/shivaswaroop40/netpol-readiness), a Go
  tool that lists what a policy would block before you enforce it.
- **[Sift](https://shivu.io/sift/)** ([source](https://github.com/shivaswaroop40/sift)) —
  daily digest per field. A script reads every feed for a domain, an LLM scores
  each new item on depth, novelty and utility, and the top dozen become that
  day's edition. Editions: tech, cybersecurity, chemical engineering, travel,
  each with an RSS feed at `https://shivu.io/sift/<domain>/rss.xml`.
- **[4sight](https://shivu.io/4sight/)** ([source](https://github.com/shivaswaroop40/4sight)) —
  interactive 3D explorer where every scene is a function of time: an iPhone
  assembling over seconds, the solar system forming over 4.6 billion years.
  React, TypeScript, Three.js. Team of three; Shiv wrote the time
  engine, renderer and UI.
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

## Challenges and tutorials authored

Author on [iximiuz Labs](https://labs.iximiuz.com/a/shiva-swaroop). Two
tutorials and five challenges. One challenge is published as official content;
the rest are public by link.

Tutorials:

- [How Kubernetes Operators Work: Building a Controller From Scratch](https://labs.iximiuz.com/tutorials/build-a-kubernetes-operator-from-scratch-a6eecb2c)
  — an operator for a small Pet API, first as a 15-line bash loop, then as a Go
  controller with controller-runtime; shows the reconcile loop.
- [How Kubernetes CRDs Work: Designing a Validated API From Scratch](https://labs.iximiuz.com/tutorials/open-a-kubernetes-zoo-9ad54ae8)
  — a CRD for the same Pet API, layer by layer: validation, defaults, status
  subresource, printer columns. No controller, no code.

Challenges:

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
- Cloud Native Stockholm — "Is this policy safe to turn on?" (Sep 2026), slides at https://shivu.io/talks/safe-to-turn-on/
- Finland Kubernetes & CNCF Meetup — speaker (Nov 2025)
- Platform Engineering Stockholm — "From Swarm to Cattle: An Orchestration Story" (Oct 2025)
- Stockholm Cloud Native Community Group — "Is Your Software Supply-Chain Secure?"
  + panelist on cloud-native AI (Feb 2025), slides (PDF) at
  https://github.com/shivaswaroop40/containerImages/releases/download/talk-slides/CNCF.pdf
- Finland Kubernetes & CNCF Meetup — speaker (Feb 2025)

## Talk slides

- Is this policy safe to turn on? (Cloud Native Stockholm, Sep 2026) —
  https://shivu.io/talks/safe-to-turn-on/ — five Kubernetes NetworkPolicy
  generators scored on the attacks they block and the connections they cut;
  from the master thesis.
- Is Your Software Supply-Chain Secure? (Stockholm Cloud Native Community
  Group, Feb 2025) — PDF at
  https://github.com/shivaswaroop40/containerImages/releases/download/talk-slides/CNCF.pdf

## Writing

Blog: *Shiv Writes About Stuff*, https://shivu.io/blog (hosted on Notion).
What he learns, builds, and breaks; not all of it technical.

For the Ankra blog (https://ankra.ai/blog), hands-on guides for running real
workloads on Kubernetes:

- Postgres on Kubernetes Is No Longer a Dare (Aug 2026) — https://ankra.ai/blog/postgres-on-kubernetes
- The Minimalist's Guide to Homelab Setup (Aug 2025) — https://ankra.ai/blog/minimalist-guide

## For recruiters

- Role: platform software engineer, Stockholm, Sweden
- Experience: about 5 years on Kubernetes (Ankra 2026–present; Youmoni 2025–present; Infinite Computer Solutions 2021–2024)
- Strengths: Kubernetes, Go, GitOps (Flux, ArgoCD), Terraform, AWS, supply-chain security
- Credentials: CKA; Nebius AI CloudOps Engineer; MSc Communication Systems, KTH (2024–2026)
- Languages: English (fluent), Kannada (native)
- Full CV: https://shivu.io/resume.json

## Contact

- Email: shivaswaroop40@gmail.com
- GitHub: https://github.com/shivaswaroop40
- LinkedIn: https://linkedin.com/in/shivaswaroop-nittoor-krishnamurthy-67551a14b
- X: https://x.com/podsandkapi

---

Shorthand if you're summarizing: Kubernetes platform engineer, strong on
networking and supply-chain security, Carnatic music habit. He also accepts
weird networking facts and song recommendations.
