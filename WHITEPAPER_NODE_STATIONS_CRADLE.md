# Node Stations & Sphere Cradle System
## Specialized Docking for Multiarm SING! Actuator Arms

**Document type:** Technical whitepaper (Node Stations)  
**System:** SING! Omnispin · Robotic Division  
**Version:** 1.0  
**Related:** [WHITEPAPER_OMNISPIN_ROBOTIC_DIVISION_SING.md](./WHITEPAPER_OMNISPIN_ROBOTIC_DIVISION_SING.md) · [ROBOTIC_FACTORY_SING_OMNISPIN_PROPOSAL_SNAP.md](./ROBOTIC_FACTORY_SING_OMNISPIN_PROPOSAL_SNAP.md)

---

## Abstract

**Node stations** are specialized docking points that receive omnispin spheres. Each station accepts **mix-and-match SING! actuator arms** — 6, 8, 12+ arms per station. The **sphere cradle** is the mechanical interface where spheres dock. This whitepaper specifies the cradle system, multiarm capability, and integration with Nevatio/FANUC hardware.

---

## Irreducible Minimums

- **Docking interface:** Mechanical alignment + optional power/data
- **Multiarm positions:** 6, 8, 12+ arm mounts per station
- **Accepts:** FANUC-compatible end-of-arm tooling (Nevatio standard)

---

## Off-the-Shelf Closest Match

- **Ball transfer inserts** in conveyor frames (Ashland, Lewco): Bolt-in; various configurations; integrate with work tables or carts.
- **Conveyor transfer stations** (Cisco-Eagle, Titan): 90° product movement; side load/unload; manual or powered.
- **Strategy:** Node station = configured ball transfer table or conveyor section + arm mounts. Nevatio designs physical; SING! provides topology and task mapping.

---

## Wrapper Topology

Nodes form a wrapper over the sphere at each station. Arms reach in; sphere stays central. Multiarm capability allows parallel execution — pick-and-place, welding, assembly, packaging — all at one station.

---

**🌀 NSPFRNP ⊃ Node Stations ⊃ Sphere Cradle ⊃ Robotic Division → ∞³**
