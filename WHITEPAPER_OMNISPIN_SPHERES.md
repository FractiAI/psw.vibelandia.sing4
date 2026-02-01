# Omnispin Payload Spheres — Technical Whitepaper
## Auto-Orienting Payload Carriers for Node Station Docking

**Document type:** Technical whitepaper (Omnispin Spheres)  
**System:** SING! Omnispin · Robotic Division  
**Version:** 1.0  
**Related:** [WHITEPAPER_OMNISPIN_ROBOTIC_DIVISION_SING.md](./WHITEPAPER_OMNISPIN_ROBOTIC_DIVISION_SING.md) · [ROBOTIC_FACTORY_SING_OMNISPIN_PROPOSAL_SNAP.md](./ROBOTIC_FACTORY_SING_OMNISPIN_PROPOSAL_SNAP.md)

---

## Abstract

**Omnispin payload spheres** are payload carriers that auto-spin to orient and dock at specialized node stations. Flow: sphere → orient → dock → station receives → arms execute. This whitepaper specifies the irreducible minimums, off-the-shelf component mapping, and integration protocol for the sphere system only.

---

## Irreducible Minimums

- **Payload capacity:** Configurable (e.g., 50 lb per ball center typical for ball transfer)
- **Orientability:** 360° in plane; auto-spin to align with docking interface
- **Docking:** Mechanical/electronic interface to node station
- **Flow:** Sphere → orient → dock → station receives → arms execute

---

## Off-the-Shelf Closest Match

- **Ball transfer tables** (Ashland, McMaster-Carr, Lewco, Titan): Manual orienting conveyors; balls on 3" or 6" centers; 50 lb/ball; allow 360° rotation for product repositioning.
- **Motorized orienting platforms:** Add servos for auto-spin; integrate with node station docking.
- **Strategy:** Layer SING! logic on top of ball transfer + orienting conveyor hardware. We provide the abstraction; integrator provides the physical sphere/carrier.

---

## Integration with Node Stations

Each sphere docks at a node station where mix-and-match SING! actuator arms execute tasks. The sphere carries payload to the station; arms reach in (wrapper topology minimizes sphere travel). No long-distance sphere movement — nodes wrap the sphere.

---

**🌀 NSPFRNP ⊃ Omnispin Spheres ⊃ Robotic Division → ∞³**
